"use client";
import { getProductBySlug, Product } from "@/lib/products";
import { useCart } from "@/context/CartContext";
import { notFound, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ShoppingBag, ShieldCheck } from "lucide-react";

export default function ProductPage() {
  const { slug } = useParams();
  const product = getProductBySlug(slug as string);
  const { addToCart } = useCart();

  // Estados para la configuración
  const [selectedColor, setSelectedColor] = useState(product?.colors[0]);
  const [selectedStorage, setSelectedStorage] = useState(
    product?.storageOptions[0]
  );
  const [isAdded, setIsAdded] = useState(false);

  if (!product || !selectedColor || !selectedStorage) return notFound();

  // Cálculo de precio dinámico
  const currentPrice = product.basePrice + selectedStorage.priceModifier;

  const handleAddToCart = () => {
    addToCart({
      id: `${product.id}-${selectedColor.name}-${selectedStorage.label}`, // ID único por variante
      title: `${product.title} (${selectedStorage.label})`,
      price: currentPrice,
      image: selectedColor.image,
      quantity: 1,
    });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* --- COLUMNA IZQUIERDA: IMAGEN (STICKY) --- */}
        <div className="lg:col-span-7 relative">
          <div className="sticky top-32 min-h-[500px] flex items-center justify-center bg-[#f5f5f7] rounded-[30px] p-10 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedColor.name} // Clave para animar cambio de color
                initial={{ opacity: 0, scale: 0.9, x: 50 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.9, x: -50 }}
                transition={{ duration: 0.4, ease: "circOut" }}
                className="relative w-full h-[400px] md:h-[600px]"
              >
                <Image
                  src={selectedColor.image}
                  alt={`${product.title} ${selectedColor.name}`}
                  fill
                  className="object-contain"
                  priority
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* --- COLUMNA DERECHA: CONFIGURADOR --- */}
        <div className="lg:col-span-5 flex flex-col gap-8 pt-4">
          <div>
            <h2 className="text-[#bf4800] text-sm font-semibold tracking-widest uppercase mb-2">
              NUEVO
            </h2>
            <h1 className="text-4xl md:text-5xl font-semibold text-[#1d1d1f] mb-4 tracking-tight">
              Comprar {product.title}
            </h1>
            <p className="text-3xl font-medium text-[#1d1d1f]">
              S/{" "}
              {currentPrice.toLocaleString("es-PE", {
                minimumFractionDigits: 2,
              })}
            </p>
          </div>

          {/* 1. SELECCIONAR COLOR */}
          <div>
            <span className="text-sm font-semibold text-gray-500 mb-3 block">
              Color:{" "}
              <span className="text-[#1d1d1f]">{selectedColor.name}</span>
            </span>
            <div className="flex flex-wrap gap-4">
              {product.colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color)}
                  className={`relative w-10 h-10 rounded-full shadow-sm transition-all duration-300 ${
                    selectedColor.name === color.name
                      ? "ring-2 ring-offset-2 ring-[#0071e3] scale-110"
                      : "hover:scale-110"
                  }`}
                  style={{ backgroundColor: color.hex }}
                />
              ))}
            </div>
          </div>

          {/* 2. SELECCIONAR ALMACENAMIENTO */}
          <div>
            <span className="text-sm font-semibold text-gray-500 mb-3 block">
              Almacenamiento
            </span>
            <div className="flex flex-col gap-3">
              {product.storageOptions.map((option) => (
                <button
                  key={option.label}
                  onClick={() => setSelectedStorage(option)}
                  className={`w-full p-4 rounded-xl border flex justify-between items-center transition-all ${
                    selectedStorage.label === option.label
                      ? "border-[#0071e3] ring-1 ring-[#0071e3] bg-blue-50/10"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  <span
                    className={`font-medium ${
                      selectedStorage.label === option.label
                        ? "text-[#0071e3]"
                        : "text-[#1d1d1f]"
                    }`}
                  >
                    {option.label}
                  </span>
                  <span className="text-sm text-gray-500">
                    {option.priceModifier > 0
                      ? `+ S/ ${option.priceModifier}`
                      : ""}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* FEATURES RESUMEN */}
          <div className="py-6 border-t border-b border-gray-100 grid grid-cols-2 gap-4">
            {product.features.map((feature, i) => (
              <div
                key={i}
                className="flex items-start gap-2 text-xs text-[#1d1d1f] font-medium"
              >
                <ShieldCheck size={16} className="text-[#86868b]" />
                {feature}
              </div>
            ))}
          </div>

          {/* BOTÓN DE ACCIÓN */}
          <div className="mt-auto bg-[#f5f5f7] p-6 rounded-2xl -mx-4 md:mx-0">
            <div className="flex justify-between items-center mb-4">
              <div className="flex flex-col">
                <span className="text-xs text-gray-500">Entrega estimada:</span>
                <span className="text-sm font-bold text-[#1d1d1f]">
                  Mañana, Gratis
                </span>
              </div>
            </div>
            <button
              onClick={handleAddToCart}
              className={`w-full py-4 rounded-full font-semibold text-lg flex items-center justify-center gap-2 transition-all duration-300 active:scale-95 ${
                isAdded
                  ? "bg-green-600 text-white"
                  : "bg-[#0071e3] text-white hover:bg-[#0077ed]"
              }`}
            >
              {isAdded ? (
                <>
                  Agregado <Check size={20} />
                </>
              ) : (
                <>Agregar a la Bolsa</>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
