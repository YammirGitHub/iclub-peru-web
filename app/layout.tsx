import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Importamos Inter, la fuente más parecida a Apple SF Pro
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartSidebar from "@/components/layout/CartSidebar";
import { SmoothScroll } from "@/components/ui/SmoothScroll";

// Configuración "Tight" (Ajustada) para lograr el look premium
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter", // Variable CSS para usarla en Tailwind si es necesario
  display: "swap",
});

export const metadata: Metadata = {
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
    <html lang="es" className="scroll-smooth">
      <body
        className={`${inter.className} antialiased bg-white text-[#1d1d1f]`}
      >
        <CartProvider>
          <SmoothScroll>
            <Navbar />
            <CartSidebar />
            <main>{children}</main>
            <Footer />
          </SmoothScroll>
        </CartProvider>
      </body>
    </html>
  );
}
