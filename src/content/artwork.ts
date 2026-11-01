/**
 * BOOK IV — ART & ILLUSTRATION
 * Artwork from Audrey's Behance (https://www.behance.net/audreyjuventiaa)
 * and Instagram (https://www.instagram.com/odd.index/).
 * Each category becomes one gallery page.
 * Layouts: "feature" (1 piece) · "pair" (2) · "trio" (3) · "grid" (up to 4)
 */
import type { ArtContent } from "./types";

import ki1 from "../assets/behance/ki-1.webp";
import ki2 from "../assets/behance/ki-2.webp";
import ki3 from "../assets/behance/ki-3.webp";
import scifi1 from "../assets/behance/scifi-1.webp";
import scifi2 from "../assets/behance/scifi-2.webp";
import scifi3 from "../assets/behance/scifi-3.webp";
import tank1 from "../assets/behance/tank-1.webp";
import tank3 from "../assets/behance/tank-3.webp";
import locker2 from "../assets/behance/locker-2.webp";
import locker3 from "../assets/behance/locker-3.webp";
import shibuya2 from "../assets/behance/shibuya-2.webp";
import tlou2 from "../assets/behance/tlou-2.webp";
import ig1 from "../assets/instagram/ig-1.jpg";
import ig2 from "../assets/instagram/ig-2.jpg";
import ig3 from "../assets/instagram/ig-3.jpg";
import ig4 from "../assets/instagram/ig-4.jpg";
import ig5 from "../assets/instagram/ig-5.jpg";
import ig6 from "../assets/instagram/ig-6.jpg";
import ig7 from "../assets/instagram/ig-7.jpg";
import ig8 from "../assets/instagram/ig-8.jpg";
import ig9 from "../assets/instagram/ig-9.jpg";
import ig10 from "../assets/instagram/ig-10.jpg";
import ig11 from "../assets/instagram/ig-11.jpg";
import ig12 from "../assets/instagram/ig-12.jpg";

export const artwork: ArtContent = {
  chapter: {
    kicker: "Chapter Three",
    title: "Sketchbook & Gallery",
    intro: "Characters, concepts and 3D scenes. Tap any piece to see it larger.",
    art: { illustration: "inkpot", alt: "A hand-drawn ink pot with a quill" },
  },

  categories: [
    {
      id: "characters",
      title: "Character Design",
      intro: "Characters for games and personal projects, from first sketch to final sheet.",
      layout: "trio",
      items: [
        { title: "KI", medium: "Photoshop · Clip Studio Paint", year: "2021", image: ki1, alt: "KI, a round yellow bird character" },
        { title: "Sci-Fi Characters", medium: "Procreate · Lil Indie Games", year: "2024", image: scifi1, alt: "Line sketches of sci-fi characters" },
        { title: "KI — model sheet", medium: "Paint Tool SAI · Illustrator", year: "2021", image: ki3, alt: "KI character sheet with expressions and weapons" },
      ],
    },
    {
      id: "character-sketches",
      title: "Character Sketches",
      intro: "Faces, poses and outfits from the sketchbook (@odd.index).",
      layout: "trio",
      items: [
        { title: "Swordsman", year: "2026", image: ig4, alt: "Ink drawing of a dark-haired swordsman in a dynamic pose" },
        { title: "Portrait studies", year: "2025", image: ig5, alt: "Greyscale portrait studies of a young man with reference photos" },
        { title: "Agent turnaround", year: "2025", image: ig6, alt: "Character sheet of a woman in a tactical suit with head studies" },
      ],
    },
    {
      id: "concept",
      title: "Concept Art",
      intro: "Exploring shapes and silhouettes before anything gets built.",
      layout: "pair",
      items: [
        { title: "Tankazooka — tanks", medium: "Procreate", year: "2023", image: tank1, alt: "Tank design sketches for Tankazooka" },
        { title: "Sci-Fi crew sketches", medium: "Procreate", year: "2024", image: scifi2, alt: "Sci-fi character concept sketches" },
      ],
    },
    {
      id: "creatures",
      title: "Creature Design",
      intro: "Monsters, fossils and things with too many teeth.",
      layout: "grid",
      items: [
        { title: "Pterosaur study", year: "2026", image: ig2, alt: "Pterosaur sketches with a skeleton study" },
        { title: "Creature — front", year: "2025", image: ig7, alt: "Line drawing of a large clawed creature" },
        { title: "Creature — variant", year: "2025", image: ig8, alt: "Creature design with segmented body and tentacles" },
        { title: "Creature lineup", year: "2025", image: ig9, alt: "Line-up of humanoid creature concepts" },
      ],
    },
    {
      id: "mechs",
      title: "Mechs & Robots",
      intro: "Helmets, joints and chunky machines.",
      layout: "trio",
      items: [
        { title: "Mech pilots", year: "2024", image: ig10, alt: "Greyscale robot helmet and body designs" },
        { title: "Robot callouts", year: "2024", image: ig11, alt: "Robot design sketches with annotations" },
        { title: "Mech parts", year: "2024", image: ig12, alt: "Sketches of mechanical arms, helmets and armour" },
      ],
    },
    {
      id: "paintings",
      title: "Paintings & Studies",
      intro: "Colour and light studies, palette included.",
      layout: "pair",
      items: [
        { title: "Singing fish", year: "2026", image: ig1, alt: "Painting of a fish sculpture singing into a microphone" },
        { title: "Koi", year: "2026", image: ig3, alt: "Painting of two koi fish in green water" },
      ],
    },
    {
      id: "environments",
      title: "3D Environments",
      layout: "feature",
      items: [
        {
          title: "The Last of Us Scene",
          medium: "Unreal Engine 5 · Blender",
          year: "2023",
          image: tlou2,
          alt: "Abandoned props on an overgrown forest floor",
          caption: "Prop close-up from an Unreal Engine 5 forest inspired by The Last of Us.",
        },
      ],
    },
    {
      id: "sketches",
      title: "Sketches & Sheets",
      intro: "Expression studies, turnarounds and work-in-progress.",
      layout: "grid",
      items: [
        { title: "KI expressions", medium: "Clip Studio Paint", year: "2021", image: ki2, alt: "Grid of KI character expressions" },
        { title: "Sci-Fi poses", medium: "Procreate", year: "2024", image: scifi3, alt: "Sci-fi character pose sketches" },
        { title: "Locker room wireframe", medium: "Blender", year: "2024", image: locker2, alt: "Wireframe of the locker room diorama" },
        { title: "Tankazooka town", medium: "Clip Studio Paint", year: "2023", image: tank3, alt: "Tankazooka town environment" },
      ],
    },
    {
      id: "renders",
      title: "Lighting & Mood",
      intro: "Playing with light, colour and atmosphere in 3D.",
      layout: "pair",
      items: [
        { title: "Shibuya neon", medium: "Unreal Engine 5", year: "2024", image: shibuya2, alt: "Neon signage in the Shibuya cyberpunk scene" },
        { title: "Crime scene", medium: "Blender", year: "2024", image: locker3, alt: "Moody render of the crime-scene locker room" },
      ],
    },
  ],
};
