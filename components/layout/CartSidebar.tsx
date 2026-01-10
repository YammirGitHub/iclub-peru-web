"use client";

import { useCart } from "@/context/CartContext";
import { X, Trash2, MessageCircle } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function CartSidebar() {
  // 1. CORRECCIÓN: Usamos los nombres correctos definidos en tu nuevo CartContext
  const { cart, isOpen, closeCart, removeItem, total } = useCart();

  // Generar mensaje de WhatsApp detallado
  const handleCheckout = () => {
    const phoneNumber = "51945341516";
    let message = "Hola iClub Perú, deseo comprar los siguientes productos:\n\n";
    
    // 2. MEJORA: El mensaje ahora incluye Color, Almacenamiento y Cantidad
    cart.forEach((item) => {
      message += `• ${item.quantity}x ${item.name} | ${item.color} | ${item.storage} - $${item.price}\n`;
    });
    
    message += `\n*TOTAL A PAGAR: $${total.toLocaleString("en-US")}*\n\n¿Me confirman stock y cuenta BCP?`;
    
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <AnimatePresence>
      {/* 3. CORRECCIÓN: Usamos 'isOpen' en lugar de 'isCartOpen' */}
      {isOpen && (
        <>
          {/* Fondo oscuro (Overlay) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart} // Usamos closeCart para cerrar al dar clic fuera
            className="fixed inset-0 bg-black/40 z-[60] backdrop-blur-sm"
          />

          {/* Panel Lateral (Carrito) */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 h-full w-full md:w-[450px] bg-white/90 backdrop-blur-xl z-[70] shadow-2xl flex flex-col border-l border-gray-200"
          >
            {/* Cabecera */}
            <div className="p-6 flex justify-between items-center border-b border-gray-200/50">
              <h2 className="text-xl font-semibold text-[#1d1d1f]">Tu Bolsa ({cart.length})</h2>
              <button onClick={closeCart} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X size={24} className="text-gray-500" />
              </button>
            </div>

            {/* Lista de Productos */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 space-y-4">
                  <ShoppingBagIcon />
                  <p>Tu bolsa está vacía.</p>
                  <button onClick={closeCart} className="text-[#0071e3] font-medium hover:underline">
                    Seguir comprando
                  </button>
                </div>
              ) : (
                cart.map((item, index) => (
                  // Usamos una key compuesta para que React no se confunda
                  <div key={`${item.id}-${item.color}-${item.storage}-${index}`} className="flex gap-4 items-start">
                    <div className="relative w-20 h-24 bg-[#f5f5f7] rounded-xl flex-shrink-0 overflow-hidden">
                      <Image 
                        src={item.image || "/placeholder.png"} 
                        alt={item.name} 
                        fill 
                        className="object-contain p-2" 
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className="font-semibold text-[#1d1d1f] text-base">{item.name}</h3>
                        <p className="font-bold text-[#1d1d1f]">${item.price * item.quantity}</p>
                      </div>
                      
                      {/* Detalles del producto */}
                      <p className="text-sm text-gray-500 mt-1">{item.color} - {item.storage}</p>
                      <p className="text-sm text-gray-400 mt-1">Cantidad: {item.quantity}</p>
                    </div>
                    
                    {/* 4. CORRECCIÓN: Borrar ítem específico pasando los 3 datos */}
                    <button 
                      onClick={() => removeItem(item.id, item.color, item.storage)}
                      className="text-gray-400 hover:text-red-500 transition-colors p-1"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Pie de Carrito (Total + WhatsApp) */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-gray-200 bg-white">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-lg font-medium text-gray-500">Total estimada</span>
                  <span className="text-2xl font-bold text-[#1d1d1f]">${total.toLocaleString("en-US")}</span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full py-4 rounded-full bg-[#25D366] text-white font-semibold text-lg hover:bg-[#1ebc57] transition-all flex items-center justify-center gap-2 shadow-lg shadow-green-500/20 active:scale-[0.98]"
                >
                  <MessageCircle size={24} />
                  Pedir por WhatsApp
                </button>
                <p className="text-center text-xs text-gray-400 mt-4">
                  Envío calculado en el chat. Garantía iClub incluida.
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Icono simple para bolsa vacía
function ShoppingBagIcon() {
  return (
    <svg 
      className="w-16 h-16 text-gray-200" 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="currentColor" 
      strokeWidth={1.5}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
    </svg>
  );
}