import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartSidebar from "@/components/layout/CartSidebar";
// Asegúrate de haber creado este archivo en el paso anterior
import SmoothScrolling from "@/components/ui/SmoothScrolling";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  // Base URL para que las imágenes de redes sociales funcionen
  metadataBase: new URL("https://iclub-peru.netlify.app"),
  title: "iClub Perú | Experiencia Apple en Chiclayo",
  description:
    "Tienda especializada en productos Apple en Chiclayo. Garantía real y soporte experto.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      {/* Eliminado "scroll-smooth" para evitar conflictos con Lenis */}
      <body
        className={`${inter.className} antialiased bg-white text-[#1d1d1f]`}
      >
        <CartProvider>
          <SmoothScrolling>
            <Navbar />
            <CartSidebar />
            <main>{children}</main>
            <Footer />
          </SmoothScrolling>
        </CartProvider>
      </body>
    </html>
  );
}
