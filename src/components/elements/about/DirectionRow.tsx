import { FramedImage } from "@/ui/FramedImage";

type TDirectionImage = { src: string; alt: string };

type TDirectionRowProps = {
  image: TDirectionImage;
  label: string;
  text: string;
};

/**
 * Рядок напряму дії FAITH: кругле фото, плашка-назва та опис.
 * Grid-areas: на мобільному плашка стоїть під фото, на md+ — над текстом.
 */
export function DirectionRow({ image, label, text }: TDirectionRowProps) {
  return (
    <div className="grid grid-cols-[7rem_1fr] items-start gap-x-4 gap-y-3 [grid-template-areas:'image_text'_'label_text'] md:grid-cols-[11rem_1fr] md:gap-x-10 md:gap-y-4 md:[grid-template-areas:'image_label'_'image_text']">
      <FramedImage
        src={image.src}
        alt={image.alt}
        sizes="(min-width: 768px) 176px, 112px"
        className="aspect-square w-full rounded-full [grid-area:image]"
      />
      <h3 className="self-start bg-muted px-2 py-2 text-center font-display text-base/tight uppercase tracking-[0.02em] text-heading [grid-area:label] md:px-4 md:py-2.5 md:text-xl">
        {label}
      </h3>
      <p className="font-serif text-lg leading-relaxed text-ink [grid-area:text] md:text-xl">
        {text}
      </p>
    </div>
  );
}
