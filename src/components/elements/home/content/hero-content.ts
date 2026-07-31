/** Слайди hero-банера головної. Текст і зображення — з макетів designs/home. */

export type THeroSlideContent = {
  /** Фонове фото слайда. */
  image: { src: string; alt: string };
  /** Вордмарк бренду замість текстового заголовка (слайд 1). */
  wordmark?: { src: string; alt: string; width: number; height: number };
  /** Головний рядок слайда. */
  title?: string;
  /** Рядок-надпис під заголовком (uppercase). */
  subtitle?: string;
  /** Пояснювальний рядок. Курсивна частина виноситься в emphasis. */
  caption?: { emphasis?: string; text: string };
  cta?: { label: string; href: string };
  /** Тон тексту: світле фото → тёмний текст, тёмне → білий + скрим на мобільному. */
  tone: "dark" | "light";
};

export const HERO_SLIDES: readonly THeroSlideContent[] = [
  {
    image: {
      src: "/home/hero/veil-model.webp",
      alt: "Модель за прозорою тканиною — образ бренду FAITH",
    },
    // Обрізаний вордмарк (без білих полів logo.webp), щоб бокс картинки = самі літери
    // й розмір керувався класами напряму, без «мертвого» простору навколо.
    wordmark: {
      src: "/home/hero/wordmark.webp",
      alt: "FAITH",
      width: 1200,
      height: 1072,
    },
    caption: { emphasis: "PreventAge", text: " — технології з Японії" },
    tone: "dark",
  },
  {
    image: {
      src: "/home/hero/faith-boxes.webp",
      alt: "Упаковки засобів FAITH Lamellar Mode у руках",
    },
    title: "Вітаємо на faithukraine.com.ua",
    subtitle: "Ексклюзивний дистриб’ютор FAITH в Україні",
    caption: { text: "Інтелектуальна косметика" },
    cta: { label: "Для професіоналів", href: "/professionals" },
    tone: "light",
  },
];

export const HERO_LABELS = {
  region: "Головний банер",
  prev: "Попередній слайд",
  next: "Наступний слайд",
  /** aria-label точки: «Слайд 1 з 2». */
  dot: (index: number, total: number) => `Слайд ${index + 1} з ${total}`,
  /** aria-label слайда для скрінрідера. */
  slide: (index: number, total: number) => `${index + 1} з ${total}`,
} as const;
