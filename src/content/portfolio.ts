/**
 * BOOK I — PORTFOLIO
 * Projects from Audrey's Behance (https://www.behance.net/audreyjuventiaa).
 * One spread per project (artwork page + detail page), one image each.
 * Images live in src/assets/behance/ and are optimised by Astro at build time.
 */
import type { PortfolioContent } from "./types";

import locker1 from "../assets/behance/locker-1.webp";
import shibuya1 from "../assets/behance/shibuya-1.webp";
import tank2 from "../assets/behance/tank-2.webp";
import tlou1 from "../assets/behance/tlou-1.webp";

export const portfolio: PortfolioContent = {
  chapter: {
    kicker: "Chapter One",
    title: "Selected Works",
    intro:
      "3D environments, game concepts and the stories behind them — a few favourite projects from 2023–2024. Turn the page to begin.",
    art: { illustration: "lantern", alt: "A hand-drawn lantern" },
  },

  projects: [
    {
      slug: "crime-scene-locker-room",
      title: "Crime Scene Locker Room",
      category: "3D Environment · Diorama",
      year: "2024",
      role: "3D Environment Artist",
      summary: "A Blender environment-art practice: a locker room diorama with a crime-scene twist.",
      description: [
        "After a couple of tests I decided to give a plain locker room a theme — exploring different genres for the diorama, I landed on a crime scene.",
        "Feedback said the lockers' texture was too dark, so I recoloured them a denim blue that is easier on the eyes.",
      ],
      tools: ["Blender", "Photoshop"],
      art: { image: locker1, alt: "Collage of renders from the Crime Scene Locker Room diorama" },
      links: [{ label: "View on Behance", url: "https://www.behance.net/gallery/210727267/2024-Crime-Scene-Locker-Room-Diorama" }],
    },
    {
      slug: "shibuya-cyberpunk",
      title: "Shibuya Cyberpunk",
      category: "3D Environment · UE5",
      year: "2024",
      role: "3D Environment Artist",
      summary: "An Unreal Engine 5 scene inspired by Jujutsu Kaisen's Shibuya, reimagined with a cyberpunk mood.",
      description: [
        "A neon-lit street scene inspired by the Shibuya arc of Jujutsu Kaisen (呪術廻戦), built and lit in Unreal Engine 5.",
        "Assets were modelled in Blender and textured in Substance 3D Painter, with Substance 3D Stager, Illustrator and Premiere Pro for presentation.",
      ],
      tools: ["Unreal Engine 5", "Blender", "Substance 3D Painter", "Substance 3D Stager", "Illustrator", "Premiere Pro"],
      art: { image: shibuya1, alt: "Neon-lit cyberpunk street at night in Unreal Engine 5" },
      links: [{ label: "View on Behance", url: "https://www.behance.net/gallery/188132879/2024-UE5-Jujutsu-Kaisen-Inspo-Shibuya-Cyberpunk" }],
    },
    {
      slug: "tankazooka",
      title: "Tankazooka",
      category: "Game Concept Art",
      year: "2023",
      role: "Concept & Game Artist",
      summary: "Concept art for Tankazooka — tank designs and stylised 2D environments for a Unity game.",
      description: [
        "Concept art for the game Tankazooka: tank designs sketched and refined, and colourful side-view environments.",
        "Painted in Procreate and Clip Studio Paint, with assets brought into Unity 2D.",
      ],
      tools: ["Procreate", "Clip Studio Paint", "Unity 2D"],
      art: { image: tank2, alt: "Tankazooka environment concept: a red barn under a sunset sky" },
      links: [{ label: "View on Behance", url: "https://www.behance.net/gallery/181900323/2023-Tankazooka-Game-Concept-Art" }],
    },
    {
      slug: "last-of-us-scene",
      title: "The Last of Us Scene",
      category: "3D Environment · UE5",
      year: "2023",
      role: "3D Environment Artist",
      summary: "An overgrown forest scene in Unreal Engine 5, inspired by The Last of Us.",
      description: [
        "A quiet, overgrown forest clearing inspired by The Last of Us, built in Unreal Engine 5.",
        "Props were modelled in Blender and the final presentation was edited in Sony Vegas Pro.",
      ],
      tools: ["Unreal Engine 5", "Blender", "Sony Vegas Pro"],
      art: { image: tlou1, alt: "Overgrown forest scene with abandoned props in Unreal Engine 5" },
      links: [{ label: "View on Behance", url: "https://www.behance.net/gallery/177530253/2023-UE5-The-Last-Of-Us-Inspired-Scene" }],
    },
  ],
};
