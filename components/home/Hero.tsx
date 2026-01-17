"use client";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

// 1. VARIANTE ORQUESTADOR
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.15,
    },
  },
};

// 2. VARIANTE ITEM
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(5px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function Hero() {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();

  // PARALLAX SUAVE
  const yParallax = useTransform(scrollY, [0, 1000], [0, 150]);
  const opacityParallax = useTransform(scrollY, [0, 500], [1, 0]);
  const scaleParallax = useTransform(scrollY, [0, 1000], [1, 1.1]);

  return (
    <section
      ref={containerRef}
      // CORRECCIÓN DE LAYOUT:
      // 1. Eliminé 'pt-20' porque el ShopLayout ya tiene padding.
      // 2. Cambié 'min-h-[92vh]' a algo responsivo:
      //    - Móvil: 'min-h-auto' (se adapta al contenido, sin huecos).
      //    - Desktop: 'lg:min-h-[80vh]' (suficiente para verse elegante sin ser enorme).
      // 3. Agregué 'pb-12' para dar aire abajo en móviles.
      className="relative w-full flex items-center overflow-hidden bg-white pb-12 lg:pb-0 lg:min-h-[80vh]"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* --- COLUMNA 1: TEXTO --- */}
        {/* Order-2 en móvil para que la imagen salga primero (estándar e-commerce) o Order-1 si prefieres texto primero */}
        <div className="lg:col-span-6 z-10 text-center lg:text-left order-1 flex flex-col items-center lg:items-start pt-6 lg:pt-0">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="will-change-opacity"
          >
            {/* Badge */}
            <motion.div
              variants={itemVariants}
              className="mb-4 lg:mb-6 inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-[#f5f5f7] text-[#86868b] text-[10px] font-bold tracking-[0.2em] uppercase"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                <span className="relative h-2 w-2 rounded-full bg-emerald-500"></span>
              </span>
              iClub Store
            </motion.div>

            {/* Título Responsivo */}
            <motion.div variants={itemVariants}>
              <h1 className="text-5xl sm:text-6xl lg:text-[90px] font-semibold tracking-tighter text-[#1d1d1f] leading-[0.95] mb-4 lg:mb-6">
                Experiencia <br />
                <span className="text-[#F97316]">Pro.</span>
              </h1>
            </motion.div>

            {/* Párrafo */}
            <motion.div variants={itemVariants}>
              <p className="text-lg sm:text-xl text-[#86868b] font-medium mb-6 lg:mb-8 max-w-md mx-auto lg:mx-0 leading-relaxed">
                Tecnología que se siente mágica. Disponible hoy en Chiclayo.
              </p>
            </motion.div>

            {/* Botones */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
            >
              <Link href="/iphone">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="min-w-[160px] px-8 py-4 rounded-full bg-[#F97316] text-white font-semibold text-[17px] hover:bg-[#ea580c] transition-colors shadow-xl shadow-orange-500/20"
                >
                  Comprar
                </motion.button>
              </Link>
              <Link
                href="/iphone"
                className="group flex items-center gap-1 text-[#1d1d1f] font-medium text-[17px] hover:text-[#F97316] transition-colors mt-2 sm:mt-0"
              >
                Ver modelos{" "}
                <ChevronRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* --- COLUMNA 2: IMAGEN --- */}
        <div className="lg:col-span-6 relative h-[400px] sm:h-[500px] lg:h-[80vh] w-full order-2 flex justify-center perspective-1000 mt-8 lg:mt-0">
          <motion.div
            style={{
              y: yParallax,
              opacity: opacityParallax,
              scale: scaleParallax,
            }}
            initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="relative w-full h-full will-change-transform"
          >
            <Image
              src="/images/iphone/iphone-17-lineup.webp"
              alt="iPhone 17 Pro"
              fill
              priority
              quality={95}
              // Ajuste de imagen: 'object-contain' asegura que se vea todo el teléfono sin recortes
              className="object-contain lg:translate-y-4 drop-shadow-2xl"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
