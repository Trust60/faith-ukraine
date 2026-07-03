import { ProductPageSkeleton } from "@/components/elements/product/ProductPageSkeleton";

/** Стан завантаження сторінки товару: скелет тієї самої геометрії (без CLS). */
export default function ProductLoading() {
  return (
    <>
      <ProductPageSkeleton />
      <span className="sr-only" role="status" aria-live="polite">
        Завантаження товару…
      </span>
    </>
  );
}
