import { Fragment } from "react";
import { foldText, tokenize } from "@/utils/search";

type THighlightedTextProps = {
  text: string;
  query: string;
};

type TRange = { start: number; end: number };

/** Відрізки тексту, що збіглися з токенами запиту (перекриття злиті в один). */
function matchRanges(text: string, query: string): TRange[] {
  const folded = foldText(text);
  // Згортка мала б зберігати довжину; якщо ні (екзотичні символи) — не ризикуємо.
  if (folded.length !== text.length) return [];

  const ranges: TRange[] = [];
  for (const token of tokenize(query)) {
    let from = folded.indexOf(token);
    while (from !== -1) {
      ranges.push({ start: from, end: from + token.length });
      from = folded.indexOf(token, from + token.length);
    }
  }

  ranges.sort((a, b) => a.start - b.start);
  return ranges.reduce<TRange[]>((merged, range) => {
    const last = merged.at(-1);
    if (last && range.start <= last.end) {
      last.end = Math.max(last.end, range.end);
      return merged;
    }
    return [...merged, { ...range }];
  }, []);
}

/**
 * Текст із підсвіченими збігами запиту. `<mark>` семантично правильний, але
 * стандартний жовтий фон вибивається з палітри — лишаємо тільки насичений колір.
 */
export function HighlightedText({ text, query }: THighlightedTextProps) {
  const ranges = matchRanges(text, query);
  if (ranges.length === 0) return text;

  // Кожен збіг несе «хвіст» звичайного тексту перед собою — від кінця попереднього.
  const parts = ranges.map((range, position) => ({
    // start унікальний у межах тексту — стабільний ключ без прив'язки до позиції в масиві.
    key: range.start,
    before: text.slice(position === 0 ? 0 : ranges[position - 1].end, range.start),
    match: text.slice(range.start, range.end),
  }));

  return (
    <>
      {parts.map((part) => (
        <Fragment key={part.key}>
          {part.before}
          <mark className="bg-transparent font-medium text-heading">
            {part.match}
          </mark>
        </Fragment>
      ))}
      {text.slice(ranges[ranges.length - 1].end)}
    </>
  );
}
