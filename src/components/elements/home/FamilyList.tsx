import type { TFamilyListContent } from "./content/family-content";

type TFamilyListProps = { list: TFamilyListContent };

/** Список переваг: підзаголовок Lora bold 22px + пункти з маркерами. */
export function FamilyList({ list }: TFamilyListProps) {
  return (
    <div>
      <h3 className="text-center font-serif text-xl font-bold text-heading md:text-[1.375rem]">
        {list.title}
      </h3>
      <ul className="mt-4 list-disc space-y-2 pl-6 font-serif text-base leading-[1.35] text-ink marker:text-heading md:text-xl">
        {list.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
