import { cn } from "@/utils/cn";

type TConcernChipProps = { name: string };

function ConcernChip({ name }: TConcernChipProps) {
  return (
    <li className="border border-line bg-muted px-3 py-1 font-serif text-sm text-ink-soft">
      {name}
    </li>
  );
}

type TProductConcernChipsProps = {
  concerns: { name: string; slug: string }[];
  className?: string;
};

/** Теги «Призначення» товару. Поки некликабельні лейбли (диплінк у каталог — пізніше). */
export function ProductConcernChips({ concerns, className }: TProductConcernChipsProps) {
  if (concerns.length === 0) return null;

  return (
    <ul aria-label="Призначення" className={cn("flex flex-wrap gap-2", className)}>
      {concerns.map((concern) => (
        <ConcernChip key={concern.slug} name={concern.name} />
      ))}
    </ul>
  );
}
