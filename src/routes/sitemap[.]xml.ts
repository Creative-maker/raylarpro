import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { POSTS } from "@/components/site-data";
import { CASE_STUDIES } from "@/components/case-study-data";
import { SERVICE_PAGES } from "@/components/service-page-data";

const BASE_URL = "https://raylarpro.lovable.app";

interface SitemapEntry {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/about", changefreq: "monthly", priority: "0.8" },
          { path: "/services", changefreq: "weekly", priority: "0.9" },
          { path: "/case-studies", changefreq: "weekly", priority: "0.9" },
          { path: "/blog", changefreq: "weekly", priority: "0.8" },
          { path: "/contact", changefreq: "monthly", priority: "0.7" },
        ];

        for (const post of POSTS) {
          entries.push({ path: `/blog/${encodeURIComponent(post.slug)}`, changefreq: "monthly", priority: "0.6" });
        }
        for (const study of CASE_STUDIES) {
          entries.push({ path: `/case-studies/${encodeURIComponent(study.slug)}`, changefreq: "monthly", priority: "0.6" });
        }
        for (const service of SERVICE_PAGES) {
          entries.push({ path: `/services/${encodeURIComponent(service.slug)}`, changefreq: "monthly", priority: "0.7" });
        }

        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
