import type { TCatalogProduct } from "@/data/catalog";

/** Ключ осі фільтра = ключ відповідного списку опцій у TCatalogFacets. */
export type TFilterAxisKey =
  | "categories"
  | "lines"
  | "types"
  | "concerns"
  | "skinTypes";

type TFilterAxis = {
  key: TFilterAxisKey;
  label: string;
  /** Слаги товару за цією віссю (одиничні поля обгортаємо в масив — уніфіковане зіставлення). */
  getValues: (product: TCatalogProduct) => string[];
  /** Чи розгорнута група за замовчуванням (довгі осі згортаємо, щоб не перевантажувати сайдбар). */
  defaultOpen?: boolean;
};

/** Осі фільтра каталогу в порядку показу в сайдбарі (узгоджено з планом фільтрів). */
export const FILTER_AXES: TFilterAxis[] = [
  { key: "categories", label: "Категорія", getValues: (p) => [p.categorySlug] },
  { key: "lines", label: "Лінійка", getValues: (p) => [p.lineSlug] },
  { key: "types", label: "Тип продукту", getValues: (p) => [p.typeSlug] },
  { key: "concerns", label: "Призначення", getValues: (p) => p.concernSlugs, defaultOpen: false },
  { key: "skinTypes", label: "Тип шкіри", getValues: (p) => p.skinTypeSlugs, defaultOpen: false },
];

/** Обрані слаги по кожній осі. Порожній масив = вісь не фільтрує. */
export type TSelection = Record<TFilterAxisKey, string[]>;

export const createEmptySelection = (): TSelection => ({
  categories: [],
  lines: [],
  types: [],
  concerns: [],
  skinTypes: [],
});

/** Ім'я query-параметра для кожної осі: /catalog?line=lamellar-mode&type=гель-крем */
const AXIS_PARAM: Record<TFilterAxisKey, string> = {
  categories: "category",
  lines: "line",
  types: "type",
  concerns: "concern",
  skinTypes: "skinType",
};

/**
 * Початкова вибірка з query-параметрів URL: так посилання з інших сторінок (напр. картки
 * ліній на головній) відкривають каталог із уже застосованим фільтром. Кілька значень
 * однієї осі — через кому. URL лише задає старт: далі фільтри живуть у стані клієнта.
 */
export function selectionFromParams(
  params: URLSearchParams | null,
): TSelection {
  const selection = createEmptySelection();
  if (!params) return selection;

  for (const axis of FILTER_AXES) {
    const raw = params.get(AXIS_PARAM[axis.key]);
    if (!raw) continue;
    selection[axis.key] = raw
      .split(",")
      .map((slug) => slug.trim())
      .filter(Boolean);
  }
  return selection;
}

export const SORT_OPTIONS = [
  { value: "recommended", label: "Рекомендовані" },
  { value: "step", label: "За кроком догляду" },
  { value: "name", label: "За назвою" },
] as const;

export type TSortValue = (typeof SORT_OPTIONS)[number]["value"];

/** Товар каталогу з міткою відповідності поточному фільтру. */
export type TCatalogItem = {
  product: TCatalogProduct;
  matches: boolean;
  /** Позиція серед відфільтрованих (для «Показати ще»); -1, якщо не проходить фільтр. */
  matchIndex: number;
};

export const countActive = (selection: TSelection): number =>
  FILTER_AXES.reduce((sum, axis) => sum + selection[axis.key].length, 0);

/** Перемикає слаг у вибірці осі (додає/прибирає), повертаючи новий об'єкт вибірки. */
export function toggleSelection(
  selection: TSelection,
  key: TFilterAxisKey,
  slug: string,
): TSelection {
  const current = selection[key];
  const next = current.includes(slug)
    ? current.filter((value) => value !== slug)
    : [...current, slug];
  return { ...selection, [key]: next };
}

/** Товар проходить фільтр, якщо по КОЖНІЙ осі: вісь порожня АБО є перетин слагів (OR у межах осі, AND між осями). */
const productMatches = (product: TCatalogProduct, selection: TSelection) =>
  FILTER_AXES.every((axis) => {
    const chosen = selection[axis.key];
    return (
      chosen.length === 0 ||
      axis.getValues(product).some((value) => chosen.includes(value))
    );
  });

/** Сортує товари за обраним критерієм. «Рекомендовані» = вихідний порядок (лінійка → крок). */
export function sortProducts(
  products: TCatalogProduct[],
  sort: TSortValue,
): TCatalogProduct[] {
  if (sort === "recommended") return products;
  const sorted = [...products];
  if (sort === "name") {
    sorted.sort((a, b) =>
      `${a.lineName} ${a.title}`.localeCompare(`${b.lineName} ${b.title}`, "uk"),
    );
  } else {
    // Array.sort стабільний → за однакового кроку зберігається рекомендований порядок.
    sorted.sort((a, b) => a.stepOrder - b.stepOrder);
  }
  return sorted;
}

/** Розмічає товари відповідністю фільтру й нумерує ті, що пройшли (для пагінації). */
export function annotateProducts(
  products: TCatalogProduct[],
  selection: TSelection,
): { items: TCatalogItem[]; matchCount: number } {
  let matchCount = 0;
  const items = products.map<TCatalogItem>((product) => {
    const matches = productMatches(product, selection);
    return { product, matches, matchIndex: matches ? matchCount++ : -1 };
  });
  return { items, matchCount };
}
