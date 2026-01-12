"use client";
import { motion } from "framer-motion";
import { ShieldCheck, Truck, Headphones, CreditCard } from "lucide-react";

const values = [
  {
    icon: <ShieldCheck className="text-[#0071e3]" size={32} />,
    title: "Garantía Real",
    description: "Equipos 100% originales con garantía técnica certificada.",
  },
  {
    icon: <Truck className="text-[#0071e3]" size={32} />,
    title: "Envíos Seguros",
    description: "Llegamos a todo el Perú con empaques de alta seguridad.",
  },
  {
    icon: <Headphones className="text-[#0071e3]" size={32} />,
    title: "Soporte Experto",
    description:
      "Asesoría personalizada por WhatsApp antes y después de tu compra.",
  },
  {
    icon: <CreditCard className="text-[#0071e3]" size={32} />,
    title: "Pagos Flexibles",
    description: "Aceptamos transferencias, Yape, Plin y tarjetas de crédito.",
  },
];

export default function ServiceValues() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {values.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center text-center space-y-4"
            >
              <div className="p-4 bg-[#F5F5F7] rounded-2xl">{item.icon}</div>
              <h3 className="text-lg font-bold text-[#1d1d1f]">{item.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
