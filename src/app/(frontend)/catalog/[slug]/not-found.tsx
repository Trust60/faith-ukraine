import Link from "next/link";
import { OUTLINE_BUTTON_CLASS } from "@/ui/OutlineButton";
import { cn } from "@/utils/cn";

/** 404 сторінки товару: невідомий слаг або чернетка. */
export default function ProductNotFound() {
  return (
    <section className="mx-auto flex max-w-[1200px] flex-col items-center px-4 py-16 text-center md:px-8 md:py-24">
      <h1 className="font-display text-3xl uppercase tracking-[0.02em] text-heading md:text-4xl">
        Товар не знайдено
      </h1>
      <p className="mt-6 text-nav">
        Можливо, посилання застаріло або товар більше недоступний.
      </p>
      <Link href="/catalog" className={cn(OUTLINE_BUTTON_CLASS, "mt-10")}>
        До каталогу
      </Link>
    </section>
  );
}
