/**
 * Small hand-drawn icon set (24×24, stroke = currentColor).
 * Brand icons are intentionally drawn as simple monograms so they match the
 * sketchbook style instead of importing official logos.
 */
export const icons = {
  "arrow-left": `<path d="M19 12.5 C14 12 9 11.6 5 12"/><path d="M9.5 7.5 C8 9 6.4 10.6 5 12 c1.6 1.4 3 2.9 4.4 4.6"/>`,
  "arrow-right": `<path d="M5 11.5 C10 12 15 12.4 19 12"/><path d="M14.5 7.5 C16 9 17.6 10.6 19 12 c-1.6 1.4 -3 2.9 -4.4 4.6"/>`,
  close: `<path d="M6 6.4 C10 10 14 14.2 18 17.8"/><path d="M17.6 6 C14 9.8 10 13.8 6.2 18"/>`,
  "sound-on": `<path d="M4 9.5 h3.5 L12 5.5 v13 L7.5 14.5 H4 z"/><path d="M15.5 9 c1.4 1.8 1.4 4.2 0 6"/><path d="M18 6.5 c2.8 3.2 2.8 7.8 0 11"/>`,
  "sound-off": `<path d="M4 9.5 h3.5 L12 5.5 v13 L7.5 14.5 H4 z"/><path d="M15.5 9.5 l5 5 M20.5 9.5 l-5 5"/>`,
  mail: `<path d="M3.5 6.5 h17 v11 h-17 z"/><path d="M3.8 7 L12 13 L20.2 7"/>`,
  copy: `<path d="M8 8 h11 v12 H8 z"/><path d="M5 16 V4.5 h10.5"/>`,
  check: `<path d="M4.5 12.5 C6.5 14 8 15.8 9.5 18 C12.5 12.6 15.8 8.4 20 5"/>`,
  external: `<path d="M13 5 h6 v6"/><path d="M19 5 L11 13"/><path d="M17 14 v5 H5 V7 h5"/>`,
  link: `<path d="M10 14 L14 10"/><path d="M8.5 11.5 L6 14 a3.5 3.5 0 0 0 5 5 l2.5 -2.5"/><path d="M15.5 12.5 L18 10 a3.5 3.5 0 0 0 -5 -5 L10.5 7.5"/>`,
  coffee: `<path d="M5 9 h11 v5 a5 5 0 0 1 -5 5 h-1 a5 5 0 0 1 -5 -5 z"/><path d="M16 10.5 h1.5 a2.5 2.5 0 0 1 0 5 H16"/><path d="M8.5 6.5 c-.8 -1 .8 -2 0 -3 M12 6.5 c-.8 -1 .8 -2 0 -3"/>`,
  music: `<path d="M9 17.5 V6 l10 -2 v11.5"/><circle cx="7" cy="17.5" r="2.2"/><circle cx="17" cy="15.5" r="2.2"/>`,
  camera: `<path d="M4 8 h3.5 l1.5 -2.5 h6 L16.5 8 H20 v11 H4 z"/><circle cx="12" cy="13.5" r="3.4"/>`,
  mountain: `<path d="M3 19 L9.5 8 L13 13.5 L15.5 10 L21 19 z"/><path d="M8 10.5 l1.5 1.2 l1.4 -1.2"/>`,
  book: `<path d="M12 6.5 C9.5 5 6.5 4.6 4 5.2 V18 c2.6 -.6 5.4 -.2 8 1.3 c2.6 -1.5 5.4 -1.9 8 -1.3 V5.2 C17.5 4.6 14.5 5 12 6.5 z"/><path d="M12 6.5 V19"/>`,
  dice: `<path d="M5 5 h14 v14 H5 z"/><circle cx="9" cy="9" r=".9"/><circle cx="15" cy="15" r=".9"/><circle cx="12" cy="12" r=".9"/>`,
  pencil: `<path d="M4.5 19.5 l1 -4.5 L15.5 5 l3.5 3.5 L9 18.5 z"/><path d="M13.5 7 l3.5 3.5"/>`,
  star: `<path d="M12 4 l2.2 5 l5.3 .6 l-4 3.6 l1.2 5.3 L12 15.8 l-4.7 2.7 l1.2 -5.3 l-4 -3.6 l5.3 -.6 z"/>`,
  sparkle: `<path d="M12 3.5 C12.6 8.5 14 10.6 19.5 12 C14 13.4 12.6 15.5 12 20.5 C11.4 15.5 10 13.4 4.5 12 C10 10.6 11.4 8.5 12 3.5 z"/>`,
  "map-pin": `<path d="M12 20.5 C8 15.5 6 12.5 6 9.5 a6 6 0 0 1 12 0 c0 3 -2 6 -6 11 z"/><circle cx="12" cy="9.5" r="2.2"/>`,
  clock: `<circle cx="12" cy="12" r="8"/><path d="M12 7.5 V12 l3 2"/>`,
  download: `<path d="M12 4.5 V15"/><path d="M7.5 10.8 L12 15.2 L16.5 10.8"/><path d="M5 19.5 h14"/>`,
  shelf: `<path d="M2.5 20 h19"/><path d="M4.5 19.5 V7.5 h3.2 v12"/><path d="M8.7 19.5 V5 h3.6 v14.5"/><path d="M13.6 19.4 l2.6 -11.6 l3.2 .8 l-2.6 11.4"/><path d="M8.7 8 h3.6"/>`,
  home: `<path d="M4.5 11 L12 4.5 L19.5 11"/><path d="M6.5 9.5 V19 h11 V9.5"/><path d="M10.5 19 v-5 h3 v5"/>`,
  list: `<path d="M9 7 h11 M9 12 h11 M9 17 h11"/><circle cx="5" cy="7" r=".8"/><circle cx="5" cy="12" r=".8"/><circle cx="5" cy="17" r=".8"/>`,
  zoom: `<circle cx="10.5" cy="10.5" r="6"/><path d="M15 15 l5 5"/><path d="M8 10.5 h5 M10.5 8 v5"/>`,
  gamepad: `<path d="M6 8 h12 a4 4 0 0 1 4 4.5 l-.6 3.5 a2.2 2.2 0 0 1 -3.8 1 L15.5 15 h-7 l-2.1 2 a2.2 2.2 0 0 1 -3.8 -1 L2 12.5 A4 4 0 0 1 6 8 z"/><path d="M7.5 10.5 v3 M6 12 h3"/><circle cx="16" cy="11" r=".8"/><circle cx="17.5" cy="13" r=".8"/>`,
  // Monogram "brand" stamps — drawn as text so they inherit the hand font.
  artstation: `<text x="12" y="16.5" text-anchor="middle" font-size="13" stroke="none" fill="currentColor" style="font-family:var(--font-heading)" font-weight="700">A</text><path d="M4 19.5 h16"/>`,
  behance: `<text x="12" y="16" text-anchor="middle" font-size="11" stroke="none" fill="currentColor" style="font-family:var(--font-heading)" font-weight="700">Bē</text>`,
  linkedin: `<path d="M4 4 h16 v16 H4 z"/><text x="12" y="16.3" text-anchor="middle" font-size="10" stroke="none" fill="currentColor" style="font-family:var(--font-body)" font-weight="700">in</text>`,
  instagram: `<rect x="5" y="5" width="14" height="14" rx="4"/><circle cx="12" cy="12" r="3.5"/><circle cx="16.3" cy="7.7" r=".7"/>`,
  itch: `<text x="12" y="15.5" text-anchor="middle" font-size="8.5" stroke="none" fill="currentColor" style="font-family:var(--font-body)" font-weight="700">itch</text><path d="M3.5 18.5 c5 1 12 1 17 0"/>`,
  x: `<path d="M5.5 5 L18.5 19 M18.5 5 L5.5 19"/>`,
  bluesky: `<path d="M12 11 C9.5 6.5 6 5 4.5 5.5 C3 6.5 4.5 12 8 12.5 C5 13.5 5.5 17 8 17.5 C10 18 11.5 14.5 12 13 C12.5 14.5 14 18 16 17.5 C18.5 17 19 13.5 16 12.5 C19.5 12 21 6.5 19.5 5.5 C18 5 14.5 6.5 12 11 z"/>`,
  github: `<text x="12" y="16" text-anchor="middle" font-size="10" stroke="none" fill="currentColor" style="font-family:var(--font-body)" font-weight="700">gh</text><circle cx="12" cy="12" r="9"/>`,
  youtube: `<path d="M3.5 7 h17 v10 h-17 z"/><path d="M10 9.5 v5 l4.5 -2.5 z"/>`,
} as const;

export type IconName = keyof typeof icons;
