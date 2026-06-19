"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/utils/cn";
import type { TCatalogProduct } from "@/data/catalog";

type TProductCardProps = {
  product: TCatalogProduct;
  priority?: boolean;
  className?: string;
};

/**
 * Картка товару каталогу: фото + назва. Чисто по макету — без ціни та кнопки «в кошик»
 * (на сайті немає оплати/покупки). Поки фото вантажиться — сіре тло (bg-muted), картинка
 * плавно проявляється (fade-in по opacity). priority — для карток першого екрана (LCP):
 * вони пріоритетні й показуються одразу, без fade.
 */
export function ProductCard({
  product,
  priority = false,
  className,
}: TProductCardProps) {
  const { image, title } = product;
  const imageRef = useRef<HTMLImageElement>(null);
  const [isLoaded, setIsLoaded] = useState(priority);

  // Кешоване фото може бути готове ще до підписки на onLoad — перевіряємо complete.
  useEffect(() => {
    if (imageRef.current?.complete) setIsLoaded(true);
  }, []);

  return (
    <article className={cn("flex flex-col text-center", className)}>
      <div className="relative mb-4 aspect-[3/4] w-full overflow-hidden bg-muted">
        <Image
          ref={imageRef}
          src={image.url}
          alt={image.alt}
          width={image.width}
          height={image.height}
          sizes="(min-width: 1024px) 25vw, 50vw"
          priority={priority}
          onLoad={() => setIsLoaded(true)}
          className={cn(
            "h-full w-full object-contain transition-opacity duration-500 motion-reduce:transition-none",
            isLoaded ? "opacity-100" : "opacity-0",
          )}
        />
      </div>
      <h2 className="mt-1 text-sm text-ink-soft md:text-base">{title}</h2>
    </article>
  );
}
