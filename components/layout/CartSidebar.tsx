"use client";

import { useCart } from "@/context/CartContext";
import {
  X,
  Trash2,
  ShoppingBag,
  ArrowRight,
  Minus,
  Plus,
  ShieldCheck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef } from "react";

export default function CartSidebar() {
  const { cart, isCartOpen, toggleCart, removeFromCart, addToCart, cartTotal } =
    useCart();
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Cerrar al hacer click fuera (UX Essential)
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

  // Bloquear scroll del body cuando el carrito está abierto
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isCartOpen]);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* OVERLAY (Fondo Oscuro) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
          />

          {/* SIDEBAR */}
          <motion.div
            ref={sidebarRef}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white/90 backdrop-blur-xl shadow-2xl z-[70] border-l border-white/20 flex flex-col"
          >
            {/* HEADER */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100/50">
              <h2 className="text-xl font-semibold text-[#1d1d1f] flex items-center gap-2">
                Bolsa de Compras{" "}
                <span className="text-gray-400 text-sm font-medium">
                  ({cart.length})
                </span>
              </h2>
              <button
                onClick={toggleCart}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-black"
              >
                <X size={24} />
              </button>
            </div>

            {/* BODY (Lista de Productos) */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 text-gray-400">
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-2">
                    <ShoppingBag size={32} className="text-gray-300" />
                  </div>
                  <p className="text-lg font-medium text-gray-900">
                    Tu bolsa está vacía
                  </p>
                  <p className="text-sm max-w-[200px]">
                    Descubre lo último en tecnología Apple.
                  </p>
                  <button
                    onClick={toggleCart}
                    className="mt-4 text-blue-600 font-medium hover:underline"
                  >
                    Seguir comprando
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={item.id}
                    className="flex gap-4"
                  >
                    {/* Imagen Miniatura */}
                    <div className="relative w-20 h-20 bg-[#f5f5f7] rounded-xl flex-shrink-0 p-2">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-contain"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-sm font-semibold text-[#1d1d1f] leading-tight line-clamp-2">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {/* BLINDAJE ANTI-NAN */}
                          S/{" "}
                          {(item.price || 0).toLocaleString("es-PE", {
                            minimumFractionDigits: 2,
                          })}
                        </p>
                      </div>

                      {/* Controles Cantidad */}
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-3 bg-gray-50 rounded-full px-2 py-1">
                          {/* Botón Menos */}
                          <button
                            className="p-1 hover:bg-white rounded-full transition-colors disabled:opacity-50"
                            disabled={item.quantity <= 1}
                          >
                            <Minus size={14} className="text-gray-600" />
                          </button>

                          <span className="text-xs font-medium text-gray-600 w-4 text-center">
                            {item.quantity}
                          </span>

                          {/* Botón Más */}
                          <button
                            onClick={() => addToCart(item)}
                            className="p-1 hover:bg-white rounded-full transition-colors"
                          >
                            <Plus size={14} className="text-gray-600" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-600 hover:bg-red-50 p-1.5 rounded-full transition-colors"
                          title="Eliminar"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* FOOTER (Totales y Checkout) */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-gray-100 bg-white/50 backdrop-blur-md">
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Subtotal</span>
                    <span>
                      S/{" "}
                      {(cartTotal || 0).toLocaleString("es-PE", {
                        minimumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between text-xl font-semibold text-[#1d1d1f] pt-2 border-t border-gray-100">
                    <span>Total</span>
                    <span>
                      S/{" "}
                      {(cartTotal || 0).toLocaleString("es-PE", {
                        minimumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                </div>

                {/* BOTÓN: Llevamos al Checkout */}
                <Link href="/checkout" onClick={toggleCart}>
                  <button className="w-full bg-[#0071e3] text-white py-4 rounded-full font-medium text-lg hover:bg-[#0077ED] transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 active:scale-[0.98]">
                    Continuar
                    <ArrowRight size={20} />
                  </button>
                </Link>

                <p className="mt-4 flex justify-center gap-4 text-[10px] text-gray-400">
                  <span className="flex items-center gap-1">
                    <ShieldCheck size={12} /> Compra Segura
                  </span>
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
