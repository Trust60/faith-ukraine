/**
 * Секція «Оберіть свій догляд FAITH» — 7 карток ліній (desktop-design-7).
 *
 * `href` веде в каталог із передвибраним фільтром. Слаги звірені з БД: лінійки —
 * lamellar-veil-ex / lamellar-mode / at-system / elemois / nonative / insist-lamellar.
 * Окремої лінійки «SPF» у каталозі немає (ці засоби входять до Insist Lamellar), тому
 * картка SPF фільтрує за призначенням «Сонцезахист».
 */
export const CARE_LINES_SECTION = {
  heading: "Оберіть свій догляд FAITH",
  cta: { label: "Отримати консультацію" },
} as const;

export type TCareLineContent = {
  title: string;
  text: string;
  href: string;
  image: { src: string; alt: string };
};

export const CARE_LINES: readonly TCareLineContent[] = [
  {
    title: "Lamellar Mode",
    text: "FAITH відкриває нові можливості в догляді за віковою та проблемною шкірою. Система догляду, розроблена для потреб шкіри з вираженими ознаками вікових змін і підвищеною чутливістю. Працює в тандемі з професійними методиками, посилюючи та продовжуючи їхній ефект.",
    href: "/catalog?line=lamellar-mode",
    image: {
      src: "/home/lines/lamellar-mode.webp",
      alt: "Лінійка засобів FAITH Lamellar Mode",
    },
  },
  {
    title: "Lamellar Veil EX",
    text: "Глибоке зволоження й делікатний догляд — універсальна лінія, з якої варто почати знайомство з FAITH. Підходить для молодої та вікової шкіри, включаючи чоловічу. Рекомендується для підтримки шкіри після інтенсивних косметологічних методик і як профілактика раннього старіння.",
    href: "/catalog?line=lamellar-veil-ex",
    image: {
      src: "/home/lines/lamellar-veil-ex.webp",
      alt: "Лінійка засобів FAITH Lamellar Veil EX",
    },
  },
  {
    title: "Elemois",
    text: "Усі засоби FAITH підходять як для обличчя, так і для тіла. Elemois — спеціалізована лінія, розроблена саме для догляду за тілом. Ідеальна для найчутливішої шкіри, забезпечує глибоке зволоження, ефект ліфтингу та допомагає формувати рельєф.",
    href: "/catalog?line=elemois",
    image: {
      src: "/home/lines/elemois.webp",
      alt: "Лінійка засобів для тіла FAITH Elemois",
    },
  },
  {
    title: "Nonative",
    text: "Догляд FAITH Nonative відновлює мікрофлору та бар’єр шкіри голови, що є основою здоров’я волосся. Зменшує чутливість, лущення, неприємний запах і підтримує чистоту фолікулів. Результат — здорова шкіра голови + життєздатне, блискуче та щільне волосся.",
    href: "/catalog?line=nonative",
    image: {
      src: "/home/lines/nonative.webp",
      alt: "Лінійка засобів для волосся FAITH Nonative",
    },
  },
  {
    title: "Insist",
    text: "Ламелярний макіяж — поєднання догляду та макіяжу. Засоби з псевдоламелярною структурою зволожують, захищають і створюють ефект «голої шкіри» без відчуття макіяжу. Надлегкі тональні основи у вигляді есенцій дають рівний, природний вигляд.",
    href: "/catalog?line=insist-lamellar",
    image: {
      src: "/home/lines/insist.webp",
      alt: "Тональні основи FAITH Insist Lamellar",
    },
  },
  {
    title: "SPF 40/20",
    text: "Додавання зволожуючих компонентів до складу SPF забезпечує не лише захист, а й ефективний догляд за шкірою. Крім того, SPF FAITH відштовхує забруднення навколишнього середовища! Шкіра отримує повний захист від UVB/UVA променів та випромінювання екранних пристроїв.",
    href: "/catalog?concern=сонцезахист",
    image: {
      src: "/home/lines/spf-40-20.webp",
      alt: "Сонцезахисні засоби FAITH SPF 40 та SPF 20",
    },
  },
  {
    title: "At System",
    text: "Лінія для найчутливішої шкіри. Дерматологічні засоби для догляду при атопічних проявах. Не лікує, але покращує стан шкіри, знімає свербіж і почервоніння, дарує комфорт, делікатно очищує та зволожує.",
    href: "/catalog?line=at-system",
    image: {
      src: "/home/lines/at-system.webp",
      alt: "Лінійка засобів FAITH At System для чутливої шкіри",
    },
  },
];

/**
 * Розкладка карток на десктопі (2 колонки × 4 ряди). У DOM порядок мобільний —
 * саме такий, як у mobile-design-9…12, — а на md картки розставляються явно, щоб
 * ліва колонка була доглядом за обличчям і тілом, права — волосся/макіяж/SPF,
 * а «At System» стояла окремо по центру внизу (як у desktop-design-7).
 */
export const CARE_LINE_PLACEMENT: readonly string[] = [
  "md:col-start-1 md:row-start-1",
  "md:col-start-1 md:row-start-2",
  "md:col-start-1 md:row-start-3",
  "md:col-start-2 md:row-start-1",
  "md:col-start-2 md:row-start-2",
  "md:col-start-2 md:row-start-3",
  "md:col-span-2 md:row-start-4 md:mx-auto md:w-[calc(50%-1rem)]",
];
