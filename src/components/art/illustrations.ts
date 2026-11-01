/**
 * Hand-drawn placeholder illustrations.
 *
 * Every drawing is plain SVG markup on a 200×200 canvas. Strokes use
 * `currentColor`; fills use short utility classes so a drawing adapts to
 * whatever book / page it is printed on (see `.ill` rules in pages.css):
 *
 *   p  paper fill      s  shade fill     k  ink fill
 *   h  hatched fill    a  accent fill    t  thin stroke     n  no stroke
 *
 * Replace any of these with real artwork via the `image` field in content
 * files — illustrations are only used when no image is provided.
 */

const WAVES = (y: number) =>
  `<path class="t" d="M6 ${y} q11 -7 22 0 t22 0 t22 0 t22 0 t22 0 t22 0 t22 0 t22 0 t22 0"/>`;

export const illustrations = {
  lantern: `
    <circle cx="100" cy="16" r="6"/>
    <path d="M100 22 v18"/>
    <path class="k" d="M80 50 q20 -16 40 0 z"/>
    <path class="p" d="M74 50 h52 l-6 10 h-40 z"/>
    <path class="g n" d="M100 64 m-46 0 a46 46 0 1 0 92 0 a46 46 0 1 0 -92 0" transform="translate(0 32)"/>
    <path class="p" d="M80 60 h40 l6 72 h-52 z"/>
    <path class="t" d="M100 60 v72 M90 60 l-4 72 M110 60 l4 72"/>
    <path class="a" d="M100 82 c9 10 11 21 0 32 c-11 -11 -9 -22 0 -32 z"/>
    <path class="t" d="M100 96 c3 4 3 9 0 13"/>
    <path class="k" d="M68 132 h64 l-7 12 h-50 z"/>
    <path class="t" d="M46 96 h-16 M154 96 h16 M54 64 l-11 -8 M146 64 l11 -8 M54 128 l-11 8 M146 128 l11 8"/>
    <path class="t" d="M86 162 q14 10 28 0 M76 176 q24 14 48 0"/>`,

  portrait: `
    <path class="p" d="M44 196 q8 -50 56 -54 q48 4 56 54"/>
    <path class="t" d="M66 176 q34 12 68 0 M60 188 q40 12 80 0"/>
    <path class="p" d="M88 126 v18 q12 8 24 0 v-18"/>
    <ellipse class="p" cx="100" cy="94" rx="38" ry="42"/>
    <path class="k" d="M62 96 q-6 -48 38 -52 q42 2 40 46 q-10 -18 -24 -20 q-6 12 -20 12 q4 -9 0 -13 q-12 14 -34 27 z"/>
    <path d="M136 98 q9 2 5 14"/>
    <path d="M84 104 q5 -5 10 0 M106 104 q5 -5 10 0"/>
    <circle class="h n" cx="82" cy="117" r="7"/>
    <circle class="h n" cx="119" cy="117" r="7"/>
    <path d="M94 122 q6 6 12 0"/>
    <path class="a" d="M132 74 l26 -40 l7 5 l-26 40 z"/>
    <path class="k" d="M158 34 l5 -8 l3 12 z"/>
    <path class="t" d="M30 40 l6 6 M36 40 l-6 6 M168 150 l5 5 M173 150 l-5 5"/>`,

  dice: `
    <path class="t" d="M30 60 q-12 20 0 40 M22 50 q-18 30 0 60"/>
    <path class="p" d="M56 86 l40 -18 l40 18 l-40 18 z"/>
    <path class="s" d="M56 86 l40 18 v50 l-40 -18 z"/>
    <path class="p" d="M96 104 l40 -18 v50 l-40 18 z"/>
    <ellipse class="k n" cx="96" cy="86" rx="7" ry="4"/>
    <circle class="k n" cx="68" cy="106" r="4"/>
    <circle class="k n" cx="84" cy="132" r="4"/>
    <circle class="k n" cx="106" cy="138" r="4"/>
    <circle class="k n" cx="116" cy="126" r="4"/>
    <circle class="k n" cx="126" cy="114" r="4"/>
    <path class="k" d="M150 176 l6 -22 q-13 -2 -15 -9 q4 -6 17 -4 q-5 -5 -3 -11 q4 -8 11 -8 q7 0 11 8 q2 6 -3 11 q13 -2 17 4 q-2 7 -15 9 l6 22 q-8 2 -16 -10 q-8 12 -16 10 z"/>
    <path class="a" d="M150 40 l4 10 l10 4 l-10 4 l-4 10 l-4 -10 l-10 -4 l10 -4 z"/>
    <path class="t" d="M40 170 h40 M52 180 h20"/>`,

  inkpot: `
    <path class="k" d="M58 124 q0 -22 22 -26 v-14 h40 v14 q22 4 22 26 v40 q0 12 -12 12 h-60 q-12 0 -12 -12 z"/>
    <rect class="p" x="76" y="76" width="48" height="10" rx="3"/>
    <rect class="p" x="72" y="130" width="56" height="28" rx="3"/>
    <path class="t" d="M80 140 h40 M84 148 h32"/>
    <path class="p" d="M108 80 C 120 50, 142 28, 170 12 C 166 40, 148 62, 112 82 Z"/>
    <path class="t" d="M112 80 Q 142 46 170 12 M126 62 l16 -2 M134 52 l16 -3 M144 41 l14 -4 M120 70 l-7 -9 M130 58 l-8 -11 M140 46 l-6 -11"/>
    <circle class="k n" cx="40" cy="170" r="6"/>
    <circle class="k n" cx="28" cy="158" r="3"/>
    <circle class="k n" cx="168" cy="172" r="4"/>
    <path class="k n" d="M30 178 q8 -6 18 -2 q-6 6 -18 2 z"/>
    <path class="a" d="M40 46 l3 8 l8 3 l-8 3 l-3 8 l-3 -8 l-8 -3 l8 -3 z"/>`,

  envelope: `
    <path class="t" stroke-dasharray="2 7" d="M150 54 q26 -18 12 -40"/>
    <path class="p" d="M150 20 l30 -12 l-10 30 l-6 -12 z"/>
    <path class="t" d="M164 26 l16 -18"/>
    <rect class="p" x="30" y="62" width="140" height="94" rx="4"/>
    <path class="t" d="M30 152 l52 -46 M170 152 l-52 -46"/>
    <path class="s" d="M30 66 L100 118 L170 66 v-4 h-140 z"/>
    <path d="M30 66 L100 118 L170 66"/>
    <circle class="a" cx="100" cy="118" r="16"/>
    <path class="t" d="M100 108 l3 7 l7 1 l-5 5 l1 7 l-6 -3 l-6 3 l1 -7 l-5 -5 l7 -1 z"/>
    <path class="t" d="M44 172 h50 M50 182 h30"/>`,

  lighthouse: `
    <circle class="p" cx="160" cy="36" r="14"/>
    <path class="t" d="M150 28 q4 2 6 6"/>
    <path class="g n" d="M120 52 L200 30 L200 76 Z"/>
    <path class="g n" d="M92 52 L0 34 L0 72 Z"/>
    <path class="t" d="M32 58 q5 -5 10 0 q5 -5 10 0 M52 42 q4 -4 8 0 q4 -4 8 0"/>
    <path class="s" d="M44 160 q10 -26 42 -28 q36 -2 52 10 q12 8 16 18 z"/>
    <path class="p" d="M88 134 L94 64 H118 L124 134 Z"/>
    <path class="k" d="M91 104 H121 L122 116 H90 Z"/>
    <path class="k" d="M93 78 H119 L120 88 H92 Z"/>
    <rect class="p" x="92" y="48" width="28" height="16"/>
    <path class="t" d="M101 48 v16 M111 48 v16"/>
    <path class="k" d="M88 48 L106 30 L124 48 Z"/>
    <path class="k" d="M102 134 v-12 q4 -5 8 0 v12 z"/>
    ${WAVES(166)}
    ${WAVES(178)}
    <path class="t" d="M20 190 q11 -7 22 0 t22 0 M120 190 q11 -7 22 0 t22 0 t22 0"/>`,

  castle: `
    <path class="p" d="M10 64 q4 -12 16 -8 q6 -12 20 -4 q12 -2 12 10 z"/>
    <path class="p" d="M140 40 q4 -10 14 -7 q6 -10 18 -3 q10 -1 10 9 z"/>
    <path class="s" d="M40 124 q60 10 120 0 q-8 28 -36 42 q-14 18 -24 30 q-10 -14 -22 -24 q-32 -16 -38 -48 z"/>
    <path class="t" d="M70 150 q-4 14 2 22 M128 150 q6 10 0 20 M100 170 v14"/>
    <path class="p" d="M36 124 q64 -16 128 0 q-64 12 -128 0 z"/>
    <rect class="p" x="58" y="86" width="20" height="36"/>
    <path class="k" d="M55 86 L68 62 L81 86 Z"/>
    <rect class="p" x="122" y="86" width="20" height="36"/>
    <path class="k" d="M119 86 L132 62 L145 86 Z"/>
    <rect class="p" x="78" y="74" width="44" height="48"/>
    <rect class="p" x="89" y="42" width="22" height="32"/>
    <path class="k" d="M86 42 L100 14 L114 42 Z"/>
    <path d="M100 14 v-8"/>
    <path class="a" d="M100 6 l14 4 l-14 4 z"/>
    <path class="k" d="M93 122 v-14 q7 -9 14 0 v14 z"/>
    <path class="k n" d="M66 96 h4 v8 h-4 z M130 96 h4 v8 h-4 z M98 52 h4 v9 h-4 z M84 84 h4 v8 h-4 z M112 84 h4 v8 h-4 z"/>
    <path class="t" d="M78 74 v-6 h6 v6 M91 74 v-6 h6 v6 M103 74 v-6 h6 v6 M116 74 v-6 h6 v6"/>`,

  whale: `
    <path class="a" d="M30 30 l2 6 l6 2 l-6 2 l-2 6 l-2 -6 l-6 -2 l6 -2 z"/>
    <path class="t" d="M170 26 l4 4 M174 26 l-4 4 M60 20 l3 3 M63 20 l-3 3"/>
    <path class="t" d="M110 42 q-7 -8 2 -14 q8 -6 0 -14"/>
    <rect class="p" x="104" y="40" width="7" height="12"/>
    <path class="p" d="M86 74 v-20 h26 v20"/>
    <path class="k" d="M82 56 L99 38 L116 56 Z"/>
    <rect class="k n" x="95" y="62" width="7" height="8"/>
    <path class="t" d="M126 74 v-14 M118 64 q8 -14 16 0 q-8 6 -16 0"/>
    <path class="p" d="M26 112 q10 -42 70 -42 q50 0 66 30 q12 -6 22 -24 q6 20 -6 32 q8 8 6 24 q-14 -10 -24 -6 q-20 30 -70 30 q-54 0 -64 -44 z"/>
    <path class="h n" d="M40 132 q50 26 108 -4 q-10 18 -54 22 q-40 0 -54 -18 z"/>
    <path class="t" d="M40 132 q50 26 108 -4"/>
    <circle class="k n" cx="52" cy="106" r="4"/>
    <path d="M38 120 q8 6 16 2"/>
    <path class="s" d="M84 128 q10 20 30 18 q-8 -16 -30 -18 z"/>
    <path class="p" d="M14 182 q4 -12 16 -8 q6 -12 20 -4 q12 -2 12 10 z"/>
    <path class="p" d="M128 188 q4 -10 14 -7 q6 -10 18 -3 q10 -1 10 9 z"/>`,

  forest: `
    <path class="p" d="M152 24 a18 18 0 1 0 16 26 a14 14 0 1 1 -16 -26 z"/>
    <path class="t" d="M30 30 l3 3 M33 30 l-3 3 M100 18 l3 3 M103 18 l-3 3"/>
    <path class="s n" d="M0 160 q50 -14 100 -4 q50 -12 100 2 v42 h-200 z"/>
    <path class="h" d="M24 160 L40 116 L34 116 L46 88 L40 88 L52 60 L64 88 L58 88 L70 116 L64 116 L80 160 Z"/>
    <path class="k" d="M64 168 L82 120 L75 120 L88 90 L81 90 L94 56 L107 90 L100 90 L113 120 L106 120 L124 168 Z"/>
    <path class="p" d="M118 166 L134 126 L128 126 L139 100 L133 100 L144 74 L155 100 L149 100 L160 126 L154 126 L170 166 Z"/>
    <path class="h" d="M156 170 L168 140 L163 140 L172 120 L181 140 L176 140 L188 170 Z"/>
    <path class="p" d="M96 200 q-26 -14 2 -28 q22 -10 4 -16"/>
    <circle class="a n" cx="40" cy="176" r="2.5"/>
    <circle class="a n" cx="140" cy="186" r="2.5"/>
    <circle class="a n" cx="176" cy="104" r="2.5"/>
    <circle class="a n" cx="20" cy="120" r="2.5"/>`,

  creature: `
    <path class="t" d="M30 60 q-8 -12 4 -20 M170 64 q10 -10 0 -22"/>
    <path class="s" d="M72 92 q-12 -24 4 -34 q0 18 10 26 z"/>
    <path class="s" d="M128 92 q12 -24 -4 -34 q0 18 -10 26 z"/>
    <path class="p" d="M48 162 q-10 -74 52 -82 q62 8 52 82 q-8 8 -17 0 q-8 8 -17 0 q-9 8 -18 0 q-9 8 -18 0 q-8 8 -17 0 q-9 8 -17 0 z"/>
    <path d="M50 118 q-20 -8 -24 -26 M150 118 q22 -6 26 -26"/>
    <circle class="h" cx="70" cy="136" r="7"/>
    <circle class="h" cx="132" cy="140" r="5"/>
    <circle class="h" cx="124" cy="94" r="4"/>
    <circle class="p" cx="100" cy="112" r="21"/>
    <circle class="k n" cx="104" cy="114" r="10"/>
    <circle class="p n" cx="108" cy="109" r="3.5"/>
    <path d="M84 144 q16 12 32 0"/>
    <path class="p" d="M95 147 l4 7 l4 -6"/>
    <path class="t" d="M60 182 q40 10 80 0"/>`,

  robot: `
    <path d="M100 56 v-18"/>
    <circle class="a" cx="100" cy="34" r="6"/>
    <rect class="p" x="74" y="56" width="52" height="38" rx="10"/>
    <circle class="k n" cx="90" cy="74" r="5"/>
    <circle class="k n" cx="110" cy="74" r="5"/>
    <path class="t" d="M94 86 q6 4 12 0"/>
    <rect class="p" x="68" y="98" width="64" height="48" rx="8"/>
    <rect class="s" x="82" y="110" width="22" height="14" rx="3"/>
    <circle class="t" cx="118" cy="117" r="5"/>
    <path d="M68 112 q-18 6 -20 26"/>
    <path d="M132 112 q16 0 22 -10"/>
    <path class="p" d="M150 100 h20 l-4 18 h-12 z"/>
    <path class="t" d="M170 104 l14 -4 M166 116 l8 6 M174 122 l4 6 M168 126 l2 6"/>
    <rect class="k" x="70" y="148" width="60" height="16" rx="8"/>
    <circle class="p n" cx="82" cy="156" r="4"/>
    <circle class="p n" cx="100" cy="156" r="4"/>
    <circle class="p n" cx="118" cy="156" r="4"/>
    <path class="s" d="M24 176 h40 l-4 -26 h-32 z"/>
    <path d="M44 150 q-4 -16 -14 -20 M44 150 q2 -18 14 -24"/>
    <path class="t" d="M10 180 h180"/>`,

  map: `
    <path class="p" d="M22 40 l46 -12 l64 14 l46 -12 v132 l-46 12 l-64 -14 l-46 12 z"/>
    <path class="t" d="M68 28 v132 M132 42 v132"/>
    <path class="t" stroke-dasharray="3 7" d="M40 152 q18 -30 40 -22 q26 8 30 -30 q2 -24 32 -36"/>
    <path class="a n" d="M140 52 l16 16 M156 52 l-16 16" stroke-width="5" style="stroke:var(--accent)"/>
    <path d="M140 52 l16 16 M156 52 l-16 16"/>
    <path class="s" d="M34 82 l12 -20 l12 20 z M52 82 l9 -14 l9 14 z"/>
    <ellipse class="h" cx="104" cy="148" rx="20" ry="9"/>
    <circle class="t" cx="88" cy="64" r="6"/>
    <circle class="t" cx="98" cy="72" r="5"/>
    <path class="k" d="M156 132 l4 10 l10 4 l-10 4 l-4 10 l-4 -10 l-10 -4 l10 -4 z"/>
    <path class="t" d="M156 120 v4"/>`,

  mushroom: `
    <path class="t" d="M150 52 q-8 -8 2 -14 q10 -6 0 -14"/>
    <rect class="p" x="140" y="56" width="10" height="16"/>
    <path class="p" d="M36 112 q4 -70 64 -74 q60 4 64 74 q-64 14 -128 0 z"/>
    <circle class="k n" cx="70" cy="80" r="9"/>
    <circle class="k n" cx="118" cy="64" r="7"/>
    <circle class="k n" cx="136" cy="96" r="6"/>
    <circle class="k n" cx="94" cy="56" r="4"/>
    <path class="p" d="M66 114 q-4 30 -2 52 h72 q2 -22 -2 -52 q-34 6 -68 0 z"/>
    <path class="k" d="M88 166 v-24 q12 -14 24 0 v24 z"/>
    <circle class="p" cx="122" cy="132" r="7"/>
    <path class="t" d="M122 125 v14 M115 132 h14"/>
    <circle class="a n" cx="108" cy="155" r="2"/>
    <path class="t" d="M10 168 h180 M30 168 l-4 -10 M34 168 l2 -12 M160 168 l-3 -10 M164 168 l3 -12"/>
    <path class="t" d="M80 168 q-8 12 -2 26"/>`,

  knight: `
    <path class="a" d="M100 42 q10 -26 36 -28 q-8 10 -10 24 q-10 -6 -26 4 z"/>
    <path class="p" d="M60 92 q0 -52 40 -54 q40 2 40 54 q0 24 -40 26 q-40 -2 -40 -26 z"/>
    <path class="k" d="M70 86 h60 v9 h-60 z"/>
    <path class="t" d="M100 40 v46 M76 104 h48"/>
    <circle class="k n" cx="70" cy="108" r="2"/>
    <circle class="k n" cx="130" cy="108" r="2"/>
    <path class="s" d="M78 118 h44 l6 34 h-56 z"/>
    <path class="k" d="M74 136 h52 v6 h-52 z"/>
    <path d="M88 152 v18 h-8 M112 152 v18 h8"/>
    <path class="p" d="M50 118 h26 v22 q0 16 -13 22 q-13 -6 -13 -22 z"/>
    <path class="t" d="M63 118 v44 M50 132 h26"/>
    <path class="p" d="M147 134 V60 l4 -9 l4 9 V134 z"/>
    <path class="k" d="M139 134 h24 v5 h-24 z"/>
    <path d="M151 139 v14"/>
    <circle class="k" cx="151" cy="157" r="3"/>
    <path class="t" d="M30 180 h140"/>`,

  sketchface: `
    <circle class="t" cx="62" cy="76" r="32"/>
    <path class="t" d="M30 78 q32 12 64 0 M62 44 q-10 32 0 64"/>
    <path class="t" d="M34 90 q10 36 30 34 q18 -2 24 -26"/>
    <path class="t" d="M36 70 l50 -6 M40 98 l46 4"/>
    <ellipse class="p" cx="138" cy="92" rx="34" ry="40"/>
    <path class="t" d="M104 92 q34 14 68 0 M138 52 q-14 40 0 80"/>
    <path class="k" d="M108 80 q2 -40 34 -38 q30 4 30 38 q-14 -14 -30 -10 q-18 2 -34 10 z"/>
    <path d="M122 98 q4 -3 8 0 M146 98 q4 -3 8 0"/>
    <path d="M136 104 l-3 10 h6"/>
    <path d="M128 120 q10 6 18 0"/>
    <path class="h n" d="M106 104 q4 22 20 30 q-14 -2 -20 -30 z"/>
    <path class="p" d="M40 170 L150 150 l10 4 l-8 6 L42 178 z"/>
    <path class="k" d="M150 150 l10 4 l-8 6 z"/>
    <path class="t" d="M54 168 l2 8"/>
    <path class="t" d="M20 150 q20 -10 30 4 M16 160 q14 -6 22 2"/>`,

  balloon: `
    <path class="p" d="M14 44 q4 -12 16 -8 q6 -12 20 -4 q12 -2 12 10 z"/>
    <path class="p" d="M150 70 q4 -10 14 -7 q6 -10 18 -3 q10 -1 10 9 z"/>
    <path class="p" d="M100 18 q48 0 48 52 q0 34 -34 60 h-28 q-34 -26 -34 -60 q0 -52 48 -52 z"/>
    <path class="s" d="M56 82 q44 14 88 0 q-4 14 -14 28 q-30 8 -60 0 q-10 -14 -14 -28 z"/>
    <path class="t" d="M100 18 q-24 50 -14 112 M100 18 q24 50 14 112 M100 18 v112"/>
    <path class="t" d="M86 130 l4 22 M114 130 l-4 22"/>
    <path class="k" d="M88 152 h24 l-3 16 h-18 z"/>
    <path class="h n" d="M0 192 q50 -32 100 -12 q50 -26 100 4 v16 h-200 z"/>
    <path class="t" d="M0 192 q50 -32 100 -12 q50 -26 100 4"/>
    <path class="t" d="M30 130 q4 -4 8 0 q4 -4 8 0 M160 120 q4 -4 8 0 q4 -4 8 0"/>`,

  ship: `
    <circle class="a" cx="160" cy="40" r="14"/>
    <path class="t" d="M160 16 v-8 M184 40 h8 M177 23 l6 -6 M143 23 l-6 -6"/>
    <path d="M100 36 v86"/>
    <path class="p" d="M96 42 L96 118 L52 118 Z"/>
    <path class="s" d="M104 54 L104 118 L144 118 Z"/>
    <path class="p" d="M34 122 h132 l-22 30 h-88 z"/>
    <path class="t" d="M56 136 h88"/>
    ${WAVES(160)}
    ${WAVES(174)}
    <path class="t" d="M24 188 q11 -7 22 0 t22 0 M118 188 q11 -7 22 0 t22 0 t22 0"/>
    <path class="t" d="M30 60 q4 -4 8 0 q4 -4 8 0"/>`,

  cat: `
    <path class="t" d="M150 64 h9 l-9 9 h9 M166 46 h11 l-11 11 h11"/>
    <path class="p" d="M36 156 q-6 -42 42 -50 q40 -6 70 10 q20 12 18 40 z"/>
    <path class="h n" d="M60 120 q10 30 0 36 M84 112 q12 30 2 44 M108 112 q12 30 4 44"/>
    <path class="t" d="M60 120 q10 30 0 36 M84 112 q12 30 2 44 M108 112 q12 30 4 44"/>
    <path class="p" d="M124 118 q0 -24 22 -26 l6 -15 l9 14 q9 1 12 6 l10 -12 l3 18 q4 8 2 18 q-8 20 -36 16 q-28 -4 -28 -19 z"/>
    <path d="M142 120 q4 3 8 0 M160 118 q4 3 8 0"/>
    <path class="t" d="M154 128 l2 2 l2 -2 M178 124 h12 M178 130 l12 3"/>
    <path class="s" d="M38 154 q-22 2 -22 -16 q2 -12 14 -10 q-6 6 -2 14 q4 8 14 6 z"/>
    <path class="t" d="M10 158 h180"/>`,

  plant: `
    <path class="p" d="M100 134 q-44 -10 -48 -54 q38 6 48 54 z"/>
    <path class="t" d="M100 134 q-24 -22 -46 -52"/>
    <path class="k" d="M100 134 q32 -22 50 -64 q-40 10 -50 64 z"/>
    <path class="h" d="M100 134 q-8 -54 10 -96 q16 44 -10 96 z"/>
    <path class="t" d="M100 134 q6 -50 10 -96"/>
    <path class="p" d="M100 134 q24 -4 46 8 q-28 12 -46 -8 z"/>
    <rect class="p" x="70" y="132" width="60" height="10" rx="3"/>
    <path class="s" d="M74 142 h52 l-7 40 h-38 z"/>
    <path class="t" d="M80 158 h40"/>
    <path class="t" d="M40 182 h120"/>`,

  controller: `
    <path class="t" d="M100 72 q-4 -24 18 -30 q20 -6 16 -28"/>
    <path class="p" d="M46 92 q10 -22 54 -18 q44 -4 54 18 q18 36 8 58 q-9 15 -24 2 l-15 -19 h-46 l-15 19 q-15 13 -24 -2 q-10 -22 8 -58 z"/>
    <path class="k" d="M62 104 h9 v-9 h9 v9 h9 v9 h-9 v9 h-9 v-9 h-9 z"/>
    <circle class="a" cx="138" cy="98" r="6"/>
    <circle class="k" cx="126" cy="112" r="6"/>
    <circle class="p" cx="150" cy="112" r="6"/>
    <circle class="h" cx="138" cy="126" r="6"/>
    <path class="t" d="M92 100 h6 M104 100 h6"/>
    <circle class="t" cx="84" cy="134" r="10"/>
    <circle class="t" cx="116" cy="134" r="10"/>`,

  mountains: `
    <circle class="a" cx="140" cy="54" r="18"/>
    <path class="t" d="M30 44 q4 -4 8 0 q4 -4 8 0 M56 30 q3 -3 6 0 q3 -3 6 0"/>
    <path class="h" d="M0 150 L50 70 L84 118 L112 82 L160 150 Z"/>
    <path class="p" d="M40 160 L96 64 L150 160 Z"/>
    <path class="s" d="M96 64 L150 160 L114 160 Q104 120 96 64 Z"/>
    <path class="k" d="M82 88 L96 64 L110 88 L102 84 L96 92 L90 84 Z"/>
    <path class="k" d="M120 160 L164 96 L200 150 V160 Z"/>
    <path class="t" d="M0 166 h200 M20 178 q30 -6 60 0 M110 184 q30 -6 60 0"/>`,

  teacup: `
    <path class="t" d="M94 72 q-8 -10 2 -18 q10 -8 0 -18 M150 120 q-6 -8 2 -14 q8 -6 0 -14"/>
    <path class="p" d="M128 122 q20 -4 24 -30 l7 4 q-4 36 -30 44"/>
    <path d="M52 112 q-22 4 -14 28 q4 8 14 6"/>
    <path class="p" d="M48 156 q-10 -54 42 -60 q52 6 42 60 z"/>
    <path class="h n" d="M48 124 q42 12 84 0 v12 q-42 12 -84 0 z"/>
    <path class="t" d="M48 124 q42 12 84 0 M48 136 q42 12 84 0"/>
    <path class="p" d="M72 98 q18 -18 36 0 z"/>
    <circle class="k" cx="90" cy="84" r="4"/>
    <path class="p" d="M140 150 h36 q0 22 -18 22 q-18 0 -18 -22 z"/>
    <ellipse class="s" cx="158" cy="176" rx="28" ry="5"/>
    <path class="t" d="M20 172 h104"/>`,
} as const;

export type IllustrationName = keyof typeof illustrations;
export const illustrationNames = Object.keys(illustrations) as IllustrationName[];
