import Image from "next/image";
import { cn } from "@/utils/cn";
import type { TCatalogProduct } from "@/data/catalog";

type TProductCardProps = {
  product: TCatalogProduct;
  className?: string;
};

/**
 * Картка товару каталогу: фото + назва лінійки + назва товара. Чисто по макету —
 * без ціни та кнопки «в кошик» (на сайті немає оплати/покупки).
 */
export function ProductCard({ product, className }: TProductCardProps) {
  const { image, lineName, title } = product;

  return (
    <article className={cn("flex flex-col text-center", className)}>
      <div className="relative mb-4 aspect-[3/4] w-full overflow-hidden">
        <Image
          src={image.url}
          alt={image.alt}
          width={image.width}
          height={image.height}
          sizes="(min-width: 1024px) 25vw, 50vw"
          className="h-full w-full object-contain"
        />
      </div>
      <h2 className="mt-1 text-sm text-ink-soft md:text-base">{title}</h2>
    </article>
  );
}
