import { SectionHeading } from "@/ui/SectionHeading";
import type { TFamilyListContent } from "./content/family-content";

type TFamilyListProps = { list: TFamilyListContent };

/** Список переваг: дисплейний підзаголовок + пункти з маркерами. */
export function FamilyList({ list }: TFamilyListProps) {
  return (
    <div>
      <SectionHeading
        as="h3"
        align="center"
        className="text-[24px]/[26px] md:text-[28px]"
      >
        {list.title}
      </SectionHeading>
      <ul className="mt-4 list-disc space-y-2 pl-6 font-serif text-base leading-relaxed text-ink marker:text-ink md:text-lg">
        {list.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
