// Hero.tsx (Versión Optimizada)
"use client";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  Variants,
} from "framer-motion";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// VARIANTE DE TEXTO APPLE: Entra rápido, frena suave + Blur elegante
const textVariants: Variants = {
  hidden: { opacity: 0, y: 15, filter: "blur(10px)" }, // Blur más fuerte al inicio
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.6, // MÁS RÁPIDO (Antes 0.8)
      ease: [0.25, 0.1, 0.25, 1], // Curva Bezier agresiva al inicio
    },
  },
};

export default function Hero() {
  const { scrollY } = useScroll();
  const rawY = useTransform(scrollY, [0, 500], [0, 80]);

  // PARALLAX REACTIVO (Sin Lag)
  const yParallax = useSpring(rawY, {
    stiffness: 120, // Respuesta inmediata
    damping: 25, // Sin rebote
    restDelta: 0.001,
  });

  return (
    <section className="relative min-h-[90dvh] lg:min-h-screen w-full flex items-center overflow-hidden bg-white pt-20">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* TEXTO */}
        <div className="lg:col-span-6 z-10 text-center lg:text-left order-2 lg:order-1">
          <motion.div
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.08 }}
          >
            {" "}
            {/* Stagger más rápido */}
            {/* Badge */}
            <motion.div
              variants={textVariants}
              className="mb-6 inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-[#f5f5f7] text-[#86868b] text-[10px] font-bold tracking-[0.2em] uppercase"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative h-2 w-2 rounded-full bg-emerald-500"></span>
              </span>
              iClub Store
            </motion.div>
            {/* Título Principal */}
            <motion.h1
              variants={textVariants}
              className="text-5xl md:text-7xl lg:text-[85px] font-semibold tracking-[-0.04em] text-[#1d1d1f] leading-[0.95] mb-6"
            >
              Experiencia <br /> <span className="text-[#0071e3]">Apple.</span>
            </motion.h1>
            <motion.p
              variants={textVariants}
              className="text-lg md:text-xl text-[#86868b] font-medium mb-10 max-w-md mx-auto lg:mx-0"
            >
              La tecnología que define el futuro, ahora en Chiclayo con garantía
              real.
            </motion.p>
            {/* Botones */}
            <motion.div
              variants={textVariants}
              className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
            >
              <Link href="/iphone">
                <button className="bg-[#0071e3] text-white px-10 py-4 rounded-full font-semibold text-lg hover:bg-[#0077ed] transition-all shadow-lg shadow-blue-500/20 active:scale-95 transform-gpu">
                  Comprar
                </button>
              </Link>
              <Link
                href="/iphone"
                className="text-[#0071e3] font-medium text-lg group flex items-center gap-1"
              >
                Ver modelos{" "}
                <ChevronRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* IMAGEN PARALLAX (Optimizada GPU) */}
        <div className="lg:col-span-6 relative h-[45vh] lg:h-[80vh] w-full order-1 lg:order-2 flex justify-center">
          <motion.div
            style={{ y: yParallax }}
            initial={{ opacity: 0, scale: 1.15, filter: "blur(10px)" }} // Blur inicial en imagen también
            animate={{ opacity: 1, scale: 1.1, filter: "blur(0px)" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative w-full h-full transform-gpu will-change-transform" // CLAVE PARA NO LAG
          >
            <Image
              src="/products/iphone-17-lineup.webp"
              alt="iPhone 17"
              fill
              priority // Carga inmediata LCP
              className="object-contain lg:translate-y-8"
              sizes="(max-width: 768px) 100vw, 50vw" // Optimización de tamaño
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
