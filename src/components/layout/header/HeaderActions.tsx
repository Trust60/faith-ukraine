import Link from "next/link";
import { Search, Heart } from "lucide-react";
import { IconButton } from "@/ui/IconButton";

/** Дії праворуч у хедері: пошук та список бажань. */
export function HeaderActions() {
  return (
    <div className="flex items-center gap-1 md:gap-2">
      <IconButton aria-label="Пошук товарів">
        <Search className="size-5" strokeWidth={1.5} aria-hidden />
      </IconButton>
      <IconButton asChild>
        <Link href="/wishlist" aria-label="Список бажань">
          <Heart className="size-5" strokeWidth={1.5} aria-hidden />
        </Link>
      </IconButton>
    </div>
  );
}
