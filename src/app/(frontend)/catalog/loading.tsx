import { Skeleton } from "@/ui/Skeleton";
import { ProductGridSkeleton } from "@/components/elements/catalog/ProductGridSkeleton";

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

      <div className="mt-8 md:mt-10">
        <div className="flex items-center justify-between gap-4">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-11 w-44" />
        </div>

        <div className="mt-6 flex items-start gap-8 lg:gap-10">
          <div className="hidden w-64 shrink-0 space-y-4 lg:block" aria-hidden>
            {Array.from({ length: 5 }, (_, index) => (
              <Skeleton key={index} className="h-8 w-full" />
            ))}
          </div>
          <ProductGridSkeleton className="min-w-0 flex-1" />
        </div>
      </div>

      <span className="sr-only" role="status" aria-live="polite">
        Завантаження каталогу…
      </span>
    </section>
  );
}
