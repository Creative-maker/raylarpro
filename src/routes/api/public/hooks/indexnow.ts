import { createFileRoute } from "@tanstack/react-router";
import { POSTS } from "@/components/site-data";
import { CASE_STUDIES } from "@/components/case-study-data";
import { SERVICE_PAGES } from "@/components/service-page-data";

const HOST = "raylarpro.lovable.app";
const ORIGIN = `https://${HOST}`;
const INDEXNOW_KEY = "6e09981f41f8b035fc89c64ff65d33f9";

function allUrls() {
  const paths = ["/", "/about", "/services", "/process", "/case-studies", "/blog", "/contact"];
  for (const p of POSTS) paths.push(`/blog/${p.slug}`);
  for (const c of CASE_STUDIES) paths.push(`/case-studies/${c.slug}`);
  for (const s of SERVICE_PAGES) paths.push(`/services/${s.slug}`);
  return paths.map((p) => `${ORIGIN}${p}`);
}

/** Notifies Bing (and other IndexNow engines) about every public URL. */
export const Route = createFileRoute("/api/public/hooks/indexnow")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const secret = process.env["SEO_MONITOR_SECRET"];
        if (!secret || request.headers.get("x-monitor-secret") !== secret) {
          return new Response(JSON.stringify({ error: "Unauthorized" }), {
            status: 401,
            headers: { "Content-Type": "application/json" },
          });
        }
        const urlList = allUrls();
        const res = await fetch("https://api.indexnow.org/indexnow", {
          method: "POST",
          headers: { "Content-Type": "application/json; charset=utf-8" },
          body: JSON.stringify({
            host: HOST,
            key: INDEXNOW_KEY,
            keyLocation: `${ORIGIN}/${INDEXNOW_KEY}.txt`,
            urlList,
          }),
        });
        return new Response(
          JSON.stringify({ ok: res.ok, status: res.status, submitted: urlList.length }),
          { status: res.ok ? 200 : 502, headers: { "Content-Type": "application/json" } },
        );
      },
    },
  },
});
