import { cn } from "@/utils/cn";
import { Skeleton } from "@/ui/Skeleton";

// Ширини рядків дод. інформації — щоб скелет не виглядав «штампованим».
const INFO_ROW_WIDTHS = ["w-32", "w-40", "w-48", "w-36", "w-44"];

/** Скелет сторінки товару — повторює геометрію реальної розкладки (без CLS). */
export function ProductPageSkeleton() {
  return (
    <div className="mx-auto max-w-[1200px] px-4 py-10 md:px-8 md:py-14">
      {/* «← До каталогу» */}
      <Skeleton className="h-5 w-28" />

      <div className="mt-6 lg:grid lg:grid-cols-2 lg:gap-14">
        {/* Фото */}
        <Skeleton className="aspect-[3/4] w-full" />

        {/* Права колонка */}
        <div className="mt-8 flex flex-col gap-6 lg:mt-0">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-10 w-3/4" />
          </div>
          <div className="flex flex-col gap-2">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-2/3" />
          </div>
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-8 w-28" />
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-8 w-32" />
          </div>
          <div className="flex flex-col gap-2">
            {INFO_ROW_WIDTHS.map((width) => (
              <Skeleton key={width} className={cn("h-5", width)} />
            ))}
          </div>
          <Skeleton className="h-11 w-64" />
        </div>
      </div>
    </div>
  );
}
