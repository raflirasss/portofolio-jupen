/**
 * BOOKSHELF — entrance choreography, idle life, keyboard browsing.
 */
import { gsap } from "gsap";
import { siteConfig, type BookId } from "../config/site.config";
import { isLite, prefersReducedMotion } from "./motion";

type SelectHandler = (id: BookId, button: HTMLElement) => void;

export class Bookshelf {
  readonly root: HTMLElement;
  readonly buttons: HTMLButtonElement[];
  private books: HTMLElement[];
  private idle: gsap.core.Tween[] = [];

  constructor(private onSelect: SelectHandler) {
    this.root = document.querySelector<HTMLElement>("#shelf-scene")!;
    this.books = Array.from(this.root.querySelectorAll<HTMLElement>("[data-shelf-book]"));
    this.buttons = Array.from(this.root.querySelectorAll<HTMLButtonElement>("[data-book-id]"));

    // GSAP owns each book's transform from now on (CSS only provides the fallback lean).
    this.books.forEach((el) => gsap.set(el, { rotation: this.lean(el), transformOrigin: "50% 100%" }));

    this.buttons.forEach((btn, i) => {
      btn.addEventListener("click", () => this.onSelect(btn.dataset.bookId as BookId, btn));
      btn.addEventListener("keydown", (e) => this.handleKey(e, i));
    });
  }

  button(id: BookId): HTMLElement | null {
    return this.buttons.find((b) => b.dataset.bookId === id) ?? null;
  }

  private lean(el: HTMLElement): number {
    return parseFloat(getComputedStyle(el).getPropertyValue("--lean")) || 0;
  }

  /** Arrow keys move between books like a toolbar. */
  private handleKey(e: KeyboardEvent, i: number): void {
    const n = this.buttons.length;
    let next = -1;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (i + 1) % n;
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (i - 1 + n) % n;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = n - 1;
    if (next >= 0) {
      e.preventDefault();
      e.stopPropagation();
      this.buttons[next].focus();
    }
  }

  /** The room assembles: title inks in, plank slides, books drop onto the shelf. */
  entrance(): Promise<void> {
    const q = <T extends Element>(sel: string) => Array.from(this.root.querySelectorAll<T>(sel));
    const reveal = q<HTMLElement>("[data-reveal]");
    const plank = this.root.querySelector("[data-plank]");
    const brackets = q<SVGElement>(".shelf__bracket");
    const decos = q<HTMLElement>(".shelf-deco, .wall-deco");
    const hint = this.root.querySelector("[data-hint]");
    const footer = this.root.querySelector("[data-shelf-footer]");

    if (prefersReducedMotion()) {
      gsap.fromTo(this.root, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4 });
      this.startIdle();
      return Promise.resolve();
    }

    const d = siteConfig.animation.bookshelfEntranceDuration;
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.set(this.root, { autoAlpha: 1 });
    tl.from(reveal, { autoAlpha: 0, y: 18, duration: d * 0.7, stagger: 0.09 }, 0);
    tl.from(plank, { scaleX: 0.7, autoAlpha: 0, duration: d * 0.7, ease: "power4.out" }, d * 0.15);
    tl.from(brackets, { autoAlpha: 0, y: -10, duration: d * 0.4, stagger: 0.08 }, d * 0.35);
    tl.from(
      this.books,
      {
        y: () => -window.innerHeight * 0.55,
        rotation: () => gsap.utils.random(-14, 14),
        autoAlpha: 0,
        duration: d * 0.85,
        ease: "bounce.out",
        stagger: { each: d * 0.09, from: "center" },
      },
      d * 0.3,
    );
    tl.from(decos, { autoAlpha: 0, scale: 0.85, y: 12, duration: d * 0.6, stagger: 0.07, ease: "back.out(1.8)" }, d * 0.7);
    if (hint) tl.from(hint, { autoAlpha: 0, x: -10, duration: d * 0.6 }, d * 1.1);
    if (footer) tl.from(footer, { autoAlpha: 0, duration: d * 0.5 }, d * 1.0);
    // Restore each book's resting lean (the drop animated rotation to random values).
    tl.add(() => {
      this.books.forEach((el) => gsap.to(el, { rotation: this.lean(el), duration: 0.4 }));
      this.startIdle();
    });
    return new Promise<void>((resolve) => tl.eventCallback("onComplete", () => resolve()));
  }

  /** Each book breathes a tiny, unsynchronised sway. */
  private startIdle(): void {
    if (!siteConfig.animation.enableIdleAnimation || prefersReducedMotion() || isLite()) return;
    this.idle = this.books.map((el) => {
      const lean = this.lean(el);
      const amp = gsap.utils.random(0.35, 0.8);
      return gsap.fromTo(
        el,
        { rotation: lean - amp },
        {
          rotation: lean + amp,
          duration: gsap.utils.random(2.6, 4.2),
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: gsap.utils.random(0, 1.5),
        },
      );
    });
  }

  pauseIdle(paused: boolean): void {
    this.idle.forEach((t) => (paused ? t.pause() : t.resume()));
    document.documentElement.classList.toggle("no-idle", paused || !siteConfig.animation.enableIdleAnimation || isLite());
  }
}
