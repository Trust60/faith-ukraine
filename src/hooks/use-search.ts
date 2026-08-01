"use client";

import { useCallback, useMemo, useState } from "react";
import type { KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import { rankNames, rankSearchables } from "@/utils/search";
import { termHref } from "@/utils/search-terms";
import type { TSearchIndex } from "@/data/search-index";

/** Скільки рядків показуємо в діалозі — решта живе на /search. */
const MAX_PRODUCTS = 6;
const MAX_TERMS = 4;

export const searchPageHref = (query: string) =>
  `/search?q=${encodeURIComponent(query.trim())}`;

/**
 * Увесь інтерактивний стан пошукового діалогу: запит, результати та навігація
 * клавіатурою. Зіставлення синхронне й миттєве (каталог уже в пам'яті), тому
 * дебаунс не потрібен — він лише додав би затримку.
 *
 * Рядки нумеруються наскрізно: спершу товари, далі терміни, останній — «показати
 * всі». activeIndex = -1 означає «фокус у полі», і тоді Enter веде на /search.
 */
export function useSearch(index: TSearchIndex | null, onClose: () => void) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);

  const termNames = useMemo(
    () => index?.terms.map((term) => term.name) ?? [],
    [index],
  );

  const results = useMemo(() => {
    if (!index) return { products: [], terms: [], totalProducts: 0 };

    const productHits = rankSearchables(index.products, query);
    const termHits = rankNames(termNames, query);

    return {
      products: productHits
        .slice(0, MAX_PRODUCTS)
        .map((hit) => index.products[hit]),
      terms: termHits.slice(0, MAX_TERMS).map((hit) => index.terms[hit]),
      totalProducts: productHits.length,
    };
  }, [index, query, termNames]);

  // Останній рядок з'являється, тільки якщо в діалог помістились не всі товари.
  const hasAllRow = results.totalProducts > results.products.length;

  const hrefs = useMemo(() => {
    const list = [
      ...results.products.map((product) => `/catalog/${product.slug}`),
      ...results.terms.map(termHref),
    ];
    if (hasAllRow) list.push(searchPageHref(query));
    return list;
  }, [results, hasAllRow, query]);

  const changeQuery = useCallback((value: string) => {
    setQuery(value);
    setActiveIndex(-1);
  }, []);

  const go = useCallback(
    (href: string) => {
      onClose();
      router.push(href);
    },
    [onClose, router],
  );

  const onKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        if (hrefs.length === 0) return;
        event.preventDefault();
        const step = event.key === "ArrowDown" ? 1 : -1;
        setActiveIndex((current) => {
          const next = current + step;
          if (next < -1) return hrefs.length - 1;
          // Після останнього рядка повертаємось у поле вводу, а не по колу.
          return next >= hrefs.length ? -1 : next;
        });
        return;
      }

      if (event.key === "Enter") {
        const href = activeIndex >= 0 ? hrefs[activeIndex] : null;
        if (href) {
          event.preventDefault();
          go(href);
          return;
        }
        // Без обраного рядка Enter показує всі результати на окремій сторінці.
        if (query.trim()) {
          event.preventDefault();
          go(searchPageHref(query));
        }
      }
    },
    [activeIndex, hrefs, query, go],
  );

  return {
    query,
    changeQuery,
    ...results,
    hasAllRow,
    rowCount: hrefs.length,
    activeIndex,
    setActiveIndex,
    onKeyDown,
    go,
  };
}

export type TSearchState = ReturnType<typeof useSearch>;
