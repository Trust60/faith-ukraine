"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/utils/cn";

type TLazyVideoEmbedProps = {
  /** Готовий src YouTube-плеєра (усі параметри — у контенті секції). */
  src: string;
  title: string;
  /** Класи обгортки: пропорції або фіксована висота смуги. */
  className?: string;
  /** Масштаб кадру, що приховує чорні смуги й брендинг плеєра. */
  scaleClassName?: string;
};

/**
 * Декоративне YouTube-відео, яке вантажиться лише коли смуга наближається до вʼюпорта.
 * Без цього плеєр тягнув би ~0.5 МБ скриптів ще до першого скролу.
 * Відео фонове: без звуку, без контролів і без взаємодії (pointer-events-none), тому
 * фасад із кнопкою «play» тут не потрібен — iframe просто підмонтовується сам.
 */
export function LazyVideoEmbed({
  src,
  title,
  className,
  scaleClassName = "scale-[1.35]",
}: TLazyVideoEmbedProps) {
  const holderRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const holder = holderRef.current;
    if (!holder || isVisible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );

    observer.observe(holder);
    return () => observer.disconnect();
  }, [isVisible]);

  return (
    <div
      ref={holderRef}
      className={cn("relative overflow-hidden bg-muted", className)}
    >
      {isVisible && (
        <iframe
          src={src}
          title={title}
          allow="autoplay; encrypted-media"
          referrerPolicy="strict-origin-when-cross-origin"
          className={cn(
            "pointer-events-none absolute inset-0 size-full border-0",
            scaleClassName,
          )}
        />
      )}
    </div>
  );
}
