"use client";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle, ArrowLeft, MapPin, User, Phone } from "lucide-react";

export default function CheckoutPage() {
  const { cart, cartTotal } = useCart();

  // Estado para los datos del cliente
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

  // Generador del Mensaje de WhatsApp INTELIGENTE
  const generateWhatsAppUrl = () => {
    const phone = "51945341516"; // Tu número
    let message = `Hola iClub, quiero realizar el siguiente pedido:\n\n`;

    // Lista de productos
    cart.forEach((item) => {
      message += `▪️ ${item.title} x${item.quantity} - S/ ${(
        item.price * item.quantity
      ).toLocaleString("es-PE")}\n`;
    });

    message += `\n💰 *TOTAL A PAGAR: S/ ${cartTotal.toLocaleString(
      "es-PE"
    )}*\n`;
    message += `----------------------------\n`;
    message += `👤 *Mis Datos:*\n`;
    message += `Nombre: ${formData.name}\n`;
    message += `Teléfono: ${formData.phone}\n`;
    message += `Distrito: ${formData.district}\n`;
    message += `Dirección: ${formData.address}\n`;
    message += `\nQuedo atento a la confirmación de stock y métodos de pago.`;

    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  };

  const isFormValid = formData.name && formData.phone && formData.district;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white text-center px-4">
        <h2 className="text-2xl font-semibold mb-4">Tu bolsa está vacía</h2>
        <Link href="/" className="text-[#0071e3] hover:underline">
          Volver a la tienda
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f5f7] pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* FORMULARIO DE DATOS */}
        <div className="md:col-span-7">
          <div className="bg-white p-8 rounded-[20px] shadow-sm">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <User size={20} className="text-[#0071e3]" /> Datos de Envío
            </h2>
            <form className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  name="name"
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0071e3] outline-none transition-all"
                  placeholder="Ej. Juan Pérez"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    onChange={handleChange}
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0071e3] outline-none"
                    placeholder="999 999 999"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                    Distrito
                  </label>
                  <select
                    name="district"
                    onChange={handleChange}
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0071e3] outline-none"
                  >
                    <option value="">Seleccionar</option>
                    <option value="Chiclayo">Chiclayo</option>
                    <option value="La Victoria">La Victoria</option>
                    <option value="JLO">José L. Ortiz</option>
                    <option value="Pimentel">Pimentel</option>
                    <option value="Lambayeque">Lambayeque</option>
                    <option value="Otro">Otro (Coordinar)</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                  Dirección / Referencia
                </label>
                <input
                  type="text"
                  name="address"
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0071e3] outline-none"
                  placeholder="Av. Balta 123, frente al parque..."
                />
              </div>
            </form>
          </div>
        </div>

        {/* RESUMEN DE PEDIDO */}
        <div className="md:col-span-5">
          <div className="bg-white p-8 rounded-[20px] shadow-sm sticky top-32">
            <h2 className="text-xl font-semibold mb-6">Resumen</h2>
            <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-4 items-center">
                  <div className="relative w-12 h-12 bg-gray-50 rounded-lg shrink-0">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-contain p-1"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[#1d1d1f] line-clamp-1">
                      {item.title}
                    </p>
                    <p className="text-xs text-gray-500">
                      Cant: {item.quantity}
                    </p>
                  </div>
                  <p className="text-sm font-semibold">
                    S/ {(item.price * item.quantity).toLocaleString("es-PE")}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-100 pt-4 space-y-2">
              <div className="flex justify-between text-gray-500">
                <span>Subtotal</span>
                <span>S/ {cartTotal.toLocaleString("es-PE")}</span>
              </div>
              <div className="flex justify-between text-[#1d1d1f] text-xl font-bold pt-2">
                <span>Total</span>
                <span>S/ {cartTotal.toLocaleString("es-PE")}</span>
              </div>
            </div>

            <a
              href={isFormValid ? generateWhatsAppUrl() : "#"}
              target={isFormValid ? "_blank" : "_self"}
              className={`mt-6 w-full py-4 rounded-full font-semibold flex items-center justify-center gap-2 transition-all shadow-lg ${
                isFormValid
                  ? "bg-[#25D366] text-white hover:bg-[#128C7E] cursor-pointer shadow-green-500/30"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              <MessageCircle size={20} />
              {isFormValid
                ? "Enviar Pedido por WhatsApp"
                : "Completa tus datos"}
            </a>
            <p className="text-[10px] text-center text-gray-400 mt-3">
              Al enviar, un asesor confirmará el stock y te dará los datos de
              pago.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
