/**
 * Entry point — wires the shelf, the book viewer and the small UI pieces.
 * Everything runs once on page load; the site is a single, persistent scene.
 */
import { gsap } from "gsap";
import { siteConfig } from "../config/site.config";
import { Bookshelf } from "./bookshelf";
import { BookViewer } from "./book-viewer";
import { initNavigation, parseHash } from "./navigation";
import { initCursor } from "./cursor";
import { initCopyButtons, initLightbox } from "./lightbox";
import { SoundFX } from "./sound";
import { detectLite, prefersReducedMotion } from "./motion";

/** Wait for fonts (so measurements are right), with a floor & ceiling on the wait. */
async function hideLoader(): Promise<void> {
  const loader = document.querySelector<HTMLElement>("[data-loader]");
  const fonts = document.fonts?.ready ?? Promise.resolve();
  const timeout = new Promise((r) => setTimeout(r, 2500));
  const minimum = new Promise((r) => setTimeout(r, loader ? 900 : 0));
  await Promise.all([Promise.race([fonts, timeout]), minimum]);
  if (!loader) return;
  await gsap.to(loader, { autoAlpha: 0, duration: prefersReducedMotion() ? 0.2 : 0.6, ease: "power2.inOut" });
  loader.remove();
}

export function boot(): void {
  // Handy while developing: `gsap.globalTimeline.timeScale(0.2)` in the console to study the motion.
  if (import.meta.env.DEV) (window as unknown as { gsap: typeof gsap }).gsap = gsap;
  const html = document.documentElement;
  // Low-end devices get a lighter experience (see siteConfig.performance).
  const lite = detectLite(siteConfig.performance.liteMode);
  html.classList.toggle("lite", lite);
  if (lite || !siteConfig.animation.enableIdleAnimation || prefersReducedMotion()) html.classList.add("no-idle");
  if (!siteConfig.animation.enableHoverTilt) html.classList.add("no-hover-tilt");

  const sound = new SoundFX();
  const viewer = new BookViewer(sound);
  const shelf = new Bookshelf((id, button) => void viewer.open(id, button));
  const lightbox = initLightbox();

  initNavigation({ viewer, shelf, isLightboxOpen: lightbox.isOpen });
  if (!lite) initCursor();
  initCopyButtons();

  // Pause the shelf's idle motion while a book is open (saves battery).
  const onOpenChange = viewer.onOpenChange;
  viewer.onOpenChange = (open) => {
    onOpenChange(open);
    shelf.pauseIdle(open);
  };

  gsap.set(shelf.root, { autoAlpha: 0 });
  void hideLoader().then(async () => {
    const route = siteConfig.navigation.useHash ? parseHash() : null;
    if (route) {
      gsap.set(shelf.root, { autoAlpha: 1 });
      await viewer.open(route.book, shelf.button(route.book), { instant: true, page: route.page });
      void shelf.entrance();
    } else {
      await shelf.entrance();
    }
  });
}
