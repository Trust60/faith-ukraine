import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

type TContainerProps = {
  children: ReactNode;
  className?: string;
};

/** Центрований контейнер сторінки: стандартні max-width (1600px) і адаптивні відступи. */
export function Container({ children, className }: TContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[1600px] px-4 md:px-8 lg:px-12",
        className,
      )}
    >
      {children}
    </div>
  );
}
