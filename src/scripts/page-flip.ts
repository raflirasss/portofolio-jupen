/**
 * PAGE FLIP CONTROLLER
 *
 * Pages are real DOM nodes that get *moved* (never cloned) between:
 *   - the hidden page store,
 *   - the left / right slots (what the reader sees),
 *   - the two faces of the turning leaf.
 *
 * Turning forward in a two-page spread (i → j):
 *
 *        left slot        right slot                  left slot   right slot
 *      ┌───────────┬───────────┐                   ┌───────────┬───────────┐
 *      │  page i   │  page i+1 │   leaf: front=i+1 │  page j   │  page j+1 │
 *      │           │           │         back =j   │           │           │
 *      └───────────┴───────────┘  scaleX 1 → -1     └───────────┴───────────┘
 *
 *   1. the right slot already shows page j+1 (it is revealed as the leaf folds)
 *   2. the leaf carries page i+1 on its front and page j on its back
 *   3. once the leaf lands on the left, page j moves into the left slot
 *
 * The turn is pure 2D: the leaf is squeezed around the spine (scaleX 1 → -1),
 * with a slight skew so its free edge lifts like paper, and its visible face
 * swaps when scaleX crosses 0. Only transform + opacity change per frame.
 *
 * Backwards is the mirror image around the spine. In single-page mode the
 * sheet folds into the spine (scaleX 1 → 0) and the next page is underneath.
 */
import { gsap } from "gsap";
import { siteConfig } from "../config/site.config";
import { clamp, prefersReducedMotion } from "./motion";

export type BookMode = "spread" | "single";

interface FlipRefs {
  book: HTMLElement;
  store: HTMLElement;
  slotLeft: HTMLElement;
  slotRight: HTMLElement;
  coverSlot: HTMLElement;
  leaf: HTMLElement;
  leafFront: HTMLElement;
  leafBack: HTMLElement;
  frontShade: HTMLElement;
  backShade: HTMLElement;
  castLeft: HTMLElement;
  castRight: HTMLElement;
  stackLeft: HTMLElement;
  stackRight: HTMLElement;
}

type ChangeHandler = (index: number) => void;
type FlipStartHandler = () => void;

export class PageController {
  pages: HTMLElement[] = [];
  index = 0;
  mode: BookMode = "spread";
  busy = false;

  private refs: FlipRefs;
  private store: HTMLElement | null = null;
  private tween: gsap.core.Tween | null = null;
  private pending: number | null = null;
  /** Destination of the turn in progress. */
  private target = 0;

  onChange: ChangeHandler = () => {};
  onFlipStart: FlipStartHandler = () => {};

  constructor(book: HTMLElement, store: HTMLElement) {
    const q = <T extends HTMLElement>(sel: string) => book.querySelector<T>(sel)!;
    this.refs = {
      book,
      store,
      slotLeft: q("[data-slot-left]"),
      slotRight: q("[data-slot-right]"),
      coverSlot: q("[data-cover-slot]"),
      leaf: q("[data-leaf]"),
      leafFront: q("[data-leaf-front]"),
      leafBack: q("[data-leaf-back]"),
      frontShade: q(".leaf__front .leaf__shade"),
      backShade: q(".leaf__back .leaf__shade"),
      castLeft: q("[data-cast-left]"),
      castRight: q("[data-cast-right]"),
      stackLeft: q("[data-stack-left]"),
      stackRight: q("[data-stack-right]"),
    };
  }

  /* ── Loading & placing pages ─────────────────────────────────────────── */

  load(storeBook: HTMLElement): void {
    this.store = storeBook;
    this.pages = Array.from(storeBook.querySelectorAll<HTMLElement>(":scope > .page")).sort(
      (a, b) => Number(a.dataset.pageIndex) - Number(b.dataset.pageIndex),
    );
    this.index = 0;
  }

  get count(): number {
    return this.pages.length;
  }

  /** Step size: two pages per spread, one in single mode. */
  private get step(): number {
    return this.mode === "spread" ? 2 : 1;
  }

  /** Snap an index to the first page of its spread. */
  normalize(index: number): number {
    const i = clamp(Math.round(index), 0, this.count - 1);
    return this.mode === "spread" ? i - (i % 2) : i;
  }

  canPrev(): boolean {
    return this.index > 0;
  }

  canNext(): boolean {
    return this.index + this.step < this.count;
  }

  /** Indices currently visible to the reader. */
  visible(): number[] {
    return this.mode === "spread" ? [this.index, this.index + 1].filter((i) => i < this.count) : [this.index];
  }

  /** Put `page` (or nothing) into `slot`, returning whatever was there to the store. */
  private place(slot: HTMLElement, page: HTMLElement | null | undefined): void {
    for (const child of Array.from(slot.children)) {
      if (child !== page) this.store?.appendChild(child);
    }
    if (page && page.parentElement !== slot) slot.appendChild(page);
  }

  /** Lay out the static spread for the current index (no animation). */
  layout(index = this.index): void {
    const { slotLeft, slotRight, coverSlot, leafFront, leafBack } = this.refs;
    this.index = this.normalize(index);
    this.place(leafFront, null);
    this.place(leafBack, null);
    this.place(coverSlot, null);
    if (this.mode === "spread") {
      this.place(slotLeft, this.pages[this.index]);
      this.place(slotRight, this.pages[this.index + 1]);
    } else {
      this.place(slotLeft, null);
      this.place(slotRight, this.pages[this.index]);
    }
    this.updateStacks();
  }

  /** Before the opening animation: page 0 is printed on the inside of the cover. */
  layoutForOpening(index: number): void {
    const { slotLeft, slotRight, coverSlot } = this.refs;
    this.index = this.normalize(index);
    if (this.mode === "spread") {
      this.place(slotLeft, null);
      this.place(coverSlot, this.pages[this.index]);
      this.place(slotRight, this.pages[this.index + 1]);
    } else {
      this.place(slotLeft, null);
      this.place(coverSlot, null);
      this.place(slotRight, this.pages[this.index]);
    }
    this.updateStacks();
  }

  /** Before closing: the visible left page travels with the cover. */
  layoutForClosing(): void {
    if (this.mode !== "spread") return;
    this.place(this.refs.coverSlot, this.pages[this.index]);
  }

  /** Return every page to the store. */
  clear(): void {
    const { slotLeft, slotRight, coverSlot, leafFront, leafBack } = this.refs;
    [slotLeft, slotRight, coverSlot, leafFront, leafBack].forEach((s) => this.place(s, null));
    this.tween?.kill();
    this.tween = null;
    this.busy = false;
    this.pending = null;
    this.resetLeaf();
  }

  setMode(mode: BookMode): void {
    if (mode === this.mode) return;
    this.tween?.progress(1);
    this.mode = mode;
    this.refs.book.dataset.mode = mode;
  }

  /** Layered paper edges: thicker on the side with more pages. */
  updateStacks(): void {
    const { stackLeft, stackRight } = this.refs;
    const total = Math.max(1, this.count - 1);
    const read = this.index / total;
    const layers = (share: number) => Math.round(clamp(share, 0, 1) * 5) + 1;
    stackLeft.style.boxShadow = this.mode === "spread" ? paperEdges(layers(read), -1) : "none";
    stackRight.style.boxShadow = paperEdges(layers(1 - read), 1);
  }

  /* ── Turning pages ───────────────────────────────────────────────────── */

  next(): void {
    this.go(this.base() + this.step);
  }

  prev(): void {
    this.go(this.base() - this.step);
  }

  /** Where the book will be once queued turns finish — so rapid clicks add up. */
  private base(): number {
    return this.busy ? (this.pending ?? this.target) : this.index;
  }

  /** Turn to any page; animates a single leaf even for big jumps. */
  go(target: number): void {
    const to = this.normalize(target);
    if (this.busy) {
      // Queue the latest request and hurry the current turn along.
      if (to !== this.target) this.pending = to;
      this.tween?.timeScale(2.4);
      return;
    }
    if (to === this.index || this.count === 0) return;
    this.flip(to);
  }

  private flip(to: number): void {
    const forward = to > this.index;
    const from = this.index;
    const { mode } = this;
    const r = this.refs;
    const pageW = r.slotRight.offsetWidth;
    const closedLeft = r.slotRight.offsetLeft;
    const bookW = r.book.offsetWidth;
    const duration = prefersReducedMotion() ? 0.35 : siteConfig.animation.pageFlipDuration;

    this.busy = true;
    this.target = to;
    this.onFlipStart();

    // Dress the leaf and the pages underneath it.
    r.leaf.classList.toggle("is-backward", forward === false && mode === "spread");
    if (mode === "spread") {
      if (forward) {
        this.place(r.leafFront, this.pages[from + 1]);
        this.place(r.leafBack, this.pages[to]);
        this.place(r.slotRight, this.pages[to + 1]);
      } else {
        this.place(r.leafFront, this.pages[from]);
        this.place(r.leafBack, this.pages[to + 1]);
        this.place(r.slotLeft, this.pages[to]);
      }
    } else {
      this.place(r.leafBack, null);
      if (forward) {
        this.place(r.leafFront, this.pages[from]);
        this.place(r.slotRight, this.pages[to]);
      } else {
        this.place(r.leafFront, this.pages[to]);
      }
    }

    const reduced = prefersReducedMotion();
    // scaleX path of the sheet. Negative = it has crossed the spine (back face showing).
    const [start, end] = mode === "spread" ? [1, -1] : forward ? [1, 0] : [0, 1];
    // +1 when the leaf hinges on its left edge, -1 when on its right edge (spread, backwards).
    const hinge = r.leaf.classList.contains("is-backward") ? -1 : 1;

    // Per-frame setters (no tween allocation inside onUpdate).
    const setter = (el: HTMLElement, prop: string, unit?: string) =>
      gsap.quickSetter(el, prop, unit) as (value: number) => void;
    const set = {
      scaleX: setter(r.leaf, "scaleX"),
      scaleY: setter(r.leaf, "scaleY"),
      skew: setter(r.leaf, "skewY", "deg"),
      alpha: setter(r.leaf, "opacity"),
      rightX: setter(r.castRight, "x", "px"),
      rightScale: setter(r.castRight, "scaleX"),
      rightAlpha: setter(r.castRight, "opacity"),
      leftX: setter(r.castLeft, "x", "px"),
      leftScale: setter(r.castLeft, "scaleX"),
      leftAlpha: setter(r.castLeft, "opacity"),
    };
    gsap.set(r.castRight, { transformOrigin: "0 50%" });
    gsap.set(r.castLeft, { transformOrigin: "100% 50%" });

    let flipped = false;
    const render = (sx: number) => {
      const p = Math.abs(sx - start) / Math.abs(end - start); // 0 → 1 progress of the turn
      const lift = reduced ? 0 : Math.sin(p * Math.PI);
      set.scaleX(Math.abs(sx) < 0.001 ? 0.001 : sx);
      // A touch of height and skew mid-turn so the free edge rises like paper.
      set.scaleY(1 + lift * 0.02);
      set.skew(-hinge * Math.sign(sx || 1) * lift * 2.5);
      // Single-page mode: the sheet fades as it folds into the spine.
      set.alpha(mode === "single" ? clamp(sx / 0.25, 0, 1) : 1);

      if (sx < 0 !== flipped) {
        flipped = sx < 0;
        r.leaf.classList.toggle("is-flipped", flipped);
      }

      // Light falls off as the sheet stands up, then returns as it lands.
      const shade = String((1 - Math.abs(sx)) * 0.85);
      r.frontShade.style.opacity = shade;
      r.backShade.style.opacity = shade;

      this.castShadow(set, closedLeft + hinge * pageW * sx, p, pageW, closedLeft, bookW);
    };

    r.leaf.classList.add("is-active");
    render(start);

    const state = { sx: start };
    this.tween = gsap.to(state, {
      sx: end,
      duration,
      ease: reduced ? "power1.inOut" : siteConfig.animation.easeFlip,
      onUpdate: () => render(state.sx),
      onComplete: () => this.finishFlip(to, forward),
    });
  }

  /**
   * The leaf throws a soft shadow on whichever page it hovers over: a gradient
   * slid to just beyond the sheet's free edge (`edgeX`, in book coordinates).
   */
  private castShadow(
    set: Record<"rightX" | "rightScale" | "rightAlpha" | "leftX" | "leftScale" | "leftAlpha", (v: number) => void>,
    edgeX: number,
    p: number,
    pageW: number,
    spine: number,
    bookW: number,
  ): void {
    const w = pageW * 0.45;
    const strength = Math.sin(p * Math.PI) * 0.8;

    if (edgeX >= spine) {
      set.rightX(edgeX);
      set.rightScale(clamp((bookW - edgeX) / w, 0, 1));
      set.rightAlpha(strength);
      set.leftAlpha(0);
    } else {
      set.leftX(edgeX - w);
      set.leftScale(clamp(edgeX / w, 0, 1));
      set.leftAlpha(strength);
      set.rightAlpha(0);
    }
  }

  private finishFlip(to: number, forward: boolean): void {
    const r = this.refs;
    if (this.mode === "spread") {
      if (forward) this.place(r.slotLeft, this.pages[to]);
      else this.place(r.slotRight, this.pages[to + 1]);
    } else if (!forward) {
      this.place(r.slotRight, this.pages[to]);
    }
    this.place(r.leafFront, null);
    this.place(r.leafBack, null);
    this.resetLeaf();

    this.index = to;
    this.tween = null;
    this.busy = false;
    this.updateStacks();
    this.onChange(this.index);

    if (this.pending !== null) {
      const next = this.pending;
      this.pending = null;
      if (next !== this.index) this.flip(next);
    }
  }

  private resetLeaf(): void {
    const r = this.refs;
    r.leaf.classList.remove("is-active", "is-flipped");
    gsap.set(r.leaf, { clearProps: "transform,opacity,visibility" });
    gsap.set([r.castLeft, r.castRight], { opacity: 0 });
    r.frontShade.style.opacity = "0";
    r.backShade.style.opacity = "0";
  }
}

/** Builds stacked box-shadows that read as the edges of several sheets of paper. */
function paperEdges(layers: number, dir: 1 | -1): string {
  const out: string[] = [];
  for (let i = 1; i <= layers; i++) {
    const x = dir * i * 1.5;
    const y = i * 1.1;
    out.push(`${x}px ${y}px 0 0 ${i % 2 ? "#f6f2ea" : "#d6cfc1"}`);
  }
  out.push(`${dir * (layers + 1) * 1.5}px ${(layers + 1) * 1.1}px 0 0 rgb(27 26 24 / 0.55)`);
  out.push(`${dir * 8}px 10px 18px rgb(27 26 24 / 0.16)`);
  return out.join(",");
}
