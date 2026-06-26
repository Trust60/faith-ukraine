import { unstable_cache } from "next/cache";
import { getPayloadClient } from "@/lib/getPayload";
import { PARTNERS_CACHE_TAG } from "@/data/cache-tags";
import type { Partner } from "@/payload-types";

export type TPartner = {
  id: number;
  name: string;
  address: string;
  phone: string | null;
  logo: {
    url: string;
    alt: string;
    width: number;
    height: number;
  };
};

const orderOf = (value?: number | null) => value ?? 0;

const byOrderThenName = (a: Partner, b: Partner) =>
  orderOf(a.order) - orderOf(b.order) || a.name.localeCompare(b.name);

function toPartner(partner: Partner): TPartner {
  // Partners — upload-колекція, тож логотип (url/sizes) лежить прямо на записі.
  const card = partner.sizes?.card;
  return {
    id: partner.id,
    name: partner.name,
    address: partner.address,
    phone: partner.phone ?? null,
    logo: {
      url: card?.url ?? partner.url ?? "",
      alt: partner.name,
      width: card?.width ?? partner.width ?? 600,
      height: card?.height ?? partner.height ?? 400,
    },
  };
}

async function loadPartners(): Promise<TPartner[]> {
  const payload = await getPayloadClient();

  const { docs } = await payload.find({
    collection: "partners",
    depth: 0,
    limit: 100,
  });

  return docs.sort(byOrderThenName).map(toPartner);
}

/**
 * Партнери для сторінки «Партнери», відсортовані за (порядок, назва).
 *
 * Кешуються (unstable_cache, тег PARTNERS_CACHE_TAG): сторінка віддається з кешу (ISR),
 * без запиту до БД на кожен перегляд; правки в адмінці інвалідовують кеш через revalidateTag
 * (хук revalidatePartners). revalidate — страхувальний TTL, якщо інвалідація не спрацює.
 */
export const getPartners = unstable_cache(loadPartners, ["partners-list"], {
  tags: [PARTNERS_CACHE_TAG],
  revalidate: 3600,
});
