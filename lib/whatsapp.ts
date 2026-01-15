import { CartItem } from "@/context/CartContext";

// Definimos qué datos esperamos del cliente
export interface CustomerData {
  name: string;
  phone: string;
  city: string;
  address: string;
  paymentMethod?: string;
}

export const generateWhatsAppLink = (
  cart: CartItem[],
  total: number,
  customer?: CustomerData
) => {
  const phoneNumber = "51953654313"; // Tu número actualizado
  const baseUrl = "https://wa.me/";
  let message = "";

  // 1. Encabezado
  if (customer) {
    message += `👋 Hola iClub, soy *${customer.name}*.\n`;
    message += `Deseo confirmar el siguiente pedido web:\n\n`;
    message += `📍 *DATOS DE ENVÍO:*\n`;
    message += `   • Ciudad: ${customer.city}\n`;
    message += `   • Dirección: ${customer.address}\n`;
    message += `   • Teléfono: ${customer.phone}\n`;
    message += `\n`;
  } else {
    message += `👋 Hola iClub, estoy interesado en estos productos:\n\n`;
  }

  // 2. Detalle del Carrito
  message += `🛒 *RESUMEN DEL PEDIDO:*\n`;
  
  cart.forEach((item) => {
    // Usamos finalPrice si existe, o el precio base por seguridad
    const priceToUse = item.finalPrice || item.price;
    const itemTotal = priceToUse * item.quantity;

    // ✅ CORRECCIÓN 1: Usamos item.name en vez de item.title
    message += `   📱 *${item.quantity}x ${item.name}*\n`;

    // ✅ MEJORA SENIOR: Agregamos los detalles (Color, GB, Tamaño) al mensaje
    const details = [];
    if (item.selectedSize) details.push(item.selectedSize.label);
    if (item.selectedStorage) details.push(item.selectedStorage.capacity);
    if (item.selectedColor) details.push(item.selectedColor.name);

    if (details.length > 0) {
      message += `      _(${details.join(" - ")})_\n`;
    }

    message += `      Subtotal: S/ ${itemTotal.toLocaleString("es-PE")}\n\n`;
  });

  // 3. Total y Cierre
  message += `💰 *TOTAL A PAGAR: S/ ${total.toLocaleString("es-PE")}*\n\n`;
  
  if (customer) {
    message += `Quedo a la espera de las cuentas bancarias para transferir. Gracias. 🚀`;
  } else {
    message += `¿Me confirman stock y precio de envío?`;
  }

  return `${baseUrl}${phoneNumber}?text=${encodeURIComponent(message)}`;
};