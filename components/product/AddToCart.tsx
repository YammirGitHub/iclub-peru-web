"use client";
import { useState } from "react";
import { Product, ProductColor } from "@/lib/products";
import { useCart } from "@/context/CartContext";
import { Check, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";

interface Props {
  product: Product;
  onImageChange: (newSrc: string) => void; // Función del padre para cambiar la foto
}

export default function AddToCart({ product, onImageChange }: Props) {
  const { addToCart } = useCart();

  // Estados Iniciales
  const [selectedColor, setSelectedColor] = useState(
    product.colors?.[0] || { name: "Estándar", hex: "#000000" }
  );

  const [selectedStorage, setSelectedStorage] = useState(
    product.storage?.[0] || { capacity: "Única", price: product.price }
  );

  const [isAdded, setIsAdded] = useState(false);

  // Precio seguro y formateado
  const finalPrice = selectedStorage?.price || product.price;
  const formatMoney = (amount: number) =>
    new Intl.NumberFormat("es-PE", {
      style: "currency",
      currency: "PEN",
      minimumFractionDigits: 0,
    }).format(amount);

  // --- LÓGICA DE CAMBIO DE COLOR E IMAGEN ---
  const handleColorSelect = (color: ProductColor) => {
    setSelectedColor(color);

    // LÓGICA SENIOR:
    // 1. Verificamos si el color tiene una imagen específica asignada.
    if (color.image) {
      onImageChange(color.image);
    } else {
      // 2. Fallback: Si no tiene, volvemos a la imagen principal del producto.
      onImageChange(product.image);
    }
  };

  const handleAddToCart = () => {
    addToCart({
      id: `${product.id}-${selectedStorage.capacity}-${selectedColor.name}`,
      title: `${product.name} - ${selectedStorage.capacity} (${selectedColor.name})`,
      price: finalPrice,
      // Usamos la imagen específica del color si existe, si no, la general
      image: selectedColor.image || product.image,
      quantity: 1,
    });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* 1. SELECTOR DE PRECIO */}
      <div className="border-b border-gray-100 pb-8">
        <p className="text-sm text-gray-500 font-medium mb-1">Precio Total</p>

        <div className="flex items-baseline gap-3">
          {/* Precio Actual (Grande y Dinámico) */}
          <span className="text-4xl lg:text-5xl font-semibold text-[#1d1d1f] tracking-tight">
            {formatMoney(finalPrice)}
          </span>

          {/* Precio Anterior (Tachado) */}
          {/* Se muestra si existe precio original y es mayor al actual */}
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-lg text-gray-400 line-through decoration-gray-400/50">
              {formatMoney(
                // Ajuste dinámico: Si el usuario elige más almacenamiento, sube también el precio tachado
                product.originalPrice + (finalPrice - product.price)
              )}
            </span>
          )}
        </div>

        <p className="text-xs text-gray-400 mt-2">
          Incluye IGV y garantía oficial de 1 año.
        </p>
      </div>
      {/* 2. SELECTOR DE ACABADO */}
      {product.colors && product.colors.length > 0 && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-bold text-[#1d1d1f]">Acabado</span>
            <span className="text-sm text-gray-500 font-medium">
              {selectedColor.name}
            </span>
          </div>

          <div className="flex flex-wrap gap-4">
            {product.colors.map((color) => (
              <button
                key={color.name}
                onClick={() => handleColorSelect(color)}
                className={`
                  relative w-12 h-12 rounded-full transition-all duration-300
                  ${
                    selectedColor.name === color.name
                      ? "scale-110"
                      : "hover:scale-105 opacity-80 hover:opacity-100"
                  }
                `}
                title={color.name}
              >
                {/* El círculo de color */}
                <span
                  className="absolute inset-0 rounded-full shadow-sm border border-black/10"
                  style={{ backgroundColor: color.hex }}
                />

                {/* El anillo de selección (Doble borde estilo Apple) */}
                {selectedColor.name === color.name && (
                  <span className="absolute -inset-1 rounded-full border-[2px] border-[#0071e3]" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 3. SELECTOR DE CAPACIDAD */}
      {product.storage && product.storage.length > 0 && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-bold text-[#1d1d1f]">
              Almacenamiento
            </span>
            <span className="text-sm text-gray-500 font-medium">
              {selectedStorage.capacity}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {product.storage.map((storage) => (
              <button
                key={storage.capacity}
                onClick={() => setSelectedStorage(storage)}
                className={`
                  py-4 px-4 rounded-xl border text-sm transition-all duration-200 flex flex-col items-start gap-1
                  ${
                    selectedStorage.capacity === storage.capacity
                      ? "border-[#0071e3] ring-1 ring-[#0071e3] bg-white"
                      : "border-gray-200 hover:border-gray-400 bg-white"
                  }
                `}
              >
                <span
                  className={`font-semibold ${
                    selectedStorage.capacity === storage.capacity
                      ? "text-[#0071e3]"
                      : "text-[#1d1d1f]"
                  }`}
                >
                  {storage.capacity}
                </span>
                {storage.price > product.price && (
                  <span className="text-[10px] text-gray-500">
                    + {formatMoney(storage.price - product.price)}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 4. BOTÓN DE ACCIÓN */}
      <div className="pt-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleAddToCart}
          className={`
            w-full py-5 rounded-full font-semibold text-lg flex items-center justify-center gap-3 transition-all shadow-xl shadow-blue-500/10
            ${
              isAdded
                ? "bg-green-500 text-white"
                : "bg-[#0071e3] hover:bg-[#0077ED] text-white"
            }
          `}
        >
          {isAdded ? (
            <>
              <Check size={22} className="animate-bounce" /> Agregado
            </>
          ) : (
            <>
              <ShoppingBag size={22} /> Añadir a la Bolsa
            </>
          )}
        </motion.button>
        <p className="text-center text-[11px] text-gray-400 mt-4 flex items-center justify-center gap-2">
          Envío gratis a todo el Perú en pedidos mayores a S/ 500
        </p>
      </div>
    </div>
  );
}
