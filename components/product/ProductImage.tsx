"use client";
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  images: string[];
  title: string;
}

export default function ProductImage({ images, title }: Props) {
  // Estado local para la imagen activa
  const [currentImage, setCurrentImage] = useState(images[0]);

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-4 w-full">
      {/* 1. CARRUSEL DE MINIATURAS (Thumbnails) */}
      {/* En móvil es horizontal scrollable, en escritorio es vertical */}
      <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 justify-center lg:justify-start scrollbar-hide">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(img)}
            aria-label={`Ver imagen ${index + 1} de ${title}`}
            className={`relative w-16 h-16 lg:w-20 lg:h-20 rounded-2xl overflow-hidden border-2 transition-all duration-300 flex-shrink-0 ${
              currentImage === img
                ? "border-[#0071e3] opacity-100 ring-2 ring-[#0071e3]/20"
                : "border-transparent opacity-60 hover:opacity-100 bg-gray-50"
            }`}
          >
            <Image
              src={img}
              alt={`Miniatura ${index}`}
              fill
              sizes="(max-width: 768px) 64px, 80px"
              className="object-contain p-1.5"
            />
          </button>
        ))}
      </div>

      {/* 2. IMAGEN PRINCIPAL (Canvas) */}
      <div className="relative flex-1 bg-[#F5F5F7] rounded-[32px] aspect-square lg:aspect-auto lg:h-[600px] flex items-center justify-center overflow-hidden cursor-zoom-in group">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImage}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative w-full h-full p-8"
          >
            <Image
              src={currentImage}
              alt={title}
              fill
              priority // Carga prioritaria para LCP (Largest Contentful Paint)
              sizes="(max-width: 768px) 100vw, 600px"
              className="object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-700 ease-out"
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
