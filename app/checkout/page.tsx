"use client";

import { useCart } from "@/context/CartContext";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle, User, MapPin, Phone, ShoppingBag } from "lucide-react";

// ---------------------------------------------------------
// 1. GENERADOR DE MENSAJE WHATSAPP (ESTILO PREMIUM APPLE)
// ---------------------------------------------------------
const createWhatsAppMessage = (cart: any[], formData: any, total: number) => {
  const orderId = `WEB-${Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0")}`;
  const date = new Date().toLocaleDateString("es-PE", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  const itemsList = cart
    .map((item) => {
      return `
📦 *${item.title || item.name}*
   └ Cantidad: ${item.quantity}
   └ Precio: S/ ${(item.price * item.quantity).toLocaleString("en-US")}
`.trim();
    })
    .join("\n\n");

  const message = `
 *iClub Store | Solicitud de Pedido*
─────────────────────
🆔 *Orden:* ${orderId}
📅 *Fecha:* ${date}

Hola, he finalizado mi selección en la web y deseo concretar la compra:

*DETALLE DEL PEDIDO*
─────────────────────
${itemsList}
─────────────────────
💰 *TOTAL A PAGAR: S/ ${total.toLocaleString("en-US")}*

*DATOS DE ENTREGA*
👤 *Cliente:* ${formData.name}
📱 *Teléfono:* ${formData.phone}
📍 *Dirección:* ${formData.address}
🏙 *Distrito:* ${formData.district || "No especificado"}

✅ *Método de Pago:* Transferencia / Yape / Plin

Quedo a la espera de la confirmación y los datos bancarios. Gracias.
`.trim();

  // Reemplaza con tu número real
  return `https://wa.me/51945341516?text=${encodeURIComponent(message)}`;
};
// ---------------------------------------------------------

export default function CheckoutPage() {
  const { cart } = useCart();

  // Calculamos el total aquí mismo para evitar errores de contexto
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    district: "",
    address: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isFormValid =
    formData.name && formData.phone && formData.district && formData.address;

  const handleCheckout = () => {
    if (!isFormValid) return;
    const url = createWhatsAppMessage(cart, formData, total);
    window.open(url, "_blank");
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F5F5F7] text-center px-4">
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm">
          <ShoppingBag size={40} className="text-gray-300" />
        </div>
        <h2 className="text-2xl font-semibold text-[#1d1d1f] mb-2">
          Tu bolsa está vacía
        </h2>
        <p className="text-gray-500 mb-8">
          Parece que no has añadido nada aún.
        </p>
        <Link
          href="/"
          className="bg-[#0071e3] text-white px-8 py-3 rounded-full font-medium hover:bg-[#0077ED] transition-colors"
        >
          Volver a la tienda
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5F7] pt-32 pb-20">
      <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* --- COLUMNA 1: FORMULARIO (Diseño Limpio) --- */}
        <div className="md:col-span-7">
          <div className="bg-white p-8 rounded-[32px] shadow-sm">
            <h2 className="text-2xl font-semibold mb-8 text-[#1d1d1f] flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <User size={20} className="text-[#1d1d1f]" />
              </div>
              Datos de Envío
            </h2>

            <form className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  name="name"
                  onChange={handleChange}
                  className="w-full p-4 bg-[#F5F5F7] border-transparent rounded-2xl text-[#1d1d1f] placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-[#0071e3] outline-none transition-all font-medium"
                  placeholder="Ej. Juan Pérez"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">
                    Teléfono
                  </label>
                  <div className="relative">
                    <Phone
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                      size={18}
                    />
                    <input
                      type="tel"
                      name="phone"
                      onChange={handleChange}
                      className="w-full p-4 pl-12 bg-[#F5F5F7] border-transparent rounded-2xl text-[#1d1d1f] placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-[#0071e3] outline-none transition-all font-medium"
                      placeholder="999 999 999"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">
                    Distrito
                  </label>
                  <div className="relative">
                    <MapPin
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                      size={18}
                    />
                    <select
                      name="district"
                      onChange={handleChange}
                      className="w-full p-4 pl-12 bg-[#F5F5F7] border-transparent rounded-2xl text-[#1d1d1f] focus:bg-white focus:ring-2 focus:ring-[#0071e3] outline-none transition-all font-medium appearance-none cursor-pointer"
                    >
                      <option value="">Seleccionar...</option>
                      <option value="Chiclayo">Chiclayo</option>
                      <option value="La Victoria">La Victoria</option>
                      <option value="JLO">José L. Ortiz</option>
                      <option value="Pimentel">Pimentel</option>
                      <option value="Lambayeque">Lambayeque</option>
                      <option value="Otro">Otro (Coordinar)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">
                  Dirección / Referencia
                </label>
                <input
                  type="text"
                  name="address"
                  onChange={handleChange}
                  className="w-full p-4 bg-[#F5F5F7] border-transparent rounded-2xl text-[#1d1d1f] placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-[#0071e3] outline-none transition-all font-medium"
                  placeholder="Av. Balta 123, frente al parque..."
                />
              </div>
            </form>
          </div>
        </div>

        {/* --- COLUMNA 2: RESUMEN (Sticky) --- */}
        <div className="md:col-span-5">
          <div className="bg-white p-8 rounded-[32px] shadow-sm sticky top-32">
            <h2 className="text-xl font-semibold mb-6 text-[#1d1d1f]">
              Resumen del Pedido
            </h2>

            <div className="space-y-4 mb-8 max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 items-center p-2 hover:bg-gray-50 rounded-xl transition-colors"
                >
                  <div className="relative w-14 h-14 bg-[#F5F5F7] rounded-xl shrink-0 border border-gray-100">
                    <Image
                      src={item.image}
                      alt={item.title || item.name}
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#1d1d1f] truncate">
                      {item.title || item.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      Cant: {item.quantity}
                    </p>
                  </div>
                  <p className="text-sm font-semibold whitespace-nowrap">
                    S/ {(item.price * item.quantity).toLocaleString("es-PE")}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-100 pt-6 space-y-3">
              <div className="flex justify-between text-gray-500 text-sm">
                <span>Subtotal</span>
                <span>S/ {total.toLocaleString("es-PE")}</span>
              </div>
              <div className="flex justify-between text-[#1d1d1f] text-2xl font-bold pt-2">
                <span>Total</span>
                <span>S/ {total.toLocaleString("es-PE")}</span>
              </div>
            </div>

            {/* BOTÓN Y TEXTO DE ADVERTENCIA (Tal cual la imagen) */}
            <div className="mt-8">
              <button
                onClick={handleCheckout}
                disabled={!isFormValid}
                className={`w-full py-4 rounded-full font-semibold flex items-center justify-center gap-2 transition-all duration-300 shadow-lg ${
                  isFormValid
                    ? "bg-[#25D366] hover:bg-[#128C7E] text-white hover:scale-[1.02] shadow-green-500/30 cursor-pointer"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
              >
                {isFormValid ? (
                  <>
                    <MessageCircle size={20} className="fill-current" />
                    Confirmar Pedido en WhatsApp
                  </>
                ) : (
                  <>
                    {/* Estilo visual similar al "Completa tus datos" de tu imagen */}
                    <span className="flex items-center gap-2">
                      <MessageCircle size={20} />
                      Completa tus datos
                    </span>
                  </>
                )}
              </button>

              {/* TEXTO EXACTO DE TU IMAGEN */}
              <p className="text-[11px] text-center text-gray-400 mt-4 leading-relaxed px-4">
                Al enviar, un asesor confirmará el stock y te dará los datos de
                pago.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
