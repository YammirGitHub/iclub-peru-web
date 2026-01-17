"use client";

import { motion, Variants } from "framer-motion";

interface CategoryHeroProps {
  title: string;
  subtitle: string;
  description: string;
  textColor: string;
  // Pasamos la categoría para usarla como "llave" de reinicio
  categoryKey: string;
}

export default function CategoryHero({
  title,
  subtitle,
  description,
  textColor,
  categoryKey,
}: CategoryHeroProps) {
  // CORRECCIÓN 1: Tipamos explícitamente como 'Variants'
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  // CORRECCIÓN 2: Tipamos 'Variants' y forzamos el tipo del array 'ease'
  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 20,
      filter: "blur(10px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        // EL FIX CLAVE: 'as const' o el cast específico le dice a TS que son exactamente 4 números
        ease: [0.2, 0.65, 0.3, 0.9] as [number, number, number, number],
      },
    },
  };

  return (
    <div className="pt-6 pb-10 px-6 text-center relative overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          key={categoryKey}
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Subtítulo */}
          <motion.span
            variants={itemVariants}
            className={`text-xs font-bold tracking-[0.2em] mb-4 block ${textColor}`}
          >
            {subtitle}
          </motion.span>

          {/* Título Principal */}
          <motion.h1
            variants={itemVariants}
            className="text-6xl md:text-8xl font-bold text-[#1d1d1f] tracking-tighter mb-6"
          >
            {title}
          </motion.h1>

          {/* Descripción */}
          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-gray-500 font-medium max-w-2xl mx-auto leading-relaxed"
          >
            {description}
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
