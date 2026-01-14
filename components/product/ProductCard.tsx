"use client";

import Link from "next/link";
import Image from "next/image";
import { Product } from "@/lib/products";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export default function ProductCard({ product }: { product: Product }) {
  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const formatMoney = (amount: number) =>
    new Intl.NumberFormat("es-PE", {
      style: "currency",
      currency: "PEN",
      minimumFractionDigits: 0,
    }).format(amount);

  useEffect(() => {
    // Si no hay video definido, no hacemos nada
    if (!product.video) return;

    let timeout: NodeJS.Timeout;

    if (!showVideo) {
      // 1. Esperar 3 segundos antes de mostrar el video
      timeout = setTimeout(() => {
        console.log("🎬 Intentando reproducir video para:", product.name);
        setShowVideo(true);
      }, 3000);
    } else {
      // 2. Reproducir el video
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        const playPromise = videoRef.current.play();

        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.error("❌ Error reproduciendo video:", error);
            // Si falla el autoplay (ej. navegador bloquea), volvemos a la foto
            setShowVideo(false);
          });
        }
      }
    }

    return () => clearTimeout(timeout);
  }, [showVideo, product.video, product.name]);

  const handleVideoEnd = () => {
    console.log("✅ Video terminó, volviendo a imagen");
    setShowVideo(false);
  };

  // Si el video no carga (ruta mal), vuelve a la imagen
  const handleVideoError = () => {
    console.error(
      "❌ Error: No se encuentra el archivo de video:",
      product.video
    );
    setShowVideo(false);
  };

  return (
    <Link
      href={`/${product.category}/${product.slug}`}
      className="group relative flex flex-col bg-white rounded-[32px] overflow-hidden transition-all duration-500 ease-out 
      shadow-xl shadow-gray-200/60 border border-gray-100
      hover:shadow-2xl hover:shadow-gray-300/50 hover:-translate-y-2 hover:border-transparent"
    >
      {/* Badge Nuevo */}
      {product.isNew && (
        <span className="absolute top-4 left-4 z-20 bg-blue-50 text-blue-600 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-md">
          Nuevo
        </span>
      )}

      {/* ZONA DE MEDIA */}
      <div className="relative w-full aspect-square bg-[#F5F5F7] flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          {/* VIDEO */}
          {showVideo && product.video ? (
            <motion.div
              key="video"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 w-full h-full"
            >
              <video
                ref={videoRef}
                src={product.video}
                muted
                playsInline
                onEnded={handleVideoEnd}
                onError={handleVideoError} // 👈 Importante para detectar errores
                className="w-full h-full object-contain p-8 mix-blend-multiply"
              />
            </motion.div>
          ) : (
            /* IMAGEN */
            <motion.div
              key="image"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full h-full relative p-8"
            >
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain drop-shadow-md transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, 300px"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Info */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-lg font-semibold text-[#1d1d1f] mb-1 group-hover:text-[#0071e3] transition-colors line-clamp-1">
          {product.name}
        </h3>
        <p className="text-sm text-gray-500 mb-4 line-clamp-2">
          {product.description}
        </p>
        <div className="mt-auto flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xl font-bold text-[#1d1d1f]">
              {formatMoney(product.price)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xs text-gray-400 line-through">
                {formatMoney(product.originalPrice)}
              </span>
            )}
          </div>
          <div className="w-10 h-10 rounded-full bg-[#f5f5f7] flex items-center justify-center text-[#1d1d1f] group-hover:bg-[#0071e3] group-hover:text-white transition-all duration-300">
            <ShoppingBag size={18} />
          </div>
        </div>
      </div>
    </Link>
  );
}
