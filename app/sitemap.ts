// app/sitemap.ts
import { MetadataRoute } from "next";
import { getAllCategories, getProductsByCategory } from "@/lib/products";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // IMPORTANTE: Cambia esto por tu dominio real de Netlify cuando lo tengas (ej: https://iclub-peru.netlify.app)
  const baseUrl = "https://iclub-peru.netlify.app";

  // 1. Páginas estáticas principales
  const routes = [
    "", // Home
    "/soporte", // Página de soporte
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 1,
  }));

  // 2. Categorías Dinámicas (/mac, /iphone)
  const categories = await getAllCategories();
  const categoryUrls = categories.map((cat) => ({
    url: `${baseUrl}/${cat}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.8,
  }));

  // 3. Productos individuales (/mac/macbook-pro)
  let productUrls: MetadataRoute.Sitemap = [];
  for (const cat of categories) {
    const products = await getProductsByCategory(cat);
    const pUrls = products.map((product) => ({
      url: `${baseUrl}/${cat}/${product.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));
    productUrls = [...productUrls, ...pUrls];
  }

  return [...routes, ...categoryUrls, ...productUrls];
}
