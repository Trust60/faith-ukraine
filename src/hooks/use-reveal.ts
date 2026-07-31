"use client";

import { useEffect, useRef, useState } from "react";

/** `initial` — ще не вирішили; ховаємо блок лише після маунту, а не в HTML. */
export type TRevealState = "initial" | "hidden" | "shown";

/**
 * Показує блок, коли той доскролює до вʼюпорта.
 *
 * Стартовий стан — `initial` (без класів), тому серверний HTML завжди видимий: якщо JS не
 * виконався, контент просто на місці, без порожніх екранів. Ховаємо тільки те, що на маунті
 * ще за межами екрана — інакше видимий блок блимнув би. При `prefers-reduced-motion: reduce`
 * одразу віддаємо `shown`, тобто анімації немає взагалі.
 */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [state, setState] = useState<TRevealState>("initial");

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const prefersReduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduce || element.getBoundingClientRect().top < window.innerHeight) {
      setState("shown");
      return;
    }

    setState("hidden");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setState("shown");
        observer.disconnect();
      },
      // Мінус 10% знизу: блок починає виїжджати, коли вже трохи зайшов у кадр.
      { rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return { ref, state };
}
