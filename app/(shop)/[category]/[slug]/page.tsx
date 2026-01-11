import { getProductBySlug, products } from "@/lib/products";
import AddToCart from "@/components/ui/AddToCart";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ShieldCheck, Truck, Box } from "lucide-react";

// Optimización SEO: Pre-generar todas las páginas de productos
export async function generateStaticParams() {
  return products.map((product) => ({
    category: product.category,
    slug: product.slug,
  }));
}

interface Props {
  params: {
    slug: string;
  };
}

export default function ProductPage({ params }: Props) {
  const { slug } = params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen pt-32 pb-20 bg-white">
      <div className="max-w-[1100px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
          
          {/* COLUMNA IZQUIERDA: IMAGEN (Sticky) */}
          {/* 'sticky top-32' hace que la imagen te siga mientras bajas */}
          <div className="relative">
            <div className="sticky top-32 w-full aspect-square md:aspect-[4/5] bg-[#f5f5f7] rounded-[30px] flex items-center justify-center overflow-hidden">
              <div className="relative w-[85%] h-[85%]">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-contain hover:scale-105 transition-transform duration-700"
                  priority
                />
              </div>
            </div>
          </div>

          {/* COLUMNA DERECHA: INFO */}
          <div className="flex flex-col justify-center py-8">
            <span className="text-orange-600 font-bold tracking-wider text-xs mb-3 uppercase">
              Nuevo Ingreso
            </span>
            <h1 className="text-4xl md:text-5xl font-semibold text-[#1d1d1f] tracking-tight mb-2 leading-[1.1]">
              {product.title}
            </h1>
            <div className="text-2xl md:text-3xl font-medium text-[#1d1d1f] mb-8">
              S/ {product.price.toLocaleString('es-PE', { minimumFractionDigits: 2 })}
            </div>

            <div className="space-y-6 text-[#86868b] text-lg font-medium leading-relaxed mb-10">
              <p>{product.description}</p>
              <p>Diseñado para potenciar tu creatividad y productividad al máximo nivel.</p>
            </div>

            {/* Selector de Color Simulado (Visual) */}
            <div className="mb-10">
              <span className="text-sm font-semibold text-[#1d1d1f] block mb-3">Color</span>
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-[#2f353b] border-2 border-transparent ring-2 ring-blue-500 cursor-pointer"></div>
                <div className="w-8 h-8 rounded-full bg-[#f0f0f0] border border-gray-300 cursor-pointer hover:border-gray-400"></div>
                <div className="w-8 h-8 rounded-full bg-[#e3e4e5] border border-gray-300 cursor-pointer hover:border-gray-400"></div>
              </div>
            </div>

            {/* Componente Cliente: Botón Agregar */}
            <AddToCart product={product} />

            <div className="mt-12 pt-10 border-t border-gray-100 grid grid-cols-1 gap-4">
              <div className="flex items-start gap-4">
                <ShieldCheck className="w-6 h-6 text-[#1d1d1f]" />
                <div>
                  <h4 className="text-sm font-semibold text-[#1d1d1f]">Garantía iClub</h4>
                  <p className="text-sm text-gray-500">1 año de garantía certificada.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Truck className="w-6 h-6 text-[#1d1d1f]" />
                <div>
                  <h4 className="text-sm font-semibold text-[#1d1d1f]">Envío Rápido</h4>
                  <p className="text-sm text-gray-500">Envíos a todo Chiclayo y Perú.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Box className="w-6 h-6 text-[#1d1d1f]" />
                <div>
                  <h4 className="text-sm font-semibold text-[#1d1d1f]">Caja Sellada</h4>
                  <p className="text-sm text-gray-500">Producto 100% nuevo y original.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}