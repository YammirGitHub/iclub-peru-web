"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ShoppingBag, Menu, X, Search } from "lucide-react"; 
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext"; 

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { toggleCart, cart } = useCart();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = ["Mac", "iPad", "iPhone", "Watch", "AirPods", "Seminuevos", "Accesorios", "Soporte"];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        // Sincronizado con tu Hero rápido
        transition={{ duration: 0.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 flex justify-center px-4 transition-all duration-300 ${isScrolled ? "pt-4" : "pt-6"}`}
      >
        <div className={`relative flex items-center justify-between px-6 py-3 transition-all duration-300 rounded-full ${
          isScrolled 
            // --- FÓRMULA APPLE CORREGIDA ---
            // 1. bg-white/80: Más sólido para proteger la lectura en cualquier página.
            // 2. backdrop-saturate-150: Aviva los colores que pasan por detrás (efecto vidrio rico).
            // 3. backdrop-blur-md: Difumina el texto de fondo lo suficiente.
            // 4. ring-1 ring-black/5: Borde ultra sutil para separarlo del fondo gris.
            ? "w-full max-w-5xl bg-white/80 backdrop-blur-md backdrop-saturate-150 shadow-sm border border-white/20 ring-1 ring-black/5" 
            : "w-full max-w-7xl bg-transparent"
        }`}>
          
          {/* LOGO */}
          <Link href="/" className="text-2xl font-bold tracking-tighter text-[#1d1d1f] z-50 hover:opacity-80 transition-opacity">
            iClub Perú<span className="text-[#0071e3]">.</span>
          </Link>

          {/* MENÚ DESKTOP */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link 
                key={item} 
                href={`/${item.toLowerCase()}`} 
                className="text-xs lg:text-sm font-medium text-[#424245] hover:text-[#0071e3] transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>

          {/* ICONOS */}
          <div className="flex items-center gap-5 z-50 text-[#1d1d1f]">
            <button className="hover:text-[#0071e3] transition-colors" aria-label="Buscar">
              <Search size={18} strokeWidth={2.5} />
            </button>
            
            <button 
              onClick={toggleCart} 
              className="hover:text-[#0071e3] transition-colors relative" 
              aria-label="Bolsa"
            >
              <ShoppingBag size={18} strokeWidth={2.5} />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-[#0071e3] text-[8px] text-white justify-center items-center font-bold"></span>
                </span>
              )}
            </button>

            <button className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* MENÚ MÓVIL */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6 text-2xl font-semibold text-[#1d1d1f]">
              {navItems.map((item) => (
                <Link 
                  key={item} 
                  href={`/${item.toLowerCase()}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="border-b border-gray-100 pb-4"
                >
                  {item}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}