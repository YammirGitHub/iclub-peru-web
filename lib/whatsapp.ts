// src/lib/whatsapp.ts
import { CartItem } from "@/context/CartContext";

// Definimos qué datos esperamos del cliente
export interface CustomerData {
  name: string;
  phone: string;
  city: string;
  address: string;
  paymentMethod?: string; // Opcional
}

export const generateWhatsAppLink = (
  cart: CartItem[],
  total: number,
  customer?: CustomerData
) => {
  const phoneNumber = "51945341516"; // Tu número oficial
  const baseUrl = "https://wa.me/";
  let message = "";

  // 1. Encabezado: Si hay datos de cliente, es un pedido firme.
  if (customer) {
    message += `👋 Hola iClub, soy *${customer.name}*.\n`;
    message += `Deseo confirmar el siguiente pedido web:\n\n`;
    message += `📍 *DATOS DE ENVÍO:*\n`;
    message += `   • Ciudad: ${customer.city}\n`;
    message += `   • Dirección: ${customer.address}\n`;
    message += `   • Teléfono: ${customer.phone}\n`;
    if (customer.paymentMethod) message += `   • Pago: ${customer.paymentMethod}\n`;
    message += `\n`;
  } else {
    // Si viene del carrito directo (opcional), saludo simple
    message += `👋 Hola iClub, estoy interesado en estos productos:\n\n`;
  }

  // 2. Detalle del Carrito
  message += `🛒 *RESUMEN DEL PEDIDO:*\n`;
  cart.forEach((item) => {
    const itemTotal = (item.price || 0) * item.quantity;
    message += `   📱 ${item.quantity}x ${item.title}\n`;
    message += `      (Subtotal: S/ ${itemTotal.toLocaleString("es-PE")})\n`;
  });

  // 3. Total y Cierre
  message += `\n💰 *TOTAL A PAGAR: S/ ${total.toLocaleString("es-PE")}*\n\n`;
  
  if (customer) {
    message += `Quedo a la espera de las cuentas bancarias para transferir. Gracias. 🚀`;
  } else {
    message += `¿Me confirman stock y precio de envío?`;
  }

  return `${baseUrl}${phoneNumber}?text=${encodeURIComponent(message)}`;
};