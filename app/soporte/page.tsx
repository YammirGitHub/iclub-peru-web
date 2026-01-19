"use client";

import {
  ArrowRight,
  Battery,
  Smartphone,
  ShieldAlert,
  Wrench,
  CheckCircle2,
  Volume2,
  Sparkles,
  Camera,
} from "lucide-react";
import { SHOP_CONFIG } from "@/lib/constants"; // 👈 IMPORTACIÓN CLAVE

export default function SoportePage() {
  // Helper para generar links limpios sin repetir código
  const getWALink = (msg: string) =>
    `${SHOP_CONFIG.whatsappUrl}${SHOP_CONFIG.phone}?text=${encodeURIComponent(msg)}`;

  return (
    <main className="min-h-screen bg-white">
      {/* HEADER CORREGIDO: pt-32 en móvil para no ser tapado por el Navbar */}
      <section className="pt-0 pb-12 px-6 lg:px-12 text-center max-w-[1400px] mx-auto">
        <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 bg-white rounded-full shadow-md border border-gray-100 animate-fade-in-up">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-[11px] font-bold text-gray-500 tracking-widest uppercase">
            Laboratorio Certificado
          </span>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-[90px] font-semibold text-[#1d1d1f] tracking-tighter leading-[0.95] mb-6 animate-fade-in-up delay-100">
          Reparación. <br />
          <span className="text-gray-400">Redefinida.</span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-500 font-medium max-w-2xl mx-auto leading-relaxed animate-fade-in-up delay-200">
          Tu dispositivo merece manos expertas. Diagnóstico de precisión y
          repuestos originales en tiempo récord.
        </p>
      </section>

      {/* BENTO GRID MODULAR */}
      <section className="px-4 sm:px-6 lg:px-12 pb-24 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 auto-rows-[380px]">
          {/* 1. PANTALLA (Gigante) - Color AZUL */}
          <a
            href={getWALink("Hola iClub, necesito cambio de pantalla")}
            target="_blank"
            className="group relative col-span-1 lg:col-span-2 lg:row-span-2 bg-white rounded-[40px] p-10 flex flex-col justify-between overflow-hidden 
            border border-gray-200 shadow-[0_8px_30px_rgba(0,0,0,0.04)] 
            transition-all duration-500 ease-out 
            hover:-translate-y-2 hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-500/10"
          >
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-blue-50/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                <Smartphone strokeWidth={1.5} size={32} />
              </div>
              <h3 className="text-4xl font-bold text-[#1d1d1f] mb-4">
                Pantalla & Vidrio
              </h3>
              <p className="text-lg text-gray-500 max-w-sm leading-relaxed">
                Recupera la nitidez Retina. Reemplazo de cristal o panel
                completo manteniendo True Tone.
              </p>
            </div>
            <div className="relative z-10 flex items-center gap-2 text-blue-600 font-bold text-lg group-hover:translate-x-2 transition-transform">
              Cotizar Cambio <ArrowRight size={20} />
            </div>
          </a>

          {/* 2. BATERÍA (Oscura) - Color VERDE */}
          <a
            href={getWALink("Hola iClub, necesito cambio de batería")}
            target="_blank"
            className="group relative col-span-1 lg:col-span-2 bg-[#1d1d1f] rounded-[40px] p-10 flex flex-col justify-center overflow-hidden 
            shadow-[0_20px_50px_-12px_rgba(0,0,0,0.3)] 
            transition-all duration-500 ease-out 
            hover:-translate-y-2 hover:shadow-green-900/40"
          >
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Battery className="text-green-400" size={32} />
                  <span className="text-green-400 font-bold tracking-widest uppercase text-xs">
                    Energía
                  </span>
                </div>
                <h3 className="text-3xl font-bold text-white mb-2">
                  Batería al 100%
                </h3>
                <p className="text-gray-400 text-lg">
                  Vuelve a tener autonomía para todo el día.
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-4 rounded-full group-hover:bg-white group-hover:text-black text-white transition-all duration-300">
                <ArrowRight size={24} />
              </div>
            </div>
            {/* Decoración Verde */}
            <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-green-500/20 rounded-full blur-[80px]" />
          </a>

          {/* 3. FACE ID - Color MORADO */}
          <a
            href={getWALink("Hola iClub, falla mi Face ID")}
            target="_blank"
            className="group relative col-span-1 bg-white rounded-[40px] p-8 flex flex-col justify-between 
            border border-gray-200 shadow-[0_8px_30px_rgba(0,0,0,0.04)] 
            transition-all duration-500 ease-out 
            hover:-translate-y-2 hover:border-purple-200 hover:shadow-2xl hover:shadow-purple-500/10"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110">
                <ShieldAlert strokeWidth={1.5} size={24} />
              </div>
              <h3 className="text-2xl font-bold text-[#1d1d1f] mb-3">
                Face ID
              </h3>
              <p className="text-sm text-gray-500">
                Calibración de sensores True Depth.
              </p>
            </div>
            <span className="text-sm font-bold text-purple-600 group-hover:underline">
              Consultar
            </span>
          </a>

          {/* 4. CÁMARAS - Color ROSA */}
          <a
            href={getWALink("Hola iClub, falla mi cámara")}
            target="_blank"
            className="group relative col-span-1 bg-white rounded-[40px] p-8 flex flex-col justify-between 
            border border-gray-200 shadow-[0_8px_30px_rgba(0,0,0,0.04)] 
            transition-all duration-500 ease-out 
            hover:-translate-y-2 hover:border-pink-200 hover:shadow-2xl hover:shadow-pink-500/10"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110">
                <Camera strokeWidth={1.5} size={24} />
              </div>
              <h3 className="text-2xl font-bold text-[#1d1d1f] mb-3">
                Cámaras
              </h3>
              <p className="text-sm text-gray-500">
                Limpieza y reparación de lentes.
              </p>
            </div>
            <span className="text-sm font-bold text-pink-600 group-hover:underline">
              Consultar
            </span>
          </a>

          {/* 5. AUDIO - Color INDIGO */}
          <a
            href={getWALink("Hola iClub, falla mi audio")}
            target="_blank"
            className="group relative col-span-1 bg-white rounded-[40px] p-8 flex flex-col justify-between 
            border border-gray-200 shadow-[0_8px_30px_rgba(0,0,0,0.04)] 
            transition-all duration-500 ease-out 
            hover:-translate-y-2 hover:border-indigo-200 hover:shadow-2xl hover:shadow-indigo-500/10"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110">
                <Volume2 strokeWidth={1.5} size={24} />
              </div>
              <h3 className="text-2xl font-bold text-[#1d1d1f] mb-3">Audio</h3>
              <p className="text-sm text-gray-500">
                Parlantes, micrófonos y auricular.
              </p>
            </div>
            <span className="text-sm font-bold text-indigo-600 group-hover:underline">
              Consultar
            </span>
          </a>

          {/* 6. LIMPIEZA - Color CYAN */}
          <a
            href={getWALink("Hola iClub, quiero mantenimiento")}
            target="_blank"
            className="group relative col-span-1 bg-white rounded-[40px] p-8 flex flex-col justify-between 
            border border-gray-200 shadow-[0_8px_30px_rgba(0,0,0,0.04)] 
            transition-all duration-500 ease-out 
            hover:-translate-y-2 hover:border-cyan-200 hover:shadow-2xl hover:shadow-cyan-500/10"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110">
                <Sparkles strokeWidth={1.5} size={24} />
              </div>
              <h3 className="text-2xl font-bold text-[#1d1d1f] mb-3">Spa</h3>
              <p className="text-sm text-gray-500">
                Mantenimiento y limpieza profunda.
              </p>
            </div>
            <span className="text-sm font-bold text-cyan-600 group-hover:underline">
              Consultar
            </span>
          </a>

          {/* 7. MICROSOLDADURA - Color NARANJA */}
          <a
            href={getWALink("Hola iClub, tengo un problema de placa")}
            target="_blank"
            className="group relative col-span-1 md:col-span-2 lg:col-span-2 bg-white rounded-[40px] p-10 flex items-center justify-between 
            border border-gray-200 shadow-[0_8px_30px_rgba(0,0,0,0.04)] 
            transition-all duration-500 ease-out 
            hover:-translate-y-2 hover:border-orange-200 hover:shadow-2xl hover:shadow-orange-500/10"
          >
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Wrench size={18} className="text-orange-500" />
                <span className="text-orange-500 font-bold text-xs uppercase tracking-wider">
                  Nivel Ingeniería
                </span>
              </div>
              <h3 className="text-3xl font-bold text-[#1d1d1f] mb-2">
                Micro-soldadura
              </h3>
              <p className="text-gray-500">
                Diagnóstico avanzado de placa lógica y señal.
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-[#F97316] group-hover:text-white transition-all duration-300">
              <ArrowRight size={20} />
            </div>
          </a>
        </div>

        {/* FOOTER DE CONFIANZA */}
        <div className="mt-16 text-center border-t border-gray-100 pt-16">
          <p className="text-2xl font-semibold text-[#1d1d1f] mb-8">
            ¿Por qué elegir el laboratorio iClub?
          </p>
          <div className="flex flex-wrap justify-center gap-4 lg:gap-8">
            <TrustItem text="Repuestos Originales" />
            <TrustItem text="Técnicos Certificados" />
            <TrustItem text="6 Meses de Garantía" />
            <TrustItem text="Diagnóstico Gratuito" />
          </div>
        </div>
      </section>
    </main>
  );
}

function TrustItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2 bg-white px-5 py-3 rounded-full shadow-md border border-gray-100 text-sm font-bold text-gray-600 transition-transform hover:-translate-y-1">
      <CheckCircle2 size={16} className="text-green-500" />
      {text}
    </div>
  );
}
