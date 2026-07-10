import { motion, AnimatePresence, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ShoppingBag, Crown, Mail, Repeat, Star,
  BarChart3, Target, Database, LayoutTemplate, ArrowUpRight, Check,
} from "lucide-react";

type Platform = {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  badge: string;
  desc: string;
  capabilities: string[];
  metric: string;
  metricLabel: string;
  size: "lg" | "md" | "sm";
  // polar position around Shopify (angle in deg, radius in px on desktop)
  angle: number;
  radius: number;
  float: number; // seconds for float loop
};

const SHOPIFY: Platform = {
  id: "shopify",
  name: "Shopify",
  icon: ShoppingBag,
  badge: "Expert",
  desc: "Building fast, scalable and conversion-focused Shopify stores.",
  capabilities: ["Custom Themes", "Shopify Plus", "Store Optimization", "Performance Optimization", "CRO", "API Integrations"],
  metric: "150+",
  metricLabel: "Shopify Stores Built",
  size: "lg",
  angle: 0,
  radius: 0,
  float: 8,
};

const ORBIT: Platform[] = [
  { id: "shopify-plus", name: "Shopify Plus", icon: Crown, badge: "Enterprise Commerce", desc: "Enterprise-grade commerce for high-volume, global brands.", capabilities: ["High Volume Stores", "International Expansion", "B2B Commerce", "Custom Checkout"], metric: "20+", metricLabel: "Plus Stores Scaled", size: "md", angle: -75, radius: 240, float: 7 },
  { id: "klaviyo", name: "Klaviyo", icon: Mail, badge: "Automation Expert", desc: "Email & SMS automation that turns visitors into repeat buyers.", capabilities: ["Flows", "Campaigns", "Segmentation", "Revenue Tracking"], metric: "100+", metricLabel: "Automations Built", size: "md", angle: -25, radius: 260, float: 9 },
  { id: "judgeme", name: "Judge.me", icon: Star, badge: "Social Proof Expert", desc: "Reviews, UGC and trust signals that lift conversion rates.", capabilities: ["Reviews", "UGC", "Trust", "Ratings"], metric: "500K+", metricLabel: "Reviews Collected", size: "sm", angle: 25, radius: 250, float: 8.5 },
  { id: "recharge", name: "Recharge", icon: Repeat, badge: "Subscription Specialist", desc: "Recurring revenue engines and membership commerce.", capabilities: ["Subscriptions", "Membership Systems", "Recurring Revenue", "Retention"], metric: "40+", metricLabel: "Subscription Programs", size: "sm", angle: 75, radius: 240, float: 10 },
  { id: "ga4", name: "Google Analytics 4", icon: BarChart3, badge: "Analytics Expert", desc: "GA4 setup, events and funnels that reveal what actually converts.", capabilities: ["GA4 Setup", "Events", "Funnels", "Reporting", "Tracking"], metric: "200+", metricLabel: "GA4 Implementations", size: "sm", angle: 115, radius: 250, float: 7.5 },
  { id: "meta-pixel", name: "Meta Pixel", icon: Target, badge: "Advertising Expert", desc: "Facebook & Instagram tracking with a rock-solid Conversion API.", capabilities: ["Facebook Tracking", "Instagram Tracking", "Retargeting", "Conversion API"], metric: "150+", metricLabel: "Pixels Deployed", size: "sm", angle: 155, radius: 240, float: 9.5 },
  { id: "matrixify", name: "Matrixify", icon: Database, badge: "Migration Expert", desc: "Bulk import, export, ERP and catalog migrations at scale.", capabilities: ["Bulk Import", "Export", "ERP", "Catalog Migration"], metric: "50+", metricLabel: "Store Migrations", size: "sm", angle: -155, radius: 250, float: 8 },
  { id: "pagefly", name: "PageFly", icon: LayoutTemplate, badge: "Landing Page Expert", desc: "High-converting landing pages, A/B tests and custom sections.", capabilities: ["High-Converting Landing Pages", "A/B Testing", "Custom Sections"], metric: "300+", metricLabel: "Pages Built", size: "sm", angle: -115, radius: 240, float: 9 },
];

const STATS = [
  { value: 150, suffix: "+", label: "Shopify Stores Built" },
  { value: 100, suffix: "+", label: "Marketing Automations" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
  { value: 7, suffix: "+", label: "Years Experience" },
];

const SIZE_PX: Record<Platform["size"], number> = { lg: 132, md: 104, sm: 92 };

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

function GlassNode({
  p, cx, cy, size, isActive, isDimmed, onHover, onLeave, onSelect, delay,
}: {
  p: Platform; cx: number; cy: number; size: number;
  isActive: boolean; isDimmed: boolean;
  onHover: () => void; onLeave: () => void; onSelect: () => void; delay: number;
}) {
  const Icon = p.icon;
  return (
    <motion.button
      type="button"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onFocus={onHover}
      onBlur={onLeave}
      onClick={onSelect}
      aria-label={`${p.name} — ${p.badge}`}
      className="group absolute -translate-x-1/2 -translate-y-1/2 focus:outline-none"
      style={{ left: cx, top: cy, width: size, height: size }}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: isDimmed ? 0.35 : 1, scale: 1 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        animate={{ y: [0, -8, 0, 6, 0] }}
        transition={{ duration: p.float, repeat: Infinity, ease: "easeInOut" }}
        className="relative h-full w-full"
      >
        {/* glow */}
        <div
          className="absolute inset-0 rounded-full opacity-60 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: "radial-gradient(circle, rgba(22,163,74,0.35), transparent 70%)" }}
        />
        {/* glass circle */}
        <div
          className="relative flex h-full w-full flex-col items-center justify-center rounded-full border border-white/70 bg-white/60 backdrop-blur-xl transition-all duration-300 group-hover:border-primary/40 group-hover:bg-white/80"
          style={{
            boxShadow:
              "0 1px 0 rgba(255,255,255,0.9) inset, 0 20px 40px -20px rgba(11,11,11,0.15), 0 0 0 1px rgba(22,163,74,0.08)",
          }}
        >
          {/* soft reflection */}
          <div className="pointer-events-none absolute inset-x-3 top-2 h-1/3 rounded-full bg-gradient-to-b from-white/80 to-transparent opacity-70" />
          <div className="grid place-items-center rounded-full bg-primary-soft p-2 text-primary transition-transform duration-300 group-hover:scale-110">
            <Icon className={p.size === "lg" ? "h-8 w-8" : "h-6 w-6"} />
          </div>
          <div className={`mt-1.5 text-center font-semibold text-foreground ${p.size === "lg" ? "text-sm" : "text-[11px]"}`}>
            {p.name}
          </div>
        </div>
        {/* pulse ring on active */}
        {isActive && (
          <motion.div
            className="pointer-events-none absolute inset-0 rounded-full border-2 border-primary/60"
            initial={{ scale: 1, opacity: 0.8 }}
            animate={{ scale: 1.25, opacity: 0 }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut" }}
          />
        )}
      </motion.div>
    </motion.button>
  );
}

function InfoPanel({ p, compact = false }: { p: Platform; compact?: boolean }) {
  const Icon = p.icon;
  return (
    <motion.div
      key={p.id}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={`relative overflow-hidden rounded-[28px] border border-white/70 bg-white/70 p-6 backdrop-blur-2xl md:p-8 ${compact ? "" : ""}`}
      style={{ boxShadow: "0 30px 60px -30px rgba(11,11,11,0.2), 0 0 0 1px rgba(22,163,74,0.06)" }}
    >
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full opacity-70"
        style={{ background: "radial-gradient(circle, rgba(22,163,74,0.15), transparent 70%)" }}
      />
      <div className="relative flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-primary-soft text-primary">
              <Icon className="h-7 w-7" />
            </div>
            <div>
              <h3 className="text-2xl font-black tracking-tight text-foreground">{p.name}</h3>
              <div className="mt-1 inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary-soft px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-primary">
                {p.badge}
              </div>
            </div>
          </div>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">{p.desc}</p>
          <ul className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {p.capabilities.map((c) => (
              <li key={c} className="flex items-center gap-2 text-sm text-foreground">
                <span className="grid h-5 w-5 place-items-center rounded-full bg-primary-soft text-primary">
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
                {c}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-end justify-between gap-6 md:flex-col md:items-end md:justify-between">
          <div className="md:text-right">
            <div className="text-4xl font-black tracking-tight text-foreground md:text-5xl">{p.metric}</div>
            <div className="mt-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">{p.metricLabel}</div>
          </div>
          <button
            type="button"
            aria-label="View details"
            className="grid h-12 w-12 place-items-center rounded-full bg-primary text-primary-foreground shadow-[0_10px_30px_-10px_rgba(22,163,74,0.6)] transition-transform hover:scale-105"
          >
            <ArrowUpRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export function EcommerceStack() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activeId, setActiveId] = useState<string>("shopify");
  const [hoverId, setHoverId] = useState<string | null>(null);
  const [mobileIdx, setMobileIdx] = useState(0);

  const active = useMemo(() => {
    const id = hoverId ?? activeId;
    return [SHOPIFY, ...ORBIT].find((p) => p.id === id) ?? SHOPIFY;
  }, [hoverId, activeId]);

  // constellation geometry
  const W = 720;
  const H = 620;
  const CENTER = { x: W / 2, y: H / 2 };

  const positions = useMemo(() => {
    return ORBIT.map((p) => {
      const rad = (p.angle * Math.PI) / 180;
      return {
        p,
        x: CENTER.x + Math.cos(rad) * p.radius,
        y: CENTER.y + Math.sin(rad) * p.radius,
      };
    });
  }, [CENTER.x, CENTER.y]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-background py-24">
      {/* ambient background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 40% at 50% 30%, rgba(22,163,74,0.07), transparent 70%), radial-gradient(40% 30% at 20% 80%, rgba(22,163,74,0.05), transparent 70%)",
        }}
      />
      <div className="pointer-events-none absolute left-1/4 top-24 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute right-1/4 bottom-24 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 md:px-6">
        {/* header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-primary">
            <span className="h-px w-6 bg-primary" /> Technology Ecosystem
          </div>
          <h2 className="mt-5 text-4xl font-black tracking-tight text-foreground md:text-5xl lg:text-6xl">
            The Platforms That Power Every{" "}
            <span className="text-primary">Successful Shopify Store</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
            Every successful Shopify store relies on a carefully selected technology stack. I combine
            industry-leading platforms to create faster, smarter, and more profitable eCommerce experiences.
          </p>
        </motion.div>

        {/* constellation — desktop/tablet */}
        <div className="relative mt-16 hidden md:block">
          <div className="relative mx-auto" style={{ width: W, height: H, maxWidth: "100%" }}>
            {/* connecting lines */}
            <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full">
              <defs>
                <radialGradient id="linePulse" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#16A34A" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#16A34A" stopOpacity="0" />
                </radialGradient>
              </defs>
              {positions.map(({ p, x, y }, i) => {
                const isHot = (hoverId ?? activeId) === p.id;
                return (
                  <g key={p.id}>
                    <motion.line
                      x1={CENTER.x} y1={CENTER.y} x2={x} y2={y}
                      stroke={isHot ? "#16A34A" : "#0B0B0B"}
                      strokeOpacity={isHot ? 0.45 : 0.08}
                      strokeWidth={isHot ? 1.25 : 1}
                      initial={{ pathLength: 0 }}
                      animate={inView ? { pathLength: 1 } : {}}
                      transition={{ duration: 0.9, delay: 0.3 + i * 0.06, ease: "easeOut" }}
                    />
                    <motion.circle
                      cx={x} cy={y} r={4}
                      fill="url(#linePulse)"
                      animate={{ opacity: [0.3, 0.9, 0.3] }}
                      transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.2 }}
                    />
                  </g>
                );
              })}
            </svg>

            {/* shopify center */}
            <GlassNode
              p={SHOPIFY}
              cx={CENTER.x} cy={CENTER.y}
              size={SIZE_PX.lg}
              isActive={(hoverId ?? activeId) === "shopify"}
              isDimmed={false}
              onHover={() => setHoverId("shopify")}
              onLeave={() => setHoverId(null)}
              onSelect={() => setActiveId("shopify")}
              delay={0.2}
            />

            {/* orbit nodes */}
            {positions.map(({ p, x, y }, i) => (
              <GlassNode
                key={p.id}
                p={p}
                cx={x} cy={y}
                size={SIZE_PX[p.size]}
                isActive={(hoverId ?? activeId) === p.id}
                isDimmed={!!(hoverId ?? activeId) && (hoverId ?? activeId) !== p.id && (hoverId ?? activeId) !== "shopify" && p.id !== (hoverId ?? activeId)}
                onHover={() => setHoverId(p.id)}
                onLeave={() => setHoverId(null)}
                onSelect={() => setActiveId(p.id)}
                delay={0.4 + i * 0.07}
              />
            ))}
          </div>
        </div>

        {/* mobile: pinned shopify + horizontal carousel */}
        <div className="mt-14 md:hidden">
          <div className="mx-auto max-w-xs">
            <GlassCenterMobile />
          </div>
          <div className="mt-8 -mx-4 overflow-x-auto px-4 pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex snap-x snap-mandatory gap-4">
              {ORBIT.map((p, i) => {
                const Icon = p.icon;
                const isSel = i === mobileIdx;
                return (
                  <button
                    key={p.id}
                    onClick={() => { setMobileIdx(i); setActiveId(p.id); }}
                    className={`relative flex min-w-[140px] snap-center flex-col items-center gap-2 rounded-2xl border p-4 backdrop-blur-xl transition-all ${
                      isSel ? "border-primary/40 bg-white shadow-[0_20px_40px_-20px_rgba(22,163,74,0.4)]" : "border-white/70 bg-white/60"
                    }`}
                  >
                    <div className="grid h-12 w-12 place-items-center rounded-full bg-primary-soft text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="text-xs font-semibold text-foreground">{p.name}</div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* info panel */}
        <div className="mt-14">
          <AnimatePresence mode="wait">
            <InfoPanel p={active} key={active.id} />
          </AnimatePresence>
        </div>

        {/* stats — clean typography, no cards */}
        <div className="mt-20 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-center"
            >
              <div className="text-5xl font-black tracking-tight text-foreground md:text-6xl">
                <CountUp to={s.value} suffix={s.suffix} inView={inView} />
              </div>
              <div className="mt-3 text-sm font-medium uppercase tracking-wider text-muted-foreground">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GlassCenterMobile() {
  const Icon = SHOPIFY.icon;
  return (
    <div className="relative mx-auto flex h-36 w-36 items-center justify-center">
      <div
        className="absolute inset-0 rounded-full opacity-70 blur-2xl"
        style={{ background: "radial-gradient(circle, rgba(22,163,74,0.35), transparent 70%)" }}
      />
      <div
        className="relative flex h-full w-full flex-col items-center justify-center rounded-full border border-white/70 bg-white/70 backdrop-blur-xl"
        style={{ boxShadow: "0 20px 40px -20px rgba(11,11,11,0.15), 0 0 0 1px rgba(22,163,74,0.1)" }}
      >
        <div className="grid place-items-center rounded-full bg-primary-soft p-2 text-primary">
          <Icon className="h-8 w-8" />
        </div>
        <div className="mt-1.5 text-sm font-semibold text-foreground">Shopify</div>
      </div>
    </div>
  );
}
