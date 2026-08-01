"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { CatalogItem } from "@/components/elements/catalog/CatalogItem";
import { CATALOG_GRID_CLASS } from "@/components/elements/catalog/grid";
import { rankSearchables, toSearchables } from "@/utils/search";
import { cn } from "@/utils/cn";
import type { TCatalogData } from "@/data/catalog";

/** Скільки карток вважаємо «першим екраном» — їх фото вантажимо пріоритетно. */
const EAGER_COUNT = 8;

const LINK_CLASS =
  "text-ink-soft underline underline-offset-4 transition-colors hover:text-heading focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

type TSearchResultsViewProps = TCatalogData & { className?: string };

/**
 * Сторінка результатів пошуку. Запит читаємо з ?q= на клієнті (як фільтри каталогу) —
 * так сторінка лишається статичною (ISR), а не рендериться на кожен запит.
 * Ранжування — той самий rankSearchables, що й у діалозі пошуку.
 */
export function SearchResultsView({
  products,
  facets,
  className,
}: TSearchResultsViewProps) {
  const searchParams = useSearchParams();
  const query = searchParams.get("q")?.trim() ?? "";

  const searchables = useMemo(
    () => toSearchables(products, facets),
    [products, facets],
  );
  const found = useMemo(
    () => rankSearchables(searchables, query).map((hit) => products[hit]),
    [searchables, query, products],
  );

  if (!query) {
    return (
      <p className={cn("text-center text-nav", className)}>
        Введіть запит у полі пошуку — або{" "}
        <Link href="/catalog" className={LINK_CLASS}>
          перегляньте весь каталог
        </Link>
        .
      </p>
    );
  }

  return (
    <div className={className}>
      <p className="text-center text-sm text-nav md:text-base">
        {found.length > 0
          ? `Знайдено товарів: ${found.length}`
          : `За запитом «${query}» нічого не знайдено.`}
      </p>

      {found.length > 0 ? (
        <ul className={cn(CATALOG_GRID_CLASS, "mt-8 md:mt-10")}>
          {found.map((product, position) => (
            <CatalogItem
              key={product.id}
              product={product}
              eager={position < EAGER_COUNT}
              collapsed={false}
            />
          ))}
        </ul>
      ) : (
        <p className="mt-4 text-center">
          <Link href="/catalog" className={LINK_CLASS}>
            Переглянути весь каталог
          </Link>
        </p>
      )}
    </div>
  );
}
