import { cn } from "@/utils/cn";
import { ProductCard } from "./ProductCard";
import type { TCatalogProduct } from "@/data/catalog";

type TCatalogItemProps = {
  product: TCatalogProduct;
  /** Товар першого екрана (рекомендований порядок): фото — priority (LCP), без reveal-анімації. */
  eager: boolean;
  /** Не проходить фільтр або поза поточною пачкою — прихований через CSS (лишається в HTML для SEO). */
  collapsed: boolean;
};

/**
 * Елемент сітки каталогу. Прихована картка — display:none (не займає клітинку сітки →
 * жодних пропусків при будь-яких фільтрах/сортуванні). Видима картка плавно проявляється
 * CSS-анімацією `reveal`, що запускається щоразу, коли картка відображається (поява після
 * фільтра / «Показати ще» / зміна сортування). Картки першого екрана (eager) показуються
 * миттєво, без анімації — щоб не гальмувати LCP.
 */
export function CatalogItem({ product, eager, collapsed }: TCatalogItemProps) {
  return (
    <li
      className={cn(
        !eager && "animate-reveal motion-reduce:animate-none",
        collapsed && "catalog-collapsed hidden",
      )}
    >
      <ProductCard product={product} priority={eager} />
    </li>
  );
}
