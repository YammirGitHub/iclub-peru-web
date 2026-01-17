"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";

export default function Breadcrumbs() {
  const pathname = usePathname();

  // Si estamos en la home, no mostrar nada
  if (pathname === "/") return null;

  // Generamos los segmentos
  const pathSegments = pathname.split("/").filter((segment) => segment !== "");

  // Diccionario para embellecer las rutas (slug -> Nombre bonito)
  const formatLabel = (slug: string) => {
    // Si es un ID de producto largo, lo acortamos o buscamos su nombre (opcional)
    // Por ahora, capitalizamos y quitamos guiones
    return slug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
  };

  return (
    <nav className="flex items-center gap-2 text-[11px] font-medium text-gray-400 mb-6 animate-fade-in">
      <Link
        href="/"
        className="flex items-center gap-1 hover:text-[#1d1d1f] transition-colors"
      >
        <Home size={12} />
        <span>Inicio</span>
      </Link>

      {pathSegments.map((segment, index) => {
        // Construimos la URL acumulada
        const href = "/" + pathSegments.slice(0, index + 1).join("/");
        const isLast = index === pathSegments.length - 1;

        return (
          <div key={href} className="flex items-center gap-2">
            <ChevronRight size={10} className="text-gray-300" />
            {isLast ? (
              <span className="text-[#1d1d1f] font-semibold truncate max-w-[150px] sm:max-w-none">
                {formatLabel(segment)}
              </span>
            ) : (
              <Link
                href={href}
                className="hover:text-[#1d1d1f] transition-colors capitalize"
              >
                {formatLabel(segment)}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}
