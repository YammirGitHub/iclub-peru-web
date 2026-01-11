"use client";

import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { ChevronRight, ShieldCheck, Truck, Smartphone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// ... (Tus variantes de animación se mantienen igual) ...
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const textVariants: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
  },
};

const imageVariants: Variants = {
  hidden: { opacity: 0, scale: 1.3, filter: "blur(20px)" },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 1.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const widgetVariants: Variants = {
  hidden: { opacity: 0, scale: 0.5, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 260, damping: 20, delay: 1 },
  },
};

export default function Hero() {
  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 500], [0, 80]);

  return (
    // CAMBIO 1: bg-white puro. Quitamos overflow-hidden si no es necesario, pero lo dejamos por seguridad.
    <section className="relative min-h-[100dvh] w-full flex flex-col justify-center overflow-hidden bg-white">
      {/* CAMBIO 2: ELIMINADO EL GRADIENTE DE FONDO. 
          Apple en fondo blanco no usa "ruido" ni gradientes radiales sutiles en el Hero, usa limpieza total. 
      */}

      <div className="max-w-[1200px] mx-auto w-full px-6 md:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center h-full min-h-[100dvh] pt-24 lg:pt-0">
        {/* --- COLUMNA 1: TEXTO --- */}
        <div className="lg:col-span-6 flex flex-col justify-center items-center lg:items-start text-center lg:text-left order-1 h-full">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center lg:items-start max-w-xl"
          >
            {/* BADGE: En fondo blanco, el borde gris debe ser muy sutil */}
            <motion.div
              variants={textVariants}
              className="mb-6 inline-flex items-center gap-2 py-1.5 px-4 rounded-full border border-gray-100 bg-gray-50/50 backdrop-blur-md cursor-default"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[10px] md:text-[11px] font-bold tracking-widest text-gray-500 uppercase">
                iClub Store
              </span>
            </motion.div>

            {/* TITULAR */}
            <motion.h1
              variants={textVariants}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-[85px] font-semibold tracking-[-0.04em] text-[#1d1d1f] leading-[0.95] mb-6"
            >
              Experiencia <br className="hidden sm:block" />
              <span className="text-[#0071e3]">Apple.</span>
            </motion.h1>

            {/* DESCRIPCIÓN: El gris #86868b es perfecto sobre blanco puro */}
            <motion.p
              variants={textVariants}
              className="text-lg md:text-xl text-[#86868b] font-medium leading-relaxed mb-8 md:mb-10 max-w-md"
            >
              La tecnología que define el futuro, ahora más cerca de ti.
              Garantía real y soporte experto en Chiclayo.
            </motion.p>

            {/* BOTONES */}
            <motion.div
              variants={textVariants}
              className="flex flex-row items-center justify-center lg:justify-start gap-4 w-full sm:w-auto"
            >
              <Link href="/iphone">
                {/* Botón azul vibrante sobre fondo blanco = contraste perfecto */}
                <button className="bg-[#0071e3] text-white px-6 md:px-8 py-3.5 md:py-4 rounded-full font-medium text-base md:text-lg transition-all shadow-lg shadow-blue-500/20 hover:bg-[#0077ED] hover:scale-[1.02] active:scale-[0.98] focus:ring-4 focus:ring-blue-500/30 w-auto min-w-[120px]">
                  Comprar
                </button>
              </Link>

              <Link
                href="/iphone"
                className="text-[#0071e3] hover:text-[#06c] flex items-center justify-center gap-1 text-base md:text-lg font-medium group px-4 py-2 transition-colors"
              >
                Ver modelos{" "}
                <ChevronRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
            </motion.div>

            {/* ICONOS */}
            <motion.div
              variants={textVariants}
              className="mt-10 md:mt-12 flex flex-wrap justify-center lg:justify-start gap-x-6 md:gap-x-8 gap-y-3 opacity-80 transition-opacity hover:opacity-100 will-change-transform cursor-default"
            >
              <div className="flex items-center gap-2 text-[11px] md:text-xs font-semibold text-[#1d1d1f] hover:text-emerald-600 transition-colors">
                <ShieldCheck size={16} className="text-emerald-600" />
                <span>Garantía 1 Año</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] md:text-xs font-semibold text-[#1d1d1f] hover:text-blue-600 transition-colors">
                <Truck size={16} className="text-blue-600" />
                <span>Envíos Seguros</span>
              </div>
              <div className="hidden sm:flex items-center gap-2 text-[11px] md:text-xs font-semibold text-[#1d1d1f] hover:text-gray-900 transition-colors">
                <Smartphone size={16} className="text-gray-600" />
                <span>Equipos Sellados</span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* --- COLUMNA 2: IMAGEN (Ajustada para efecto Gigante) --- */}
        <div className="lg:col-span-6 relative h-[50vh] md:h-[60vh] lg:h-full w-full flex items-center justify-center order-2">
          <motion.div
            style={{ y: yParallax }}
            variants={imageVariants}
            initial="hidden"
            animate="visible"
            className="relative w-full h-full flex items-center justify-center"
          >
            <Image
              src="/products/iphone-17-lineup.webp"
              alt="Familia iPhone 17 Pro y modelos nuevos"
              fill
              priority={true}
              sizes="(max-width: 768px) 100vw, 50vw"
              // EXPLICACIÓN DE CLASES SENIOR:
              // 1. object-contain: Mantiene la forma perfecta del celular.
              // 2. scale-110: En móvil, un zoom pequeño (10%) para llenar espacio.
              // 3. md:scale-125: En Tablet, un poco más grande.
              // 4. lg:scale-[1.6]: EN PC, UN ZOOM MASIVO (60%).
              //    Al haber quitado el aire en Squoosh, esto hará que los cels llenen todo.
              className="object-contain scale-110 md:scale-125 lg:scale-[1.6] transition-transform duration-700"
            />

            {/* Widget Flotante (Garantía) */}
            <motion.div
              variants={widgetVariants}
              initial="hidden"
              animate="visible"
              className="hidden sm:flex absolute bottom-4 right-4 lg:bottom-20 lg:right-10 bg-white/80 backdrop-blur-xl p-4 pr-6 rounded-2xl shadow-xl border border-white/40 items-center gap-4 z-20"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-green-400 to-emerald-600 flex items-center justify-center text-white shadow-lg shadow-green-500/30">
                <ShieldCheck className="w-5 h-5" strokeWidth={2.5} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">
                  iClub Protect
                </p>
                <p className="text-sm font-bold text-[#1d1d1f]">
                  Garantía Incluida
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
