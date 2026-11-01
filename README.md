# Storybook Portfolio

An interactive, illustrated storybook portfolio for a game designer & artist.
Visitors pull a book from a hand-drawn shelf, it turns to face them, the cover
swings open, and the portfolio lives on its pages — turned like real paper.
No scrolling, ever.

All motion is **2D** (only `transform` + `opacity` are animated), so it stays
smooth on low-end phones and laptops.

Built with **Astro 7**, **TypeScript**, vanilla **CSS custom properties** and **GSAP**.
No UI framework, no image files required: every placeholder illustration is inline SVG.

---

## Quick start

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # static site in ./dist
npm run preview    # serve the production build locally
npm run check      # TypeScript / Astro diagnostics
```

Requires Node.js 22.23 or newer (Astro 7). Vercel's default Node 22.x runtime is fine.

## Deploy to Vercel

1. Push the folder to a GitHub/GitLab repository.
2. In Vercel, **Add New → Project**, import the repo. Vercel detects Astro
   automatically (build `npm run build`, output `dist`). No adapter needed — the
   site is fully static.
3. Set `site` in `astro.config.mjs` to your production URL (used for canonical &
   social preview tags).

Any static host (Netlify, GitHub Pages, Cloudflare Pages) works the same way.

---

## Making it yours

Everything you are likely to change lives in **two places**:

| What | Where |
| --- | --- |
| Name, role, email, social links, colours, fonts, animation timing, book titles/colours, feature switches, UI labels | `src/config/site.config.ts` |
| Portfolio content (projects, bio, concept art) | `src/content/*.ts` |

### 1. Your details — `src/config/site.config.ts`

- `owner` — name, role, tagline, email.
- `social` — add/remove/reorder links. `icon` is one of: `artstation`, `behance`,
  `linkedin`, `instagram`, `itch`, `x`, `bluesky`, `github`, `youtube`, `mail`, `link`.
- `theme` — background, paper, ink, muted text and the walnut `accent`
  (`accentStrength: 0` turns the accent off). The current palette is
  `#E0DDF0` lavender · `#8180A0` dusk violet · `#C8BCB9` rose taupe ·
  `#7E5947` walnut; book cover tones, wood and the grey scale built from it
  live in `src/styles/variables.css`.
- `typography` — Google Fonts URL plus the three font stacks (heading, body,
  hand-written). `pageTextScale` enlarges/shrinks all text inside the book.
- `animation` — durations (seconds) and GSAP eases for the shelf entrance,
  pulling a book, travel, opening, closing and page turns; camera zoom
  (`1` = none); idle sway and hover tilt switches.
- `book` — page ratio, max page height, cover overhang, and the
  `singlePageBreakpoint` below which the book shows one page at a time.
- `sound` — paper sound effects (synthesised, no audio files). **On by
  default**, with a soft tap on every click (`clickSound`) plus page-turn /
  open / close sounds. The speaker button mutes everything and the choice is
  remembered. Set `enabled: false` for a silent site with no button.
- `performance.liteMode` — `"auto"` (default) turns on a lighter mode for
  devices with ≤ 4 GB RAM or ≤ 4 CPU cores (or Data Saver): no hand-drawn
  wobble filter, no grain overlay, no idle animations, no camera zoom, no
  custom cursor. Use `true` / `false` to force it.
- `cursor` — custom ink cursor (mouse/trackpad only), native cursor hiding, trail smoothing.
- `navigation` — URL hash (`#/portfolio/4` deep links + Back button), keyboard,
  swipe, click-the-page-edge, first-visit hint.
- `features` — loading screen, lightbox, shelf decorations, the cat.
- `books` — the clickable books on the shelf: title, subtitle, volume numeral, cover
  `tone` (`ink`, `charcoal`, `slate`, `stone`, `paper`), spine `pattern`
  (`bands`, `dots`, `stripes`, `stars`, `plain`), height, thickness, lean, and
  the cover illustration.
- `decorBooks` — untitled, non-clickable books that just dress the shelf
  (tone, pattern, height, thickness, lean).
- `owner.moreWork` / `owner.moreArt` — the "View more on Behance / Instagram"
  links at the end of the Portfolio and Concept Arts books.

### 2. Your work — `src/content/`

| File | Book | Notes |
| --- | --- | --- |
| `portfolio.ts` | I · Portfolio | One spread per project: artwork page + detail page (one image each). |
| `about.ts` | II · About Me | Profile, biography, philosophy, skills (1–5 dots), interests. |
| `artwork.ts` | III · Concept Arts | One gallery page per category; `layout` is `feature` (1), `pair` (2), `trio` (3) or `grid` (4). |

Contact isn't a book: the strip under the shelf (email with copy button,
social icons, Download CV) is built from `owner.email`, `owner.cv` and
`social` in the config.

Pages are generated from this data (`src/lib/books.ts`): add a project and the
book grows, the contents page and page numbers update, and the book always ends
on a right-hand "The End" page.

### 3. Real artwork

Every `art` field accepts an `image`. Put files in `src/assets/` and import them
— Astro converts them to optimised, responsive WebP and lazy-loads them:

```ts
import lanternfall from "../assets/projects/lanternfall.png";

art: { image: lanternfall, alt: "Key art for Lanternfall" },
```

A `/public` path or full URL string also works (`image: "/art/fox.jpg"`), just
without automatic optimisation. Leave `image` out and the hand-drawn
`illustration` placeholder is shown instead (see `src/components/art/illustrations.ts`
for the names).

Tip: keep text short. Pages scale like printed paper; if something is too long
for a page, its type shrinks a little automatically — but splitting content
across more pages always reads better.

---

## How it works

```
src/
├── config/site.config.ts      ← all settings
├── content/                   ← all portfolio data (typed)
├── lib/
│   ├── books.ts               ← content → ordered pages per book
│   └── theme.ts               ← config → CSS custom properties
├── components/
│   ├── bookshelf/             ← Bookshelf, BookItem (spine button), DecorBookItem, ShelfContact, ShelfDecoration
│   ├── book/                  ← BookViewer (the book), BookCover, BookSpine,
│   │                            BookPages, Page, PageFlip (the leaf), BookNavigation
│   ├── pages/                 ← generic page layouts (contents, chapter, text, …)
│   ├── portfolio/             ← ProjectPage, ArtworkGallery
│   ├── art/                   ← Illustration (SVG library), Artwork (image/illustration frame), SvgDefs
│   └── ui/                    ← CustomCursor, LoadingScreen, SoundToggle, Lightbox, Icon
├── scripts/                   ← the only client-side JavaScript
│   ├── main.ts                ← boot / wiring
│   ├── bookshelf.ts           ← shelf entrance, idle sway, keyboard browsing
│   ├── book-viewer.ts         ← open/close orchestration, spine→book pose matching, state
│   ├── book-animation.ts      ← GSAP timelines (pull, travel, open, close)
│   ├── page-flip.ts           ← page-turn engine (leaf, shading, cast shadows)
│   ├── navigation.ts          ← keys, page-edge clicks, swipes, URL hash
│   ├── fit.ts, cursor.ts, lightbox.ts, sound.ts, motion.ts
├── styles/                    ← variables, global, animations, bookshelf, book, pages, ui
└── pages/index.astro
```

- **Everything is rendered at build time.** All pages of all books are printed
  into a hidden page store as static HTML; the page-flip engine *moves* those
  nodes into the visible slots and onto the faces of a single turning leaf.
- **The opening animation** (all 2D): the spine lifts out of the shelf, then
  the closed book appears exactly on top of it (sized from the spine's
  on-screen rectangle) and widens from spine-shape to cover-shape while it
  travels to centre — which reads as the book turning to face you. The cover
  then opens with `scaleX 1 → -1` around the spine, swapping to its inside
  face as it crosses the middle.
- **Page turns** (also 2D): the sheet folds around the spine (`scaleX 1 → -1`)
  with a slight skew so its edge lifts like paper, shading on the fold and a
  shadow cast on the page underneath. Layers are promoted to the GPU only while
  something is moving.
- **Pages scale like paper**: type inside a page is sized from the page width
  (container query units), so a spread looks the same on any screen. Phones get
  a single-page book; landscape phones get side controls to maximise the page.

## Accessibility

- Books are real buttons (arrow keys browse the shelf, Enter opens).
- In a book: ← / → (or PageUp/PageDown) turn pages, Home/End jump, Esc closes.
  Clicking the outer edge of a page or swiping also turns it.
- The book is a modal dialog; focus moves in on open and back to the book on close.
  Page changes are announced to screen readers.
- `prefers-reduced-motion` replaces the cinematic sequences with short fades and
  stops idle animation.
- The custom cursor only appears for mouse/trackpad users.
