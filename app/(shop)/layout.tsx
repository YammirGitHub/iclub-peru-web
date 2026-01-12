// app/(shop)/layout.tsx
import Navbar from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartSidebar from "@/components/layout/CartSidebar";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <CartSidebar /> {/* El carrito lateral vive aquí */}
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
