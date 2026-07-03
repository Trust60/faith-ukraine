"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";

// Лінза працює лише там, де є справжнє наведення (десктопна миша/тачпад).
const HOVER_MEDIA_QUERY = "(hover: hover) and (pointer: fine)";

export type TZoomState = {
  /** Квадрат лінзи на базовому фото (координати контейнера). */
  lens: { x: number; y: number; size: number };
  /** Зсув збільшеного шару всередині зум-панелі. */
  layerOffset: { x: number; y: number };
  /** Розмір збільшеного шару (контейнер × zoom). */
  layerSize: { width: number; height: number };
};

type TUseImageZoomOptions = { zoom?: number; paneSize?: number };

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

/**
 * Математика зум-лінзи (Amazon-style): за позицією курсора рахує квадрат лінзи
 * (з клампом біля країв) і зсув повнорозмірного шару в панелі. isEnabled стартує
 * як false і на сервері, і на першому клієнтському рендері (без hydration mismatch),
 * далі керується matchMedia.
 */
export function useImageZoom({ zoom = 2.25, paneSize = 480 }: TUseImageZoomOptions = {}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isEnabled, setIsEnabled] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [state, setState] = useState<TZoomState | null>(null);

  useEffect(() => {
    const media = window.matchMedia(HOVER_MEDIA_QUERY);
    const sync = () => setIsEnabled(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  const updateFromPointer = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const lensSize = paneSize / zoom;
      const x = clamp(
        event.clientX - rect.left - lensSize / 2,
        0,
        Math.max(0, rect.width - lensSize),
      );
      const y = clamp(
        event.clientY - rect.top - lensSize / 2,
        0,
        Math.max(0, rect.height - lensSize),
      );

      setState({
        lens: { x, y, size: lensSize },
        layerOffset: { x: -x * zoom, y: -y * zoom },
        layerSize: { width: rect.width * zoom, height: rect.height * zoom },
      });
    },
    [paneSize, zoom],
  );

  const onPointerEnter = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      // Гібридні пристрої (ноут із тачскріном): дотик не вмикає лінзу.
      if (!isEnabled || event.pointerType !== "mouse") return;
      setIsActive(true);
      updateFromPointer(event);
    },
    [isEnabled, updateFromPointer],
  );

  const onPointerMove = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (!isEnabled || event.pointerType !== "mouse") return;
      updateFromPointer(event);
    },
    [isEnabled, updateFromPointer],
  );

  const onPointerLeave = useCallback(() => setIsActive(false), []);

  return {
    containerRef,
    isEnabled,
    isActive,
    state,
    handlers: { onPointerEnter, onPointerMove, onPointerLeave },
  };
}
