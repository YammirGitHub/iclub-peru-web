import { getProductBySlug, getProductsByCategory } from "@/lib/products";
import { notFound } from "next/navigation";
import { Metadata } from "next";

import ProductConfigurator from "@/components/product/ProductConfigurator";
import ProductRichFeatures from "@/components/product/ProductRichFeatures";
import RelatedProducts from "@/components/product/RelatedProducts";

interface Props {
  params: Promise<{ category: string; slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) return { title: "Producto no encontrado" };

  return {
    title: `${product.name} | iClub Perú`,
    description: product.description,
    openGraph: { images: [product.image] },
  };
}

export default async function ProductPage({ params }: Props) {
  const { category, slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) notFound();

  // Cross-selling inteligente (excluye el producto actual)
  const relatedProducts = getProductsByCategory(category)
    .filter((p) => p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <ProductConfigurator product={product} />
      </div>
      <ProductRichFeatures product={product} />
      <RelatedProducts products={relatedProducts} />
    </div>
  );
}
