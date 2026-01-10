import Link from "next/link";
import Image from "next/image";
import { products } from "@/lib/products";
import { ChevronRight } from "lucide-react";

export default function SeminuevosCatalog() {
  // 1. CORRECCIÓN: Usamos "seminuevo" en singular, tal como está en lib/products.ts
  const seminuevosList = products.filter((p) => p.category === "seminuevo");

  return (
    <div className="min-h-screen bg-white pt-32 pb-20 px-6">
      <div className="max-w-[1200px] mx-auto">
        <h1 className="text-5xl font-semibold text-[#1d1d1f] mb-12">Seminuevos Certificados</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {seminuevosList.map((product) => (
            <Link key={product.slug} href={`/iphone/${product.slug}`} className="group">
              <div className="bg-[#f5f5f7] rounded-[2rem] p-8 h-[500px] flex flex-col items-center hover:scale-[1.02] transition-all cursor-pointer relative overflow-hidden">
                <h3 className="text-2xl font-semibold mt-4 mb-2 text-[#1d1d1f]">{product.name}</h3>
                
                {/* 2. CORRECCIÓN: El precio ya es número, no usamos .replace() */}
                <p className="text-sm text-gray-500 mb-8">Desde S/ {product.price}</p> 
                
                <div className="relative w-full h-full transform transition-transform duration-500 group-hover:scale-105">
                   {/* 3. CORRECCIÓN: Usamos mainImage */}
                   <Image 
                     src={product.mainImage || "/placeholder.png"} 
                     alt={product.name} 
                     fill 
                     className="object-contain pb-6"
                   />
                </div>
                
                <div className="absolute bottom-8 flex items-center gap-2 text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity font-medium text-sm">
                  Ver detalles <ChevronRight size={14} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}