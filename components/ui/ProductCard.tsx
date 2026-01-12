import Link from "next/link";
import Image from "next/image";
import { Product } from "@/lib/products";

export default function ProductCard({ product }: { product: Product }) {
  // Formateador de moneda (Soles o Dólares, ajusta según tu preferencia)
  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Link href={`/${product.category}/${product.slug}`} className="group block">
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] bg-[#F5F5F7] mb-6 transition-all duration-500 group-hover:shadow-xl">
        {/* Imagen con Zoom Suave y Parallax sutil */}
        <div className="absolute inset-0 flex items-center justify-center p-10 transition-transform duration-700 ease-out group-hover:scale-105">
          <Image
            src={product.image}
            alt={product.name}
            width={500}
            height={500}
            className="object-contain w-full h-full drop-shadow-xl"
            priority={false}
          />
        </div>
      </div>

      {/* Información del Producto */}
      <div className="flex flex-col items-start space-y-2 px-2">
        <span className="text-[10px] font-bold text-orange-600 uppercase tracking-widest">
          {product.year >= 2023 ? "Nuevo" : "Disponible"}
        </span>

        <h3 className="text-xl md:text-2xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
          {product.name}
        </h3>

        <p className="text-gray-500 text-sm font-medium">
          Desde {formatPrice(product.price)}
        </p>

        {/* Swatches de Colores (Visual Only) */}
        <div className="flex gap-2 mt-2 pt-2">
          {product.colors.map((color, index) => (
            <div
              key={index}
              className="w-3 h-3 rounded-full shadow-sm ring-1 ring-black/5"
              style={{ backgroundColor: color.hex }}
              title={color.name}
            />
          ))}
        </div>
      </div>
    </Link>
  );
}
