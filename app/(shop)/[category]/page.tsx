import { getProductsByCategory, getAllCategories } from "@/lib/products";
import { notFound } from "next/navigation";
import ProductGrid from "@/components/product/ProductGrid"; // 👈 Importamos el nuevo componente

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((category) => ({ category }));
}

const categoryTheme: Record<
  string,
  { subtitle: string; textColor: string; badgeBg: string }
> = {
  iphone: {
    subtitle: "DISEÑADO PARA SER AMADO",
    textColor: "text-blue-600",
    badgeBg: "bg-blue-50",
  },
  mac: {
    subtitle: "POTENCIA EN ESTADO PURO",
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
    textColor: "text-sky-500",
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

  return (
    <main className="min-h-screen bg-white">
      {/* HERO SECTION */}
      <div className="pt-40 pb-10 px-6 text-center relative overflow-hidden">
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
      {/* 👇 AQUÍ VA EL COMPONENTE CLIENTE CON FILTROS FUNCIONALES */}
      <ProductGrid products={products} theme={theme} category={category} />{" "}
    </main>
  );
}
