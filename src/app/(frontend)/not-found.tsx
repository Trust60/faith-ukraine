import type { Metadata } from "next";
import Link from "next/link";
import { OUTLINE_BUTTON_CLASS } from "@/ui/OutlineButton";
import { SECTION_HEADING_CLASS } from "@/ui/SectionHeading";
import { cn } from "@/utils/cn";

export const metadata: Metadata = {
  title: "Сторінку не знайдено — FAITH",
};

/**
 * 404 сайту: невідома адреса (див. [...notFound]/page.tsx) або notFound() у будь-якому
 * розділі без власного not-found. Рендериться всередині лейаута — з хедером і футером.
 */
export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-[1200px] flex-col items-center px-4 py-16 text-center md:px-8 md:py-24">
      <p
        aria-hidden="true"
        className="font-display text-[7rem] leading-none text-line md:text-[10rem]"
      >
        404
      </p>
      <h1 className={cn(SECTION_HEADING_CLASS, "mt-4 text-heading")}>
        Сторінку не знайдено
      </h1>
      <p className="mt-6 max-w-xl font-serif text-base leading-[1.35] text-ink md:text-xl">
        Можливо, посилання застаріло або сторінку перенесли. Почніть з головної
        або перегляньте каталог засобів FAITH.
      </p>
      <div className="mt-10 flex flex-col gap-4 sm:flex-row">
        <Link href="/" className={OUTLINE_BUTTON_CLASS}>
          На головну
        </Link>
        <Link href="/catalog" className={OUTLINE_BUTTON_CLASS}>
          До каталогу
        </Link>
      </div>
    </section>
  );
}
