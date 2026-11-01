/**
 * BOOK VIEWER — owns the single book element and coordinates:
 *   shelf spine → book (matched to the spine's rect) → open spread → page turning → back.
 */
import { gsap } from "gsap";
import { siteConfig, type BookConfig, type BookId } from "../config/site.config";
import { PageController, type BookMode } from "./page-flip";
import {
  closeAndReturn,
  fadeClose,
  fadeOpen,
  pullFromShelf,
  settleOnShelf,
  travelAndOpen,
  type BookParts,
  type Pose,
} from "./book-animation";
import { fitPages } from "./fit";
import { clamp, debounce, isLite, nextFrame, prefersReducedMotion, singlePageQuery } from "./motion";
import type { SoundFX } from "./sound";

interface OpenOptions {
  instant?: boolean;
  page?: number;
}

export class BookViewer {
  readonly root: HTMLElement;
  readonly controller: PageController;
  current: BookConfig | null = null;
  busy = false;

  private parts: BookParts;
  private stage: HTMLElement;
  private store: HTMLElement;
  private backBoard: HTMLElement;
  private shelfScene: HTMLElement;
  private title: HTMLElement;
  private counts: HTMLElement[];
  private progress: HTMLElement | null;
  private prevButtons: HTMLButtonElement[];
  private nextButtons: HTMLButtonElement[];
  private announcer: HTMLElement | null;
  private hint: HTMLElement | null;
  private shelfButton: HTMLElement | null = null;
  private mq = singlePageQuery();

  /** Called whenever the visible page changes (hash routing, etc.). */
  onPageChange: (book: BookId, index: number) => void = () => {};
  onOpenChange: (open: boolean) => void = () => {};

  constructor(private sound: SoundFX) {
    this.root = document.querySelector<HTMLElement>("[data-viewer]")!;
    const book = this.root.querySelector<HTMLElement>("[data-book]")!;
    this.stage = this.root.querySelector<HTMLElement>("[data-stage]")!;
    this.store = this.root.querySelector<HTMLElement>("[data-store]")!;
    this.backBoard = book.querySelector<HTMLElement>("[data-back-board]")!;
    this.shelfScene = document.querySelector<HTMLElement>("#shelf-scene")!;
    this.title = this.root.querySelector<HTMLElement>("[data-viewer-title]")!;
    this.counts = Array.from(this.root.querySelectorAll<HTMLElement>("[data-page-count]"));
    this.progress = this.root.querySelector<HTMLElement>("[data-progress]");
    this.prevButtons = Array.from(this.root.querySelectorAll<HTMLButtonElement>("button[data-prev]"));
    this.nextButtons = Array.from(this.root.querySelectorAll<HTMLButtonElement>("button[data-next]"));
    this.announcer = this.root.querySelector<HTMLElement>("[data-announcer]");
    this.hint = this.root.querySelector<HTMLElement>("[data-hint-keys]");

    this.parts = {
      book,
      cover: book.querySelector<HTMLElement>("[data-cover]")!,
      coverShade: book.querySelector<HTMLElement>("[data-cover-shade]")!,
      castRight: book.querySelector<HTMLElement>("[data-cast-right]")!,
      floorShadow: book.querySelector<HTMLElement>("[data-floor-shadow]")!,
      backdrop: this.root.querySelector<HTMLElement>("[data-backdrop]")!,
      camera: document.querySelector<HTMLElement>("[data-camera]")!,
      chrome: Array.from(this.root.querySelectorAll<HTMLElement>("[data-chrome]")),
    };

    this.controller = new PageController(book, this.store);
    this.controller.onFlipStart = () => this.sound.play("flip");
    this.controller.onChange = (i) => this.afterPageChange(i);

    window.addEventListener("resize", debounce(() => this.handleResize(), 140));
  }

  get isOpen(): boolean {
    return this.current !== null;
  }

  private get mode(): BookMode {
    return this.mq.matches ? "single" : "spread";
  }

  /* ── Geometry ────────────────────────────────────────────────────────── */

  private geometry() {
    const { book } = this.parts;
    const cols = this.mode === "spread" ? 2 : 1;
    const width = book.offsetWidth;
    const height = book.offsetHeight;
    const pageW = width / cols;
    const closedLeft = pageW * (cols - 1);
    return { width, height, pageW, closedLeft, closedX: -closedLeft / 2 };
  }

  /**
   * The transform that squeezes the closed book (its back board = the closed
   * book's footprint) onto the shelf spine's rectangle. Pure 2D, so a single
   * measurement is exact. Leaves the book in its centred, closed pose.
   */
  private solveShelfPose(target: DOMRect, lean: number): Pose {
    const { book } = this.parts;
    const geo = this.geometry();
    const boardW = this.backBoard.offsetWidth;
    gsap.set(book, {
      x: geo.closedX,
      y: 0,
      scaleX: 1,
      scaleY: 1,
      rotation: 0,
      transformOrigin: `${geo.closedLeft + boardW / 2}px 50%`,
    });
    const c = this.backBoard.getBoundingClientRect();
    return {
      x: geo.closedX + (target.left + target.width / 2) - (c.left + c.width / 2),
      y: target.top + target.height / 2 - (c.top + c.height / 2),
      scaleX: target.width / c.width,
      scaleY: target.height / c.height,
      rotation: lean,
    };
  }

  /* ── Dressing the book ───────────────────────────────────────────────── */

  private dress(book: BookConfig): void {
    const { book: el, cover: coverEl } = this.parts;
    const coverFront = coverEl.querySelector<HTMLElement>("[data-cover-front]")!;
    // Swap tone class
    el.className = el.className.replace(/\btone-\S+/g, "").trim();
    el.classList.add(`tone-${book.tone}`);
    el.dataset.mode = this.mode;
    this.controller.setMode(this.mode);

    const cover = this.root.querySelector<HTMLTemplateElement>(`template[data-cover-template="${book.id}"]`);
    coverFront.replaceChildren(cover ? cover.content.cloneNode(true) : "");

    this.store.querySelectorAll(".page-store__book").forEach((s) => s.classList.remove("is-current"));
    const storeBook = this.store.querySelector<HTMLElement>(`[data-store-book="${book.id}"]`)!;
    storeBook.classList.add("is-current");
    this.controller.load(storeBook);

    this.title.textContent = book.title;
  }

  /* ── Open ────────────────────────────────────────────────────────────── */

  async open(id: BookId, shelfButton: HTMLElement | null, options: OpenOptions = {}): Promise<void> {
    if (this.busy || this.isOpen) return;
    const config = siteConfig.books.find((b) => b.id === id);
    if (!config) return;

    this.busy = true;
    this.current = config;
    this.shelfButton = shelfButton;
    const { book, cover, chrome, camera } = this.parts;

    this.root.classList.add("is-active");
    document.documentElement.classList.add("book-open");
    this.shelfScene.inert = true;
    this.dress(config);
    this.onOpenChange(true);

    // Pages can only be measured once the viewer is laid out.
    fitPages(this.controller.pages);
    const startPage = this.controller.normalize(options.page ?? 0);
    const instant = options.instant || prefersReducedMotion() || !shelfButton;
    gsap.set(chrome, { autoAlpha: 0 });

    if (instant) {
      this.controller.layout(startPage);
      this.setState("open");
      gsap.set(book, { clearProps: "transform" });
      gsap.set(cover, { scaleX: -1, autoAlpha: this.mode === "spread" ? 1 : 0 });
      cover.classList.add("is-flipped");
      if (shelfButton) {
        // Leave the shelf as if the book had been pulled out, so closing can fly it back.
        const r = shelfButton.getBoundingClientRect();
        gsap.set(shelfButton, { autoAlpha: 0, yPercent: -9, scale: 1.04 });
        gsap.set(camera, {
          scale: isLite() ? 1 : siteConfig.animation.cameraZoom,
          transformOrigin: `${r.left + r.width / 2}px ${r.top + r.height / 2}px`,
        });
      }
      this.sound.play("open");
      await fadeOpen(this.parts);
    } else {
      await this.cinematicOpen(config, shelfButton!, startPage);
    }

    this.afterPageChange(this.controller.index, true);
    this.busy = false;
    this.showHintOnce();
    this.root.querySelector<HTMLElement>("[data-close]")?.focus({ preventScroll: true });
  }

  private async cinematicOpen(config: BookConfig, shelfButton: HTMLElement, startPage: number): Promise<void> {
    const { book, cover } = this.parts;
    const geo = this.geometry();

    // 1. Pull the spine out of the shelf.
    const spineRect = shelfButton.getBoundingClientRect();
    const focus = { x: spineRect.left + spineRect.width / 2, y: spineRect.top + spineRect.height / 2 };
    await pullFromShelf(shelfButton, this.parts.camera, focus);

    // 2. Dress the closed book and render one invisible frame at full size, so
    //    its GPU layer is rasterised sharp before we shrink it onto the spine.
    this.controller.layoutForOpening(startPage);
    cover.classList.remove("is-flipped");
    gsap.set(cover, { scaleX: 1, autoAlpha: 1 });
    gsap.set(book, { autoAlpha: 0 });
    this.setState("transit");
    const from = this.solveShelfPose(shelfButton.getBoundingClientRect(), config.lean ?? 0);
    await nextFrame();

    // Content of the first visible right-hand page settles in as the cover opens.
    const rightPage = this.controller.pages[this.mode === "spread" ? startPage + 1 : startPage];
    const reveal = rightPage ? Array.from(rightPage.querySelectorAll(".page__inner > * > *")).slice(0, 8) : [];

    this.sound.play("open", siteConfig.animation.bookTravelDuration * 0.8);
    await travelAndOpen(this.parts, {
      from,
      closedX: geo.closedX,
      mode: this.mode,
      closedLeft: geo.closedLeft,
      spine: shelfButton,
      reveal,
    });

    // 3. Reading mode: page 0 leaves the cover for the left slot.
    this.setState("open");
    this.controller.layout(startPage);
  }

  /* ── Close ───────────────────────────────────────────────────────────── */

  async close(): Promise<void> {
    if (this.busy || !this.isOpen) return;
    this.busy = true;
    const { book, cover, camera } = this.parts;
    const shelfButton = this.shelfButton;
    const reduced = prefersReducedMotion() || !shelfButton;

    this.hideHint();
    this.controller.clear();
    this.controller.layout(this.controller.index);

    if (reduced) {
      this.sound.play("close");
      await fadeClose(this.parts);
      if (shelfButton) gsap.set(shelfButton, { clearProps: "all" });
    } else {
      const geo = this.geometry();
      const lean = this.current?.lean ?? 0;

      // Measure the shelf spine with the camera at rest (synchronously restored —
      // nothing is painted in between).
      const zoomed = gsap.getProperty(camera, "scale") as number;
      gsap.set(camera, { scale: 1 });
      gsap.set(shelfButton, { yPercent: -9, scale: 1.04 });
      const target = shelfButton.getBoundingClientRect();
      gsap.set(camera, { scale: zoomed });

      this.setState("transit");
      const to = this.solveShelfPose(target, lean);
      gsap.set(book, { x: 0 }); // back to the open pose; the timeline slides it closed

      this.controller.layoutForClosing();
      if (this.mode === "single") gsap.set(cover, { autoAlpha: 0 });

      this.sound.play("close", siteConfig.animation.bookCloseDuration * 0.45);
      await closeAndReturn(this.parts, { to, closedX: geo.closedX, mode: this.mode, spine: shelfButton });
      void settleOnShelf(shelfButton);
    }

    // Reset everything for the next book.
    this.controller.clear();
    this.setState("hidden");
    gsap.set(book, { clearProps: "all" });
    gsap.set(cover, { clearProps: "all" });
    cover.classList.remove("is-flipped");
    gsap.set(this.parts.coverShade, { clearProps: "opacity" });
    gsap.set(this.parts.chrome, { clearProps: "all" });
    this.root.classList.remove("is-active");
    document.documentElement.classList.remove("book-open");
    this.shelfScene.inert = false;
    this.current = null;
    this.busy = false;
    this.onOpenChange(false);
    shelfButton?.focus({ preventScroll: true });
  }

  /* ── Page turning API ────────────────────────────────────────────────── */

  next(): void {
    if (!this.busy && this.isOpen) this.controller.next();
  }

  prev(): void {
    if (!this.busy && this.isOpen) this.controller.prev();
  }

  goToPage(index: number): void {
    if (!this.busy && this.isOpen) this.controller.go(index);
  }

  goToAnchor(anchor: string): void {
    const page = this.controller.pages.find((p) => p.dataset.anchor === anchor);
    if (page) this.goToPage(Number(page.dataset.pageIndex));
  }

  /* ── State & chrome ──────────────────────────────────────────────────── */

  private setState(state: "hidden" | "transit" | "open"): void {
    this.parts.book.dataset.state = state;
  }

  private afterPageChange(index: number, initial = false): void {
    if (!this.current) return;
    const c = this.controller;
    const visible = c.visible();
    const total = c.count - 1;
    const numbered = visible.filter((i) => i > 0);
    const text = numbered.length ? `${numbered.length > 1 ? "pp." : "p."} ${numbered.join("–")} / ${total}` : `inside cover / ${total}`;
    this.counts.forEach((el) => (el.textContent = text));
    if (this.progress) this.progress.style.transform = `scaleX(${clamp((visible[visible.length - 1] ?? 0) / total, 0, 1)})`;
    this.prevButtons.forEach((b) => (b.disabled = !c.canPrev()));
    this.nextButtons.forEach((b) => (b.disabled = !c.canNext()));

    if (!initial && this.announcer) {
      const heading = c.pages[visible[0]]?.querySelector("h2, .pg-title, .toc__heading")?.textContent?.trim();
      this.announcer.textContent = `Page ${visible.join(" and ")} of ${total}${heading ? ` — ${heading}` : ""}`;
    }
    this.onPageChange(this.current.id, index);
  }

  private handleResize(): void {
    if (!this.isOpen || this.busy) return;
    const mode = this.mode;
    if (mode !== this.controller.mode) {
      const index = this.controller.index;
      this.controller.clear();
      this.controller.setMode(mode);
      this.parts.book.dataset.mode = mode;
      gsap.set(this.parts.cover, { autoAlpha: mode === "spread" ? 1 : 0 });
      this.controller.layout(index);
      this.afterPageChange(this.controller.index, true);
    }
    fitPages(this.controller.pages);
    this.controller.updateStacks();
  }

  private showHintOnce(): void {
    if (!siteConfig.navigation.showHints || !this.hint) return;
    try {
      if (sessionStorage.getItem("storybook:hint")) return;
      sessionStorage.setItem("storybook:hint", "1");
    } catch {
      /* ignore */
    }
    gsap.fromTo(this.hint, { autoAlpha: 0, y: 6 }, { autoAlpha: 1, y: 0, duration: 0.6, delay: 0.4 });
    gsap.to(this.hint, { autoAlpha: 0, duration: 0.6, delay: 5 });
  }

  private hideHint(): void {
    if (this.hint) gsap.to(this.hint, { autoAlpha: 0, duration: 0.2 });
  }

  /** Expose the stage for gesture handling. */
  get stageEl(): HTMLElement {
    return this.stage;
  }

  get bookEl(): HTMLElement {
    return this.parts.book;
  }
}
