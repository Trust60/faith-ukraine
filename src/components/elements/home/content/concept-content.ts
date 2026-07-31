/** Секція «Концепція глобальної краси» — 4 напрями бренду (desktop-design-6). */
export const CONCEPT_SECTION = {
  heading: "Концепція глобальної краси",
  subheading:
    "Філософія бренду FAITH полягає у комплексному підході до збереження краси та молодості через здоров’я!",
} as const;

export type TConceptCardContent = {
  title: string;
  text: string;
  image: { src: string; alt: string };
};

export const CONCEPT_CARDS: readonly TConceptCardContent[] = [
  {
    title: "Космецевтика",
    text: "Ламелярний догляд за шкірою обличчя та тіла",
    image: {
      src: "/home/concept/skincare.webp",
      alt: "Флакони засобів FAITH для догляду за шкірою на дерев’яній полиці",
    },
  },
  {
    title: "Нутріцевтика",
    text: "Покращення загального стану організму",
    image: {
      src: "/home/concept/nutricosmetics.webp",
      alt: "Питні ампули FAITH Essence Drink R у пакуванні",
    },
  },
  {
    title: "Волосся",
    text: "Догляд за шкірою голови та волоссям",
    image: {
      src: "/home/concept/hair.webp",
      alt: "Засоби FAITH Nonative для догляду за волоссям на столі",
    },
  },
  {
    title: "Makeup Products",
    text: "Макіяж як продовження догляду",
    image: {
      src: "/home/concept/makeup.webp",
      alt: "Тональна база FAITH Insist Lamellar SPF 20 у руках",
    },
  },
];
