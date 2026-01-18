"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Product } from "@/lib/products";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag,
  Check,
  ShieldCheck,
  CreditCard,
  ChevronRight,
} from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function ProductConfigurator({ product }: { product: Product }) {
  const router = useRouter();
  const { addToCart, isCartOpen } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  // ESTADO PARA LA ANIMACIÓN
  const [isFlying, setIsFlying] = useState(false);
  const [flyDestination, setFlyDestination] = useState<{
    x: number;
    y: number;
  } | null>(null);

  // --- ESTADOS ---
  const [selectedSize, setSelectedSize] = useState(
    product.sizes ? product.sizes[0] : null,
  );
  const [selectedColor, setSelectedColor] = useState(
    product.colors ? product.colors[0] : null,
  );
  const [selectedStorage, setSelectedStorage] = useState(
    product.storage ? product.storage[0] : null,
  );

  const basePrice = selectedStorage ? selectedStorage.price : product.price;
  const sizeExtra = selectedSize ? selectedSize.priceModifier : 0;
  const finalPrice = basePrice + sizeExtra;
  const monthlyPrice = finalPrice / 12;

  // --- LÓGICA DE AÑADIR CON PUNTERÍA LÁSER ---
  const handleAddToCart = () => {
    // 1. Calcular destino ANTES de añadir
    const cartIconElement = document.getElementById("cart-icon-pixel");

    if (cartIconElement) {
      const rect = cartIconElement.getBoundingClientRect();
      // Apuntamos al centro del icono
      setFlyDestination({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      });
      setIsFlying(true);
    } else {
      // Fallback por si olvidaste poner el ID (va arriba a la derecha genérico)
      setFlyDestination({ x: window.innerWidth - 50, y: 30 });
      setIsFlying(true);
    }

    // 2. Lógica normal
    addToCart(product, {
      color: selectedColor || undefined,
      size: selectedSize || undefined,
      storage: selectedStorage || undefined,
      price: finalPrice,
    });

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, {
      color: selectedColor || undefined,
      size: selectedSize || undefined,
      storage: selectedStorage || undefined,
      price: finalPrice,
    });
    router.push("/checkout");
  };

  const formatMoney = (amount: number) =>
    new Intl.NumberFormat("es-PE", {
      style: "currency",
      currency: "PEN",
      minimumFractionDigits: 0,
    }).format(amount);

  const getStorageTitle = () => {
    if (product.category === "watch") return "Conectividad";
    if (product.category === "airpods") return "Modelo";
    return "Almacenamiento";
  };

  const activeImage = selectedColor?.image || product.image;

  return (
    <>
      {/* --- ANIMACIÓN DE VUELO CON COORDENADAS REALES --- */}
      <AnimatePresence>
        {isFlying && flyDestination && (
          <motion.div
            initial={{
              opacity: 1,
              scale: 1,
              position: "fixed",
              top: "50%",
              left: "50%",
              x: "-50%",
              y: "-50%",
              zIndex: 9999,
            }}
            animate={{
              opacity: 0.5,
              scale: 0.1,
              // USAMOS LAS COORDENADAS REALES DEL ICONO
              top: flyDestination.y,
              left: flyDestination.x,
              x: "-50%", // Centramos el punto de anclaje
              y: "-50%",
            }}
            transition={{
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1], // Curva Bezier estilo iOS (Rápido inicio, llegada suave)
            }}
            onAnimationComplete={() => {
              setIsFlying(false);
              setFlyDestination(null);
            }}
            className="pointer-events-none"
          >
            {/* Imagen flotante con borde sutil */}
            <div className="relative w-32 h-32 bg-white rounded-xl shadow-2xl border border-gray-200 p-2 flex items-center justify-center">
              <Image
                src={activeImage}
                alt="Flying product"
                fill
                className="object-contain p-2"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 pt-4 lg:pt-8 pb-32 lg:pb-12 px-4 sm:px-0">
        {/* COLUMNA IZQ: IMAGEN */}
        <div className="lg:col-span-7">
          <div className="lg:sticky lg:top-32 space-y-6">
            <div className="relative w-full aspect-square lg:aspect-[16/11] bg-[#F5F5F7] rounded-[24px] lg:rounded-[32px] overflow-hidden flex items-center justify-center p-8 lg:p-12 transition-all duration-500 shadow-sm border border-white/50">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedColor?.name || "default"}
                  initial={{ opacity: 0, scale: 0.9, filter: "blur(5px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, filter: "blur(5px)" }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={selectedColor?.image || product.image}
                    alt={product.name}
                    fill
                    priority
                    className="object-contain drop-shadow-2xl"
                    sizes="(max-width: 768px) 100vw, 60vw"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="bg-gray-50 rounded-xl p-3 flex flex-col items-center justify-center gap-1 border border-gray-100">
                <ShieldCheck size={20} className="text-gray-400" />
                <span className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">
                  Garantía Apple
                </span>
              </div>
              <div className="bg-gray-50 rounded-xl p-3 flex flex-col items-center justify-center gap-1 border border-gray-100">
                <Check size={20} className="text-green-500" />
                <span className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">
                  Stock Real
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* COLUMNA DER: CONFIGURADOR */}
        <div className="lg:col-span-5 flex flex-col gap-8">
          <div className="border-b border-gray-100 pb-6">
            {product.isNew && (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#F97316] tracking-widest uppercase mb-3 bg-orange-50 px-3 py-1 rounded-full border border-orange-100">
                Nuevo Lanzamiento
              </span>
            )}
            <h1 className="text-3xl lg:text-5xl font-bold text-[#1d1d1f] mb-3 tracking-tight leading-tight">
              {product.name}
            </h1>

            <div className="flex flex-wrap items-baseline gap-3">
              <motion.p
                key={finalPrice}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl font-semibold text-[#1d1d1f]"
              >
                {formatMoney(finalPrice)}
              </motion.p>
              {product.originalPrice && (
                <span className="text-lg text-gray-400 line-through font-medium">
                  {formatMoney(product.originalPrice + sizeExtra)}
                </span>
              )}
            </div>
          </div>

          {/* 1. TAMAÑOS */}
          {product.sizes && (
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-[#1d1d1f]">Tamaño</h3>
              {product.sizes.map((size) => (
                <button
                  key={size.name}
                  onClick={() => setSelectedSize(size)}
                  className={`w-full flex items-center justify-between p-4 rounded-2xl border-2 transition-all group relative overflow-hidden active:scale-[0.99] duration-200
                  ${
                    selectedSize?.name === size.name
                      ? "border-[#F97316] bg-white ring-1 ring-[#F97316] shadow-lg shadow-orange-100"
                      : "border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50"
                  }`}
                >
                  <div className="text-left">
                    <span className="block font-bold text-lg text-[#1d1d1f]">
                      {size.label}
                    </span>
                    {size.description && (
                      <span className="text-xs text-gray-500 font-medium">
                        {size.description}
                      </span>
                    )}
                  </div>
                  <span className="text-sm font-medium text-[#1d1d1f]">
                    {size.priceModifier > 0
                      ? `+ ${formatMoney(size.priceModifier)}`
                      : "Estándar"}
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* 2. COLORES */}
          {product.colors && (
            <div>
              <h3 className="text-sm font-semibold text-[#1d1d1f] mb-3">
                Acabado:{" "}
                <span className="text-gray-500 font-normal">
                  {selectedColor?.name}
                </span>
              </h3>
              <div className="flex flex-wrap gap-4">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    className={`
                          w-12 h-12 rounded-full border border-gray-200 transition-all duration-300 relative
                          ${
                            selectedColor?.name === color.name
                              ? "scale-110 ring-2 ring-offset-2 ring-[#F97316] shadow-md"
                              : "hover:scale-105 hover:shadow-sm"
                          }
                      `}
                    style={{ backgroundColor: color.hex }}
                    aria-label={`Color ${color.name}`}
                    title={color.name}
                  />
                ))}
              </div>
            </div>
          )}

          {/* 3. ALMACENAMIENTO */}
          {product.storage && product.storage.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-[#1d1d1f]">
                {getStorageTitle()}
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {product.storage.map((option) => {
                  const diff = option.price - (product.storage?.[0].price || 0);
                  return (
                    <button
                      key={option.capacity}
                      onClick={() => setSelectedStorage(option)}
                      className={`w-full flex items-center justify-between p-4 rounded-2xl border-2 transition-all text-left active:scale-[0.99] duration-200
                              ${
                                selectedStorage?.capacity === option.capacity
                                  ? "border-[#F97316] bg-white ring-1 ring-[#F97316] shadow-lg shadow-orange-100"
                                  : "border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50"
                              }`}
                    >
                      <span className="font-bold text-[#1d1d1f]">
                        {option.capacity}
                      </span>
                      <span className="text-sm text-gray-500 font-medium">
                        {diff > 0 ? `+ ${formatMoney(diff)}` : ""}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* --- DESKTOP: DOBLE BOTÓN --- */}
          <div className="hidden lg:block mt-6 bg-gray-50 p-8 rounded-[24px] border border-gray-100">
            <div className="flex justify-between items-end mb-6">
              <div>
                <p className="text-3xl font-bold text-[#1d1d1f] tracking-tight">
                  {formatMoney(finalPrice)}
                </p>
                <p className="text-sm text-gray-500 mt-1 font-medium flex items-center gap-1">
                  12 cuotas de {formatMoney(monthlyPrice)} aprox{" "}
                  <ChevronRight size={14} />
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleAddToCart}
                disabled={isAdded}
                className={`flex-1 py-4 rounded-full transition-all flex items-center justify-center gap-2 text-lg font-semibold active:scale-95 border-2 border-gray-200 hover:border-gray-300 bg-white text-[#1d1d1f] ${
                  isAdded
                    ? "!bg-green-50 !text-green-600 !border-green-200"
                    : ""
                }`}
              >
                {isAdded ? (
                  <>
                    <Check size={20} /> Agregado
                  </>
                ) : (
                  <>
                    <ShoppingBag size={20} /> Añadir
                  </>
                )}
              </button>

              <button
                onClick={handleBuyNow}
                className="flex-1 py-4 rounded-full transition-all flex items-center justify-center gap-2 text-lg shadow-xl hover:shadow-2xl active:scale-95 font-semibold text-white bg-[#F97316] hover:bg-[#ea580c] shadow-orange-500/20"
              >
                <CreditCard size={20} /> Comprar Ahora
              </button>
            </div>

            <div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-gray-500 font-medium uppercase tracking-wide">
              <Check size={12} className="text-green-600" />
              <span>Stock Disponible</span>
              <span className="mx-2 text-gray-300">|</span>
              <Check size={12} className="text-green-600" />
              <span>Envío Gratis</span>
            </div>
          </div>
        </div>

        {/* --- BARRA MÓVIL --- */}
        {!isCartOpen && (
          <div className="fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-xl border-t border-gray-200 p-4 lg:hidden z-50 shadow-[0_-5px_30px_rgba(0,0,0,0.08)] pb-safe transition-transform duration-300">
            <div className="flex items-center justify-between gap-4 max-w-md mx-auto">
              <div className="flex flex-col min-w-[80px]">
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                  Total
                </span>
                <span className="text-xl font-bold text-[#1d1d1f] leading-tight">
                  {formatMoney(finalPrice)}
                </span>
              </div>

              <div className="flex flex-1 gap-2">
                <button
                  onClick={handleAddToCart}
                  disabled={isAdded}
                  className={`w-14 h-12 rounded-full flex items-center justify-center border border-gray-200 bg-gray-50 active:scale-90 transition-all ${
                    isAdded
                      ? "text-green-600 bg-green-50 border-green-200"
                      : "text-[#1d1d1f]"
                  }`}
                >
                  {isAdded ? <Check size={22} /> : <ShoppingBag size={22} />}
                </button>

                <button
                  onClick={handleBuyNow}
                  className={`flex-1 h-12 rounded-full font-bold shadow-lg active:scale-95 flex items-center justify-center gap-1 transition-colors text-white
                    ${
                      isAdded
                        ? "bg-green-500"
                        : "bg-[#F97316] shadow-orange-500/30"
                    }`}
                >
                  {isAdded ? <Check size={18} /> : <>Comprar Ahora</>}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
