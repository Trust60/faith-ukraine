import Link from "next/link";
import { FramedImage } from "@/ui/FramedImage";
import { OUTLINE_BUTTON_CLASS } from "@/ui/OutlineButton";

type TPillarImage = { src: string; alt: string };
type TPillarButton = { label: string; href: string };

type TPillarCardProps = {
  image: TPillarImage;
  text: string;
  button: TPillarButton;
};

/** Картка напряму бренду: фото, опис і лінк на підсторінку. */
export function PillarCard({ image, text, button }: TPillarCardProps) {
  return (
    <article className="flex h-full flex-col">
      <FramedImage
        src={image.src}
        alt={image.alt}
        sizes="(min-width: 768px) 33vw, 100vw"
        className="aspect-[8/7] w-full rounded-[16px]"
      />
      <p className="mt-6 font-serif text-lg leading-relaxed text-ink">{text}</p>
      <div className="mt-auto flex justify-center pt-8">
        <Link href={button.href} className={OUTLINE_BUTTON_CLASS}>
          {button.label}
        </Link>
      </div>
    </article>
  );
}
