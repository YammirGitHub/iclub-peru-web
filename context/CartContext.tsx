"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";

// Definimos qué datos guardaremos de cada producto
type CartItem = {
  id: string;
  name: string;
  price: string;
  image: string;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (product: CartItem) => void;
  removeFromCart: (id: string) => void;
  toggleCart: () => void;
  isCartOpen: boolean;
  total: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Función para agregar
  const addToCart = (product: CartItem) => {
    setCart((prev) => [...prev, product]);
    setIsCartOpen(true); // Abre el carrito automáticamente al agregar
  };

  // Función para quitar
  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  // Calcular Total (limpiando el símbolo "S/" y las comas)
  const total = cart.reduce((acc, item) => {
    const priceNumber = parseFloat(item.price.replace("S/", "").replace(",", "").trim());
    return acc + (isNaN(priceNumber) ? 0 : priceNumber);
  }, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, toggleCart, isCartOpen, total }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart debe usarse dentro de un CartProvider");
  return context;
};