"use client";

import { useState } from "react";
import { OutlineButton } from "@/ui/OutlineButton";
import { CatalogItem } from "./CatalogItem";
import type { TCatalogProduct } from "@/data/catalog";

type TCatalogListProps = {
  products: TCatalogProduct[];
  className?: string;
};

// Перша пачка та крок докладання («Показати ще»). Кратно 4 — рівні ряди на десктопі (4 колонки).
const INITIAL_VISIBLE = 16;
const LOAD_STEP = 16;
// Фото першого екрана вантажимо пріоритетно (LCP), решта — lazy (next/image).
const PRIORITY_COUNT = 8;

/**
 * Сітка каталогу з кнопкою «Показати ще». Усі товари рендеряться в HTML (для SEO —
 * краулер бачить усі посилання за один обхід), але поза першою пачкою приховані через
 * CSS: місця не займають, тож футер одразу доступний. Кнопка лише знімає приховування,
 * без запиту до сервера — розкриття миттєве. Картки плавно проявляються (reveal).
 */
export function CatalogList({ products, className }: TCatalogListProps) {
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);
  const hasMore = visibleCount < products.length;

  return (
    <div className={className}>
      {/* Без JS показуємо всі товари й ховаємо неробочу кнопку (прогресивне покращення). */}
      <noscript>
        <style>{`.catalog-collapsed{display:block!important}.catalog-show-more{display:none!important}`}</style>
      </noscript>

      <ul className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-12">
        {products.map((product, index) => (
          <CatalogItem
            key={product.id}
            product={product}
            priority={index < PRIORITY_COUNT}
            collapsed={index >= visibleCount}
          />
        ))}
      </ul>

      {hasMore && (
        <div className="catalog-show-more mt-12 flex justify-center md:mt-16">
          <OutlineButton
            onClick={() => setVisibleCount((count) => count + LOAD_STEP)}
          >
            Показати ще
          </OutlineButton>
        </div>
      )}
    </div>
  );
}
