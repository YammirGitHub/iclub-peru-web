import { products } from "@/lib/products";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function MacPage() {
  const macProducts = products.filter((p) => p.category === "mac");

  return (    
        <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-[#f5f5f7] min-h-screen">
      {/* Mantenemos tu 7xl que te gusta, es un estándar sólido */}
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="mb-16 text-center md:text-left">
           <span className="text-orange-500 font-bold tracking-widest uppercase text-[10px] mb-2 block">Potencia Pro</span>
           <h1 className="text-5xl font-semibold text-[#1d1d1f] mb-4 tracking-tight">Mac</h1>
           <p className="text-xl text-gray-500 max-w-2xl font-medium">
             Superpotencia para todo. Diseñadas para trabajar, jugar y crear como nunca.
           </p>
        </div>

        {/* GRILLA PREMIUM */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {macProducts.map((product) => (
              <Link 
                href={`/iphone/${product.id}`} // Reutilizamos la vista de detalle
                key={product.id} 
                className="group relative flex flex-col bg-white rounded-[2rem] p-8 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 ease-out"
              >
                {/* Badge Sutil */}
                <div className="mb-6 z-10">
                   <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-[#0071e3] text-[10px] font-bold uppercase tracking-widest mb-3">
                     Chip M3 / M4
                   </span>
                   <h3 className="text-3xl font-semibold text-[#1d1d1f] mb-2 tracking-tight">{product.name}</h3>
                   <p className="text-gray-500 text-sm font-medium line-clamp-2">{product.tagline}</p>
                </div>

                {/* Imagen Limpia */}
                <div className="relative w-full h-64 mb-8 flex items-center justify-center bg-white">
                  <Image
                    src={product.mainImage}
                    alt={product.name}
                    fill
                    className="object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-700 ease-in-out"
                    unoptimized
                  />
                </div>

                {/* Footer Elegante */}
                <div className="mt-auto flex items-end justify-between pt-6 border-t border-gray-100">
                  <div className="flex flex-col gap-1">
                    <span className="text-[#1d1d1f] font-semibold text-2xl tracking-tight">{product.price}</span>
                    <span className="text-[11px] text-gray-400 font-medium uppercase tracking-wide">Envío a todo el Perú</span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#0071e3] text-white flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-all">
                    <ArrowRight size={16} strokeWidth={3} />
                  </div>
                </div>
              </Link>
           ))}
        </div>
      </div>
    </main>
  );
}