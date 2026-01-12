"use client";

import { useState } from "react";
import Image from "next/image";
import { Product } from "@/lib/products";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext"; // Asumiendo que ya creaste el contexto
import { Check, Truck, ShieldCheck, Battery, Zap } from "lucide-react";

export default function ProductView({ product }: { product: Product }) {
  const { addToCart } = useCart();

  // Estados
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedStorage, setSelectedStorage] = useState(
    product.storageOptions.length > 0 ? product.storageOptions[0] : null
  );
  const [isAdding, setIsAdding] = useState(false);

  // Precio base (asumimos que el precio base del producto es la opción más barata)
  const basePrice =
    product.storageOptions.length > 0
      ? Math.min(...product.storageOptions.map((o) => o.price))
      : product.price;

  // Precio actual
  const currentPrice = selectedStorage ? selectedStorage.price : product.price;

  // Formateador de moneda
  const formatMoney = (amount: number) =>
    new Intl.NumberFormat("es-PE", {
      style: "currency",
      currency: "PEN", // Cambiado a Soles según tu captura
      minimumFractionDigits: 0,
    }).format(amount);

  const handleAddToCart = () => {
    setIsAdding(true);

    addToCart({
      id: product.id,
      title: `${product.name} ${selectedStorage?.capacity || ""}`,
      price: currentPrice,
      image: product.image,
      quantity: 1,
      // Podrías pasar color y storage como metadata extra si tu contexto lo soporta
    });

    setTimeout(() => setIsAdding(false), 1000);
  };

  return (
    <div className="bg-white min-h-screen pt-24 pb-20">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-16 items-start">
          {/* --- COLUMNA IZQUIERDA: IMAGEN STICKY --- */}
          <div className="relative mb-16 lg:mb-0 w-full">
            {/* 'sticky' hace que la imagen te siga al bajar. 'top-32' le da margen superior */}
            <div className="sticky top-32 flex items-center justify-center min-h-[50vh] lg:min-h-[70vh] bg-[#F5F5F7] rounded-[24px] overflow-hidden p-8">
              <span className="absolute top-6 left-6 text-xl font-medium text-gray-900 z-10">
                {product.name}
              </span>

              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedColor.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="relative w-full h-[400px] lg:h-[500px]"
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

              {/* Icono de zoom o 360 (decorativo) */}
              <div className="absolute bottom-6 right-6 bg-white/80 backdrop-blur-md p-2 rounded-full text-gray-500">
                <span className="text-xs font-semibold px-2">360°</span>
              </div>
            </div>
          </div>

          {/* --- COLUMNA DERECHA: CONFIGURACIÓN --- */}
          <div className="flex flex-col pt-2 lg:pt-0">
            {/* Header */}
            <div className="mb-8">
              <span className="text-[#bf4800] font-semibold text-xs tracking-widest uppercase mb-2 block">
                Nuevo
              </span>
              <h1 className="text-4xl md:text-5xl font-semibold text-[#1d1d1f] mb-2 tracking-tight leading-tight">
                Comprar {product.name}
              </h1>
              <p className="text-3xl font-normal text-[#1d1d1f] mt-4">
                {formatMoney(currentPrice)}
              </p>
            </div>

            {/* SELECCIÓN DE COLOR */}
            <div className="mb-10">
              <div className="flex items-center mb-4">
                <span className="font-semibold text-[#1d1d1f]">Color:</span>
                <span className="ml-2 text-gray-600">{selectedColor.name}</span>
              </div>
              <div className="flex flex-wrap gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    className={`
                      group relative w-12 h-12 rounded-full flex items-center justify-center transition-all
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

            {/* SELECCIÓN DE ALMACENAMIENTO (Estilo Caja Apple) */}
            {product.storageOptions.length > 0 && (
              <div className="mb-10">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-semibold text-[#1d1d1f]">
                    Almacenamiento
                  </span>
                  <span className="text-xs text-[#0071e3] font-medium cursor-pointer hover:underline">
                    ¿Cuánto espacio necesito?
                  </span>
                </div>

                <div className="flex flex-col gap-4">
                  {product.storageOptions.map((option) => {
                    // Calculamos la diferencia de precio para mostrar "+ S/ 900"
                    const priceDifference = option.price - basePrice;

                    return (
                      <button
                        key={option.capacity}
                        onClick={() => setSelectedStorage(option)}
                        className={`
                          flex justify-between items-center px-4 py-6 rounded-xl border-2 text-left transition-all duration-200
                          ${
                            selectedStorage?.capacity === option.capacity
                              ? "border-[#0071e3] ring-1 ring-[#0071e3] bg-white"
                              : "border-gray-200 hover:border-gray-400 bg-white"
                          }
                        `}
                      >
                        <span className="font-semibold text-lg text-[#1d1d1f]">
                          {option.capacity}
                        </span>

                        <span className="text-sm text-gray-500">
                          {priceDifference > 0
                            ? `+ ${formatMoney(priceDifference)}`
                            : ""}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* DETALLES TÉCNICOS (Hardcoded para el ejemplo visual) */}
            <div className="mb-10 grid grid-cols-1 sm:grid-cols-2 gap-4 py-6 border-t border-gray-100">
              <div className="flex items-start gap-3">
                <Zap className="w-6 h-6 text-gray-400 mt-1" />
                <div>
                  <p className="font-semibold text-sm text-[#1d1d1f]">
                    Chip A17 Pro
                  </p>
                  <p className="text-xs text-gray-500">
                    El chip más rápido en un smartphone.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Battery className="w-6 h-6 text-gray-400 mt-1" />
                <div>
                  <p className="font-semibold text-sm text-[#1d1d1f]">
                    Hasta 29h
                  </p>
                  <p className="text-xs text-gray-500">
                    Reproducción de video.
                  </p>
                </div>
              </div>
            </div>

            {/* CAJA DE ENTREGA Y BOTÓN (Sticky en Mobile Bottom, Normal en Desktop) */}
            <div className="mt-auto bg-[#f5f5f7] p-6 rounded-3xl">
              <div className="mb-6">
                <p className="text-sm text-gray-500 mb-1">Entrega estimada:</p>
                <div className="flex items-center gap-2">
                  <Truck className="w-5 h-5 text-[#1d1d1f]" />
                  <p className="font-semibold text-[#1d1d1f]">Mañana, Gratis</p>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={isAdding}
                className={`
                  w-full text-white text-lg font-medium py-4 px-8 rounded-full shadow-sm 
                  transform active:scale-[0.98] transition-all duration-200 flex justify-center items-center gap-2
                  ${
                    isAdding
                      ? "bg-green-600"
                      : "bg-[#0071e3] hover:bg-[#0077ED]"
                  }
                `}
              >
                {isAdding ? (
                  <>
                    <Check className="w-5 h-5" /> Agregado
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
