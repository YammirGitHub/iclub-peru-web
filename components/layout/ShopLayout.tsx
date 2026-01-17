"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartSidebar from "@/components/layout/CartSidebar";
import Breadcrumbs from "@/components/ui/Breadcrumbs"; // 👈 1. Importamos el componente

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Detectamos si estamos en la página de checkout
  const isCheckout = pathname === "/checkout";

  // Si estamos en Checkout, devolvemos SOLO el contenido (sin menú ni footer)
  if (isCheckout) {
    return <main className="min-h-screen">{children}</main>;
  }

  // Si NO estamos en Checkout, mostramos la web completa
  return (
    <>
      <Navbar />
      <CartSidebar />

      {/* 2. Agregamos pt-24 aquí para compensar el Navbar fijo y que no tape el contenido */}
      <main className="min-h-screen pt-24">
        {/* 3. Contenedor centrado para las Migas de Pan */}
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs />
        </div>

        {children}
      </main>

      <Footer />
    </>
  );
}
