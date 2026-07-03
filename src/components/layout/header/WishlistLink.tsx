"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { IconButton } from "@/ui/IconButton";
import { useFavoritesCount, useFavoritesHydration } from "@/store/favorites";

/**
 * Сердце у хедері: посилання на список бажань + лічильник доданих товарів.
 * До гідрації стора лічильник порожній (як у серверному HTML) — без mismatch.
 */
export function WishlistLink() {
  useFavoritesHydration();
  const count = useFavoritesCount();

  return (
    <IconButton asChild>
      <Link
        href="/wishlist"
        aria-label={count > 0 ? `Список бажань (${count})` : "Список бажань"}
        className="relative"
      >
        <Heart className="size-5" strokeWidth={1.5} aria-hidden />
        {count > 0 && (
          <span
            aria-hidden
            className="absolute top-0.5 right-0 grid h-4 min-w-4 place-items-center rounded-full bg-brand px-1 text-[10px] leading-none text-white"
          >
            {count}
          </span>
        )}
      </Link>
    </IconButton>
  );
}
