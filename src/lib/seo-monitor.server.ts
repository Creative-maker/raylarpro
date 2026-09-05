/**
 * Automated SEO monitor: checks Google Search Console for sitemap errors and
 * per-URL crawl/indexing problems, stores a snapshot and sends alert emails.
 */

const GATEWAY = "https://connector-gateway.lovable.dev/google_search_console";
export const SITE_ORIGIN = "https://raylarpro.lovable.app";
export const SITEMAP_URL = `${SITE_ORIGIN}/sitemap.xml`;
export const ALERT_EMAIL = "raylarpro@gmail.com";

export interface SeoIssue {
  type: "sitemap" | "indexing" | "crawl" | "system";
  severity: "error" | "warning";
  url: string;
  message: string;
}

export interface SeoRun {
  id?: string;
  created_at?: string;
  site_url: string;
  status: "ok" | "warning" | "error";
  sitemap_errors: number;
  sitemap_warnings: number;
  urls_checked: number;
  urls_indexed: number;
  issues: SeoIssue[];
  summary: string | null;
  alert_sent?: boolean;
}

function headers() {
  const lovableKey = process.env["LOVABLE_API_KEY"];
  const connKey = process.env["GOOGLE_SEARCH_CONSOLE_API_KEY"];
  if (!lovableKey || !connKey) throw new Error("Search Console connection is not configured.");
  return {
    Authorization: `Bearer ${lovableKey}`,
    "X-Connection-Api-Key": connKey,
  };
}

function coversTarget(siteUrl: string, target: URL) {
  if (siteUrl.startsWith("sc-domain:")) {
    const domain = siteUrl.slice("sc-domain:".length).toLowerCase();
    const host = target.hostname.toLowerCase();
    return host === domain || host.endsWith(`.${domain}`);
  }
  try {
    return target.href.startsWith(new URL(siteUrl).href);
  } catch {
    return false;
  }
}

/** Resolve the verified property covering the site, preferring the exact root prefix. */
async function resolveSiteUrl(): Promise<string> {
  const res = await fetch(`${GATEWAY}/webmasters/v3/sites`, { headers: headers() });
  if (!res.ok) throw new Error(`Could not list Search Console properties [${res.status}]: ${await res.text()}`);
  const { siteEntry = [] } = (await res.json()) as {
    siteEntry?: { siteUrl: string; permissionLevel?: string }[];
  };
  const target = new URL(`${SITE_ORIGIN}/`);
  const verified = siteEntry.filter((e) => e.permissionLevel !== "siteUnverifiedUser");
  const exact = verified.find((e) => e.siteUrl === `${SITE_ORIGIN}/`);
  if (exact) return exact.siteUrl;
  const covering = verified.find((e) => coversTarget(e.siteUrl, target));
  if (!covering) throw new Error("No verified Search Console property covers this site.");
  return covering.siteUrl;
}

/** URLs inspected on every run , the high-value pages. */
export const MONITORED_URLS = [
  `${SITE_ORIGIN}/`,
  `${SITE_ORIGIN}/services`,
  `${SITE_ORIGIN}/case-studies`,
  `${SITE_ORIGIN}/process`,
  `${SITE_ORIGIN}/about`,
  `${SITE_ORIGIN}/blog`,
  `${SITE_ORIGIN}/contact`,
];

export async function runSeoMonitorCheck(): Promise<SeoRun> {
  const issues: SeoIssue[] = [];
  let sitemapErrors = 0;
  let sitemapWarnings = 0;
  let urlsIndexed = 0;

  const siteUrl = await resolveSiteUrl();
  const encodedSite = encodeURIComponent(siteUrl);

  // 1. Sitemap health
  const smRes = await fetch(
    `${GATEWAY}/webmasters/v3/sites/${encodedSite}/sitemaps/${encodeURIComponent(SITEMAP_URL)}`,
    { headers: headers() },
  );
  if (smRes.ok) {
    const sm = (await smRes.json()) as { errors?: string; warnings?: string; isPending?: boolean };
    sitemapErrors = Number(sm.errors ?? 0);
    sitemapWarnings = Number(sm.warnings ?? 0);
    if (sitemapErrors > 0)
      issues.push({
        type: "sitemap",
        severity: "error",
        url: SITEMAP_URL,
        message: `Search Console reports ${sitemapErrors} sitemap error(s).`,
      });
    if (sitemapWarnings > 0)
      issues.push({
        type: "sitemap",
        severity: "warning",
        url: SITEMAP_URL,
        message: `Search Console reports ${sitemapWarnings} sitemap warning(s).`,
      });
  } else {
    issues.push({
      type: "sitemap",
      severity: "error",
      url: SITEMAP_URL,
      message: `Sitemap status unavailable [${smRes.status}]. It may not be submitted yet.`,
    });
  }

  // 2. Per-URL index coverage
  for (const url of MONITORED_URLS) {
    try {
      const res = await fetch(`${GATEWAY}/v1/urlInspection/index:inspect`, {
        method: "POST",
        headers: { ...headers(), "Content-Type": "application/json" },
        body: JSON.stringify({ inspectionUrl: url, siteUrl }),
      });
      if (!res.ok) {
        issues.push({
          type: "system",
          severity: "warning",
          url,
          message: `Inspection failed [${res.status}].`,
        });
        continue;
      }
      const data = (await res.json()) as {
        inspectionResult?: {
          indexStatusResult?: {
            verdict?: string;
            coverageState?: string;
            robotsTxtState?: string;
            pageFetchState?: string;
            indexingState?: string;
          };
        };
      };
      const r = data.inspectionResult?.indexStatusResult ?? {};
      if (r.verdict === "PASS") urlsIndexed += 1;
      else
        issues.push({
          type: "indexing",
          severity: r.verdict === "FAIL" ? "error" : "warning",
          url,
          message: r.coverageState || r.indexingState || "Not indexed yet.",
        });
      if (r.robotsTxtState && r.robotsTxtState !== "ALLOWED")
        issues.push({ type: "crawl", severity: "error", url, message: `robots.txt: ${r.robotsTxtState}` });
      if (r.pageFetchState && !["SUCCESSFUL", "PAGE_FETCH_STATE_UNSPECIFIED"].includes(r.pageFetchState))
        issues.push({ type: "crawl", severity: "error", url, message: `Fetch problem: ${r.pageFetchState}` });
    } catch (e) {
      issues.push({
        type: "system",
        severity: "warning",
        url,
        message: e instanceof Error ? e.message : "Inspection error",
      });
    }
  }

  const hasError = issues.some((i) => i.severity === "error");
  const run: SeoRun = {
    site_url: siteUrl,
    status: hasError ? "error" : issues.length > 0 ? "warning" : "ok",
    sitemap_errors: sitemapErrors,
    sitemap_warnings: sitemapWarnings,
    urls_checked: MONITORED_URLS.length,
    urls_indexed: urlsIndexed,
    issues,
    summary: `${urlsIndexed}/${MONITORED_URLS.length} monitored pages indexed · ${issues.length} issue(s) found.`,
  };
  return run;
}

export async function saveRun(run: SeoRun, alertSent: boolean) {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin
    .from("seo_monitor_runs")
    .insert({ ...run, issues: run.issues as unknown as never, alert_sent: alertSent })
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data;
}

export async function listRuns(limit = 10) {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin
    .from("seo_monitor_runs")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function sendAlertEmail(run: SeoRun): Promise<boolean> {
  const apiKey = process.env["RESEND_API_KEY"];
  if (!apiKey) return false;
  const rows = run.issues
    .map(
      (i) =>
        `<tr><td style="padding:6px 10px;border-bottom:1px solid #eee">${i.severity.toUpperCase()}</td><td style="padding:6px 10px;border-bottom:1px solid #eee">${i.url}</td><td style="padding:6px 10px;border-bottom:1px solid #eee">${i.message}</td></tr>`,
    )
    .join("");
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: "RaylarPro SEO Monitor <onboarding@resend.dev>",
        to: [ALERT_EMAIL],
        subject: `SEO alert: ${run.issues.length} issue(s) on raylarpro.lovable.app`,
        html: `<h2>SEO Monitor Alert</h2><p>${run.summary}</p><table style="border-collapse:collapse;font-family:sans-serif;font-size:14px">${rows}</table><p><a href="${SITE_ORIGIN}/seo-monitor">Open the SEO monitor</a></p>`,
      }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

function issueSignature(i: SeoIssue): string {
  return `${i.type}|${i.url}|${i.message}`;
}

async function loadAlertedIssueSignatures(): Promise<Set<string>> {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin
    .from("seo_monitor_runs")
    .select("issues")
    .eq("alert_sent", true);
  if (error) throw new Error(error.message);
  const sigs = new Set<string>();
  for (const row of data ?? []) {
    const issues = (row.issues ?? []) as unknown as SeoIssue[];
    for (const i of issues) {
      if (i.severity === "error") sigs.add(issueSignature(i));
    }
  }
  return sigs;
}

/** Send an alert email only for error-level issues that have not been alerted before. */
export async function sendNewIssuesAlert(run: SeoRun): Promise<boolean> {
  const sigs = await loadAlertedIssueSignatures();
  const newIssues = run.issues.filter((i) => i.severity === "error" && !sigs.has(issueSignature(i)));
  if (newIssues.length === 0) return false;
  return sendAlertEmail({
    ...run,
    issues: newIssues,
    summary: `${newIssues.length} new SEO issue(s) detected on raylarpro.lovable.app.`,
  });
}
