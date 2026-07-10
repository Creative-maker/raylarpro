import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import {
  ShoppingBag, Crown, Mail, Repeat, Star, Headphones,
  BarChart3, Target, Tag, Workflow, Database, LayoutTemplate,
} from "lucide-react";

type Platform = {
  name: string;
  category: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
  progress: number; // 0-100
};

const PLATFORMS: Platform[] = [
  { name: "Shopify", category: "Core eCommerce Platform", desc: "Building scalable online stores.", icon: ShoppingBag, progress: 98 },
  { name: "Shopify Plus", category: "Enterprise Commerce", desc: "For high-growth and enterprise brands.", icon: Crown, progress: 94 },
  { name: "Klaviyo", category: "Email & SMS Marketing", desc: "Customer retention and automated flows.", icon: Mail, progress: 92 },
  { name: "Recharge", category: "Subscription Commerce", desc: "Recurring revenue and subscription management.", icon: Repeat, progress: 88 },
  { name: "Judge.me", category: "Product Reviews", desc: "Social proof and customer trust.", icon: Star, progress: 90 },
  { name: "Gorgias", category: "Customer Support", desc: "AI-powered Shopify customer service.", icon: Headphones, progress: 86 },
  { name: "Google Analytics 4", category: "Performance Analytics", desc: "Track conversions and customer behavior.", icon: BarChart3, progress: 93 },
  { name: "Meta Pixel", category: "Advertising & Tracking", desc: "Optimize Facebook and Instagram campaigns.", icon: Target, progress: 89 },
  { name: "Google Tag Manager", category: "Event Tracking", desc: "Advanced analytics implementation.", icon: Tag, progress: 87 },
  { name: "Shopify Flow", category: "Store Automation", desc: "Automate repetitive business processes.", icon: Workflow, progress: 91 },
  { name: "Matrixify", category: "Store Migration", desc: "Bulk imports, exports, and Shopify data management.", icon: Database, progress: 85 },
  { name: "PageFly", category: "Landing Page Builder", desc: "High-converting Shopify landing pages.", icon: LayoutTemplate, progress: 90 },
];

const STATS = [
  { value: 100, suffix: "+", label: "Projects Delivered" },
  { value: 99, suffix: "%", label: "Client Satisfaction" },
  { value: 24, suffix: "/7", label: "Support & Maintenance" },
  { value: 7, suffix: "+", label: "Platforms Mastered" },
];

function ProgressRing({ progress, inView }: { progress: number; inView: boolean }) {
  const R = 34;
  const C = 2 * Math.PI * R;
  return (
    <svg viewBox="0 0 80 80" className="absolute inset-0 h-full w-full -rotate-90">
      <circle cx="40" cy="40" r={R} fill="none" stroke="oklch(0.92 0.01 145)" strokeWidth="3" />
      <motion.circle
        cx="40" cy="40" r={R} fill="none"
        stroke="#16A34A" strokeWidth="3" strokeLinecap="round"
        strokeDasharray={C}
        initial={{ strokeDashoffset: C }}
        animate={inView ? { strokeDashoffset: C - (C * progress) / 100 } : { strokeDashoffset: C }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      />
    </svg>
  );
}

function PlatformCard({ p, i, inView }: { p: Platform; i: number; inView: boolean }) {
  const Icon = p.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="group relative rounded-[22px] border border-border bg-card p-6 shadow-[0_1px_2px_rgba(11,11,11,0.04),0_8px_24px_-12px_rgba(11,11,11,0.08)] transition-shadow duration-300 hover:shadow-[0_0_0_1px_rgba(22,163,74,0.25),0_20px_45px_-20px_rgba(22,163,74,0.35)]"
    >
      <div className="pointer-events-none absolute inset-0 rounded-[22px] opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: "radial-gradient(circle at 50% 0%, rgba(22,163,74,0.08), transparent 60%)" }} />
      <div className="relative mx-auto mb-5 h-20 w-20">
        <ProgressRing progress={p.progress} inView={inView} />
        <div className="absolute inset-2 grid place-items-center rounded-full bg-primary-soft text-primary transition-transform duration-300 group-hover:scale-105">
          <Icon className="h-7 w-7" />
        </div>
      </div>
      <div className="text-center">
        <h3 className="text-base font-bold text-foreground">{p.name}</h3>
        <div className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-primary">{p.category}</div>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
      </div>
    </motion.div>
  );
}

function CountUp({ to, suffix, inView }: { to: number; suffix: string; inView: boolean }) {
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => `${Math.round(v)}${suffix}`);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, to, { duration: 1.6, ease: [0.22, 1, 0.36, 1] });
    const unsub = rounded.on("change", (v) => { if (ref.current) ref.current.textContent = v; });
    return () => { controls.stop(); unsub(); };
  }, [inView, to, mv, rounded]);
  return <span ref={ref}>0{suffix}</span>;
}

export function EcommerceStack() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative bg-background py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            <span className="h-px w-6 bg-primary" /> My eCommerce Stack
          </div>
          <h2 className="mt-5 text-4xl font-black tracking-tight text-foreground md:text-5xl">
            The Platforms Behind Every{" "}
            <span className="text-primary">High-Performing Store</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
            Every successful Shopify store is powered by industry-leading platforms that help
            increase conversions, automate marketing, optimize performance, and create
            exceptional customer experiences.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PLATFORMS.map((p, i) => (
            <PlatformCard key={p.name} p={p} i={i} inView={inView} />
          ))}
        </div>

        <div className="mt-20 grid gap-6 rounded-[28px] border border-border bg-card p-8 shadow-sm sm:grid-cols-2 lg:grid-cols-4 md:p-10">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-4xl font-black tracking-tight text-foreground md:text-5xl">
                <CountUp to={s.value} suffix={s.suffix} inView={inView} />
              </div>
              <div className="mt-2 text-sm font-medium text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
