import type { Metadata } from "next";
import { Suspense } from "react";
import { getCatalogData } from "@/data/catalog";
import { CatalogView } from "@/components/elements/catalog/CatalogView";
import { CatalogViewFromUrl } from "@/components/elements/catalog/CatalogViewFromUrl";

export const metadata: Metadata = {
  title: "Каталог — FAITH",
  description: "Каталог професійної японської косметики FAITH.",
};

// Дані каталогу кешуються в getCatalogData (unstable_cache, тег "catalog") і
// інвалідовуються з адмінки через revalidateTag (хук revalidateCatalog) — сторінка
// віддається з кешу (ISR), без запиту до БД на кожен перегляд.
export default async function CatalogPage() {
  const { products, facets } = await getCatalogData();

  return (
    <section className="mx-auto max-w-[1200px] px-4 py-10 md:px-8 md:py-14">
      <h1 className="text-center font-display text-3xl uppercase tracking-[0.02em] text-heading md:text-4xl">
        Каталог
      </h1>

      {products.length === 0 ? (
        <p className="mt-10 text-center text-nav">Товари скоро з’являться.</p>
      ) : (
        // Фільтр з URL доступний лише на клієнті (useSearchParams), тому статичний HTML
        // містить fallback — і це справжні картки без фільтрів, а не скелетон: товари
        // видно (і індексуються) одразу, ще до завантаження JS. Після гідрації
        // застосовується вибірка з URL.
        <Suspense
          fallback={
            <CatalogView
              products={products}
              facets={facets}
              className="mt-8 md:mt-10"
            />
          }
        >
          <CatalogViewFromUrl
            products={products}
            facets={facets}
            className="mt-8 md:mt-10"
          />
        </Suspense>
      )}
    </section>
  );
}
