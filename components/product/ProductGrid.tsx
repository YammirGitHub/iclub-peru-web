"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/lib/products";
import { ArrowRight, Star, Zap, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  products: Product[];
  theme: {
    textColor: string;
    badgeBg: string;
  };
  category: string;
}

type FilterType = "Todos" | "Pro" | "Nuevos" | "Ofertas";

export default function ProductGrid({ products, theme, category }: Props) {
  const [activeFilter, setActiveFilter] = useState<FilterType>("Todos");

  // ... (Tus funciones getProLabel y filtros se mantienen igual) ...
  const getProLabel = () => {
    if (category === "watch") return "Ultra";
    if (category === "airpods") return "Pro / Max";
    return "Pro";
  };

  const filteredProducts = products.filter((product) => {
    if (activeFilter === "Todos") return true;
    if (activeFilter === "Nuevos") return product.isNew;
    if (activeFilter === "Pro") {
      return (
        product.name.includes("Pro") ||
        product.name.includes("Ultra") ||
        product.name.includes("Max")
      );
    }
    if (activeFilter === "Ofertas") {
      return product.originalPrice && product.originalPrice > product.price;
    }
    return true;
  });

  const formatMoney = (amount: number) =>
    new Intl.NumberFormat("es-PE", {
      style: "currency",
      currency: "PEN",
      minimumFractionDigits: 0,
    }).format(amount);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative min-h-screen"
    >
      {/* ... (Tu barra de filtros se mantiene igual) ... */}
      <div className="sticky top-24 z-30 flex justify-center pb-8 pointer-events-none">
        <div className="pointer-events-auto flex gap-2 p-1.5 bg-white/80 backdrop-blur-xl rounded-full overflow-x-auto scrollbar-hide max-w-[90vw] shadow-sm border border-gray-200/50">
          {["Todos", getProLabel(), "Nuevos", "Ofertas"].map((filter) => (
            <button
              key={filter}
              onClick={() =>
                setActiveFilter(
                  filter === getProLabel() ? "Pro" : (filter as FilterType)
                )
              }
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 whitespace-nowrap
      ${
        // Esta lógica de comparación ya estaba bien, ahora funcionará porque activeFilter será "Pro"
        activeFilter === (filter === getProLabel() ? "Pro" : filter)
          ? "bg-[#1d1d1f] text-white shadow-md"
          : "text-gray-500 hover:text-[#F97316] hover:bg-white/50"
      }
    `}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pb-32">
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, index) => {
              // --- OPTIMIZACIÓN LCP ---
              // Las primeras 4 imágenes cargan con prioridad máxima.
              // Esto evita que la imagen aparezca "después" de la tarjeta.
              const isPriority = index < 4;

              // --- LÓGICA DE GRID ---
              let spanClass = "col-span-1 h-full";
              let isGigante = false;
              let isGrande = false;
              let isHorizontal = false;

              if (index === 0 && activeFilter === "Todos") {
                if (["mac", "airpods"].includes(category)) {
                  spanClass =
                    "lg:col-span-3 lg:flex-row lg:items-center min-h-[500px]";
                  isHorizontal = true;
                  isGigante = true;
                } else if (["iphone", "ipad", "watch"].includes(category)) {
                  spanClass =
                    "lg:col-span-2 lg:flex-row lg:items-center min-h-[420px]";
                  isHorizontal = true;
                  isGrande = true;
                }
              }

              return (
                <motion.div
                  layout
                  // OPTIMIZACIÓN DE ANIMACIÓN:
                  // 1. will-change-transform: Prepara la GPU.
                  // 2. Curve Bezier: [0.25, 0.1, 0.25, 1] (Cubic Bezier suave).
                  initial={{ opacity: 0, y: 30 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.5,
                      delay: index * 0.05, // Stagger rápido (50ms)
                      ease: [0.25, 0.1, 0.25, 1],
                    },
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.95,
                    transition: { duration: 0.2 },
                  }}
                  key={product.id}
                  style={{ willChange: "transform, opacity" }} // ⚡️ Performance Hack
                  className={`
                    group relative flex flex-col bg-white rounded-[32px] overflow-hidden 
                    shadow-xl shadow-gray-200/60 border border-gray-100
                    hover:shadow-2xl hover:shadow-orange-500/10 hover:-translate-y-2 hover:border-orange-200 
                    transition-all duration-500
                    ${spanClass}
                  `}
                >
                  <Link
                    href={`/${product.category}/${product.slug}`}
                    className="contents"
                  >
                    {/* Badge Nuevo */}
                    {product.isNew && (
                      <span className="absolute top-6 left-6 z-20 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-md bg-orange-50 text-[#F97316] border border-orange-100">
                        Nuevo
                      </span>
                    )}

                    {/* IMAGEN OPTIMIZADA */}
                    <div
                      className={`relative bg-[#F5F5F7] overflow-hidden flex items-center justify-center ${
                        isGigante
                          ? "w-full lg:w-[68.4%] h-80 lg:h-full order-2"
                          : isGrande
                          ? "w-full lg:w-1/2 h-80 lg:h-full order-2"
                          : "w-full h-80 pt-10"
                      }`}
                    >
                      {isGigante && product.video ? (
                        <video
                          key={product.video}
                          autoPlay
                          loop
                          muted
                          playsInline
                          poster={product.image}
                          className="absolute inset-0 w-full h-full object-cover"
                        >
                          <source src={product.video} type="video/mp4" />
                        </video>
                      ) : (
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          // ⚡️ PERFORMANCE: Prioridad a las primeras, lazy al resto
                          priority={isPriority}
                          loading={isPriority ? "eager" : "lazy"}
                          className={`object-contain transition-transform duration-700 ease-out group-hover:scale-110 ${
                            isHorizontal ? "p-12" : "p-8"
                          }`}
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      )}
                    </div>

                    {/* INFO */}
                    <div
                      className={`flex flex-col p-8 md:p-12 ${
                        isGigante
                          ? "w-full lg:w-[31.6%] order-1 justify-center"
                          : isGrande
                          ? "w-full lg:w-1/2 order-1 justify-center"
                          : "flex-1"
                      }`}
                    >
                      <div className="flex gap-2 mb-4">
                        {product.isNew && (
                          <div className="flex items-center gap-1 text-[10px] font-bold uppercase text-[#F97316]">
                            <Star size={12} fill="currentColor" /> Top Ventas
                          </div>
                        )}
                        <div className="flex items-center gap-1 text-[10px] font-bold text-green-600 uppercase">
                          <Zap size={12} fill="currentColor" /> Envío Flash
                        </div>
                      </div>

                      <h3
                        className={`font-semibold text-[#1d1d1f] tracking-tight mb-2 group-hover:text-[#F97316] transition-colors ${
                          isHorizontal ? "text-4xl lg:text-6xl" : "text-2xl"
                        }`}
                      >
                        {product.name}
                      </h3>

                      <p className="text-gray-500 font-medium leading-relaxed mb-8 line-clamp-2 text-lg">
                        {product.description}
                      </p>

                      <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-6 w-full">
                        <div>
                          <p className="text-xs text-gray-400 font-medium mb-1">
                            Precio Online
                          </p>
                          <div className="flex flex-col">
                            <span className="text-xl font-bold text-[#1d1d1f]">
                              {formatMoney(product.price)}
                            </span>
                            {product.originalPrice &&
                              product.originalPrice > product.price && (
                                <span className="text-xs text-gray-400 line-through">
                                  {formatMoney(product.originalPrice)}
                                </span>
                              )}
                          </div>
                        </div>
                        <span className="w-12 h-12 rounded-full bg-[#f5f5f7] flex items-center justify-center text-[#1d1d1f] transition-all duration-300 group-hover:text-white group-hover:bg-[#F97316]">
                          <ArrowRight size={20} />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {filteredProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="py-32 text-center bg-white rounded-[32px] border border-dashed border-gray-200 shadow-sm"
          >
            <ShieldCheck size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-[#1d1d1f] text-xl font-semibold mb-2">
              No encontramos productos
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
