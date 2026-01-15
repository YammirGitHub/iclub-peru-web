"use client";

import { useCart } from "@/context/CartContext";
import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
// Logo y Utils (Asegúrate que estas rutas existan, si no, usa tus imports)
import Logo from "@/components/ui/Logo";
import { generateWhatsAppLink } from "@/lib/whatsapp";
import {
  MessageCircle,
  User,
  MapPin,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  ShoppingBag,
  ChevronRight,
  AlertCircle,
  Lock,
} from "lucide-react";

export default function CheckoutPage() {
  const { cart } = useCart();

  // Cálculo del total (usamos finalPrice porque es el precio real calculado)
  const total = cart.reduce(
    (acc, item) => acc + item.finalPrice * item.quantity,
    0
  );

  // --- REFERENCIAS PARA FOCUS UX ---
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
      // Filtro estricto: solo números
      const numericValue = value.replace(/\D/g, "").slice(0, 9);
      setFormData((prev) => ({ ...prev, [name]: numericValue }));
      setErrors((prev) => ({ ...prev, [name]: validate(name, numericValue) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
      setErrors((prev) => ({ ...prev, [name]: validate(name, value) }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validate(name, value) }));
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

  // --- LÓGICA CENTRAL DE ENVÍO ---
  const handleSendOrder = () => {
    // 1. Si todo está correcto, generamos el enlace
    if (isFormValid) {
      const customerData = {
        name: formData.name,
        phone: formData.phone,
        city: formData.district,
        address: formData.address,
        paymentMethod: "Transferencia/Yape",
      };

      const url = generateWhatsAppLink(cart, total, customerData);
      window.open(url, "_blank");
      return;
    }

    // 2. Si hay errores, UX inteligente: llevar el foco al primer error
    if (!formData.name || errors.name) {
      nameInputRef.current?.focus();
      setTouched((prev) => ({ ...prev, name: true }));
      return;
    }
    if (!formData.phone || errors.phone) {
      phoneInputRef.current?.focus();
      setTouched((prev) => ({ ...prev, phone: true }));
      return;
    }
    if (!formData.district || errors.district) {
      districtInputRef.current?.focus();
      setTouched((prev) => ({ ...prev, district: true }));
      return;
    }
    if (!formData.address || errors.address) {
      addressInputRef.current?.focus();
      setTouched((prev) => ({ ...prev, address: true }));
      return;
    }
  };

  // Helper para clases CSS condicionales
  const getInputClasses = (fieldName: keyof typeof errors) => {
    const hasError = touched[fieldName] && errors[fieldName];
    const base =
      "w-full p-4 bg-[#F5F5F7] border-2 rounded-2xl text-[#1d1d1f] placeholder-gray-400 outline-none transition-all font-medium text-base";

    if (hasError)
      return `${base} border-red-500/50 focus:border-red-500 focus:ring-4 focus:ring-red-500/10 bg-red-50/50`;

    return `${base} border-transparent focus:bg-white focus:border-[#0071e3]/20 focus:ring-4 focus:ring-[#0071e3]/10`;
  };

  // --- ESTADO VACÍO ---
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
    <div className="min-h-screen bg-[#F5F5F7] pt-8 pb-24 transition-colors">
      {/* 1. HEADER CON LOGO */}
      <div className="flex justify-center mb-10 pt-4">
        <div className="transform scale-110 transition-transform hover:scale-115">
          <Logo />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* --- COLUMNA 1: FORMULARIO --- */}
        <div className="lg:col-span-7 space-y-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#0071e3] transition-colors pl-1 mb-4"
          >
            <ArrowLeft size={16} /> Volver a la tienda
          </Link>

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

            <form
              className="space-y-6"
              autoComplete="off"
              onSubmit={(e) => e.preventDefault()}
            >
              {/* NOMBRE */}
              <div className="group">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">
                  Nombre Completo
                </label>
                <input
                  ref={nameInputRef}
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

              {/* CELULAR Y DISTRITO */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="group">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">
                    Celular / WhatsApp
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 border-r border-gray-200 pr-3 h-6 text-gray-400 select-none">
                      <span className="text-lg leading-none filter grayscale opacity-80">
                        🇵🇪
                      </span>
                      <span className="text-gray-500 font-medium text-sm">
                        +51
                      </span>
                    </div>
                    <input
                      ref={phoneInputRef}
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      maxLength={9}
                      className={`${getInputClasses("phone")} pl-28`}
                      placeholder="999 999 999"
                    />
                  </div>
                  {touched.phone && errors.phone && (
                    <div className="flex items-center gap-1 mt-2 text-red-500 text-xs font-medium animate-fade-in">
                      <AlertCircle size={12} /> {errors.phone}
                    </div>
                  )}
                </div>

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
                      ref={districtInputRef}
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

              {/* DIRECCIÓN */}
              <div className="group">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">
                  Dirección Exacta
                </label>
                <input
                  ref={addressInputRef}
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

          <div className="flex items-center justify-center gap-2 text-xs text-gray-400 opacity-80">
            <ShieldCheck size={14} />
            <span>Tus datos están protegidos y viajan encriptados.</span>
          </div>
        </div>

        {/* --- COLUMNA 2: RESUMEN FLOTANTE --- */}
        <div className="lg:col-span-5">
          <div className="bg-white p-8 rounded-[32px] shadow-xl shadow-gray-200/50 sticky top-32 border border-gray-100/50">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-[#1d1d1f] flex items-center gap-2">
                Resumen{" "}
                <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                  {cart.length}
                </span>
              </h2>
              <Link
                href="/"
                className="text-sm font-medium text-[#0071e3] hover:underline transition-colors"
              >
                Editar
              </Link>
            </div>

            <div className="space-y-4 mb-8 max-h-[40vh] overflow-y-auto custom-scrollbar pr-2">
              {cart.map((item) => (
                <div
                  key={item.cartItemId} // ✅ KEY CORRECTA: Usamos el ID único del carrito
                  className="flex gap-4 items-center p-3 hover:bg-[#F5F5F7] rounded-2xl transition-colors group cursor-default"
                >
                  <div className="relative w-16 h-16 bg-white rounded-xl shrink-0 border border-gray-100 shadow-sm">
                    <Image
                      src={item.image}
                      alt={item.name} // ✅ CORREGIDO: item.name en lugar de item.title
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-[#1d1d1f] truncate leading-tight mb-1">
                      {item.name} {/* ✅ CORREGIDO */}
                    </p>
                    {/* INFO DE LA VARIANTE */}
                    <div className="flex flex-col text-xs text-gray-500">
                      {item.selectedSize && (
                        <span>{item.selectedSize.label}</span>
                      )}
                      {item.selectedColor && (
                        <span>{item.selectedColor.name}</span>
                      )}
                      {item.selectedStorage && (
                        <span>{item.selectedStorage.capacity}</span>
                      )}
                      <span>Cant: {item.quantity}</span>
                    </div>
                  </div>
                  <p className="text-sm font-bold text-[#1d1d1f] whitespace-nowrap">
                    {/* ✅ PRECIO REAL CALCULADO */}
                    S/{" "}
                    {(item.finalPrice * item.quantity).toLocaleString("es-PE")}
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

            <div className="mt-8 relative">
              <button
                onClick={handleSendOrder}
                className={`w-full py-4 rounded-full font-bold text-[15px] flex items-center justify-center gap-3 transition-all duration-300 shadow-lg group ${
                  isFormValid
                    ? "bg-[#25D366] hover:bg-[#1EBE57] text-white hover:scale-[1.02] hover:shadow-green-500/40 cursor-pointer"
                    : "bg-gray-100 text-gray-400 cursor-pointer shadow-none"
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

              <div className="mt-4 bg-gray-50 p-4 rounded-2xl border border-gray-100 flex items-start gap-3">
                <Lock size={16} className="text-gray-400 mt-0.5 shrink-0" />
                <p className="text-[11px] text-gray-400 leading-relaxed font-medium">
                  Al enviar, un asesor verificará el stock en tiempo real y te
                  proporcionará las cuentas bancarias seguras.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
