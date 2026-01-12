"use client";

import { useState } from "react";
import Image from "next/image";
import { Product } from "@/lib/products";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { Check, ShieldCheck, Battery, Zap, Monitor } from "lucide-react";

export default function ProductView({ product }: { product: Product }) {
  const { addToCart } = useCart();

  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  // Selecciona la primera opción de almacenamiento por defecto si existe
  const [selectedStorage, setSelectedStorage] = useState(
    product.storageOptions.length > 0 ? product.storageOptions[0] : null
  );
  const [isAdding, setIsAdding] = useState(false);

  // Precio base = el precio más bajo de las opciones
  const basePrice =
    product.storageOptions.length > 0
      ? Math.min(...product.storageOptions.map((o) => o.price))
      : product.price;

  // Precio actual dinámico
  const currentPrice = selectedStorage ? selectedStorage.price : product.price;

  const formatMoney = (amount: number) =>
    new Intl.NumberFormat("es-PE", {
      style: "currency",
      currency: "PEN",
      minimumFractionDigits: 0,
    }).format(amount);

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart({
      id: product.id,
      title: `${product.name} ${selectedStorage?.capacity || ""} - ${
        selectedColor.name
      }`,
      price: currentPrice,
      image: product.image,
      quantity: 1,
    });
    setTimeout(() => setIsAdding(false), 2000);
  };

  return (
    <div className="bg-white min-h-screen pt-24 pb-20">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-16 items-start">
          {/* --- COLUMNA IZQUIERDA: IMAGEN --- */}
          <div className="relative mb-16 lg:mb-0 w-full">
            {/* sticky top-32 hace que la imagen te persiga en PC */}
            <div className="sticky top-32 flex items-center justify-center min-h-[50vh] lg:min-h-[75vh] bg-[#F5F5F7] rounded-[24px] overflow-hidden p-8 border border-gray-100">
              <span className="absolute top-6 left-6 text-sm font-medium text-gray-500 z-10">
                {product.name}
              </span>

              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedColor.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="relative w-full h-[350px] md:h-[500px]"
                >
                  <Image
                    src={product.image}
                    alt={`${product.name} - ${selectedColor.name}`}
                    fill
                    className="object-contain drop-shadow-2xl"
                    priority
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* --- COLUMNA DERECHA: SELECCIÓN --- */}
          <div className="flex flex-col">
            {/* Título y Precio */}
            <div className="mb-8">
              <span className="text-[#bf4800] font-semibold text-xs tracking-widest uppercase mb-2 block">
                Nuevo
              </span>
              <h1 className="text-4xl md:text-5xl font-semibold text-[#1d1d1f] mb-4 tracking-tight leading-tight">
                Comprar {product.name}
              </h1>
              <p className="text-3xl font-medium text-[#1d1d1f]">
                {formatMoney(currentPrice)}
              </p>
            </div>

            {/* Selector de Color */}
            <div className="mb-10">
              <div className="flex items-center mb-4">
                <span className="font-semibold text-[#1d1d1f]">Color:</span>
                <span className="ml-2 text-gray-600 font-medium">
                  {selectedColor.name}
                </span>
              </div>
              <div className="flex flex-wrap gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    className={`
                      relative w-12 h-12 rounded-full flex items-center justify-center transition-all
                      ${
                        selectedColor.name === color.name
                          ? "ring-2 ring-offset-2 ring-[#0071e3]"
                          : "hover:ring-1 hover:ring-gray-300"
                      }
                    `}
                  >
                    <span
                      className="w-8 h-8 rounded-full shadow-sm border border-black/10"
                      style={{ backgroundColor: color.hex }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Selector de Almacenamiento (Estilo Apple Rectangular) */}
            {product.storageOptions.length > 0 && (
              <div className="mb-10">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-semibold text-[#1d1d1f]">
                    Almacenamiento
                  </span>
                </div>

                <div className="flex flex-col gap-4">
                  {product.storageOptions.map((option) => {
                    // Calculamos diferencia: precio opción - precio base
                    const priceDiff = option.price - basePrice;
                    const isSelected =
                      selectedStorage?.capacity === option.capacity;

                    return (
                      <button
                        key={option.capacity}
                        onClick={() => setSelectedStorage(option)}
                        className={`
                          flex justify-between items-center px-5 py-6 rounded-xl border-2 text-left transition-all duration-200
                          ${
                            isSelected
                              ? "border-[#0071e3] ring-1 ring-[#0071e3] bg-white"
                              : "border-gray-200 hover:border-gray-400 bg-white"
                          }
                        `}
                      >
                        <span
                          className={`text-lg font-semibold ${
                            isSelected ? "text-[#1d1d1f]" : "text-gray-900"
                          }`}
                        >
                          {option.capacity}
                        </span>

                        <span className="text-sm text-gray-500 font-medium">
                          {priceDiff > 0 ? `+ ${formatMoney(priceDiff)}` : ""}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Iconos Informativos */}
            <div className="grid grid-cols-2 gap-4 py-8 border-t border-gray-100 text-xs md:text-sm text-gray-600">
              <div className="flex items-center gap-3">
                <Monitor className="w-5 h-5 text-gray-400" />
                <span>Pantalla Liquid Retina XDR</span>
              </div>
              <div className="flex items-center gap-3">
                <Zap className="w-5 h-5 text-gray-400" />
                <span>Chip M4 Pro o M4 Max</span>
              </div>
              <div className="flex items-center gap-3">
                <Battery className="w-5 h-5 text-gray-400" />
                <span>Hasta 22 horas de batería</span>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-gray-400" />
                <span>Garantía Apple 1 Año</span>
              </div>
            </div>

            {/* Caja de Compra Final */}
            <div className="mt-6 bg-[#f5f5f7] p-6 md:p-8 rounded-3xl">
              <div className="mb-6">
                <p className="text-sm text-gray-500 mb-1">Entrega estimada:</p>
                <p className="text-lg font-bold text-[#1d1d1f]">
                  Mañana, Gratis
                </p>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={isAdding}
                className={`
                  w-full text-white text-lg font-medium py-4 px-8 rounded-full shadow-sm 
                  transform active:scale-[0.99] transition-all duration-200 flex justify-center items-center gap-2
                  ${
                    isAdding
                      ? "bg-green-600"
                      : "bg-[#0071e3] hover:bg-[#0077ED]"
                  }
                `}
              >
                {isAdding ? (
                  <>
                    <Check className="w-6 h-6" /> ¡Agregado a la Bolsa!
                  </>
                ) : (
                  "Agregar a la Bolsa"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
