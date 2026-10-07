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
        className="absolute inset-x-0 bottom-0 top-28 bg-muted transition-colors group-hover:bg-line md:inset-y-2 md:left-20"
      />

      {/* Розміри — як на WP: фото 192px, опис 16/20px, щільні відступи. */}
      <div className="relative flex flex-col items-center md:flex-row md:items-center md:gap-6">
        <Image
          src={line.image.src}
          alt={line.image.alt}
          width={465}
          height={462}
          sizes="192px"
          className="h-auto w-48 shrink-0"
        />
        <div className="px-5 pb-6 md:px-0 md:py-5 md:pr-6">
          <h3 className="font-serif text-lg font-bold uppercase tracking-[0.02em] text-heading md:text-xl">
            {line.title}
          </h3>
          <p className="mt-2 font-serif text-base leading-5 text-ink hyphens-auto text-justify">
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
