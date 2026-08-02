import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import {
  Store, TrendingUp, Mail, Zap, BarChart3, Shield,
  ArrowRight, Check, type LucideIcon,
} from "lucide-react";

type Service = {
  icon: LucideIcon;
  title: string;
  desc: string;
  items: string[];
};

const SERVICES: Service[] = [
  {
    icon: Store,
    title: "Shopify Store Development",
    desc: "Launch a professional Shopify store built for speed, scalability, and conversions.",
    items: [
      "Shopify Store Setup",
      "Custom Theme Development",
      "Shopify Plus Development",
      "Theme Customization",
      "Store Migration",
      "Landing Pages",
    ],
  },
  {
    icon: TrendingUp,
    title: "Store Optimization & CRO",
    desc: "Improve user experience and turn more visitors into paying customers.",
    items: [
      "Conversion Rate Optimization",
      "Speed Optimization",
      "Mobile Optimization",
      "Checkout Optimization",
      "A/B Testing",
      "Product Page Optimization",
    ],
  },
  {
    icon: Mail,
    title: "Email Marketing & Retention",
    desc: "Increase repeat purchases with high-converting Klaviyo email and SMS automations.",
    items: [
      "Welcome Series",
      "Abandoned Cart Recovery",
      "Browse Abandonment",
      "Post-Purchase Flows",
      "Campaign Management",
      "Customer Segmentation",
    ],
  },
  {
    icon: Zap,
    title: "Integrations & Automation",
    desc: "Connect your Shopify store with powerful apps and automate repetitive tasks.",
    items: [
      "Shopify Flow",
      "Klaviyo Integration",
      "Judge.me",
      "Recharge",
      "API Integrations",
      "Matrixify",
    ],
  },
  {
    icon: BarChart3,
    title: "Analytics & SEO",
    desc: "Make smarter business decisions using data-driven insights and search optimization.",
    items: [
      "Google Analytics 4",
      "Google Tag Manager",
      "Meta Pixel",
      "Technical SEO",
      "Conversion Tracking",
      "Site Audits",
    ],
  },
  {
    icon: Shield,
    title: "Growth & Maintenance",
    desc: "Keep your Shopify store secure, optimized, and continuously improving.",
    items: [
      "Monthly Maintenance",
      "Performance Monitoring",
      "Bug Fixes",
      "Security Updates",
      "Store Audits",
      "Growth Consulting",
    ],
  },
];

export function ServicesGrid() {
  return (
    <section className="relative overflow-hidden bg-background py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            What I Do
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="mt-5 text-4xl font-black tracking-tight md:text-5xl"
          >
            Services Built to <span className="text-primary">Grow Shopify Stores</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="mt-4 text-lg leading-relaxed text-muted-foreground"
          >
            From launching brand‑new Shopify stores to optimizing existing ones, I
            help businesses build, grow, automate, and scale their eCommerce
            operations.
          </motion.p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.title} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const Icon = service.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.55, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="group relative"
    >
      {/* soft green glow on hover */}
      <div className="pointer-events-none absolute -inset-px rounded-[22px] bg-gradient-to-br from-primary/30 via-primary/0 to-primary/20 opacity-0 blur-xl transition duration-500 group-hover:opacity-100" />

      <a
        href="#service-details"
        className="relative flex h-full flex-col rounded-[20px] border border-border bg-card p-8 shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-all duration-500 group-hover:border-primary/40 group-hover:shadow-[0_20px_60px_-20px_oklch(0.66_0.19_145/0.35)]"
      >

        {/* icon */}
        <div className="relative">
          <motion.div
            whileHover={{ rotate: 6 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-primary to-emerald-500 text-primary-foreground shadow-lg shadow-primary/25 transition-transform duration-500 group-hover:rotate-6"
          >
            <Icon className="h-7 w-7" />
          </motion.div>
          <div className="absolute inset-0 -z-10 rounded-2xl bg-primary/30 opacity-0 blur-2xl transition duration-500 group-hover:opacity-100" />
        </div>

        {/* title + description */}
        <h3 className="mt-6 text-xl font-bold tracking-tight text-foreground">
          {service.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {service.desc}
        </p>

        {/* services list */}
        <ul className="mt-6 grid gap-2.5">
          {service.items.map((it) => (
            <li key={it} className="flex items-start gap-2.5 text-sm text-foreground/80">
              <span className="mt-0.5 grid h-4 w-4 flex-none place-items-center rounded-full bg-primary-soft text-primary">
                <Check className="h-3 w-3" strokeWidth={3} />
              </span>
              <span>{it}</span>
            </li>
          ))}
        </ul>

        {/* divider + CTA */}
        <div className="mt-auto pt-6">
          <div className="border-t border-border pt-5">
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
              View All Services
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
