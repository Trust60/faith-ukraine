import type { TCheckItemContent } from "../CheckItem";

/** Секція «Абсолютна безпека, гарантія якості» — з макета desktop-design-5. */
export const SAFETY_HEADING = "Абсолютна безпека, гарантія якості";

export const SAFETY_ITEMS: readonly TCheckItemContent[] = [
  {
    title: "Японський фармстандарт KatSodAssay",
    text: "Продукція відповідає стандарту якості, який застосовується в Японії до лікарських засобів.",
  },
  {
    title: "Абсолютна чистота складу",
    text: "Засоби не містять парабенів, мінеральних олій, силіконів, фарбників, ароматизаторів, фенолів.",
  },
  {
    title: "Клінічно підтверджена ефективність",
    text: "Результативність засобів доведена клінічними дослідженнями за участі добровольців.",
  },
  {
    title: "Етична відповідальність",
    text: "Косметика не тестується на тваринах!",
  },
];

export const SAFETY_STANDARD_LOGO = {
  src: "/home/kat-sod-assay.webp",
  alt: "Логотип японського фармстандарту Kat Sod Assay",
  width: 613,
  height: 235,
} as const;

/** Нагорода показується лише з lg — у мобільних макетах її немає. */
export const SAFETY_AWARD = {
  image: {
    src: "/home/award-medal.webp",
    alt: "Медаль Professional Cosmetics Award 2014",
    width: 900,
    height: 900,
  },
  caption: "Нагорода від уряду Японії за інновації в галузі косметології",
} as const;
