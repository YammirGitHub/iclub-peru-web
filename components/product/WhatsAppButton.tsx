"use client";

import { MessageCircle } from "lucide-react";

interface WhatsAppButtonProps {
  productName: string;
  price: string;
  className?: string;
}

export default function WhatsAppButton({ productName, price, className }: WhatsAppButtonProps) {
  // Número real de tu PDF (Pág 13): 945 341 516
  const phoneNumber = "51945341516"; 
  
  // Mensaje automático
  const message = `Hola iClub Perú, estoy interesado en el ${productName} de ${price}. ¿Tienen stock disponible?`;
  
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

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