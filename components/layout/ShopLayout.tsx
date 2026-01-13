"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartSidebar from "@/components/layout/CartSidebar";

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
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
