"use client";

import { useCart } from "@/context/CartContext";
import { X, Trash2, MessageCircle } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function CartSidebar() {
  const { cart, isCartOpen, toggleCart, removeFromCart, total } = useCart();

  // Generar mensaje de WhatsApp con TODA la lista
  const handleCheckout = () => {
    const phoneNumber = "51945341516";
    let message = "Hola iClub Perú, deseo comprar los siguientes productos:\n\n";
    cart.forEach((item) => {
      message += `- ${item.name} (${item.price})\n`;
    });
    message += `\n*TOTAL A PAGAR: S/ ${total.toLocaleString("en-US")}*\n\n¿Me confirman stock y cuenta bcp?`;
    
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Fondo oscuro (Overlay) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            className="fixed inset-0 bg-black/40 z-[60] backdrop-blur-sm"
          />

          {/* Panel Lateral (Carrito) */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 h-full w-full md:w-[450px] bg-white z-[70] shadow-2xl flex flex-col"
          >
            {/* Cabecera */}
            <div className="p-6 flex justify-between items-center border-b">
              <h2 className="text-xl font-semibold text-[#1d1d1f]">Tu Bolsa ({cart.length})</h2>
              <button onClick={toggleCart} className="p-2 hover:bg-gray-100 rounded-full">
                <X size={24} />
              </button>
            </div>

            {/* Lista de Productos */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
              {cart.length === 0 ? (
                <div className="text-center text-gray-500 mt-20">
                  <p>Tu bolsa está vacía.</p>
                  <button onClick={toggleCart} className="mt-4 text-[#0071e3] hover:underline">
                    Seguir comprando
                  </button>
                </div>
              ) : (
                cart.map((item, index) => (
                  // Usamos index como key por si agrega el mismo producto 2 veces
                  <div key={`${item.id}-${index}`} className="flex gap-4 items-center">
                    <div className="relative w-20 h-20 bg-[#f5f5f7] rounded-xl flex-shrink-0">
                      <Image 
                        src={item.image} 
                        alt={item.name} 
                        fill 
                        className="object-contain p-2 mix-blend-multiply" 
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-[#1d1d1f] text-sm">{item.name}</h3>
                      <p className="text-gray-500 text-sm">{item.price}</p>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Pie de Carrito (Total + WhatsApp) */}
            {cart.length > 0 && (
              <div className="p-6 border-t bg-[#fbfbfd]">
                <div className="flex justify-between items-center mb-6 text-xl font-bold text-[#1d1d1f]">
                  <span>Total</span>
                  <span>S/ {total.toLocaleString("en-US")}</span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full py-4 rounded-full bg-[#25D366] text-white font-semibold text-lg hover:bg-[#1ebc57] transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                  <MessageCircle size={24} />
                  Pedir por WhatsApp
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}