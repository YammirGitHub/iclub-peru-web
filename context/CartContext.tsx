"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Product, ProductColor, StorageOption } from "@/lib/products";

// 1. DEFINICIÓN ROBUSTA DEL ITEM DEL CARRITO
export interface CartItem extends Product {
  cartItemId: string; // ID único para la variante (ej: iphone-15-azul-128gb)
  quantity: number;
  selectedColor?: ProductColor;
  selectedSize?: { name: string; label: string; priceModifier: number };
  selectedStorage?: StorageOption;
  finalPrice: number; // El precio real calculado (Base + Extras)
}

interface CartContextType {
  cart: CartItem[];
  isCartOpen: boolean;
  addToCart: (
    product: Product,
    options: {
      color?: ProductColor;
      size?: any;
      storage?: StorageOption;
      price: number;
    }
  ) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  toggleCart: () => void;
  clearCart: () => void;
  total: number;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Cargar carrito y limpiar datos corruptos antiguos
  useEffect(() => {
    setIsClient(true);
    const savedCart = localStorage.getItem("iclub-cart");
    if (savedCart) {
      try {
        const parsed = JSON.parse(savedCart);
        // Validación simple: si el item no tiene 'finalPrice', es data vieja y la ignoramos
        const validItems = parsed.filter(
          (item: any) => item.finalPrice !== undefined
        );
        setCart(validItems);
      } catch (e) {
        console.error("Error al cargar el carrito:", e);
        localStorage.removeItem("iclub-cart"); // Limpiar si está corrupto
      }
    }
  }, []);

  // Guardar en localStorage
  useEffect(() => {
    if (isClient) {
      localStorage.setItem("iclub-cart", JSON.stringify(cart));
    }
  }, [cart, isClient]);

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  // --- LÓGICA DE AGREGAR ---
  const addToCart = (
    product: Product,
    options: {
      color?: ProductColor;
      size?: any;
      storage?: StorageOption;
      price: number;
    }
  ) => {
    // Generamos un ID único combinando producto + opciones
    const optionsKey = `${product.id}-${options.color?.name || "base"}-${
      options.size?.name || "base"
    }-${options.storage?.capacity || "base"}`;

    setCart((prev) => {
      const existing = prev.find((item) => item.cartItemId === optionsKey);

      if (existing) {
        // Si ya existe idéntico, sumamos cantidad
        return prev.map((item) =>
          item.cartItemId === optionsKey
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      // Si es nuevo, lo creamos
      return [
        ...prev,
        {
          ...product,
          cartItemId: optionsKey,
          quantity: 1,
          selectedColor: options.color,
          selectedSize: options.size,
          selectedStorage: options.storage,
          finalPrice: options.price, // ¡Importante! Guardamos el precio final calculado
        },
      ];
    });

    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.cartItemId === cartItemId
          ? { ...item, quantity: Math.max(1, quantity) }
          : item
      )
    );
  };

  const clearCart = () => setCart([]);

  // Cálculos
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const total = cart.reduce(
    (acc, item) => acc + item.finalPrice * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        isCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        toggleCart,
        clearCart,
        total,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context)
    throw new Error("useCart debe usarse dentro de un CartProvider");
  return context;
};
