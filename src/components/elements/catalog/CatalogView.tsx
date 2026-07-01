"use client";

import { useState } from "react";
import { useCatalogFilters } from "@/hooks/use-catalog-filters";
import { CatalogToolbar } from "./CatalogToolbar";
import { CatalogList } from "./CatalogList";
import { CatalogFilters } from "./filters/CatalogFilters";
import { FilterDrawer } from "./filters/FilterDrawer";
import type { TCatalogData } from "@/data/catalog";

type TCatalogViewProps = TCatalogData & { className?: string };

/**
 * Каталог із фільтрами: тулбар (лічильник + сортування + кнопка «Фільтри» на мобільному),
 * сайдбар фільтрів на десктопі (lg+) / шторка на мобільному, і сітка товарів.
 * Уся фільтрація/сортування клієнтські (useCatalogFilters) — миттєві, без запитів.
 * Панель фільтрів рендериться двічі (сайдбар + шторка) від одного стану — вони синхронні.
 */
export function CatalogView({ products, facets, className }: TCatalogViewProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const filters = useCatalogFilters(products);

  const filtersPanel = (
    <CatalogFilters
      facets={facets}
      selection={filters.selection}
      activeCount={filters.activeCount}
      onToggle={filters.toggle}
      onClearAll={filters.clearAll}
    />
  );

  return (
    <div className={className}>
      <CatalogToolbar
        matchCount={filters.matchCount}
        activeCount={filters.activeCount}
        sort={filters.sort}
        onSortChange={filters.changeSort}
        onOpenFilters={() => setDrawerOpen(true)}
      />

      <div className="mt-6 flex items-start gap-8 lg:gap-10">
        <aside
          aria-label="Фільтри каталогу"
          className="hidden w-64 shrink-0 lg:block"
        >
          {filtersPanel}
        </aside>

        <div className="min-w-0 flex-1">
          <CatalogList
            items={filters.items}
            eagerIds={filters.eagerIds}
            matchCount={filters.matchCount}
            visibleCount={filters.visibleCount}
            hasMore={filters.hasMore}
            onShowMore={filters.showMore}
            onClearAll={filters.clearAll}
          />
        </div>
      </div>

      <FilterDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        matchCount={filters.matchCount}
      >
        {filtersPanel}
      </FilterDrawer>
    </div>
  );
}
