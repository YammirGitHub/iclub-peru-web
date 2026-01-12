// app/layout.tsx
import "./globals.css";
import { Inter } from "next/font/google"; // O tu fuente local
import { CartProvider } from "@/context/CartContext";

// Metadatos globales (SEO)
export const metadata = {
  title: "iClub Perú",
  description: "Apple Premium Reseller",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
