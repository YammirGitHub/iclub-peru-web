import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// USA @ PARA RUTAS EXACTAS Y SEGURAS:
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CartProvider } from "@/context/CartContext";
import CartSidebar from "@/components/layout/CartSidebar";
import SplashScreen from "@/components/ui/SplashScreen";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "iClub Perú | Apple Premium Reseller",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white`}
      >
        <CartProvider>
          
          {/* 2. AGREGARLO AQUÍ AL PRINCIPIO */}
          <SplashScreen /> 
          <Navbar />
          <CartSidebar />
          {children}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}