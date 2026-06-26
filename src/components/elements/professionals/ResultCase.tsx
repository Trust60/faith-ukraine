import Image from "next/image";
import type { TResultCase } from "./content/care-content";

/** Один кейс «до/після»: підпис зверху + фото-пара (зображення вже містить обидва кадри). */
export function ResultCase({ src, alt, caption }: TResultCase) {
  return (
    <figure>
      <figcaption className="mb-3 text-center font-serif text-sm leading-snug text-ink">
        {caption}
      </figcaption>
      <Image
        src={src}
        alt={alt}
        width={363}
        height={188}
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        className="h-auto w-full rounded-[8px] border border-line"
      />
    </figure>
  );
}
