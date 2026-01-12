import { getProductsByCategory, getAllCategories } from "@/lib/products";
import ProductCard from "@/components/ui/ProductCard";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ category: string }>;
}

// Opcional: Generar rutas estáticas para mejorar rendimiento (Scalability)
export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((category) => ({ category }));
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const validCategories = getAllCategories();

  // Validación de seguridad
  if (!validCategories.includes(category)) {
    notFound();
  }

  const products = getProductsByCategory(category);

  return (
    <div className="min-h-screen bg-white pt-32 pb-20">
      {/* Header de Categoría con Animación de entrada simple */}
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 mb-16 md:mb-24 fade-in">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 capitalize mb-6">
          {category === "iphone" ? "iPhone" : category}
        </h1>
        <p className="text-xl text-gray-500 max-w-2xl font-light">
          Explora nuestra colección de {category}. Calidad garantizada y soporte
          premium.
        </p>
      </div>

      {/* Grid de Productos */}
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {products.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-gray-400 text-lg">
              Próximamente tendremos stock en esta categoría.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
