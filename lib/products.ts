export interface Product {
  id: string;
  slug: string;
  name: string;
  category: 'iphone' | 'mac' | 'ipad' | 'watch' | 'airpods' | 'accesorios' | 'certificados';
  year: number;
  price: number;
  image: string;
  description: string;
  
  // --- CAMPOS NUEVOS PARA QUE FUNCIONE EL PRODUCT VIEW ---
  colors: { name: string; hex: string }[];
  storageOptions: { capacity: string; price: number }[];
}

export const NAV_LINKS = [
  { name: 'Mac', href: '/mac' },
  { name: 'iPad', href: '/ipad' },
  { name: 'iPhone', href: '/iphone' },
  { name: 'Watch', href: '/watch' },
  { name: 'AirPods', href: '/airpods' },
  { name: 'Accesorios', href: '/accesorios' },
  { name: 'Certificados', href: '/certificados' },
  { name: 'Soporte', href: '/soporte' },
];

export const products: Product[] = [
  // --- IPHONES (2020 - 2024) ---
  {
    id: 'iphone-15-pro-max',
    slug: 'iphone-15-pro-max',
    name: 'iPhone 15 Pro Max',
    category: 'iphone',
    year: 2023,
    price: 1199,
    image: '/products/iphone-17-lineup.webp',
    description: 'Titanio. Chip A17 Pro. El iPhone más potente.',
    colors: [
      { name: 'Titanio Natural', hex: '#d1cdcd' },
      { name: 'Titanio Azul', hex: '#2f3b49' },
      { name: 'Titanio Blanco', hex: '#f2f1ed' },
      { name: 'Titanio Negro', hex: '#181819' }
    ],
    storageOptions: [
      { capacity: '256GB', price: 1199 },
      { capacity: '512GB', price: 1399 },
      { capacity: '1TB', price: 1599 }
    ]
  },
  {
    id: 'iphone-15',
    slug: 'iphone-15',
    name: 'iPhone 15',
    category: 'iphone',
    year: 2023,
    price: 799,
    image: '/products/iphone-17-lineup.webp',
    description: 'Dynamic Island. Cámara de 48 MP.',
    colors: [
      { name: 'Negro', hex: '#31353a' },
      { name: 'Azul', hex: '#dbeff5' },
      { name: 'Verde', hex: '#e3f3e3' },
      { name: 'Amarillo', hex: '#f9f6df' },
      { name: 'Rosa', hex: '#fce6f3' }
    ],
    storageOptions: [
      { capacity: '128GB', price: 799 },
      { capacity: '256GB', price: 899 },
      { capacity: '512GB', price: 1099 }
    ]
  },
  {
    id: 'iphone-14-pro',
    slug: 'iphone-14-pro',
    name: 'iPhone 14 Pro',
    category: 'iphone',
    year: 2022,
    price: 999,
    image: '/products/iphone-17-lineup.webp',
    description: 'Una forma mágica de interactuar con tu iPhone.',
    colors: [
      { name: 'Morado Oscuro', hex: '#493d4f' },
      { name: 'Oro', hex: '#f4e8ce' },
      { name: 'Plata', hex: '#f0f2f2' },
      { name: 'Negro Espacial', hex: '#343434' }
    ],
    storageOptions: [
      { capacity: '128GB', price: 999 },
      { capacity: '256GB', price: 1099 },
      { capacity: '512GB', price: 1299 },
      { capacity: '1TB', price: 1499 }
    ]
  },
  {
    id: 'iphone-13',
    slug: 'iphone-13',
    name: 'iPhone 13',
    category: 'iphone',
    year: 2021,
    price: 599,
    image: '/products/iphone-17-lineup.webp',
    description: 'El superpoder que le faltaba a tu vida.',
    colors: [
      { name: 'Medianoche', hex: '#282b30' },
      { name: 'Blanco Estelar', hex: '#f9f6ef' },
      { name: 'Azul', hex: '#215e7c' },
      { name: 'Rosa', hex: '#fae0d8' },
      { name: 'Verde', hex: '#374d39' }
    ],
    storageOptions: [
      { capacity: '128GB', price: 599 },
      { capacity: '256GB', price: 699 },
      { capacity: '512GB', price: 899 }
    ]
  },
  {
    id: 'iphone-12',
    slug: 'iphone-12',
    name: 'iPhone 12',
    category: 'iphone',
    year: 2020,
    price: 499,
    image: '/products/iphone-17-lineup.webp',
    description: 'Velocidad 5G. Chip A14 Bionic.',
    colors: [
      { name: 'Negro', hex: '#000000' },
      { name: 'Blanco', hex: '#ffffff' },
      { name: 'Azul', hex: '#0e2e42' },
      { name: 'Verde', hex: '#defcdb' },
      { name: 'Púrpura', hex: '#b7addc' }
    ],
    storageOptions: [
      { capacity: '64GB', price: 499 },
      { capacity: '128GB', price: 549 },
      { capacity: '256GB', price: 649 }
    ]
  },

  // --- MAC (Silicon Era) ---
  {
    id: 'macbook-pro-m3',
    slug: 'macbook-pro-m3',
    name: 'MacBook Pro 14" M3',
    category: 'mac',
    year: 2023,
    price: 1599,
    image: '/products/iphone-17-lineup.webp',
    description: 'Miedosamente rápido.',
    colors: [
      { name: 'Negro Espacial', hex: '#2e2e30' },
      { name: 'Plata', hex: '#e3e4e5' }
    ],
    storageOptions: [
      { capacity: '512GB', price: 1599 },
      { capacity: '1TB', price: 1799 }
    ]
  },
  {
    id: 'macbook-air-m2',
    slug: 'macbook-air-m2',
    name: 'MacBook Air M2',
    category: 'mac',
    year: 2022,
    price: 1099,
    image: '/products/iphone-17-lineup.webp',
    description: 'Diseño ultrafino. Potencia M2.',
    colors: [
      { name: 'Medianoche', hex: '#2e3642' },
      { name: 'Blanco Estelar', hex: '#f0e5d3' },
      { name: 'Gris Espacial', hex: '#7d7e80' },
      { name: 'Plata', hex: '#e3e4e5' }
    ],
    storageOptions: [
      { capacity: '256GB', price: 1099 },
      { capacity: '512GB', price: 1299 }
    ]
  },
  {
    id: 'macbook-air-m1',
    slug: 'macbook-air-m1',
    name: 'MacBook Air M1',
    category: 'mac',
    year: 2020,
    price: 999,
    image: '/products/iphone-17-lineup.webp',
    description: 'La potencia del silencio. Chip M1.',
    colors: [
      { name: 'Oro', hex: '#d9c7b3' },
      { name: 'Plata', hex: '#e3e4e5' },
      { name: 'Gris Espacial', hex: '#7d7e80' }
    ],
    storageOptions: [
      { capacity: '256GB', price: 999 },
      { capacity: '512GB', price: 1199 }
    ]
  },

  // --- IPAD ---
  {
    id: 'ipad-pro-m4',
    slug: 'ipad-pro-m4',
    name: 'iPad Pro (M4)',
    category: 'ipad',
    year: 2024,
    price: 999,
    image: '/products/iphone-17-lineup.webp',
    description: 'Imposiblemente fino.',
    colors: [
      { name: 'Negro Espacial', hex: '#343434' },
      { name: 'Plata', hex: '#e3e4e5' }
    ],
    storageOptions: [
      { capacity: '256GB', price: 999 },
      { capacity: '512GB', price: 1199 },
      { capacity: '1TB', price: 1599 }
    ]
  },
  {
    id: 'ipad-air-m2',
    slug: 'ipad-air-m2',
    name: 'iPad Air (M2)',
    category: 'ipad',
    year: 2024,
    price: 599,
    image: '/products/iphone-17-lineup.webp',
    description: 'Dos tamaños. Todo pantalla.',
    colors: [
      { name: 'Gris Espacial', hex: '#7d7e80' },
      { name: 'Azul', hex: '#a8bacc' },
      { name: 'Púrpura', hex: '#bba2c9' },
      { name: 'Blanco Estelar', hex: '#f0e5d3' }
    ],
    storageOptions: [
      { capacity: '128GB', price: 599 },
      { capacity: '256GB', price: 699 },
      { capacity: '512GB', price: 899 }
    ]
  },

  // --- WATCH ---
  {
    id: 'watch-ultra-2',
    slug: 'watch-ultra-2',
    name: 'Apple Watch Ultra 2',
    category: 'watch',
    year: 2023,
    price: 799,
    image: '/products/iphone-17-lineup.webp',
    description: 'La aventura te llama.',
    colors: [
      { name: 'Titanio Natural', hex: '#d6d5d1' }
    ],
    storageOptions: [
      { capacity: '49mm', price: 799 }
    ]
  },
  {
    id: 'watch-series-9',
    slug: 'watch-series-9',
    name: 'Apple Watch Series 9',
    category: 'watch',
    year: 2023,
    price: 399,
    image: '/products/iphone-17-lineup.webp',
    description: 'Más inteligente. Más brillante.',
    colors: [
      { name: 'Medianoche', hex: '#282b30' },
      { name: 'Blanco Estelar', hex: '#f9f6ef' },
      { name: 'Plata', hex: '#e3e4e5' },
      { name: 'Rosa', hex: '#fae0d8' },
      { name: 'Rojo (PRODUCT)RED', hex: '#e83939' }
    ],
    storageOptions: [
      { capacity: '41mm', price: 399 },
      { capacity: '45mm', price: 429 }
    ]
  },

  // --- AIRPODS ---
  {
    id: 'airpods-pro-2',
    slug: 'airpods-pro-2',
    name: 'AirPods Pro (2.ª gen)',
    category: 'airpods',
    year: 2022,
    price: 249,
    image: '/products/iphone-17-lineup.webp',
    description: 'Audio adaptativo y cancelación de ruido.',
    colors: [
      { name: 'Blanco', hex: '#ffffff' }
    ],
    storageOptions: [
      { capacity: 'Estándar', price: 249 }
    ]
  },
  {
    id: 'airpods-max',
    slug: 'airpods-max',
    name: 'AirPods Max',
    category: 'airpods',
    year: 2020,
    price: 549,
    image: '/products/iphone-17-lineup.webp',
    description: 'Sonido de alta fidelidad.',
    colors: [
      { name: 'Gris Espacial', hex: '#59585a' },
      { name: 'Plata', hex: '#e3e4e5' },
      { name: 'Verde', hex: '#d6e1d6' },
      { name: 'Rosa', hex: '#efd5d5' },
      { name: 'Azul Cielo', hex: '#d4e3eb' }
    ],
    storageOptions: [
      { capacity: 'Estándar', price: 549 }
    ]
  },

  // --- CERTIFICADOS (Seminuevos) ---
  {
    id: 'iphone-13-pro-certificado',
    slug: 'iphone-13-pro-certificado',
    name: 'iPhone 13 Pro (Certificado)',
    category: 'certificados',
    year: 2021,
    price: 649,
    image: '/products/iphone-17-lineup.webp',
    description: 'Seminuevo certificado por Apple. Garantía de 1 año.',
    colors: [
      { name: 'Azul Sierra', hex: '#9bb5ce' },
      { name: 'Grafito', hex: '#434242' },
      { name: 'Oro', hex: '#f9e6c7' },
      { name: 'Plata', hex: '#f0f2f2' }
    ],
    storageOptions: [
      { capacity: '128GB', price: 649 },
      { capacity: '256GB', price: 749 }
    ]
  }
];

// --- FUNCIONES HELPERS ---

export const getProductsByCategory = (category: string) => {
  return products.filter((product) => {
    if (category === 'certificados') {
      return product.category === 'certificados';
    }
    return product.category === category && product.year >= 2020;
  });
};

export const getProductBySlug = (slug: string) => {
  return products.find((product) => product.slug === slug);
};

export const getAllCategories = () => {
  return ['iphone', 'mac', 'ipad', 'watch', 'airpods', 'accesorios', 'certificados'];
};

export const getAllProducts = () => {
  return products;
};