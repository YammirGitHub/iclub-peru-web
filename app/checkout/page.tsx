"use client";

import { useCart } from "@/context/CartContext";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MessageCircle,
  User,
  MapPin,
  Phone,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";

// ---------------------------------------------------------
// 1. GENERADOR DE MENSAJE WHATSAPP (CORREGIDO PARA EMOJIS)
// ---------------------------------------------------------
const createWhatsAppMessage = (cart: any[], formData: any, total: number) => {
  // Generamos un ID de pedido
  const orderId = `WEB-${Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0")}`;

  const itemsList = cart
    .map((item) => `▪️ ${item.title || item.name} (x${item.quantity})`)
    .join("\n");

  // Construimos el mensaje con emojis
  const message = `
👋 *Hola iClub, soy ${formData.name.split(" ")[0]}!*
Vengo de su tienda online y quiero cerrar este pedido:

🧾 *TICKET DE PEDIDO: ${orderId}*
━━━━━━━━━━━━━━━━━━━━   <-- CAMBIO AQUÍ (Se ve más sólido)
${itemsList}
━━━━━━━━━━━━━━━━━━━━   <-- CAMBIO AQUÍ
💰 *TOTAL FINAL: S/ ${total.toLocaleString("en-US")}*

📍 *MIS DATOS DE ENTREGA:*
▪️ Cliente: ${formData.name}
▪️ Fono: ${formData.phone}
▪️ Ubicación: ${formData.district} 
   └ ${formData.address}

💳 *MÉTODO DE PAGO:*
Prefiero: Transferencia / Yape / Plin

🚀 *Quedo atento a su confirmación de stock para proceder con el pago.*
`.trim();

  // --- CORRECCIÓN CLAVE ---
  // Usamos 'api.whatsapp.com/send' en lugar de 'wa.me' para mejor compatibilidad de emojis.
  // encodeURIComponent se asegura de transformar los emojis en código legible por WhatsApp.
  const baseUrl = "https://api.whatsapp.com/send";
  const phone = "51953654313";
  const encodedMessage = encodeURIComponent(message);

  return `${baseUrl}?phone=${phone}&text=${encodedMessage}`;
};

export default function CheckoutPage() {
  const { cart } = useCart();

  // Cálculo de total
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
    formData.name.length > 2 &&
    formData.phone.length > 6 &&
    formData.district !== "" &&
    formData.address.length > 5;

  const handleCheckout = () => {
    if (!isFormValid) return;
    const url = createWhatsAppMessage(cart, formData, total);
    window.open(url, "_blank");
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F5F5F7] px-6 text-center">
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 shadow-xl shadow-black/5 animate-fade-in-up">
          <ShoppingBag size={40} className="text-[#86868b]" />
        </div>
        <h2 className="text-3xl font-semibold text-[#1d1d1f] mb-3 tracking-tight">
          Tu bolsa está vacía
        </h2>
        <p className="text-[#86868b] mb-8 max-w-sm mx-auto text-lg leading-relaxed">
          Parece que aún no has añadido ese dispositivo que tanto quieres.
        </p>
        <Link
          href="/"
          className="bg-[#0071e3] text-white px-8 py-4 rounded-full font-medium hover:bg-[#0077ED] transition-all hover:scale-105 shadow-lg shadow-blue-500/30 flex items-center gap-2"
        >
          Explorar Productos <ChevronRight size={18} />
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5F7] pt-32 pb-24 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* --- COLUMNA 1: FORMULARIO --- */}
        <div className="lg:col-span-7 space-y-6">
          {/* Header de Sección */}
          <div className="flex items-center gap-3 mb-2 px-1">
            <h1 className="text-3xl font-semibold text-[#1d1d1f] tracking-tight">
              Finalizar Pedido
            </h1>
          </div>

          <div className="bg-white p-6 sm:p-10 rounded-[32px] shadow-sm border border-gray-100/50">
            <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-100">
              <div className="w-12 h-12 bg-[#F5F5F7] rounded-full flex items-center justify-center text-[#1d1d1f]">
                <User size={24} />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-[#1d1d1f]">
                  Datos de Envío
                </h2>
                <p className="text-sm text-gray-500">
                  ¿A dónde enviamos tu pedido?
                </p>
              </div>
            </div>

            <form className="space-y-6">
              {/* Input Group: Nombre */}
              <div className="group">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1 group-focus-within:text-[#0071e3] transition-colors">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  name="name"
                  autoComplete="name"
                  onChange={handleChange}
                  className="w-full p-4 bg-[#F5F5F7] border-transparent rounded-2xl text-[#1d1d1f] placeholder-gray-400 focus:bg-white focus:ring-4 focus:ring-[#0071e3]/10 focus:border-[#0071e3]/20 outline-none transition-all font-medium text-base"
                  placeholder="Ej. Juan Pérez"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Input Group: Teléfono */}
                <div className="group">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1 group-focus-within:text-[#0071e3] transition-colors">
                    Teléfono / WhatsApp
                  </label>
                  <div className="relative">
                    <Phone
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#0071e3] transition-colors"
                      size={20}
                    />
                    <input
                      type="tel"
                      name="phone"
                      autoComplete="tel"
                      onChange={handleChange}
                      className="w-full p-4 pl-12 bg-[#F5F5F7] border-transparent rounded-2xl text-[#1d1d1f] placeholder-gray-400 focus:bg-white focus:ring-4 focus:ring-[#0071e3]/10 focus:border-[#0071e3]/20 outline-none transition-all font-medium text-base"
                      placeholder="999 999 999"
                    />
                  </div>
                </div>

                {/* Input Group: Distrito */}
                <div className="group">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1 group-focus-within:text-[#0071e3] transition-colors">
                    Distrito
                  </label>
                  <div className="relative">
                    <MapPin
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#0071e3] transition-colors"
                      size={20}
                    />
                    <select
                      name="district"
                      onChange={handleChange}
                      className="w-full p-4 pl-12 bg-[#F5F5F7] border-transparent rounded-2xl text-[#1d1d1f] focus:bg-white focus:ring-4 focus:ring-[#0071e3]/10 focus:border-[#0071e3]/20 outline-none transition-all font-medium appearance-none cursor-pointer text-base"
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

              {/* Input Group: Dirección */}
              <div className="group">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1 group-focus-within:text-[#0071e3] transition-colors">
                  Dirección Exacta
                </label>
                <input
                  type="text"
                  name="address"
                  autoComplete="street-address"
                  onChange={handleChange}
                  className="w-full p-4 bg-[#F5F5F7] border-transparent rounded-2xl text-[#1d1d1f] placeholder-gray-400 focus:bg-white focus:ring-4 focus:ring-[#0071e3]/10 focus:border-[#0071e3]/20 outline-none transition-all font-medium text-base"
                  placeholder="Av. Balta 123, Referencia..."
                />
              </div>
            </form>
          </div>

          {/* Sello de Confianza */}
          <div className="flex items-center justify-center gap-2 text-xs text-gray-400 opacity-80">
            <ShieldCheck size={14} />
            <span>Tus datos están protegidos y viajan encriptados.</span>
          </div>
        </div>

        {/* --- COLUMNA 2: RESUMEN (Sticky & Smart) --- */}
        <div className="lg:col-span-5">
          <div className="bg-white p-8 rounded-[32px] shadow-xl shadow-gray-200/50 sticky top-32 border border-gray-100/50">
            <h2 className="text-xl font-semibold mb-6 text-[#1d1d1f] flex justify-between items-center">
              Resumen
              <span className="text-sm font-normal text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                {cart.length} items
              </span>
            </h2>

            <div className="space-y-4 mb-8 max-h-[40vh] overflow-y-auto custom-scrollbar pr-2">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 items-center p-3 hover:bg-[#F5F5F7] rounded-2xl transition-colors group cursor-default"
                >
                  <div className="relative w-16 h-16 bg-white rounded-xl shrink-0 border border-gray-100 shadow-sm group-hover:scale-105 transition-transform duration-300">
                    <Image
                      src={item.image}
                      // CORRECCIÓN: Usamos item.title aquí también
                      alt={item.title}
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-[#1d1d1f] truncate leading-tight mb-1">
                      {/* CORRECCIÓN: Usamos item.title */}
                      {item.title}
                    </p>
                    <p className="text-xs text-gray-500 font-medium">
                      Cantidad: {item.quantity}
                    </p>
                  </div>
                  <p className="text-sm font-bold text-[#1d1d1f] whitespace-nowrap">
                    S/ {(item.price * item.quantity).toLocaleString("es-PE")}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t border-dashed border-gray-200 pt-6 space-y-3">
              <div className="flex justify-between text-gray-500 text-sm font-medium">
                <span>Subtotal</span>
                <span>S/ {total.toLocaleString("es-PE")}</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-[#1d1d1f] text-lg font-bold">
                  Total a Pagar
                </span>
                <span className="text-[#0071e3] text-4xl font-bold tracking-tight">
                  S/ {total.toLocaleString("es-PE")}
                </span>
              </div>
            </div>

            {/* BOTÓN INTELIGENTE */}
            <div className="mt-8 relative">
              <button
                onClick={handleCheckout}
                disabled={!isFormValid}
                className={`w-full py-4 rounded-full font-bold text-[15px] flex items-center justify-center gap-3 transition-all duration-300 shadow-lg group ${
                  isFormValid
                    ? "bg-[#25D366] hover:bg-[#1EBE57] text-white hover:scale-[1.02] hover:shadow-green-500/40 cursor-pointer"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed shadow-none"
                }`}
              >
                {isFormValid ? (
                  <>
                    <MessageCircle size={22} className="fill-current" />
                    <span>Enviar Pedido a WhatsApp</span>
                    <ArrowRight
                      size={18}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </>
                ) : (
                  <>
                    <span className="flex items-center gap-2">
                      Completa tus datos para continuar
                    </span>
                  </>
                )}
              </button>

              <div className="mt-4 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                <p className="text-[11px] text-center text-gray-400 leading-relaxed font-medium">
                  🔒 Al enviar, un asesor verificará el stock en tiempo real y
                  te proporcionará las cuentas bancarias seguras.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
