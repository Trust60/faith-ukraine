import { SearchDialog } from "@/components/elements/search/SearchDialog";
import { WishlistLink } from "./WishlistLink";

/** Дії праворуч у хедері: пошук та список бажань (з лічильником обраного). */
export function HeaderActions() {
  return (
    <div className="flex items-center gap-1 md:gap-2">
      <SearchDialog />
      <WishlistLink />
    </div>
  );
}
