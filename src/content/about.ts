/**
 * BOOK II — ABOUT ME
 * ⚠ Placeholder content. Replace with your own story.
 *
 * Profile photo / self-portrait:
 *   import me from "../assets/me.jpg";
 *   portrait: { image: me, alt: "Portrait of Your Name" }
 */
import type { AboutContent } from "./types";
import portrait from "../assets/about/audrey.webp";

export const about: AboutContent = {
  profile: {
    greeting: "Hello, I'm",
    intro:
      "A game designer and 3D artist who loves building worlds people want to come back to — from live-ops seasons and in-game economies to props, concept art and UI icons.",
    portrait: { image: portrait, alt: "Photo of Audrey Juventia", focus: "52% 30%" },
    facts: [
      { label: "Based in", value: "Melbourne, Australia" },
      { label: "Currently", value: "Live Operations @ Big Ant Studios" },
      { label: "Studied", value: "Games & Interactivity, Swinburne" },
    ],
  },

  biography: {
    kicker: "Once upon a time…",
    title: "A short biography",
    paragraphs: [
      "My story started in Jakarta with a Design diploma at Santa Laurensia, then a Bachelor of Games & Interactivity at Swinburne University of Technology (2020–2023).",
      "Along the way I designed brands and social content as a Junior Graphic Designer, and have freelanced as a 3D Interactive Designer for Nightcode since 2022 — modelling assets, painting concept art and UI icons.",
      "In 2025 I joined Buzzy.gg as a 3D Artist & Community Manager, building Roblox and Unity creation kits in Blender. Today I work in Live Operations at Big Ant Studios in Melbourne.",
    ],
    note: "quick learner, bubbly hard worker ♡",
    art: { illustration: "balloon", alt: "A hot-air balloon drifting over hills" },
  },

  philosophy: {
    kicker: "What I believe",
    title: "Creative philosophy",
    paragraphs: [
      "Good games are tuned, not just made. I like designing systems — progression, rewards, economies — that feel generous to players while keeping the game healthy.",
      "On the art side I care about detail and clear communication: matching the brief, keeping deadlines, and working closely with programmers, artists, analysts and QA.",
    ],
    quote: "Monetise thoughtfully, never at the cost of the player's experience.",
    art: { illustration: "plant", alt: "A small potted plant" },
  },

  skills: {
    kicker: "The toolbox",
    title: "Skills & expertise",
    groups: [
      {
        name: "Design",
        items: [
          { label: "Live ops & seasonal content", level: 5 },
          { label: "Economy & store balancing", level: 4 },
          { label: "Progression & reward systems", level: 4 },
          { label: "Design documentation", level: 4 },
        ],
      },
      {
        name: "Art",
        items: [
          { label: "3D modelling & props", level: 5 },
          { label: "Concept art & moodboards", level: 4 },
          { label: "UI/UX icons", level: 4 },
          { label: "Graphic & brand design", level: 4 },
        ],
      },
      {
        name: "Tools",
        items: [
          { label: "Blender", level: 5 },
          { label: "Unity", level: 4 },
          { label: "Roblox Studio", level: 4 },
          { label: "Workflow & comms tools", level: 4 },
        ],
      },
    ],
  },

  interests: {
    kicker: "Off the clock",
    title: "Things I love",
    intro: "INTJ · speaks Bahasa Indonesia, English, Japanese, Korean & Chinese.",
    items: [
      { label: "Languages", icon: "book", note: "five and counting" },
      { label: "Community", icon: "sparkle", note: "live events & content creation" },
      { label: "Game worlds", icon: "gamepad", note: "Roblox, Unity & beyond" },
      { label: "3D sculpting", icon: "pencil", note: "props from basic shapes" },
      { label: "Teamwork", icon: "star", note: "#TeamWork #Creativity" },
      { label: "Coffee", icon: "coffee", note: "fuel for deadlines" },
    ],
  },
};
