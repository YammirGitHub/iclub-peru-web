"use client";

import Link from "next/link";
import Image from "next/image";
import { Product } from "@/lib/products";
import { ShoppingBag } from "lucide-react";

export default function ProductCard({ product }: { product: Product }) {
  const formatMoney = (amount: number) =>
    new Intl.NumberFormat("es-PE", {
      style: "currency",
      currency: "PEN",
      minimumFractionDigits: 0,
    }).format(amount);

  return (
    <Link
      href={`/${product.category}/${product.slug}`}
      className="group relative flex flex-col bg-white rounded-[32px] overflow-hidden transition-all duration-500 ease-out 
      shadow-xl shadow-gray-200/60 border border-gray-100
      hover:shadow-2xl hover:shadow-gray-300/50 hover:-translate-y-2 hover:border-transparent"
    >
      {/* Badge Nuevo */}
      {product.isNew && (
        <span className="absolute top-4 left-4 z-20 bg-blue-50 text-blue-600 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-md">
          Nuevo
        </span>
      )}

      {/* ZONA DE IMAGEN */}
      <div className="relative w-full aspect-square bg-[#F5F5F7] flex items-center justify-center overflow-hidden p-8">
        <div className="relative w-full h-full">
          <Image
            src={product.image}
            alt={product.name}
            fill
            // priority ayuda a que la imagen cargue instantáneamente
            priority={true}
            className="object-contain drop-shadow-md transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, 300px"
          />
        </div>
      </div>

      {/* Info del Producto */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-lg font-semibold text-[#1d1d1f] mb-1 group-hover:text-[#0071e3] transition-colors line-clamp-1">
          {product.name}
        </h3>

        <p className="text-sm text-gray-500 mb-4 line-clamp-2">
          {product.description}
        </p>

        <div className="mt-auto flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xl font-bold text-[#1d1d1f]">
              {formatMoney(product.price)}
            </span>
            {/* Precio Tachado (Si existe) */}
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xs text-gray-400 line-through">
                {formatMoney(product.originalPrice)}
              </span>
            )}
          </div>

          <div className="w-10 h-10 rounded-full bg-[#f5f5f7] flex items-center justify-center text-[#1d1d1f] group-hover:bg-[#0071e3] group-hover:text-white transition-all duration-300">
            <ShoppingBag size={18} />
          </div>
        </div>
      </div>
    </Link>
  );
}
