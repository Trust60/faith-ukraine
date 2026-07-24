import Image from "next/image";
import type { TExclusivityDocument } from "./content/exclusivity-content";

type TExclusivityDocumentProps = TExclusivityDocument & { priority?: boolean };

/** Одна сторінка документа-підтвердження ексклюзивності: показуємо повністю, без обрізки. */
export function ExclusivityDocument({
  src,
  alt,
  width,
  height,
  priority,
}: TExclusivityDocumentProps) {
  return (
    <figure className="overflow-hidden rounded-lg border border-line bg-white shadow-card">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes="(min-width: 768px) 500px, 100vw"
        priority={priority}
        className="h-auto w-full"
      />
    </figure>
  );
}
