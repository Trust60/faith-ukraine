import { Check } from "lucide-react";
import { cn } from "@/utils/cn";

export type TCheckItemContent = {
  /** Жирний підзаголовок пункту (є лише в секції «Абсолютна безпека»). */
  title?: string;
  text: string;
};

type TCheckItemProps = {
  item: TCheckItemContent;
  /** uppercase-варіант — для секції «Інновації FAITH». */
  uppercase?: boolean;
};

/** Пункт списку з галочкою. Спільний для секцій «Інновації» та «Абсолютна безпека». */
export function CheckItem({ item, uppercase }: TCheckItemProps) {
  return (
    <li className="flex items-center gap-4 md:gap-5">
      <Check
        className="size-6 shrink-0 text-ink-soft md:size-7"
        strokeWidth={1.5}
        aria-hidden="true"
      />
      <div>
        {item.title && (
          <p className="font-serif text-lg font-semibold text-ink-soft md:text-xl">
            {item.title}
          </p>
        )}
        <p
          className={cn(
            "font-serif text-base leading-relaxed tracking-[0.0625em] text-ink md:text-lg",
            uppercase && "uppercase",
          )}
        >
          {item.text}
        </p>
      </div>
    </li>
  );
}
