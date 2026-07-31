/** Секція «Косметика для всієї родини» (desktop-design-8). */
export const FAMILY_SECTION = {
  heading: "Косметика для всієї родини",
  subheading: "Більше 50 продуктів для щоденного догляду!",
} as const;

export type TFamilyListContent = {
  title: string;
  items: readonly string[];
};

export const FAMILY_LISTS: readonly TFamilyListContent[] = [
  {
    title: "Універсальність",
    items: [
      "для всіх типів шкіри, зокрема для чутливої",
      "для будь-якого віку, жінкам, чоловікам, підліткам",
      "легка текстура без кольору та аромату",
      "день/ніч, застосування в орбітальній зоні",
    ],
  },
  {
    title: "Вплив",
    items: [
      "проти зморшок",
      "покращення тонусу та еластичності шкіри",
      "усунення гіперпігментації, плям після акне",
      "купероз, розацеа, атопічна шкіра",
      "рівний тон, зволоження, блиск та сяйво",
    ],
  },
];

export const FAMILY_IMAGES = {
  left: {
    src: "/home/family/routine.webp",
    alt: "Жінка наносить крем для обличчя перед дзеркалом",
  },
  right: {
    src: "/home/family/sachets.webp",
    alt: "Пробники засобів FAITH Lamellar Veil у руках",
  },
} as const;
