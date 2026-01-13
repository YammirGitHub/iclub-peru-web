"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ChevronRight, ShoppingBag } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { products } from "@/lib/products"; // Tu base de datos

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Enfocar el input automáticamente al abrir
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  // Lógica de filtrado (Instantánea)
  const filteredProducts =
    query.trim() === ""
      ? []
      : products
          .filter((product) =>
            product.name.toLowerCase().includes(query.toLowerCase())
          )
          .slice(0, 5); // Limitamos a 5 resultados para no saturar

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-white/90 backdrop-blur-xl"
        >
          {/* Header del Buscador */}
          <div className="max-w-3xl mx-auto pt-20 px-6">
            <div className="relative flex items-center border-b-2 border-gray-100 pb-4">
              <Search className="text-gray-400 w-6 h-6 mr-4" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Buscar iPhone, iPad, Mac..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full text-2xl md:text-3xl font-semibold bg-transparent outline-none placeholder-gray-300 text-[#1d1d1f]"
              />
              <button
                onClick={onClose}
                className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors ml-4"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Resultados */}
            <div className="mt-8 space-y-2">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <Link
                    key={product.id}
                    href={`/${product.category}/${product.slug}`}
                    onClick={onClose}
                    className="flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors group"
                  >
                    <div className="relative w-12 h-12 bg-white rounded-lg p-1 border border-gray-100">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-[#1d1d1f] group-hover:text-[#0071e3] transition-colors">
                        {product.name}
                      </h4>
                      <p className="text-xs text-gray-500">
                        S/ {product.price.toLocaleString("es-PE")}
                      </p>
                    </div>
                    <ChevronRight className="text-gray-300 group-hover:text-[#0071e3] transition-colors" />
                  </Link>
                ))
              ) : query.length > 1 ? (
                <p className="text-gray-400 text-center py-10">
                  No encontramos resultados para "{query}"
                </p>
              ) : (
                <div className="text-sm text-gray-400 font-medium uppercase tracking-wider mt-10">
                  Sugerencias Rápidas
                  <div className="flex gap-2 mt-4 flex-wrap">
                    {["iPhone 17", "MacBook Air", "Cargador", "AirPods"].map(
                      (tag) => (
                        <button
                          key={tag}
                          onClick={() => setQuery(tag)}
                          className="px-4 py-2 bg-gray-100 rounded-full text-[#1d1d1f] hover:bg-[#0071e3] hover:text-white transition-all normal-case"
                        >
                          {tag}
                        </button>
                      )
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
