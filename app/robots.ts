import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  // CAMBIAR: Usa tu dominio real de Netlify o el final cuando lo tengas
  const baseUrl = 'https://iclub-peru.netlify.app'; 

  return {
    rules: {
      userAgent: '*', // Aplica para todos los robots (Google, Bing, etc)
      allow: '/',     // Permite entrar a toda la web
      disallow: '/private/', // (Opcional) Si tuvieras un admin panel, lo bloquearías aquí
    },
    sitemap: `${baseUrl}/sitemap.xml`, // Aquí conectamos el archivo que hiciste antes
  };
}