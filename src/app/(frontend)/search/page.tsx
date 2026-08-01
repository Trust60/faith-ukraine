import type { Metadata } from "next";
import { Suspense } from "react";
import { getCatalogData } from "@/data/catalog";
import { ProductGridSkeleton } from "@/components/elements/catalog/ProductGridSkeleton";
import { SearchResultsView } from "@/components/elements/search/SearchResultsView";

export const metadata: Metadata = {
  title: "Пошук — FAITH",
  description: "Пошук по каталогу професійної японської косметики FAITH.",
  // Сторінки результатів пошуку в індекс не віддаємо — контент дублює каталог.
  robots: { index: false, follow: true },
};

// Ті самі кешовані дані каталогу (тег "catalog"), що й на /catalog — окремого
// запиту до БД пошук не робить, сторінка лишається статичною (ISR).
export default async function SearchPage() {
  const { products, facets } = await getCatalogData();

  return (
    <section className="mx-auto max-w-[1200px] px-4 py-10 md:px-8 md:py-14">
      <h1 className="text-center font-display text-3xl uppercase tracking-[0.02em] text-heading md:text-4xl">
        Пошук
      </h1>

      {/* Запит живе в ?q= і читається на клієнті — без Suspense це зірвало б пререндер. */}
      <Suspense fallback={<ProductGridSkeleton className="mt-8 md:mt-10" />}>
        <SearchResultsView
          products={products}
          facets={facets}
          className="mt-8 md:mt-10"
        />
      </Suspense>
    </section>
  );
}
