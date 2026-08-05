import { useEffect, useRef, useState } from "react";
import { Globe } from "lucide-react";

/**
 * StoreThumb — resilient screenshot thumbnail for a store hero page.
 *
 * - Lazy: only starts loading when scrolled near the viewport.
 * - Cached: successful screenshot URLs are remembered in localStorage for 7 days,
 *   so repeat visits render instantly instead of re-triggering the shot service.
 * - Graceful: animated skeleton while loading, automatic retry across providers,
 *   and a branded gradient + domain fallback if every provider fails.
 */

const CACHE_KEY = "rp:store-shots:v1";
const CACHE_TTL = 7 * 24 * 60 * 60 * 1000; // 7 days

type CacheShape = Record<string, { url: string; t: number }>;

function readCache(): CacheShape {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(CACHE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as CacheShape;
    const now = Date.now();
    let changed = false;
    for (const k of Object.keys(parsed)) {
      if (!parsed[k] || now - parsed[k].t > CACHE_TTL) {
        delete parsed[k];
        changed = true;
      }
    }
    if (changed) window.localStorage.setItem(CACHE_KEY, JSON.stringify(parsed));
    return parsed;
  } catch {
    return {};
  }
}

function writeCache(key: string, url: string) {
  if (typeof window === "undefined") return;
  try {
    const cache = readCache();
    cache[key] = { url, t: Date.now() };
    window.localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  } catch {
    /* storage full or unavailable — caching is best-effort */
  }
}

function hostOf(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url.replace(/^https?:\/\//, "").replace(/^www\./, "").split("/")[0];
  }
}

/** Screenshot providers, tried in order. */
function providers(siteUrl: string, primary?: string): string[] {
  const enc = encodeURIComponent(siteUrl);
  const list = [
    primary,
    `https://s.wordpress.com/mshots/v1/${enc}?w=800&h=600`,
    `https://image.thum.io/get/width/800/crop/600/${siteUrl}`,
    `https://api.microlink.io/?url=${enc}&screenshot=true&meta=false&embed=screenshot.url`,
  ].filter(Boolean) as string[];
  return Array.from(new Set(list));
}

export function StoreThumb({
  url,
  title,
  img,
  className = "",
}: {
  url: string;
  title: string;
  img?: string;
  className?: string;
}) {
  const host = hostOf(url);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [status, setStatus] = useState<"idle" | "loading" | "ready" | "failed">("idle");
  const [src, setSrc] = useState<string | null>(null);

  // Reveal when near the viewport
  useEffect(() => {
    const el = wrapRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: "400px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Resolve source: cache first, then providers by attempt index
  useEffect(() => {
    if (!inView) return;
    const cached = readCache()[host];
    if (cached && attempt === 0) {
      setSrc(cached.url);
      setStatus("loading");
      return;
    }
    const list = providers(url, img);
    const next = list[attempt];
    if (!next) {
      setStatus("failed");
      return;
    }
    setSrc(next);
    setStatus("loading");
  }, [inView, attempt, host, url, img]);

  // Slow provider (mshots renders async) — retry once the wait gets long
  useEffect(() => {
    if (status !== "loading") return;
    const t = window.setTimeout(() => {
      setAttempt((a) => a + 1);
    }, 9000);
    return () => window.clearTimeout(t);
  }, [status, src]);

  const showSkeleton = status !== "ready";

  return (
    <div ref={wrapRef} className={`relative aspect-[4/3] overflow-hidden bg-muted ${className}`}>
      {src && status !== "failed" && (
        <img
          key={src}
          src={src}
          alt={`${title} website screenshot`}
          loading="lazy"
          decoding="async"
          onLoad={(e) => {
            const el = e.currentTarget;
            // Guard against 1x1 / empty placeholder responses
            if (el.naturalWidth < 50 || el.naturalHeight < 50) {
              setAttempt((a) => a + 1);
              return;
            }
            setStatus("ready");
            writeCache(host, el.src);
          }}
          onError={() => setAttempt((a) => a + 1)}
          className={`h-full w-full object-cover object-top transition duration-700 group-hover:scale-105 ${
            status === "ready" ? "opacity-100" : "opacity-0"
          }`}
        />
      )}

      {showSkeleton && (
        <div className="absolute inset-0 grid place-items-center">
          {status === "failed" ? (
            <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-primary/15 via-muted to-background">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary-soft text-primary">
                <Globe className="h-5 w-5" />
              </div>
              <div className="px-4 text-center text-sm font-semibold text-foreground">{title}</div>
              <div className="text-xs text-muted-foreground">{host}</div>
            </div>
          ) : (
            <div className="h-full w-full animate-pulse bg-gradient-to-br from-muted via-background to-muted">
              <span className="sr-only">Loading {title} screenshot</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
