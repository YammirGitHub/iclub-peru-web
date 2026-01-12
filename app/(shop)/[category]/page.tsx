"use client";
import { getProductsByCategory } from "@/lib/products";
import Image from "next/image";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { motion } from "framer-motion";

export default function CategoryPage() {
  const params = useParams();
  const category = params.category as string;
  const products = getProductsByCategory(category);

  // Si alguien escribe una categoría que no existe (ej: /patatas), error 404
  const validCategories = ["mac", "iphone", "ipad", "watch", "airpods"];
  if (!validCategories.includes(category)) return notFound();

  return (
    <div className="min-h-screen bg-white pt-32 pb-20">
      {/* HEADER DE CATEGORÍA */}
      <div className="max-w-[1200px] mx-auto px-6 mb-16">
        <h1 className="text-5xl md:text-7xl font-semibold text-[#1d1d1f] tracking-tight capitalize mb-4">
          {category}
        </h1>
        <p className="text-xl text-[#86868b] font-medium max-w-2xl">
          Lo último en tecnología {category}. Diseñado para inspirar.
        </p>
      </div>

      {/* GRILLA DE PRODUCTOS */}
      <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.length > 0 ? (
          products.map((product) => (
            <Link
              href={`/${product.category}/${product.slug}`}
              key={product.id}
              className="group"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
                className="bg-[#f5f5f7] rounded-[30px] p-8 h-[500px] flex flex-col justify-between hover:shadow-2xl hover:shadow-black/5 transition-all duration-300"
              >
                <div>
                  <h3 className="text-2xl font-semibold text-[#1d1d1f] mb-2">
                    {product.title}
                  </h3>
                  <p className="text-sm text-[#86868b]">
                    Desde S/ {product.basePrice}
                  </p>
                </div>

                <div className="relative w-full h-64 mt-8">
                  <Image
                    src={product.colors[0].image} // Muestra la imagen del primer color
                    alt={product.title}
                    fill
                    className="object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="flex items-center gap-2 mt-6">
                  {product.colors.map((c) => (
                    <div
                      key={c.name}
                      className="w-4 h-4 rounded-full border border-gray-300 shadow-sm"
                      style={{ backgroundColor: c.hex }}
                    />
                  ))}
                </div>
              </motion.div>
            </Link>
          ))
        ) : (
          <div className="col-span-full py-20 text-center">
            <p className="text-xl text-gray-400">
              Próximamente nuevos productos en {category}.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
