import { SectionHeading } from "@/ui/SectionHeading";
import { StoryParagraph, getParagraphKey } from "./StoryParagraph";
import type { TStoryParagraphContent } from "./StoryParagraph";

export type TStoryBlockContent = {
  heading: string;
  paragraphs: readonly TStoryParagraphContent[];
};

type TStoryBlockProps = TStoryBlockContent;

/** Текстовий блок сторінки «Про FAITH»: заголовок + абзаци. */
export function StoryBlock({ heading, paragraphs }: TStoryBlockProps) {
  return (
    <div>
      <SectionHeading as="h2">{heading}</SectionHeading>
      <div className="mt-5 space-y-5">
        {paragraphs.map((paragraph) => (
          <StoryParagraph key={getParagraphKey(paragraph)} paragraph={paragraph} />
        ))}
      </div>
    </div>
  );
}
