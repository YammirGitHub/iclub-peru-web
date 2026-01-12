import { getProductBySlug, getProductsByCategory } from "@/lib/products";
import ProductView from "@/components/product/ProductView";
import RelatedProducts from "@/components/product/RelatedProducts"; // Asegúrate de importar esto
import { notFound } from "next/navigation";
import { Metadata } from "next";

interface Props {
  params: Promise<{ category: string; slug: string }>;
}

// 1. GENERACIÓN DE METADATOS (SEO Nivel Senior)
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Producto no encontrado",
      description: "El producto que buscas no existe.",
    };
  }

  return {
    title: `${product.name} - iClub Store`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [product.image], // Usa la imagen principal para redes sociales
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { category, slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  // 2. Lógica para productos relacionados (Excluyendo el actual)
  const relatedProducts = getProductsByCategory(category)
    .filter((p) => p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="bg-white">
      {/* Pasamos el producto al componente interactivo */}
      <ProductView product={product} />

      {/* Sección de relacionados fuera del View principal para estructura limpia */}
      <RelatedProducts products={relatedProducts} />
    </div>
  );
}
