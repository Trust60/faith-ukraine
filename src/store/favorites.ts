"use client";

import { useEffect } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type TFavoritesState = {
  ids: number[];
  /** Чи вже підтягнули збережений список із localStorage. */
  hydrated: boolean;
  setHydrated: () => void;
  toggle: (id: number) => void;
  clear: () => void;
  /** Лишити тільки id, що є в переданому списку (див. коментар нижче). */
  keepOnly: (validIds: number[]) => void;
};

/**
 * Обране («список бажань»): id товарів у localStorage. skipHydration — щоб серверний
 * HTML і перший клієнтський рендер збігалися (порожній список), а збережений стан
 * підтягувався вже після маунту (useFavoritesHydration) — без hydration mismatch.
 *
 * Через skipHydration «ще не підтягнули» і «список справді порожній» — це той самий
 * `ids: []`, тому тримаємо прапорець hydrated: сторінка обраного показує скелетон, поки
 * він false, і не блимає порожнім станом. Прапорець рантаймовий — partialize лишає в
 * сховищі тільки ids (формат збереженого не змінився, тож version піднімати не треба).
 */
export const useFavoritesStore = create<TFavoritesState>()(
  persist(
    (set) => ({
      ids: [],
      hydrated: false,
      setHydrated: () => set({ hydrated: true }),
      toggle: (id) =>
        set((state) => ({
          ids: state.ids.includes(id)
            ? state.ids.filter((item) => item !== id)
            : [...state.ids, id],
        })),
      clear: () => set({ ids: [] }),
      keepOnly: (validIds) =>
        set((state) => {
          const kept = state.ids.filter((id) => validIds.includes(id));
          // Той самий стан, якщо нічого не змінилось — zustand тоді не нотифікує
          // підписників (жодного зайвого рендера й циклу з ефекту-виклику).
          return kept.length === state.ids.length ? state : { ids: kept };
        }),
    }),
    {
      name: "faith-favorites",
      version: 1,
      skipHydration: true,
      partialize: ({ ids }) => ({ ids }),
      onRehydrateStorage: (state) => () => state.setHydrated(),
    },
  ),
);

export const useIsFavorite = (id: number) =>
  useFavoritesStore((state) => state.ids.includes(id));

export const useFavoritesCount = () => useFavoritesStore((state) => state.ids.length);

export const useFavoriteIds = () => useFavoritesStore((state) => state.ids);

/** Чи вже підтягнули збережене — щоб відрізнити «завантажується» від «порожньо». */
export const useFavoritesReady = () => useFavoritesStore((state) => state.hydrated);

/** Підтягнути збережене обране після маунту. Викликати в кожному компоненті-споживачі. */
export function useFavoritesHydration() {
  useEffect(() => {
    void useFavoritesStore.persist.rehydrate();
  }, []);
}
