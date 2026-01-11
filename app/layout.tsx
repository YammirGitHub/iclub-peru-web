import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CartProvider } from "@/context/CartContext";
import CartSidebar from "@/components/layout/CartSidebar";
import { SmoothScroll } from "@/components/ui/SmoothScroll"; // Importación corregida

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    template: "%s | iClub Perú",
    default: "iClub Perú | Apple Premium Reseller",
  },
  description: "La mejor tecnología Apple en Chiclayo.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${inter.variable} antialiased`}>
      <body className="font-sans selection:bg-[#0071e3]/20 selection:text-[#0071e3]">
        <CartProvider>
          <SmoothScroll>
            {" "}
            {/* Cambiado de ReactLenis a nuestro wrapper SmoothScroll */}
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
