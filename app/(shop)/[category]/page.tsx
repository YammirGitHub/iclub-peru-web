import { getProductsByCategory, getAllCategories } from "@/lib/products";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

// ESTO ES CLAVE: Genera las rutas estáticas para SEO y Velocidad
export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((category) => ({
    category: category,
  }));
}

interface Props {
  params: {
    category: string;
  };
}

export default function CategoryPage({ params }: Props) {
  const { category } = params;
  const products = getProductsByCategory(category);

  if (products.length === 0) {
    // Si la categoría no existe o está vacía
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl font-semibold text-[#1d1d1f] mb-4">
          Categoría no encontrada
        </h1>
        <p className="text-[#86868b]">
          Lo sentimos, no encontramos productos en &quot;{category}&quot;.
        </p>
        <Link href="/" className="mt-8 text-[#0066cc] hover:underline">
          Volver al inicio
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 max-w-[1200px] mx-auto">
      <div className="border-b border-gray-200 pb-8 mb-12">
        <h1 className="text-5xl font-semibold tracking-tight text-[#1d1d1f] capitalize">
          {category}
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
        {products.map((product) => (
          <Link
            href={`/${category}/${product.slug}`}
            key={product.id}
            className="group flex flex-col gap-6"
          >
            {/* Contenedor Imagen (Efecto Apple: Zoom suave y fondo gris sutil) */}
            <div className="relative w-full aspect-[4/3] bg-[#f5f5f7] rounded-[24px] overflow-hidden flex items-center justify-center">
              <div className="relative w-[80%] h-[80%] transition-transform duration-500 group-hover:scale-105">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            </div>

            {/* Info Producto */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">
                Nuevo
              </span>
              <h3 className="text-2xl font-semibold text-[#1d1d1f] group-hover:text-[#0066cc] transition-colors leading-tight">
                {product.title}
              </h3>
              <p className="text-lg text-[#1d1d1f]">
                S/{" "}
                {product.price.toLocaleString("es-PE", {
                  minimumFractionDigits: 2,
                })}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
