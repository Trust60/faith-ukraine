import type { TProductDetail } from "@/data/product";

type TProductJsonLdProps = { product: TProductDetail };

/** Мінімальна schema.org-розмітка товару (без offers — на сайті немає продажу). */
export function ProductJsonLd({ product }: TProductJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${product.lineName} ${product.title}`,
    image: [product.image.zoom.url],
    brand: { "@type": "Brand", name: "FAITH" },
    ...(product.shortDescription && { description: product.shortDescription }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
