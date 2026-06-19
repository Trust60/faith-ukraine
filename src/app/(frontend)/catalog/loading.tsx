import { ProductGridSkeleton } from "@/components/elements/catalog/ProductGridSkeleton";

/** Стан завантаження каталогу: скелетон-сітка з тією ж геометрією, що й каталог (без CLS). */
export default function CatalogLoading() {
  return (
    <section className="mx-auto max-w-[1600px] px-4 py-10 md:px-8 md:py-14">
      <h1 className="text-center font-display text-3xl uppercase tracking-[0.02em] text-heading md:text-4xl">
        Каталог
      </h1>
      <ProductGridSkeleton className="mt-12 md:mt-16" />
      <span className="sr-only" role="status" aria-live="polite">
        Завантаження каталогу…
      </span>
    </section>
  );
}
