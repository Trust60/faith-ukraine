import { RichText } from "@payloadcms/richtext-lexical/react";
import { SectionHeading } from "@/ui/SectionHeading";
import { cn } from "@/utils/cn";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import type { TRichTextValue } from "@/utils/rich-text";

// Типографіка richText-контенту: Lora + відступи/маркери через descendant-варіанти,
// бо розмітку генерують конвертери Payload і класи на самі теги не повісити.
const RICH_TEXT_CLASS =
  "mt-6 font-serif leading-relaxed text-ink text-justify [&_p]:mt-4 [&_p:first-child]:mt-0 [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:mt-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:mt-1.5 [&_strong]:font-bold [&_a]:underline [&_a]:underline-offset-4 [&_h3]:mt-8 [&_h3]:font-display [&_h3]:text-xl [&_h3]:uppercase [&_h3]:text-heading";

type TProductRichTextSectionProps = {
  title: string;
  data: NonNullable<TRichTextValue>;
  className?: string;
};

/** Секція сторінки товару з richText-контентом Payload («Опис», «Спосіб застосування»). */
export function ProductRichTextSection({
  title,
  data,
  className,
}: TProductRichTextSectionProps) {
  return (
    <section className={cn("animate-reveal motion-reduce:animate-none", className)}>
      <SectionHeading as="h2">{title}</SectionHeading>
      {/* Згенерований Payload-тип richText структурно сумісний із SerializedEditorState. */}
      <RichText
        data={data as unknown as SerializedEditorState}
        className={RICH_TEXT_CLASS}
      />
    </section>
  );
}
