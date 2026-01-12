// app/sitemap.ts
import { MetadataRoute } from "next";
import { getAllCategories, getProductsByCategory } from "@/lib/products";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // IMPORTANTE: Asegúrate de que este sea tu dominio final.
  // Corregí el typo "iclud" -> "iclub"
  const baseUrl = "https://iclub-peru.netlify.app";

  // 1. Páginas estáticas principales
  const routes = [
    "",         // Home
    "/soporte", // Página de soporte
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 1,
  }));

  // 2. Obtener categorías (Esta función sí es async en tu products.ts)
  const categories = await getAllCategories();

  // Generar URLs de Categorías (/mac, /iphone, etc.)
  const categoryUrls = categories.map((cat) => ({
    url: `${baseUrl}/${cat}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.8,
  }));

  // 3. Productos individuales (/mac/macbook-pro-m4)
  let productUrls: MetadataRoute.Sitemap = [];

  for (const cat of categories) {
    // Esta función es síncrona en products.ts, así que no necesita await
    const products = getProductsByCategory(cat);
    
    const pUrls = products.map((product) => ({
      url: `${baseUrl}/${cat}/${product.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));
    
    productUrls = [...productUrls, ...pUrls];
  }

  // Fusionamos todo en un solo array para Google
  return [...routes, ...categoryUrls, ...productUrls];
}