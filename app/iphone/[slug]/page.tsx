"use client"; // Obligatorio porque usamos interacción (Click)

import { products } from "@/lib/products";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Check, ShieldCheck, Truck, Zap } from "lucide-react";
import { useCart } from "@/context/CartContext"; // Importamos el cerebro del carrito
import { use } from "react"; 

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  // Desempaquetamos los parámetros (Next.js 15)
  const { slug } = use(params);
  
  // Usamos la función para guardar en el carrito
  const { addToCart } = useCart(); 

  const product = products.find((p) => p.id === slug);

  if (!product) return notFound();

  return (
    <main className="bg-[#fbfbfd] min-h-screen pt-32 pb-20">
      
      {/* SECCIÓN PRINCIPAL */}
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center mb-24">
        
        {/* Columna Izquierda: Imagen */}
        <div className="relative w-full aspect-square md:aspect-[4/3] flex items-center justify-center bg-white rounded-[3rem] shadow-xl shadow-black/5 p-8">
          <Image 
             src={product.image}
             alt={product.name}
             width={800} height={800}
             className="object-contain w-full h-full mix-blend-multiply"
             unoptimized priority
          />
        </div>

        {/* Columna Derecha: Información */}
        <div className="flex flex-col justify-center">
          <span className="text-orange-500 font-bold tracking-widest uppercase text-sm mb-2">
            Nuevo Ingreso
          </span>
          <h1 className="text-5xl md:text-7xl font-semibold text-[#1d1d1f] mb-4 tracking-tight">
            {product.name}
          </h1>
          <p className="text-2xl font-medium text-[#1d1d1f] mb-6">
            {product.tagline}
          </p>
          
          <div className="text-5xl font-bold text-[#1d1d1f] mb-8">
            {product.price}
          </div>

          <div className="flex flex-col gap-4 mb-8">
             {/* BOTÓN: AÑADIR A LA BOLSA (Abre el carrito lateral) */}
             <button 
                onClick={() => addToCart(product)}
                className="w-full py-4 rounded-full bg-[#0071e3] text-white font-semibold text-lg hover:bg-[#0077ed] transition-all shadow-lg hover:scale-[1.02] active:scale-95"
             >
               Añadir a la Bolsa
             </button>
             <p className="text-center text-sm text-[#86868b]">
               Envío gratuito y seguro a todo el Perú.
             </p>
          </div>

          {/* Características (Specs) */}
          <div className="grid grid-cols-2 gap-4">
             {product.specs?.map((spec, i) => (
                <div key={i} className="flex items-center gap-2 text-[#424245] font-medium bg-white px-4 py-3 rounded-xl border border-gray-200 shadow-sm">
                   <Check size={16} className="text-[#0071e3]" />
                   {spec}
                </div>
             ))}
          </div>
        </div>
      </div>

      {/* SECCIÓN INFERIOR: CONFIANZA (Features) */}
      <div className="max-w-4xl mx-auto px-6 text-center">
         <h2 className="text-3xl font-semibold text-[#1d1d1f] mb-12">La experiencia iClub</h2>
         
         <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 group hover:-translate-y-1 transition-transform">
               <ShieldCheck className="w-10 h-10 text-[#0071e3] mx-auto mb-4" />
               <h3 className="font-semibold text-[#1d1d1f] mb-2">Garantía Real</h3>
               <p className="text-sm text-[#86868b]">1 año en sellados y 10 meses en seminuevos.</p>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 group hover:-translate-y-1 transition-transform">
               <Truck className="w-10 h-10 text-[#0071e3] mx-auto mb-4" />
               <h3 className="font-semibold text-[#1d1d1f] mb-2">Envíos Seguros</h3>
               <p className="text-sm text-[#86868b]">Tu equipo viaja 100% asegurado.</p>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 group hover:-translate-y-1 transition-transform">
               <Zap className="w-10 h-10 text-[#0071e3] mx-auto mb-4" />
               <h3 className="font-semibold text-[#1d1d1f] mb-2">Soporte</h3>
               <p className="text-sm text-[#86868b]">Expertos en Apple a tu servicio.</p>
            </div>
         </div>
      </div>

    </main>
  );
}