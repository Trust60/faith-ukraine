"use client";

import { FILTER_AXES, type TFilterAxisKey, type TSelection } from "@/utils/catalog-filter";
import { FilterGroup } from "./FilterGroup";
import type { TCatalogFacets } from "@/data/catalog";

type TCatalogFiltersProps = {
  facets: TCatalogFacets;
  selection: TSelection;
  activeCount: number;
  onToggle: (key: TFilterAxisKey, slug: string) => void;
  onClearAll: () => void;
};

/**
 * Панель фільтрів — заголовок + «Очистити» (коли є активні) + групи по осях.
 * Стан фільтрів приходить ззовні (хук useCatalogFilters), тож панель можна рендерити
 * і в десктопному сайдбарі, і в мобільній шторці — обидві синхронізовані.
 */
export function CatalogFilters({
  facets,
  selection,
  activeCount,
  onToggle,
  onClearAll,
}: TCatalogFiltersProps) {
  return (
    <div>
      <div className="flex items-center justify-between gap-3 border-b border-line pb-3">
        <h2 className="font-serif text-xl text-heading">Фільтри</h2>
        {activeCount > 0 && (
          <button
            type="button"
            onClick={onClearAll}
            className="text-sm text-nav underline underline-offset-4 transition-colors hover:text-ink-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            Очистити ({activeCount})
          </button>
        )}
      </div>

      {FILTER_AXES.map((axis) => (
        <FilterGroup
          key={axis.key}
          title={axis.label}
          options={facets[axis.key]}
          selectedSlugs={selection[axis.key]}
          onToggle={(slug) => onToggle(axis.key, slug)}
          defaultOpen={axis.defaultOpen}
        />
      ))}
    </div>
  );
}
