"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}

export default function ParallaxImage({ src, alt, className, priority = false }: ParallaxImageProps) {
  const ref = useRef(null);

  // 1. Detectamos el progreso del scroll en este componente (0 = entra abajo, 1 = sale arriba)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"], // Empieza cuando el top del elemento entra por abajo
  });

  // 2. Transformaciones Matemáticas (Física Apple)
  // Cuando haces scroll, la imagen se mueve en Y un 15% (efecto flotante)
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  // Opcional: Un pequeño zoom sutil al aparecer
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);
  // Opcional: Opacidad para que entre suave
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);

  return (
    <div 
      ref={ref} 
      className={`relative overflow-hidden ${className}`} // overflow-hidden es vital para contener el efecto
    >
      <motion.div style={{ y, scale, opacity }} className="w-full h-full relative">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          priority={priority}
          unoptimized // Solo si usas imágenes locales sin optimizar
        />
      </motion.div>
    </div>
  );
}