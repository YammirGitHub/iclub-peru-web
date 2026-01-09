"use client";

import { motion, useScroll, useTransform } from "framer-motion";
// CORRECCIÓN AQUÍ: Agregué 'ShieldCheck' a la lista de importaciones
import { ArrowRight, ShoppingBag, Star, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  // Efecto Parallax suave para la imagen al hacer scroll
  const { scrollY } = useScroll();
  const yImage = useTransform(scrollY, [0, 500], [0, 80]);

  return (
    <section className="relative min-h-[100dvh] flex flex-col justify-center overflow-hidden bg-[#fbfbfd]">
      
      {/* 1. FONDO AMBIENTAL (Luz sutil estilo Apple Store) */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white via-[#fbfbfd] to-[#f5f5f7] pointer-events-none" />

      <div className="max-w-[1600px] mx-auto w-full px-6 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center h-full pt-32 lg:pt-0">
        
        {/* --- BLOQUE DE TEXTO (Columna Izquierda - 7/12) --- */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
          
          {/* Animación de entrada de textos */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Tagline de Marca */}
            <span className="inline-block mb-4 text-xs font-bold tracking-[0.2em] text-gray-400 uppercase">
              iClub Experience
            </span>

            {/* Titular Masivo y Minimalista */}
            <h1 className="text-6xl sm:text-7xl md:text-8xl xl:text-[100px] font-semibold tracking-tighter text-[#1d1d1f] leading-[0.95] mb-6">
              Tu mundo. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#0071e3] to-[#42a1ff]">
                Elevado.
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-500 font-medium max-w-lg mx-auto lg:mx-0 leading-relaxed mb-10">
              La tecnología que amas, con el respaldo que mereces. Garantía, soporte y ecosistema Apple en un solo lugar.
            </p>

            {/* CÁPSULA DE ACCIÓN (Glassmorphism estilo iOS) */}
            <div className="inline-flex flex-col sm:flex-row items-center gap-2 p-2 rounded-[2rem] bg-white/80 backdrop-blur-2xl border border-white/40 shadow-xl shadow-black/5">
              <Link href="/iphone">
                <button className="px-8 py-4 rounded-full bg-[#1d1d1f] text-white font-medium text-lg transition-transform hover:scale-105 active:scale-95 flex items-center gap-2 shadow-lg">
                  Explorar Tienda <ShoppingBag size={18} />
                </button>
              </Link>
              <Link href="/soporte">
                <button className="px-8 py-4 rounded-full text-[#1d1d1f] font-medium text-lg hover:bg-gray-100 transition-colors flex items-center gap-2">
                  Servicio Técnico <ArrowRight size={18} />
                </button>
              </Link>
            </div>

            {/* Social Proof Minimalista */}
            <div className="mt-10 flex items-center gap-3 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
              <div className="flex -space-x-3">
                 {[1,2,3].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full bg-gray-200 border-2 border-white overflow-hidden relative">
                        {/* Placeholder de avatar - Asegúrate de tener estas imágenes o quita este bloque */}
                       <div className="bg-gray-300 w-full h-full animate-pulse"/> 
                    </div>
                 ))}
              </div>
              <div className="text-xs font-semibold text-gray-800">
                <div className="flex text-[#f59e0b] mb-0.5"><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/></div>
                +1,000 Clientes felices
              </div>
            </div>

          </motion.div>
        </div>

        {/* --- BLOQUE DE IMAGEN (Columna Derecha - 5/12) --- */}
        <div className="lg:col-span-5 relative h-[50vh] lg:h-[80vh] w-full flex items-center justify-center">
          
          <motion.div 
             initial={{ scale: 0.8, opacity: 0 }}
             animate={{ scale: 1, opacity: 1 }}
             transition={{ duration: 1.5, delay: 0.2 }}
             className="absolute w-[400px] h-[400px] bg-blue-100/50 rounded-full blur-3xl -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          />

          <motion.div 
            style={{ y: yImage }}
            initial={{ opacity: 0, x: 100, rotate: 5 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ duration: 1.2, ease: [0.2, 0.8, 0.2, 1] }}
            className="relative w-full h-full max-w-[600px]"
          >
             <Image
              src="/products/hand-holding-iphone.png" 
              alt="iPhone en mano"
              fill
              className="object-contain object-center lg:object-right drop-shadow-2xl"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              unoptimized
            />
            
            {/* Tarjeta Flotante con Icono ShieldCheck */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="absolute bottom-[20%] -left-6 md:-left-12 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/50 max-w-[180px] hidden md:block"
            >
               <div className="flex items-center gap-3 mb-2">
                 <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                   {/* AQUÍ ESTÁ EL ICONO QUE DABA ERROR */}
                   <ShieldCheck size={16} />
                 </div>
                 <div>
                   <p className="text-[10px] text-gray-400 font-bold uppercase">Estado</p>
                   <p className="text-xs font-bold text-gray-800">Garantía Activa</p>
                 </div>
               </div>
               <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                 <div className="w-[80%] h-full bg-green-500 rounded-full"></div>
               </div>
            </motion.div>

          </motion.div>
        </div>

      </div>
    </section>
  );
}