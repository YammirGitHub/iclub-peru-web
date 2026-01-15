"use client";
import { motion } from "framer-motion";
import { ShieldCheck, Truck, Headphones, CreditCard } from "lucide-react";

const values = [
  {
    icon: <ShieldCheck size={32} />,
    title: "Garantía Real",
    description: "Equipos 100% originales con garantía técnica certificada.",
  },
  {
    icon: <Truck size={32} />,
    title: "Envíos Seguros",
    description: "Llegamos a todo el Perú con empaques de alta seguridad.",
  },
  {
    icon: <Headphones size={32} />,
    title: "Soporte Experto",
    description: "Asesoría personalizada por WhatsApp post-venta.",
  },
  {
    icon: <CreditCard size={32} />,
    title: "Pagos Flexibles",
    description: "Aceptamos todas las tarjetas, Yape y Plin sin recargo.",
  },
];

export default function ServiceValues() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Fondo decorativo sutil */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[400px] bg-orange-50 rounded-full blur-3xl -z-10 opacity-30" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-semibold text-[#1d1d1f] tracking-tight mb-4">
            Experiencia <span className="text-[#F97316]">iClub.</span>
          </h2>
          <p className="text-[#86868b] text-xl font-medium">
            Confianza oficial en cada paso.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-[2rem] p-8 text-center flex flex-col items-center
              border border-gray-100 shadow-xl shadow-gray-200/40
              hover:shadow-2xl hover:shadow-orange-100/50 hover:-translate-y-2 hover:border-orange-100 transition-all duration-300 group"
            >
              {/* 👇 CAMBIO CLAVE: Iconos Unificados en Naranja Premium.
                 Esto crea una identidad visual corporativa fuerte.
              */}
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 bg-[#fff7ed] text-[#F97316] group-hover:bg-[#F97316] group-hover:text-white transition-colors duration-300">
                {item.icon}
              </div>

              <h3 className="text-lg font-bold text-[#1d1d1f] mb-3">
                {item.title}
              </h3>

              <p className="text-sm text-gray-500 leading-relaxed font-medium">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
