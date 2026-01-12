import { getProductBySlug, getProductsByCategory } from "@/lib/products";
import ProductView from "@/components/product/ProductView";
import RelatedProducts from "@/components/product/RelatedProducts"; // Importante para UX
import { notFound } from "next/navigation";
import { Metadata } from "next";

interface Props {
  params: Promise<{ category: string; slug: string }>;
}

// 1. ESTO ES NIVEL SENIOR: Metadata Dinámica para SEO y WhatsApp
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Producto no encontrado",
    };
  }

  return {
    title: `${product.name} | iClub Perú`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [product.image], // La imagen saldrá al compartir el link
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { category, slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  // 2. Lógica para mostrar "Otros productos que te podrían gustar"
  // Filtramos para no mostrar el mismo producto que ya estamos viendo
  const relatedProducts = getProductsByCategory(category)
    .filter((p) => p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="bg-white">
      {/* Componente Interactivo Principal */}
      <ProductView product={product} />

      {/* Sección de productos relacionados para mejorar la navegación */}
      <RelatedProducts products={relatedProducts} />
    </div>
  );
}
