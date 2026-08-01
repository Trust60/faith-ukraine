import Link from "next/link";
import { Skeleton } from "@/ui/Skeleton";
import { termHref } from "@/utils/search-terms";
import type { TSearchTerm } from "@/utils/search-terms";

const NOTE_CLASS = "px-5 py-10 text-center text-sm text-nav md:text-base";
const SKELETON_ROWS = [0, 1, 2, 3];

/** Індекс ще їде — показуємо каркас рядків замість порожнечі. */
export function SearchLoading() {
  return (
    <div className="px-4 py-3 md:px-5">
      {SKELETON_ROWS.map((row) => (
        <div key={row} className="flex items-center gap-3 py-2.5">
          <Skeleton className="size-14 shrink-0" />
          <div className="min-w-0 flex-1">
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="mt-2 h-3 w-1/3" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function SearchError() {
  return (
    <p className={NOTE_CLASS}>
      Не вдалося завантажити пошук. Перевірте зʼєднання та спробуйте ще раз.
    </p>
  );
}

type TSearchNoResultsProps = { query: string };

export function SearchNoResults({ query }: TSearchNoResultsProps) {
  return (
    <div className={NOTE_CLASS}>
      <p>
        За запитом «{query}» нічого не знайдено.
      </p>
      <Link
        href="/catalog"
        className="mt-3 inline-block text-ink-soft underline underline-offset-4 transition-colors hover:text-heading focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
      >
        Переглянути весь каталог
      </Link>
    </div>
  );
}

type TSearchLinesProps = {
  lines: TSearchTerm[];
  onSelect: () => void;
};

/**
 * Стартовий екран порожнього запиту: лінійки як швидкі переходи в каталог.
 * Це звичайні посилання (Tab), а не пункти listbox — стрілки вмикаються, лише
 * коли є що ранжувати.
 */
export function SearchLines({ lines, onSelect }: TSearchLinesProps) {
  if (lines.length === 0) return null;

  return (
    <div className="px-4 py-4 md:px-5">
      <p className="text-xs uppercase tracking-[0.08em] text-nav">Лінійки</p>
      <ul className="mt-3 flex flex-wrap gap-2">
        {lines.map((line) => (
          <li key={line.slug}>
            <Link
              href={termHref(line)}
              onClick={onSelect}
              className="inline-flex min-h-11 items-center border border-line px-3 text-sm text-ink-soft transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
              {line.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
