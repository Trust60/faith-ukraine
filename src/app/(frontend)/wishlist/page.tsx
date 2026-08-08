import type { Metadata } from "next";
import { getCatalogData } from "@/data/catalog";
import { WishlistView } from "@/components/elements/wishlist/WishlistView";

export const metadata: Metadata = {
  title: "Список бажань — FAITH",
  description: "Збережені товари FAITH.",
  // Список персональний (localStorage), для краулера сторінка порожня — не індексуємо.
  robots: { index: false, follow: true },
};

// Ті самі кешовані дані каталогу (тег "catalog"), що й на /catalog та /search — окремого
// запиту до БД немає, а вибірку обраного робить клієнт, тож сторінка лишається статичною.
export default async function WishlistPage() {
  const { products } = await getCatalogData();

  return (
    <section className="mx-auto max-w-[1200px] px-4 py-10 md:px-8 md:py-14">
      <h1 className="text-center font-display text-3xl uppercase tracking-[0.02em] text-heading md:text-4xl">
        Список бажань
      </h1>

      <WishlistView products={products} className="mt-8 md:mt-10" />
    </section>
  );
}
