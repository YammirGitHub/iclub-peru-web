"use client";

import Link from "next/link";
import { Facebook, Instagram, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#f5f5f7] text-[#1d1d1f] text-xs pt-16 pb-8 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* GRILLA DE ENLACES (5 Columnas) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-12">
          
          {/* Columna 1: Tienda */}
          <div className="flex flex-col gap-3">
            <h4 className="font-semibold text-gray-900">Tienda</h4>
            <Link href="/iphone" className="hover:underline text-gray-600">iPhone</Link>
            <Link href="/mac" className="hover:underline text-gray-600">Mac</Link>
            <Link href="/ipad" className="hover:underline text-gray-600">iPad</Link>
            <Link href="/watch" className="hover:underline text-gray-600">Apple Watch</Link>
            <Link href="/airpods" className="hover:underline text-gray-600">AirPods</Link>
          </div>

          {/* Columna 2: Servicios */}
          <div className="flex flex-col gap-3">
            <h4 className="font-semibold text-gray-900">Servicios</h4>
            <Link href="/soporte" className="hover:underline text-gray-600">Soporte Técnico</Link>
            <Link href="/garantia" className="hover:underline text-gray-600">Consultar Garantía</Link>
            <Link href="/financiamiento" className="hover:underline text-gray-600">Financiamiento</Link>
            <Link href="/envios" className="hover:underline text-gray-600">Política de Envíos</Link>
          </div>

          {/* Columna 3: Contacto (Datos Reales del PDF) */}
          <div className="flex flex-col gap-3 md:col-span-2 lg:col-span-2">
            <h4 className="font-semibold text-gray-900">Visítanos en Chiclayo</h4>
            
            <div className="flex gap-2 text-gray-600 mb-1">
              <MapPin size={14} className="mt-0.5 shrink-0" />
              <p>Ca. Teniente Pinglo #125, Int. 37 (Gal. Morro Solar)</p>
            </div>
            
            <div className="flex gap-2 text-gray-600 mb-1">
              <MapPin size={14} className="mt-0.5 shrink-0" />
              <p>Av. Sta. Victoria #460 (Costado de Pizzería Venecia)</p>
            </div>

            <div className="flex gap-2 text-gray-600 mb-1">
              <MapPin size={14} className="mt-0.5 shrink-0" />
              <p>Real Plaza Chiclayo (Mcal. Andrés Avelino Cáceres #200)</p>
            </div>

            <div className="flex gap-2 text-gray-600 mt-2 font-medium">
              <Phone size={14} className="mt-0.5 shrink-0" />
              <p>+51 945 341 516  |  +51 931 241 158</p>
            </div>
          </div>

          {/* Columna 4: Legal */}
          <div className="flex flex-col gap-3">
             <h4 className="font-semibold text-gray-900">Legal</h4>
             <Link href="/terminos" className="hover:underline text-gray-600">Términos y Condiciones</Link>
             <Link href="/privacidad" className="hover:underline text-gray-600">Política de Privacidad</Link>
             <Link href="/reclamaciones" className="hover:underline text-gray-600">Libro de Reclamaciones</Link>
          </div>

        </div>

        {/* LÍNEA DIVISORIA */}
        <div className="border-t border-gray-300 my-6" />

        {/* COPYRIGHT Y REDES */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500">
            Copyright © 2026 iClub Perú. Todos los derechos reservados. Distribuidor Autorizado.
          </p>
          
          <div className="flex gap-4">
             <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors"><Facebook size={18} /></a>
             <a href="#" className="text-gray-600 hover:text-pink-600 transition-colors"><Instagram size={18} /></a>
          </div>
        </div>

      </div>
    </footer>
  );
}