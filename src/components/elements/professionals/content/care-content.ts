/**
 * Статичний контент середніх секцій сторінки «Для професіоналів»: «Результати»,
 * «Схема професійного догляду» та «Система домашнього догляду» (таблиця-зображення).
 * Фото — у public/professionals (скопійовані з designs/for-professionals).
 */

export type TResultCase = {
  src: string;
  alt: string;
  caption: string;
};

export const RESULTS: {
  heading: string;
  cases: readonly TResultCase[];
} = {
  heading:
    "Результати після використання домашнього догляду та салонних процедур FAITH",
  cases: [
    {
      src: "/professionals/results-1.png",
      alt: "Обличчя клієнтки до та після курсу догляду FAITH, вік 41 рік",
      caption:
        "Вік — 41 рік, курс домашнього догляду впродовж 1 місяця, салонні процедури 1 раз на тиждень",
    },
    {
      src: "/professionals/results-2.png",
      alt: "Обличчя клієнтки до та після курсу догляду FAITH, вік 50 років",
      caption:
        "Вік — 50 років, курс домашнього догляду впродовж 1 місяця, без салонних процедур",
    },
    {
      src: "/professionals/results-3.png",
      alt: "Обличчя клієнтки до та після курсу догляду FAITH, вік 50 років",
      caption:
        "Вік — 50 років, три професійні процедури з підтримкою домашнього догляду",
    },
    {
      src: "/professionals/results-4.png",
      alt: "Профіль обличчя клієнтки до та після курсу догляду FAITH, вік 51 рік",
      caption: "Вік — 51 рік, курс домашнього догляду впродовж 1 місяця",
    },
    {
      src: "/professionals/results-5.png",
      alt: "Шкіра обличчя клієнтки до та після курсу догляду FAITH, вік 50 років",
      caption:
        "Вік — 50 років, курс домашнього догляду впродовж 1 місяця, без салонних процедур",
    },
    {
      src: "/professionals/results-6.png",
      alt: "Шкіра обличчя клієнтки до та після курсу догляду FAITH, вік 59 років",
      caption: "Вік — 59 років, два місяці домашнього догляду",
    },
  ],
};

export type TSchemeStep = {
  title: string;
  note?: string;
};

export const CARE_SCHEME: {
  heading: string;
  image: { src: string; alt: string };
  steps: readonly TSchemeStep[];
} = {
  heading: "Схема професійного догляду FAITH",
  image: {
    src: "/professionals/care-scheme.webp",
    alt: "Кошик із засобами FAITH Lamellar Mode на дерев'яному столі",
  },
  steps: [
    { title: "Подвійне очищення" },
    { title: "Маска" },
    {
      title: "Precare Essence ISQ",
      note: "Ламелярна есенція з живим колагеном",
    },
    { title: "Есенція, Пудра — есенція" },
    { title: "Лосьйон" },
    { title: "Гель" },
    { title: "SPF" },
  ],
};

export const HOME_CARE = {
  heading: "Система домашнього догляду на прикладі лінії FAITH Lamellar Mode",
  table: {
    src: "/professionals/home-care-table.png",
    width: 2036,
    height: 1041,
    alt: "Таблиця системи домашнього догляду FAITH Lamellar Mode: вісім кроків — від очищення до SPF-захисту, із засобами, частотою та регулярністю застосування",
  },
} as const;
