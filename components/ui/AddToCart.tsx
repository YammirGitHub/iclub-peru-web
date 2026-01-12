"use client";

import { useCart } from "@/context/CartContext";
import { Product } from "@/lib/products";
import { ShoppingBag } from "lucide-react";
import { useState } from "react";

export default function AddToCart({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = () => {
    // CORRECCIÓN 1: La imagen está en la raíz del producto, no dentro de colores
    const productImage = product.image || "/images/placeholder.png";

    addToCart({
      id: product.id,
      title: product.name, // CORRECCIÓN 2: Usamos 'name' del producto (mapeado a 'title' del carrito)
      price: product.price, // CORRECCIÓN 3: Usamos 'price' en lugar de 'basePrice'
      image: productImage,
      quantity: 1,
    });

    // Efecto visual de "Agregado"
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <button
      onClick={handleAdd}
      className={`
        mt-8 w-full md:w-auto px-10 py-4 rounded-full font-medium text-lg flex items-center justify-center gap-2 transition-all duration-300
        ${
          isAdded
            ? "bg-green-600 text-white hover:bg-green-700"
            : "bg-[#0071e3] text-white hover:bg-[#0077ED] hover:scale-[1.02]"
        }
      `}
    >
      {isAdded ? (
        <>¡Agregado!</>
      ) : (
        <>
          Agregar a la bolsa <ShoppingBag size={20} />
        </>
      )}
    </button>
  );
}
