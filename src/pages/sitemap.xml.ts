import type { APIRoute } from 'astro';
import rawTendencias from '../../tendencias.json';

export const GET: APIRoute = async ({ site }) => {
  const baseUrl = site ? site.href.replace(/\/$/, '') : 'https://viralloom.pages.dev';
  const tendencias = Array.isArray(rawTendencias) ? rawTendencias : [];

  const categories = Array.from(new Set(tendencias.map((v) => v.category_slug))).filter(Boolean);

  const staticPages = [
    '',
    '/404',
    ...categories.map((c) => `/categoria/${c}`),
    ...tendencias.map((v) => `/video/${v.id}`),
  ];

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticPages
    .map(
      (page) => `
    <url>
      <loc>${baseUrl}${page}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>daily</changefreq>
      <priority>${page === '' ? '1.0' : page.startsWith('/categoria') ? '0.8' : '0.7'}</priority>
    </url>`
    )
    .join('')}
</urlset>`;

  return new Response(sitemapXml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
