import { getProductsByCategory, getAllCategories } from "@/lib/products";
import { notFound } from "next/navigation";
import ProductGrid from "@/components/product/ProductGrid";
import CategoryHero from "@/components/ui/CategoryHero";

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((category) => ({ category }));
}

// --- CONFIGURACIÓN DE TEMA ---
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

  // Validación de seguridad (404 si la categoría no existe)
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

  const description =
    "Explora la gama completa. Encuentra el perfecto para ti.";

  return (
    <main className="min-h-screen bg-white">
      {/* ⚡️ CORRECCIÓN ANIMACIÓN: key={category}
         Al poner la 'key' aquí, React destruye y crea de nuevo el componente
         cuando cambia la categoría, disparando la animación 'initial' de Framer Motion.
      */}
      <CategoryHero
        key={category}
        title={title}
        subtitle={theme.subtitle}
        description={description}
        textColor={theme.textColor}
        categoryKey={category}
      />

      {/* ⚡️ CORRECCIÓN ANIMACIÓN: key={category + "-grid"}
         Lo mismo para la grilla. Esto asegura que las tarjetas hagan su
         efecto de cascada (stagger) cada vez que navegas.
      */}
      <ProductGrid
        key={`${category}-grid`}
        products={products}
        theme={theme}
        category={category}
      />
    </main>
  );
}
