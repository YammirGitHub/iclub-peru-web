import Hero from "@/components/home/Hero";
import BentoShowcase from "@/components/home/BentoShowcase"; // Importamos el nuevo
import ServiceValues from "@/components/home/ServiceValues";

export default function Home() {
  return (
    <main className="bg-white min-h-screen selection:bg-blue-100 selection:text-blue-900">
      
      {/* 1. Héroe Principal (Tu iPhone 17 Pro Max animado) */}
      <Hero />

      {/* 2. Escaparate del Ecosistema (Fusionado) */}
      <BentoShowcase />

      {/* 3. Tus Valores iClub */}
      <ServiceValues />
      
    </main>
  );
}