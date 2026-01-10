// app/(shop)/[category]/[slug]/page.tsx
import { notFound } from "next/navigation";
import Image from "next/image";
import {
  getProductBySlug,
  getProductsByCategory,
  getAllCategories,
} from "@/lib/products";

export async function generateStaticParams() {
  const categories = await getAllCategories();
  const paths = [];

  for (const category of categories) {
    const products = await getProductsByCategory(category);
    for (const product of products) {
      paths.push({
        category: category,
        slug: product.slug,
      });
    }
  }
  return paths;
}

// CORRECCIÓN 1: Tipado Promise
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params; // <--- AWAIT
  const product = await getProductBySlug(slug);

  if (!product) return { title: "Producto no encontrado" };

  return {
    title: `${product.name} - Comprar | iClub Perú`,
    description: product.description,
  };
}

// CORRECCIÓN 2: Tipado Promise
export default async function ProductPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { slug } = await params; // <--- AWAIT
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white pt-28 pb-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div className="relative h-[500px] md:h-[600px] w-full bg-[#F5F5F7] rounded-[30px] flex items-center justify-center overflow-hidden md:sticky md:top-32">
            <div className="relative w-[80%] h-[80%] transition-transform duration-700 hover:scale-105">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          <div className="flex flex-col space-y-8 pt-4">
            <div>
              <span className="text-orange-600 font-semibold text-sm tracking-widest uppercase mb-2 block">
                {product.isNew ? "Nuevo Lanzamiento" : "Disponible"}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-4">
                {product.name}
              </h1>
              <p className="text-xl text-gray-500 leading-relaxed font-medium">
                {product.description}
              </p>
            </div>

            <div className="border-t border-b border-gray-100 py-6">
              <div className="flex items-baseline gap-4">
                <span className="text-3xl font-bold text-gray-900">
                  S/ {product.price.toLocaleString()}
                </span>
                {product.previousPrice && (
                  <span className="text-lg text-gray-400 line-through">
                    S/ {product.previousPrice.toLocaleString()}
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-400 mt-2">
                Incluye IGV y envío gratuito a todo Chiclayo.
              </p>
            </div>

            <div className="flex flex-col gap-3 pt-4">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-full font-medium text-lg transition-all duration-300 transform active:scale-95 shadow-lg shadow-blue-600/20">
                Añadir a la bolsa
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
