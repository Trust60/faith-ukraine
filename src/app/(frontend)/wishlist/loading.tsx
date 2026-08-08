import { ProductGridSkeleton } from "@/components/elements/catalog/ProductGridSkeleton";

/**
 * Стан завантаження списку бажань: та сама геометрія, що й на сторінці (заголовок +
 * сітка карток), щоб не було стрибка лейауту (CLS) при появі даних.
 */
export default function WishlistLoading() {
  return (
    <section className="mx-auto max-w-[1200px] px-4 py-10 md:px-8 md:py-14">
      <h1 className="text-center font-display text-3xl uppercase tracking-[0.02em] text-heading md:text-4xl">
        Список бажань
      </h1>

      <ProductGridSkeleton count={4} className="mt-8 md:mt-10" />

      <span className="sr-only" role="status" aria-live="polite">
        Завантаження списку бажань…
      </span>
    </section>
  );
}
