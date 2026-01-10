"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

// 1. Definimos la estructura de un producto en el carrito
export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  color: string;    // Importante para diferenciar
  storage: string;  // Importante para diferenciar
  quantity: number;
}

// 2. Definimos qué funciones y datos tendrá el contexto
interface CartContextType {
  cart: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (item: CartItem) => void; // <--- ¡AQUÍ ESTABA EL FALTANTE!
  removeItem: (id: string, color: string, storage: string) => void;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // Cargar carrito del localStorage al iniciar
  useEffect(() => {
    const savedCart = localStorage.getItem("iclub-cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Guardar en localStorage cada vez que cambie el carrito
  useEffect(() => {
    localStorage.setItem("iclub-cart", JSON.stringify(cart));
  }, [cart]);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  const toggleCart = () => setIsOpen((prev) => !prev);

  // --- FUNCIÓN AGREGAR ITEM (addItem) ---
  const addItem = (newItem: CartItem) => {
    setCart((prevCart) => {
      // Buscamos si ya existe el producto con el MISMO id, color y almacenamiento
      const existingItemIndex = prevCart.findIndex(
        (item) => 
          item.id === newItem.id && 
          item.color === newItem.color && 
          item.storage === newItem.storage
      );

      if (existingItemIndex >= 0) {
        // Si existe, aumentamos la cantidad
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += 1;
        return updatedCart;
      } else {
        // Si no existe, lo agregamos nuevo
        return [...prevCart, newItem];
      }
    });
    setIsOpen(true); // Abrir el carrito automáticamente al añadir
  };

  // --- FUNCIÓN ELIMINAR ITEM ---
  const removeItem = (id: string, color: string, storage: string) => {
    setCart((prevCart) => 
      prevCart.filter((item) => 
        !(item.id === id && item.color === color && item.storage === storage)
      )
    );
  };

  // Calcular total
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ 
      cart, 
      isOpen, 
      openCart, 
      closeCart, 
      toggleCart, 
      addItem, // <--- Exportamos la función
      removeItem, 
      total 
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe usarse dentro de un CartProvider");
  }
  return context;
};