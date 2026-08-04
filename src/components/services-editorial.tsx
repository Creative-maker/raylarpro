import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import type { ReactNode } from "react";
import { SERVICE_CATEGORIES } from "@/components/services-catalog";


/* ------------------------------------------------------------------ */
/* Miniature SaaS UI illustrations (pure CSS/SVG — no image payload)   */
/* ------------------------------------------------------------------ */

function Frame({ children, label }: { children: ReactNode; label?: string }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-background/70 shadow-[0_10px_30px_-18px_rgba(0,0,0,0.35)] backdrop-blur-sm">
      <div className="flex items-center gap-1.5 border-b border-border/70 bg-card/60 px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-foreground/15" />
        <span className="h-2 w-2 rounded-full bg-foreground/15" />
        <span className="h-2 w-2 rounded-full bg-primary/60" />
        {label && (
          <span className="ml-2 truncate rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
            {label}
          </span>
        )}
      </div>
      <div className="p-3">{children}</div>
    </div>
  );
}

const Bar = ({ w, tone = "muted" }: { w: string; tone?: "muted" | "primary" | "dark" }) => (
  <span
    className={`block h-2 rounded-full ${
      tone === "primary" ? "bg-primary" : tone === "dark" ? "bg-foreground/70" : "bg-muted-foreground/20"
    }`}
    style={{ width: w }}
  />
);

/* 1. Storefront */
function ArtStorefront() {
  return (
    <Frame label="raylarpro.store">
      <div className="grid gap-2">
        <div className="flex items-center justify-between">
          <Bar w="34%" tone="dark" />
          <div className="flex gap-1">
            <Bar w="18px" />
            <Bar w="18px" />
            <span className="h-2 w-6 rounded-full bg-primary" />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <div className="col-span-2 h-16 rounded-lg bg-gradient-to-br from-primary/25 via-primary/10 to-transparent" />
          <div className="grid gap-2">
            <div className="h-7 rounded-lg bg-muted" />
            <div className="h-7 rounded-lg bg-muted" />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="rounded-lg border border-border bg-card p-1.5"
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.35, ease: "easeInOut" }}
            >
              <div className="h-6 rounded bg-muted" />
              <div className="mt-1.5 flex flex-col gap-1">
                <Bar w="80%" />
                <Bar w="45%" tone="primary" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Frame>
  );
}

/* 2. CRO analytics */
function ArtAnalytics() {
  return (
    <Frame label="Conversion rate">
      <div className="flex items-end justify-between">
        <div>
          <div className="text-lg font-black tracking-tight">4.8%</div>
          <div className="text-[10px] font-semibold text-primary">+62% vs last 30d</div>
        </div>
        <div className="flex h-12 items-end gap-1">
          {[35, 50, 42, 66, 58, 82, 100].map((h, i) => (
            <motion.span
              key={i}
              className={`w-2 rounded-t-sm ${i > 4 ? "bg-primary" : "bg-muted-foreground/20"}`}
              initial={{ height: 4 }}
              whileInView={{ height: `${h}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
            />
          ))}
        </div>
      </div>
      <svg viewBox="0 0 200 40" className="mt-3 h-10 w-full">
        <motion.path
          d="M0 34 C 30 30, 45 18, 70 22 S 110 8, 135 14 S 175 2, 200 6"
          fill="none"
          stroke="oklch(0.66 0.19 145)"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        />
      </svg>
    </Frame>
  );
}

/* 3. SEO rankings */
function ArtSeo() {
  const rows = [
    { k: "shopify developer uk", p: "#1", w: "92%" },
    { k: "headless shopify agency", p: "#2", w: "76%" },
    { k: "klaviyo email expert", p: "#3", w: "61%" },
  ];
  return (
    <Frame label="Keyword positions">
      <div className="grid gap-2">
        {rows.map((r, i) => (
          <motion.div
            key={r.k}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.1 }}
            className="flex items-center gap-2"
          >
            <span className="grid h-5 w-7 flex-none place-items-center rounded-md bg-primary-soft text-[10px] font-bold text-primary">
              {r.p}
            </span>
            <span className="flex-1 truncate text-[10px] text-muted-foreground">{r.k}</span>
            <span className="h-1.5 w-14 overflow-hidden rounded-full bg-muted">
              <motion.span
                className="block h-full rounded-full bg-primary"
                initial={{ width: 0 }}
                whileInView={{ width: r.w }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.15 + i * 0.1 }}
              />
            </span>
          </motion.div>
        ))}
      </div>
    </Frame>
  );
}

/* 4. Paid ads */
function ArtAds() {
  return (
    <Frame label="Performance Max">
      <div className="grid grid-cols-3 gap-2">
        {[
          { l: "ROAS", v: "6.4x" },
          { l: "CPA", v: "£11" },
          { l: "CTR", v: "3.9%" },
        ].map((m, i) => (
          <motion.div
            key={m.l}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="rounded-lg border border-border bg-card px-2 py-1.5"
          >
            <div className="text-[9px] uppercase tracking-wide text-muted-foreground">{m.l}</div>
            <div className="text-sm font-black tracking-tight text-foreground">{m.v}</div>
          </motion.div>
        ))}
      </div>
      <div className="mt-2 rounded-lg border border-border bg-card p-2">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-primary" />
          <Bar w="55%" tone="dark" />
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-primary to-emerald-400"
            initial={{ width: 0 }}
            whileInView={{ width: "78%" }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          />
        </div>
      </div>
    </Frame>
  );
}

/* 5. Email flow */
function ArtFlow() {
  return (
    <Frame label="Klaviyo flow">
      <div className="flex items-center justify-between gap-1.5">
        {["Sign up", "Wait 1d", "Email", "Buy?"].map((s, i) => (
          <div key={s} className="flex items-center gap-1.5">
            <motion.span
              className={`rounded-md border px-1.5 py-1 text-[9px] font-semibold ${
                i === 2 ? "border-primary/40 bg-primary-soft text-primary" : "border-border bg-card text-muted-foreground"
              }`}
              animate={i === 2 ? { scale: [1, 1.06, 1] } : undefined}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            >
              {s}
            </motion.span>
            {i < 3 && <span className="h-px w-3 bg-border" />}
          </div>
        ))}
      </div>
      <div className="mt-3 grid gap-1.5">
        <div className="rounded-lg border border-border bg-card p-2">
          <Bar w="60%" tone="dark" />
          <div className="mt-1.5 flex gap-1.5">
            <Bar w="90%" />
          </div>
        </div>
        <div className="flex items-center justify-between rounded-lg bg-primary-soft px-2 py-1.5 text-[10px] font-semibold text-primary">
          <span>Carts recovered</span>
          <span>+14.2%</span>
        </div>
      </div>
    </Frame>
  );
}

/* 6. Automation graph */
function ArtAutomation() {
  return (
    <Frame label="Workflow">
      <div className="relative h-[92px]">
        <svg viewBox="0 0 200 92" className="absolute inset-0 h-full w-full">
          {[
            "M100 46 L34 18",
            "M100 46 L166 18",
            "M100 46 L34 74",
            "M100 46 L166 74",
          ].map((d, i) => (
            <motion.path
              key={d}
              d={d}
              stroke="oklch(0.66 0.19 145 / 0.45)"
              strokeWidth="1.5"
              fill="none"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
            />
          ))}
        </svg>
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl bg-foreground px-2.5 py-1.5 text-[10px] font-bold text-background"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          Shopify
        </motion.div>
        {[
          { l: "CRM", c: "left-2 top-1" },
          { l: "AI", c: "right-2 top-1" },
          { l: "ERP", c: "left-2 bottom-1" },
          { l: "API", c: "right-2 bottom-1" },
        ].map((n) => (
          <span
            key={n.l}
            className={`absolute ${n.c} rounded-lg border border-border bg-card px-2 py-1 text-[9px] font-semibold text-muted-foreground`}
          >
            {n.l}
          </span>
        ))}
      </div>
    </Frame>
  );
}

/* 7. Strategy dashboard */
function ArtStrategy() {
  return (
    <Frame label="Growth plan">
      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-lg border border-border bg-card p-2">
          <div className="text-[9px] uppercase tracking-wide text-muted-foreground">Q3 target</div>
          <div className="text-sm font-black tracking-tight">£1.2M</div>
          <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-muted">
            <motion.div
              className="h-full rounded-full bg-primary"
              initial={{ width: 0 }}
              whileInView={{ width: "72%" }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            />
          </div>
        </div>
        <div className="grid gap-1.5">
          {["Audit", "Roadmap", "Review"].map((t, i) => (
            <motion.div
              key={t}
              initial={{ opacity: 0, x: 8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex items-center gap-1.5 rounded-md border border-border bg-card px-1.5 py-1 text-[9px] font-semibold text-muted-foreground"
            >
              <Check className="h-2.5 w-2.5 text-primary" strokeWidth={3} />
              {t}
            </motion.div>
          ))}
        </div>
      </div>
    </Frame>
  );
}

/* ------------------------------------------------------------------ */

type Service = {
  slug: string;
  label: string;
  title: string;
  desc: string;
  items: string[];
  art: () => ReactNode;
  /* grid placement */
  span: string;
  layout: "stack" | "split";
};

const PRESENTATION: Record<string, { art: () => ReactNode; span: string; layout: "stack" | "split" }> = {
  "shopify-development": { art: ArtStorefront, span: "lg:col-span-7 lg:row-span-2", layout: "stack" },
  "store-optimization-cro": { art: ArtAnalytics, span: "lg:col-span-5", layout: "stack" },
  "seo-ai-search": { art: ArtSeo, span: "lg:col-span-5", layout: "stack" },
  "sem-paid-growth": { art: ArtAds, span: "lg:col-span-6", layout: "split" },
  "email-sms-marketing": { art: ArtFlow, span: "lg:col-span-6", layout: "split" },
  "integrations-ai-automation": { art: ArtAutomation, span: "lg:col-span-5", layout: "stack" },
  "growth-consultancy": { art: ArtStrategy, span: "lg:col-span-7", layout: "split" },
};

const SERVICES: Service[] = SERVICE_CATEGORIES.map((c) => ({
  ...c,
  ...PRESENTATION[c.slug]!,
}));


export function ServicesEditorial() {
  return (
    <section className="relative overflow-hidden bg-background py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-10 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -right-24 bottom-10 h-[320px] w-[420px] rounded-full bg-emerald-300/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Services
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="mt-5 text-4xl font-black tracking-tight md:text-5xl"
          >
            Everything You Need to Build, Grow &{" "}
            <span className="text-primary">Scale Your Shopify Store</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            From custom Shopify development and conversion optimization to AI automation and
            long-term growth strategy, I help businesses build better stores, attract more
            customers, and increase revenue.
          </motion.p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 md:mt-16 md:gap-6 lg:grid-cols-12">
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.title} service={s} index={i} />
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            to="/services"
            hash="service-categories"
            aria-label="View all services on the services page"
            className="group/cta inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition hover:shadow-[0_18px_50px_-14px_oklch(0.66_0.19_145/0.7)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            View All Services
            <span className="grid h-6 w-6 place-items-center rounded-full bg-primary text-primary-foreground transition-transform group-hover/cta:translate-x-0.5">
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
          </Link>
        </div>


      </div>
    </section>
  );
}

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const Art = service.art;
  const split = service.layout === "split";
  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: (index % 3) * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative ${service.span}`}
    >
      <div className="pointer-events-none absolute -inset-px rounded-[26px] bg-gradient-to-br from-primary/25 via-transparent to-primary/15 opacity-0 blur-xl transition duration-500 group-hover:opacity-100" />

      <Link
        to="/services"
        hash={service.slug}
        aria-label={`Learn more about ${service.title}`}
        className="relative flex h-full flex-col rounded-[24px] border border-border bg-card/80 p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04)] backdrop-blur-sm transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:-translate-y-1.5 focus-visible:border-primary/40 group-hover:-translate-y-1.5 group-hover:border-primary/40 group-hover:shadow-[0_28px_70px_-30px_oklch(0.66_0.19_145/0.45)] md:p-8"
      >

        <div className={split ? "grid gap-6 md:grid-cols-2 md:items-center" : "flex h-full flex-col"}>
          <div className={split ? "order-2 md:order-1" : ""}>
            <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">
              {service.label}
            </div>
            <h3 className="mt-3 text-2xl font-black tracking-tight md:text-3xl">{service.title}</h3>
            <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{service.desc}</p>

            <div className="mt-4 text-xs font-semibold text-muted-foreground">
              {service.items.length} services included
            </div>


            <div className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary opacity-70 transition-opacity duration-300 group-hover:opacity-100">
              Learn More
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </div>
          </div>

          <div
            className={
              split ? "order-1 md:order-2" : "mt-7 md:mt-8"
            }
            aria-hidden="true"
          >
            <Art />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
