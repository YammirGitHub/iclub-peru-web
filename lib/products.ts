// lib/products.ts

// 1. Definimos la estructura obligatoria de un producto
// lib/products.ts
export interface Product {
  id: string;
  slug: string;
  category: "iphone" | "mac" | "ipad" | "watch" | "airpods" | "accesorios" | "seminuevo";
  name: string;
  tagline: string;
  description: string;
  price: number;
  mainImage: string; // Imagen principal para las tarjetas
  images: { [key: string]: string }; // Mapa de imágenes por color
  colors: { name: string; code: string; id: string }[];
  storage: { capacity: string; priceModifier: number }[];
}

export const products: Product[] = [
  {
    id: "iphone-17-pro-max",
    slug: "iphone-17-pro-max",
    category: "iphone",
    name: "iPhone 17 Pro Max",
    tagline: "El titán del titanio.",
    description: "Diseñado con titanio de grado aeroespacial. El chip A18 Pro más rápido de la historia.",
    price: 1499,
    mainImage: "/products/iphone-17-pro-max.png", // Asegúrate que esta imagen exista en public/products/
    images: {
      "titanio-natural": "/products/iphone-17-pro-max.png",
      "titanio-azul": "/products/iphone-16-pro-max.png", // Ejemplo temporal
    },
    colors: [
      { name: "Titanio Natural", code: "#bebdb8", id: "titanio-natural" },
      { name: "Titanio Azul", code: "#2f384a", id: "titanio-azul" },
    ],
    storage: [
      { capacity: "256 GB", priceModifier: 0 },
      { capacity: "512 GB", priceModifier: 200 },
      { capacity: "1 TB", priceModifier: 400 },
    ]
  },
  

  // --- PRODUCTO 2: SEMINUEVO (Ejemplo corregido) ---
  {
    id: "iphone-13-seminuevo",
    slug: "iphone-13-128gb-seminuevo",
    category: "seminuevo",
    name: "iPhone 13 (128GB)",
    tagline: "Seminuevo Certificado - Grado A",
    description: "Equipo 100% funcional. Batería sobre el 85%. Garantía de 6 meses iClub.",
    price: 650,
    mainImage: "/products/iphone-13-midnight.png", // Asegúrate que exista
    images: {
      "midnight": "/products/iphone-13-midnight.png",
      "starlight": "/products/iphone-13-starlight.png"
    },
    colors: [
      { name: "Medianoche", code: "#192029", id: "midnight" },
      { name: "Blanco Estelar", code: "#f0f2f2", id: "starlight" }
    ],
    storage: [
      { capacity: "128 GB", priceModifier: 0 } // Solo una opción si es único
    ]
  }


];