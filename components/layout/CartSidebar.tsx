"use client";

import { useEffect, useRef } from "react";
import { useCart } from "@/context/CartContext";
import {
  X,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function CartSidebar() {
  const {
    cart,
    isCartOpen,
    toggleCart,
    removeFromCart,
    updateQuantity,
    total,
  } = useCart();

  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        isCartOpen
      ) {
        toggleCart();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isCartOpen, toggleCart]);

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isCartOpen]);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity"
          />

          <motion.div
            ref={sidebarRef}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[450px] bg-white shadow-2xl z-50 flex flex-col border-l border-gray-100"
          >
            {/* Header */}
            <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-10">
              <div className="flex items-center gap-3">
                <div className="bg-black text-white p-2 rounded-full">
                  <ShoppingBag size={20} />
                </div>
                <h2 className="text-xl font-bold text-[#1d1d1f] tracking-tight">
                  Tu Bolsa ({cart.length})
                </h2>
              </div>
              <button
                onClick={toggleCart}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-black"
              >
                <X size={24} />
              </button>
            </div>

            {/* Lista de Productos */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-60">
                  <ShoppingBag size={64} className="text-gray-300" />
                  <p className="text-lg font-medium text-gray-500">
                    Tu bolsa está vacía
                  </p>
                  <button
                    onClick={toggleCart}
                    className="text-[#F97316] font-medium hover:underline" // Naranja Marca
                  >
                    Seguir comprando
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <motion.div
                    layout
                    key={item.cartItemId}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-4 group relative bg-white p-2 rounded-2xl transition-all"
                  >
                    {/* Imagen */}
                    <div className="relative w-24 h-24 bg-[#F5F5F7] rounded-2xl flex items-center justify-center shrink-0 border border-gray-100">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-contain p-2"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="font-semibold text-[#1d1d1f] text-sm leading-snug line-clamp-2 pr-4">
                            {item.name}
                          </h3>
                          <button
                            onClick={() => removeFromCart(item.cartItemId)}
                            className="text-gray-400 hover:text-red-500 transition-colors p-1 -mt-1 -mr-1"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>

                        <div className="text-xs text-gray-500 mt-1 space-y-0.5">
                          {item.selectedSize && (
                            <p>{item.selectedSize.label}</p>
                          )}
                          {item.selectedColor && (
                            <p>{item.selectedColor.name}</p>
                          )}
                          {item.selectedStorage && (
                            <p>{item.selectedStorage.capacity}</p>
                          )}
                        </div>
                      </div>

                      <div className="flex justify-between items-end mt-2">
                        <div className="flex items-center gap-3 bg-[#F5F5F7] rounded-full px-3 py-1.5 h-8">
                          <button
                            onClick={() => {
                              if (item.quantity > 1) {
                                updateQuantity(
                                  item.cartItemId,
                                  item.quantity - 1
                                );
                              } else {
                                removeFromCart(item.cartItemId);
                              }
                            }}
                            className="text-gray-500 hover:text-black transition-colors disabled:opacity-30"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="text-sm font-semibold w-4 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.cartItemId, item.quantity + 1)
                            }
                            className="text-gray-500 hover:text-black transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <p className="font-bold text-[#1d1d1f]">
                          S/{" "}
                          {(item.finalPrice * item.quantity).toLocaleString(
                            "es-PE"
                          )}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer Carrito */}
            {cart.length > 0 && (
              <div className="p-6 bg-[#F5F5F7] border-t border-gray-200">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-500 font-medium">Subtotal</span>
                  <span className="text-2xl font-bold text-[#1d1d1f] tracking-tight">
                    S/ {total.toLocaleString("es-PE")}
                  </span>
                </div>
                <p className="text-xs text-gray-400 mb-4 text-center">
                  Gastos de envío e impuestos calculados en el checkout.
                </p>
                <Link
                  href="/checkout"
                  onClick={toggleCart}
                  // 👇 BOTÓN PRINCIPAL NARANJA
                  className="w-full bg-[#F97316] text-white py-4 rounded-full font-bold text-lg hover:bg-[#ea580c] transition-all flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 active:scale-95"
                >
                  Continuar <ChevronRight size={20} />
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}