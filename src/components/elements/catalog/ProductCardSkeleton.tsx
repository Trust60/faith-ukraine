import { cn } from "@/utils/cn";

type TProductCardSkeletonProps = {
  className?: string;
};

/**
 * Скелетон картки товару — та сама геометрія, що й ProductCard (aspect-[3/4] + рядок
 * назви), щоб не було зсуву макета (CLS). Пульсація лише через opacity (animate-pulse),
 * вимикається за prefers-reduced-motion.
 */
export function ProductCardSkeleton({ className }: TProductCardSkeletonProps) {
  return (
    <div className={cn("flex flex-col", className)} aria-hidden="true">
      <div className="mb-4 aspect-[3/4] w-full animate-pulse bg-muted motion-reduce:animate-none" />
      <div className="mx-auto mt-1 h-4 w-2/3 animate-pulse rounded bg-muted motion-reduce:animate-none md:h-5" />
    </div>
  );
}
