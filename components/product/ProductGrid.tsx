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
}

type FilterType = "Todos" | "Pro" | "Nuevos" | "Ofertas";

export default function ProductGrid({ products, theme }: Props) {
  const [activeFilter, setActiveFilter] = useState<FilterType>("Todos");

  // Detectamos la categoría actual para ajustar los textos de los botones
  const currentCategory = products[0]?.category;

  // Función para obtener la etiqueta correcta según la categoría
  const getProLabel = () => {
    if (currentCategory === "watch") return "Ultra";
    if (currentCategory === "airpods") return "Pro / Max";
    return "Pro"; // Default para iPhone, Mac, iPad
  };

  // Lógica de Filtrado Senior (CORREGIDA)
  const filteredProducts = products.filter((product) => {
    if (activeFilter === "Todos") return true;

    if (activeFilter === "Nuevos") return product.isNew;

    if (activeFilter === "Pro") {
      // El filtro "Pro" es inteligente: detecta Pro, Ultra o Max
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
    <div>
      {/* 1. BARRA DE FILTROS (STICKY Y RESPONSIVE) */}
      <div className="sticky top-20 z-30 flex justify-center pb-8">
        <div className="flex gap-2 p-1.5 bg-gray-100/80 backdrop-blur-xl rounded-full overflow-x-auto scrollbar-hide max-w-[90vw] shadow-sm border border-gray-200/50">
          {/* Botón Todos */}
          <button
            onClick={() => setActiveFilter("Todos")}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 whitespace-nowrap
              ${
                activeFilter === "Todos"
                  ? "bg-[#1d1d1f] text-white shadow-md"
                  : "text-gray-500 hover:text-[#1d1d1f] hover:bg-white/50"
              }
            `}
          >
            Todos
          </button>

          {/* Botón Dinámico (Pro/Ultra/Max) */}
          <button
            onClick={() => setActiveFilter("Pro")}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 whitespace-nowrap
              ${
                activeFilter === "Pro"
                  ? "bg-[#1d1d1f] text-white shadow-md"
                  : "text-gray-500 hover:text-[#1d1d1f] hover:bg-white/50"
              }
            `}
          >
            {getProLabel()}
          </button>

          {/* Botón Nuevos */}
          <button
            onClick={() => setActiveFilter("Nuevos")}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 whitespace-nowrap
              ${
                activeFilter === "Nuevos"
                  ? "bg-[#1d1d1f] text-white shadow-md"
                  : "text-gray-500 hover:text-[#1d1d1f] hover:bg-white/50"
              }
            `}
          >
            Nuevos
          </button>

          {/* Botón Ofertas */}
          <button
            onClick={() => setActiveFilter("Ofertas")}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 whitespace-nowrap
              ${
                activeFilter === "Ofertas"
                  ? "bg-[#1d1d1f] text-white shadow-md"
                  : "text-gray-500 hover:text-[#1d1d1f] hover:bg-white/50"
              }
            `}
          >
            Ofertas
          </button>
        </div>
      </div>

      {/* 2. GRILLA DE RESULTADOS */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pb-32">
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, index) => {
              // El primer producto es destacado SOLO si estamos en "Todos" y hay varios items
              const isFeatured =
                index === 0 &&
                activeFilter === "Todos" &&
                filteredProducts.length > 3;

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  key={product.id}
                  className={`
                    group relative flex flex-col bg-white rounded-[32px] overflow-hidden 
                    shadow-xl shadow-gray-200/60 border border-gray-100
                    hover:shadow-2xl hover:shadow-gray-300/50 hover:-translate-y-2 hover:border-transparent transition-all duration-500
                    ${
                      isFeatured
                        ? "lg:col-span-2 lg:flex-row lg:items-center"
                        : "h-full"
                    }
                  `}
                >
                  <Link
                    href={`/${product.category}/${product.slug}`}
                    className="contents"
                  >
                    {/* Badge Nuevo */}
                    {product.isNew && (
                      <span
                        className={`absolute top-6 left-6 z-20 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-md ${theme.badgeBg} ${theme.textColor}`}
                      >
                        Nuevo
                      </span>
                    )}

                    {/* IMAGEN */}
                    <div
                      className={`relative bg-[#F5F5F7] overflow-hidden flex items-center justify-center ${
                        isFeatured
                          ? "w-full lg:w-1/2 h-80 lg:h-full order-2"
                          : "w-full h-80 pt-10"
                      }`}
                    >
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-contain p-8 transition-transform duration-700 ease-out group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>

                    {/* INFO */}
                    <div
                      className={`flex flex-col p-8 md:p-10 ${
                        isFeatured ? "w-full lg:w-1/2 order-1" : "flex-1"
                      }`}
                    >
                      <div className="flex gap-2 mb-4">
                        {product.isNew && (
                          <div
                            className={`flex items-center gap-1 text-[10px] font-bold uppercase ${theme.textColor}`}
                          >
                            <Star size={12} fill="currentColor" /> Top Ventas
                          </div>
                        )}
                        <div className="flex items-center gap-1 text-[10px] font-bold text-green-600 uppercase">
                          <Zap size={12} fill="currentColor" /> Envío Flash
                        </div>
                      </div>

                      <h3
                        className={`font-semibold text-[#1d1d1f] tracking-tight mb-2 ${
                          isFeatured ? "text-4xl" : "text-2xl"
                        }`}
                      >
                        {product.name}
                      </h3>

                      <p className="text-gray-500 font-medium leading-relaxed mb-8 line-clamp-2">
                        {product.description}
                      </p>

                      <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-6">
                        <div>
                          <p className="text-xs text-gray-400 font-medium mb-1">
                            Precio Online
                          </p>
                          <div className="flex flex-col">
                            <span className="text-xl font-bold text-[#1d1d1f]">
                              {formatMoney(product.price)}
                            </span>
                            {/* Mostrar precio tachado en el grid si existe */}
                            {product.originalPrice &&
                              product.originalPrice > product.price && (
                                <span className="text-xs text-gray-400 line-through">
                                  {formatMoney(product.originalPrice)}
                                </span>
                              )}
                          </div>
                        </div>

                        <span
                          className={`w-12 h-12 rounded-full bg-[#f5f5f7] flex items-center justify-center text-[#1d1d1f] transition-all duration-300 group-hover:text-white group-hover:${theme.textColor.replace(
                            "text-",
                            "bg-"
                          )}`}
                        >
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

        {/* Empty State: Si filtramos y no hay nada */}
        {filteredProducts.length === 0 && (
          <div className="py-32 text-center bg-white rounded-[32px] border border-dashed border-gray-200 shadow-sm animate-fade-in">
            <ShieldCheck size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-[#1d1d1f] text-xl font-semibold mb-2">
              No encontramos productos
            </p>
            <p className="text-gray-500">
              Prueba con otro filtro para esta categoría.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
