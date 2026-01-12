// @/lib/products.ts

export const NAV_LINKS = [
  { name: "Mac", href: "/mac" },
  { name: "iPad", href: "/ipad" },
  { name: "iPhone", href: "/iphone" },
  { name: "Watch", href: "/watch" },
  { name: "AirPods", href: "/airpods" },
  { name: "Accesorios", href: "/accesorios" },
  { name: "Certificados", href: "/certificados" },
  { name: "Soporte", href: "/soporte" },
];

// --- INTERFACES ---

export interface ProductVariant {
  label: string;
  priceModifier: number;
}

export interface ProductColor {
  name: string;
  hex: string;
  image: string;
}

export interface Product {
  id: string;
  slug: string;
  category: string;
  title: string;
  description: string;
  basePrice: number;
  features: string[];
  colors: ProductColor[];
  storageOptions: ProductVariant[];
}

// --- BASE DE DATOS (MOCK) ---

export const PRODUCTS: Product[] = [
  {
    id: "1",
    slug: "macbook-pro-m4",
    category: "mac",
    title: "MacBook Pro M4",
    description: "La laptop más pro de todas. Rendimiento salvaje y una batería que dura todo el día.",
    basePrice: 7999,
    features: ["Chip M4 Pro o M4 Max", "Pantalla Liquid Retina XDR", "Hasta 22 horas de batería"],
    colors: [
      { name: "Negro Espacial", hex: "#2e2c2e", image: "/products/macbook-pro-black.png" },
      { name: "Plata", hex: "#e3e4e5", image: "/products/macbook-pro-silver.png" },
    ],
    storageOptions: [
      { label: "512 GB SSD", priceModifier: 0 },
      { label: "1 TB SSD", priceModifier: 900 },
      { label: "2 TB SSD", priceModifier: 2700 },
    ],
  },
  {
    id: "2",
    slug: "iphone-15-pro",
    category: "iphone",
    title: "iPhone 15 Pro",
    description: "Titanio. Tan fuerte. Tan ligero. Tan Pro.",
    basePrice: 5499,
    features: ["Chip A17 Pro", "Sistema de cámaras Pro", "Botón de Acción"],
    colors: [
      { name: "Titanio Natural", hex: "#bdae9c", image: "/products/iphone-15-natural.png" },
      { name: "Titanio Azul", hex: "#2f3846", image: "/products/iphone-15-blue.png" },
      { name: "Titanio Negro", hex: "#181819", image: "/products/iphone-15-black.png" },
    ],
    storageOptions: [
      { label: "128 GB", priceModifier: 0 },
      { label: "256 GB", priceModifier: 500 },
      { label: "512 GB", priceModifier: 1500 },
    ],
  },
  // Agrega más productos aquí según necesites
];

// --- HELPERS / FUNCIONES ---

export const getProductsByCategory = (category: string) => 
  PRODUCTS.filter((p) => p.category === category);

export const getProductBySlug = (slug: string) => 
  PRODUCTS.find((p) => p.slug === slug);

export async function getAllCategories() {
  // 1. Obtenemos todas las categorías usando la constante PRODUCTS (en mayúsculas)
  const categories = PRODUCTS.map((product) => product.category);
  
  // 2. Usamos 'Set' para eliminar duplicados
  const uniqueCategories = new Set(categories);
  
  // 3. Devolvemos el array limpio
  return Array.from(uniqueCategories);
}