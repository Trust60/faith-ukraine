export type TTextSegment = { text: string; bold?: boolean };

/** Абзац тексту: суцільний рядок або сегменти, частина яких виділена жирним. */
export type TStoryParagraphContent = string | readonly TTextSegment[];

type TStoryParagraphProps = { paragraph: TStoryParagraphContent };

type TTextSegmentProps = { segment: TTextSegment };

const PARAGRAPH_CLASS = "font-serif text-lg leading-relaxed text-ink md:text-xl";

/** Стабільний React-ключ для абзацу: перші символи тексту (рядка або першого сегмента). */
export function getParagraphKey(paragraph: TStoryParagraphContent): string {
  const text = typeof paragraph === "string" ? paragraph : paragraph[0].text;
  return text.slice(0, 32);
}

function TextSegment({ segment }: TTextSegmentProps) {
  if (!segment.bold) {
    return segment.text;
  }
  return <strong className="font-semibold text-ink-soft">{segment.text}</strong>;
}

export function StoryParagraph({ paragraph }: TStoryParagraphProps) {
  if (typeof paragraph === "string") {
    return <p className={PARAGRAPH_CLASS}>{paragraph}</p>;
  }
  return (
    <p className={PARAGRAPH_CLASS}>
      {paragraph.map((segment) => (
        <TextSegment key={segment.text} segment={segment} />
      ))}
    </p>
  );
}
