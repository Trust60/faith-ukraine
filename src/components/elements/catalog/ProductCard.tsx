"use client";

import Image from "next/image";
import Link from "next/link";
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
  const { image, title, lineName, slug } = product;
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
        // Ховер-панель — лише десктоп (lg+). Псевдоелемент рендеримо тільки з lg, бо його
        // від'ємний inset (-inset-5) на мобільному вилазив за правий край → горизонтальний скрол;
        // на lg+ ширші відступи сторінки цей запас поглинають.
        "lg:before:pointer-events-none lg:before:absolute lg:before:-inset-5 lg:before:-z-10 lg:before:bg-background lg:before:opacity-0 lg:before:shadow-card lg:before:transition-opacity lg:before:duration-300 lg:before:content-[''] lg:hover:before:opacity-100 lg:motion-reduce:before:transition-none",
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
          sizes="(min-width: 1280px) 300px, (min-width: 1024px) 25vw, 50vw"
          priority={priority}
          onLoad={() => setIsLoaded(true)}
          className={cn(
            "h-full w-full object-contain transition-opacity duration-500 motion-reduce:transition-none",
            isLoaded ? "opacity-100" : "opacity-0",
          )}
        />
      </div>
      {/* Один заголовок (повна назва для скрінрідера), візуально — два рядки.
          Посилання-оверлей: after:inset-0 розтягує клікабельну зону на всю картку
          (позиціюється відносно article), а для скрінрідера це просто «назва, посилання». */}
      <h2 className="mt-1 text-base leading-snug text-ink-soft md:text-lg">
        <Link
          href={`/catalog/${slug}`}
          className="after:absolute after:inset-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        >
          <span className="block">{lineName}</span>
          <span className="block">{title}</span>
        </Link>
      </h2>
    </article>
  );
}
