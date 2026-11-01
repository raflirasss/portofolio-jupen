/**
 * BOOK CHOREOGRAPHY — GSAP timelines for pulling a book off the shelf,
 * bringing it to the reading position, opening the cover, and the reverse.
 *
 * Everything is 2D on purpose (light enough for low-end phones):
 *  - "Turning" the closed book from spine to cover = squeezing it horizontally
 *    (scaleX) from the spine's thin shape to the full cover, while it travels.
 *  - Opening the cover = scaleX 1 → -1 around the spine. When scaleX crosses
 *    zero the cover swaps to its inside face (see `syncCover`).
 * Only transform + opacity are animated, so the browser just composites layers.
 *
 * Coordinate notes
 *  - `.book` is the open-spread box; the closed book sits in its right-most
 *    page column, so a centred *closed* book needs x = -pageW / 2 (spread mode).
 *  - The book's transform origin is the centre of the closed book (set by
 *    book-viewer.ts), so scaling it keeps the closed book centred.
 */
import { gsap } from "gsap";
import { siteConfig } from "../config/site.config";
import { isLite } from "./motion";
import type { BookMode } from "./page-flip";

const A = siteConfig.animation;

export interface Pose {
  x: number;
  y: number;
  scaleX: number;
  scaleY: number;
  rotation: number;
}

export interface BookParts {
  book: HTMLElement;
  cover: HTMLElement;
  coverShade: HTMLElement;
  castRight: HTMLElement;
  floorShadow: HTMLElement;
  backdrop: HTMLElement;
  camera: HTMLElement;
  chrome: HTMLElement[];
}

/** The camera push-in is skipped in lite mode (scaling the whole room is the costliest part). */
const cameraZoom = () => (isLite() ? 1 : A.cameraZoom);

/**
 * Keep the cover's visible face in sync with its scaleX and darken it as it
 * turns edge-on. Called on every update of a cover tween.
 */
export function syncCover(parts: BookParts, extraShade = 0): void {
  const s = gsap.getProperty(parts.cover, "scaleX") as number;
  const flipped = s < 0;
  if (parts.cover.classList.contains("is-flipped") !== flipped) parts.cover.classList.toggle("is-flipped", flipped);
  parts.coverShade.style.opacity = String(Math.min(1, (1 - Math.abs(s)) * 0.8 + extraShade));
}

/** Step 1 — the spine slides up out of the row while the camera eases in. */
export function pullFromShelf(spine: HTMLElement, camera: HTMLElement, focus: { x: number; y: number }): gsap.core.Timeline {
  const tl = gsap.timeline();
  tl.to(spine, { yPercent: -9, scale: 1.04, duration: A.bookPullDuration, ease: "power2.out" }, 0);
  if (cameraZoom() !== 1) {
    tl.to(
      camera,
      {
        scale: cameraZoom(),
        transformOrigin: `${focus.x}px ${focus.y}px`,
        duration: A.bookPullDuration + A.bookTravelDuration * 0.9,
        ease: "power2.inOut",
      },
      0,
    );
  }
  return tl;
}

/** Step 2 — grow the book from the spine to centre stage, then swing the cover open. */
export function travelAndOpen(
  parts: BookParts,
  opts: { from: Pose; closedX: number; mode: BookMode; closedLeft: number; spine: HTMLElement; reveal: Element[] },
): gsap.core.Timeline {
  const { book, cover, coverShade, castRight, floorShadow, backdrop, camera, chrome } = parts;
  const travel = A.bookTravelDuration;
  const open = A.bookOpenDuration;
  const tl = gsap.timeline();

  tl.set(book, { ...opts.from, autoAlpha: 0 });
  tl.set(cover, { scaleX: 1, autoAlpha: 1 });
  tl.set(coverShade, { opacity: 0.65 });
  tl.set(castRight, { x: opts.closedLeft, scaleX: 2.2, transformOrigin: "0 50%", opacity: 0 });

  // Hand-off: the shelf spine fades out exactly where the book fades in.
  tl.to(book, { autoAlpha: 1, duration: 0.16, ease: "none" }, 0);
  tl.to(opts.spine, { autoAlpha: 0, duration: 0.16, ease: "none" }, 0.04);

  // The room fades away behind the book; the reading backdrop fades in.
  tl.to(camera, { autoAlpha: 0, duration: travel * 0.7, ease: "power1.in" }, 0.05);
  tl.to(backdrop, { autoAlpha: 1, duration: travel * 0.8, ease: "power1.out" }, 0);
  tl.fromTo(floorShadow, { opacity: 0 }, { opacity: 0.9, duration: travel, ease: "power2.out" }, 0);

  // Travel: spine-shaped → cover-shaped (reads as the book turning to face you).
  tl.to(book, { x: opts.closedX, y: 0, scaleX: 1, scaleY: 1, rotation: 0, duration: travel, ease: A.easeTravel }, 0);
  tl.to(coverShade, { opacity: 0, duration: travel * 0.8, ease: "power2.out" }, 0.1);

  // Open: the cover swings around the spine while the book slides to keep the spread centred.
  const t0 = travel + 0.05;
  tl.to(cover, { scaleX: -1, duration: open, ease: A.easeOpen, onUpdate: () => syncCover(parts) }, t0);
  if (opts.mode === "spread") {
    tl.to(book, { x: 0, duration: open, ease: A.easeOpen }, t0);
  } else {
    tl.to(cover, { autoAlpha: 0, duration: open * 0.3, ease: "power1.in" }, t0 + open * 0.45);
  }

  // The cover's shadow lifts off the first page.
  tl.fromTo(castRight, { opacity: 0.8 }, { opacity: 0, duration: open * 0.75, ease: "power2.in" }, t0);

  // First spread: content settles in like ink drying.
  if (opts.reveal.length) {
    tl.from(
      opts.reveal,
      { autoAlpha: 0, y: 8, duration: 0.45, stagger: 0.05, ease: "power2.out", clearProps: "opacity,visibility,transform" },
      t0 + open * 0.42,
    );
  }

  tl.fromTo(
    chrome,
    { autoAlpha: 0, y: (i: number) => (i === 0 ? -10 : 10) },
    { autoAlpha: 1, y: 0, duration: 0.45, stagger: 0.06, ease: "power2.out" },
    t0 + open * 0.7,
  );
  return tl;
}

/** Close the cover, shrink back into the spine's shape and hand over to the shelf. */
export function closeAndReturn(
  parts: BookParts,
  opts: { to: Pose; closedX: number; mode: BookMode; spine: HTMLElement },
): gsap.core.Timeline {
  const { book, cover, coverShade, floorShadow, backdrop, camera, chrome } = parts;
  const close = A.bookCloseDuration;
  const travel = A.bookTravelDuration * 0.85;
  const tl = gsap.timeline();

  tl.to(chrome, { autoAlpha: 0, duration: 0.22, ease: "power1.out" }, 0);

  if (opts.mode === "single") tl.to(cover, { autoAlpha: 1, duration: close * 0.25 }, 0.05);
  tl.to(cover, { scaleX: 1, duration: close * 0.6, ease: A.easeOpen, onUpdate: () => syncCover(parts) }, 0.05);
  if (opts.mode === "spread") tl.to(book, { x: opts.closedX, duration: close * 0.6, ease: A.easeOpen }, 0.05);

  const t1 = 0.05 + close * 0.6;
  tl.to(book, { ...opts.to, duration: travel, ease: A.easeTravel }, t1);
  tl.to(coverShade, { opacity: 0.65, duration: travel, ease: "power2.in" }, t1);
  tl.to(camera, { scale: 1, autoAlpha: 1, duration: travel, ease: "power2.inOut" }, t1);
  tl.to(backdrop, { autoAlpha: 0, duration: travel * 0.8, ease: "power1.inOut" }, t1 + 0.1);
  tl.to(floorShadow, { opacity: 0, duration: travel * 0.6 }, t1);

  // Hand-off back to the shelf spine.
  tl.to(opts.spine, { autoAlpha: 1, duration: 0.16, ease: "none" }, t1 + travel - 0.16);
  tl.to(book, { autoAlpha: 0, duration: 0.16, ease: "none" }, t1 + travel - 0.12);
  return tl;
}

/** Step 3 (closing) — the spine drops back into its place on the shelf. */
export function settleOnShelf(spine: HTMLElement): gsap.core.Timeline {
  return gsap
    .timeline()
    .to(spine, { yPercent: 0, scale: 1, duration: 0.5, ease: "back.out(2)" })
    .set(spine, { clearProps: "transform" });
}

/** Reduced-motion / deep-link variant: a simple cross-fade. */
export function fadeOpen(parts: BookParts): gsap.core.Timeline {
  const { book, backdrop, camera, chrome } = parts;
  return gsap
    .timeline()
    .to(camera, { autoAlpha: 0, duration: 0.3 }, 0)
    .to(backdrop, { autoAlpha: 1, duration: 0.3 }, 0)
    .fromTo(book, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.35 }, 0.1)
    .fromTo(chrome, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.35 }, 0.15);
}

export function fadeClose(parts: BookParts): gsap.core.Timeline {
  const { book, backdrop, camera, chrome } = parts;
  return gsap
    .timeline()
    .to([book, ...chrome], { autoAlpha: 0, duration: 0.25 }, 0)
    .to(backdrop, { autoAlpha: 0, duration: 0.3 }, 0.05)
    .to(camera, { autoAlpha: 1, scale: 1, duration: 0.3 }, 0.05);
}
