/**
 * Safety net for "no scrolling, ever": if a page's content is taller than the
 * page (long placeholder text, tiny landscape phones…), shrink its type in
 * small steps via the --fit custom property until it fits.
 */
const MIN_FIT = 0.6;
const STEP = 0.04;

export function fitPage(page: HTMLElement): void {
  const inner = page.querySelector<HTMLElement>(".page__inner");
  if (!inner) return;
  let fit = 1;
  page.style.setProperty("--fit", "1");
  while (inner.scrollHeight > inner.clientHeight + 1 && fit > MIN_FIT) {
    fit = Math.max(MIN_FIT, fit - STEP);
    page.style.setProperty("--fit", fit.toFixed(2));
  }
}

export function fitPages(pages: HTMLElement[]): void {
  pages.forEach(fitPage);
}
