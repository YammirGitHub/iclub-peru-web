// app/(shop)/[category]/[slug]/page.tsx
import { notFound } from "next/navigation";
import Image from "next/image";
import {
  getProductBySlug,
  getProductsByCategory,
  getAllCategories,
} from "@/lib/products";

// 1. Generación Estática de Rutas (La clave de la velocidad)
// Esto crea un HTML físico para CADA producto.
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

// 2. Metadatos SEO Automáticos
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const product = await getProductBySlug(params.slug);
  if (!product) return { title: "Producto no encontrado" };

  return {
    title: `${product.name} - Comprar | iClub Perú`,
    description: product.description,
  };
}

// 3. UI de Detalle
export default async function ProductPage({
  params,
}: {
  params: { category: string; slug: string };
}) {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white pt-28 pb-20">
      {" "}
      {/* Fondo blanco puro para detalle */}
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Layout de 2 Columnas estilo Apple */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Columna Izquierda: Galería/Imagen */}
          {/* 'sticky' hace que la imagen te siga mientras haces scroll en los detalles */}
          <div className="relative h-[500px] md:h-[600px] w-full bg-[#F5F5F7] rounded-[30px] flex items-center justify-center overflow-hidden md:sticky md:top-32">
            {/* Animación de entrada suave */}
            <div className="relative w-[80%] h-[80%] transition-transform duration-700 hover:scale-105">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain"
                priority // Carga prioritaria (LCP optimizado)
              />
            </div>
          </div>

          {/* Columna Derecha: Información y Compra */}
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

            {/* Precio */}
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

            {/* Selector de Colores (Simulado por ahora) */}
            <div>
              <label className="text-sm font-semibold text-gray-900 mb-3 block">
                Color
              </label>
              <div className="flex gap-3">
                {["#3C3C3D", "#E3E3E3", "#F2F0EB", "#505964"].map(
                  (color, i) => (
                    <button
                      key={i}
                      className={`w-8 h-8 rounded-full border border-gray-200 shadow-sm focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all hover:scale-110`}
                      style={{ backgroundColor: color }}
                    />
                  )
                )}
              </div>
            </div>

            {/* Botones de Acción */}
            <div className="flex flex-col gap-3 pt-4">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-full font-medium text-lg transition-all duration-300 transform active:scale-95 shadow-lg shadow-blue-600/20">
                Añadir a la bolsa
              </button>
              <p className="text-center text-xs text-gray-400 mt-2">
                Entrega estimada: 24 - 48 horas
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
