import { getProductBySlug, getProductsByCategory } from "@/lib/products";
import { notFound } from "next/navigation";
import { Metadata } from "next";

// --- IMPORTACIONES DE TUS COMPONENTES ---
import ProductDetails from "@/components/product/ProductDetails";
import ProductRichFeatures from "@/components/product/ProductRichFeatures";
import RelatedProducts from "@/components/product/RelatedProducts";

interface Props {
  params: Promise<{ category: string; slug: string }>;
}

// 1. Metadata para SEO y WhatsApp
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) return { title: "Producto no encontrado" };

  return {
    title: `${product.name} | iClub Perú`,
    description: product.description,
    openGraph: {
      images: [product.image],
    },
  };
}

// 2. COMPONENTE DE PÁGINA (¡AQUÍ FALTABA EL EXPORT DEFAULT!)
export default async function ProductPage({ params }: Props) {
  const { category, slug } = await params;

  // Buscamos el producto
  const product = getProductBySlug(slug);

  // Si no existe, error 404
  if (!product) {
    notFound();
  }

  // Filtramos productos relacionados (misma categoría, pero no el mismo producto)
  const relatedProducts = getProductsByCategory(category)
    .filter((p) => p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="bg-white">
      {/* 1. Detalles de Compra (Precio, Botones, Galería) */}
      <ProductDetails product={product} />

      {/* 2. Marketing Visual (Bento Grid - Solo si el producto tiene datos de marketing) */}
      <ProductRichFeatures product={product} />

      {/* 3. Productos Relacionados (Cross-selling) */}
      <RelatedProducts products={relatedProducts} />
    </div>
  );
}
