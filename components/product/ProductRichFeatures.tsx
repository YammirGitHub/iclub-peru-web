"use client";

import { motion } from "framer-motion";
import { Cpu, Camera, Battery, Shield, Zap, Smartphone } from "lucide-react";
import { Product } from "@/lib/products";

// Mapa de iconos para mapear el string de la BD al componente real
const iconMap = {
  chip: Cpu,
  camera: Camera,
  battery: Battery,
  shield: Shield,
  screen: Smartphone,
};

export default function ProductRichFeatures({ product }: { product: Product }) {
  // 1. VALIDACIÓN DE SEGURIDAD
  // Si el producto no tiene datos de marketing, no renderizamos nada (return null)
  // Esto hace que la web sea escalable: solo los productos importantes tienen esta sección.
  if (!product.marketing) return null;

  const { slogan, subSlogan, features } = product.marketing;

  return (
    <section className="bg-[#101010] text-white py-24 overflow-hidden rounded-[40px] my-8 mx-2 md:mx-6 shadow-2xl">
      {/* HEADER DINÁMICO */}
      <div className="max-w-[1000px] mx-auto px-6 mb-24 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-7xl font-bold tracking-tighter mb-6 bg-gradient-to-br from-white to-gray-500 text-transparent bg-clip-text"
        >
          {slogan}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-lg md:text-2xl text-gray-400 max-w-2xl mx-auto font-medium leading-relaxed"
        >
          {subSlogan}
        </motion.p>
      </div>

      {/* BENTO GRID DINÁMICO */}
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Mapeamos las características desde el JSON */}
          {features.map((feature, index) => {
            // Seleccionamos el icono correcto o usamos uno por defecto
            const IconComponent = iconMap[feature.icon] || Zap;

            // Lógica para que el primer item sea grande (span-2) estilo Apple
            const isLarge = index === 0;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className={`
                  bg-[#1a1a1a] rounded-[32px] p-8 flex flex-col justify-between group relative overflow-hidden
                  ${
                    isLarge
                      ? "md:col-span-2 md:row-span-2 min-h-[300px]"
                      : "min-h-[240px]"
                  }
                `}
              >
                <div className="z-10 relative">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-6 group-hover:bg-blue-500/20 transition-colors">
                    <IconComponent
                      className={`w-6 h-6 ${
                        isLarge ? "text-blue-400" : "text-gray-300"
                      }`}
                    />
                  </div>
                  <h3
                    className={`${
                      isLarge ? "text-3xl" : "text-xl"
                    } font-semibold mb-2`}
                  >
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Decoración de fondo sutil solo para el item grande */}
                {isLarge && (
                  <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-blue-600/10 blur-[80px] rounded-full group-hover:bg-blue-600/20 transition-all duration-700"></div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
