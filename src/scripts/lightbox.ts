/**
 * LIGHTBOX — clicking any `[data-lightbox]` artwork shows it larger in a
 * native <dialog> (focus trapping & Esc handling for free).
 */
import { gsap } from "gsap";
import { prefersReducedMotion } from "./motion";

const elementOf = (t: EventTarget | null): Element | null => (t instanceof Element ? t : null);

export interface Lightbox {
  isOpen: () => boolean;
}

export function initLightbox(): Lightbox {
  const dialog = document.querySelector<HTMLDialogElement>("[data-lightbox-dialog]");
  if (!dialog) return { isOpen: () => false };

  const card = dialog.querySelector<HTMLElement>(".lightbox__card")!;
  const art = dialog.querySelector<HTMLElement>("[data-lightbox-art]")!;
  const title = dialog.querySelector<HTMLElement>("[data-lightbox-title]")!;
  const caption = dialog.querySelector<HTMLElement>("[data-lightbox-caption]")!;
  let opener: HTMLElement | null = null;
  let closing = false;

  const open = (trigger: HTMLElement) => {
    const surface = trigger.querySelector(".artwork__surface");
    if (!surface) return;
    opener = trigger;
    art.replaceChildren(...Array.from(surface.childNodes).map((n) => n.cloneNode(true)));
    // Prefer the largest candidate of a responsive image.
    art.querySelectorAll("img").forEach((img) => {
      img.loading = "eager";
      img.sizes = "90vw";
    });
    title.textContent = trigger.dataset.title ?? "";
    caption.textContent = trigger.dataset.caption ?? "";
    dialog.showModal();
    if (!prefersReducedMotion()) {
      gsap.fromTo(card, { autoAlpha: 0, scale: 0.9, rotation: -2, y: 20 }, { autoAlpha: 1, scale: 1, rotation: 0, y: 0, duration: 0.45, ease: "back.out(1.6)" });
    }
  };

  const close = () => {
    if (!dialog.open || closing) return;
    closing = true;
    const done = () => {
      dialog.close();
      closing = false;
      gsap.set(card, { clearProps: "all" });
      opener?.focus({ preventScroll: true });
    };
    if (prefersReducedMotion()) done();
    else gsap.to(card, { autoAlpha: 0, scale: 0.94, y: 10, duration: 0.22, ease: "power2.in", onComplete: done });
  };

  document.addEventListener("click", (e) => {
    const trigger = elementOf(e.target)?.closest<HTMLElement>("[data-lightbox]");
    if (trigger) {
      e.stopPropagation();
      open(trigger);
    }
  }, true);

  dialog.addEventListener("click", (e) => {
    if (e.target === dialog || elementOf(e.target)?.closest("[data-lightbox-close]")) close();
  });
  dialog.addEventListener("cancel", (e) => {
    e.preventDefault();
    close();
  });

  return { isOpen: () => dialog.open };
}

/** Copy-to-clipboard buttons (`data-copy="text"`). */
export function initCopyButtons(): void {
  document.addEventListener("click", async (e) => {
    const btn = elementOf(e.target)?.closest<HTMLElement>("[data-copy]");
    if (!btn) return;
    const msg = btn.querySelector<HTMLElement>(".contact-links__copied");
    try {
      await navigator.clipboard.writeText(btn.dataset.copy ?? "");
      btn.classList.add("is-copied");
      if (msg) msg.textContent = "copied!";
    } catch {
      if (msg) msg.textContent = "press ctrl+c";
    }
    window.setTimeout(() => {
      btn.classList.remove("is-copied");
      if (msg) msg.textContent = "";
    }, 1800);
  });
}
