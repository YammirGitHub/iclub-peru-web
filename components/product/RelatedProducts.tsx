"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Product } from "@/lib/products";

interface Props {
  products: Product[];
}

export default function RelatedProducts({ products }: Props) {
  // Si no hay productos relacionados, no renderizamos nada
  if (!products || products.length === 0) return null;

  return (
    <section className="py-24 bg-white border-t border-gray-100 mt-10">
      <div className="max-w-[1200px] mx-auto px-6">
        <h2 className="text-3xl font-semibold text-[#1d1d1f] mb-12 text-center tracking-tight">
          También te podría interesar
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <Link
              href={`/${product.category}/${product.slug}`}
              key={product.id}
              className="group block"
            >
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="bg-[#f5f5f7] rounded-[24px] p-8 h-full flex flex-col items-center text-center transition-all duration-300 group-hover:shadow-xl group-hover:shadow-black/5"
              >
                {/* CORRECCIÓN 1: La imagen ahora está en la raíz del producto */}
                <div className="relative w-48 h-48 mb-8 mt-4">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>

                {/* CORRECCIÓN 2: Usamos 'name' en lugar de 'title' */}
                <h3 className="text-xl font-semibold text-[#1d1d1f] mb-2">
                  {product.name}
                </h3>

                <div className="mt-auto flex flex-col items-center gap-4">
                  {/* CORRECCIÓN 3: Usamos 'price' en lugar de 'basePrice' */}
                  <p className="text-sm text-[#1d1d1f] font-medium">
                    Desde ${product.price}
                  </p>

                  <span className="text-[#0071e3] text-sm font-medium opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    Ver detalles &rarr;
                  </span>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
