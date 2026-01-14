import Link from "next/link";
import Image from "next/image";
import { getProductsByCategory, getAllCategories } from "@/lib/products";
import { notFound } from "next/navigation";
import { ArrowRight, Star, Zap, ShieldCheck } from "lucide-react";

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((category) => ({ category }));
}

// --- SISTEMA DE PERSONALIDAD ---
const categoryTheme: Record<
  string,
  {
    subtitle: string;
    textColor: string;
    badgeBg: string;
  }
> = {
  iphone: {
    subtitle: "DISEÑADO PARA SER AMADO",
    textColor: "text-blue-600",
    badgeBg: "bg-blue-50",
  },
  mac: {
    subtitle: "POTENCIA EN ESTADO PURO",
    // CAMBIO AQUI: Usamos Morado (Purple) para creatividad/poder
    textColor: "text-purple-600",
    badgeBg: "bg-purple-50",
  },
  ipad: {
    subtitle: "TU PRÓXIMO ORDENADOR",
    textColor: "text-fuchsia-600",
    badgeBg: "bg-fuchsia-50",
  },
  watch: {
    subtitle: "EL FUTURO DE LA SALUD",
    textColor: "text-orange-600",
    badgeBg: "bg-orange-50",
  },
  airpods: {
    subtitle: "MAGIA QUE SE OYE",
    textColor: "text-sky-500", // Celeste para "Aire"
    badgeBg: "bg-sky-50",
  },
  accesorios: {
    subtitle: "COMPLEMENTOS PERFECTOS",
    textColor: "text-gray-500",
    badgeBg: "bg-gray-100",
  },
  certificados: {
    subtitle: "INTELIGENCIA CERTIFICADA",
    textColor: "text-emerald-600",
    badgeBg: "bg-emerald-50",
  },
};

const categoryTitles: Record<string, string> = {
  iphone: "iPhone",
  ipad: "iPad",
  mac: "Mac",
  watch: "Apple Watch",
  airpods: "AirPods",
  accesorios: "Accesorios",
  certificados: "Certificados",
};

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const validCategories = getAllCategories();

  if (!validCategories.includes(category as any)) {
    notFound();
  }

  const products = getProductsByCategory(category);

  const theme = categoryTheme[category] || {
    subtitle: "TIENDA",
    textColor: "text-gray-900",
    badgeBg: "bg-gray-50",
  };

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
    <main className="min-h-screen bg-white">
      {/* HERO SECTION */}
      <div className="pt-40 pb-20 px-6 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <span
            className={`text-xs font-bold tracking-[0.2em] mb-4 block animate-fade-in-up ${theme.textColor}`}
          >
            {theme.subtitle}
          </span>
          <h1 className="text-6xl md:text-8xl font-bold text-[#1d1d1f] tracking-tighter mb-6 animate-fade-in-up delay-100">
            {title}
          </h1>
          <p className="text-xl md:text-2xl text-gray-500 font-medium max-w-2xl mx-auto leading-relaxed animate-fade-in-up delay-200">
            Explora la gama completa. Encuentra el perfecto para ti.
          </p>
        </div>
      </div>

      {/* FILTROS */}
      {products.length > 4 && (
        <div className="flex justify-center gap-3 mb-16 overflow-x-auto px-6 pb-4 scrollbar-hide">
          {["Todos", "Pro", "Nuevos", "Ofertas"].map((filter, i) => (
            <button
              key={filter}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                i === 0
                  ? "bg-[#1d1d1f] text-white shadow-lg shadow-black/20"
                  : "bg-white text-[#1d1d1f] border border-gray-200 hover:border-gray-400"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      )}

      {/* GRILLA DE PRODUCTOS */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pb-32">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => {
            const isFeatured = index === 0 && products.length > 3;

            return (
              <Link
                href={`/${product.category}/${product.slug}`}
                key={product.id}
                className={`
                  group relative flex flex-col bg-white rounded-[32px] overflow-hidden transition-all duration-500 ease-out 
                  shadow-xl shadow-gray-200/60 
                  border border-gray-100
                  hover:shadow-2xl hover:shadow-gray-300/50 hover:-translate-y-2 hover:border-transparent
                  ${
                    isFeatured
                      ? "lg:col-span-2 lg:flex-row lg:items-center"
                      : "h-full"
                  }
                `}
              >
                {/* Badge Nuevo */}
                {product.isNew && (
                  <span
                    className={`absolute top-6 left-6 z-20 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-md ${theme.badgeBg} ${theme.textColor}`}
                  >
                    Nuevo
                  </span>
                )}

                {/* IMAGEN */}
                <div
                  className={`
                  relative bg-[#F5F5F7] overflow-hidden flex items-center justify-center
                  ${
                    isFeatured
                      ? "w-full lg:w-1/2 h-80 lg:h-full order-2"
                      : "w-full h-80 pt-10"
                  }
                `}
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain p-8 transition-transform duration-700 ease-out group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute bottom-0 w-3/4 h-4 bg-black/5 blur-xl rounded-full translate-y-2 group-hover:scale-110 transition-transform duration-700"></div>
                </div>

                {/* INFO */}
                <div
                  className={`
                  flex flex-col p-8 md:p-10
                  ${isFeatured ? "w-full lg:w-1/2 order-1" : "flex-1"}
                `}
                >
                  <div className="flex gap-2 mb-4">
                    {product.isNew && (
                      <div
                        className={`flex items-center gap-1 text-[10px] font-bold uppercase ${theme.textColor}`}
                      >
                        <Star size={12} fill="currentColor" /> Top Ventas
                      </div>
                    )}
                    <div className="flex items-center gap-1 text-[10px] font-bold text-green-600 uppercase">
                      <Zap size={12} fill="currentColor" /> Envío Flash
                    </div>
                  </div>

                  <h3
                    className={`font-semibold text-[#1d1d1f] tracking-tight mb-2 transition-colors group-hover:${theme.textColor.replace(
                      "text-",
                      "text-"
                    )} ${isFeatured ? "text-4xl" : "text-2xl"}`}
                  >
                    {product.name}
                  </h3>

                  <p className="text-gray-500 font-medium leading-relaxed mb-8 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-6">
                    <div>
                      <p className="text-xs text-gray-400 font-medium mb-1">
                        Precio Online
                      </p>
                      <p className="text-xl font-bold text-[#1d1d1f]">
                        {formatMoney(product.price)}
                      </p>
                    </div>

                    <span
                      className={`w-12 h-12 rounded-full bg-[#f5f5f7] flex items-center justify-center text-[#1d1d1f] transition-all duration-300 group-hover:text-white group-hover:${theme.textColor.replace(
                        "text-",
                        "bg-"
                      )}`}
                    >
                      <ArrowRight size={20} />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Empty State */}
        {products.length === 0 && (
          <div className="py-32 text-center bg-white rounded-[32px] border border-dashed border-gray-200 shadow-sm">
            <ShieldCheck size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-[#1d1d1f] text-xl font-semibold mb-2">
              Próximamente
            </p>
            <p className="text-gray-500">
              Estamos renovando nuestro stock de {title}.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
