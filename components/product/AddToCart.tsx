"use client";
import { useState } from "react";
import { Product } from "@/lib/products";
import { useCart } from "@/context/CartContext";
import { Check, ShoppingBag, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function AddToCart({ product }: { product: Product }) {
  const { addToCart } = useCart();

  // 1. Inicialización defensiva (Evita errores si arrays están vacíos)
  const [selectedColor, setSelectedColor] = useState(
    product.colors?.[0] || { name: "Estándar", hex: "#000000" }
  );

  const [selectedStorage, setSelectedStorage] = useState(
    product.storage?.[0] || { capacity: "Única", price: product.price }
  );

  const [isAdded, setIsAdded] = useState(false);

  // 2. Lógica de Precio Seguro (Anti-NaN)
  // Prioridad: Precio del almacenamiento > Precio base del producto > 0
  const safePrice = Number(selectedStorage?.price || product.price || 0);

  const handleAddToCart = () => {
    addToCart({
      ...product,
      id: `${product.id}-${selectedStorage.capacity}-${selectedColor.name}`, // ID Único compuesto
      title: `${product.name} - ${selectedStorage.capacity} (${selectedColor.name})`,
      price: safePrice, // Usamos el precio seguro
      quantity: 1, // Siempre empieza en 1
    });

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2500);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* VISUALIZACIÓN DE PRECIO */}
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

      {/* ... (Mantén tus selectores de Color y Storage igual que antes) ... */}

      {/* Si necesitas el código de los selectores pídemelo, pero asumo que ya los tienes bien */}

      {/* BOTÓN DE ACCIÓN */}
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
      </div>
    </div>
  );
}
