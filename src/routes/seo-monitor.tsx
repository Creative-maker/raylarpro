import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AlertTriangle, CheckCircle2, Loader2, RefreshCw, XCircle } from "lucide-react";
import { PageHero } from "@/components/site-chrome";
import { getSeoMonitorRuns, triggerSeoMonitor } from "@/lib/seo-monitor.functions";

export const Route = createFileRoute("/seo-monitor")({
  head: () => ({
    meta: [
      { title: "SEO Monitor — RaylarPro" },
      { name: "description", content: "Internal dashboard tracking Search Console crawl and indexing health for raylarpro.lovable.app." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "SEO Monitor — RaylarPro" },
      { property: "og:description", content: "Search Console crawl and indexing health dashboard." },
      { property: "og:url", content: "https://raylarpro.lovable.app/seo-monitor" },
    ],
  }),
  component: SeoMonitorPage,
});

type Issue = { type: string; severity: string; url: string; message: string };

function statusPill(status: string) {
  if (status === "ok")
    return { cls: "bg-primary-soft text-accent-foreground", Icon: CheckCircle2, label: "All clear" };
  if (status === "warning")
    return { cls: "bg-amber-100 text-amber-700", Icon: AlertTriangle, label: "Warnings" };
  return { cls: "bg-red-100 text-red-700", Icon: XCircle, label: "Errors" };
}

function SeoMonitorPage() {
  const fetchRuns = useServerFn(getSeoMonitorRuns);
  const runCheck = useServerFn(triggerSeoMonitor);
  const qc = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["seo-monitor-runs"],
    queryFn: () => fetchRuns(),
  });

  const mutation = useMutation({
    mutationFn: () => runCheck(),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["seo-monitor-runs"] }),
  });

  const runs = data?.runs ?? [];
  const latest = runs[0];

  return (
    <>
      <PageHero
        eyebrow="Internal"
        title="SEO Monitor"
        sub="Automated Search Console checks for crawl errors, indexing coverage and sitemap health."
      />

      <section className="py-14">
        <div className="mx-auto max-w-5xl px-4 md:px-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-extrabold tracking-tight">Latest check</h2>
              <p className="text-sm text-muted-foreground">
                {latest ? new Date(latest.created_at).toLocaleString() : "No checks recorded yet."}
              </p>
            </div>
            <button
              onClick={() => mutation.mutate()}
              disabled={mutation.isPending}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:opacity-60"
            >
              {mutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
              {mutation.isPending ? "Checking Search Console…" : "Run check now"}
            </button>
          </div>

          {mutation.isError && (
            <p className="mt-4 rounded-2xl bg-red-50 p-4 text-sm text-red-700">
              {(mutation.error as Error).message}
            </p>
          )}

          {isLoading && <p className="mt-8 text-sm text-muted-foreground">Loading history…</p>}

          {latest && (
            <div className="mt-6 rounded-3xl border border-border bg-card p-6 md:p-8">
              {(() => {
                const { cls, Icon, label } = statusPill(latest.status);
                return (
                  <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold ${cls}`}>
                    <Icon className="h-3.5 w-3.5" /> {label}
                  </span>
                );
              })()}
              <p className="mt-4 text-sm text-muted-foreground">{latest.summary}</p>
              <div className="mt-6 grid gap-4 sm:grid-cols-4">
                {[
                  { k: "Pages checked", v: latest.urls_checked },
                  { k: "Indexed", v: latest.urls_indexed },
                  { k: "Sitemap errors", v: latest.sitemap_errors },
                  { k: "Sitemap warnings", v: latest.sitemap_warnings },
                ].map((m) => (
                  <div key={m.k} className="rounded-2xl bg-surface p-4 ring-1 ring-border">
                    <div className="text-2xl font-extrabold">{m.v}</div>
                    <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{m.k}</div>
                  </div>
                ))}
              </div>

              <h3 className="mt-8 text-sm font-bold uppercase tracking-wide text-muted-foreground">Issues</h3>
              {((latest.issues as unknown as Issue[]) ?? []).length === 0 ? (
                <p className="mt-3 text-sm text-muted-foreground">No crawl or indexing issues detected.</p>
              ) : (
                <ul className="mt-3 divide-y divide-border overflow-hidden rounded-2xl ring-1 ring-border">
                  {(latest.issues as unknown as Issue[]).map((i, idx) => (
                    <li key={idx} className="flex flex-col gap-1 bg-background p-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <span
                          className={`mr-2 rounded-full px-2 py-0.5 text-[11px] font-bold uppercase ${
                            i.severity === "error" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"
                          }`}
                        >
                          {i.type}
                        </span>
                        <span className="text-sm font-medium">{i.message}</span>
                      </div>
                      <span className="truncate text-xs text-muted-foreground">{i.url}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {runs.length > 1 && (
            <div className="mt-10">
              <h3 className="text-sm font-bold uppercase tracking-wide text-muted-foreground">History</h3>
              <ul className="mt-3 divide-y divide-border overflow-hidden rounded-2xl ring-1 ring-border">
                {runs.slice(1).map((r) => (
                  <li key={r.id} className="flex items-center justify-between bg-background p-4 text-sm">
                    <span>{new Date(r.created_at).toLocaleString()}</span>
                    <span className="text-muted-foreground">{r.summary}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
