import { Search } from "lucide-react";
import { IconButton } from "@/ui/IconButton";
import { WishlistLink } from "./WishlistLink";

/** Дії праворуч у хедері: пошук та список бажань (з лічильником обраного). */
export function HeaderActions() {
  return (
    <div className="flex items-center gap-1 md:gap-2">
      <IconButton aria-label="Пошук товарів">
        <Search className="size-5" strokeWidth={1.5} aria-hidden />
      </IconButton>
      <WishlistLink />
    </div>
  );
}
