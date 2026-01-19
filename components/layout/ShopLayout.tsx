"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartSidebar from "@/components/layout/CartSidebar";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // ✅ MEJORA SENIOR: Array escalable.
  // Si mañana creas una página de "success" o "login", solo la agregas aquí.
  const hideLayoutRoutes = ["/checkout", "/success"];
  const isLayoutHidden = hideLayoutRoutes.includes(pathname);

  // Si es una ruta oculta, renderizamos solo el contenido limpio
  if (isLayoutHidden) {
    return <main className="min-h-screen bg-white">{children}</main>;
  }

  return (
    <>
      <Navbar />
      <CartSidebar />

      {/* ✅ UX VERDICT: Mantenemos pt-24. 
          Esto asegura que el contenido nunca quede oculto bajo el header fijo. */}
      <main className="min-h-screen pt-24 pb-12 bg-white">
        {/* Contenedor centralizado para alinear Breadcrumbs con el resto de la web */}
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs />
          {children}
        </div>
      </main>

      <Footer />
    </>
  );
}
