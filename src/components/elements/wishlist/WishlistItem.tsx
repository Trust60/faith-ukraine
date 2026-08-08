"use client";

import { Heart } from "lucide-react";
import { IconButton } from "@/ui/IconButton";
import { ProductCard } from "@/components/elements/catalog/ProductCard";
import { useFavoritesStore } from "@/store/favorites";
import type { TCatalogProduct } from "@/data/catalog";

type TWishlistItemProps = {
  product: TCatalogProduct;
  /** Товар першого екрана: фото — priority (LCP). */
  eager: boolean;
};

/**
 * Елемент списку бажань: звичайна картка каталогу плюс кнопка «прибрати».
 *
 * Кнопка — сусід картки, а не її частина: у ProductCard посилання розтягнуте оверлеєм
 * (after:inset-0) на всю площу, тож усередині картки кнопка була б неклікабельна.
 * Позиціонований сусід із z-10 малюється поверх оверлея — і сам ProductCard правити не
 * доводиться (каталог і пошук лишаються як у макеті). Заповнене серце — та сама мова,
 * що й кнопка на сторінці товару та іконка в шапці. Без aria-pressed: тут це не
 * перемикач (картка одразу зникає зі списку), а звичайна дія — стан несе сам лейбл.
 */
export function WishlistItem({ product, eager }: TWishlistItemProps) {
  const toggle = useFavoritesStore((state) => state.toggle);

  return (
    <li className="relative animate-reveal motion-reduce:animate-none">
      <ProductCard product={product} priority={eager} />
      <IconButton
        aria-label={`Прибрати ${product.lineName} ${product.title} зі списку бажань`}
        onClick={() => toggle(product.id)}
        className="absolute top-0 right-0 z-10 size-11 text-brand hover:text-heading"
      >
        <Heart className="size-5 fill-current" strokeWidth={1.5} aria-hidden />
      </IconButton>
    </li>
  );
}
