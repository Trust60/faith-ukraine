import { SectionHeading } from "@/ui/SectionHeading";
import { CatalogItem } from "@/components/elements/catalog/CatalogItem";
import type { TCatalogProduct } from "@/data/catalog";

type TRelatedProductsProps = {
  products: TCatalogProduct[];
  className?: string;
};

/**
 * «Товари, які вам також можуть сподобатись» — підібрані за схожістю
 * (utils/related-products). Переиспользуем картки каталогу разом з їхньою
 * reveal-анімацією (eager={false}).
 */
export function RelatedProducts({ products, className }: TRelatedProductsProps) {
  return (
    <section className={className}>
      <SectionHeading as="h2">Товари, які вам також можуть сподобатись</SectionHeading>
      <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 xl:grid-cols-4">
        {products.map((product) => (
          <CatalogItem
            key={product.id}
            product={product}
            eager={false}
            collapsed={false}
          />
        ))}
      </ul>
    </section>
  );
}
