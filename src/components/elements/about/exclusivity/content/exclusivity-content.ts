export type TExclusivityDocument = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export const EXCLUSIVITY_HEADING = "Ексклюзивність";

/**
 * Офіційні документи, що підтверджують права на бренд FAITH в Україні:
 * свідоцтво на торговельну марку (3 сторінки) та лист-авторизація від FAITH Co., Ltd.
 * Джерела — designs/exclusivity.
 */
export const EXCLUSIVITY_DOCUMENTS: readonly TExclusivityDocument[] = [
  {
    src: "/about/exclusivity/trademark-certificate.webp",
    alt: "Свідоцтво України на торговельну марку FAITH № 341371",
    width: 1241,
    height: 1755,
  },
  {
    src: "/about/exclusivity/trademark-details.webp",
    alt: "Відомості про торговельну марку FAITH: власник та перелік товарів і послуг за класами",
    width: 1241,
    height: 1755,
  },
  {
    src: "/about/exclusivity/trademark-authenticity.webp",
    alt: "Підтвердження автентичності свідоцтва на торговельну марку FAITH від УКРНОІВІ",
    width: 1241,
    height: 1755,
  },
  {
    src: "/about/exclusivity/authorization-letter.webp",
    alt: "Лист FAITH Co., Ltd. про призначення ексклюзивного дистриб'ютора продукції FAITH в Україні",
    width: 1219,
    height: 1680,
  },
];
