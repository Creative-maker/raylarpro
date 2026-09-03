import { createServerFn } from "@tanstack/react-start";

export const getSeoMonitorRuns = createServerFn({ method: "GET" }).handler(async () => {
  const { listRuns } = await import("./seo-monitor.server");
  return { runs: await listRuns(10) };
});

export const triggerSeoMonitor = createServerFn({ method: "POST" }).handler(async () => {
  const { runSeoMonitorCheck, saveRun, sendAlertEmail } = await import("./seo-monitor.server");
  const run = await runSeoMonitorCheck();
  const alerted = run.status === "error" ? await sendAlertEmail(run) : false;
  const saved = await saveRun(run, alerted);
  return { run: saved, alerted };
});
