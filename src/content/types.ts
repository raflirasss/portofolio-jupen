/**
 * Content types. Every content file in this folder is plain, typed data —
 * edit the values, never the components.
 */
import type { ImageMetadata } from "astro";
import type { IllustrationName } from "../components/art/illustrations";
import type { IconName } from "../components/ui/icons";

/**
 * A piece of artwork.
 *  - `image`: real art. Either import it from `src/assets/…` (recommended: it is
 *    optimised to WebP/AVIF automatically) or give a `/public` path / URL.
 *  - `illustration`: the hand-drawn placeholder shown while `image` is empty.
 */
export interface Art {
  image?: ImageMetadata | string;
  illustration?: IllustrationName;
  alt: string;
  /** Optional caption shown under the artwork. */
  caption?: string;
  /** Which part of the image stays visible when it is cropped to its frame (CSS object-position), e.g. "50% 30%". */
  focus?: string;
}

export interface LinkItem {
  label: string;
  url: string;
}

/* ── Book I: Portfolio ──────────────────────────────────────────────────── */
export interface Project {
  /** Unique, URL-friendly id. */
  slug: string;
  title: string;
  category: string;
  year: string;
  role: string;
  /** One-line hook shown on the artwork page. */
  summary: string;
  /** Short paragraphs for the detail page. Keep to ~2 short paragraphs. */
  description: string[];
  tools: string[];
  art: Art;
  links?: LinkItem[];
  /**
   * Optional "behind the scenes" spread: a few highlights plus up to two
   * extra images. Leave undefined to skip the extra spread.
   */
  extra?: {
    heading: string;
    highlights: string[];
    images: Art[];
  };
}

export interface PortfolioContent {
  chapter: { kicker: string; title: string; intro: string; art: Art };
  projects: Project[];
}

/* ── Book II: About ─────────────────────────────────────────────────────── */
export interface AboutContent {
  profile: {
    greeting: string;
    intro: string;
    portrait: Art;
    facts: { label: string; value: string }[];
  };
  biography: { kicker: string; title: string; paragraphs: string[]; note?: string; art?: Art };
  philosophy: { kicker: string; title: string; paragraphs: string[]; quote: string; art?: Art };
  skills: {
    kicker: string;
    title: string;
    groups: { name: string; items: { label: string; level: 1 | 2 | 3 | 4 | 5 }[] }[];
  };
  interests: {
    kicker: string;
    title: string;
    intro: string;
    items: { label: string; icon: IconName; note: string }[];
  };
}

/* ── Book III: Art & Illustration ───────────────────────────────────────── */
export interface ArtworkItem extends Art {
  title: string;
  medium?: string;
  year?: string;
}

export interface ArtCategory {
  id: string;
  title: string;
  intro?: string;
  /** "feature" = one large piece, "pair", "trio", "grid" (up to 4). */
  layout: "feature" | "pair" | "trio" | "grid";
  items: ArtworkItem[];
}

export interface ArtContent {
  chapter: { kicker: string; title: string; intro: string; art: Art };
  categories: ArtCategory[];
}

/* ── Book IV: Contact ────────────────────────────────────────────────────── */
export interface ContactContent {
  letter: { greeting: string; paragraphs: string[]; signoff: string; signature: string };
  links: { kicker: string; title: string; intro: string };
  availability: {
    kicker: string;
    title: string;
    status: string;
    items: { label: string; value: string }[];
    note: string;
  };
}
