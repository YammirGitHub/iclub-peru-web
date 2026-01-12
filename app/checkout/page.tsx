"use client";

import { useCart } from "@/context/CartContext";
import { useState, useRef } from "react"; // Importamos useRef
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
  AlertCircle,
} from "lucide-react";

// ---------------------------------------------------------
// 1. GENERADOR DE MENSAJE WHATSAPP
// ---------------------------------------------------------
const createWhatsAppMessage = (cart: any[], formData: any, total: number) => {
  const orderId = `WEB-${Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0")}`;

  const itemsList = cart
    .map((item) => `▪️ ${item.title || item.name} (x${item.quantity})`)
    .join("\n");

  const message = `
👋 *Hola iClub, soy ${formData.name.split(" ")[0]}!*
Vengo de su tienda online y quiero cerrar este pedido:

🧾 *TICKET DE PEDIDO: ${orderId}*
━━━━━━━━━━━━━━━━━━━━
${itemsList}
━━━━━━━━━━━━━━━━━━━━
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

  const baseUrl = "https://api.whatsapp.com/send";
  const phone = "51953654313";
  const encodedMessage = encodeURIComponent(message);

  return `${baseUrl}?phone=${phone}&text=${encodedMessage}`;
};

export default function CheckoutPage() {
  const { cart } = useCart();
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // --- REFERENCIAS PARA EL FOCUS AUTOMÁTICO ---
  const nameInputRef = useRef<HTMLInputElement>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);
  const districtInputRef = useRef<HTMLSelectElement>(null);
  const addressInputRef = useRef<HTMLInputElement>(null);

  // --- ESTADOS ---
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    district: "",
    address: "",
  });

  const [touched, setTouched] = useState({
    name: false,
    phone: false,
    district: false,
    address: false,
  });

  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    district: "",
    address: "",
  });

  // --- VALIDACIONES ---
  const validate = (name: string, value: string) => {
    switch (name) {
      case "name":
        if (value.trim().length < 3) return "Ingresa tu nombre completo";
        return "";
      case "phone":
        if (!/^[9]\d{8}$/.test(value))
          return "Ingresa un celular válido (9 dígitos)";
        return "";
      case "district":
        if (!value) return "Selecciona un distrito";
        return "";
      case "address":
        if (value.trim().length < 5) return "La dirección es muy corta";
        return "";
      default:
        return "";
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "phone") {
      const numericValue = value.replace(/\D/g, "");
      if (numericValue.length > 9) return;
      setFormData({ ...formData, [name]: numericValue });
      setErrors({ ...errors, [name]: validate(name, numericValue) });
    } else {
      setFormData({ ...formData, [name]: value });
      setErrors({ ...errors, [name]: validate(name, value) });
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setTouched({ ...touched, [name]: true });
    setErrors({ ...errors, [name]: validate(name, value) });
  };

  const isFormValid =
    !errors.name &&
    !errors.phone &&
    !errors.district &&
    !errors.address &&
    formData.name.length > 0 &&
    formData.phone.length === 9 &&
    formData.district !== "" &&
    formData.address.length > 0;

  // --- LÓGICA DEL BOTÓN INTELIGENTE ---
  const handleSmartClick = () => {
    // Si el formulario ES válido, procedemos a WhatsApp
    if (isFormValid) {
      const url = createWhatsAppMessage(cart, formData, total);
      window.open(url, "_blank");
      return;
    }

    // Si NO es válido, llevamos el cursor al primer campo con error o vacío
    // 1. Validar Nombre
    if (!formData.name || errors.name) {
      nameInputRef.current?.focus();
      setTouched((prev) => ({ ...prev, name: true })); // Opcional: mostrar error
      return;
    }
    // 2. Validar Teléfono
    if (!formData.phone || errors.phone) {
      phoneInputRef.current?.focus();
      setTouched((prev) => ({ ...prev, phone: true }));
      return;
    }
    // 3. Validar Distrito
    if (!formData.district || errors.district) {
      districtInputRef.current?.focus();
      setTouched((prev) => ({ ...prev, district: true }));
      return;
    }
    // 4. Validar Dirección
    if (!formData.address || errors.address) {
      addressInputRef.current?.focus();
      setTouched((prev) => ({ ...prev, address: true }));
      return;
    }
  };

  const getInputClasses = (fieldName: keyof typeof errors) => {
    const hasError = touched[fieldName] && errors[fieldName];
    const base =
      "w-full p-4 bg-[#F5F5F7] border-2 rounded-2xl text-[#1d1d1f] placeholder-gray-400 outline-none transition-all font-medium text-base";

    if (hasError) {
      return `${base} border-red-500/50 focus:border-red-500 focus:ring-4 focus:ring-red-500/10 bg-red-50/50`;
    }
    return `${base} border-transparent focus:bg-white focus:border-[#0071e3]/20 focus:ring-4 focus:ring-[#0071e3]/10`;
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F5F5F7] px-6 text-center">
        {/* ... (Contenido de bolsa vacía igual que antes) ... */}
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

            <form className="space-y-6" autoComplete="off">
              {/* Input: Nombre */}
              <div className="group">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">
                  Nombre Completo
                </label>
                <input
                  ref={nameInputRef} // Conectamos la referencia
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={getInputClasses("name")}
                  placeholder="Ej. Juan Pérez"
                />
                {touched.name && errors.name && (
                  <div className="flex items-center gap-1 mt-2 text-red-500 text-xs font-medium animate-fade-in">
                    <AlertCircle size={12} /> {errors.name}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Input: Teléfono */}
                <div className="group">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">
                    Celular / WhatsApp
                  </label>
                  <div className="relative">
                    <Phone
                      className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${
                        touched.phone && errors.phone
                          ? "text-red-400"
                          : "text-gray-400 group-focus-within:text-[#0071e3]"
                      }`}
                      size={20}
                    />
                    <input
                      ref={phoneInputRef} // Conectamos la referencia
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      maxLength={9}
                      className={`${getInputClasses("phone")} pl-12`}
                      placeholder="999 999 999"
                    />
                  </div>
                  {touched.phone && errors.phone && (
                    <div className="flex items-center gap-1 mt-2 text-red-500 text-xs font-medium animate-fade-in">
                      <AlertCircle size={12} /> {errors.phone}
                    </div>
                  )}
                </div>

                {/* Input: Distrito */}
                <div className="group">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">
                    Distrito
                  </label>
                  <div className="relative">
                    <MapPin
                      className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${
                        touched.district && errors.district
                          ? "text-red-400"
                          : "text-gray-400 group-focus-within:text-[#0071e3]"
                      }`}
                      size={20}
                    />
                    <select
                      ref={districtInputRef} // Conectamos la referencia
                      name="district"
                      value={formData.district}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`${getInputClasses(
                        "district"
                      )} pl-12 appearance-none cursor-pointer`}
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
                  {touched.district && errors.district && (
                    <div className="flex items-center gap-1 mt-2 text-red-500 text-xs font-medium animate-fade-in">
                      <AlertCircle size={12} /> {errors.district}
                    </div>
                  )}
                </div>
              </div>

              {/* Input: Dirección */}
              <div className="group">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">
                  Dirección Exacta
                </label>
                <input
                  ref={addressInputRef} // Conectamos la referencia
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={getInputClasses("address")}
                  placeholder="Av. Balta 123, Referencia..."
                />
                {touched.address && errors.address && (
                  <div className="flex items-center gap-1 mt-2 text-red-500 text-xs font-medium animate-fade-in">
                    <AlertCircle size={12} /> {errors.address}
                  </div>
                )}
              </div>
            </form>
          </div>
          {/* ...Footer form... */}
        </div>

        {/* --- COLUMNA 2: RESUMEN (Sticky & Smart) --- */}
        <div className="lg:col-span-5">
          {/* ...Contenido del resumen (Lista de items y total) igual que antes... */}
          <div className="bg-white p-8 rounded-[32px] shadow-xl shadow-gray-200/50 sticky top-32 border border-gray-100/50">
            {/* ...Items... */}
            <div className="space-y-4 mb-8 max-h-[40vh] overflow-y-auto custom-scrollbar pr-2">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 items-center p-3 hover:bg-[#F5F5F7] rounded-2xl transition-colors group cursor-default"
                >
                  <div className="relative w-16 h-16 bg-white rounded-xl shrink-0 border border-gray-100 shadow-sm">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-[#1d1d1f] truncate leading-tight mb-1">
                      {item.title}
                    </p>
                    <p className="text-xs text-gray-500 font-medium">
                      Cant: {item.quantity}
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

            {/* AQUÍ ESTÁ EL BOTÓN INTELIGENTE MODIFICADO */}
            <div className="mt-8 relative">
              <button
                onClick={handleSmartClick} // Usamos el nuevo handler inteligente
                // Eliminamos disabled={!isFormValid} para que siempre sea clickeable
                className={`w-full py-4 rounded-full font-bold text-[15px] flex items-center justify-center gap-3 transition-all duration-300 shadow-lg group ${
                  isFormValid
                    ? "bg-[#25D366] hover:bg-[#1EBE57] text-white hover:scale-[1.02] hover:shadow-green-500/40 cursor-pointer"
                    : "bg-gray-100 text-gray-400 cursor-pointer shadow-none" // Mantiene aspecto gris pero es clickeable
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
