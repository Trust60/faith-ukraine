import Image from "next/image";
import { cn } from "@/utils/cn";

type TFramedImageProps = {
  src: string;
  alt: string;
  sizes?: string;
  /** Класи обгортки: задають співвідношення сторін, радіус тощо. */
  className?: string;
  priority?: boolean;
};

/** Фото у фіксованому боксі: object-cover + overflow-hidden. Пропорції задає className. */
export function FramedImage({
  src,
  alt,
  sizes = "(min-width: 1024px) 25vw, 100vw",
  className,
  priority,
}: TFramedImageProps) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
      />
    </div>
  );
}
