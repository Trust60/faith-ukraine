import type { ReactNode } from "react";
import { OutlineButton } from "@/ui/OutlineButton";

type TCtaButtonProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Кнопка заклику до співпраці. Поки візуальний плейсхолдер: форму заявки власник опише
 * окремо — тоді під'єднаємо обробник/перехід. Стиль — спільний OutlineButton.
 */
export function CtaButton({ children, className }: TCtaButtonProps) {
  return <OutlineButton className={className}>{children}</OutlineButton>;
}
