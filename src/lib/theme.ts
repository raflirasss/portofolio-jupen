/**
 * Converts the theme / geometry parts of siteConfig into CSS custom
 * properties, injected once in BaseLayout. This is what lets you restyle the
 * site from `site.config.ts` without touching any stylesheet.
 */
import { siteConfig } from "../config/site.config";

export function themeCss(): string {
  const { theme: t, typography: ty, book: b } = siteConfig;

  const vars: Record<string, string | number> = {
    "--color-bg": t.background,
    "--color-paper": t.paper,
    "--color-paper-shade": t.paperShade,
    "--color-ink": t.foreground,
    "--color-muted": t.muted,
    "--color-line": t.line,
    "--accent-base": t.accent,
    "--accent-strength": t.accentStrength,
    "--grain-opacity": t.grain,
    "--font-heading": ty.heading,
    "--font-body": ty.body,
    "--font-hand": ty.hand,
    "--page-text-scale": ty.pageTextScale,
    "--page-ratio": b.pageRatio,
    "--page-max-h": `${b.maxPageHeight}px`,
    "--board-overhang": `${b.boardOverhang}px`,
  };

  const root = Object.entries(vars)
    .map(([k, v]) => `${k}:${v};`)
    .join("");

  // `html:root` outranks the fallback values in variables.css regardless of
  // stylesheet order. Media queries can't read custom properties, so the
  // single-page breakpoint is generated here from the config value too.
  return `html:root{${root}}
@media (max-width:${b.singlePageBreakpoint}px){html:root{--cols:1;--page-ratio:${b.pageRatioSingle};}}`;
}
