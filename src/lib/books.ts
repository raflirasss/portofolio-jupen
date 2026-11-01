/**
 * Turns structured content (src/content/*) into an ordered list of pages for
 * each book. Components never read content files directly — they receive
 * PageSpec objects from here, so adding a project or gallery category only
 * requires editing data.
 *
 * Page 0 of every book is the inside cover (bookplate + contents).
 * Books always end on "The End"; a doodle page is inserted when needed so the
 * last page lands on the right-hand side of a spread.
 */
import { siteConfig, type BookConfig, type BookId } from "../config/site.config";
import { portfolio } from "../content/portfolio";
import { about } from "../content/about";
import { artwork } from "../content/artwork";
import { contact } from "../content/contact";
import type {
  AboutContent,
  Art,
  ArtCategory,
  ContactContent,
  Project,
} from "../content/types";

export interface Neighbour {
  title: string;
  anchor: string;
}

export interface ChapterData {
  kicker: string;
  title: string;
  intro: string;
  art: Art;
}

export type PageBody =
  | { kind: "contents"; book: BookConfig; entries: { label: string; page: number; anchor: string }[] }
  | { kind: "chapter"; chapter: ChapterData; volume: string }
  | { kind: "project-art"; project: Project; projectIndex: number; total: number }
  | { kind: "project-info"; project: Project; projectIndex: number; prev?: Neighbour; next?: Neighbour }
  | { kind: "project-extra-text"; project: Project }
  | { kind: "project-extra-art"; project: Project }
  | { kind: "profile"; profile: AboutContent["profile"] }
  | { kind: "text"; kicker: string; title: string; paragraphs: string[]; note?: string; quote?: string; art?: Art }
  | { kind: "skills"; skills: AboutContent["skills"] }
  | { kind: "interests"; interests: AboutContent["interests"] }
  | { kind: "gallery"; category: ArtCategory; startIndex: number }
  | { kind: "letter"; letter: ContactContent["letter"] }
  | { kind: "contact-links"; links: ContactContent["links"] }
  | { kind: "availability"; availability: ContactContent["availability"] }
  | { kind: "doodles" }
  | { kind: "end"; book: BookConfig };

export type PageSpec = PageBody & {
  /** Position inside the book (0 = inside cover). */
  index: number;
  /** Jump target used by the contents page and project navigation. */
  anchor?: string;
  /** Label for the contents page. */
  toc?: string;
};

type Draft = PageBody & { anchor?: string; toc?: string };

/* ── Per-book page recipes ──────────────────────────────────────────────── */

function portfolioPages(): Draft[] {
  const { projects } = portfolio;
  const pages: Draft[] = [
    { kind: "chapter", chapter: portfolio.chapter, volume: getBook("portfolio").volume, toc: portfolio.chapter.title, anchor: "start" },
  ];
  projects.forEach((project, i) => {
    const prev = projects[i - 1];
    const next = projects[i + 1];
    pages.push(
      { kind: "project-art", project, projectIndex: i, total: projects.length, anchor: project.slug, toc: project.title },
      {
        kind: "project-info",
        project,
        projectIndex: i,
        prev: prev && { title: prev.title, anchor: prev.slug },
        next: next && { title: next.title, anchor: next.slug },
      },
    );
    if (project.extra) {
      pages.push({ kind: "project-extra-art", project }, { kind: "project-extra-text", project });
    }
  });
  return pages;
}

function aboutPages(): Draft[] {
  return [
    { kind: "profile", profile: about.profile, anchor: "hello", toc: "Hello" },
    { kind: "text", ...about.biography, anchor: "biography", toc: about.biography.title },
    { kind: "text", ...about.philosophy, anchor: "philosophy", toc: about.philosophy.title },
    { kind: "skills", skills: about.skills, anchor: "skills", toc: about.skills.title },
    { kind: "interests", interests: about.interests, anchor: "interests", toc: about.interests.title },
  ];
}

function artPages(): Draft[] {
  const pages: Draft[] = [
    { kind: "chapter", chapter: artwork.chapter, volume: getBook("art").volume, anchor: "start", toc: artwork.chapter.title },
  ];
  let startIndex = 0;
  for (const category of artwork.categories) {
    pages.push({ kind: "gallery", category, startIndex, anchor: category.id, toc: category.title });
    startIndex += category.items.length;
  }
  return pages;
}

function contactPages(): Draft[] {
  return [
    { kind: "letter", letter: contact.letter, anchor: "letter", toc: "A letter" },
    { kind: "contact-links", links: contact.links, anchor: "links", toc: contact.links.title },
    { kind: "availability", availability: contact.availability, anchor: "availability", toc: contact.availability.title },
  ];
}

const recipes: Record<BookId, () => Draft[]> = {
  portfolio: portfolioPages,
  about: aboutPages,
  art: artPages,
  contact: contactPages,
};

/* ── Assembly ───────────────────────────────────────────────────────────── */

export function getBook(id: BookId): BookConfig {
  const book = siteConfig.books.find((b) => b.id === id);
  if (!book) throw new Error(`Unknown book "${id}" — check siteConfig.books`);
  return book;
}

export function buildPages(id: BookId): PageSpec[] {
  const book = getBook(id);
  const body = recipes[id]();

  // [contents, ...body, (doodles), end] — total must be even so the end page is a recto.
  const drafts: Draft[] = [{ kind: "contents", book, entries: [] }, ...body];
  if ((drafts.length + 1) % 2 !== 0) drafts.push({ kind: "doodles" });
  drafts.push({ kind: "end", book, anchor: "end" });

  const pages: PageSpec[] = drafts.map((d, index) => ({ ...d, index }));

  const contents = pages[0];
  if (contents.kind === "contents") {
    contents.entries = pages
      .filter((p) => p.toc && p.anchor)
      .map((p) => ({ label: p.toc!, page: p.index, anchor: p.anchor! }));
  }
  return pages;
}

/** Global running number for artwork across gallery pages (for lightbox order). */
export function allArtwork() {
  return artwork.categories.flatMap((c) => c.items);
}
