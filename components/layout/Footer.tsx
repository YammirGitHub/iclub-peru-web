"use client";

import Link from "next/link";
import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  Clock,
  MapPin,
} from "lucide-react";
import Logo from "@/components/ui/Logo";
import { SHOP_CONFIG } from "@/lib/constants";

// --- DATA STRUCTURES (Clean Code: Separar datos de la UI) ---
const FOOTER_LINKS = {
  shop: [
    { name: "iPhone", href: "/iphone" },
    { name: "Mac", href: "/mac" },
    { name: "iPad", href: "/ipad" },
    { name: "Watch", href: "/watch" },
    { name: "AirPods", href: "/airpods" },
    { name: "Accesorios", href: "/accesorios" },
  ],
  support: [
    { name: "Servicio Técnico", href: "/soporte" },
    { name: "Estado de reparación", href: "/soporte/estado" },
    { name: "Garantía iClub", href: "/politicas/garantia" },
    { name: "Política de Devoluciones", href: "/politicas/devoluciones" },
    { name: "Términos y Condiciones", href: "/politicas/terminos" },
  ],
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#F5F5F7] text-[#1d1d1f] border-t border-gray-200/80 font-sans">
      {/* 1. SECCIÓN PRINCIPAL (Padding generoso para aire "Premium") */}
      <div className="max-w-[1280px] mx-auto px-6 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* BLOQUE A: MARCA & MISIÓN (Ocupa 4 columnas en Desktop) */}
          <div className="lg:col-span-4 flex flex-col items-start gap-6">
            <div className="origin-left scale-100">
              <Logo />
            </div>
            <p className="text-[13px] leading-relaxed text-[#424245] max-w-sm font-medium">
              Tu destino premium para tecnología Apple en Perú. Nos dedicamos a
              ofrecer productos originales, garantía certificada y una
              experiencia de compra excepcional y segura.
            </p>

            {/* Redes Sociales (Estilo Minimalista) */}
            <div className="flex items-center gap-3">
              <SocialButton
                href={SHOP_CONFIG.socials.facebook}
                icon={<Facebook size={18} />}
                label="Facebook"
              />
              <SocialButton
                href={SHOP_CONFIG.socials.instagram}
                icon={<Instagram size={18} />}
                label="Instagram"
              />
              <SocialButton
                href={SHOP_CONFIG.socials.tiktok}
                icon={<Twitter size={18} />}
                label="TikTok"
              />
            </div>
          </div>

          {/* BLOQUE B: NAVEGACIÓN (Grid interno para enlaces) */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8 lg:gap-4">
            {/* Columna Tienda */}
            <div className="flex flex-col gap-4">
              <h4 className="text-[12px] font-semibold text-[#1d1d1f] uppercase tracking-wider">
                Tienda
              </h4>
              <ul className="flex flex-col gap-3">
                {FOOTER_LINKS.shop.map((link) => (
                  <li key={link.name}>
                    <FooterLink href={link.href}>{link.name}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Columna Soporte */}
            <div className="flex flex-col gap-4">
              <h4 className="text-[12px] font-semibold text-[#1d1d1f] uppercase tracking-wider">
                Soporte
              </h4>
              <ul className="flex flex-col gap-3">
                {FOOTER_LINKS.support.map((link) => (
                  <li key={link.name}>
                    <FooterLink href={link.href}>{link.name}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Columna Contacto (Diseño Integrado) */}
            <div className="flex flex-col gap-4 sm:col-span-1 col-span-2">
              <h4 className="text-[12px] font-semibold text-[#1d1d1f] uppercase tracking-wider">
                Contacto
              </h4>
              <ul className="flex flex-col gap-4">
                <li>
                  <ContactItem
                    icon={<Mail size={16} />}
                    title="Escríbenos"
                    value={SHOP_CONFIG.email}
                  />
                </li>
                <li>
                  <ContactItem
                    icon={<Phone size={16} />}
                    title="Llámanos"
                    value={SHOP_CONFIG.phoneDisplay}
                  />
                </li>
                <li>
                  <div className="flex items-start gap-3 group">
                    <div className="mt-0.5 w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-[#F97316] shadow-sm shrink-0">
                      <Clock size={15} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[11px] font-bold text-[#1d1d1f] uppercase mb-0.5">
                        Horario
                      </span>
                      <span className="text-[13px] text-[#424245]">
                        Lun - Sáb: 10am - 8pm
                      </span>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* 2. BARRA INFERIOR (Copyright & Legal) */}
      <div className="bg-[#F5F5F7] border-t border-gray-200">
        <div className="max-w-[1280px] mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col md:flex-row items-center gap-1 md:gap-4 text-center md:text-left">
            <p className="text-[11px] text-[#86868b]">
              © {currentYear} iClub Perú S.A.C. RUC: 20601234567.
            </p>
            <div className="hidden md:block w-px h-3 bg-gray-300"></div>
            <p className="text-[11px] text-[#86868b]">
              Todos los derechos reservados.
            </p>
          </div>

          <div className="flex items-center gap-6">
            <span className="text-[11px] font-medium text-[#424245]">
              Perú 🇵🇪
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// --- SUBCOMPONENTES ESTILIZADOS (Clean UI) ---

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="text-[13px] text-[#424245] hover:text-[#F97316] hover:translate-x-0.5 transition-all duration-200 inline-block font-medium"
    >
      {children}
    </Link>
  );
}

function SocialButton({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-200/60 text-[#1d1d1f] hover:bg-[#1d1d1f] hover:text-white transition-all duration-300 hover:scale-110"
    >
      {icon}
    </a>
  );
}

function ContactItem({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3 group cursor-default">
      <div className="mt-0.5 w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-[#1d1d1f] shadow-sm shrink-0 group-hover:border-[#F97316]/30 group-hover:text-[#F97316] transition-colors">
        {icon}
      </div>
      <div className="flex flex-col">
        <span className="text-[11px] font-bold text-[#1d1d1f] uppercase mb-0.5">
          {title}
        </span>
        <span className="text-[13px] text-[#424245] group-hover:text-black transition-colors">
          {value}
        </span>
      </div>
    </div>
  );
}
