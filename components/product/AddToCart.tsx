"use client";
import { useState } from "react";
import { Product } from "@/lib/products";
import { useCart } from "@/context/CartContext";
import { Check, ShoppingBag, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function AddToCart({ product }: { product: Product }) {
  const { addToCart } = useCart();

  // --- INICIALIZACIÓN SEGURA DE ESTADOS ---
  // Usamos optional chaining (?.) y valores por defecto (||) para evitar pantallas blancas
  const [selectedColor, setSelectedColor] = useState(
    product.colors?.[0] || { name: "Estándar", hex: "#000000" }
  );

  const [selectedStorage, setSelectedStorage] = useState(
    product.storage?.[0] || { capacity: "Única", price: product.price }
  );

  const [isAdded, setIsAdded] = useState(false);

  // --- LÓGICA DE AGREGAR AL CARRITO ---
  const handleAddToCart = () => {
    addToCart({
      ...product,
      price: selectedStorage.price, // PRECIO DINÁMICO: Se actualiza según la capacidad
      title: `${product.name} - ${selectedStorage.capacity} (${selectedColor.name})`,
      // Generamos un ID único para diferenciar un iPhone de 128GB de uno de 256GB en el carrito
      id: `${product.id}-${
        selectedStorage.capacity
      }-${selectedColor.name.replace(/\s+/g, "")}`,
    });

    // Animación de feedback
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2500);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* 1. SECCIÓN DE PRECIO (Sticky Visual) */}
      <div className="border-b border-gray-100 pb-6">
        <div className="flex items-end gap-3">
          <span className="text-4xl font-bold tracking-tight text-[#1d1d1f]">
            S/ {selectedStorage.price.toLocaleString("es-PE")}
          </span>
          {/* Si tuviera descuento, aquí iría el precio tachado */}
        </div>
        <p className="text-sm text-gray-500 mt-2 font-medium flex items-center gap-1">
          <ShieldCheck size={16} className="text-green-600" />
          Garantía oficial iClub Perú. Incluye IGV.
        </p>
      </div>

      {/* 2. SELECTOR DE COLORES (Las "Bolitas") */}
      {product.colors && product.colors.length > 0 && (
        <div className="space-y-4">
          <span className="text-sm font-bold text-[#1d1d1f] uppercase tracking-wide">
            Acabado:{" "}
            <span className="text-gray-500 font-normal normal-case ml-1">
              {selectedColor.name}
            </span>
          </span>
          <div className="flex flex-wrap gap-4">
            {product.colors.map((color) => (
              <button
                key={color.name}
                onClick={() => setSelectedColor(color)}
                className={`group relative w-10 h-10 rounded-full shadow-sm transition-all duration-300 focus:outline-none ${
                  selectedColor.name === color.name
                    ? "ring-2 ring-offset-2 ring-[#0071e3] scale-110"
                    : "hover:scale-110 hover:ring-2 hover:ring-offset-2 hover:ring-gray-300"
                }`}
                style={{ backgroundColor: color.hex }}
                aria-label={`Seleccionar color ${color.name}`}
              >
                {/* Indicador sutil de selección */}
                {selectedColor.name === color.name && (
                  <motion.div
                    layoutId="activeColor"
                    className="absolute inset-0 rounded-full border-2 border-white/20"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 3. SELECTOR DE ALMACENAMIENTO (Botones) */}
      {product.storage && product.storage.length > 0 && (
        <div className="space-y-4">
          <span className="text-sm font-bold text-[#1d1d1f] uppercase tracking-wide">
            Capacidad:{" "}
            <span className="text-gray-500 font-normal normal-case ml-1">
              {selectedStorage.capacity}
            </span>
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {product.storage.map((storage) => (
              <button
                key={storage.capacity}
                onClick={() => setSelectedStorage(storage)}
                className={`py-4 px-4 rounded-2xl border text-sm font-semibold transition-all duration-200 ${
                  selectedStorage.capacity === storage.capacity
                    ? "border-[#0071e3] text-[#0071e3] bg-blue-50/50 shadow-inner"
                    : "border-gray-200 text-[#1d1d1f] hover:border-[#0071e3] hover:text-[#0071e3] bg-white"
                }`}
              >
                {storage.capacity}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 4. BOTÓN PRINCIPAL (CTA) */}
      <div className="pt-6">
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={handleAddToCart}
          className={`w-full py-4 rounded-full font-bold text-lg flex items-center justify-center gap-3 transition-all duration-300 shadow-lg ${
            isAdded
              ? "bg-[#28c840] text-white shadow-green-500/30 cursor-default"
              : "bg-[#0071e3] hover:bg-[#0077ED] text-white shadow-blue-500/30 hover:shadow-blue-500/50"
          }`}
        >
          {isAdded ? (
            <>
              <Check size={22} strokeWidth={3} />
              <span>¡Agregado a la bolsa!</span>
            </>
          ) : (
            <>
              <ShoppingBag size={22} />
              <span>Añadir a la Bolsa</span>
            </>
          )}
        </motion.button>

        {/* Microcopy de confianza */}
        <div className="mt-4 flex items-center justify-center gap-6 text-xs text-gray-500 font-medium">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Stock disponible
          </span>
          <span>Envío a todo el Perú 🇵🇪</span>
        </div>
      </div>
    </div>
  );
}
