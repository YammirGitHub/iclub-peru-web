"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ShoppingBag, Menu, X, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { NAV_LINKS } from "@/lib/products"; // <--- AQUÍ ESTÁ LA CLAVE DE LA ESCALABILIDAD

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { toggleCart, cart } = useCart();

  // Lógica de Scroll para el efecto "Isla Flotante" de Apple
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} // Curva de animación Apple
        className={`fixed top-0 left-0 right-0 z-50 flex justify-center px-4 transition-all duration-300 ${
          isScrolled ? "pt-4" : "pt-0 md:pt-6"
        }`}
      >
        <div
          className={`relative flex items-center justify-between px-6 py-3 transition-all duration-500 ${
            isScrolled
              ? // --- MODO SCROLL (Efecto Vidrio Premium) ---
                "w-full max-w-5xl rounded-full bg-white/70 backdrop-blur-xl backdrop-saturate-150 shadow-sm border border-white/20 ring-1 ring-black/5"
              : // --- MODO TOP (Transparente y Ancho) ---
                "w-full max-w-7xl bg-transparent border-transparent"
          }`}
        >
          {/* 1. LOGO */}
          <Link
            href="/"
            className="text-xl font-bold tracking-tighter text-[#1d1d1f] z-50 hover:opacity-70 transition-opacity"
          >
            iClub Perú<span className="text-[#0071e3]">.</span>
          </Link>

          {/* 2. MENÚ DESKTOP (Usando NAV_LINKS centralizados) */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-[13px] font-medium text-[#424245] hover:text-black transition-colors tracking-wide"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* 3. ICONOS (Buscar, Carrito, Menú) */}
          <div className="flex items-center gap-4 z-50 text-[#1d1d1f]">
            <button
              className="p-2 hover:bg-black/5 rounded-full transition-colors"
              aria-label="Buscar"
            >
              <Search size={18} strokeWidth={2} />
            </button>

            <button
              onClick={toggleCart}
              className="p-2 hover:bg-black/5 rounded-full transition-colors relative"
              aria-label="Bolsa de compras"
            >
              <ShoppingBag size={18} strokeWidth={2} />
              {cart.length > 0 && (
                <span className="absolute top-1 right-1 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#0071e3]"></span>
                </span>
              )}
            </button>

            {/* Botón Menú Móvil */}
            <button
              className="md:hidden p-2 hover:bg-black/5 rounded-full"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* 4. MENÚ MÓVIL (Overlay completo) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 100% 0%)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 z-40 bg-[#F5F5F7] pt-28 px-8 md:hidden"
          >
            <div className="flex flex-col gap-6">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-2xl font-semibold text-[#1d1d1f] hover:text-[#0071e3] transition-colors block border-b border-gray-200/50 pb-4"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
