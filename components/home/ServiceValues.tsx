"use client";

import { ShieldCheck, Truck, Zap, MapPin } from "lucide-react";

export default function ServiceValues() {
  const values = [
    {
      title: "Garantía Real",
      desc: "1 año en equipos sellados. 10 meses en seminuevos. Sin letras chicas.",
      icon: <ShieldCheck className="w-8 h-8 text-[#0071e3]" />,
    },
    {
      title: "Envíos a todo el Perú",
      desc: "Llegamos a donde estés, con seguro al 100% incluido.",
      icon: <Truck className="w-8 h-8 text-orange-500" />,
    },
    {
      title: "Soporte Técnico",
      desc: "Reparamos tu iPhone con repuestos originales.",
      icon: <Zap className="w-8 h-8 text-emerald-600" />,
    },
    {
      title: "Tiendas en Chiclayo",
      desc: "Galería Morro Solar y Real Plaza. Ven a probar los equipos.",
      icon: <MapPin className="w-8 h-8 text-red-500" />,
    },
  ];

  return (
    <section className="py-24 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-semibold text-[#1d1d1f] mb-16 text-center">
          Experiencia iClub.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((v, i) => (
            <div key={i} className="flex flex-col items-start p-6 rounded-2xl hover:bg-[#f5f5f7] transition-colors duration-300">
              <div className="mb-4 bg-white p-3 rounded-2xl shadow-sm ring-1 ring-black/5">
                {v.icon}
              </div>
              <h3 className="text-lg font-semibold text-[#1d1d1f] mb-2">{v.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}