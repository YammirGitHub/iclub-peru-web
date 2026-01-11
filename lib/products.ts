// lib/products.ts

// ----------------------------------------------------------------------
// 1. DEFINICIONES DE TIPO
// ----------------------------------------------------------------------

// CORRECCIÓN: Ahora se llama 'Category' para que coincida con tu page.tsx
export type Category =
  | "mac"
  | "ipad"
  | "iphone"
  | "watch"
  | "airpods"
  | "seminuevos"
  | "accesorios";

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: Category; // Usamos el tipo Category aquí
  price: number;
  previousPrice?: number;
  image: string;
  isNew?: boolean;
  description: string;
  colors?: string[];
}

// ----------------------------------------------------------------------
// 2. CONSTANTES DE UI (Menú de Navegación)
// ----------------------------------------------------------------------

export const NAV_LINKS = [
  { name: "Mac", href: "/mac" },
  { name: "iPad", href: "/ipad" },
  { name: "iPhone", href: "/iphone" },
  { name: "Watch", href: "/watch" },
  { name: "AirPods", href: "/airpods" },
  { name: "Seminuevos", href: "/seminuevos" },
  { name: "Accesorios", href: "/accesorios" },
  { name: "Soporte", href: "/soporte" },
];

// ----------------------------------------------------------------------
// 3. BASE DE DATOS SIMULADA
// ----------------------------------------------------------------------

const products: Product[] = [
  // --- MAC ---
  {
    id: "m1",
    slug: "macbook-pro-14-m3",
    name: 'MacBook Pro 14"',
    category: "mac",
    price: 1599,
    image: "/products/macbook-pro-14.webp",
    isNew: true,
    description: "El chip M3 Pro más avanzado. Potencia bestial.",
  },

  // --- IPAD ---
  {
    id: "ip1",
    slug: "ipad-pro-12-9",
    name: 'iPad Pro 12.9"',
    category: "ipad",
    price: 1099,
    image: "/products/ipad-pro.webp",
    isNew: true,
    description: "La experiencia iPad definitiva con chip M2.",
  },

  // --- IPHONE ---
  {
    id: "i1",
    slug: "iphone-1-lineup.webp",
    name: "iphone 17",
    category: "iphone",
    price: 1199,
    image: "/products/iphone-17-lineup.webp",
    isNew: true,
    description: "Titanio. Tan robusto. Tan ligero. Tan Pro.",
  },

  // --- WATCH ---
  {
    id: "w1",
    slug: "apple-watch-ultra-2",
    name: "Apple Watch Ultra 2",
    category: "watch",
    price: 799,
    image: "/products/watch-ultra-2.webp",
    isNew: true,
    description: "El reloj deportivo y de aventura definitivo.",
  },

  // --- AIRPODS ---
  {
    id: "a1",
    slug: "airpods-max",
    name: "AirPods Max",
    category: "airpods",
    price: 549,
    image: "/products/airpods-max.webp",
    description: "Sonido de alta fidelidad con un diseño espectacular.",
  },

  // --- SEMINUEVOS ---
  {
    id: "s1",
    slug: "iphone-13-seminuevo",
    name: "iPhone 13 (Seminuevo)",
    category: "seminuevos",
    price: 499,
    previousPrice: 699,
    image: "/products/iphone-13-used.webp",
    description: "100% funcional, batería al 90%. Garantía iClub.",
  },

  // --- ACCESORIOS ---
  {
    id: "ac1",
    slug: "magsafe-charger",
    name: "Cargador MagSafe",
    category: "accesorios",
    price: 39,
    image: "/products/magsafe.webp",
    description: "Carga inalámbrica rápida y sencilla.",
  },
];

// ----------------------------------------------------------------------
// 4. DATA ACCESS LAYER
// ----------------------------------------------------------------------

export const getProductsByCategory = async (
  category: string
): Promise<Product[]> => {
  return products.filter((product) => product.category === category);
};

export const getProductBySlug = async (
  slug: string
): Promise<Product | undefined> => {
  return products.find((product) => product.slug === slug);
};

// Devuelve array de tipo 'Category' para que coincida con generateStaticParams
export const getAllCategories = async (): Promise<Category[]> => {
  return [
    "mac",
    "ipad",
    "iphone",
    "watch",
    "airpods",
    "seminuevos",
    "accesorios",
  ];
};
