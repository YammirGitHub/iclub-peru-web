import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import SmoothScrolling from "@/components/ui/SmoothScrolling";
// 👇 Importamos SOLO nuestro nuevo layout inteligente
import ShopLayout from "@/components/layout/ShopLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://iclub.pe"),
  title: {
    default: "iClub Perú | Expertos en Apple",
    template: "%s | iClub Perú",
  },
  description: "Tienda oficial de productos Apple en Chiclayo.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <CartProvider>
          <SmoothScrolling>
            {/* 👇 Usamos ShopLayout que decide si mostrar Header/Footer */}
            <ShopLayout>
              {children}
            </ShopLayout>
          </SmoothScrolling>
        </CartProvider>
      </body>
    </html>
  );
}