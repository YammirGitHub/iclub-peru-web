import { products } from "@/lib/products";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function SeminuevosPage() {
  const seminuevos = products.filter((p) => p.category === "seminuevos");

  return (
    <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-[#f5f5f7] min-h-screen">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER */}
        <div className="mb-16 text-center md:text-left">
           <span className="text-emerald-600 font-bold tracking-widest uppercase text-[10px] mb-2 block">
             Oportunidad Inteligente
           </span>
           <h1 className="text-5xl font-semibold text-[#1d1d1f] mb-4 tracking-tight">
             Seminuevos
           </h1>
           <p className="text-xl text-gray-500 max-w-2xl font-medium mx-auto md:mx-0">
             Como nuevos, pero mejores para tu bolsillo. Equipos certificados con garantía real.
           </p>
        </div>

        {/* GRILLA RESPONSIVA */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {seminuevos.map((product) => {
            const numericPrice = parseInt(product.price.replace(/\D/g,'')) || 0;
            const fakeOriginalPrice = numericPrice + 800; 

            return (
              <Link 
                  href={`/iphone/${product.id}`} 
                  key={product.id} 
                  className="group relative flex flex-col h-full bg-white rounded-[2rem] p-8 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 ease-out"
              >
                  {/* Badge Verde */}
                  <div className="mb-6 z-10">
                     <span className="inline-block px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-bold uppercase tracking-widest mb-3 border border-emerald-100">
                       Certificado iClub
                     </span>
                     <h3 className="text-3xl font-semibold text-[#1d1d1f] mb-2 tracking-tight">{product.name}</h3>
                     <p className="text-gray-500 text-sm font-medium line-clamp-2">{product.tagline}</p>
                  </div>

                  {/* Imagen */}
                  <div className="relative w-full h-64 mb-8 flex items-center justify-center bg-white">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-700 ease-in-out"
                      unoptimized
                    />
                  </div>

                  {/* Footer con Comparativa */}
                  <div className="mt-auto flex items-end justify-between pt-6 border-t border-gray-100">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-xs text-gray-400 font-medium line-through decoration-red-400/50">
                        Nuevo: S/ {fakeOriginalPrice}
                      </span>
                      <span className="text-[#1d1d1f] font-semibold text-2xl tracking-tight">
                        {product.price}
                      </span>
                      <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-wide mt-1">
                        Ahorras S/ 800
                      </span>
                    </div>
                    
                    <div className="w-8 h-8 rounded-full bg-[#0071e3] text-white flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-all">
                      <ArrowRight size={16} strokeWidth={3} />
                    </div>
                  </div>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}