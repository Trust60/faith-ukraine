import Link from "next/link";
import { Heart } from "lucide-react";
import { OUTLINE_BUTTON_CLASS } from "@/ui/OutlineButton";
import { cn } from "@/utils/cn";

type TWishlistEmptyProps = {
  className?: string;
};

/** Порожній список бажань: пояснюємо, звідки беруться товари, і ведемо в каталог. */
export function WishlistEmpty({ className }: TWishlistEmptyProps) {
  return (
    <div className={cn("py-10 text-center md:py-16", className)}>
      <Heart
        className="mx-auto size-12 text-brand-light"
        strokeWidth={1}
        aria-hidden
      />
      <p className="mt-6 text-nav">Список бажань порожній.</p>
      <p className="mt-2 text-sm text-nav md:text-base">
        Додавайте товари кнопкою «Додати в бажане» на сторінці товару.
      </p>
      <Link href="/catalog" className={cn(OUTLINE_BUTTON_CLASS, "mt-8")}>
        Перейти до каталогу
      </Link>
    </div>
  );
}
