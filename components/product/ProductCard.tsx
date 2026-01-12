"use client";

import Link from "next/link";
import Image from "next/image";
import { Product } from "@/lib/products";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/${product.category}/${product.slug}`}
      className="group relative bg-white rounded-[24px] p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center border border-gray-100 overflow-hidden"
    >
      {/* Etiqueta de "Nuevo" si aplica */}
      {product.isNew && (
        <span className="absolute top-4 left-4 bg-blue-50 text-[#0071e3] text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
          Nuevo
        </span>
      )}

      {/* Imagen con efecto Zoom */}
      <div className="relative w-full aspect-square mb-6 overflow-hidden rounded-xl bg-[#F5F5F7]">
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
          className="w-full h-full relative"
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain p-4"
          />
        </motion.div>
      </div>

      {/* Info del Producto */}
      <div className="space-y-2 w-full">
        <h3 className="text-lg font-semibold text-[#1d1d1f] group-hover:text-[#0071e3] transition-colors truncate">
          {product.name}
        </h3>

        {/* Precio y CTA sutil */}
        <div className="flex items-center justify-center gap-3">
          <p className="text-[#1d1d1f] font-medium">
            S/ {product.price.toLocaleString("es-PE")}
          </p>

          <div className="w-8 h-8 rounded-full bg-[#0071e3] text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
            <ShoppingBag size={14} />
          </div>
        </div>
      </div>
    </Link>
  );
}
