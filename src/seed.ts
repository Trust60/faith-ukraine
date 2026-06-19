import sharp from "sharp";
import { getPayloadClient } from "@/lib/getPayload";

type TSeedLine = { name: string; slug: string; order: number };
type TSeedProduct = {
  title: string;
  slug: string;
  line: string;
  order: number;
  volume: string;
};

const LINES: TSeedLine[] = [
  { name: "Lamellar Veil EX", slug: "lamellar-veil-ex", order: 0 },
  { name: "Lamellar Mode", slug: "lamellar-mode", order: 1 },
];

const PRODUCTS: TSeedProduct[] = [
  { title: "Cleansing", slug: "lamellar-veil-ex-cleansing", line: "Lamellar Veil EX", order: 0, volume: "150 ml" },
  { title: "Wash", slug: "lamellar-veil-ex-wash", line: "Lamellar Veil EX", order: 1, volume: "120 g" },
  { title: "Calming And Moist Pack", slug: "lamellar-veil-ex-calming-and-moist-pack", line: "Lamellar Veil EX", order: 2, volume: "100 g" },
  { title: "Moist Keep Essence", slug: "lamellar-veil-ex-moist-keep-essence", line: "Lamellar Veil EX", order: 3, volume: "50 ml" },
  { title: "Cleansing", slug: "lamellar-mode-cleansing", line: "Lamellar Mode", order: 0, volume: "150 ml" },
  { title: "Clay Gel Wash & Pack", slug: "lamellar-mode-clay-gel-wash-and-pack", line: "Lamellar Mode", order: 1, volume: "120 g" },
];

const escapeXml = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Тимчасова webp-заглушка фото товару (бренд-кольори + назва). Замінити реальними фото в адмінці. */
async function placeholderImage(line: string, title: string): Promise<Buffer> {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="768" height="1024" viewBox="0 0 768 1024">
  <rect width="768" height="1024" fill="#f5f5f5"/>
  <rect x="284" y="280" width="200" height="440" rx="24" fill="#ffffff" stroke="#c8a97e" stroke-width="3"/>
  <text x="384" y="860" text-anchor="middle" font-family="Arial, sans-serif" font-size="26" letter-spacing="4" fill="#585651">${escapeXml(line.toUpperCase())}</text>
  <text x="384" y="912" text-anchor="middle" font-family="Arial, sans-serif" font-size="34" fill="#1a1a1a">${escapeXml(title)}</text>
</svg>`;
  return sharp(Buffer.from(svg)).webp({ quality: 82 }).toBuffer();
}

const seed = async () => {
  const payload = await getPayloadClient();
  const all = { id: { exists: true } } as const;

  payload.logger.info("Seed: очищення старих даних…");
  await payload.delete({ collection: "products", where: all });
  await payload.delete({ collection: "product-lines", where: all });
  await payload.delete({ collection: "media", where: all });

  payload.logger.info("Seed: створення лінійок…");
  const lineIdByName = new Map<string, number>();
  for (const line of LINES) {
    const created = await payload.create({ collection: "product-lines", data: line });
    lineIdByName.set(line.name, created.id);
  }

  payload.logger.info("Seed: створення товарів…");
  for (const product of PRODUCTS) {
    const data = await placeholderImage(product.line, product.title);
    const media = await payload.create({
      collection: "media",
      data: { alt: `${product.line} ${product.title}` },
      file: { data, mimetype: "image/webp", name: `${product.slug}.webp`, size: data.length },
    });

    const lineId = lineIdByName.get(product.line);
    if (!lineId) throw new Error(`Не знайдено лінійку "${product.line}"`);

    await payload.create({
      collection: "products",
      data: {
        title: product.title,
        slug: product.slug,
        line: lineId,
        image: media.id,
        order: product.order,
        volume: product.volume,
        _status: "published",
      },
    });
  }

  payload.logger.info(`Seed: готово ✓ (${LINES.length} лінійки, ${PRODUCTS.length} товарів)`);
  process.exit(0);
};

await seed();
