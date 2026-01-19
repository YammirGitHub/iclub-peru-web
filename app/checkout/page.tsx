"use client";

import { useCart } from "@/context/CartContext";
import { useCheckoutForm } from "@/hooks/useCheckoutForm";
import { generateWhatsAppLink } from "@/lib/whatsapp";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/components/ui/Logo";
import { useState, useRef } from "react";
import {
  User,
  ArrowLeft,
  ShieldCheck,
  ShoppingBag,
  ChevronRight,
  AlertCircle,
  Lock,
  Trash2,
  Minus,
  Plus,
  ArrowRight,
  Phone,
  MapPin,
  Home,
} from "lucide-react";

// 🍏 ICONO MENSAJE iOS (Burbuja Rellena - SVG Personalizado)
const IOSMessageIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="currentColor"
    strokeWidth="0"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719" />
  </svg>
);

export default function CheckoutPage() {
  const { cart, removeFromCart, updateQuantity, total } = useCart();
  const { formData, errors, handleChange, validateAll, isValid } =
    useCheckoutForm();

  // Estado para la animación de error "Sacudida"
  const [isShaking, setIsShaking] = useState(false);

  // Referencias para el scroll automático
  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const districtRef = useRef<HTMLSelectElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);

  const getInputClasses = (fieldName: keyof typeof errors) => {
    const hasError = !!errors[fieldName];
    const base =
      "w-full h-[52px] px-5 bg-[#F5F5F7] border border-transparent rounded-[18px] text-[#1d1d1f] placeholder-gray-400 outline-none transition-all duration-300 font-medium text-[15px] hover:bg-[#EBEBEB] focus:bg-white focus:border-[#0071e3]/30 focus:shadow-[0_0_0_4px_rgba(0,113,227,0.1)] scroll-mt-28";
    return hasError
      ? "w-full h-[52px] px-5 bg-red-50/50 border border-red-200 rounded-[18px] text-[#1d1d1f] focus:outline-none focus:ring-2 focus:ring-red-500/20 scroll-mt-28"
      : base;
  };

  const handleSendOrder = () => {
    const isSuccess = validateAll();

    if (!isSuccess) {
      // Activa la vibración si hay error
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 400);

      // Scroll al primer campo vacío
      if (formData.name.length < 3) return nameRef.current?.focus();
      if (!/^9\d{8}$/.test(formData.phone)) return phoneRef.current?.focus();
      if (!formData.district) return districtRef.current?.focus();
      if (formData.address.length < 5) return addressRef.current?.focus();
      return;
    }

    const customerData = {
      name: formData.name,
      phone: formData.phone,
      city: formData.district,
      address: formData.address,
    };

    const link = generateWhatsAppLink(cart, total, customerData);
    window.open(link, "_blank");
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F5F5F7] px-6 text-center">
        <div className="bg-white p-12 rounded-[40px] shadow-xl border border-white flex flex-col items-center max-w-md w-full">
          <div className="w-20 h-20 bg-[#F5F5F7] rounded-full flex items-center justify-center mb-6">
            <ShoppingBag size={32} className="text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-[#1d1d1f] mb-3">
            Tu bolsa está vacía
          </h2>
          <Link
            href="/"
            className="w-full bg-[#1d1d1f] text-white h-14 rounded-2xl font-bold hover:scale-[1.02] transition-all flex items-center justify-center gap-2 shadow-lg"
          >
            Ir a la Tienda <ChevronRight size={18} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5F7] font-sans selection:bg-[#0071e3] selection:text-white">
      <header className="bg-white/80 backdrop-blur-xl border-b border-gray-200/60 sticky top-0 z-50 h-20 flex items-center justify-center">
        <div className="w-full max-w-[1280px] px-6 lg:px-12 flex justify-between items-center">
          <Logo />
          <div className="flex items-center gap-2 text-[11px] font-bold text-green-700 bg-green-50/80 px-3 py-1.5 rounded-full border border-green-100/50 backdrop-blur-md">
            <Lock size={12} strokeWidth={2.5} /> CHECKOUT SEGURO
          </div>
        </div>
      </header>

      <main className="w-full max-w-[1280px] mx-auto px-6 lg:px-12 py-10">
        <div className="mb-10 flex items-center gap-3">
          <Link
            href="/"
            className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-black transition-all shadow-sm"
          >
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-[#1d1d1f] tracking-tight">
              Finalizar Compra
            </h1>
            <p className="text-gray-500 text-sm">
              Estás a un paso de tener tu pedido.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* IZQUIERDA: FORMULARIO */}
          <div className="lg:col-span-7 bg-white p-8 lg:p-12 rounded-[40px] shadow-xl border border-white">
            <div className="flex items-center gap-4 mb-10 pb-6 border-b border-gray-100">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                <User size={24} />
              </div>
              <h2 className="text-xl font-bold text-[#1d1d1f]">
                Datos de Envío
              </h2>
            </div>

            <form
              className="space-y-6"
              autoComplete="off"
              onSubmit={(e) => e.preventDefault()}
            >
              {/* NOMBRE */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                  Nombre Completo
                </label>
                <div className="relative">
                  <input
                    ref={nameRef}
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    className={getInputClasses("name")}
                    placeholder="Ej. Juan Pérez"
                  />
                </div>
                {errors.name && (
                  <p className="text-red-500 text-[11px] font-bold ml-1 flex items-center gap-1 animate-fade-in">
                    <AlertCircle size={12} /> {errors.name}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* CELULAR */}
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                    Celular
                  </label>
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 pr-3 h-5 border-r border-gray-300 flex items-center">
                      <span className="text-sm font-bold">🇵🇪</span>
                    </div>
                    <input
                      ref={phoneRef}
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        handleChange(
                          "phone",
                          e.target.value.replace(/\D/g, "").slice(0, 9),
                        )
                      }
                      maxLength={9}
                      className={`${getInputClasses("phone")} pl-16`}
                      placeholder="999 000 000"
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-red-500 text-[11px] font-bold ml-1 flex items-center gap-1 animate-fade-in">
                      <AlertCircle size={12} /> {errors.phone}
                    </p>
                  )}
                </div>

                {/* DISTRITO */}
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                    Distrito
                  </label>
                  <div className="relative">
                    <select
                      ref={districtRef}
                      value={formData.district}
                      onChange={(e) => handleChange("district", e.target.value)}
                      className={`${getInputClasses("district")} appearance-none cursor-pointer`}
                    >
                      <option value="">Seleccionar...</option>
                      <option value="Chiclayo">Chiclayo</option>
                      <option value="La Victoria">La Victoria</option>
                      <option value="JLO">José L. Ortiz</option>
                      <option value="Pimentel">Pimentel</option>
                      <option value="Lambayeque">Lambayeque</option>
                      <option value="Otro">Otro (Coordinar)</option>
                    </select>
                    <ChevronRight
                      className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 rotate-90 pointer-events-none"
                      size={16}
                    />
                  </div>
                  {errors.district && (
                    <p className="text-red-500 text-[11px] font-bold ml-1 flex items-center gap-1 animate-fade-in">
                      <AlertCircle size={12} /> {errors.district}
                    </p>
                  )}
                </div>
              </div>

              {/* DIRECCIÓN */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                  Dirección Exacta
                </label>
                <input
                  ref={addressRef}
                  type="text"
                  value={formData.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                  className={getInputClasses("address")}
                  placeholder="Av. Principal 123, Referencia..."
                />
                {errors.address && (
                  <p className="text-red-500 text-[11px] font-bold ml-1 flex items-center gap-1 animate-fade-in">
                    <AlertCircle size={12} /> {errors.address}
                  </p>
                )}
              </div>
            </form>

            <div className="mt-8 pt-8 border-t border-gray-50 flex justify-center">
              <div className="inline-flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full border border-gray-100 text-[11px] font-medium text-gray-500">
                <ShieldCheck size={14} className="text-green-600" /> Tus datos
                viajan encriptados con SSL de 256-bits.
              </div>
            </div>
          </div>

          {/* DERECHA: RESUMEN */}
          <div className="lg:col-span-5 relative">
            <div className="bg-white rounded-[40px] shadow-2xl border border-white sticky top-28 flex flex-col lg:max-h-[calc(100vh-160px)]">
              <div className="p-8 pb-4 flex justify-between items-center border-b border-gray-50">
                <h2 className="text-xl font-bold text-[#1d1d1f]">Resumen</h2>
                <span className="text-[10px] font-bold bg-gray-100 text-gray-500 px-3 py-1 rounded-full uppercase">
                  {cart.length} Items
                </span>
              </div>

              <div className="flex-1 overflow-y-auto px-8 py-4 custom-scrollbar space-y-6">
                {cart.map((item) => (
                  <div key={item.cartItemId} className="flex gap-4 group">
                    <div className="relative w-20 h-20 bg-[#F5F5F7] rounded-2xl shrink-0 border border-gray-100 flex items-center justify-center overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-contain p-2 mix-blend-multiply transition-transform group-hover:scale-110 duration-500"
                      />
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
                      <div className="flex justify-between items-start gap-2">
                        <div className="min-w-0">
                          <p className="text-sm font-bold text-[#1d1d1f] line-clamp-2 leading-tight">
                            {item.name}
                          </p>
                          <div className="flex flex-wrap gap-2 mt-1.5">
                            {item.selectedColor && (
                              <span className="text-[9px] font-bold bg-gray-50 text-gray-500 px-2 py-0.5 rounded border border-gray-100 uppercase">
                                {item.selectedColor.name}
                              </span>
                            )}
                            {item.selectedStorage && (
                              <span className="text-[9px] font-bold bg-gray-50 text-gray-500 px-2 py-0.5 rounded border border-gray-100 uppercase">
                                {item.selectedStorage.capacity}
                              </span>
                            )}
                          </div>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.cartItemId)}
                          className="text-gray-300 hover:text-red-500 p-1"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <div className="flex justify-between items-end mt-2">
                        <div className="flex items-center bg-[#F5F5F7] rounded-full p-1 h-7">
                          <button
                            onClick={() =>
                              updateQuantity(item.cartItemId, item.quantity - 1)
                            }
                            disabled={item.quantity <= 1}
                            className={`w-6 h-full flex items-center justify-center rounded-full transition-all ${item.quantity <= 1 ? "text-gray-300 cursor-not-allowed" : "text-gray-600 hover:bg-white hover:shadow-sm"}`}
                          >
                            <Minus size={12} strokeWidth={3} />
                          </button>
                          <span className="text-xs font-bold w-6 text-center text-[#1d1d1f]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.cartItemId, item.quantity + 1)
                            }
                            className="w-6 h-full flex items-center justify-center rounded-full text-gray-600 hover:bg-white hover:shadow-sm transition-all"
                          >
                            <Plus size={12} strokeWidth={3} />
                          </button>
                        </div>
                        <span className="text-sm font-bold text-[#1d1d1f] tabular-nums">
                          S/{" "}
                          {(item.finalPrice * item.quantity).toLocaleString(
                            "es-PE",
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-8 pt-4 bg-[#F9FAFB] rounded-b-[40px] border-t border-gray-100">
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-xs font-medium text-gray-500">
                    <span>Subtotal</span>
                    <span>S/ {total.toLocaleString("es-PE")}</span>
                  </div>
                  <div className="flex justify-between text-xs font-medium text-gray-500">
                    <span>Envío</span>
                    <span className="text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded">
                      GRATIS
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                    <span className="text-base font-bold text-[#1d1d1f]">
                      Total a Pagar
                    </span>
                    <span className="text-2xl font-bold text-[#1d1d1f] tracking-tight tabular-nums">
                      S/ {total.toLocaleString("es-PE")}
                    </span>
                  </div>
                </div>

                {/* --- BOTÓN FINAL UX/UI MEJORADO --- */}
                {/* Agregado: Hover Scale + Shadow Effect */}
                <button
                  onClick={handleSendOrder}
                  className={`
                    group relative w-full py-4 rounded-2xl font-bold text-[17px] tracking-wide flex items-center justify-center gap-3 overflow-hidden
                    transition-all duration-200 ease-out active:translate-y-1 active:shadow-none active:border-b-0
                    ${
                      isValid
                        ? "bg-green-500 text-white shadow-lg shadow-green-500/40 border-b-4 border-green-700 hover:brightness-110 hover:scale-[1.02] hover:shadow-green-500/60" // ✅ EFECTO HOVER: Crece y brilla
                        : "bg-gray-200 text-gray-500 border-b-4 border-gray-300 cursor-pointer hover:bg-gray-300"
                    }
                    /* Animación de ERROR (Vibración) */
                    ${isShaking ? "animate-shake bg-red-100 border-red-300 text-red-500" : ""}
                  `}
                >
                  {/* Brillo (Solo cuando es válido) */}
                  {isValid && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] skew-x-[-20deg] group-hover:animate-shine" />
                  )}

                  {isValid ? (
                    <>
                      {/* TU ICONO (Sólido porque tiene fill=currentColor) */}
                      <IOSMessageIcon className="w-6 h-6 animate-in zoom-in spin-in-6 duration-200 text-white" />
                      <span className="animate-in fade-in slide-in-from-bottom-1 duration-200 drop-shadow-sm">
                        Enviar Pedido a WhatsApp
                      </span>
                    </>
                  ) : (
                    <>
                      {/* Texto Incompleto */}
                      <span className="transition-colors group-hover:text-gray-700">
                        Completar Datos
                      </span>
                      {/* Flecha sutil */}
                      <ArrowRight
                        size={18}
                        className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-gray-600"
                      />
                    </>
                  )}
                </button>

                <p className="text-[11px] text-center text-gray-400 mt-4 px-4 leading-relaxed italic">
                  Serás redirigido a WhatsApp para coordinar el pago con un
                  asesor.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ESTILOS GLOBALES PARA ANIMACIONES */}
      <style jsx global>{`
        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-5px);
          }
          75% {
            transform: translateX(5px);
          }
        }
        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }
        @keyframes shine {
          from {
            transform: translateX(-100%) skewX(-20deg);
          }
          to {
            transform: translateX(200%) skewX(-20deg);
          }
        }
        .group-hover\\:animate-shine:hover {
          animation: shine 1.2s infinite linear;
        }
      `}</style>
    </div>
  );
}
