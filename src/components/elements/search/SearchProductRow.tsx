"use client";

import Image from "next/image";
import { HighlightedText } from "@/ui/HighlightedText";
import { SearchRow } from "./SearchRow";
import type { TSearchProduct } from "@/data/search-index";

type TSearchProductRowProps = {
  product: TSearchProduct;
  query: string;
  index: number;
  active: boolean;
  optionId: (index: number) => string;
  onActivate: (index: number) => void;
  onSelect: () => void;
};

/**
 * Рядок товару: мініатюра + назва, під нею лінійка — та сама пара, що й на картці
 * каталогу. Дескриптор лишається в корпусі пошуку, але не показується: у даних він
 * зазвичай починається з повної назви товару, тож у рядку це був би дубль.
 */
export function SearchProductRow({
  product,
  query,
  ...row
}: TSearchProductRowProps) {
  return (
    <SearchRow href={`/catalog/${product.slug}`} {...row}>
      <Image
        src={product.image.url}
        alt=""
        width={product.image.width}
        height={product.image.height}
        sizes="56px"
        className="size-14 shrink-0 bg-muted object-contain"
      />
      <span className="min-w-0">
        <span className="block truncate text-sm text-ink-soft md:text-base">
          <HighlightedText text={product.title} query={query} />
        </span>
        <span className="block truncate text-xs text-nav md:text-sm">
          <HighlightedText text={product.lineName} query={query} />
        </span>
      </span>
    </SearchRow>
  );
}
