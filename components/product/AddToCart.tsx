"use client";
import { useState } from "react";
import { Product, ProductColor } from "@/lib/products";
import { useCart } from "@/context/CartContext";
import { Check, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";

interface Props {
  product: Product;
  onImageChange: (newSrc: string) => void;
}

export default function AddToCart({ product, onImageChange }: Props) {
  const { addToCart } = useCart();

  const [selectedSize, setSelectedSize] = useState(
    product.sizes ? product.sizes[0] : null
  );
  const [selectedColor, setSelectedColor] = useState(
    product.colors?.[0] || { name: "Estándar", hex: "#000000" }
  );
  const [selectedStorage, setSelectedStorage] = useState(
    product.storage?.[0] || { capacity: "Única", price: product.price }
  );
  const [isAdded, setIsAdded] = useState(false);

  const basePrice = selectedStorage ? selectedStorage.price : product.price;
  const sizeExtra = selectedSize ? selectedSize.priceModifier : 0;
  const finalPrice = basePrice + sizeExtra;

  const formatMoney = (amount: number) =>
    new Intl.NumberFormat("es-PE", {
      style: "currency",
      currency: "PEN",
      minimumFractionDigits: 0,
    }).format(amount);

  const handleColorSelect = (color: ProductColor) => {
    setSelectedColor(color);
    if (color.image) onImageChange(color.image);
    else onImageChange(product.image);
  };

  const handleAddToCart = () => {
    addToCart(product, {
      color: selectedColor || undefined,
      size: selectedSize || undefined,
      storage: selectedStorage || undefined,
      price: finalPrice,
    });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Precio */}
      <div className="border-b border-gray-100 pb-8">
        <p className="text-sm text-gray-500 font-medium mb-1">Precio Total</p>
        <div className="flex items-baseline gap-3">
          <span className="text-4xl lg:text-5xl font-semibold text-[#1d1d1f] tracking-tight">
            {formatMoney(finalPrice)}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-lg text-gray-400 line-through decoration-gray-400/50">
              {formatMoney(product.originalPrice + sizeExtra)}
            </span>
          )}
        </div>
      </div>

      {/* Selectores (Resumidos para brevedad, mantener tu lógica original) */}
      {product.sizes && (
        <div className="space-y-4">
          <span className="text-sm font-bold text-[#1d1d1f]">Tamaño</span>
          <div className="flex gap-2">
            {product.sizes.map((size) => (
              <button
                key={size.name}
                onClick={() => setSelectedSize(size)}
                className={`px-4 py-2 border rounded-lg transition-all ${
                  selectedSize?.name === size.name
                    ? "border-[#F97316] bg-orange-50 text-[#F97316]"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                {size.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ... (Tus otros selectores de color/storage van aquí igual que antes) ... */}
      {product.colors && (
        <div className="space-y-4">
          {/* ... lógica de colores ... */}
          <div className="flex flex-wrap gap-4">
            {product.colors.map((color) => (
              <button
                key={color.name}
                onClick={() => handleColorSelect(color)}
                className={`relative w-12 h-12 rounded-full transition-all duration-300 ${
                  selectedColor.name === color.name
                    ? "scale-110"
                    : "hover:scale-105 opacity-80 hover:opacity-100"
                }`}
              >
                <span
                  className="absolute inset-0 rounded-full shadow-sm border border-black/10"
                  style={{ backgroundColor: color.hex }}
                />
                {selectedColor.name === color.name && (
                  <span className="absolute -inset-1 rounded-full border-[2px] border-[#F97316]" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {product.storage && (
        <div className="space-y-4">
          {/* ... lógica de storage ... */}
          <div className="grid grid-cols-2 gap-3">
            {product.storage.map((storage) => (
              <button
                key={storage.capacity}
                onClick={() => setSelectedStorage(storage)}
                className={`py-4 px-4 rounded-xl border text-sm transition-all duration-200 flex flex-col items-start gap-1 ${
                  selectedStorage.capacity === storage.capacity
                    ? "border-[#F97316] ring-1 ring-[#F97316] bg-white"
                    : "border-gray-200 hover:border-gray-400 bg-white"
                }`}
              >
                <span
                  className={`font-semibold ${
                    selectedStorage.capacity === storage.capacity
                      ? "text-[#F97316]"
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

      {/* BOTÓN PRINCIPAL: SIEMPRE NARANJA (EL CAMBIO CLAVE) */}
      <div className="pt-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleAddToCart}
          className={`w-full py-5 rounded-full font-semibold text-lg flex items-center justify-center gap-3 transition-all shadow-xl shadow-orange-500/20 ${
            isAdded
              ? "bg-green-500 text-white"
              : "bg-[#F97316] hover:bg-[#ea580c] text-white"
          }`}
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
      </div>
    </div>
  );
}
