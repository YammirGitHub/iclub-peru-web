export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  category: 'iphone' | 'mac' | 'ipad' | 'watch' | 'airpods' | 'accesorios';
  slug: string;
  image: string;
  stock: number;
}

// Menú de navegación centralizado
export const NAV_LINKS = [
  { name: "Mac", href: "/mac" },
  { name: "iPad", href: "/ipad" },
  { name: "iPhone", href: "/iphone" },
  { name: "Watch", href: "/watch" },
  { name: "AirPods", href: "/airpods" },
  { name: "Accesorios", href: "/accesorios" },
  { name: "Soporte", href: "/soporte" },
];

export const products: Product[] = [
  // --- MACS ---
  {
    id: 'mac-1',
    title: 'MacBook Air M3 13"',
    description: 'La laptop más popular del mundo. Superpotenciada por el chip M3.',
    price: 5299,
    category: 'mac',
    slug: 'macbook-air-m3-13',
    image: '/products/macbook-air.webp', // Asegúrate de tener esta imagen
    stock: 10,
  },
  {
    id: 'mac-2',
    title: 'MacBook Pro 14" M3 Pro',
    description: 'Lo bestia. Chip M3 Pro, pantalla Liquid Retina XDR y hasta 22 horas de batería.',
    price: 8999,
    category: 'mac',
    slug: 'macbook-pro-14-m3-pro',
    image: '/products/macbook-pro.webp', 
    stock: 5,
  },
  // --- IPHONES ---
  {
    id: 'iphone-1',
    title: 'iPhone 15 Pro Max',
    description: 'Titanio. Chip A17 Pro. El iPhone más potente hasta la fecha.',
    price: 6499,
    category: 'iphone',
    slug: 'iphone-15-pro-max',
    image: '/products/iphone-hero-v3.webp', 
    stock: 15,
  },
  {
    id: 'iphone-2',
    title: 'iPhone 15',
    description: 'Dynamic Island. Cámara de 48 MP. Diseño resistente de aluminio y vidrio.',
    price: 4299,
    category: 'iphone',
    slug: 'iphone-15',
    image: '/products/iphone-15.webp', 
    stock: 20,
  },
  // --- IPADS ---
  {
    id: 'ipad-1',
    title: 'iPad Pro 12.9" M2',
    description: 'La experiencia definitiva de iPad con pantalla XDR y potencia M2.',
    price: 5999,
    category: 'ipad',
    slug: 'ipad-pro-12-m2',
    image: '/products/ipad-pro.webp', 
    stock: 8,
  }
];

// --- HELPERS (Lógica de Negocio) ---

export const getProductsByCategory = (category: string) => {
  return products.filter(product => product.category === category);
};

export const getProductBySlug = (slug: string) => {
  return products.find(product => product.slug === slug);
};

export const getAllCategories = () => {
  const categories = Array.from(new Set(products.map(product => product.category)));
  return categories;
};