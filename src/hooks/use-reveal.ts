"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Reveal-анімація появи картки. Прогресивне покращення, без шкоди для LCP:
 *  - SSR / без JS / коли IntersectionObserver недоступний — елемент одразу видимий
 *    (isVisible стартує `true`), тож контент є в HTML і нічого не «мигає»;
 *  - елементи, що вже у вьюпорті на старті (перший екран, зокрема LCP-картка), НЕ
 *    анімуються — показуються миттєво;
 *  - анімуються лише ті, що входять у вьюпорт під час скролу.
 * Працює й для спочатку прихованих (display:none) карток поза першою пачкою: IO
 * спрацює, коли вони отримають лейаут після кліку «Показати ще».
 */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") return;

    const rect = node.getBoundingClientRect();
    const inViewOnMount =
      rect.height > 0 && rect.bottom > 0 && rect.top < window.innerHeight;
    // Уже видимий на старті — лишаємо як є (без анімації, без мигання, LCP не страждає).
    if (inViewOnMount) return;

    // Поза вьюпортом або прихований — ховаємо й чекаємо появи (off-screen, користувач не бачить).
    setIsVisible(false);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
            return;
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}
