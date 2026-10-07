"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { selectionFromParams } from "@/utils/catalog-filter";
import { CatalogView } from "./CatalogView";
import type { TCatalogData } from "@/data/catalog";

type TCatalogViewFromUrlProps = TCatalogData & { className?: string };

/**
 * Каталог із вибіркою з query-параметрів (?line=…, ?concern=… — див. selectionFromParams):
 * і при вході, і при зміні URL уже на цій сторінці (перехід із пошуку). Читаємо їх на
 * клієнті, а не через серверний searchParams, щоб сторінка лишалась статичною (ISR).
 *
 * useSearchParams на статичній сторінці доступний лише після гідрації, тому компонент
 * живе в <Suspense>, а fallback — той самий каталог без фільтрів (див. catalog/page.tsx).
 */
export function CatalogViewFromUrl(props: TCatalogViewFromUrlProps) {
  const searchParams = useSearchParams();
  const urlSelection = useMemo(
    () => selectionFromParams(searchParams),
    [searchParams],
  );

  return <CatalogView {...props} urlSelection={urlSelection} />;
}
