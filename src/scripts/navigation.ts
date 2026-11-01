/**
 * NAVIGATION — keyboard, buttons, page-edge clicks, swipes and URL hash.
 *
 * Hash format: #/<book-id>[/<page>] e.g. #/portfolio/4
 */
import { siteConfig, type BookId } from "../config/site.config";
import type { BookViewer } from "./book-viewer";
import type { Bookshelf } from "./bookshelf";

interface NavDeps {
  viewer: BookViewer;
  shelf: Bookshelf;
  isLightboxOpen: () => boolean;
}

const INTERACTIVE = "a, button, input, textarea, select, label, [data-lightbox], [role='button']";

/** Events can target the window/document (e.g. keyboard with nothing focused). */
const elementOf = (t: EventTarget | null): Element | null => (t instanceof Element ? t : null);

export function parseHash(): { book: BookId; page: number } | null {
  const m = window.location.hash.match(/^#\/([\w-]+)(?:\/(\d+))?/);
  if (!m) return null;
  const book = siteConfig.books.find((b) => b.id === m[1]);
  return book ? { book: book.id, page: m[2] ? Number(m[2]) : 0 } : null;
}

export function initNavigation({ viewer, shelf, isLightboxOpen }: NavDeps): void {
  const nav = siteConfig.navigation;
  const book = viewer.bookEl;

  /* ── Buttons inside the viewer (delegated) ───────────────────────────── */
  viewer.root.addEventListener("click", (e) => {
    const target = elementOf(e.target);
    if (!target) return;
    const btn = target.closest<HTMLElement>("[data-next], [data-prev], [data-close], [data-goto], [data-goto-page]");
    if (btn) {
      if (btn.hasAttribute("data-next")) viewer.next();
      else if (btn.hasAttribute("data-prev")) viewer.prev();
      else if (btn.hasAttribute("data-close")) requestClose();
      else if (btn.dataset.goto) viewer.goToAnchor(btn.dataset.goto);
      else if (btn.dataset.gotoPage) viewer.goToPage(Number(btn.dataset.gotoPage));
      return;
    }

    // Click on the outer part of a page turns it.
    if (nav.clickPageEdges && book.contains(target) && !target.closest(INTERACTIVE)) {
      const zone = edgeZone(e.clientX);
      if (zone === "next") viewer.next();
      if (zone === "prev") viewer.prev();
    }
  });

  /* ── Page-edge hover: corner curl + cursor label ─────────────────────── */
  const edgeZone = (clientX: number): "next" | "prev" | null => {
    const r = book.getBoundingClientRect();
    const x = (clientX - r.left) / r.width;
    const single = book.dataset.mode === "single";
    if (x < 0 || x > 1) return null;
    if (x > (single ? 0.62 : 0.8)) return viewer.controller.canNext() ? "next" : null;
    if (x < (single ? 0.28 : 0.2)) return viewer.controller.canPrev() ? "prev" : null;
    return null;
  };

  if (nav.clickPageEdges) {
    book.addEventListener("pointermove", (e) => {
      if (e.pointerType !== "mouse" || book.dataset.state !== "open") return;
      const overInteractive = elementOf(e.target)?.closest(INTERACTIVE);
      const zone = overInteractive ? null : edgeZone(e.clientX);
      book.classList.toggle("is-hover-next", zone === "next");
      book.classList.toggle("is-hover-prev", zone === "prev");
      book.dataset.cursor = zone ?? "";
    });
    book.addEventListener("pointerleave", () => {
      book.classList.remove("is-hover-next", "is-hover-prev");
      book.dataset.cursor = "";
    });
  }

  /* ── Keyboard ────────────────────────────────────────────────────────── */
  if (nav.keyboard) {
    window.addEventListener("keydown", (e) => {
      if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey || isLightboxOpen()) return;
      const typing = elementOf(e.target)?.closest("input, textarea, select, [contenteditable]");
      if (typing) return;

      if (viewer.isOpen) {
        switch (e.key) {
          case "ArrowRight":
          case "PageDown":
            e.preventDefault();
            viewer.next();
            break;
          case "ArrowLeft":
          case "PageUp":
            e.preventDefault();
            viewer.prev();
            break;
          case "Home":
            e.preventDefault();
            viewer.goToPage(0);
            break;
          case "End":
            e.preventDefault();
            viewer.goToPage(viewer.controller.count - 1);
            break;
          case "Escape":
            e.preventDefault();
            requestClose();
            break;
        }
      } else if (!viewer.busy && (e.key === "ArrowRight" || e.key === "ArrowLeft")) {
        // Nothing focused yet: arrows start browsing the shelf.
        if (!shelf.buttons.includes(document.activeElement as HTMLButtonElement)) {
          e.preventDefault();
          shelf.buttons[e.key === "ArrowRight" ? 0 : shelf.buttons.length - 1].focus();
        }
      }
    });
  }

  /* ── Touch swipes ────────────────────────────────────────────────────── */
  if (nav.swipe) {
    let start: { x: number; y: number; t: number } | null = null;
    viewer.stageEl.addEventListener(
      "pointerdown",
      (e) => {
        if (e.pointerType === "mouse") return;
        start = { x: e.clientX, y: e.clientY, t: performance.now() };
      },
      { passive: true },
    );
    viewer.stageEl.addEventListener(
      "pointerup",
      (e) => {
        if (!start) return;
        const dx = e.clientX - start.x;
        const dy = e.clientY - start.y;
        const dt = performance.now() - start.t;
        start = null;
        if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.4 && dt < 700) {
          if (dx < 0) viewer.next();
          else viewer.prev();
        }
      },
      { passive: true },
    );
    viewer.stageEl.addEventListener("pointercancel", () => (start = null));
  }

  /* ── URL hash ──────────────────────────────────────────────────────────
   * Opening a book pushes a history entry so the browser's Back button closes
   * it. Closing from the UI never calls history.back() (browsers may skip or
   * leave the site); it simply rewrites the current entry. */
  function requestClose(): void {
    if (!viewer.isOpen || viewer.busy) return;
    if (nav.useHash) history.replaceState(null, "", location.pathname + location.search);
    void viewer.close();
  }

  if (nav.useHash) {
    viewer.onOpenChange = (open) => {
      if (open && !parseHash()) history.pushState({ book: viewer.current?.id }, "", `#/${viewer.current?.id}`);
    };
    viewer.onPageChange = (id, index) => {
      const hash = index > 0 ? `#/${id}/${index}` : `#/${id}`;
      if (location.hash !== hash) history.replaceState(history.state, "", hash);
    };
    window.addEventListener("popstate", () => {
      const route = parseHash();
      if (!route && viewer.isOpen) void viewer.close();
      else if (route && !viewer.isOpen) void viewer.open(route.book, shelf.button(route.book), { page: route.page });
      else if (route && viewer.isOpen && viewer.current?.id === route.book) viewer.goToPage(route.page);
    });
  }
}
