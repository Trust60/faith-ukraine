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
 * Картка товару каталогу: фото + назва у два рядки (лінійка зверху, власна назва товару
 * знизу — за макетом). Без ціни та кнопки «в кошик» (на сайті немає оплати/покупки).
 * Поки фото вантажиться — сіре тло (bg-muted), яке прибирається після завантаження;
 * картинка плавно проявляється (fade-in по opacity).
 * priority — для карток першого екрана (LCP): вони пріоритетні й показуються одразу, без fade.
 *
 * На десктопі (lg+, лише пристрої з наведенням) при ховері за карткою проявляється
 * біла «панель» з м'якою тінню — псевдоелемент ::before з від'ємним inset (даёт «повітря»
 * навколо контенту без зсуву лейауту). Анімуємо лише opacity → GPU-композит; box-shadow
 * статична (її анімація викликала б repaint).
 */
export function ProductCard({
  product,
  priority = false,
  className,
}: TProductCardProps) {
  const { image, title, lineName } = product;
  const imageRef = useRef<HTMLImageElement>(null);
  const [isLoaded, setIsLoaded] = useState(priority);

  // Кешоване фото може бути готове ще до підписки на onLoad — перевіряємо complete.
  useEffect(() => {
    if (imageRef.current?.complete) setIsLoaded(true);
  }, []);

  return (
    <article
      className={cn(
        "relative isolate flex flex-col text-center",
        "before:pointer-events-none before:absolute before:-inset-5 before:-z-10 before:bg-background before:opacity-0 before:shadow-card before:transition-opacity before:duration-300 before:content-[''] motion-reduce:before:transition-none lg:hover:before:opacity-100",
        className,
      )}
    >
      <div
        className={cn(
          "relative mb-4 aspect-[3/4] w-full overflow-hidden",
          !isLoaded && "bg-muted",
        )}
      >
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
      {/* Один заголовок (повна назва для скрінрідера), візуально — два рядки. */}
      <h2 className="mt-1 text-base leading-snug text-ink-soft md:text-lg">
        <span className="block">{lineName}</span>
        <span className="block">{title}</span>
      </h2>
    </article>
  );
}
