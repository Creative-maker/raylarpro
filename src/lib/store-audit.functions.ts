import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { analyze, normalizeUrl, type AuditResult } from "./store-audit";

export const runStoreAudit = createServerFn({ method: "POST" })
  .inputValidator((data) =>
    z
      .object({
        storeUrl: z.string().trim().min(4).max(255),
        email: z.string().trim().email().max(255),
        intent: z.string().trim().max(120).optional(),
        challenge: z.string().trim().max(120).optional(),
      })
      .parse(data),
  )
  .handler(async ({ data }): Promise<AuditResult> => {
    let url: string;
    try {
      url = normalizeUrl(data.storeUrl);
    } catch {
      throw new Error("That doesn't look like a valid store URL. Try something like yourstore.com");
    }

    const started = Date.now();
    let res: Response;
    try {
      res = await fetch(url, {
        redirect: "follow",
        headers: {
          "user-agent":
            "Mozilla/5.0 (compatible; RaylarProAuditBot/1.0; +https://raylarpro.lovable.app)",
          accept: "text/html,application/xhtml+xml",
        },
        signal: AbortSignal.timeout(15000),
      });
    } catch {
      throw new Error("I couldn't reach that store. Check the address is public and try again.");
    }
    const ttfbMs = Date.now() - started;
    if (!res.ok) {
      throw new Error(`That store responded with status ${res.status}, so I couldn't scan it.`);
    }
    const html = await res.text();
    const totalMs = Date.now() - started;

    const result = analyze({
      url: res.url || url,
      html,
      bytes: new TextEncoder().encode(html).length,
      ttfbMs,
      totalMs,
      status: res.status,
    });

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const since = new Date(Date.now() - 5 * 60 * 1000).toISOString();
    const { data: recent } = await supabaseAdmin
      .from("store_audits")
      .select("id")
      .eq("email", data.email.toLowerCase())
      .eq("store_domain", result.domain)
      .gte("created_at", since)
      .limit(1);

    if (!recent || recent.length === 0) {
      const scoreOf = (key: string) => result.categories.find((c) => c.key === key)?.score ?? 0;
      await supabaseAdmin.from("store_audits").insert({
        store_url: result.url,
        store_domain: result.domain,
        email: data.email.toLowerCase(),
        intent: data.intent ?? null,
        growth_challenge: data.challenge ?? null,
        overall_score: result.overall,
        conversion_score: scoreOf("conversion"),
        trust_score: scoreOf("trust"),
        product_score: scoreOf("product"),
        performance_score: scoreOf("performance"),
        seo_score: scoreOf("seo"),
        findings: result.findings,
      });

      const apiKey = process.env["RESEND_API_KEY"];
      const to = process.env["AUDIT_NOTIFY_EMAIL"];
      if (apiKey && to) {
        const rows = result.categories
          .map((c) => `<tr><td style="padding:4px 12px 4px 0">${c.label}</td><td style="font-weight:700">${c.score}</td></tr>`)
          .join("");
        const opps = result.findings
          .map((f, i) => `<li><strong>${String(i + 1).padStart(2, "0")} , ${f.title}</strong><br/>${f.detail}</li>`)
          .join("");
        try {
          await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
            body: JSON.stringify({
              from: "RaylarPro Audits <onboarding@resend.dev>",
              to: [to],
              subject: `New RaylarPro Shopify Audit Lead , ${result.domain}`,
              html: `
                <div style="font-family:Inter,Arial,sans-serif;color:#111;line-height:1.55">
                  <h2 style="margin:0 0 4px">New Shopify Audit Lead</h2>
                  <p style="margin:0 0 18px;color:#555">${result.domain} , overall score <strong>${result.overall}/100</strong></p>
                  <p><strong>Visitor intent:</strong> ${data.intent ?? ","}<br/>
                  <strong>Store URL:</strong> <a href="${result.url}">${result.url}</a><br/>
                  <strong>Email:</strong> ${data.email}<br/>
                  <strong>Growth challenge:</strong> ${data.challenge ?? ","}<br/>
                  <strong>Submitted:</strong> ${new Date().toUTCString()}</p>
                  <h3 style="margin:20px 0 6px">Scores</h3>
                  <table>${rows}</table>
                  <h3 style="margin:20px 0 6px">Top opportunities</h3>
                  <ol>${opps}</ol>
                </div>`,
            }),
          });
        } catch (err) {
          console.error("[audit] email notification failed", err);
        }
      }
    }

    return result;
  });
