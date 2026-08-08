"use client";

import { Heart } from "lucide-react";
import { OutlineButton } from "@/ui/OutlineButton";
import { useFavoritesHydration, useFavoritesStore, useIsFavorite } from "@/store/favorites";
import { cn } from "@/utils/cn";

type TFavoriteButtonProps = {
  productId: number;
  className?: string;
};

/**
 * «Додати в бажане» на сторінці товару. Стан — у сторі обраного (localStorage) — видно
 * і в тексті кнопки, і візуально (заливка + зафарбоване серце). Лейбли однакової довжини
 * (ширина кнопки гуляє на ~1px), а сама кнопка — остання в колонці й вирівняна ліворуч,
 * тож перемикання нічого не зсуває.
 *
 * aria-pressed НЕ ставимо: за WAI-ARIA APG стан несе або незмінний лейбл разом із
 * aria-pressed, або лейбл, що змінюється, — але не обидва одразу (інакше скрінрідер
 * озвучує стан двічі: «Додано в бажане, перемикач, натиснуто»).
 */
export function FavoriteButton({ productId, className }: TFavoriteButtonProps) {
  useFavoritesHydration();
  const isFavorite = useIsFavorite(productId);
  const toggle = useFavoritesStore((state) => state.toggle);

  return (
    <OutlineButton
      onClick={() => toggle(productId)}
      className={cn("gap-3", isFavorite && "bg-heading text-white", className)}
    >
      <Heart
        className={cn("size-5", isFavorite && "fill-current")}
        strokeWidth={1.5}
        aria-hidden
      />
      {isFavorite ? "Додано в бажане" : "Додати в бажане"}
    </OutlineButton>
  );
}
