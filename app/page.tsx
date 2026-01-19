import Hero from "@/components/home/Hero";
import BentoGrid from "@/components/home/BentoGrid";
import ServiceValues from "@/components/home/ServiceValues";
import ProductCard from "@/components/product/ProductCard";
import { products } from "@/lib/products";

export default function HomePage() {
  // Filtramos los productos marcados como "isNew"
  const featured = products.filter((p) => p.isNew).slice(0, 4);

  return (
    <main className="bg-white">
      {/* 1. HERO (Portada) */}
      <Hero />

      {/* 2. BENTO GRID (Categorías) */}
      <BentoGrid />

      {/* 3. SECCIÓN NOVEDADES (Faltaba mostrar esto) */}
      <section className="py-20 max-w-[1200px] mx-auto px-6 md:px-12">
        <h2 className="text-3xl md:text-4xl font-semibold text-[#1d1d1f] mb-12 tracking-tight">
          Lo más nuevo.
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 4. VALORES (Garantía, Envíos, etc.) */}
      <ServiceValues />

      {/* Footer automático por layout.tsx */}
    </main>
  );
}
