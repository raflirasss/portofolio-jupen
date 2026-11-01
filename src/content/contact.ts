/**
 * BOOK V — CONTACT
 * ⚠ Placeholder content. Your email and social links live in
 * `src/config/site.config.ts` (owner.email and social).
 */
import type { ContactContent } from "./types";

export const contact: ContactContent = {
  letter: {
    greeting: "Dear reader,",
    paragraphs: [
      "Thank you for wandering through these little books. If something here made you smile, I would love to hear about it.",
      "I'm open to game design, live-ops and 3D art roles, freelance modelling and concept work — or simply a friendly hello.",
    ],
    signoff: "Warmly,",
    signature: "Audrey",
  },

  links: {
    kicker: "Send a letter",
    title: "Get in touch",
    intro: "The fastest way to reach me is by email. I also post work-in-progress here:",
  },

  availability: {
    kicker: "Post office hours",
    title: "Availability",
    status: "Open to new projects",
    items: [
      { label: "Location", value: "Melbourne (AEST / AEDT)" },
      { label: "Looking for", value: "Game design, live ops & 3D art" },
      { label: "Reply time", value: "Usually within 2–3 days" },
    ],
    note: "p.s. — references available on request!",
  },
};
