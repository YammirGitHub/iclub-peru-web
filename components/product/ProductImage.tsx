"use client";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  src: string;
  title: string;
}

export default function ProductImage({ src, title }: Props) {
  return (
    <div className="relative w-full aspect-square md:aspect-[4/3] flex items-center justify-center">
      {/* Fondo decorativo sutil (Aura) */}
      <div className="absolute inset-0 bg-gradient-to-tr from-gray-50 via-white to-gray-50 rounded-[4rem] -z-10 opacity-60" />

      <AnimatePresence mode="wait">
        <motion.div
          key={src} // Clave para detectar cambio de imagen y re-animar
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 1.05 }} // Salida suave
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} // Curva Apple
          className="relative w-full h-full max-w-[500px] lg:max-w-[600px]"
        >
          <Image
            src={src}
            alt={title}
            fill
            priority
            className="object-contain drop-shadow-2xl transition-all duration-700"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
