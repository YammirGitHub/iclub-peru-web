import Link from "next/link";
import Image from "next/image";
import { getProductsByCategory, getAllCategories } from "@/lib/products";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((category) => ({ category }));
}

// --- SISTEMA DE DISEÑO (Colores y Conceptos Psicológicos) ---
const categoryStyles: Record<
  string,
  {
    subtitle: string; // La palabra "psicológica" clave
    description: string;
    accentColor: string;
    badgeColor: string;
    badgeTextColor: string;
  }
> = {
  iphone: {
    subtitle: "ICÓNICO",
    description:
      "Diseñado para ser amado. Potencia, cámaras de cine y batería increíble.",
    accentColor: "text-blue-600",
    badgeColor: "bg-blue-600",
    badgeTextColor: "text-blue-600",
  },
  mac: {
    subtitle: "POTENCIA",
    description: "Rendimiento salvaje en el diseño más fino posible.",
    accentColor: "text-purple-600",
    badgeColor: "bg-purple-600",
    badgeTextColor: "text-purple-600",
  },
  ipad: {
    subtitle: "VERSATILIDAD",
    description: "Tu cuaderno, tu estudio y tu cine en una lámina de vidrio.",
    accentColor: "text-pink-600",
    badgeColor: "bg-pink-600",
    badgeTextColor: "text-pink-600",
  },
  watch: {
    subtitle: "LIBERTAD",
    description: "El compañero definitivo para una vida más saludable.",
    accentColor: "text-orange-500",
    badgeColor: "bg-orange-500",
    badgeTextColor: "text-orange-600",
  },
  airpods: {
    subtitle: "INMERSIÓN",
    description: "Sonido inmersivo que redefine la experiencia auditiva.",
    accentColor: "text-cyan-600",
    badgeColor: "bg-cyan-600",
    badgeTextColor: "text-cyan-600",
  },
  accesorios: {
    subtitle: "ESENCIALES",
    description: "Protege y potencia tus dispositivos con lo mejor.",
    accentColor: "text-slate-600",
    badgeColor: "bg-slate-600",
    badgeTextColor: "text-slate-600",
  },
  certificados: {
    subtitle: "INTELIGENCIA",
    description: "Calidad Apple garantizada a un precio excepcional.",
    accentColor: "text-emerald-600",
    badgeColor: "bg-emerald-600",
    badgeTextColor: "text-emerald-600",
  },
};

// --- DICCIONARIO DE TÍTULOS (Para arreglar "Ipad" -> "iPad") ---
const categoryTitles: Record<string, string> = {
  iphone: "iPhone",
  ipad: "iPad", // <--- Aquí forzamos la escritura correcta
  mac: "Mac",
  watch: "Apple Watch",
  airpods: "AirPods",
  accesorios: "Accesorios",
  certificados: "Certificados",
};

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const validCategories = getAllCategories();

  if (!validCategories.includes(category)) {
    notFound();
  }

  const products = getProductsByCategory(category);

  // 1. Obtener estilos
  const styles = categoryStyles[category] || {
    subtitle: "TIENDA",
    description: "Explora nuestra colección exclusiva.",
    accentColor: "text-blue-600",
    badgeColor: "bg-blue-600",
    badgeTextColor: "text-blue-600",
  };

  // 2. Obtener título correcto (Soluciona el bug de "Ipad")
  const title =
    categoryTitles[category] ||
    category.charAt(0).toUpperCase() + category.slice(1);

  const formatMoney = (amount: number) =>
    new Intl.NumberFormat("es-PE", {
      style: "currency",
      currency: "PEN",
      minimumFractionDigits: 0,
    }).format(amount);

  return (
    <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="mb-16 text-center md:text-left fade-in">
          <span
            className={`font-bold tracking-widest uppercase text-[10px] mb-2 block ${styles.accentColor}`}
          >
            {styles.subtitle}
          </span>
          {/* Título corregido */}
          <h1 className="text-5xl font-semibold text-[#1d1d1f] mb-4 tracking-tight">
            {title}
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl font-medium mx-auto md:mx-0 leading-relaxed">
            {styles.description}
          </p>
        </div>

        {/* GRILLA DE PRODUCTOS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {products.map((product) => (
            <Link
              href={`/${product.category}/${product.slug}`}
              key={product.id}
              className="group relative flex flex-col h-full bg-[#f5f5f7] rounded-[2rem] p-8 shadow-sm transition-all duration-500 ease-out hover:shadow-2xl hover:-translate-y-2 hover:bg-[#f0f0f2]"
            >
              {/* Contenido Superior */}
              <div className="mb-8 z-10">
                <span
                  className={`inline-block px-3 py-1 rounded-full bg-white text-[10px] font-bold uppercase tracking-widest mb-3 shadow-sm ${styles.badgeTextColor}`}
                >
                  {product.year >= 2023 ? "Nuevo Lanzamiento" : "Disponible"}
                </span>

                <h3 className="text-3xl font-semibold text-[#1d1d1f] mb-2 tracking-tight group-hover:text-black transition-colors">
                  {product.name}
                </h3>

                <p className="text-gray-500 text-sm font-medium line-clamp-2 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Imagen Central */}
              <div className="relative w-full h-48 mb-8 flex items-center justify-center">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain drop-shadow-md transition-transform duration-500 cubic-bezier(0.34, 1.56, 0.64, 1) group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>

              {/* Footer de Tarjeta */}
              <div className="mt-auto flex items-end justify-between pt-6 border-t border-gray-200/50">
                <div className="flex flex-col gap-1">
                  <span className="text-[#1d1d1f] font-semibold text-lg tracking-tight">
                    Desde {formatMoney(product.price)}
                  </span>
                  <span
                    className={`text-[11px] text-gray-400 font-medium uppercase tracking-wide transition-colors group-hover:${styles.accentColor}`}
                  >
                    Configurar ahora
                  </span>
                </div>

                <div className="w-10 h-10 rounded-full bg-[#0071e3] text-white flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-110 group-hover:bg-[#0077ED] transition-all duration-300">
                  <ArrowRight size={18} strokeWidth={3} />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {products.length === 0 && (
          <div className="py-32 text-center bg-[#f5f5f7] rounded-[2rem] border border-dashed border-gray-200">
            <p className="text-[#1d1d1f] text-xl font-semibold mb-2">
              Próximamente
            </p>
            <p className="text-gray-500">
              Estamos renovando nuestro inventario de {title}.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
