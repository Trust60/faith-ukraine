import type { TStoryParagraphContent } from "../../StoryParagraph";

/**
 * Контент секції «Технологія доставки компонентів MC2X».
 * Текст — з макетів designs/technologists.
 */

export const MC2X_HEADING = "Технологія доставки компонентів MC2X";

export const MC2X_DELIVERY = {
  src: "/about/technologies/mc2x-delivery.webp",
  alt: "Наносоми FAITH проникають у глибокі шари шкіри",
} as const;

export const MC2X_NANOSOMA = {
  src: "/about/technologies/mc2x-nanosoma.webp",
  alt: "GS наносома вивільняє активні компоненти в роговому шарі шкіри",
} as const;

export const MC2X_INTRO =
  "Оригінальна розробка FAITH, результат 7-річних досліджень (ПАТЕНТ). Ця технологія використовується для прицільної доставки активних компонентів у глибокі шари шкіри з метою запобігти передчасному старінню шкіри, відновити клітинні структури та фізіологію шкіри.";

export const MC2X_BODY: TStoryParagraphContent = [
  { text: "FAITH GS наносома", bold: true },
  {
    text: " має одношарову фосфоліпідну оболонку. Потрапляючи на шкіру, оболонка капсули лопається, її фосфоліпіди вбудовуються в місця ушкодження рогового шару епідермісу, звільнюючи множинні наносоми ",
  },
  { text: "FAITH Delivery", bold: true },
  { text: ", розміщені всередині " },
  { text: "GS капсули", bold: true },
  { text: ". Технологія " },
  { text: "MC2X", bold: true },
  {
    text: " дозволила інкапсулювати 100% водорозчинні речовини та проводити активні компоненти у найглибші шари шкіри!",
  },
];
