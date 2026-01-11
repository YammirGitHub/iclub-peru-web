"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ShoppingBag, Menu, X, Search } from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion"; // Importamos Variants
import { useCart } from "@/context/CartContext";
import { NAV_LINKS } from "@/lib/products";

// --- ANIMACIONES DE ENTRADA PARA LOS LINKS ---
const navContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3, // Espera a que baje la barra
      staggerChildren: 0.1, // Efecto cascada entre links
    },
  },
};

const navItemVariants: Variants = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { toggleCart, cart } = useCart();

  useEffect(() => {
    // Optimizamos el listener para que no sature el hilo principal
    const handleScroll = () => {
      // Usamos requestAnimationFrame para sincronizar con la tasa de refresco
      requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 20);
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true }); // passive: true mejora rendimiento
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        // AGREGADO: transform-gpu y will-change para evitar lag con el blur
        className={`fixed top-0 left-0 right-0 z-50 flex justify-center px-4 transition-all duration-300 transform-gpu will-change-transform ${
          isScrolled ? "pt-4" : "pt-0 md:pt-6"
        }`}
      >
        <div
          className={`relative flex items-center justify-between px-6 py-3 transition-all duration-300 ${
            // Bajamos a duration-300 para que sea más "snappy"
            isScrolled
              ? "w-full max-w-5xl rounded-full bg-white/70 backdrop-blur-xl backdrop-saturate-150 shadow-sm border border-white/20 ring-1 ring-black/5"
              : "w-full max-w-7xl bg-transparent border-transparent"
          }`}
        >
          {/* LOGO */}
          <Link
            href="/"
            className="text-xl font-bold tracking-tighter text-[#1d1d1f] z-50 hover:opacity-70 transition-opacity"
          >
            iClub <span className="hidden sm:inline font-bold">Perú</span>
            <span className="text-[#0071e3]">.</span>
          </Link>

          {/* MENÚ DESKTOP CON EFECTO DE ENTRADA */}
          <motion.div
            variants={navContainerVariants}
            initial="hidden"
            animate="visible"
            className="hidden md:flex items-center gap-8"
          >
            {NAV_LINKS.map((link) => (
              <motion.div key={link.name} variants={navItemVariants}>
                <Link
                  href={link.href}
                  className="text-[13px] font-medium text-[#424245] hover:text-[#0071e3] transition-all duration-300 tracking-wide hover:scale-105 block"
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* ICONOS */}
          <div className="flex items-center gap-2 md:gap-4 z-50 text-[#1d1d1f]">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 hover:bg-black/5 rounded-full transition-colors"
              aria-label="Buscar"
            >
              <Search size={18} strokeWidth={2.5} />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleCart}
              className="p-2 hover:bg-black/5 rounded-full transition-colors relative"
              aria-label="Bolsa de compras"
            >
              <ShoppingBag size={18} strokeWidth={2.5} />
              {cart.length > 0 && (
                <span className="absolute top-1 right-1 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#0071e3]"></span>
                </span>
              )}
            </motion.button>

            {/* Menú Móvil Toggle */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="md:hidden p-2 hover:bg-black/5 rounded-full transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* MENÚ MÓVIL */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            className="fixed inset-0 z-40 bg-[#F5F5F7]/90 pt-28 px-8 md:hidden flex flex-col justify-start"
          >
            <div className="flex flex-col gap-4">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 + i * 0.05, ease: "easeOut" }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-3xl font-semibold text-[#1d1d1f] active:text-[#0071e3] transition-colors block border-b border-gray-200/50 pb-6 pt-2"
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
