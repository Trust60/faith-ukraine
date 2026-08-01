import { FILTER_AXES } from "@/utils/catalog-filter";
import type { TCatalogFacets, TCatalogProduct } from "@/data/catalog";

/**
 * Товар у вигляді, придатному для зіставлення із запитом: чотири поля різної ваги.
 * Назви товарів — латиниця («Energizing Pack»), тож україномовні запити ловляться
 * дескриптором і назвами таксономій («Очищення», «Зволоження», «Обличчя»).
 */
export type TSearchable = {
  title: string;
  lineName: string;
  descriptor: string;
  /** Назви термінів таксономій товару (категорія, тип, призначення, тип шкіри). */
  terms: string[];
};

/** Ваги полів: збіг у назві важливіший за збіг у таксономії. */
const WEIGHTS = { title: 6, lineName: 5, descriptor: 3, terms: 2 };

// Апострофи в українських назвах пишуть по-різному — зводимо до одного символу,
// щоб «п'ятиденний» і «пʼятиденний» шукались однаково.
const APOSTROPHES = /[’‘`´ʼ]/g;

/**
 * Згортка регістру та апострофів БЕЗ зміни довжини рядка — підсвічування збігів
 * рахує позиції у згорнутому тексті й застосовує їх до оригінального.
 */
export const foldText = (value: string): string =>
  value.toLowerCase().replace(APOSTROPHES, "'");

export const normalizeText = (value: string): string =>
  foldText(value).replace(/\s+/g, " ").trim();

/** Запит → список нормалізованих токенів (порожній масив = шукати нічого). */
export const tokenize = (query: string): string[] =>
  normalizeText(query).split(" ").filter(Boolean);

/**
 * Наскільки добре токен збігається з полем: повний збіг > початок слова > середина.
 * 0 — збігу немає.
 */
function scoreField(field: string, token: string): number {
  const at = field.indexOf(token);
  if (at < 0) return 0;
  if (field === token) return 3;
  const prev = field[at - 1];
  return at === 0 || prev === " " || prev === "-" ? 2 : 1;
}

type TNormalized = {
  title: string;
  lineName: string;
  descriptor: string;
  terms: string;
};

// Нормалізовані поля не залежать від запиту, тож рахуємо їх один раз на масив
// (кеш живе рівно стільки, скільки сам масив) — інакше кожне натискання клавіші
// переганяло б усі рядки заново.
const normalizedCache = new WeakMap<object, TNormalized[]>();

function normalizeItems(items: TSearchable[]): TNormalized[] {
  const cached = normalizedCache.get(items);
  if (cached) return cached;

  const normalized = items.map((item) => ({
    title: normalizeText(item.title),
    lineName: normalizeText(item.lineName),
    descriptor: normalizeText(item.descriptor),
    terms: normalizeText(item.terms.join(" ")),
  }));
  normalizedCache.set(items, normalized);
  return normalized;
}

/** Сума ваг найкращих збігів по кожному токену; 0, якщо хоч один токен не знайдено. */
function scoreItem(item: TNormalized, tokens: string[]): number {
  let total = 0;
  for (const token of tokens) {
    const best = Math.max(
      scoreField(item.title, token) * WEIGHTS.title,
      scoreField(item.lineName, token) * WEIGHTS.lineName,
      scoreField(item.descriptor, token) * WEIGHTS.descriptor,
      scoreField(item.terms, token) * WEIGHTS.terms,
    );
    // Усі токени обов'язкові (AND): «крем нічний» не має ловити просто «крем».
    if (best === 0) return 0;
    total += best;
  }
  return total;
}

/** Індекси товарів, що підходять під запит, від найкращого. Порожній запит → []. */
export function rankSearchables(items: TSearchable[], query: string): number[] {
  const tokens = tokenize(query);
  if (tokens.length === 0) return [];

  const normalized = normalizeItems(items);
  return normalized
    .map((item, index) => ({ index, score: scoreItem(item, tokens) }))
    .filter((hit) => hit.score > 0)
    // Array.sort стабільний → за однакового рахунку зберігається порядок каталогу.
    .sort((a, b) => b.score - a.score)
    .map((hit) => hit.index);
}

/** Те саме для простих назв (терміни таксономій — у них лише одне поле). */
export function rankNames(names: string[], query: string): number[] {
  const tokens = tokenize(query);
  if (tokens.length === 0) return [];

  return names
    .map((name, index) => {
      const field = normalizeText(name);
      let score = 0;
      for (const token of tokens) {
        const value = scoreField(field, token);
        if (value === 0) return { index, score: 0 };
        score += value;
      }
      return { index, score };
    })
    .filter((hit) => hit.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((hit) => hit.index);
}

// Лінійку не додаємо в terms — вона вже є окремим полем більшої ваги.
const TERM_AXES = FILTER_AXES.filter((axis) => axis.key !== "lines");

/** Товари каталогу + фасети → корпус для пошуку (індекси збігаються з products). */
export function toSearchables(
  products: TCatalogProduct[],
  facets: TCatalogFacets,
): TSearchable[] {
  // Слаги товару → назви термінів: шукаємо по тому, що бачить людина.
  const nameOf = new Map<string, string>();
  for (const axis of TERM_AXES) {
    for (const option of facets[axis.key]) {
      nameOf.set(`${axis.key}:${option.slug}`, option.name);
    }
  }

  return products.map((product) => ({
    title: product.title,
    lineName: product.lineName,
    descriptor: product.shortDescription ?? "",
    terms: TERM_AXES.flatMap((axis) =>
      axis.getValues(product).map((slug) => nameOf.get(`${axis.key}:${slug}`) ?? slug),
    ),
  }));
}
