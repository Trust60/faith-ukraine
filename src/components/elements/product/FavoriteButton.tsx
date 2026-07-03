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
 * «Додати в бажане» на сторінці товару. Стан — у сторі обраного (localStorage).
 * Лейбл незмінний: доданість передається через aria-pressed і візуально —
 * заливкою кнопки та зафарбованим сердцем.
 */
export function FavoriteButton({ productId, className }: TFavoriteButtonProps) {
  useFavoritesHydration();
  const isFavorite = useIsFavorite(productId);
  const toggle = useFavoritesStore((state) => state.toggle);

  return (
    <OutlineButton
      aria-pressed={isFavorite}
      onClick={() => toggle(productId)}
      className={cn("gap-3", isFavorite && "bg-heading text-white", className)}
    >
      <Heart
        className={cn("size-5", isFavorite && "fill-current")}
        strokeWidth={1.5}
        aria-hidden
      />
      Додати в бажане
    </OutlineButton>
  );
}
