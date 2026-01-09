"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Truck, Zap, Smartphone } from "lucide-react";

export default function HomePage() {
  return (
    <main className="bg-white min-h-screen">
      
      {/* --- SECCIÓN 1: HERO (NARRATIVA VISUAL) --- */}
      <section className="relative pt-32 pb-16 md:pt-48 md:pb-32 px-6 flex flex-col items-center text-center overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="z-10 max-w-4xl mx-auto"
        >
          <span className="text-[#d48806] font-semibold tracking-widest uppercase text-xs md:text-sm mb-4 block">
            Nuevo Ingreso
          </span>
          <h1 className="text-6xl md:text-8xl font-semibold tracking-tight text-[#1d1d1f] mb-6">
            iPhone 17 Pro Max
          </h1>
          <p className="text-2xl md:text-3xl font-medium text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed">
            El titán. Potencia A18 Pro, diseño en Titanio y el control de cámara definitivo.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link 
              href="/iphone/iphone-17-pro-max"
              className="bg-[#0071e3] text-white px-8 py-3 rounded-full font-medium hover:bg-[#0077ED] transition-colors text-lg"
            >
              Comprar
            </Link>
            <Link 
              href="/iphone"
              className="text-[#0071e3] hover:underline flex items-center gap-1 text-lg font-medium group"
            >
              Ver todos los iPhone <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform"/>
            </Link>
          </div>
        </motion.div>

        {/* Imagen Hero con efecto sutil al aparecer */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="relative w-full max-w-[1000px] aspect-[16/9] md:aspect-[21/9]"
        >
          {/* Asegúrate de tener una foto horizontal de alta calidad aquí */}
           <Image
            src="/products/iphone-17-pro-max.png" // O una foto de "familia" de productos
            alt="iPhone 16 Pro Max Titanium"
            fill
            className="object-contain"
            priority
            unoptimized
          />
        </motion.div>
      </section>

      {/* --- SECCIÓN 2: BENTO GRID (CARACTERÍSTICAS) --- */}
      <section className="py-24 px-6 bg-[#f5f5f7]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-semibold text-[#1d1d1f] mb-16 text-center md:text-left">
            Conoce la potencia.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[500px]">
            
            {/* Tarjeta 1: Cámara (Grande - Ocupa 2 espacios) */}
            <motion.div 
              whileHover={{ scale: 1.01 }}
              className="md:col-span-2 bg-white rounded-[2.5rem] p-10 md:p-12 relative overflow-hidden flex flex-col justify-start group"
            >
              <div className="z-10 max-w-md">
                <span className="text-gray-500 font-semibold mb-2 block">Cámara Fusion</span>
                <h3 className="text-4xl font-semibold text-[#1d1d1f] mb-4">48 MP. Detalles que desafían la realidad.</h3>
              </div>
              <div className="absolute bottom-[-50px] right-[-50px] w-3/4 h-3/4">
                 {/* Aquí iría una foto detallada de las cámaras */}
                 <Image src="/products/iphone-17-pro-max.png" alt="Cámara" fill className="object-contain object-bottom-right" unoptimized />
              </div>
            </motion.div>

            {/* Tarjeta 2: Chip (Pequeña - Vertical) */}
            <motion.div 
              whileHover={{ scale: 1.01 }}
              className="bg-black rounded-[2.5rem] p-10 flex flex-col justify-center items-center text-center relative overflow-hidden"
            >
               <div className="relative z-10">
                 <h3 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-4">A18 Pro</h3>
                 <p className="text-gray-400 text-lg font-medium">El chip más rápido en un smartphone.</p>
               </div>
               {/* Efecto de fondo sutil */}
               <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-20"></div>
            </motion.div>

            {/* Tarjeta 3: Titanio (Pequeña) */}
            <motion.div 
              whileHover={{ scale: 1.01 }}
              className="bg-white rounded-[2.5rem] p-10 flex flex-col justify-between"
            >
               <h3 className="text-3xl font-semibold text-[#1d1d1f]">Diseño en Titanio.</h3>
               <p className="text-gray-500 mt-2">Fuerte. Ligero. Pro.</p>
               <div className="relative w-full h-40 mt-4">
                  <Image src="/products/iphone-15.png" alt="Titanium" fill className="object-contain" unoptimized />
               </div>
            </motion.div>

             {/* Tarjeta 4: Botón de Acción (Grande) */}
             <motion.div 
              whileHover={{ scale: 1.01 }}
              className="md:col-span-2 bg-white rounded-[2.5rem] p-10 md:p-12 relative overflow-hidden flex flex-row items-center justify-between"
            >
               <div className="max-w-xs z-10">
                 <h3 className="text-3xl font-semibold text-[#1d1d1f] mb-4">Control de Cámara.</h3>
                 <p className="text-gray-500 font-medium">La herramienta perfecta para creadores, ahora al alcance de tu dedo.</p>
               </div>
               {/* Aquí puedes poner un video si tienes, o una foto del botón */}
               <div className="relative w-1/2 h-full">
                  <Image src="/products/iphone-17-pro-max.png" alt="Camera Control" fill className="object-contain" unoptimized />
               </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* --- SECCIÓN 3: POR QUÉ iCLUB (IDENTIDAD ÚNICA) --- */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-semibold text-[#1d1d1f] mb-16">
            La experiencia Apple, <span className="text-gray-400">mejorada por iClub.</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-50 text-[#0071e3] rounded-2xl flex items-center justify-center mb-6">
                <ShieldCheck size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Garantía Real de 1 Año</h3>
              <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
                Olvídate de problemas. Te cubrimos directamente ante cualquier falla de fábrica. Sin letras pequeñas.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-orange-50 text-orange-500 rounded-2xl flex items-center justify-center mb-6">
                <Truck size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Envío Veloz a todo Perú</h3>
              <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
                Llegamos a donde estés. Envíos asegurados y con seguimiento en tiempo real hasta la puerta de tu casa.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-green-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                <Zap size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Servicio Técnico Especializado</h3>
              <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
                No solo vendemos, reparamos. Contamos con laboratorio propio y repuestos originales.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- CALL TO ACTION FINAL --- */}
      <section className="py-24 bg-[#f5f5f7] text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-4xl font-semibold mb-6">¿Listo para dar el salto?</h2>
          <p className="text-gray-500 mb-8 text-lg">Descubre el dispositivo perfecto para tu estilo de vida.</p>
          <div className="flex gap-4 justify-center">
             <Link href="/iphone" className="bg-[#1d1d1f] text-white px-6 py-3 rounded-full font-medium hover:bg-black transition-all">
               Comprar iPhone
             </Link>
             <Link href="/seminuevos" className="bg-white text-[#1d1d1f] border border-gray-300 px-6 py-3 rounded-full font-medium hover:border-gray-400 transition-all">
               Ver Seminuevos
             </Link>
          </div>
        </div>
      </section>

    </main>
  );
}