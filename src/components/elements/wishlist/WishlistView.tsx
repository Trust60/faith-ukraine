"use client";

import { useEffect, useMemo } from "react";
import { CATALOG_GRID_CLASS } from "@/components/elements/catalog/grid";
import { ProductGridSkeleton } from "@/components/elements/catalog/ProductGridSkeleton";
import {
  useFavoriteIds,
  useFavoritesHydration,
  useFavoritesReady,
  useFavoritesStore,
} from "@/store/favorites";
import { cn } from "@/utils/cn";
import { WishlistEmpty } from "./WishlistEmpty";
import { WishlistItem } from "./WishlistItem";
import type { TCatalogProduct } from "@/data/catalog";

/** Скільки карток вважаємо «першим екраном» — їх фото вантажимо пріоритетно. */
const EAGER_COUNT = 8;

type TWishlistViewProps = {
  /** Увесь каталог — обране фільтрується з нього на клієнті (див. коментар нижче). */
  products: TCatalogProduct[];
  className?: string;
};

/**
 * Список бажань. Обране живе лише в localStorage, тому сервер віддає весь каталог
 * (кешований getCatalogData — без окремого запиту до БД), а вибірку робимо на клієнті:
 * так сторінка лишається статичною (ISR), як /catalog і /search. Порядок каталогу
 * зберігається сам собою — фільтруємо вже відсортований масив.
 *
 * Поки стор не гідратований, «порожньо» і «ще не підтягнули» нерозрізненні, тому
 * показуємо скелетон (він же в серверному HTML) — інакше порожній стан блимав би
 * на кожному завантаженні.
 */
export function WishlistView({ products, className }: TWishlistViewProps) {
  useFavoritesHydration();
  const ready = useFavoritesReady();
  const ids = useFavoriteIds();
  const clear = useFavoritesStore((state) => state.clear);
  const keepOnly = useFavoritesStore((state) => state.keepOnly);

  const items = useMemo(() => {
    const chosen = new Set(ids);
    return products.filter((product) => chosen.has(product.id));
  }, [products, ids]);

  // Товар могли зняти з публікації — його id залишився б у localStorage, і лічильник
  // у шапці показував би більше, ніж карток на сторінці. Чистимо після гідрації.
  useEffect(() => {
    if (ready) keepOnly(products.map((product) => product.id));
  }, [ready, products, keepOnly]);

  if (!ready) return <ProductGridSkeleton count={4} className={className} />;

  if (items.length === 0) return <WishlistEmpty className={className} />;

  return (
    <div className={className}>
      <p
        role="status"
        aria-atomic="true"
        className="text-center text-sm text-nav md:text-base"
      >
        У списку бажань: {items.length}
      </p>

      <ul className={cn(CATALOG_GRID_CLASS, "mt-8 md:mt-10")}>
        {items.map((product, position) => (
          <WishlistItem
            key={product.id}
            product={product}
            eager={position < EAGER_COUNT}
          />
        ))}
      </ul>

      <div className="mt-12 flex justify-center md:mt-16">
        <button
          type="button"
          onClick={clear}
          className="inline-flex min-h-11 items-center text-base text-ink-soft underline underline-offset-4 transition-colors hover:text-heading focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        >
          Очистити список
        </button>
      </div>
    </div>
  );
}
