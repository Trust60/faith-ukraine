import { cn } from "@/utils/cn";
import type { TProductDetail } from "@/data/product";

// Уся продукція FAITH — японська; окремого поля в БД немає, тому константа.
const COUNTRY_OF_ORIGIN = "Японія";

type TInfoRow = { label: string; value: string };

// Рядки як у макеті; порожні поля (об'єм, тип шкіри) просто не показуємо.
const buildRows = (product: TProductDetail): TInfoRow[] => {
  const rows: TInfoRow[] = [];
  if (product.volume) rows.push({ label: "Об'єм", value: product.volume });
  rows.push({ label: "Країна", value: COUNTRY_OF_ORIGIN });
  rows.push({ label: "Лінія", value: product.lineName });
  if (product.skinTypeNames.length > 0) {
    rows.push({ label: "Тип шкіри", value: product.skinTypeNames.join(", ") });
  }
  rows.push({ label: "Зона застосування", value: product.categoryName });
  return rows;
};

function InfoRow({ label, value }: TInfoRow) {
  return (
    <div className="flex flex-wrap gap-x-2 font-serif">
      <dt className="font-bold text-ink-soft">{label}:</dt>
      <dd className="text-ink">{value}</dd>
    </div>
  );
}

type TProductInfoListProps = {
  product: TProductDetail;
  className?: string;
};

/** Додаткова інформація про товар: об'єм, країна, лінія, тип шкіри, зона застосування. */
export function ProductInfoList({ product, className }: TProductInfoListProps) {
  return (
    <dl className={cn("flex flex-col gap-2", className)}>
      {buildRows(product).map((row) => (
        <InfoRow key={row.label} {...row} />
      ))}
    </dl>
  );
}
