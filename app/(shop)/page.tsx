import Hero from "@/components/home/Hero";
import BentoGrid from "@/components/home/BentoGrid";
import ServiceValues from "@/components/home/ServiceValues"; // <-- El nuevo
import ProductCard from "@/components/product/ProductCard";
import { products } from "@/lib/products";

export default function HomePage() {
  const featured = products.filter((p) => p.isNew).slice(0, 4);

  return (
    <main className="bg-white">
      {/* 1. Impacto (Sin modificar Hero.tsx) */}
      <Hero />

      {/* 2. Categorías (Sin modificar BentoGrid.tsx) */}
      <BentoGrid />

      {/* 4. Valores de la marca (Trust) */}
      <ServiceValues />

      {/* El Footer.tsx aparecerá automáticamente por el layout global */}
    </main>
  );
}
