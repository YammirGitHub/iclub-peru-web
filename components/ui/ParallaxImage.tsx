"use client";
import { useRef } from "react";
import Image, { StaticImageData } from "next/image"; // Asegúrate de importar el tipo correcto
import { motion, useScroll, useTransform } from "framer-motion";

interface Props {
  src: string | StaticImageData;
  alt: string;
  className?: string;
  priority?: boolean;
}

export default function ParallaxImage({
  src,
  alt,
  className,
  priority = false,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  // 1. Hook Senior: Vinculamos el scroll AL CONTENEDOR, no a la ventana global.
  // "start end" = Cuando el top del contenedor entra por el bottom de la pantalla.
  // "end start" = Cuando el bottom del contenedor sale por el top de la pantalla.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // 2. Transformación Suave:
  // Movemos la imagen un 15% (de -15% a 15%) en el eje Y mientras hacemos scroll.
  // Esto crea el efecto de profundidad sin ser exagerado ni causar mareo.
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={{ willChange: "transform" }} // Optimización GPU
    >
      <motion.div style={{ y }} className="relative w-full h-[120%] -top-[10%]">
        {/* La imagen es un 120% más alta que el contenedor para tener espacio para moverse */}
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
          /* decoding="sync" ayuda a evitar parpadeos en carga inicial */
          decoding="sync"
        />
      </motion.div>
    </div>
  );
}
