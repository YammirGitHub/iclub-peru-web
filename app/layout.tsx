import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CartProvider } from "@/context/CartContext";
import CartSidebar from "@/components/layout/CartSidebar";
// 1. IMPORTA LENIS
import { ReactLenis } from "@/components/ui/SmoothScroll"; // Te enseñaré a crear este componente abajo para mantener layout limpio

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | iClub Perú", // Esto hace que cada página complete el título
    default: "iClub Perú | Apple Premium Reseller",
  },
  description: "La mejor experiencia Apple en Chiclayo.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#F5F5F7]`} // Fondo Apple por defecto
      >
        {/* 2. ENVUELVE TODO CON EL CART PROVIDER */}
        <CartProvider>
          {/* 3. AQUÍ VA EL SCROLL SUAVE */}
          <ReactLenis root>
            <Navbar />
            <CartSidebar />

            {/* El Splash Screen lo vamos a quitar, lee abajo por qué */}

            <main className="min-h-screen">{children}</main>

            <Footer />
          </ReactLenis>
        </CartProvider>
      </body>
    </html>
  );
}
