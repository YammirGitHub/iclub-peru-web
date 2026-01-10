// app/(shop)/[category]/page.tsx
import { notFound } from "next/navigation";
import {
  getProductsByCategory,
  getAllCategories,
  Category,
} from "@/lib/products";
import Link from "next/link";
import Image from "next/image";

// Generación Estática (Se mantiene igual)
export async function generateStaticParams() {
  const categories = await getAllCategories();
  return categories.map((cat) => ({ category: cat }));
}

// CORRECCIÓN 1: params es Promise<{ category: string }>
export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params; // <--- EL AWAIT MÁGICO

  const title = category.charAt(0).toUpperCase() + category.slice(1);
  return {
    title: `${title} - iClub Perú`,
  };
}

// CORRECCIÓN 2: params es Promise también aquí
export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params; // <--- EL AWAIT MÁGICO

  const validCategories = await getAllCategories();

  // Validación segura
  if (!validCategories.includes(category as Category)) {
    return notFound();
  }

  const products = await getProductsByCategory(category);

  return (
    <div className="min-h-screen bg-[#F5F5F7] pt-24 pb-10">
      <div className="text-center mb-16 space-y-4">
        <h1 className="text-5xl font-semibold text-gray-900 capitalize tracking-tight">
          {category === "seminuevos" ? "Seminuevos" : category}
        </h1>
        <p className="text-xl text-gray-500">
          {category === "seminuevos"
            ? "Calidad certificada a precios increíbles."
            : `Explora nuestra colección de ${category}.`}
        </p>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/${category}/${product.slug}`}
              className="group bg-white rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
            >
              <div className="relative w-full h-64 mb-6">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              <div className="text-center">
                {product.isNew && (
                  <span className="text-orange-600 text-xs font-bold uppercase tracking-wide mb-2 block">
                    Nuevo
                  </span>
                )}
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                  {product.name}
                </h3>
                <p className="text-lg text-gray-900">
                  Desde S/ {product.price}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
