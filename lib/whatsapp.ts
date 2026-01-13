// lib/whatsapp.ts
import { CartItem } from "@/context/CartContext";

// Definimos la estructura de datos del cliente
interface CustomerData {
  name: string;
  phone: string;
  city: string;
  address: string;
  paymentMethod: string;
}

export const generateWhatsAppLink = (cart: CartItem[], total: number, customer?: CustomerData) => {
  const phoneNumber = "51945341516";
  const baseUrl = "https://wa.me/";

  let message = "";

  if (customer) {
    // MENSAJE DETALLADO (Viene del Checkout)
    message += `👋 Hola iClub Perú, soy *${customer.name}*.\n`;
    message += `Quiero confirmar el siguiente pedido web:\n\n`;
    message += `📍 *Datos de Envío:*\n`;
    message += `   • Ciudad: ${customer.city}\n`;
    message += `   • Dirección: ${customer.address}\n`;
    message += `   • Teléfono: ${customer.phone}\n`;
    message += `   • Pago: ${customer.paymentMethod}\n\n`;
  } else {
    // MENSAJE SIMPLE (Respaldo)
    message += `👋 Hola iClub Perú, quiero comprar lo siguiente:\n\n`;
  }

  message += `🛒 *RESUMEN DEL PEDIDO:*\n`;
  cart.forEach((item) => {
    const subtotal = (item.price || 0) * item.quantity;
    message += `   📱 ${item.quantity}x ${item.title}\n`;
    // Opcional: Agregar detalle de precio por item si deseas
  });

  message += `\n💰 *TOTAL A PAGAR: S/ ${total.toLocaleString("es-PE")}*\n`;
  
  if (customer) message += `\nQuedo atento a la confirmación. Gracias.`;

  return `${baseUrl}${phoneNumber}?text=${encodeURIComponent(message)}`;
};