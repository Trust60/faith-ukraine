import { getPartners } from "@/data/partners";
import { PARTNERS_SECTION } from "./partners-content";
import { PartnerCard } from "./PartnerCard";

/**
 * Async server-компонент: тягне партнерів (кеш getPartners) і рендерить сітку карток —
 * 2 колонки на мобільному, 4 — на десктопі. Обгортається в Suspense на сторінці, тож
 * статичні секції показуються одразу, а сітка стрімиться.
 */
export async function PartnersGrid() {
  const partners = await getPartners();

  if (partners.length === 0) {
    return (
      <p className="text-center font-serif text-lg text-ink">
        {PARTNERS_SECTION.emptyText}
      </p>
    );
  }

  return (
    <ul className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-16">
      {partners.map((partner) => (
        <li key={partner.id}>
          <PartnerCard partner={partner} />
        </li>
      ))}
    </ul>
  );
}
