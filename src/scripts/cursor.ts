/**
 * INK CURSOR — a dot that follows the pointer exactly and a sketchy ring that
 * trails behind. Elements can request a label with `data-cursor="open"`.
 * Only enabled for mouse/trackpad users; touch devices keep native behaviour.
 */
import { siteConfig } from "../config/site.config";
import { hasFinePointer, prefersReducedMotion } from "./motion";

const HOVERABLE = "a, button, [role='button'], label, summary, [data-lightbox], [data-cursor]";

export function initCursor(): void {
  const cfg = siteConfig.cursor;
  const root = document.querySelector<HTMLElement>("[data-cursor-root]");
  if (!cfg.enabled || !root || !hasFinePointer()) return;

  const dot = root.querySelector<HTMLElement>("[data-cursor-dot]")!;
  const ring = root.querySelector<HTMLElement>("[data-cursor-ring]")!;
  const label = root.querySelector<HTMLElement>("[data-cursor-label]")!;
  const html = document.documentElement;
  html.classList.add("has-ink-cursor");
  if (!cfg.hideNative) html.classList.add("keep-native-cursor");

  const smoothing = prefersReducedMotion() ? 1 : 1 - Math.min(0.95, Math.max(0, cfg.smoothing)) * 0.9;
  const pos = { x: -100, y: -100 };
  const ringPos = { x: -100, y: -100 };
  let target: Element | null = null;
  let raf = 0;
  let visible = false;

  const render = () => {
    ringPos.x += (pos.x - ringPos.x) * smoothing;
    ringPos.y += (pos.y - ringPos.y) * smoothing;
    dot.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
    ring.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0)`;
    if (Math.abs(pos.x - ringPos.x) > 0.1 || Math.abs(pos.y - ringPos.y) > 0.1) {
      raf = requestAnimationFrame(render);
    } else {
      raf = 0;
    }
  };

  const updateState = () => {
    const hoverEl = target?.closest(HOVERABLE) ?? null;
    const text = hoverEl?.closest<HTMLElement>("[data-cursor]")?.dataset.cursor ?? "";
    root.classList.toggle("is-hover", !!hoverEl && !text);
    root.classList.toggle("has-label", !!text);
    if (text && label.textContent !== text) label.textContent = text;
  };

  window.addEventListener(
    "pointermove",
    (e) => {
      if (e.pointerType !== "mouse") return;
      pos.x = e.clientX;
      pos.y = e.clientY;
      target = e.target instanceof Element ? e.target : null;
      if (!visible) {
        visible = true;
        ringPos.x = pos.x;
        ringPos.y = pos.y;
        root.classList.remove("is-hidden");
      }
      updateState();
      if (!raf) raf = requestAnimationFrame(render);
    },
    { passive: true },
  );

  window.addEventListener("pointerdown", () => root.classList.add("is-down"));
  window.addEventListener("pointerup", () => root.classList.remove("is-down"));
  document.addEventListener("pointerleave", () => {
    visible = false;
    root.classList.add("is-hidden");
  });
  window.addEventListener("blur", () => root.classList.add("is-hidden"));
}
