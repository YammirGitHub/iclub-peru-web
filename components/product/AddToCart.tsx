"use client";
import { useState } from "react";
import { Product } from "@/lib/products";
import { useCart } from "@/context/CartContext";
import { Check, ShoppingBag, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function AddToCart({ product }: { product: Product }) {
  const { addToCart } = useCart();

  // 1. Estados iniciales seguros
  const [selectedColor, setSelectedColor] = useState(
    product.colors?.[0] || { name: "Estándar", hex: "#000000" }
  );

  const [selectedStorage, setSelectedStorage] = useState(
    product.storage?.[0] || { capacity: "Única", price: product.price }
  );

  const [isAdded, setIsAdded] = useState(false);

  // 2. Lógica de Precio Seguro (Anti-NaN)
  const safePrice = Number(selectedStorage?.price || product.price || 0);

  const handleAddToCart = () => {
    addToCart({
      ...product,
      // ID ÚNICO: Permite tener el mismo iPhone en colores distintos en el carrito
      id: `${product.id}-${
        selectedStorage.capacity
      }-${selectedColor.name.replace(/\s+/g, "")}`,
      title: `${product.name} - ${selectedStorage.capacity} (${selectedColor.name})`,
      price: safePrice,
      quantity: 1,
    });

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2500);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* SECCIÓN PRECIO */}
      <div className="border-b border-gray-100 pb-6">
        <div className="flex items-end gap-3">
          <span className="text-4xl font-bold tracking-tight text-[#1d1d1f]">
            S/ {safePrice.toLocaleString("es-PE")}
          </span>
        </div>
        <p className="text-sm text-gray-500 mt-2 font-medium flex items-center gap-1">
          <ShieldCheck size={16} className="text-green-600" />
          Garantía oficial iClub Perú. Incluye IGV.
        </p>
      </div>

      {/* SELECCIÓN DE COLOR */}
      {product.colors && product.colors.length > 0 && (
        <div className="space-y-4">
          <span className="text-sm font-bold text-[#1d1d1f] uppercase tracking-wide">
            Acabado:{" "}
            <span className="text-gray-500 font-normal ml-1">
              {selectedColor.name}
            </span>
          </span>
          <div className="flex flex-wrap gap-4">
            {product.colors.map((color) => (
              <button
                key={color.name}
                onClick={() => setSelectedColor(color)}
                className={`w-10 h-10 rounded-full shadow-sm transition-all duration-300 focus:outline-none ${
                  selectedColor.name === color.name
                    ? "ring-2 ring-offset-2 ring-[#0071e3] scale-110"
                    : "hover:scale-110 hover:ring-2 hover:ring-gray-300"
                }`}
                style={{ backgroundColor: color.hex }}
              />
            ))}
          </div>
        </div>
      )}

      {/* SELECCIÓN DE CAPACIDAD */}
      {product.storage && product.storage.length > 0 && (
        <div className="space-y-4">
          <span className="text-sm font-bold text-[#1d1d1f] uppercase tracking-wide">
            Capacidad:{" "}
            <span className="text-gray-500 font-normal ml-1">
              {selectedStorage.capacity}
            </span>
          </span>
          <div className="grid grid-cols-3 gap-3">
            {product.storage.map((storage) => (
              <button
                key={storage.capacity}
                onClick={() => setSelectedStorage(storage)}
                className={`py-3 px-2 rounded-xl border text-sm font-semibold transition-all ${
                  selectedStorage.capacity === storage.capacity
                    ? "border-[#0071e3] text-[#0071e3] bg-blue-50/30"
                    : "border-gray-200 hover:border-[#0071e3]"
                }`}
              >
                {storage.capacity}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* BOTÓN CTA */}
      <div className="pt-6">
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={handleAddToCart}
          className={`w-full py-4 rounded-full font-bold text-lg flex items-center justify-center gap-3 transition-all shadow-lg ${
            isAdded
              ? "bg-[#28c840] text-white"
              : "bg-[#0071e3] hover:bg-[#0077ED] text-white"
          }`}
        >
          {isAdded ? (
            <>
              <Check size={22} /> ¡Agregado!
            </>
          ) : (
            <>
              <ShoppingBag size={22} /> Añadir a la Bolsa
            </>
          )}
        </motion.button>
      </div>
    </div>
  );
}
