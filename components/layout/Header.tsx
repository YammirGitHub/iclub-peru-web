"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { ShoppingBag, Search } from "lucide-react";
import { motion, AnimatePresence, Variants, MotionConfig } from "framer-motion";
import { useCart } from "@/context/CartContext";
import Logo from "@/components/ui/Logo";
import SearchOverlay from "@/components/ui/SearchOverlay";

// --- CONSTANTES ---
const NAV_LINKS = [
  { name: "Mac", href: "/mac" },
  { name: "iPad", href: "/ipad" },
  { name: "iPhone", href: "/iphone" },
  { name: "Watch", href: "/watch" },
  { name: "AirPods", href: "/airpods" },
  { name: "Accesorios", href: "/accesorios" },
  { name: "Certificados", href: "/certificados" },
  { name: "Soporte", href: "/soporte" },
];

// --- ANIMACIONES ---
const desktopContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delayChildren: 0.1, staggerChildren: 0.06 },
  },
};

const desktopItemVariants: Variants = {
  hidden: { opacity: 0, y: -8, filter: "blur(4px)" }, // Menos movimiento, más sutil
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const mobileContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delayChildren: 0.1, staggerChildren: 0.08 },
  },
};

const mobileItemVariants: Variants = {
  hidden: { opacity: 0, x: -20, filter: "blur(5px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const { toggleCart, cart } = useCart();
  const pathname = usePathname();

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 10);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        // ✨ AJUSTE VISUAL: Un poco más de padding superior inicial (pt-6) para dar autoridad
        className={`fixed top-0 left-0 right-0 z-[100] flex justify-center ${
          isScrolled ? "pt-4 px-4" : "pt-6 px-0"
        }`}
        aria-label="Navegación principal"
      >
        <div
          className={`
            relative flex items-center justify-between transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] will-change-transform
            ${
              isMobileMenuOpen
                ? "w-full bg-transparent px-6 py-4 border-none"
                : isScrolled
                  ? // ✨ PÍLDORA FLOTANTE (Estado Scroll)
                    // max-w-6xl: Ancho generoso
                    // py-3: Altura compacta pero cómoda
                    "w-[94%] max-w-6xl bg-white/75 backdrop-blur-2xl backdrop-saturate-150 rounded-full px-6 py-3 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-white/20"
                  : // ✨ BARRA INICIAL (Estado Top)
                    // max-w-[1440px]: Full width alineado al contenido
                    // py-3: Reduje un poco la altura interna para que el logo se vea más grande en proporción
                    "w-full max-w-[1440px] bg-white/60 backdrop-blur-md px-8 py-3 border-transparent"
            }
            ${isSearchOpen ? "opacity-0 pointer-events-none" : "opacity-100"}
          `}
        >
          {/* LOGO */}
          <div
            className={`
              z-50 shrink-0 transition-all duration-500 origin-left
              ${isMobileMenuOpen ? "opacity-0 pointer-events-none" : "opacity-100"} 
              ${isScrolled ? "scale-95" : "scale-100"} 
            `}
          >
            <Logo />
          </div>

          {/* MENÚ DESKTOP */}
          <motion.div
            key={pathname}
            className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2"
            variants={desktopContainerVariants}
            initial="hidden"
            animate="visible"
          >
            {NAV_LINKS.map((link) => (
              <motion.div key={link.name} variants={desktopItemVariants}>
                <Link
                  href={link.href}
                  // ✨ AJUSTE TIPOGRÁFICO MAESTRO:
                  // text-[14px]: Tamaño estándar premium.
                  // font-medium: Peso ideal (ni muy flaco ni muy gordo).
                  // tracking-[-0.01em]: El secreto de Apple. Letras un pelín más juntas para mayor solidez.
                  // text-[#1d1d1f]/90: Negro suave, no #000.
                  className="text-[14px] font-medium tracking-[-0.01em] text-[#1d1d1f]/90 hover:text-[#F97316] transition-colors relative group"
                >
                  {link.name}
                  {/* Punto indicador minimalista */}
                  <span className="absolute -bottom-1.5 left-1/2 w-1 h-1 bg-[#F97316] rounded-full opacity-0 group-hover:opacity-100 -translate-x-1/2 transition-all duration-300" />
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* ACCIONES (Derecha) */}
          <div className="flex items-center gap-2 md:gap-3 z-50 text-[#1d1d1f]">
            {!isMobileMenuOpen && (
              <>
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  onClick={() => setIsSearchOpen(true)}
                  className="p-2.5 hover:bg-black/[0.05] rounded-full transition-colors duration-300 focus:outline-none"
                  aria-label="Abrir búsqueda"
                >
                  {/* ✨ ICONO: size={20} y stroke={2} para que se vea nítido y con peso */}
                  <Search size={20} strokeWidth={2} aria-hidden="true" />
                </motion.button>

                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9, duration: 0.5 }}
                  id="cart-icon-pixel"
                  onClick={toggleCart}
                  className="p-2.5 relative hover:bg-black/[0.05] rounded-full transition-colors duration-300 focus:outline-none"
                  aria-label={`Ver bolsa de compras, ${cart.length} ítems`}
                >
                  <ShoppingBag size={20} strokeWidth={2} aria-hidden="true" />
                  {cart.length > 0 && (
                    <span className="absolute top-2 right-2 flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F97316] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#F97316]"></span>
                    </span>
                  )}
                </motion.button>
              </>
            )}

            {/* TOGGLE MÓVIL */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden relative h-10 w-10 flex flex-col justify-center items-center hover:bg-black/[0.05] rounded-full transition-colors z-[110] focus:outline-none"
              aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
            >
              <MotionConfig
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <motion.span
                  animate={
                    isMobileMenuOpen
                      ? { rotate: 45, y: 7 }
                      : { rotate: 0, y: 0 }
                  }
                  className="w-5 h-[1.5px] bg-[#1d1d1f] rounded-full absolute"
                  style={{ top: "35%" }}
                />
                <motion.span
                  animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                  className="w-5 h-[1.5px] bg-[#1d1d1f] rounded-full absolute"
                  style={{ top: "50%", marginTop: "-0.75px" }}
                />
                <motion.span
                  animate={
                    isMobileMenuOpen
                      ? { rotate: -45, y: -7 }
                      : { rotate: 0, y: 0 }
                  }
                  className="w-5 h-[1.5px] bg-[#1d1d1f] rounded-full absolute"
                  style={{ bottom: "35%" }}
                />
              </MotionConfig>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* MENÚ MÓVIL */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[95] bg-white/80 backdrop-blur-3xl backdrop-saturate-150 pt-24 px-8 lg:hidden flex flex-col h-screen w-screen overflow-y-auto"
          >
            <motion.div
              variants={mobileContainerVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-1 w-full max-w-lg mx-auto pb-20"
            >
              {NAV_LINKS.map((link) => (
                <motion.div key={link.name} variants={mobileItemVariants}>
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-[28px] font-semibold text-[#1d1d1f] block border-b border-black/[0.05] py-4 hover:text-[#F97316] hover:pl-2 transition-all duration-300"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
