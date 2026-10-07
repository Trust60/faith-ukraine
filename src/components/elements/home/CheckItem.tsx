import { CheckIcon } from "@/ui/CheckIcon";
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

/**
 * Пункт списку з галочкою. Спільний для секцій «Інновації» та «Абсолютна безпека».
 * Розміри й кольори — як на WP: звичайний текст 20/27px без розрядки; uppercase-пункти
 * «Інновацій» — 18/27px з розрядкою 1px (капітель без неї злипається).
 */
export function CheckItem({ item, uppercase }: TCheckItemProps) {
  return (
    <li className="flex items-center gap-4 md:gap-5">
      <CheckIcon className="size-6 shrink-0 text-black md:size-7" />
      <div>
        {item.title && (
          <p className="font-serif text-lg font-semibold leading-[1.35] text-ink md:text-xl">
            {item.title}
          </p>
        )}
        <p
          className={cn(
            "font-serif text-base leading-[1.35] text-ink md:text-xl",
            uppercase &&
              "uppercase leading-normal tracking-[1px] text-heading md:text-lg",
          )}
        >
          {item.text}
        </p>
      </div>
    </li>
  );
}
