import { FramedImage } from "@/ui/FramedImage";
import type { TConceptCardContent } from "./content/concept-content";

type TConceptCardProps = { card: TConceptCardContent };

/** Картка напряму бренду: фото зі скругленням + назва напряму та коротке пояснення. */
export function ConceptCard({ card }: TConceptCardProps) {
  return (
    <li className="flex flex-col">
      <FramedImage
        src={card.image.src}
        alt={card.image.alt}
        sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
        className="aspect-square w-full rounded-[16px]"
      />
      <h3 className="mt-6 text-center font-serif text-lg font-bold uppercase leading-tight tracking-[0.02em] text-ink md:text-[1.375rem]">
        {card.title}
      </h3>
      <p className="mt-3 text-center font-serif text-base leading-tight text-ink md:text-xl">
        {card.text}
      </p>
    </li>
  );
}
