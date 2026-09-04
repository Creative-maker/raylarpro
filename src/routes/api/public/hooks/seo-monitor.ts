import { createFileRoute } from "@tanstack/react-router";
import { runSeoMonitorCheck, saveRun, sendNewIssuesAlert } from "@/lib/seo-monitor.server";

export const Route = createFileRoute("/api/public/hooks/seo-monitor")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const secret = process.env["SEO_MONITOR_SECRET"];
        const provided = request.headers.get("x-monitor-secret");
        if (!secret || provided !== secret) {
          return new Response(JSON.stringify({ error: "Unauthorized" }), {
            status: 401,
            headers: { "Content-Type": "application/json" },
          });
        }
        try {
          const run = await runSeoMonitorCheck();
          const alerted = run.status === "error" ? await sendNewIssuesAlert(run) : false;
          await saveRun(run, alerted);
          return new Response(JSON.stringify({ ok: true, status: run.status, issues: run.issues.length, alerted }), {
            headers: { "Content-Type": "application/json" },
          });
        } catch (e) {
          return new Response(
            JSON.stringify({ ok: false, error: e instanceof Error ? e.message : "Monitor failed" }),
            { status: 500, headers: { "Content-Type": "application/json" } },
          );
        }
      },
    },
  },
});
