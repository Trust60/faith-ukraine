"use client";

import Image from "next/image";
import { useImageZoom } from "@/hooks/use-image-zoom";
import { cn } from "@/utils/cn";
import type { TProductDetail } from "@/data/product";

const ZOOM_FACTOR = 2.25;
const PANE_SIZE = 480;

type TProductImageZoomProps = {
  image: TProductDetail["image"];
  className?: string;
};

/**
 * Фото товару із зум-лінзою (Amazon-style): при наведенні квадрат лінзи підсвічує
 * ділянку, а праворуч (поверх колонки з описом) панель показує її збільшеною.
 * Прогресивне покращення лише для десктопа з мишею — без наведення лишається фото;
 * тому зум свідомо не фокусується з клавіатури (повне фото і так видно).
 * Повнорозмірний шар монтується тільки після першого наведення (не тягнемо
 * важкий оригінал даремно). Всі рухи — через transform/opacity (GPU-композит).
 */
export function ProductImageZoom({ image, className }: TProductImageZoomProps) {
  const { containerRef, isEnabled, isActive, state, handlers } = useImageZoom({
    zoom: ZOOM_FACTOR,
    paneSize: PANE_SIZE,
  });

  const showZoom = isEnabled && isActive && state !== null;

  return (
    <div className={cn("relative", className)}>
      <div
        ref={containerRef}
        {...handlers}
        className="relative aspect-[3/4] w-full overflow-hidden"
      >
        {/* LCP-зображення сторінки: preload (Next 16), без reveal-анімації. */}
        <Image
          src={image.base.url}
          alt={image.alt}
          width={image.base.width}
          height={image.base.height}
          sizes="(min-width: 1024px) 540px, 100vw"
          preload
          className="h-full w-full object-contain"
        />
        {showZoom && (
          <div
            aria-hidden
            className="pointer-events-none absolute top-0 left-0 border border-line bg-white/30"
            style={{
              width: state.lens.size,
              height: state.lens.size,
              transform: `translate3d(${state.lens.x}px, ${state.lens.y}px, 0)`,
            }}
          />
        )}
      </div>

      {/* state лишається після відходу курсора → шар монтується один раз, далі — opacity. */}
      {state !== null && (
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute top-0 left-full z-10 ml-6 hidden overflow-hidden border border-line bg-background shadow-card transition-opacity duration-200 motion-reduce:transition-none lg:block",
            showZoom ? "opacity-100" : "opacity-0",
          )}
          style={{ width: PANE_SIZE, height: PANE_SIZE }}
        >
          {/* Звичайний <img>: декоративний шар фіксованого масштабу, srcset не потрібен.
              object-contain повторює леттербоксинг базового фото 1:1 — лінза і панель
              збігаються; maxWidth:none знімає обмеження preflight (max-width:100%). */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image.zoom.url}
            alt=""
            draggable={false}
            className="object-contain"
            style={{
              width: state.layerSize.width,
              height: state.layerSize.height,
              maxWidth: "none",
              transform: `translate3d(${state.layerOffset.x}px, ${state.layerOffset.y}px, 0)`,
            }}
          />
        </div>
      )}
    </div>
  );
}
