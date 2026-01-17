"use client";

import { motion, Variants } from "framer-motion";

interface CategoryHeroProps {
  title: string;
  subtitle: string;
  description: string;
  textColor: string;
  categoryKey: string;
}

// 1. VARIANTE ORQUESTADOR (Efecto Cascada "Frase por Frase")
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.1, // Pequeña pausa antes de empezar
      staggerChildren: 0.15, // Retraso entre cada elemento (Subtítulo -> Título -> Descripción)
    },
  },
};

// 2. VARIANTE ITEM (Entrada suave desde abajo)
const itemVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 30, 
    filter: "blur(5px)" 
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1], // Curva Bezier estilo Apple
    },
  },
};

export default function CategoryHero({
  title,
  subtitle,
  description,
  textColor,
  categoryKey,
}: CategoryHeroProps) {
  return (
    // CORRECCIONES DE LAYOUT (Igual que en el Hero principal):
    // 1. pt-0: Eliminamos el relleno superior porque ShopLayout ya tiene 'pt-24'.
    // 2. pb-8 md:pb-12: Espacio equilibrado abajo antes de que empiecen las tarjetas.
    // 3. px-4: Margen lateral seguro para que el texto no toque los bordes en móviles.
    <section className="pt-0 pb-8 md:pb-12 px-4 md:px-6 text-center relative overflow-hidden">
      
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          key={categoryKey} // Vital para reiniciar animación al cambiar de pestaña
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Subtítulo / Badge */}
          <motion.div variants={itemVariants}>
            <span className={`text-xs md:text-sm font-bold tracking-[0.2em] mb-3 block uppercase ${textColor}`}>
              {subtitle}
            </span>
          </motion.div>

          {/* Título Responsivo (Sin romperse en móviles) */}
          <motion.div variants={itemVariants}>
            {/* - text-5xl: En móvil (grande pero cabe).
               - sm:text-7xl: En tablets.
               - md:text-8xl: En escritorio (impactante).
            */}
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold text-[#1d1d1f] tracking-tighter mb-4 leading-tight">
              {title}
            </h1>
          </motion.div>

          {/* Descripción */}
          <motion.div variants={itemVariants}>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-500 font-medium max-w-xl md:max-w-2xl mx-auto leading-relaxed">
              {description}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}