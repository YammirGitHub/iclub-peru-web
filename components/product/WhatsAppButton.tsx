"use client";

import { MessageCircle } from "lucide-react";
import { SHOP_CONFIG } from "@/lib/constants"; // 👈 Conexión al cerebro

interface WhatsAppButtonProps {
  productName: string;
  price: string;
  className?: string;
}

export default function WhatsAppButton({
  productName,
  price,
  className,
}: WhatsAppButtonProps) {
  // Generamos el mensaje dinámico
  const message = `Hola iClub, estoy interesado en el ${productName} de ${price}. ¿Tienen stock?`;

  // URL usando la constante centralizada
  const whatsappUrl = `${SHOP_CONFIG.whatsappUrl}${SHOP_CONFIG.phone}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center justify-center gap-2 bg-[#25D366] text-white font-semibold rounded-full hover:bg-[#128C7E] transition-all shadow-lg hover:shadow-green-500/30 active:scale-95 ${className}`}
    >
      <MessageCircle size={20} fill="white" className="text-white" />
      Comprar por WhatsApp
    </a>
  );
}
