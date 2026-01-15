// --- lib/products.ts ---

// 1. DEFINICIÓN DE TIPOS
export type ProductCategory =
  | "iphone"
  | "mac"
  | "ipad"
  | "watch"
  | "airpods"
  | "accesorios"
  | "certificados";

export interface ProductMarketing {
  slogan: string;
  subSlogan: string;
  features: {
    title: string;
    description: string;
    icon: "chip" | "battery" | "camera" | "shield" | "screen";
  }[];
}

export interface ProductColor {
  name: string;
  hex: string;
  class?: string;
  image?: string;
}

export interface StorageOption {
  capacity: string;
  price: number;
}

// 2. INTERFAZ PRINCIPAL
export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  image: string;
  video?: string;

  category: ProductCategory;
  originalPrice?: number;
  // Opcionales
  images?: string[];
  colors?: ProductColor[];
  storage?: StorageOption[];
  marketing?: ProductMarketing;
  isNew?: boolean;

  // 👇 AGREGA ESTO:
  sizes?: {
    name: string;          // "13", "15"
    label: string;         // "13 pulgadas"
    description?: string;  // "Desde S/ 5,499" (Opcional para mostrar texto extra)
    priceModifier: number; // 0 para el base, +1200 para el grande
  }[];
}

// 3. BASE DE DATOS DE PRODUCTOS
export const products: Product[] = [
  // ==========================================
  // MAC SERIES
  // ==========================================
  {
    id: "macbook-pro-14-m5",
    slug: "macbook-pro-14-m5",
    name: 'MacBook Pro 14" (M5)',
    description: "Poder sin precedentes con el nuevo chip M5. Rendimiento Pro llevado al límite.",
    
    // ESTRATEGIA: FLAGSHIP (Nuevo) -> Precio Limpio
    price: 8499,
    // originalPrice: undefined, 
    
    category: "mac",
    
    image: "/images/mac/Apple-MacBook-Pro-14-in-macOS-Tahoe-Apple-Intelligence-Rewrite-251015.jpg",
    
    colors: [
      { 
        name: "Negro Espacial", 
        hex: "#2E3133", // El negro profundo de los modelos Pro
        image: "/images/mac/Apple-MacBook-Pro-14-in-macOS-Tahoe-Apple-Intelligence-Rewrite-251015.jpg" 
      },
      { 
        name: "Plata", 
        hex: "#E3E4E5",
        image: "/images/mac/MacBook-Pro-14-lineup.webp" 
      },
    ],
    
    // Los Pro nuevos suelen arrancar en 512GB y saltar a 1TB/2TB
    storage: [
      { capacity: "512GB", price: 8499 },
      { capacity: "1TB", price: 9499 },
      { capacity: "2TB", price: 11499 },
    ],
    isNew: true,
    marketing: {
      slogan: "Pro. Más allá de lo posible.",
      subSlogan: "El chip M5 redefine la velocidad en flujos de trabajo profesionales.",
      features: [
        { title: "Chip M5", description: "Arquitectura de 2nm.", icon: "chip" },
        { title: "Pantalla XDR", description: "1600 nits sostenidos.", icon: "screen" },
        { title: "Batería Pro", description: "Hasta 24 horas de uso.", icon: "battery" },
      ],
    },
  },
  {
    id: "macbook-air-m4",
    slug: "macbook-air-m4",
    name: 'MacBook Air 13" & 15" (M4)',
    description: "Sorprendentemente delgada. Increíblemente potente con el chip M4.",
    
    // ESTRATEGIA: MID-RANGE (Novedad accesible) -> Descuento Táctico
    price: 5499,
    originalPrice: 5999, 

    category: "mac",
    image: "/images/mac/macbook-air-m4.png",
    // 👇 AQUÍ ESTÁ LA MAGIA DE LOS TAMAÑOS
    sizes: [
      { 
        name: "13", 
        label: '13 pulgadas', 
        description: "El clásico portátil.", 
        priceModifier: 0 // Precio base
      },
      { 
        name: "15", 
        label: '15 pulgadas', 
        description: "Más pantalla para ver más.", 
        priceModifier: 1200 // S/ 1200 adicionales
      },
    ],
    // Colores exactos de la línea Air actual
    colors: [
      { name: "Medianoche", hex: "#2E3642", image: "/images/mac/macbook-air-m4.png" }, // Azul oscuro casi negro
      { name: "Blanco Estelar", hex: "#F0E5D3", image: "/images/mac/macbook-air-m4-starlight.png" }, // Dorado suave
      { name: "Gris Espacial", hex: "#7D7E80", image: "/images/mac/macbook-air-m4-spacegray.png" },
      { name: "Plata", hex: "#E3E4E5", image: "/images/mac/macbook-air-m4-silver.png" },
    ],
    
    storage: [
      { capacity: "256GB", price: 5499 },
      { capacity: "512GB", price: 6499 },
      { capacity: "1TB", price: 7499 },
    ],
    isNew: true,
    marketing: {
      slogan: "Poder que vuela.",
      subSlogan: "La laptop más querida del mundo, ahora con el poder del chip M4.",
      features: [
        { title: "Chip M4", description: "1.5x más rápido que M2.", icon: "chip" },
        { title: "Diseño Air", description: "Sin ventiladores, silencio total.", icon: "shield" },
      ],
    },
  },
  {
    id: "mac-studio-m4-max",
    slug: "mac-studio-m4-max",
    name: "Mac Studio (M4 Max)",
    description: "Una central de potencia compacta para estudios creativos.",
    
    // ESTRATEGIA: PRO NICHE -> Precio Limpio (Herramienta de trabajo)
    price: 9999,
    
    category: "mac",
    image: "/images/mac/mac-studio-m4.png",
    
    // Mac Studio solo viene en Plata
    colors: [
      { name: "Plata", hex: "#E3E4E5", image: "/images/mac/mac-studio-m4.png" }
    ],
    
    storage: [
      { capacity: "512GB", price: 9999 }, 
      { capacity: "1TB", price: 11499 },
      { capacity: "2TB", price: 13499 }
    ],
    isNew: true,
  },
  {
    id: "macbook-pro-m4-pro",
    slug: "macbook-pro-m4-pro",
    name: 'MacBook Pro 16" (M4 Pro)',
    description: "Pantalla grande, rendimiento masivo. El estándar de la industria.",
    
    // ESTRATEGIA: GEN ANTERIOR (High End) -> Descuento Táctico
    price: 10999,
    originalPrice: 11699, 

    category: "mac",
    image: "/images/mac/macbook-pro-16.png",
    
    colors: [
      { name: "Negro Espacial", hex: "#2E3133", image: "/images/mac/macbook-pro-16.png" },
      { name: "Plata", hex: "#E3E4E5", image: "/images/mac/macbook-pro-16-silver.png" }
    ],
    
    storage: [
      { capacity: "512GB", price: 10999 },
      { capacity: "1TB", price: 11999 },
      { capacity: "4TB", price: 15999 } // Pro users buscan alto almacenamiento
    ],
  },
  {
    id: "imac-24-m4",
    slug: "imac-24-m4",
    name: 'iMac 24" (M4)',
    description: "Todo en uno. Ahora con el poder de la inteligencia artificial M4.",
    
    // ESTRATEGIA: NUEVO LANZAMIENTO -> Precio Limpio
    price: 6299,

    category: "mac",
    image: "/images/mac/imac-m4.png",
    
    // Colores vibrantes reales del iMac
    colors: [
      { name: "Azul", hex: "#486C8C", image: "/images/mac/imac-m4.png" },
      { name: "Verde", hex: "#4B6F57", image: "/images/mac/imac-m4-green.png" },
      { name: "Rosa", hex: "#983842", image: "/images/mac/imac-m4-pink.png" },
      { name: "Plata", hex: "#E3E4E5", image: "/images/mac/imac-m4-silver.png" },
    ],
    
    storage: [
      { capacity: "256GB", price: 6299 },
      { capacity: "512GB", price: 7299 }
    ],
    isNew: true,
  },
  {
    id: "mac-mini-m4",
    slug: "mac-mini-m4",
    name: "Mac mini (M4)",
    description: "Completamente rediseñada. Más pequeña, más rápida, más Mac.",
    
    // ESTRATEGIA: ENTRY FLAGSHIP -> Precio Limpio
    price: 2999,
    
    category: "mac",
    image: "/images/mac/mac-mini-m4.png",
    colors: [
      { name: "Plata", hex: "#E3E4E5", image: "/images/mac/mac-mini-m4.png" }
    ],
    storage: [
      { capacity: "256GB", price: 2999 },
      { capacity: "512GB", price: 3999 }
    ],
    isNew: true,
  },
  {
    id: "macbook-pro-m3",
    slug: "macbook-pro-m3",
    name: 'MacBook Pro 14" (M3)',
    description: "Eficiencia y potencia balanceadas con el chip M3.",
    
    // ESTRATEGIA: OLD (Clearance) -> Descuento Agresivo
    price: 6499,
    originalPrice: 7999, 

    category: "mac",
    image: "/images/mac/macbook-pro-14-m3.png",
    
    colors: [
      { name: "Gris Espacial", hex: "#7D7E80", image: "/images/mac/macbook-pro-14-m3.png" }, // El M3 base era Gris, no Negro
      { name: "Plata", hex: "#E3E4E5", image: "/images/mac/macbook-pro-14-m3-silver.png" }
    ],
    
    storage: [
      { capacity: "512GB", price: 6499 },
      { capacity: "1TB", price: 7499 }
    ],
  },
  {
    id: "macbook-air-15-m2",
    slug: "macbook-air-15-m2",
    name: 'MacBook Air 15" (M2)',
    description: "La laptop de 15 pulgadas más delgada del mundo.",
    
    // ESTRATEGIA: OLD -> Descuento Agresivo
    price: 4999,
    originalPrice: 5999,

    category: "mac",
    image: "/images/mac/macbook-air-15-m2.png",
    
    colors: [
      { name: "Medianoche", hex: "#2E3642", image: "/images/mac/macbook-air-15-m2.png" },
      { name: "Blanco Estelar", hex: "#F0E5D3", image: "/images/mac/macbook-air-15-m2-starlight.png" },
      { name: "Gris Espacial", hex: "#7D7E80", image: "/images/mac/macbook-air-15-m2-spacegray.png" },
    ],
    
    storage: [
      { capacity: "256GB", price: 4999 },
      { capacity: "512GB", price: 5999 }
    ],
  },
  {
    id: "macbook-air-m2-redesign",
    slug: "macbook-air-m2-redesign",
    name: "MacBook Air 13\" (M2)",
    description: "Rediseño total con carga MagSafe y pantalla Liquid Retina.",
    
    // ESTRATEGIA: ENTRY LEVEL -> Precio Gancho
    price: 3999,
    originalPrice: 4799, 

    category: "mac",
    image: "/images/mac/macbook-air-m2.png",
    
    colors: [
      { name: "Blanco Estelar", hex: "#F0E5D3", image: "/images/mac/macbook-air-m2.png" }, // Asumiendo foto starlight
      { name: "Medianoche", hex: "#2E3642", image: "/images/mac/macbook-air-m2-midnight.png" },
      { name: "Plata", hex: "#E3E4E5", image: "/images/mac/macbook-air-m2-silver.png" },
    ],
    
    storage: [
      { capacity: "256GB", price: 3999 },
      { capacity: "512GB", price: 4999 }
    ],
  },
  {
    id: "imac-24-m1",
    slug: "imac-24-m1",
    name: 'iMac 24" (M1)',
    description: "El clásico que inició la era Apple Silicon. Diseño ultra delgado.",
    
    // ESTRATEGIA: LIQUIDACIÓN FINAL
    price: 3599,
    originalPrice: 4999, 

    category: "mac",
    image: "/images/mac/imac-m1.png",
    
    // El iMac M1 tenía colores más pasteles/diferentes
    colors: [
      { name: "Azul", hex: "#486C8C", image: "/images/mac/imac-m1.png" },
      { name: "Plata", hex: "#E3E4E5", image: "/images/mac/imac-m1-silver.png" },
      { name: "Rosa", hex: "#EFC3CA", image: "/images/mac/imac-m1-pink.png" }
    ],
    
    storage: [{ capacity: "256GB", price: 3599 }],
  },
  // ==========================================
  // iPAD SERIES (2021 - 2025)
  // ==========================================
  {
    id: "ipad-pro-m5-oled",
    slug: "ipad-pro-m5-oled",
    name: 'iPad Pro 11" & 13" (M5)',
    description:
      "La cumbre del rendimiento. Pantalla OLED de última generación y el poder del chip M5.",

    // ESTRATEGIA: FLAGSHIP -> Precio Limpio (Novedad absoluta)
    price: 4599,
    // originalPrice: undefined,

    category: "ipad",
    image: "/images/ipad/ipad-pro-m5.png", // Negro por defecto

    colors: [
      {
        name: "Negro Espacial",
        hex: "#2e3133",
        image: "/images/ipad/ipad-pro-m5.png",
      },
      {
        name: "Plata",
        hex: "#e3e4e5",
        image: "/images/ipad/ipad-pro-m5-silver.png",
      },
    ],

    storage: [
      { capacity: "256GB", price: 4599 },
      { capacity: "512GB", price: 5299 },
      { capacity: "1TB", price: 6899 },
    ],
    isNew: true, // Filtro: "Nuevos"
    marketing: {
      slogan: "Poder Pro. Sin límites.",
      subSlogan:
        "El chip M5 y la pantalla Ultra Retina XDR redefinen lo que un iPad puede hacer.",
      features: [
        {
          title: "Chip M5",
          description: "Rendimiento gráfico 2x superior.",
          icon: "chip",
        },
        {
          title: "Ultra Retina XDR",
          description: "OLED en tándem.",
          icon: "screen",
        },
        {
          title: "Batería Pro",
          description: "Autonomía para todo el día.",
          icon: "battery",
        },
      ],
    },
  },
  {
    id: "ipad-air-m3",
    slug: "ipad-air-m3",
    name: 'iPad Air 11" & 13" (M3)',
    description:
      "Versatilidad total. Ahora con el chip M3 y soporte para trazado de rayos por hardware.",

    // ESTRATEGIA: MID-RANGE NEW -> Descuento Táctico (Pequeño)
    price: 2999,
    originalPrice: 3199, // Ahorro S/ 200

    category: "ipad",
    image: "/images/ipad/ipad-air-m3.png",

    colors: [
      { name: "Azul", hex: "#8fb2c9", image: "/images/ipad/ipad-air-m3.png" },
      {
        name: "Púrpura",
        hex: "#c0b6d4",
        image: "/images/ipad/ipad-air-m3-purple.png",
      },
      {
        name: "Luz Estelar",
        hex: "#faf7f2",
        image: "/images/ipad/ipad-air-m3-starlight.png",
      },
    ],

    storage: [
      { capacity: "128GB", price: 2999 },
      { capacity: "256GB", price: 3499 },
    ],
    isNew: true,
    marketing: {
      slogan: "Ligero. Potente. Épico.",
      subSlogan:
        "El nuevo iPad Air con chip M3 es una máquina de creatividad imparable.",
      features: [
        {
          title: "Chip M3",
          description: "Arquitectura avanzada.",
          icon: "chip",
        },
        {
          title: "Diseño Air",
          description: "Potencia y portabilidad.",
          icon: "shield",
        },
      ],
    },
  },
  {
    id: "ipad-11-gen",
    slug: "ipad-11-gen",
    name: "iPad (11.ª generación)",
    description:
      "El iPad para todos. Actualizado con el chip A16 Bionic y 128 GB de base.",

    // ESTRATEGIA: ENTRY NEW -> Precio Limpio (Es modelo nuevo)
    price: 1899,
    // originalPrice: undefined,

    category: "ipad",
    image: "/images/ipad/ipad-11.png",

    colors: [
      { name: "Azul", hex: "#a2b5c7", image: "/images/ipad/ipad-11.png" },
      { name: "Rosa", hex: "#f8d7da", image: "/images/ipad/ipad-11-pink.png" },
      {
        name: "Plata",
        hex: "#e3e4e5",
        image: "/images/ipad/ipad-11-silver.png",
      },
    ],

    storage: [
      { capacity: "128GB", price: 1899 },
      { capacity: "256GB", price: 2399 },
    ],
    isNew: true,
  },
  {
    id: "ipad-pro-m4-oled",
    slug: "ipad-pro-m4-oled",
    name: "iPad Pro (M4)",
    description:
      "El primer iPad con pantalla Ultra Retina XDR y el diseño más delgado de la historia.",

    // ESTRATEGIA: CLEARANCE PRO -> Descuento Agresivo
    price: 3899,
    originalPrice: 4699, // ¡S/ 800 de descuento! Gran oportunidad

    category: "ipad",
    image: "/images/ipad/ipad-pro-m4.png",
    colors: [
      {
        name: "Negro Espacial",
        hex: "#1d1d1f",
        image: "/images/ipad/ipad-pro-m4.png",
      },
    ],
    storage: [{ capacity: "256GB", price: 3899 }],
    marketing: {
      slogan: "Delgadez imposible.",
      subSlogan: "Diseño radical con la potencia del chip M4.",
      features: [
        {
          title: "Chip M4",
          description: "Rendimiento neuronal.",
          icon: "chip",
        },
        {
          title: "OLED en Tándem",
          description: "Contraste perfecto.",
          icon: "screen",
        },
      ],
    },
  },
  {
    id: "ipad-mini-a17-pro",
    slug: "ipad-mini-a17-pro",
    name: "iPad mini (A17 Pro)",
    description:
      "Pequeño en tamaño, gigante en inteligencia. Compatible con Apple Intelligence.",

    // ESTRATEGIA: NICHE NEW -> Precio Limpio
    price: 2499,
    // originalPrice: undefined,

    category: "ipad",
    image: "/images/ipad/ipad-mini-a17.png",

    colors: [
      {
        name: "Gris Espacial",
        hex: "#6f7173",
        image: "/images/ipad/ipad-mini-a17.png",
      },
      {
        name: "Púrpura",
        hex: "#c0b6d4",
        image: "/images/ipad/ipad-mini-a17-purple.png",
      },
    ],
    storage: [{ capacity: "128GB", price: 2499 }],
    isNew: true,
  },
  {
    id: "ipad-10-gen",
    slug: "ipad-10-gen",
    name: "iPad (10.ª generación)",
    description:
      "Rediseño total con USB-C y cámara frontal horizontal. Todo color.",

    // ESTRATEGIA: ENTRY OLD -> Descuento Muy Visual
    price: 1499,
    originalPrice: 1999, // Rompe la barrera de los 1500

    category: "ipad",
    image: "/images/ipad/ipad-10.png",

    colors: [
      { name: "Azul", hex: "#8fb2c9", image: "/images/ipad/ipad-10.png" },
      {
        name: "Amarillo",
        hex: "#fef1c8",
        image: "/images/ipad/ipad-10-yellow.png",
      },
      { name: "Rojo", hex: "#af111c", image: "/images/ipad/ipad-10-red.png" },
    ],
    storage: [{ capacity: "64GB", price: 1499 }],
  },
  {
    id: "ipad-air-5-m1",
    slug: "ipad-air-5-m1",
    name: "iPad Air (5.ª generación)",
    description: "Potencia Pro al alcance de todos con el chip M1.",

    // ESTRATEGIA: LIQUIDACIÓN
    price: 2199,
    originalPrice: 2799,

    category: "ipad",
    image: "/images/ipad/ipad-air-m1.png",
    colors: [
      { name: "Azul", hex: "#8fb2c9", image: "/images/ipad/ipad-air-m1.png" },
    ],
    storage: [{ capacity: "64GB", price: 2199 }],
  },
  {
    id: "ipad-mini-6-gen",
    slug: "ipad-mini-6-gen",
    name: "iPad mini (6.ª generación)",
    description: "Rediseño completo con marcos reducidos y USB-C.",

    // ESTRATEGIA: LIQUIDACIÓN
    price: 1899,
    originalPrice: 2399,

    category: "ipad",
    image: "/images/ipad/ipad-mini-6.png",
    colors: [
      {
        name: "Gris Espacial",
        hex: "#6f7173",
        image: "/images/ipad/ipad-mini-6.png",
      },
    ],
    storage: [{ capacity: "64GB", price: 1899 }],
  },
  {
    id: "ipad-9-gen",
    slug: "ipad-9-gen",
    name: "iPad (9.ª generación)",
    description: "El iPad clásico con botón de inicio y puerto Lightning.",

    // ESTRATEGIA: REMATE FINAL
    price: 1099,
    originalPrice: 1599, // El iPad más barato

    category: "ipad",
    image: "/images/ipad/ipad-9.png",
    colors: [
      { name: "Plata", hex: "#e3e4e5", image: "/images/ipad/ipad-9.png" },
    ],
    storage: [{ capacity: "64GB", price: 1099 }],
  },
  // ==========================================
  // iPHONE 17 SERIES (2025) - VIGENTES 2026
  // ==========================================
  {
    id: "iphone-17-pro-max",
    slug: "iphone-17-pro-max",
    name: "iPhone 17 Pro Max",
    description: "El futuro de Apple Intelligence.",

    // ESTRATEGIA: FLAGSHIP -> Precio Limpio (Exclusividad)
    price: 6499,
    // originalPrice: undefined,

    category: "iphone",
    image: "/images/iphone/iphone-17-pro-max-silver.webp",

    colors: [
      {
        name: "Titanio Plata",
        hex: "#e3e4e5",
        image: "/images/iphone/iphone-17-pro-max-silver.webp",
      },
      {
        name: "Naranja Cósmico",
        hex: "#d46b57",
        image: "/images/iphone/iphone-17-pro-max-orange.webp",
      },
      {
        name: "Azul Profundo",
        hex: "#1d263b",
        image: "/images/iphone/iphone-17-pro-max-blue.webp",
      },
    ],
    storage: [
      { capacity: "256GB", price: 6499 },
      { capacity: "512GB", price: 7299 },
    ],
    isNew: true, // Filtro: "Nuevos"
    marketing: {
      slogan: "Titanio. Muy fuerte. Muy ligero.",
      subSlogan: "El iPhone más potente hasta hoy.",
      features: [
        {
          title: "Chip A19 Pro",
          description: "Potencia sin precedentes.",
          icon: "chip",
        },
        {
          title: "Cámara 48MP",
          description: "Detalle profesional.",
          icon: "camera",
        },
      ],
    },
  },
  {
    id: "iphone-17-pro",
    slug: "iphone-17-pro",
    name: "iPhone 17 Pro",
    description: "Gama alta con chip A19 Pro en un tamaño ergonómico.",

    // ESTRATEGIA: FLAGSHIP -> Precio Limpio
    price: 5999,
    // originalPrice: undefined,

    category: "iphone",
    image: "/images/iphone/iphone-17-pro.png",
    colors: [
      {
        name: "Titanio Aero",
        hex: "#3c3d3a",
        image: "/images/iphone/iphone-17-pro.png",
      },
    ],
    storage: [{ capacity: "128GB", price: 5999 }],
    isNew: true,
  },
  {
    id: "iphone-17-air",
    slug: "iphone-17-air",
    name: "iPhone Air",
    description:
      "Extremadamente delgado (5.6 mm). La nueva tendencia de diseño.",

    // ESTRATEGIA: NOVEDAD DISEÑO -> Precio Limpio
    price: 5499,
    // originalPrice: undefined,

    category: "iphone",
    image: "/images/iphone/iphone-17-air-silver.png",
    colors: [
      {
        name: "Plata",
        hex: "#e3e4e5",
        image: "/images/iphone/iphone-17-air-silver.png",
      },
      {
        name: "Negro",
        hex: "#1d1d1f",
        image: "/images/iphone/iphone-17-air-black.png",
      },
    ],
    storage: [
      { capacity: "128GB", price: 5499 },
      { capacity: "256GB", price: 5999 },
    ],
    isNew: true,
    marketing: {
      slogan: "Más aire que nunca.",
      subSlogan: "Un diseño radicalmente delgado que redefine la portabilidad.",
      features: [
        {
          title: "Grosor de 5.6mm",
          description: "El iPhone más delgado jamás creado.",
          icon: "screen",
        },
        {
          title: "Eficiencia Mínima",
          description: "Gran batería en un cuerpo compacto.",
          icon: "battery",
        },
      ],
    },
  },
  {
    id: "iphone-17",
    slug: "iphone-17",
    name: "iPhone 17",
    description: "Modelo base con pantalla de 6.3 pulgadas.",

    // ESTRATEGIA: ENTRY NEW -> Precio Limpio
    price: 4499,
    // originalPrice: undefined,

    category: "iphone",
    image: "/images/iphone/iphone-17-blue.png",
    colors: [
      {
        name: "Azul",
        hex: "#a2b5c7",
        image: "/images/iphone/iphone-17-blue.png",
      },
      {
        name: "Verde",
        hex: "#e2eadf",
        image: "/images/iphone/iphone-17-green.png",
      },
    ],
    storage: [{ capacity: "128GB", price: 4499 }],
    isNew: true,
  },
  {
    id: "iphone-16-pro-max",
    slug: "iphone-16-pro-max",
    name: "iPhone 16 Pro Max",
    description: "Pantalla inmersiva de 6.9 pulgadas.",

    // ESTRATEGIA: MID-RANGE -> Descuento Táctico
    price: 5799,
    originalPrice: 6499, // Ahorro visible de S/ 700

    category: "iphone",
    image: "/images/iphone/iphone-16-pro-max.png",
    colors: [
      {
        name: "Titanio Negro",
        hex: "#1d1d1f",
        image: "/images/iphone/iphone-16-pro-max.png",
      },
    ],
    storage: [{ capacity: "256GB", price: 5799 }],
    isNew: false, // Filtro: "Ofertas" y "Pro"
    marketing: {
      slogan: "La grandeza del Pro.",
      subSlogan: "Control de Cámara y Apple Intelligence.",
      features: [
        {
          title: "Control de Cámara",
          description: "Un botón táctil para capturas perfectas.",
          icon: "camera",
        },
        {
          title: 'Pantalla de 6.9"',
          description: "La pantalla más grande de la historia.",
          icon: "screen",
        },
      ],
    },
  },
  {
    id: "iphone-16-pro",
    slug: "iphone-16-pro",
    name: "iPhone 16 Pro",
    description: "Marco de titanio y pantalla de 6.3 pulgadas.",

    // ESTRATEGIA: MID-RANGE -> Descuento Táctico
    price: 5199,
    originalPrice: 5899,

    category: "iphone",
    image: "/images/iphone/iphone-16-pro.png",
    colors: [
      {
        name: "Titanio Natural",
        hex: "#beb9b2",
        image: "/images/iphone/iphone-16-pro.png",
      },
    ],
    storage: [{ capacity: "128GB", price: 5199 }],
  },
  {
    id: "iphone-16-plus",
    slug: "iphone-16-plus",
    name: "iPhone 16 Plus",
    description: "Versión con pantalla de 6.7 pulgadas.",

    // ESTRATEGIA: MID-RANGE
    price: 4599,
    originalPrice: 5299,

    category: "iphone",
    image: "/images/iphone/iphone-16-plus.png",
    colors: [
      {
        name: "Ultramarino",
        hex: "#3a6ea5",
        image: "/images/iphone/iphone-16-plus.png",
      },
    ],
    storage: [{ capacity: "128GB", price: 4599 }],
  },
  {
    id: "iphone-16",
    slug: "iphone-16",
    name: "iPhone 16",
    description: "Modelo estándar con el nuevo botón de Control de Cámara.",

    // ESTRATEGIA: MID-RANGE
    price: 3999,
    originalPrice: 4699,

    category: "iphone",
    image: "/images/iphone/iphone-16.png",
    colors: [
      { name: "Rosa", hex: "#f8d7da", image: "/images/iphone/iphone-16.png" },
    ],
    storage: [{ capacity: "128GB", price: 3999 }],
  },
  {
    id: "iphone-16e",
    slug: "iphone-16e",
    name: "iPhone 16e",
    description: "Modelo de entrada lanzado a principios de 2025.",

    // ESTRATEGIA: NUEVO BUDGET -> Precio Limpio
    price: 3499,
    // originalPrice: undefined,

    category: "iphone",
    image: "/images/iphone/iphone-16e.png",
    colors: [
      {
        name: "Blanco",
        hex: "#ffffff",
        image: "/images/iphone/iphone-16e.png",
      },
    ],
    storage: [{ capacity: "128GB", price: 3499 }],
    isNew: true, // Filtro: "Nuevos"
  },
  {
    id: "iphone-15-pro-max",
    slug: "iphone-15-pro-max",
    name: "iPhone 15 Pro Max",
    description: "Primer iPhone con lente periscopio para zoom óptico de 5x.",

    // ESTRATEGIA: CLEARANCE -> Descuento Agresivo
    price: 4899,
    originalPrice: 6199, // Ahorro brutal de S/ 1300

    category: "iphone",
    image: "/images/iphone/iphone-15-pro-max.png",
    colors: [
      {
        name: "Titanio Azul",
        hex: "#2f3846",
        image: "/images/iphone/iphone-15-pro-max.png",
      },
    ],
    storage: [{ capacity: "256GB", price: 4899 }],
  },
  {
    id: "iphone-15-pro",
    slug: "iphone-15-pro",
    name: "iPhone 15 Pro",
    description: "Introdujo el acabado en titanio y el botón de Acción.",

    // ESTRATEGIA: CLEARANCE
    price: 4299,
    originalPrice: 5599,

    category: "iphone",
    image: "/images/iphone/iphone-15-pro.png",
    colors: [
      {
        name: "Titanio Natural",
        hex: "#beb9b2",
        image: "/images/iphone/iphone-15-pro.png",
      },
    ],
    storage: [{ capacity: "128GB", price: 4299 }],
  },
  {
    id: "iphone-15-plus",
    slug: "iphone-15-plus",
    name: "iPhone 15 Plus",
    description: "Versión con mayor batería y pantalla grande.",

    // ESTRATEGIA: CLEARANCE
    price: 3999,
    originalPrice: 4999,

    category: "iphone",
    image: "/images/iphone/iphone-15-plus.png",
    colors: [
      {
        name: "Amarillo",
        hex: "#fef1c8",
        image: "/images/iphone/iphone-15-plus.png",
      },
    ],
    storage: [{ capacity: "128GB", price: 3999 }],
  },
  {
    id: "iphone-15",
    slug: "iphone-15",
    name: "iPhone 15",
    description: "Primer modelo base con Dynamic Island y USB-C.",

    // ESTRATEGIA: ENTRY LEVEL
    price: 3299,
    originalPrice: 4299,

    category: "iphone",
    image: "/images/iphone/iphone-15.png",
    colors: [
      { name: "Verde", hex: "#e2eadf", image: "/images/iphone/iphone-15.png" },
    ],
    storage: [{ capacity: "128GB", price: 3299 }],
  },
  {
    id: "iphone-14-pro-max",
    slug: "iphone-14-pro-max",
    name: "iPhone 14 Pro Max",
    description: "Versión de gran tamaño de la gama Pro.",

    // ESTRATEGIA: LIQUIDACIÓN
    price: 4399,
    originalPrice: 5799,

    category: "iphone",
    image: "/images/iphone/iphone-14-pro-max.png",
    colors: [
      {
        name: "Morado Oscuro",
        hex: "#594f63",
        image: "/images/iphone/iphone-14-pro-max.png",
      },
    ],
    storage: [{ capacity: "128GB", price: 4399 }],
  },
  {
    id: "iphone-14-pro",
    slug: "iphone-14-pro",
    name: "iPhone 14 Pro",
    description: "Introdujo la Dynamic Island y la pantalla siempre encendida.",

    // ESTRATEGIA: LIQUIDACIÓN
    price: 3999,
    originalPrice: 5299,

    category: "iphone",
    image: "/images/iphone/iphone-14-pro.png",
    colors: [
      {
        name: "Gris Espacial",
        hex: "#6f7173",
        image: "/images/iphone/iphone-14-pro.png",
      },
    ],
    storage: [{ capacity: "128GB", price: 3999 }],
  },
  {
    id: "iphone-14-plus",
    slug: "iphone-14-plus",
    name: "iPhone 14 Plus",
    description: "Pantalla de 6.7 pulgadas con gran rendimiento.",

    // ESTRATEGIA: LIQUIDACIÓN
    price: 3499,
    originalPrice: 4599,

    category: "iphone",
    image: "/images/iphone/iphone-14-plus.png",
    colors: [
      {
        name: "Azul",
        hex: "#a2b5c7",
        image: "/images/iphone/iphone-14-plus.png",
      },
    ],
    storage: [{ capacity: "128GB", price: 3499 }],
  },
  {
    id: "iphone-14",
    slug: "iphone-14",
    name: "iPhone 14",
    description: "Mantuvo un diseño similar al iPhone 13.",

    // ESTRATEGIA: LIQUIDACIÓN
    price: 2999,
    originalPrice: 3899,

    category: "iphone",
    image: "/images/iphone/iphone-14.png",
    colors: [
      { name: "Rojo", hex: "#af111c", image: "/images/iphone/iphone-14.png" },
    ],
    storage: [{ capacity: "128GB", price: 2999 }],
  },
  {
    id: "iphone-13-pro-max",
    slug: "iphone-13-pro-max",
    name: "iPhone 13 Pro Max",
    description: "El modelo tope de gama de su generación.",

    // ESTRATEGIA: REMATE
    price: 3599,
    originalPrice: 4899,

    category: "iphone",
    image: "/images/iphone/iphone-13-pro-max.png",
    colors: [
      {
        name: "Azul Sierra",
        hex: "#9db4c6",
        image: "/images/iphone/iphone-13-pro-max.png",
      },
    ],
    storage: [{ capacity: "128GB", price: 3599 }],
  },
  {
    id: "iphone-13-pro",
    slug: "iphone-13-pro",
    name: "iPhone 13 Pro",
    description: "Con pantalla ProMotion de 120Hz.",

    // ESTRATEGIA: REMATE
    price: 3199,
    originalPrice: 4399,

    category: "iphone",
    image: "/images/iphone/iphone-13-pro.png",
    colors: [
      {
        name: "Oro",
        hex: "#f5e1c8",
        image: "/images/iphone/iphone-13-pro.png",
      },
    ],
    storage: [{ capacity: "128GB", price: 3199 }],
  },
  {
    id: "iphone-13",
    slug: "iphone-13",
    name: "iPhone 13",
    description: "El modelo estándar con chip A15 Bionic.",

    // ESTRATEGIA: ÚLTIMAS UNIDADES
    price: 2499,
    originalPrice: 3499,

    category: "iphone",
    image: "/images/iphone/iphone-13.png",
    colors: [
      {
        name: "Media Noche",
        hex: "#2b3036",
        image: "/images/iphone/iphone-13.png",
      },
    ],
    storage: [{ capacity: "128GB", price: 2499 }],
  },
  {
    id: "iphone-13-mini",
    slug: "iphone-13-mini",
    name: "iPhone 13 mini",
    description: "El último modelo compacto de 5.4 pulgadas.",

    // ESTRATEGIA: ÚLTIMAS UNIDADES
    price: 2199,
    originalPrice: 3199,

    category: "iphone",
    image: "/images/iphone/iphone-13-mini.png",
    colors: [
      {
        name: "Luz Estelar",
        hex: "#faf7f2",
        image: "/images/iphone/iphone-13-mini.png",
      },
    ],
    storage: [{ capacity: "128GB", price: 2199 }],
  },

  // ==========================================
  // APPLE WATCH SERIES (2021 - 2025)
  // ==========================================
  {
    id: "apple-watch-ultra-3",
    slug: "apple-watch-ultra-3",
    name: "Apple Watch Ultra 3",
    description:
      "El reloj más capaz y resistente. Conectividad satelital y el mejor GPS deportivo.",

    // ESTRATEGIA: FLAGSHIP -> Precio Limpio
    price: 3499,
    // originalPrice: undefined,

    category: "watch",
    image: "/images/watch/Watch-Ultra-3-lineup.webp",

    colors: [
      {
        name: "Titanio Natural",
        hex: "#beb9b2",
        image: "/images/watch/Watch-Ultra-3-lineup.webp",
      },
      {
        name: "Titanio Negro",
        hex: "#1d1d1f",
        image: "/images/watch/ultra-black.webp",
      },
    ],
    storage: [{ capacity: "49mm", price: 3499 }],
    isNew: true, // Filtro: "Nuevos"
    marketing: {
      slogan: "Aventuras sin límites.",
      subSlogan:
        "Diseñado para los entornos más extremos con titanio de grado aeroespacial.",
      features: [
        {
          title: "Conexión Satelital",
          description: "Mensajes de emergencia.",
          icon: "shield",
        },
        {
          title: "Batería Extrema",
          description: "Hasta 72 horas.",
          icon: "battery",
        },
        {
          title: "GPS de Precisión",
          description: "Frecuencia dual.",
          icon: "screen",
        },
      ],
    },
  },
  {
    id: "apple-watch-series-11",
    slug: "apple-watch-series-11",
    name: "Apple Watch Series 11",
    description:
      "Pantalla ultra resistente, soporte 5G y notificaciones de hipertensión pasiva.",

    // ESTRATEGIA: NUEVO ESTÁNDAR -> Precio Limpio
    price: 1899,
    // originalPrice: undefined,

    category: "watch",
    // CORRECCIÓN: Quitamos el .mp4 y ponemos imagen estática
    image: "/images/watch/watch-s11-midnight.png",

    colors: [
      {
        name: "Aluminio Medianoche",
        hex: "#2b3036",
        image: "/images/watch/watch-s11-midnight.png",
      },
      {
        name: "Plata",
        hex: "#e3e4e5",
        image: "/images/watch/watch-s11-silver.png",
      },
      {
        name: "Oro",
        hex: "#f5e1c8",
        image: "/images/watch/watch-s11-gold.png",
      },
    ],
    storage: [
      { capacity: "42mm", price: 1899 },
      { capacity: "46mm", price: 2099 },
    ],
    isNew: true, // Filtro: "Nuevos"
    marketing: {
      slogan: "Tu salud, en primer plano.",
      subSlogan: "El Series 11 es más inteligente y resistente que nunca.",
      features: [
        {
          title: "Pantalla Reforzada",
          description: "2x más resistente.",
          icon: "shield",
        },
        {
          title: "Salud Cardiaca",
          description: "Notificaciones proactivas.",
          icon: "battery",
        },
      ],
    },
  },
  {
    id: "apple-watch-se-3",
    slug: "apple-watch-se-3",
    name: "Apple Watch SE (3.ª gen)",
    description:
      "Funciones esenciales de salud y seguridad con el chip S10 del Series 11.",

    // ESTRATEGIA: NUEVO ENTRY -> Precio Limpio
    price: 1199,
    // originalPrice: undefined,

    category: "watch",
    image: "/images/watch/watch-se-3-midnight.png",

    colors: [
      {
        name: "Medianoche",
        hex: "#2b3036",
        image: "/images/watch/watch-se-3-midnight.png",
      },
      {
        name: "Luz Estelar",
        hex: "#faf7f2",
        image: "/images/watch/watch-se-3-starlight.png",
      },
    ],
    storage: [
      { capacity: "40mm", price: 1199 },
      { capacity: "44mm", price: 1349 },
    ],
    isNew: true, // Filtro: "Nuevos"
  },
  {
    id: "apple-watch-series-10",
    slug: "apple-watch-series-10",
    name: "Apple Watch Series 10",
    description:
      "Rediseño delgado con pantalla OLED de gran ángulo y carga ultra rápida.",

    // ESTRATEGIA: MID-RANGE -> Descuento Táctico
    price: 1599,
    originalPrice: 1799, // Ahorro visible

    category: "watch",
    image: "/images/watch/watch-s10.png",
    colors: [
      {
        name: "Jet Black",
        hex: "#000000",
        image: "/images/watch/watch-s10.png",
      },
    ],
    storage: [{ capacity: "46mm", price: 1599 }],
  },
  {
    id: "apple-watch-ultra-2-black",
    slug: "apple-watch-ultra-2-black",
    name: "Apple Watch Ultra 2 (Black)",
    description:
      "La potencia del Ultra 2 ahora en un elegante acabado de titanio negro.",

    // ESTRATEGIA: MID-RANGE PRO -> Descuento atractivo
    price: 2999,
    originalPrice: 3599, // Gran descuento comparado al Ultra 3

    category: "watch",
    image: "/images/watch/watch-ultra-2-black.png",
    colors: [
      {
        name: "Titanio Negro",
        hex: "#1d1d1f",
        image: "/images/watch/watch-ultra-2-black.png",
      },
    ],
    storage: [{ capacity: "49mm", price: 2999 }],
  },
  {
    id: "apple-watch-series-9",
    slug: "apple-watch-series-9",
    name: "Apple Watch Series 9",
    description: "Gesto de doble toque y un chip S9 más rápido y eficiente.",

    // ESTRATEGIA: CLEARANCE -> Descuento Agresivo
    price: 1299,
    originalPrice: 1599,

    category: "watch",
    image: "/images/watch/watch-s9.png",
    colors: [
      { name: "Rosa", hex: "#f8d7da", image: "/images/watch/watch-s9.png" },
    ],
    storage: [{ capacity: "41mm", price: 1299 }],
  },
  {
    id: "apple-watch-series-8",
    slug: "apple-watch-series-8",
    name: "Apple Watch Series 8",
    description:
      "Sensor de temperatura y detección de accidentes automovilísticos.",

    // ESTRATEGIA: CLEARANCE
    price: 1099,
    originalPrice: 1399,

    category: "watch",
    image: "/images/watch/watch-s8.png",
    colors: [
      { name: "Rojo", hex: "#af111c", image: "/images/watch/watch-s8.png" },
    ],
    storage: [{ capacity: "41mm", price: 1099 }],
  },
  {
    id: "apple-watch-ultra-1",
    slug: "apple-watch-ultra-1",
    name: "Apple Watch Ultra (1.ª gen)",
    description:
      "El modelo que lo inició todo. Caja de titanio de 49mm y botón de Acción.",

    // ESTRATEGIA: LIQUIDACIÓN
    price: 2499,
    originalPrice: 3199, // Descuento masivo

    category: "watch",
    image: "/images/watch/watch-ultra-1.png",
    colors: [
      {
        name: "Titanio",
        hex: "#beb9b2",
        image: "/images/watch/watch-ultra-1.png",
      },
    ],
    storage: [{ capacity: "49mm", price: 2499 }],
  },
  {
    id: "apple-watch-se-2",
    slug: "apple-watch-se-2",
    name: "Apple Watch SE (2.ª gen)",
    description: "Chip S8 y detección de accidentes. El balance perfecto.",

    // ESTRATEGIA: LIQUIDACIÓN ENTRY
    price: 899,
    originalPrice: 1099, // Rompe la barrera de los 1000

    category: "watch",
    image: "/images/watch/watch-se-2.png",
    colors: [
      { name: "Plata", hex: "#e3e4e5", image: "/images/watch/watch-se-2.png" },
    ],
    storage: [{ capacity: "40mm", price: 899 }],
  },
  {
    id: "apple-watch-series-7",
    slug: "apple-watch-series-7",
    name: "Apple Watch Series 7",
    description:
      "Pantalla más grande con bordes finos y carga un 33% más rápida.",

    // ESTRATEGIA: REMATE
    price: 999,
    originalPrice: 1299,

    category: "watch",
    image: "/images/watch/watch-s7.png",
    colors: [
      { name: "Verde", hex: "#3b4d42", image: "/images/watch/watch-s7.png" },
    ],
    storage: [{ capacity: "41mm", price: 999 }],
  },
  // ==========================================
  // AIRPODS SERIES (2021 - 2025)
  // ==========================================
  {
    id: "airpods-pro-3-gen",
    slug: "airpods-pro-3-gen",
    name: "AirPods Pro (3.ª gen)",
    description:
      "La mayor innovación en salud auditiva con chip H3 y sensores térmicos.",

    // ESTRATEGIA: FLAGSHIP -> Precio Limpio
    price: 1249,
    // originalPrice: undefined,

    category: "airpods",
    image: "/images/airpods/Apple-AirPods-Pro-3-lineup.webp",

    colors: [
      {
        name: "Blanco",
        hex: "#ffffff",
        image: "/images/airpods/Apple-AirPods-Pro-3-lineup.webp",
      },
    ],

    storage: [{ capacity: "Estuche USB-C (Altavoz)", price: 1249 }],
    isNew: true, // Filtro: "Nuevos"
    marketing: {
      slogan: "Un hito para tus oídos.",
      subSlogan:
        "Chip H3, sensores de salud cardíaca y una cancelación de ruido de otro nivel.",
      features: [
        {
          title: "Chip H3",
          description: "Procesamiento de audio.",
          icon: "chip",
        },
        {
          title: "Sensores de Salud",
          description: "Monitoreo cardíaco.",
          icon: "shield",
        },
        {
          title: "Búsqueda Precisa",
          description: "Estuche con altavoz.",
          icon: "battery",
        },
      ],
    },
  },
  {
    id: "airpods-4-anc",
    slug: "airpods-4-anc",
    name: "AirPods (4.ª gen) con ANC",
    description:
      "El primer diseño abierto con Cancelación Activa de Ruido y chip H2.",

    // ESTRATEGIA: NUEVO -> Precio Limpio
    price: 899,
    // originalPrice: undefined,

    category: "airpods",
    image: "/images/airpods/airpods-4-anc.png",

    colors: [
      {
        name: "Blanco",
        hex: "#ffffff",
        image: "/images/airpods/airpods-4-anc.png",
      },
    ],

    storage: [{ capacity: "Estuche USB-C", price: 899 }],
    isNew: true, // Filtro: "Nuevos"
    marketing: {
      slogan: "Silencio absoluto. Comodidad total.",
      subSlogan:
        "La potencia del chip H2 en un diseño rediseñado sin almohadillas.",
      features: [
        {
          title: "Cancelación Activa",
          description: "Silencia el ruido.",
          icon: "shield",
        },
        {
          title: "Puerto USB-C",
          description: "Carga universal.",
          icon: "battery",
        },
      ],
    },
  },
  {
    id: "airpods-4-standard",
    slug: "airpods-4-standard",
    name: "AirPods (4.ª gen)",
    description:
      "Audio espacial personalizado y diseño ergonómico con chip H2.",

    // ESTRATEGIA: NUEVO ENTRY -> Precio Limpio
    price: 649,
    // originalPrice: undefined,

    category: "airpods",
    image: "/images/airpods/airpods-4.png",

    colors: [
      {
        name: "Blanco",
        hex: "#ffffff",
        image: "/images/airpods/airpods-4.png",
      },
    ],

    storage: [{ capacity: "Estuche USB-C", price: 649 }],
    isNew: true,
  },
  {
    id: "airpods-max-usb-c",
    slug: "airpods-max-usb-c",
    name: "AirPods Max (USB-C)",
    description:
      "Audio sin pérdidas (Lossless) y nuevos colores con puerto USB-C.",

    // ESTRATEGIA: LUJO -> Precio Limpio (Evita devaluar la imagen premium)
    price: 2699,
    // originalPrice: undefined,

    category: "airpods",
    image: "/images/airpods/airpods-max-midnight.png", // CORREGIDO: Nombre lógico

    colors: [
      {
        name: "Medianoche",
        hex: "#2e3642",
        image: "/images/airpods/airpods-max-midnight.png", // CORREGIDO
      },
      {
        name: "Estelar",
        hex: "#f0e5d3",
        image: "/images/airpods/airpods-max-starlight.png", // CORREGIDO
      },
      {
        name: "Azul",
        hex: "#8fb2c9",
        image: "/images/airpods/airpods-max-blue.png",
      },
      {
        name: "Morado",
        hex: "#c0b6d4",
        image: "/images/airpods/airpods-max-purple.png",
      },
      {
        name: "Naranja",
        hex: "#f3d0b1",
        image: "/images/airpods/airpods-max-orange.png",
      },
    ],
    storage: [{ capacity: "Lossless Audio / USB-C", price: 2699 }],
    isNew: true,
    marketing: {
      slogan: "Sinfonía perfecta.",
      subSlogan: "Ahora con audio sin pérdidas a través de USB-C.",
      features: [
        {
          title: "Lossless Audio",
          description: "Calidad de estudio.",
          icon: "screen",
        },
        { title: "Chip H1", description: "Audio Espacial.", icon: "chip" },
      ],
    },
  },
  {
    id: "airpods-pro-2-usb-c",
    slug: "airpods-pro-2-usb-c",
    name: "AirPods Pro (2.ª gen) USB-C",
    description: "Estuche de carga USB-C y resistencia mejorada al polvo IP54.",

    // ESTRATEGIA: MODELO ANTERIOR -> Descuento Táctico
    price: 1049,
    originalPrice: 1249, // Se ve atractivo vs los 1249 del nuevo Pro 3

    category: "airpods",
    image: "/images/airpods/airpods-pro-2-usbc.png",

    colors: [
      {
        name: "Blanco",
        hex: "#ffffff",
        image: "/images/airpods/airpods-pro-2-usbc.png",
      },
    ],

    storage: [{ capacity: "Estuche MagSafe (USB-C)", price: 1049 }],
  },
  {
    id: "airpods-3-gen",
    slug: "airpods-3-gen",
    name: "AirPods (3.ª gen)",
    description:
      "Audio espacial y diseño resistente al agua. Un clásico moderno.",

    // ESTRATEGIA: LIQUIDACIÓN -> Descuento Agresivo
    price: 799,
    originalPrice: 949,

    category: "airpods",
    image: "/images/airpods/airpods-3.png",

    colors: [
      {
        name: "Blanco",
        hex: "#ffffff",
        image: "/images/airpods/airpods-3.png",
      },
    ],

    storage: [{ capacity: "Estuche MagSafe", price: 799 }],
  },
  // ==========================================
  // ACCESORIOS (NUEVA CATEGORÍA)
  // ==========================================
  {
    id: "cargador-20w",
    slug: "cargador-20w-usb-c",
    name: "Adaptador de corriente USB-C de 20W",
    description: "Carga rápida para tu iPhone o iPad. Compacto y eficiente.",

    // ESTRATEGIA: COMMODITY -> Siempre con descuento para incentivar compra
    price: 119,
    originalPrice: 149, // "Ahorro" visual

    category: "accesorios",
    image: "/images/accessories/20w-adapter.png",

    colors: [
      {
        name: "Blanco",
        hex: "#ffffff",
        image: "/images/accessories/20w-adapter.png",
      },
    ],

    storage: [{ capacity: "Estándar", price: 119 }],
  },
  {
    id: "magsafe-charger",
    slug: "cargador-magsafe",
    name: "Cargador MagSafe",
    description: "Carga inalámbrica rápida. Se acopla magnéticamente.",

    // ESTRATEGIA: COMMODITY -> Descuento atractivo
    price: 249,
    originalPrice: 299,

    category: "accesorios",
    image: "/images/accessories/magsafe.png",

    colors: [
      {
        name: "Plata",
        hex: "#e3e4e5",
        image: "/images/accessories/magsafe.png",
      },
    ],

    storage: [{ capacity: "1m", price: 249 }],
  },
  {
    id: "funda-silicona-iphone-16",
    slug: "funda-silicona-iphone-16",
    name: "Funda de Silicona con MagSafe (iPhone 16)",
    description: "Suave al tacto, protección interna de microfibra.",

    // ESTRATEGIA: MID-RANGE (Gen Anterior) -> Descuento para liquidar stock
    price: 299,
    originalPrice: 349,

    category: "accesorios",
    image: "/images/accessories/case-silicone-blue.png", // Asumimos Azul

    colors: [
      {
        name: "Azul Tormenta",
        hex: "#3a6ea5",
        image: "/images/accessories/case-silicone-blue.png",
      },
      {
        name: "Medianoche",
        hex: "#2b3036",
        image: "/images/accessories/case-silicone-midnight.png",
      },
    ],

    storage: [{ capacity: "Única", price: 299 }],
  },

  // ==========================================
  // CERTIFICADOS / SEMINUEVOS (Lógica: Ahorro Masivo)
  // ==========================================
  {
    id: "iphone-14-pro-semi",
    slug: "iphone-14-pro-seminuevo",
    name: "iPhone 14 Pro (Seminuevo Certificado)",
    description: "100% funcional. Batería >85%. Garantía de 6 meses.",

    // ESTRATEGIA: "SMART BUY" -> Muestra el ahorro masivo vs Nuevo
    price: 3299,
    originalPrice: 4399, // Ahorro de S/ 1100 (Muy potente visualmente)

    category: "certificados",
    // Reutilizamos la imagen de la carpeta iphone para optimizar carga
    image: "/images/iphone/iphone-14-pro.png",

    colors: [
      {
        name: "Morado Oscuro",
        hex: "#594f63",
        image: "/images/iphone/iphone-14-pro.png",
      },
    ],

    storage: [{ capacity: "128GB", price: 3299 }],
    isNew: false, // Importante: No es nuevo, pero es una oportunidad
  },
  {
    id: "iphone-13-semi",
    slug: "iphone-13-seminuevo",
    name: "iPhone 13 (Seminuevo Grado A)",
    description: "Excelente estado estético. Incluye cable de carga nuevo.",

    // ESTRATEGIA: PRECIO DE ENTRADA -> Rompe barreras psicológicas
    price: 1999,
    originalPrice: 2799, // Casi 30% de descuento percibido

    category: "certificados",
    image: "/images/iphone/iphone-13.png",

    colors: [
      {
        name: "Azul",
        hex: "#3a6ea5",
        image: "/images/iphone/iphone-13.png",
      },
    ],

    storage: [{ capacity: "128GB", price: 1999 }],
    isNew: false,
  },
];

// 4. FUNCIONES HELPERS
export const getProducts = () => products;

export const getProductsByCategory = (category: string) => {
  return products.filter((product) => product.category === category);
};

export const getProductBySlug = (slug: string) => {
  return products.find((product) => product.slug === slug);
};

export const getAllCategories = () => {
  const categories = new Set(products.map((product) => product.category));
  return Array.from(categories);
};
