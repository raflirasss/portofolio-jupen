/**
 * BOOK III — CONCEPT ARTS
 * Concept art from Audrey's Instagram (https://www.instagram.com/odd.index/).
 * Swap any `image` for your own file in src/assets/ whenever you like.
 * Each category becomes one gallery page.
 * Layouts: "feature" (1 piece) · "pair" (2) · "trio" (3) · "grid" (up to 4)
 */
import type { ArtContent } from "./types";

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
    title: "Concept Arts",
    intro: "Characters, creatures and machines from the sketchbook. Tap any piece to see it larger.",
    art: { illustration: "inkpot", alt: "A hand-drawn ink pot with a quill" },
  },

  categories: [
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
  ],
};
