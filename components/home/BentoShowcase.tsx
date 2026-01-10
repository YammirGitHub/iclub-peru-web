"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { motion, Variants } from "framer-motion";
// --- BOTONES APPLE STYLE (Optimizados) ---
const ActionButtons = ({ dark = false, link }: { dark?: boolean; link: string }) => (
  <div className="flex items-center gap-4 mt-6 z-20 relative">
    <Link href={link}>
      <motion.button 
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`px-5 py-2 rounded-full font-medium text-[14px] transition-all duration-300 ${
          dark 
            ? 'bg-white text-black hover:bg-gray-100' 
            : 'bg-[#0071e3] text-white hover:bg-[#0077ed] shadow-lg shadow-blue-500/20'
        }`}
      >
        Comprar
      </motion.button>
    </Link>
    <Link href={link} className={`group flex items-center gap-1 text-[14px] font-medium transition-colors ${dark ? 'text-gray-300 hover:text-white' : 'text-[#0071e3] hover:text-[#0077ed]'}`}>
      <span className="group-hover:underline">Más información</span>
      <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
    </Link>
  </div>
);

// --- ANIMACIONES ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
  }
};

export default function BentoShowcase() {
  return (
    <section className="py-20 px-4 md:px-6 bg-white overflow-hidden">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="max-w-[1400px] mx-auto"
      >
        {/* Título de Sección Sutil */}
        <div className="mb-12">
            <h2 className="text-3xl md:text-5xl font-semibold text-[#1d1d1f]">Lo último de Apple.</h2>
        </div>

        {/* --- GRILLA ASIMÉTRICA BENTO (CSS Grid avanzado) --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[550px]">
           
           {/* 1. MACBOOK PRO (La tarjeta "Hero" ancha) - Ocupa 2 columnas en LG */}
           <motion.div variants={cardVariants} className="relative lg:col-span-2 bg-black rounded-[2.5rem] overflow-hidden group cursor-pointer flex flex-col md:flex-row items-center justify-between p-10 md:p-14 shadow-2xl shadow-black/20">
             <div className="z-10 flex flex-col items-center md:items-start text-center md:text-left w-full md:w-1/2 mb-8 md:mb-0">
                <h3 className="text-4xl md:text-5xl font-semibold text-white mb-2">MacBook Pro</h3>
                <p className="text-xl text-gray-400 font-medium">Moverá tu mundo.</p>
                <ActionButtons dark={true} link="/mac" />
             </div>
             {/* Imagen con efecto de flotación */}
             <div className="relative w-full md:w-2/3 h-64 md:h-full transform transition-transform duration-700 group-hover:scale-105 group-hover:-translate-x-2">
                <Image 
                    src="/products/macbook-pro-m3.png" 
                    alt="MacBook Pro" 
                    fill 
                    className="object-contain" 
                    unoptimized 
                />
             </div>
           </motion.div>

           {/* 2. APPLE WATCH ULTRA (Tarjeta Vertical) */}
           <motion.div variants={cardVariants} className="relative bg-[#f5f5f7] rounded-[2.5rem] overflow-hidden group cursor-pointer flex flex-col items-center pt-12 text-center hover:bg-[#efeff1] transition-colors">
             <div className="z-10 px-6 mb-4 transform transition-transform duration-500 group-hover:-translate-y-1">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <span className="text-3xl font-semibold text-[#1d1d1f]">WATCH</span>
                </div>
                <p className="text-orange-600 font-bold tracking-widest text-[10px] uppercase mb-2">ULTRA 2</p>
                <p className="text-lg text-[#1d1d1f] font-medium leading-tight">Aventura de otro nivel.</p>
                <div className="mt-4 flex justify-center scale-90 origin-top"><ActionButtons link="/watch" /></div>
             </div>
             <div className="relative w-full h-full mt-4">
                <Image 
                    src="/products/watch-ultra.png" 
                    alt="Apple Watch" 
                    fill 
                    className="object-contain object-bottom group-hover:scale-110 transition-transform duration-700 mix-blend-multiply pb-6" 
                    unoptimized 
                />
             </div>
           </motion.div>

           {/* 3. iPAD AIR (Tarjeta Clara) */}
           <motion.div variants={cardVariants} className="relative bg-white border border-gray-100 rounded-[2.5rem] overflow-hidden group cursor-pointer flex flex-col items-center justify-center p-8 text-center hover:shadow-xl hover:border-transparent transition-all duration-500">
             <div className="mb-6 z-10 transform transition-transform duration-500 group-hover:-translate-y-2">
                <h3 className="text-3xl md:text-4xl font-semibold text-[#1d1d1f] mb-1">iPad Air</h3>
                <p className="text-lg text-gray-500 font-medium">Dos tamaños. Chip M2.</p>
                 <div className="mt-2 flex justify-center scale-90"><ActionButtons link="/ipad" /></div>
             </div>
             <div className="relative w-full h-64">
                <Image 
                    src="/products/ipad-air.png" 
                    alt="iPad" 
                    fill 
                    className="object-contain group-hover:scale-105 transition-transform duration-500" 
                    unoptimized 
                />
             </div>
           </motion.div>

           {/* 4. AIRPODS PRO (Tarjeta Ancha en LG para cerrar) - Ocupa 2 columnas */}
           <motion.div variants={cardVariants} className="relative lg:col-span-2 bg-[#f5f5f7] rounded-[2.5rem] overflow-hidden group cursor-pointer flex flex-col md:flex-row-reverse items-center justify-between p-10 md:p-14">
             <div className="z-10 flex flex-col items-center md:items-start text-center md:text-left w-full md:w-1/2 mb-8 md:mb-0 transform transition-transform duration-500 group-hover:-translate-x-2">
                <h3 className="text-3xl md:text-4xl font-semibold text-[#1d1d1f] mb-2">AirPods Pro</h3>
                <p className="text-xl text-gray-500 font-medium">Audio adaptativo. Magia que se oye.</p>
                <ActionButtons link="/airpods" />
             </div>
             <div className="relative w-full md:w-1/2 h-64 md:h-80 transform transition-transform duration-700 ease-out group-hover:scale-105">
                <Image 
                    src="/products/airpods-pro.png" 
                    alt="AirPods Pro" 
                    fill 
                    className="object-contain mix-blend-multiply" 
                    unoptimized 
                />
             </div>
           </motion.div>

        </div>
      </motion.div>
    </section>
  );
}