"use client";
import { Product } from "@/lib/products";
import ProductImage from "./ProductImage";
import AddToCart from "./AddToCart";

export default function ProductDetails({ product }: { product: Product }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        {/* Columna Izquierda: Galería */}
        <div className="relative">
          {/* CORRECCIÓN AQUÍ: 
              Si product.images es undefined, usamos un array con la imagen principal. 
              Esto satisface el tipo string[] que requiere el componente. */}
          <ProductImage
            images={product.images || [product.image]}
            title={product.name}
          />
        </div>

        {/* Columna Derecha: Info y Compra */}
        <div className="flex flex-col space-y-8">
          <div>
            <h1 className="text-4xl lg:text-5xl font-bold text-[#1d1d1f] tracking-tight mb-2">
              {product.name}
            </h1>
            <p className="text-xl text-gray-500 font-medium">
              {product.description}
            </p>
          </div>

          <div className="text-3xl font-semibold text-[#1d1d1f]">
            S/ {product.price.toLocaleString("es-PE")}
          </div>

          {/* Botón de Acción */}
          <AddToCart product={product} />
        </div>
      </div>
    </div>
  );
}
