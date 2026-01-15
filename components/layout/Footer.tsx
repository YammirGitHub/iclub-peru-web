"use client";

import Link from "next/link";
import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  ArrowRight,
} from "lucide-react";
import Logo from "@/components/ui/Logo";

export default function Footer() {
  return (
    <footer className="bg-[#F5F5F7] text-[#1d1d1f] pt-16 pb-8 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6">
        {/* Grid Principal */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12 mb-12">
          {/* COLUMNA 1: MARCA */}
          <div className="col-span-2 lg:col-span-1 space-y-4">
            <div className="scale-90 origin-left">
              <Logo />
            </div>
            <p className="text-xs text-gray-500 leading-relaxed max-w-xs">
              La experiencia Apple premium en Perú. Dispositivos originales,
              garantía real y el soporte que mereces.
            </p>
            <div className="flex gap-4 pt-2">
              <SocialIcon icon={<Facebook size={18} />} href="#" />
              <SocialIcon icon={<Instagram size={18} />} href="#" />
              <SocialIcon icon={<Twitter size={18} />} href="#" />
            </div>
          </div>

          {/* COLUMNA 2: TIENDA */}
          <div>
            <h3 className="font-semibold text-sm text-[#1d1d1f] mb-4">
              Tienda
            </h3>
            <ul className="space-y-2.5 text-xs text-[#424245]">
              <li>
                <FooterLink href="/iphone">iPhone</FooterLink>
              </li>
              <li>
                <FooterLink href="/mac">Mac</FooterLink>
              </li>
              <li>
                <FooterLink href="/ipad">iPad</FooterLink>
              </li>
              <li>
                <FooterLink href="/watch">Watch</FooterLink>
              </li>
              <li>
                <FooterLink href="/airpods">AirPods</FooterLink>
              </li>
              <li>
                <FooterLink href="/accesorios">Accesorios</FooterLink>
              </li>
            </ul>
          </div>

          {/* COLUMNA 3: SOPORTE */}
          <div>
            <h3 className="font-semibold text-sm text-[#1d1d1f] mb-4">
              Soporte
            </h3>
            <ul className="space-y-2.5 text-xs text-[#424245]">
              <li>
                <FooterLink href="#">Estado del pedido</FooterLink>
              </li>
              <li>
                <FooterLink href="#">Garantía</FooterLink>
              </li>
              <li>
                <FooterLink href="#">Devoluciones</FooterLink>
              </li>
              <li>
                <FooterLink href="#">Métodos de pago</FooterLink>
              </li>
              <li>
                <FooterLink href="#">Contacto</FooterLink>
              </li>
            </ul>
          </div>

          {/* COLUMNA 4: LEGAL */}
          <div>
            <h3 className="font-semibold text-sm text-[#1d1d1f] mb-4">Legal</h3>
            <ul className="space-y-2.5 text-xs text-[#424245]">
              <li>
                <FooterLink href="#">Términos de uso</FooterLink>
              </li>
              <li>
                <FooterLink href="#">Política de privacidad</FooterLink>
              </li>
              <li>
                <FooterLink href="#">Libro de reclamaciones</FooterLink>
              </li>
              <li>
                <FooterLink href="#">Cookies</FooterLink>
              </li>
            </ul>
          </div>

          {/* COLUMNA 5: CONTACTO */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="font-semibold text-sm text-[#1d1d1f] mb-3">
              ¿Necesitas ayuda?
            </h3>
            <p className="text-xs text-gray-500 mb-4">
              Nuestro equipo de expertos está listo para asesorarte.
            </p>
            <a
              href="https://wa.me/51953654313"
              target="_blank"
              // 👇 BOTÓN WHATSAPP NARANJA
              className="flex items-center justify-center gap-2 w-full bg-[#F97316] hover:bg-[#ea580c] text-white text-xs font-medium py-3 rounded-full transition-colors mb-4 shadow-sm shadow-orange-100"
            >
              Chat en WhatsApp <ArrowRight size={14} />
            </a>
            <div className="space-y-2">
              <ContactItem icon={<Mail size={14} />} text="hola@iclub.pe" />
              <ContactItem icon={<Phone size={14} />} text="+51 953 654 313" />
            </div>
          </div>
        </div>

        {/* COPYRIGHT BAR */}
        <div className="pt-6 border-t border-gray-300 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} iClub Perú. Todos los derechos
            reservados.
          </p>
          <div className="flex gap-6">
            <span className="text-xs text-gray-400">Diseñado en Chiclayo</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// --- SUBCOMPONENTES ---

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
      className="hover:text-[#F97316] hover:underline transition-all"
    >
      {children}
    </Link>
  );
}

function SocialIcon({ icon, href }: { icon: React.ReactNode; href: string }) {
  return (
    <a
      href={href}
      className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full text-gray-600 hover:bg-[#F97316] hover:text-white transition-all"
    >
      {icon}
    </a>
  );
}

function ContactItem({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-2 text-xs text-gray-500">
      <span className="text-[#F97316]">{icon}</span>
      <span>{text}</span>
    </div>
  );
}
