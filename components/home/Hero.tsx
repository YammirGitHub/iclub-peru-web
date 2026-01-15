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

  // PARALLAX
  const yParallax = useTransform(scrollY, [0, 1000], [0, 150]);
  const opacityParallax = useTransform(scrollY, [0, 500], [1, 0]);
  const scaleParallax = useTransform(scrollY, [0, 1000], [1, 1.1]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[92vh] w-full flex items-center overflow-hidden bg-white pt-20"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* --- TEXTO --- */}
        <div className="lg:col-span-6 z-10 text-center lg:text-left order-1">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="will-change-opacity"
          >
            {/* Badge con PUNTO VERDE (Stock/Abierto) - Se queda verde por UX */}
            <motion.div
              variants={itemVariants}
              className="mb-6 inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-[#f5f5f7] text-[#86868b] text-[10px] font-bold tracking-[0.2em] uppercase"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                <span className="relative h-2 w-2 rounded-full bg-emerald-500"></span>
              </span>
              iClub Store
            </motion.div>

            {/* Título: "Pro" ahora en Naranja Marca */}
            <motion.div variants={itemVariants}>
              <h1 className="text-5xl md:text-7xl lg:text-[90px] font-semibold tracking-tighter text-[#1d1d1f] leading-[0.95] mb-6">
                Experiencia <br />
                {/* 👇 CAMBIO CLAVE: Naranja Premium (#F97316) */}
                <span className="text-[#F97316]">Pro.</span>
              </h1>
            </motion.div>

            {/* Párrafo */}
            <motion.div variants={itemVariants}>
              <p className="text-xl text-[#86868b] font-medium mb-8 max-w-md mx-auto lg:mx-0 leading-relaxed">
                Tecnología que se siente mágica. Disponible hoy en Chiclayo.
              </p>
            </motion.div>

            {/* Botones */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
            >
              <Link href="/iphone">
                {/* 👇 BOTÓN PRINCIPAL EN NARANJA */}
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
                // El link secundario se queda azul o gris para no competir
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

        {/* --- IMAGEN --- */}
        <div className="lg:col-span-6 relative h-[50vh] lg:h-[85vh] w-full order-2 flex justify-center perspective-1000">
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
              className="object-contain lg:translate-y-4 drop-shadow-2xl"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
