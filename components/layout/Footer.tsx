import Link from "next/link";
import {
  Facebook,
  Instagram,
  Twitter,
  MapPin,
  Phone,
  Mail,
  BookOpen,
  CreditCard,
  ShieldCheck,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#f5f5f7] text-[#1d1d1f] border-t border-gray-200 font-sans">
      {/* --- SECCIÓN SUPERIOR: GARANTÍAS --- */}
      <div className="border-b border-gray-200/60 bg-white/50 backdrop-blur-xl">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 text-gray-600">
              <ShieldCheck size={20} className="text-[#0071e3]" />
              <span className="text-xs font-medium tracking-wide">
                GARANTÍA OFICIAL APPLE
              </span>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-3 text-gray-600">
              <CreditCard size={20} className="text-[#0071e3]" />
              <span className="text-xs font-medium tracking-wide">
                PAGOS SEGUROS ENCRIPTADOS
              </span>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-3 text-gray-600">
              <MapPin size={20} className="text-[#0071e3]" />
              <span className="text-xs font-medium tracking-wide">
                TIENDAS FÍSICAS EN CHICLAYO
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 pt-16 pb-12">
        {/* --- GRID PRINCIPAL --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-y-12 gap-x-8 mb-20 items-start">
          {/* 1. NAVEGACIÓN */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <h3 className="font-semibold text-gray-900 text-[13px] uppercase tracking-wider">
              Explorar
            </h3>
            <ul className="flex flex-col gap-3 text-[#424245] text-sm">
              {["Mac", "iPad", "iPhone", "Watch", "AirPods"].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase()}`}
                    className="hover:text-[#0071e3] hover:translate-x-1 transition-all duration-300 inline-block"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 2. SERVICIOS */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <h3 className="font-semibold text-gray-900 text-[13px] uppercase tracking-wider">
              Soporte
            </h3>
            <ul className="flex flex-col gap-3 text-[#424245] text-sm">
              <li>
                <Link
                  href="/soporte"
                  className="hover:text-[#0071e3] hover:translate-x-1 transition-all duration-300 inline-block"
                >
                  Soporte Técnico
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-[#0071e3] hover:translate-x-1 transition-all duration-300 inline-block"
                >
                  Garantía iClub
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-[#0071e3] hover:translate-x-1 transition-all duration-300 inline-block"
                >
                  Financiamiento
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-[#0071e3] hover:translate-x-1 transition-all duration-300 inline-block"
                >
                  Estado de Pedido
                </Link>
              </li>
            </ul>
          </div>

          {/* 3. DIRECCIONES */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-5 flex flex-col gap-6">
            <h3 className="font-semibold text-gray-900 text-[13px] uppercase tracking-wider flex items-center gap-2">
              Nuestras Tiendas
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Tienda 1 */}
              <div className="group p-4 -ml-4 rounded-2xl hover:bg-white hover:shadow-sm transition-all duration-300 border border-transparent hover:border-gray-100 cursor-default">
                <div className="flex items-center gap-2 mb-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  <strong className="text-gray-900 font-semibold text-sm group-hover:text-[#0071e3] transition-colors">
                    Centro
                  </strong>
                </div>
                <p className="text-[#424245] text-xs leading-relaxed">
                  Ca. Teniente Pinglo #125, Int. 37
                </p>
                <p className="text-gray-400 text-[10px] mt-1 font-medium tracking-wide">
                  GAL. MORRO SOLAR
                </p>
              </div>

              {/* Tienda 2 */}
              <div className="group p-4 -ml-4 sm:ml-0 rounded-2xl hover:bg-white hover:shadow-sm transition-all duration-300 border border-transparent hover:border-gray-100 cursor-default">
                <div className="flex items-center gap-2 mb-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  <strong className="text-gray-900 font-semibold text-sm group-hover:text-[#0071e3] transition-colors">
                    Santa Victoria
                  </strong>
                </div>
                <p className="text-[#424245] text-xs leading-relaxed">
                  Av. Sta. Victoria #460
                </p>
                <p className="text-gray-400 text-[10px] mt-1 font-medium tracking-wide">
                  COSTADO PIZZERÍA VENECIA
                </p>
              </div>

              {/* Tienda 3 */}
              <div className="group p-4 -ml-4 rounded-2xl hover:bg-white hover:shadow-sm transition-all duration-300 border border-transparent hover:border-gray-100 cursor-default sm:col-span-2">
                <div className="flex items-center gap-2 mb-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  <strong className="text-gray-900 font-semibold text-sm group-hover:text-[#0071e3] transition-colors">
                    Real Plaza Chiclayo
                  </strong>
                </div>
                <p className="text-[#424245] text-xs leading-relaxed">
                  Mcal. Andrés Avelino Cáceres #200
                </p>
                <p className="text-gray-400 text-[10px] mt-1 font-medium tracking-wide">
                  SEGUNDO NIVEL - ZONA TECNOLÓGICA
                </p>
              </div>
            </div>
          </div>

          {/* 4. CONTACTO */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-3 flex flex-col gap-6">
            <h3 className="font-semibold text-gray-900 text-[13px] uppercase tracking-wider">
              Contacto Directo
            </h3>

            <div className="flex flex-col gap-3">
              <ContactPill
                href="tel:+51945341516"
                icon={<Phone size={14} />}
                text="945 341 516"
              />
              <ContactPill
                href="tel:+51931241158"
                icon={<Phone size={14} />}
                text="931 241 158"
              />
              <ContactPill
                href="mailto:ventas@iclub.pe"
                icon={<Mail size={14} />}
                text="ventas@iclub.pe"
              />
            </div>

            <div className="flex gap-3 mt-4 pt-6 border-t border-gray-200/60">
              <SocialIcon
                href="#"
                icon={<Facebook size={18} />}
                color="hover:text-[#1877F2]"
              />
              <SocialIcon
                href="#"
                icon={<Instagram size={18} />}
                color="hover:text-[#E4405F]"
              />
              <SocialIcon
                href="#"
                icon={<Twitter size={18} />}
                color="hover:text-black"
              />
            </div>
          </div>
        </div>

        {/* --- BOTTOM BAR --- */}
        <div className="border-t border-gray-200 pt-10 flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8">
          <div className="text-[#86868b] text-[11px] leading-relaxed max-w-xl">
            <p className="mb-3 font-medium text-gray-900">
              Más formas de comprar:{" "}
              <Link href="#" className="text-[#0066cc] hover:underline">
                Encuentra un Apple Store
              </Link>{" "}
              o{" "}
              <Link href="#" className="text-[#0066cc] hover:underline">
                un distribuidor
              </Link>{" "}
              cerca de ti.
            </p>
            <p className="mb-1">
              Copyright © 2026 iClub Perú S.A.C. Todos los derechos reservados.
            </p>
            <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2">
              <Link
                href="#"
                className="hover:text-gray-900 hover:underline border-r border-gray-300 pr-3"
              >
                Privacidad
              </Link>
              <Link
                href="#"
                className="hover:text-gray-900 hover:underline border-r border-gray-300 pr-3"
              >
                Términos
              </Link>
              <Link href="#" className="hover:text-gray-900 hover:underline">
                Ventas
              </Link>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
            <Link
              href="#"
              className="flex items-center gap-3 px-4 py-2 bg-white border border-gray-200 rounded-xl hover:border-gray-400 hover:shadow-sm transition-all group"
            >
              <div className="bg-gray-100 p-1.5 rounded-lg group-hover:bg-[#f5f5f7] transition-colors">
                <BookOpen size={16} className="text-gray-600" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider leading-none">
                  Libro de
                </span>
                <span className="text-xs font-semibold text-gray-800 leading-none mt-0.5">
                  Reclamaciones
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

// SUBCOMPONENTES
function ContactPill({
  href,
  icon,
  text,
}: {
  href: string;
  icon: React.ReactNode;
  text: string;
}) {
  return (
    <a
      href={href}
      className="flex items-center gap-3 p-2 -ml-2 rounded-lg hover:bg-white hover:shadow-sm transition-all duration-300 group text-sm text-[#424245]"
    >
      <span className="text-gray-400 group-hover:text-[#0071e3] transition-colors">
        {icon}
      </span>
      <span className="font-medium group-hover:text-gray-900 transition-colors">
        {text}
      </span>
    </a>
  );
}

function SocialIcon({
  href,
  icon,
  color,
}: {
  href: string;
  icon: React.ReactNode;
  color: string;
}) {
  return (
    <a
      href={href}
      className={`w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 transition-all duration-300 shadow-sm hover:-translate-y-1 hover:shadow-md ${color}`}
    >
      {icon}
    </a>
  );
}
