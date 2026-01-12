"use client";
import { Product, getProductsByCategory } from "@/lib/products";
import Link from "next/link";
import Image from "next/image";

export default function RelatedProducts({
  category,
  currentId,
}: {
  category: string;
  currentId: string;
}) {
  // Filtramos productos de la misma categoría pero quitamos el actual
  const related = getProductsByCategory(category)
    .filter((p) => p.id !== currentId)
    .slice(0, 3); // Solo mostramos 3

  if (related.length === 0) return null;

  return (
    <section className="py-20 border-t border-gray-100 mt-20">
      <h3 className="text-2xl font-semibold text-[#1d1d1f] mb-8">
        También te podría interesar
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {related.map((prod) => (
          <Link
            href={`/product/${prod.slug}`}
            key={prod.id}
            className="group bg-[#f5f5f7] rounded-2xl p-6 hover:bg-[#ebebed] transition-colors"
          >
            <div className="relative w-full h-40 mb-4">
              <Image
                src={prod.colors[0].image}
                alt={prod.title}
                fill
                className="object-contain"
              />
            </div>
            <h4 className="font-semibold text-sm text-[#1d1d1f]">
              {prod.title}
            </h4>
            <p className="text-xs text-gray-500 mt-1">
              Desde S/ {prod.basePrice}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
