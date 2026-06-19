import type { Metadata } from "next";
import { getCatalogProducts } from "@/data/catalog";
import { ProductGrid } from "@/components/elements/catalog/ProductGrid";

export const metadata: Metadata = {
  title: "Каталог — FAITH",
  description: "Каталог професійної японської косметики FAITH.",
};

// Каталог віддзеркалює живі дані з адмінки → рендеримо на сервері на кожен запит
// (без prerender під час build). Кешування/ISR можна додати пізніше з ревалідацією.
export const dynamic = "force-dynamic";

export default async function CatalogPage() {
  const products = await getCatalogProducts();

  return (
    <section className="mx-auto max-w-[1600px] px-4 py-16 md:px-8 md:py-24">
      <h1 className="text-center font-display text-3xl uppercase tracking-[0.02em] text-heading md:text-4xl">
        Каталог
      </h1>

      {products.length === 0 ? (
        <p className="mt-10 text-center text-nav">Товари скоро з’являться.</p>
      ) : (
        <ProductGrid products={products} className="mt-12 md:mt-16" />
      )}
    </section>
  );
}
