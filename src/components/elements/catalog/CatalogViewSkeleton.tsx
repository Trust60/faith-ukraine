import { Skeleton } from "@/ui/Skeleton";
import { ProductGridSkeleton } from "./ProductGridSkeleton";

/**
 * Скелетон каталогу з фільтрами — та сама геометрія, що й CatalogView (тулбар,
 * сайдбар на lg, сітка), щоб не було стрибка лейауту. Використовується і як
 * loading.tsx маршруту, і як Suspense-фолбек навколо клієнтського CatalogView.
 */
export function CatalogViewSkeleton({ className }: { className?: string }) {
  return (
    <div className={className}>
      <div className="flex items-center justify-between gap-4">
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-11 w-44" />
      </div>

      <div className="mt-6 flex items-start gap-8 lg:gap-10">
        <div className="hidden w-64 shrink-0 space-y-4 lg:block" aria-hidden="true">
          {Array.from({ length: 5 }, (_, index) => (
            <Skeleton key={index} className="h-8 w-full" />
          ))}
        </div>
        <ProductGridSkeleton className="min-w-0 flex-1" />
      </div>
    </div>
  );
}
