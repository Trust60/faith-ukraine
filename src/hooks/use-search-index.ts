"use client";

import { useEffect, useState } from "react";
import type { TSearchIndex } from "@/data/search-index";

const INDEX_URL = "/search-index.json";

// Кеш на рівні модуля: індекс не змінюється в межах завантаження сторінки, тож
// вантажимо його рівно один раз, скільки б разів діалог не відкривали. inFlight
// склеює паралельні виклики (напр. наведення на кнопку + одразу хоткей).
let cached: TSearchIndex | null = null;
let inFlight: Promise<TSearchIndex> | null = null;

function loadSearchIndex(): Promise<TSearchIndex> {
  if (cached) return Promise.resolve(cached);

  inFlight ??= fetch(INDEX_URL)
    .then((response) => {
      if (!response.ok) throw new Error(`Search index: ${response.status}`);
      return response.json() as Promise<TSearchIndex>;
    })
    .then((index) => {
      cached = index;
      return index;
    })
    .catch((error: unknown) => {
      // Даємо шанс повторити спробу при наступному відкритті діалогу.
      inFlight = null;
      throw error;
    });

  return inFlight;
}

/**
 * Прогрів кешу до відкриття діалогу (наведення на кнопку, фокус, хоткей) —
 * поки модалка анімується, індекс уже приїхав. Помилку тут глушимо: її покаже
 * сам діалог, коли його справді відкриють.
 */
export const prefetchSearchIndex = () => {
  void loadSearchIndex().catch(() => {});
};

export type TIndexStatus = "loading" | "ready" | "error";

/** Індекс пошуку; вантажиться лише коли enabled (тобто діалог відкрито хоч раз). */
export function useSearchIndex(enabled: boolean) {
  const [index, setIndex] = useState<TSearchIndex | null>(cached);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!enabled || index) return;

    let active = true;
    loadSearchIndex().then(
      (loaded) => {
        if (active) setIndex(loaded);
      },
      () => {
        if (active) setFailed(true);
      },
    );

    return () => {
      active = false;
    };
  }, [enabled, index]);

  // Статус виводимо зі стану, а не тримаємо окремо — менше синхронізації.
  // Повторна спроба (нове відкриття діалогу) йде у фоні: щойно вона вдасться,
  // з'явиться index і повідомлення про помилку зникне.
  const status: TIndexStatus = index ? "ready" : failed ? "error" : "loading";

  return { index, status };
}
