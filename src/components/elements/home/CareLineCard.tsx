import Image from "next/image";
import Link from "next/link";
import { cn } from "@/utils/cn";
import type { TCareLineContent } from "./content/care-lines-content";

type TCareLineCardProps = {
  line: TCareLineContent;
  /** Класи розкладки картки на десктопі (див. CARE_LINE_PLACEMENT). */
  className?: string;
};

/**
 * Картка лінії догляду: фото продуктів заходить на світлу панель з назвою й описом.
 * Панель — окремий фоновий шар, тому фото може виступати за її межі (як у макетах).
 * Уся картка клікабельна через overlay-лінк — один лінк на картку, як у ProductCard.
 */
export function CareLineCard({ line, className }: TCareLineCardProps) {
  return (
    <li className={cn("group relative", className)}>
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 top-28 bg-muted transition-colors group-hover:bg-line md:inset-y-5 md:left-24 md:top-5"
      />

      <div className="relative flex flex-col items-center md:flex-row md:items-center md:gap-6">
        <Image
          src={line.image.src}
          alt={line.image.alt}
          width={465}
          height={462}
          sizes="(min-width: 768px) 220px, 200px"
          className="h-auto w-[12.5rem] shrink-0 md:w-[13.75rem]"
        />
        <div className="px-5 pb-6 md:px-0 md:py-8 md:pr-8">
          <h3 className="font-serif text-lg font-bold uppercase tracking-[0.02em] text-ink-soft md:text-xl">
            {line.title}
          </h3>
          <p className="mt-3 font-serif text-base leading-relaxed text-ink hyphens-auto text-justify">
            {line.text}
          </p>
        </div>
      </div>

      <Link
        href={line.href}
        className="absolute inset-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
      >
        <span className="sr-only">{`Дивитися засоби лінії ${line.title}`}</span>
      </Link>
    </li>
  );
}
