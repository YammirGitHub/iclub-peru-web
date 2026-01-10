// app/iphone/[slug]/page.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { products } from "@/lib/products"; // Asegúrate que la ruta sea correcta
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/context/CartContext"; 

export default function ProductPage({ params }: { params: { slug: string } }) {
  // 1. Buscar producto
  const product = products.find((p) => p.slug === params.slug);
  
  if (!product) return notFound();

  // 2. Estados (Hooks) siempre al inicio
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedStorage, setSelectedStorage] = useState(product.storage[0]);
  const { addItem } = useCart();

  const finalPrice = product.price + selectedStorage.priceModifier;

  return (
    <div className="min-h-screen bg-white pt-32 pb-20">
      <div className="max-w-[1100px] mx-auto px-6">
        
        <Link href="/iphone" className="inline-flex items-center text-gray-500 hover:text-black mb-8 transition-colors text-sm font-medium">
          <ChevronLeft size={16} /> Volver
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* GALERÍA */}
          <div className="lg:col-span-7 sticky top-32">
            <div className="relative h-[500px] md:h-[600px] w-full bg-[#f5f5f7] rounded-[2.5rem] flex items-center justify-center overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={selectedColor.id} // Clave única para la animación
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="relative w-full h-full p-10"
                  >
                    <Image 
                      // CORRECCIÓN: Usamos fallback a mainImage si no hay imagen de color específico
                      src={product.images[selectedColor.id] || product.mainImage}
                      alt={product.name}
                      fill
                      className="object-contain"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>
            </div>
          </div>

          {/* DETALLES */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div>
              <h1 className="text-4xl font-semibold text-[#1d1d1f] mb-2">{product.name}</h1>
              <p className="text-gray-500 font-medium">{product.tagline}</p>
            </div>

            {/* Selector COLOR */}
            <div>
              <span className="text-sm font-semibold text-gray-900 block mb-3">Color: {selectedColor.name}</span>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color.id} // ID único
                    onClick={() => setSelectedColor(color)}
                    className={`w-10 h-10 rounded-full border-2 transition-all ${selectedColor.id === color.id ? 'border-blue-500 scale-110' : 'border-transparent hover:scale-105'}`}
                  >
                    <span className="block w-full h-full rounded-full shadow-sm" style={{ backgroundColor: color.code }} />
                  </button>
                ))}
              </div>
            </div>

            {/* Selector ALMACENAMIENTO (Corrección del BUG KEY) */}
            <div>
              <span className="text-sm font-semibold text-gray-900 block mb-3">Almacenamiento</span>
              <div className="grid grid-cols-3 gap-3">
                {product.storage.map((store) => (
                  <button
                    key={store.capacity} // CORRECCIÓN AQUÍ: Usamos store.capacity, NO el objeto store
                    onClick={() => setSelectedStorage(store)}
                    className={`py-3 rounded-xl border text-sm font-medium transition-all ${
                      selectedStorage.capacity === store.capacity 
                        ? 'border-blue-500 text-blue-600 bg-blue-50' 
                        : 'border-gray-200 text-gray-600 hover:border-gray-400'
                    }`}
                  >
                    {store.capacity}
                  </button>
                ))}
              </div>
            </div>

            {/* COMPRAR */}
            <div className="pt-6 border-t border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <span className="text-3xl font-bold text-[#1d1d1f]">${finalPrice}</span>
              </div>
              <button 
                onClick={() => addItem({
                  id: product.id,
                  name: product.name,
                  price: finalPrice,
                  image: product.mainImage,
                  color: selectedColor.name,
                  storage: selectedStorage.capacity,
                  quantity: 1
                })}
                className="w-full bg-[#0071e3] hover:bg-[#0077ed] text-white font-medium py-4 rounded-full transition-all shadow-lg shadow-blue-500/20 active:scale-95 flex items-center justify-center gap-2"
              >
                <ShoppingBag size={18} /> Añadir a la Bolsa
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}