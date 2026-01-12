"use client";
import { ShieldCheck, Truck, Zap, MapPin } from "lucide-react";
import { motion } from "framer-motion";

export default function ServiceValues() {
  const values = [
    {
      title: "Garantía Real",
      desc: "1 año en equipos sellados. Respaldo directo iClub.",
      icon: <ShieldCheck size={24} />,
    },
    {
      title: "Envíos Seguros",
      desc: "Llegamos a todo el Perú con seguro 100% incluido.",
      icon: <Truck size={24} />,
    },
    {
      title: "Soporte Experto",
      desc: "Técnicos certificados listos para ayudarte.",
      icon: <Zap size={24} />,
    },
    {
      title: "Tiendas Físicas",
      desc: "Visítanos en Chiclayo: Centro y Real Plaza.",
      icon: <MapPin size={24} />,
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-semibold text-[#1d1d1f] tracking-tight mb-4">
            Experiencia iClub.
          </h2>
          <p className="text-[#86868b] text-xl font-medium">
            Confianza oficial en cada paso.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => (
            <motion.div
              whileHover={{ y: -5 }} // Sutil, no exagerado
              transition={{ type: "spring", stiffness: 400, damping: 25 }} // Muy rápido (400)
              key={i}
              className="group p-8 rounded-[2.5rem] bg-[#f5f5f7] border border-transparent hover:border-gray-200 transition-all duration-300 flex flex-col items-center text-center"
            >
              <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-[#0071e3] mb-6 shadow-sm group-hover:shadow-md transition-all">
                {v.icon}
              </div>
              <h3 className="text-lg font-semibold text-[#1d1d1f] mb-2">
                {v.title}
              </h3>
              <p className="text-sm text-[#86868b] leading-relaxed max-w-[200px]">
                {v.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
