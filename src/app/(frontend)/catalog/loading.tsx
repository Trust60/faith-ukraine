import { CatalogViewSkeleton } from "@/components/elements/catalog/CatalogViewSkeleton";

/**
 * Стан завантаження каталогу: та сама геометрія, що й сторінка з фільтрами (тулбар +
 * сайдбар на lg + сітка), щоб не було стрибка лейауту (CLS) при появі даних.
 */
export default function CatalogLoading() {
  return (
    <section className="mx-auto max-w-[1200px] px-4 py-10 md:px-8 md:py-14">
      <h1 className="text-center font-display text-3xl uppercase tracking-[0.02em] text-heading md:text-4xl">
        Каталог
      </h1>

      <CatalogViewSkeleton className="mt-8 md:mt-10" />

      <span className="sr-only" role="status" aria-live="polite">
        Завантаження каталогу…
      </span>
    </section>
  );
}
