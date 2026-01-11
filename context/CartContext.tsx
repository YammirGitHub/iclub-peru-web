"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

// 1. Definimos cómo se ve un producto DENTRO del carrito
export interface CartItem {
  id: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

// 2. Definimos qué funciones y datos tendrá nuestro Contexto (AQUÍ FALTABA addToCart)
interface CartContextType {
  cart: CartItem[];
  isCartOpen: boolean;
  addToCart: (product: CartItem) => void;
  removeFromCart: (id: string) => void;
  toggleCart: () => void;
  cartCount: number; // Para mostrar el numerito en el icono
  cartTotal: number; // Para mostrar el precio total
}

// Creamos el contexto
const CartContext = createContext<CartContextType | undefined>(undefined);

// 3. El Proveedor (La lógica real)
export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Cargar carrito desde localStorage al iniciar (Opcional pero recomendado)
  useEffect(() => {
    const savedCart = localStorage.getItem("iclub-cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Guardar en localStorage cada vez que cambia el carrito
  useEffect(() => {
    localStorage.setItem("iclub-cart", JSON.stringify(cart));
  }, [cart]);

  // --- FUNCIONES ---

  const addToCart = (product: CartItem) => {
    setCart((prevCart) => {
      // ¿El producto ya está en el carrito?
      const existingItem = prevCart.find((item) => item.id === product.id);

      if (existingItem) {
        // Si ya existe, le sumamos 1 a la cantidad
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Si no existe, lo agregamos nuevo
        return [...prevCart, product];
      }
    });
    // Abrimos el carrito automáticamente al agregar (Opcional, estilo Apple)
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  // Cálculos automáticos
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        isCartOpen,
        addToCart,
        removeFromCart,
        toggleCart,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// 4. Hook personalizado para usar el carrito en cualquier parte
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe usarse dentro de un CartProvider");
  }
  return context;
};
