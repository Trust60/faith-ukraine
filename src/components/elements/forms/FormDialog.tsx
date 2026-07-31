"use client";

import { useState, type ReactNode } from "react";
import { Dialog } from "radix-ui";
import { X } from "lucide-react";
import { OUTLINE_BUTTON_CLASS } from "@/ui/OutlineButton";
import { SECTION_HEADING_CLASS } from "@/ui/SectionHeading";
import { cn } from "@/utils/cn";

type TFormDialogProps = {
  triggerLabel: string;
  title: string;
  intro: string;
  /** Форма отримує onDone, щоб закрити діалог після успішної відправки. */
  children: (onDone: () => void) => ReactNode;
};

/**
 * Модальне вікно з формою — як поповери на WP. Radix Dialog дає фокус-трап, Escape,
 * блокування скролу сторінки й коректні aria-звʼязки, тож руками це не повторюємо.
 * Довга анкета скролиться всередині вікна, а не розтягує сторінку.
 */
export function FormDialog({
  triggerLabel,
  title,
  intro,
  children,
}: TFormDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger className={OUTLINE_BUTTON_CLASS}>
        {triggerLabel}
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-ink/50 data-[state=open]:animate-in data-[state=open]:fade-in motion-reduce:animate-none" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 flex max-h-[90dvh] w-[calc(100vw-2rem)] max-w-[42rem] -translate-x-1/2 -translate-y-1/2 flex-col bg-background shadow-card focus:outline-none">
          <div className="flex items-start justify-between gap-4 border-b border-line px-5 py-5 md:px-8">
            <div>
              {/* Стилі заголовка накладаємо на сам Dialog.Title: через asChild Radix не
                  зміг би прокинути свій id у SectionHeading (той не форвардить пропси),
                  і aria-labelledby вікна вказував би в нікуди. */}
              <Dialog.Title
                className={cn(
                  SECTION_HEADING_CLASS,
                  "text-[22px]/[26px] text-heading md:text-[28px]",
                )}
              >
                {title}
              </Dialog.Title>
              <Dialog.Description className="mt-3 font-serif text-base leading-relaxed text-ink">
                {intro}
              </Dialog.Description>
            </div>
            <Dialog.Close
              aria-label="Закрити"
              className="grid size-11 shrink-0 cursor-pointer place-items-center rounded-full text-nav transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
              <X className="size-5" strokeWidth={1.5} aria-hidden="true" />
            </Dialog.Close>
          </div>

          <div className="overflow-y-auto px-5 py-6 md:px-8">
            {children(() => setIsOpen(false))}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
