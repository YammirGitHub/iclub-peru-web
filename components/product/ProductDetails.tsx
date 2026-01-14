"use client";
import { useState } from "react";
import { Product } from "@/lib/products";
import ProductImage from "./ProductImage";
import AddToCart from "./AddToCart";

export default function ProductDetails({ product }: { product: Product }) {
  // Estado levantado: El padre controla qué imagen se muestra
  // Si tenemos galería, usamos la primera, si no, la principal.
  const [currentImage, setCurrentImage] = useState(
    product.images?.[0] || product.image
  );

  return (
    <section className="bg-white overflow-hidden">
      <div className="max-w-[1100px] mx-auto px-6 lg:px-8 py-12 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* 1. VISUAL (7 Columnas - Mayor protagonismo) */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center relative order-1">
            <ProductImage src={currentImage} title={product.name} />
          </div>

          {/* 2. LÓGICA & COMPRA (5 Columnas - Sticky y limpio) */}
          <div className="lg:col-span-5 flex flex-col justify-center order-2">
            <div className="sticky top-24 space-y-10">
              {/* Encabezado limpio */}
              <div className="space-y-4 text-center lg:text-left">
                <span className="text-orange-600 font-bold text-xs tracking-widest uppercase">
                  {product.isNew ? "Nuevo Lanzamiento" : "Disponible en Tienda"}
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-[#1d1d1f] tracking-tight leading-[1.1]">
                  {product.name}
                </h1>
                <p className="text-lg text-gray-500 font-medium leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Controles de Compra (Pasamos la función para cambiar imagen) */}
              <AddToCart product={product} onImageChange={setCurrentImage} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
