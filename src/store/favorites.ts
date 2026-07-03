"use client";

import { useEffect } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type TFavoritesState = {
  ids: number[];
  toggle: (id: number) => void;
};

/**
 * Обране («список бажань»): id товарів у localStorage. skipHydration — щоб серверний
 * HTML і перший клієнтський рендер збігалися (порожній список), а збережений стан
 * підтягувався вже після маунту (useFavoritesHydration) — без hydration mismatch.
 */
export const useFavoritesStore = create<TFavoritesState>()(
  persist(
    (set) => ({
      ids: [],
      toggle: (id) =>
        set((state) => ({
          ids: state.ids.includes(id)
            ? state.ids.filter((item) => item !== id)
            : [...state.ids, id],
        })),
    }),
    { name: "faith-favorites", version: 1, skipHydration: true },
  ),
);

export const useIsFavorite = (id: number) =>
  useFavoritesStore((state) => state.ids.includes(id));

export const useFavoritesCount = () => useFavoritesStore((state) => state.ids.length);

/** Підтягнути збережене обране після маунту. Викликати в кожному компоненті-споживачі. */
export function useFavoritesHydration() {
  useEffect(() => {
    void useFavoritesStore.persist.rehydrate();
  }, []);
}
