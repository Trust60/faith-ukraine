import type { TCheckItemContent } from "../CheckItem";

/** Секція «Інновації FAITH». Текст — з макетів designs/home (desktop-design-3). */
export const INNOVATIONS_HEADING = "Інновації FAITH";

export const INNOVATIONS_ITEMS: readonly TCheckItemContent[] = [
  {
    text: "FAITH NAMA COLLAGEN — вперше в світі живий колаген з проникаючими властивостями",
  },
  { text: "Власні патенти на унікальні інгредієнти" },
  { text: "Технологія прицільної доставки активних компонентів МС2Х" },
];

/**
 * Ілюстрація ліпосом. Діагональний перехід білого у світло-сірий уже вбудований у
 * зображення (експорт з макета), тому окремої CSS-фігури для нього не потрібно.
 * У мобільних макетах ілюстрації немає — показуємо лише з lg.
 */
export const INNOVATIONS_IMAGE = {
  src: "/home/innovations.webp",
  alt: "Ліпосоми FAITH з активними компонентами — схематична ілюстрація",
} as const;
