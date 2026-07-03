import type { ReactNode } from "react";
import { SectionHeading } from "@/ui/SectionHeading";
import { ProductConcernChips } from "./ProductConcernChips";
import { ProductInfoList } from "./ProductInfoList";
import { FavoriteButton } from "./FavoriteButton";
import { cn } from "@/utils/cn";
import type { TProductDetail } from "@/data/product";

// Крок каскадної появи блоків правої колонки (мс).
const STAGGER_STEP_MS = 70;

type TSummaryRevealProps = { index: number; children: ReactNode };

/** Обгортка каскадного reveal: затримка за порядковим номером блоку (fill-mode both
    тримає блок прихованим до старту своєї анімації). */
function SummaryReveal({ index, children }: TSummaryRevealProps) {
  return (
    <div
      className="animate-reveal motion-reduce:animate-none"
      style={{ animationDelay: `${index * STAGGER_STEP_MS}ms` }}
    >
      {children}
    </div>
  );
}

type TProductSummaryProps = {
  product: TProductDetail;
  className?: string;
};

/** Права колонка сторінки товару: назва, короткий опис, «Призначення», дод. інформація, кнопка. */
export function ProductSummary({ product, className }: TProductSummaryProps) {
  return (
    <div className={cn("flex flex-col items-start gap-6", className)}>
      <SummaryReveal index={0}>
        {/* Один h1 (повна назва для скрінрідера), візуально два рядки — як на картці каталогу. */}
        <SectionHeading as="h1">
          <span className="block text-[0.55em] leading-tight tracking-[0.08em] text-ink">
            {product.lineName}
          </span>
          <span className="block">{product.title}</span>
        </SectionHeading>
      </SummaryReveal>

      {product.shortDescription && (
        <SummaryReveal index={1}>
          <p className="font-serif text-lg leading-relaxed text-ink">
            {product.shortDescription}
          </p>
        </SummaryReveal>
      )}

      {product.concerns.length > 0 && (
        <SummaryReveal index={2}>
          <ProductConcernChips concerns={product.concerns} />
        </SummaryReveal>
      )}

      <SummaryReveal index={3}>
        <ProductInfoList product={product} />
      </SummaryReveal>

      <SummaryReveal index={4}>
        <FavoriteButton productId={product.id} />
      </SummaryReveal>
    </div>
  );
}
