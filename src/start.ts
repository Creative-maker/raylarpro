import { createStart, createMiddleware } from "@tanstack/react-start";

import { renderErrorPage } from "./lib/error-page";
import { attachSupabaseAuth } from "@/integrations/supabase/auth-attacher";

const errorMiddleware = createMiddleware().server(async ({ next }) => {
  try {
    return await next();
  } catch (error) {
    if (error != null && typeof error === "object" && "statusCode" in error) {
      throw error;
    }
    console.error(error);
    return new Response(renderErrorPage(), {
      status: 500,
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  }
});

// Permanently send the old Lovable address to the primary domain so search engines consolidate.
const LEGACY_HOST = "raylarpro.lovable.app";
const PRIMARY_ORIGIN = "https://www.raylarpro.com";

const canonicalHostMiddleware = createMiddleware().server(async ({ next, request }) => {
  const url = new URL(request.url);
  const host = (request.headers.get("host") ?? url.host).toLowerCase();
  const forwarded = (request.headers.get("x-forwarded-host") ?? "").toLowerCase();
  const proxiedFromPrimary = forwarded.includes("raylarpro.com");
  if (
    host === LEGACY_HOST &&
    !proxiedFromPrimary &&
    (request.method === "GET" || request.method === "HEAD") &&
    !url.pathname.startsWith("/api/")
  ) {
    return new Response(null, {
      status: 301,
      headers: { location: `${PRIMARY_ORIGIN}${url.pathname}${url.search}` },
    });
  }
  return next();
});

export const startInstance = createStart(() => ({
  functionMiddleware: [attachSupabaseAuth],
  requestMiddleware: [canonicalHostMiddleware, errorMiddleware],
}));
