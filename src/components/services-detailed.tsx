import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import {
  Store, TrendingUp, Mail, Zap, BarChart3, Shield,
  ArrowRight, Check, Sparkles, type LucideIcon,
} from "lucide-react";

type Detailed = {
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  pitch: string;
  outcomes: string[];
  deliverables: string[];
  idealFor: string;
};

const DETAILED: Detailed[] = [
  {
    icon: Store,
    eyebrow: "01 , Build",
    title: "Shopify Store Development",
    pitch:
      "Launch a production-ready Shopify store engineered for speed, scale and sales , not just a pretty theme. Every store I ship is built on a conversion-first foundation so you can start selling from day one.",
    outcomes: [
      "Go live in 2–4 weeks with a store that looks premium on every device",
      "Cleaner code and a faster theme mean better Core Web Vitals and lower ad costs",
      "Structured for scale , add products, markets and apps without breaking things",
    ],
    deliverables: [
      "New Shopify & Shopify Plus store setup",
      "Custom theme development from scratch",
      "Premium theme customization & rebuilds",
      "Store migration (WooCommerce, BigCommerce, Wix, Magento)",
      "High-converting landing pages & funnels",
      "Product & collection architecture",
      "Checkout branding & Shop Pay setup",
      "Multi-currency, multi-language & Markets setup",
    ],
    idealFor: "Founders launching a new brand or serious sellers ready to graduate from a template.",
  },
  {
    icon: TrendingUp,
    eyebrow: "02 , Optimize",
    title: "Store Optimization & CRO",
    pitch:
      "Traffic without conversions is expensive. I audit your store, find the friction, and rebuild the pages that matter , product, cart and checkout , so more of your existing visitors actually buy.",
    outcomes: [
      "Lift conversion rate by 20–60% on average within the first 90 days",
      "Cut Largest Contentful Paint under 2.5s for better SEO and ad quality scores",
      "Reduce cart & checkout abandonment with proven UX patterns",
    ],
    deliverables: [
      "Full conversion rate optimization (CRO) audit",
      "Speed & Core Web Vitals optimization",
      "Mobile-first UX overhaul",
      "Product page & PDP redesign",
      "Cart & checkout optimization",
      "A/B testing setup and roadmap",
      "Trust, social proof & scarcity systems",
      "Heatmap & session-recording analysis",
    ],
    idealFor: "Stores already doing $20k+/mo that want to squeeze more revenue from the same traffic.",
  },
  {
    icon: Mail,
    eyebrow: "03 , Retain",
    title: "Email Marketing & Retention",
    pitch:
      "Your list is the highest-ROI channel you own. I build Klaviyo email & SMS systems that recover carts, resurrect churned buyers and turn one-time shoppers into loyal repeat customers.",
    outcomes: [
      "Add 25–40% of total revenue from email & SMS within 60 days",
      "Recover 10–15% of abandoned carts automatically",
      "Higher LTV with post-purchase, win-back and VIP flows",
    ],
    deliverables: [
      "Welcome & pre-purchase nurture series",
      "Abandoned cart & abandoned checkout flows",
      "Browse abandonment automation",
      "Post-purchase, review-request & cross-sell flows",
      "Win-back and sunset flows",
      "Campaign calendar & promotional strategy",
      "Advanced segmentation & predictive analytics",
      "Klaviyo × Shopify deep integration",
    ],
    idealFor: "Brands with real traffic but under-monetized email lists and low repeat-purchase rates.",
  },
  {
    icon: Zap,
    eyebrow: "04 , Automate",
    title: "Integrations & Automation",
    pitch:
      "Stop copy-pasting orders into spreadsheets. I connect your store to the apps and tools your team actually uses, then automate the repetitive work so you can focus on growth.",
    outcomes: [
      "Save 10+ hours per week on manual ops",
      "Zero-touch order, inventory and customer sync across platforms",
      "Cleaner data across every tool in your stack",
    ],
    deliverables: [
      "Shopify Flow workflow automations",
      "Klaviyo, Judge.me, Loox & Yotpo integrations",
      "Recharge & subscription setup",
      "Matrixify bulk import/export & migrations",
      "Custom API & webhook integrations",
      "3PL, ERP & inventory sync",
      "Zapier / Make automations",
      "Custom Shopify app integration",
    ],
    idealFor: "Operators drowning in manual work or teams stitching together too many disconnected tools.",
  },
  {
    icon: BarChart3,
    eyebrow: "05 , Measure",
    title: "Analytics & SEO",
    pitch:
      "You can’t grow what you can’t measure. I set up bulletproof tracking and technical SEO so every marketing dollar is attributable , and free organic traffic becomes a real channel.",
    outcomes: [
      "Accurate revenue attribution across Meta, Google & TikTok",
      "Rank on page 1 for high-intent product & collection queries",
      "Data you can actually trust when making decisions",
    ],
    deliverables: [
      "Google Analytics 4 & GA4 e-commerce setup",
      "Google Tag Manager with server-side tagging",
      "Meta Pixel & Conversions API",
      "TikTok, Pinterest & Google Ads pixels",
      "Technical SEO audit & fixes",
      "Product & collection schema markup",
      "Keyword research & content plan",
      "Monthly performance & attribution reports",
    ],
    idealFor: "Brands scaling paid ads or investing in SEO who need clean, reliable numbers.",
  },
  {
    icon: Shield,
    eyebrow: "06 , Grow",
    title: "Growth & Maintenance",
    pitch:
      "Shopify stores decay without love. I keep your store fast, secure and continuously improving , with a monthly roadmap of upgrades, experiments and fixes so revenue keeps compounding.",
    outcomes: [
      "Zero unplanned downtime and always up-to-date apps & themes",
      "A continuous pipeline of CRO experiments and small wins",
      "A senior Shopify partner on retainer without the agency price tag",
    ],
    deliverables: [
      "Monthly maintenance & priority bug fixes",
      "Performance monitoring & uptime alerts",
      "Theme & app updates with regression testing",
      "Security hardening & backup strategy",
      "Quarterly store audits & roadmaps",
      "Ongoing CRO experiment pipeline",
      "Growth consulting & strategy calls",
      "Slack / WhatsApp support channel",
    ],
    idealFor: "Established stores that need a reliable partner instead of hiring in-house.",
  },
];

export function ServicesDetailed() {
  return (
    <section id="service-details" className="relative overflow-hidden bg-surface py-20 md:py-28 scroll-mt-24">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute right-0 top-24 h-[420px] w-[520px] rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -left-32 bottom-0 h-[380px] w-[520px] rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            Deep Dive
          </div>
          <h2 className="mt-5 text-4xl font-black tracking-tight md:text-5xl">
            Every Service, <span className="text-primary">Unpacked</span>
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Exactly what you get, the outcomes you can expect and who each package is built for , no
            fluff, no surprises.
          </p>
        </div>

        <div className="mt-16 space-y-10">
          {DETAILED.map((s, i) => (
            <DetailedCard key={s.title} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function DetailedCard({ service, index }: { service: Detailed; index: number }) {
  const Icon = service.icon;
  const reverse = index % 2 === 1;
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
    >
      <div className="pointer-events-none absolute -inset-px rounded-[28px] bg-gradient-to-br from-primary/25 via-transparent to-primary/15 opacity-0 blur-2xl transition duration-700 group-hover:opacity-100" />

      <div className="relative overflow-hidden rounded-[26px] border border-border bg-card p-8 shadow-[0_1px_2px_rgba(0,0,0,0.04)] md:p-12">
        <div
          className={`grid gap-10 md:grid-cols-[1.15fr_1fr] md:items-start ${
            reverse ? "md:[&>*:first-child]:order-2" : ""
          }`}
        >
          {/* Left: story + outcomes */}
          <div>
            <div className="flex items-center gap-3">
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-primary to-emerald-500 text-primary-foreground shadow-lg shadow-primary/25">
                <Icon className="h-7 w-7" />
              </div>
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                {service.eyebrow}
              </div>
            </div>

            <h3 className="mt-5 text-3xl font-black tracking-tight md:text-4xl">
              {service.title}
            </h3>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
              {service.pitch}
            </p>

            <div className="mt-7">
              <div className="text-xs font-bold uppercase tracking-widest text-foreground/70">
                What you walk away with
              </div>
              <ul className="mt-3 space-y-2.5">
                {service.outcomes.map((o) => (
                  <li key={o} className="flex items-start gap-3 text-sm text-foreground/85 md:text-base">
                    <span className="mt-0.5 grid h-5 w-5 flex-none place-items-center rounded-full bg-primary text-primary-foreground">
                      <Check className="h-3 w-3" strokeWidth={3.5} />
                    </span>
                    <span>{o}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-7 rounded-2xl border border-border bg-background/60 p-4">
              <div className="text-xs font-bold uppercase tracking-widest text-primary">Ideal for</div>
              <p className="mt-1 text-sm leading-relaxed text-foreground/80">{service.idealFor}</p>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="group/cta inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition hover:shadow-[0_14px_40px_-10px_oklch(0.66_0.19_145/0.7)]"
              >
                Start This Service
                <span className="grid h-6 w-6 place-items-center rounded-full bg-primary text-primary-foreground transition-transform group-hover/cta:translate-x-0.5">
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
              <Link
                to="/case-studies"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-2.5 text-sm font-semibold text-foreground hover:border-primary/40 hover:text-primary transition"
              >
                See Results
              </Link>
            </div>
          </div>

          {/* Right: full deliverables list */}
          <div className="relative">
            <div className="rounded-2xl border border-border bg-background p-6 md:p-7">
              <div className="flex items-center justify-between">
                <div className="text-xs font-bold uppercase tracking-widest text-foreground/70">
                  Full deliverables
                </div>
                <span className="rounded-full bg-primary-soft px-2.5 py-1 text-[11px] font-bold text-primary">
                  {service.deliverables.length} items
                </span>
              </div>
              <ul className="mt-4 grid gap-2.5">
                {service.deliverables.map((d) => (
                  <li
                    key={d}
                    className="flex items-start gap-2.5 rounded-lg px-2 py-1.5 text-sm text-foreground/85 transition hover:bg-primary-soft/60"
                  >
                    <span className="mt-0.5 grid h-4 w-4 flex-none place-items-center rounded-full bg-primary-soft text-primary">
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
