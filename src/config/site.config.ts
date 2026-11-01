/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  SITE CONFIGURATION
 *  Almost everything you'd want to tweak lives here: who you are, how the
 *  books look, colours, fonts, animation timing and feature switches.
 *
 *  Portfolio *content* (projects, bio, artwork…) lives in `src/content/*.ts`.
 * ─────────────────────────────────────────────────────────────────────────────
 */
import type { IllustrationName } from "../components/art/illustrations";

export type BookId = "portfolio" | "about" | "art";

/** Cover / spine tone. Each maps to a monochrome palette in `variables.css`. */
export type BookTone = "ink" | "charcoal" | "slate" | "stone" | "paper";

/** Decorative motif printed on the spine. */
export type SpinePattern = "bands" | "dots" | "stripes" | "stars" | "plain";

/** A purely decorative book on the shelf (not clickable). */
export interface DecorBook {
  tone: BookTone;
  pattern: SpinePattern;
  height: number;
  thickness: number;
  lean?: number;
  /** Where it stands: before or after the clickable books. */
  side: "left" | "right";
}

export interface BookConfig {
  id: BookId;
  /** Shown on the spine, cover and hover label. */
  title: string;
  /** Small line under the title on the cover. */
  subtitle: string;
  /** Shown as the "chapter" number on the cover & bookplate. */
  volume: string;
  tone: BookTone;
  pattern: SpinePattern;
  /** Spine height relative to the tallest book (0.75 – 1). */
  height: number;
  /** Spine thickness relative to a "normal" book (0.7 – 1.4). */
  thickness: number;
  /** Line illustration printed on the cover. */
  coverArt: IllustrationName;
  /** Slight resting tilt on the shelf, in degrees. Keep it tiny (-3 – 3). */
  lean?: number;
}

export const siteConfig = {
  /* ── Meta ─────────────────────────────────────────────────────────────── */
  meta: {
    title: "Audrey Juventia — Game Artist",
    description:
      "An interactive storybook portfolio. Pull a book from the shelf to explore games, art and stories.",
    lang: "en",
    /** Path inside /public used for social sharing previews. */
    ogImage: "/og-image.svg",
    themeColor: "#E0DDF0",
  },

  /* ── Owner ────────────────────────────────────────────────────────────── */
  owner: {
    name: "Audrey Juventia",
    role: "Game Artist",
    /** Short line shown under your name on the bookshelf. */
    tagline: "Based in Melbourne, Australia",
    location: "Melbourne, Australia",
    email: "audreyjuventia@outlook.com",
    /** CV / résumé file in /public. Set to "" to hide every "Download CV" button. */
    cv: "/cv/Audrey-Juventia-CV.pdf",
    /** "View more" link shown after the last project and on the Portfolio / Art end pages. "" hides it. */
    moreWork: { label: "View more on Behance", url: "https://www.behance.net/audreyjuventiaa" },
    /** "View more" link on the Concept Arts end page. */
    moreArt: { label: "View more on Instagram", url: "https://www.instagram.com/odd.index/" },
  },

  /* ── Social links ─────────────────────────────────────────────────────────
   * Add, remove or reorder freely. `icon` is one of the hand-drawn icons in
   * `src/components/ui/Icon.astro` (artstation, behance, linkedin, instagram,
   * itch, x, bluesky, github, youtube, mail, link).
   * ───────────────────────────────────────────────────────────────────────── */
  social: [
    { label: "Behance", handle: "@audreyjuventiaa", url: "https://www.behance.net/audreyjuventiaa", icon: "behance" },
    { label: "Instagram", handle: "@odd.index", url: "https://www.instagram.com/odd.index/", icon: "instagram" },
    { label: "LinkedIn", handle: "in/audreyjuventia", url: "https://www.linkedin.com/in/audreyjuventia", icon: "linkedin" },
    { label: "Email", handle: "audreyjuventia@outlook.com", url: "mailto:audreyjuventia@outlook.com", icon: "mail" },
    // Add ArtStation / itch.io / Instagram here when ready, e.g.
    // { label: "ArtStation", handle: "@handle", url: "https://www.artstation.com/handle", icon: "artstation" },
  ],

  /* ── Theme ────────────────────────────────────────────────────────────── */
  theme: {
    /*
     * Palette: #E0DDF0 lavender · #8180A0 dusk violet · #C8BCB9 rose taupe ·
     * #7E5947 walnut. Book covers, wood and greys are tuned to these in
     * src/styles/variables.css.
     */
    background: "#E0DDF0", // wall / page background (lavender)
    paper: "#FAF8FC", // book pages (lavender-tinted white)
    paperShade: "#ECE6EC", // page gutters, endpapers (lavender × rose taupe)
    foreground: "#2D2433", // ink (deep plum)
    muted: "#68668A", // secondary text (dusk violet, darkened for legibility)
    line: "#3A2E3D", // outlines
    /** The one warm accent: walnut. */
    accent: "#7E5947",
    /** 0 = no accent at all, 1 = full strength. */
    accentStrength: 1,
    /** Strength of the paper grain overlay (0 – 0.2). */
    grain: 0.06,
  },

  /* ── Typography ───────────────────────────────────────────────────────── */
  typography: {
    /** Google Fonts stylesheet. Change families here and in the stacks below. */
    googleFontsUrl:
      "https://fonts.googleapis.com/css2?family=Caveat:wght@500;700&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&family=Fraunces:ital,opsz,wght,SOFT,WONK@0,9..144,400..800,0..100,0..1;1,9..144,400..700,0..100,0..1&display=swap",
    heading: "'Fraunces', 'Iowan Old Style', 'Palatino Linotype', Georgia, serif",
    body: "'DM Sans', 'Segoe UI', system-ui, -apple-system, sans-serif",
    hand: "'Caveat', 'Segoe Print', 'Bradley Hand', cursive",
    /** Multiplies all text inside book pages. */
    pageTextScale: 1,
  },

  /* ── Animation ────────────────────────────────────────────────────────── */
  animation: {
    /** Seconds. */
    bookshelfEntranceDuration: 1.1,
    bookPullDuration: 0.45,
    bookTravelDuration: 1.05,
    bookOpenDuration: 1.25,
    bookCloseDuration: 1.0,
    pageFlipDuration: 0.85,
    /** Any GSAP ease string — https://gsap.com/docs/v3/Eases */
    easeTravel: "power3.inOut",
    easeOpen: "power2.inOut",
    easeFlip: "power2.inOut",
    /** How far the "camera" pushes into the shelf when a book is pulled out (1 = no zoom). */
    cameraZoom: 1.08,
    enableIdleAnimation: true,
    enableHoverTilt: true,
  },

  /* ── Book geometry ────────────────────────────────────────────────────── */
  book: {
    /** Width ÷ height of a single page. */
    pageRatio: 0.72,
    /** Page ratio used in single-page (phone) mode — a little taller. */
    pageRatioSingle: 0.66,
    /** Largest page height in px (keeps big monitors elegant). */
    maxPageHeight: 760,
    /** How far the cover boards stick out past the pages (px). */
    boardOverhang: 10,
    /** Below this viewport width the book shows one page at a time. */
    singlePageBreakpoint: 760,
  },

  /* ── Sound ────────────────────────────────────────────────────────────── */
  sound: {
    /** Sound effects + the mute button. false = completely silent, no button. */
    enabled: true,
    /** Initial state for first-time visitors (their mute choice is remembered). */
    defaultOn: true,
    /** A soft paper "tap" on every click / tap anywhere on the site. */
    clickSound: true,
    volume: 0.35,
  },

  /* ── Performance ──────────────────────────────────────────────────────── */
  performance: {
    /**
     * Lite mode for low-end devices: no hand-drawn wobble filter, no grain
     * overlay, no idle animations, no camera zoom, no custom cursor.
     * "auto" = on for devices with ≤ 4 GB RAM or ≤ 4 CPU cores (or Data Saver).
     */
    liteMode: "auto" as boolean | "auto",
  },

  /* ── Cursor ───────────────────────────────────────────────────────────── */
  cursor: {
    /** Custom ink cursor on mouse/trackpad devices. Touch devices never get it. */
    enabled: true,
    /** Hide the system cursor while the custom one is active. */
    hideNative: true,
    /** 0 = rigid, 1 = very floaty trailing ring. */
    smoothing: 0.18,
  },

  /* ── Navigation ───────────────────────────────────────────────────────── */
  navigation: {
    /** Reflect the open book & page in the URL (#/portfolio/4) — enables sharing & the back button. */
    useHash: true,
    keyboard: true,
    swipe: true,
    /** Click the outer half of a page to turn it. */
    clickPageEdges: true,
    /** Show a small "use ← → keys" hint the first time a book is opened. */
    showHints: true,
  },

  /* ── Features ─────────────────────────────────────────────────────────── */
  features: {
    loadingScreen: true,
    lightbox: true,
    /** Decorative extras on the shelf (plant, lamp, cat…). */
    shelfDecorations: true,
    /** The sleepy cat. Obviously essential. */
    shelfCat: true,
  },

  /* ── Labels (UI copy) ─────────────────────────────────────────────────── */
  labels: {
    shelfHint: "pick a book, any book",
    openBook: "open",
    closeBook: "Back to the shelf",
    nextPage: "Next page",
    prevPage: "Previous page",
    contents: "Contents",
    exLibris: "Ex Libris",
    theEnd: "The End",
    contactKicker: "say hello",
    keyboardHint: "Use ← → to turn pages, Esc to close",
    loading: "Sharpening pencils…",
  },

  /* ── Books on the shelf (left → right) ───────────────────────────────── */
  books: [
    {
      id: "portfolio",
      title: "Portfolio",
      subtitle: "Selected works",
      volume: "I",
      tone: "ink",
      pattern: "bands",
      height: 0.98,
      thickness: 1.25,
      coverArt: "lantern",
    },
    {
      id: "about",
      title: "About Me",
      subtitle: "A short autobiography",
      volume: "II",
      tone: "paper",
      pattern: "dots",
      height: 0.84,
      thickness: 0.95,
      coverArt: "portrait",
      lean: -1.5,
    },
    {
      id: "art",
      title: "Concept Arts",
      subtitle: "Creatures, mechs & characters",
      volume: "III",
      tone: "slate",
      pattern: "stars",
      height: 1,
      thickness: 1.35,
      coverArt: "inkpot",
    },
  ] satisfies BookConfig[],

  /* ── Decorative books (just for show — not clickable) ───────────────── */
  decorBooks: [
    // Kept on the right so the "pick a book" arrow always points at a real book.
    { tone: "charcoal", pattern: "stripes", height: 0.9, thickness: 0.8, side: "right" },
    { tone: "stone", pattern: "bands", height: 0.74, thickness: 0.6, side: "right" },
    { tone: "paper", pattern: "plain", height: 0.84, thickness: 0.55, lean: 2.5, side: "right" },
    { tone: "stone", pattern: "dots", height: 0.8, thickness: 0.65, side: "right" },
  ] satisfies DecorBook[],
};

export type SiteConfig = typeof siteConfig;
