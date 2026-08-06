import { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { TrendingDown, TrendingUp } from "lucide-react";
import type { Metric } from "@/components/case-study-data";

/**
 * Interactive before/after chart for a case study.
 * Metrics use wildly different scales, so the user picks one metric at a time
 * and we chart the raw values side by side, plus a normalised "all metrics"
 * view showing relative improvement across the board.
 */
export function CaseStudyChart({ metrics }: { metrics: Metric[] }) {
  const [active, setActive] = useState<string>("__all");

  const improvement = (m: Metric) => {
    const raw = ((m.afterNum - m.beforeNum) / m.beforeNum) * 100;
    return m.lowerIsBetter ? -raw : raw;
  };

  const overviewData = useMemo(
    () => metrics.map((m) => ({ name: m.label, value: Math.round(improvement(m)), metric: m })),
    [metrics],
  );

  const current = metrics.find((m) => m.label === active);
  const detailData = current
    ? [
        { name: "Before (sample)", value: current.beforeNum, key: "before" },
        { name: "After (actual)", value: current.afterNum, key: "after" },
      ]
    : [];

  const fmt = (m: Metric, v: number) =>
    m.unit === "£" || m.unit === "$" ? `${m.unit}${v.toLocaleString()}` : `${v.toLocaleString()}${m.unit}`;

  return (
    <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-card">
      <div className="flex flex-wrap gap-2 border-b border-border bg-surface p-3">
        <ChartTab label="All metrics" active={active === "__all"} onClick={() => setActive("__all")} />
        {metrics.map((m) => (
          <ChartTab key={m.label} label={m.label} active={active === m.label} onClick={() => setActive(m.label)} />
        ))}
      </div>

      <div className="p-4 pt-6">
        <div className="h-[320px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            {active === "__all" ? (
              <BarChart data={overviewData} margin={{ top: 8, right: 12, left: 0, bottom: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 11 }}
                  interval={0}
                  angle={-18}
                  textAnchor="end"
                  height={70}
                  stroke="currentColor"
                  className="text-muted-foreground"
                />
                <YAxis
                  tick={{ fontSize: 11 }}
                  stroke="currentColor"
                  className="text-muted-foreground"
                  tickFormatter={(v: number) => `${v}%`}
                />
                <Tooltip
                  cursor={{ fill: "hsl(var(--muted) / 0.35)" }}
                  content={({ active: on, payload }) => {
                    if (!on || !payload?.length) return null;
                    const d = payload[0]!.payload as { name: string; value: number; metric: Metric };
                    return (
                      <TipCard title={d.name}>
                        <Row label="Before" value={d.metric.before} />
                        <Row label="After" value={d.metric.after} />
                        <Row label="Improvement" value={`${d.value > 0 ? "+" : ""}${d.value}%`} strong />
                      </TipCard>
                    );
                  }}
                />
                <Bar dataKey="value" radius={[6, 6, 0, 0]} maxBarSize={64}>
                  {overviewData.map((d) => (
                    <Cell
                      key={d.name}
                      fill={d.value >= 0 ? "hsl(var(--primary))" : "hsl(var(--destructive))"}
                    />
                  ))}
                  <LabelList
                    dataKey="value"
                    position="top"
                    className="fill-foreground"
                    style={{ fontSize: 11, fontWeight: 700 }}
                    formatter={(v: number) => `${v > 0 ? "+" : ""}${v}%`}
                  />
                </Bar>
              </BarChart>
            ) : (
              <BarChart data={detailData} margin={{ top: 8, right: 12, left: 0, bottom: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="currentColor" className="text-muted-foreground" />
                <YAxis
                  tick={{ fontSize: 11 }}
                  stroke="currentColor"
                  className="text-muted-foreground"
                  tickFormatter={(v: number) => (current ? fmt(current, v) : String(v))}
                  width={70}
                />
                <Legend
                  verticalAlign="top"
                  height={28}
                  content={() => (
                    <div className="mb-1 flex items-center justify-center gap-4 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1.5">
                        <span className="h-2.5 w-2.5 rounded-sm bg-muted-foreground/50" /> Before (sample baseline)
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <span className="h-2.5 w-2.5 rounded-sm bg-primary" /> After (actual)
                      </span>
                    </div>
                  )}
                />
                <Tooltip
                  cursor={{ fill: "hsl(var(--muted) / 0.35)" }}
                  content={({ active: on, payload }) => {
                    if (!on || !payload?.length || !current) return null;
                    const d = payload[0]!.payload as { name: string; value: number };
                    return (
                      <TipCard title={current.label}>
                        <Row label={d.name} value={fmt(current, d.value)} strong />
                      </TipCard>
                    );
                  }}
                />
                <Bar dataKey="value" radius={[6, 6, 0, 0]} maxBarSize={110}>
                  {detailData.map((d) => (
                    <Cell key={d.key} fill={d.key === "after" ? "hsl(var(--primary))" : "hsl(var(--muted-foreground) / 0.45)"} />
                  ))}
                  <LabelList
                    dataKey="value"
                    position="top"
                    className="fill-foreground"
                    style={{ fontSize: 12, fontWeight: 700 }}
                    formatter={(v: number) => (current ? fmt(current, v) : String(v))}
                  />
                </Bar>
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>

        {current ? (
          <div className="mt-4 flex flex-wrap items-center gap-3 rounded-xl border border-border bg-surface px-4 py-3 text-sm">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-2.5 py-1 text-xs font-bold text-primary">
              {current.lowerIsBetter ? <TrendingDown className="h-3.5 w-3.5" /> : <TrendingUp className="h-3.5 w-3.5" />}
              {current.delta}
            </span>
            <span className="text-muted-foreground">
              {current.label} moved from <strong className="text-foreground">{current.before}</strong> to{" "}
              <strong className="text-foreground">{current.after}</strong>
              {current.lowerIsBetter ? " — lower is better here." : "."}
            </span>
          </div>
        ) : (
          <p className="mt-4 text-sm text-muted-foreground">
            Relative improvement per metric. Select a metric above to see its raw before/after values.
          </p>
        )}
      </div>
    </div>
  );
}

function ChartTab({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full px-3 py-1.5 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
        active
          ? "bg-foreground text-background"
          : "border border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground"
      }`}
    >
      {label}
    </button>
  );
}

function TipCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-card p-3 text-xs shadow-lg">
      <div className="mb-1.5 font-bold">{title}</div>
      <div className="space-y-1">{children}</div>
    </div>
  );
}

function Row({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-6">
      <span className="text-muted-foreground">{label}</span>
      <span className={strong ? "font-bold text-primary" : "font-semibold"}>{value}</span>
    </div>
  );
}
