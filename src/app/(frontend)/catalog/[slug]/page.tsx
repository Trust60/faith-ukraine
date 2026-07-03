import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getCatalogData } from "@/data/catalog";
import { getProductBySlug, getProductSlugs } from "@/data/product";
import { pickRelatedProducts } from "@/utils/related-products";
import { hasRichText } from "@/utils/rich-text";
import { ProductImageZoom } from "@/components/elements/product/ProductImageZoom";
import { ProductSummary } from "@/components/elements/product/ProductSummary";
import { ProductRichTextSection } from "@/components/elements/product/ProductRichTextSection";
import { ProductIngredients } from "@/components/elements/product/ProductIngredients";
import { RelatedProducts } from "@/components/elements/product/RelatedProducts";
import { ProductJsonLd } from "@/components/elements/product/ProductJsonLd";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const slugs = await getProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/catalog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  // 404 ще тут: generateMetadata завершується до першого флашу відповіді,
  // тому статус буде справжній 404 (notFound() у тілі сторінки після стрімінгу
  // шелла вже не змінив би статус). Дані — з кешу, повторний виклик безкоштовний.
  if (!product) notFound();

  const fullName = `${product.lineName} ${product.title}`;
  const description =
    product.shortDescription ?? `${fullName} — професійна японська косметика FAITH.`;

  return {
    title: `${fullName} — FAITH`,
    description,
    openGraph: {
      title: fullName,
      description,
      images: [
        {
          url: product.image.base.url,
          width: product.image.base.width,
          height: product.image.base.height,
          alt: product.image.alt,
        },
      ],
      locale: "uk_UA",
      type: "website",
    },
  };
}

// Сторінка товару. Дані — з кешу (unstable_cache, тег "catalog"; правки в адмінці
// інвалідовують його через revalidateTag). Невідомий слаг або чернетка → 404.
// Схожі товари рахуються зі списку каталогу — він уже в тому самому кеші.
export default async function ProductPage({ params }: PageProps<"/catalog/[slug]">) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const { products } = await getCatalogData();
  const related = pickRelatedProducts(product, products);

  return (
    <article className="mx-auto max-w-[1200px] px-4 py-10 md:px-8 md:py-14">
      <Link
        href="/catalog"
        className="inline-flex min-h-11 items-center gap-2 font-serif text-nav underline-offset-4 transition-colors hover:text-ink-soft hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
      >
        <ArrowLeft className="size-4" strokeWidth={1.5} aria-hidden />
        До каталогу
      </Link>

      <div className="mt-4 lg:grid lg:grid-cols-2 lg:items-start lg:gap-14">
        <ProductImageZoom image={product.image} />
        <ProductSummary product={product} className="mt-8 lg:mt-0" />
      </div>

      {hasRichText(product.description) && (
        <ProductRichTextSection
          title="Опис"
          data={product.description}
          className="mt-14 md:mt-20"
        />
      )}

      {product.keyIngredients.length > 0 && (
        <ProductIngredients items={product.keyIngredients} className="mt-14 md:mt-20" />
      )}

      {hasRichText(product.howToUse) && (
        <ProductRichTextSection
          title="Спосіб застосування"
          data={product.howToUse}
          className="mt-14 md:mt-20"
        />
      )}

      {related.length > 0 && (
        <RelatedProducts products={related} className="mt-16 md:mt-24" />
      )}

      <ProductJsonLd product={product} />
    </article>
  );
}
