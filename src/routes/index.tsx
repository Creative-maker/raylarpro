import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Star, ChevronLeft, ChevronRight, MessageCircle, Calendar,
  ShoppingBag, CheckCircle2, ArrowRight, Sparkles, Search,
  TrendingUp, Zap, MousePointer2, BarChart3, Rocket,
} from "lucide-react";
import heroShot from "@/assets/hero-shot.png";
import { SectionEyebrow, SectionHeading, SectionSub, PillCTA } from "@/components/site-chrome";
import {
  STATS, CERTS, TESTIMONIALS, EXPERTISE, PROJECTS, WHATSAPP, CALENDLY,
} from "@/components/site-data";
import { EcommerceStack } from "@/components/ecommerce-stack";
import { ServicesEditorial } from "@/components/services-editorial";
import { CASE_STUDIES } from "@/components/case-study-data";
import { StoreThumb } from "@/components/store-thumb";



export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "RaylarPro , Shopify Development Agency for Ambitious Brands" },
      { name: "description", content: "RaylarPro builds high-converting Shopify stores that grow faster, sell more, and scale better. Shopify Plus, CRO, headless commerce and store optimization." },
      { property: "og:title", content: "RaylarPro , Shopify Development Agency for Ambitious Brands" },
      { property: "og:description", content: "RaylarPro builds high-converting Shopify stores that grow faster, sell more, and scale better. Shopify Plus, CRO, headless commerce and store optimization." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <Hero />
      <SkillsMarquee />
      <StatsBar />
      <Certifications />
      <TestimonialsCarousel />
      <ServicesEditorial />
      <EcommerceStack />
      <ProjectsPreview />
      <FreeTool />
      <CTA />
    </>
  );
}

const SERVICE_TAGS = [
  { label: "Shopify Development", tone: "dark", rot: -6, x: "-2%", y: "6%" },
  { label: "Store Redesign", tone: "light", rot: 4, x: "62%", y: "0%" },
  { label: "Shopify Plus", tone: "green", rot: -3, x: "78%", y: "42%" },
  { label: "CRO", tone: "dark", rot: 6, x: "-4%", y: "72%" },
  { label: "Headless Shopify", tone: "light", rot: -4, x: "58%", y: "82%" },
  { label: "Store Speed", tone: "green", rot: 8, x: "6%", y: "40%" },
] as const;

function Hero() {
  return (
    <section className="relative overflow-hidden bg-background pt-10 pb-16 md:pt-16 md:pb-24">
      {/* ambient background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[380px] w-[380px] rounded-full bg-emerald-300/20 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,oklch(0.66_0.19_145/0.08)_1px,transparent_0)] [background-size:28px_28px]" />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 md:px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-6">
        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-3 py-1.5 text-xs font-semibold shadow-sm backdrop-blur">
            <span className="relative grid h-2 w-2 place-items-center">
              <span className="absolute inset-0 animate-ping rounded-full bg-primary/60" />
              <span className="h-2 w-2 rounded-full bg-primary" />
            </span>
            🚀 Shopify Experts · UK · Worldwide
          </div>

          <h1 className="mt-6 text-[2.5rem] font-black leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-[4.25rem]">
            Build Shopify Stores That{" "}
            <span className="relative whitespace-nowrap text-primary">Grow Faster</span>,{" "}
            <span className="relative whitespace-nowrap text-primary">Sell More</span>, and{" "}
            <span className="relative whitespace-nowrap text-primary">Scale Better</span>.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            RaylarPro is a Shopify development studio helping ambitious brands ship
            high‑converting stores , from custom themes to Shopify Plus, CRO and
            headless commerce.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <PillCTA to="/contact">Start Your Project</PillCTA>
            <Link
              to="/case-studies"
              className="inline-flex items-center gap-2 rounded-full border-2 border-foreground bg-background px-6 py-3 text-sm font-semibold text-foreground transition hover:-translate-y-0.5 hover:shadow-md"
            >
              View Portfolio
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
              ))}
              <span className="font-semibold text-foreground">5.0</span>
              <span>(500+ reviews)</span>
            </div>
            <span className="inline-flex items-center gap-1.5">
              <ShoppingBag className="h-4 w-4 text-primary" /> Shopify Partner
            </span>
            <span className="inline-flex items-center gap-1.5">
              <TrendingUp className="h-4 w-4 text-primary" /> 500+ Stores Shipped
            </span>
          </div>
        </motion.div>

        {/* RIGHT , hero composition */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto h-[560px] w-full max-w-[560px] lg:h-[640px]"
        >
          {/* blobs */}
          <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-primary to-emerald-400 blur-2xl opacity-30" />
          <div className="absolute right-6 top-10 h-40 w-40 rounded-full bg-primary/30 blur-2xl" />
          <div className="absolute left-4 bottom-16 h-56 w-56 rounded-full bg-emerald-300/40 blur-3xl" />

          {/* portrait circle */}
          <div className="absolute inset-x-6 bottom-0 top-6 overflow-hidden rounded-[36px] bg-gradient-to-br from-primary/15 via-background to-emerald-50 ring-1 ring-primary/20">
            <img
              src={heroShot}
              alt="RaylarPro Shopify expert"
              width={1024}
              height={1280}
              className="absolute inset-x-0 bottom-0 mx-auto h-[105%] w-auto object-contain object-bottom"
            />
          </div>

          {/* floating rotating badge */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
            className="absolute -left-2 top-6 grid h-24 w-24 place-items-center rounded-full bg-foreground text-background ring-4 ring-primary/70 shadow-xl md:h-28 md:w-28"
          >
            <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
              <defs>
                <path id="badgeCircle" d="M50,50 m-36,0 a36,36 0 1,1 72,0 a36,36 0 1,1 -72,0" />
              </defs>
              <text fill="currentColor" className="fill-background text-[9px] font-bold uppercase tracking-[0.15em]">
                <textPath href="#badgeCircle">★ Trusted Shopify Partner · ★ 5.0 Rated · </textPath>
              </text>
            </svg>
            <Rocket className="h-6 w-6 text-primary" />
          </motion.div>

          {/* revenue card */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute right-0 top-16 w-52 rounded-2xl border border-border bg-background/85 p-4 shadow-xl backdrop-blur-md"
          >
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Revenue</span>
              <span className="inline-flex items-center gap-1 rounded-full bg-primary-soft px-1.5 py-0.5 text-[10px] font-bold text-accent-foreground">
                <TrendingUp className="h-3 w-3" /> +42%
              </span>
            </div>
            <div className="mt-1 text-2xl font-black">$128,540</div>
            <svg viewBox="0 0 120 40" className="mt-2 h-10 w-full">
              <polyline
                fill="none" stroke="oklch(0.66 0.19 145)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                points="0,32 15,26 30,28 45,18 60,22 75,12 90,16 105,6 120,10"
              />
              <polyline
                fill="oklch(0.66 0.19 145 / 0.15)" stroke="none"
                points="0,32 15,26 30,28 45,18 60,22 75,12 90,16 105,6 120,10 120,40 0,40"
              />
            </svg>
          </motion.div>

          {/* review card */}
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -left-4 bottom-28 w-56 rounded-2xl border border-border bg-background/85 p-4 shadow-xl backdrop-blur-md"
          >
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="mt-1.5 text-xs leading-snug text-foreground">
              “Sales jumped <b>+38%</b> in the first month after launch.”
            </p>
            <div className="mt-2 text-[11px] font-semibold text-muted-foreground">, Marcus C., DTC Founder</div>
          </motion.div>

          {/* conversion pill */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute right-2 bottom-24 inline-flex items-center gap-2 rounded-full border border-border bg-background/90 px-3 py-1.5 text-xs font-semibold shadow-lg backdrop-blur"
          >
            <BarChart3 className="h-3.5 w-3.5 text-primary" /> CVR 4.8%
          </motion.div>

          {/* cursor */}
          <motion.div
            animate={{ x: [0, 10, 0], y: [0, -6, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-24 top-40 text-foreground"
          >
            <MousePointer2 className="h-5 w-5 -rotate-12 fill-foreground" />
            <span className="ml-2 inline-block rounded-md bg-foreground px-2 py-0.5 text-[10px] font-semibold text-background">RaylarPro</span>
          </motion.div>

          {/* floating service tags */}
          {SERVICE_TAGS.map((t, i) => (
            <motion.span
              key={t.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: [0, i % 2 ? 6 : -6, 0] }}
              transition={{ duration: 5 + i * 0.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.15 }}
              style={{ left: t.x, top: t.y, rotate: `${t.rot}deg` }}
              className={`absolute inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-semibold shadow-lg ring-1 ${
                t.tone === "dark"
                  ? "bg-foreground text-background ring-white/10"
                  : t.tone === "green"
                  ? "bg-primary text-primary-foreground ring-primary/40"
                  : "bg-background text-foreground ring-border"
              }`}
            >
              <Zap className="h-3 w-3 text-primary" /> {t.label}
            </motion.span>
          ))}

          {/* mini labels bottom row */}
          <div className="absolute inset-x-0 bottom-2 flex flex-wrap justify-center gap-2">
            {["✔ Shopify Expert", "✔ CRO", "✔ Fast Stores"].map((l) => (
              <span key={l} className="rounded-full bg-background/90 px-2.5 py-1 text-[11px] font-semibold text-foreground shadow ring-1 ring-border backdrop-blur">
                {l}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

const SKILLS = [
  "Shopify Development", "Shopify Plus", "Store Design", "Theme Customization",
  "Store Migration", "Performance Optimization", "CRO", "Landing Pages",
  "Liquid Development", "Headless Shopify", "SEO", "API Integration",
  "Automation", "Email Marketing", "Shopify Apps",
];
const SEPS = ["✦", "•", "✳", "◆"];

function SkillsMarquee() {
  const row = (
    <div className="flex shrink-0 items-center gap-8 px-4">
      {SKILLS.map((s, i) => (
        <span key={s} className="inline-flex items-center gap-8 whitespace-nowrap text-sm font-semibold uppercase tracking-wider">
          <span className="text-white/90">{s}</span>
          <span className="text-primary">{SEPS[i % SEPS.length]}</span>
        </span>
      ))}
    </div>
  );
  return (
    <section className="relative overflow-hidden border-y border-white/5 bg-foreground py-5 text-background">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-foreground to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-foreground to-transparent" />
      <div className="group flex w-max animate-marquee [animation-duration:45s] hover:[animation-play-state:paused]">
        {row}{row}{row}
      </div>
    </section>
  );
}



function StatsBar() {
  return (
    <section className="bg-surface pb-16">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 md:grid-cols-3 md:px-6">
        {STATS.map((s) => (
          <div key={s.label} className="rounded-2xl bg-card p-8 text-center shadow-sm ring-1 ring-border">
            <div className={`mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full ${s.tone}`}>
              <s.icon className="h-7 w-7" />
            </div>
            <div className="text-4xl font-extrabold tracking-tight">{s.value}</div>
            <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Certifications() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionEyebrow>Professional Credentials</SectionEyebrow>
        <SectionHeading>Certifications & Achievements</SectionHeading>
        <SectionSub>Real skills backed by real credentials. Here is what I bring to the table.</SectionSub>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {CERTS.map((c) => (
            <div key={c.title} className="rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:shadow-lg">
              <div className="mb-4 grid h-14 w-14 place-items-center rounded-xl bg-primary-soft text-primary">
                <c.icon className="h-7 w-7" />
              </div>
              <h3 className="font-bold">{c.title}</h3>
              <div className="mt-1 text-xs font-medium text-primary">{c.org}</div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsCarousel() {
  const [i, setI] = useState(0);
  const t = TESTIMONIALS[i];
  const prev = () => setI((i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => setI((i + 1) % TESTIMONIALS.length);
  return (
    <section className="bg-surface py-20">
      <div className="mx-auto max-w-4xl px-4 md:px-6">
        <SectionEyebrow>Social Proof</SectionEyebrow>
        <SectionHeading>Trusted by Store Owners</SectionHeading>
        <SectionSub>Real results from real business owners who transformed their stores.</SectionSub>
        <div className="relative mt-12 rounded-3xl bg-card p-8 shadow-xl ring-1 ring-border md:p-12">
          <div className="mx-auto mb-6 grid h-20 w-20 place-items-center rounded-full bg-primary-soft text-3xl font-bold text-primary">{t.name.charAt(0)}</div>
          <p className="text-center text-lg leading-relaxed text-foreground md:text-xl">“{t.quote}”</p>
          <div className="mt-6 text-center">
            <div className="font-bold">{t.name}</div>
            <div className="text-sm text-muted-foreground">{t.meta}</div>
          </div>
          <div className="mt-8 flex items-center justify-center gap-3">
            <button onClick={prev} aria-label="Previous slide" className="grid h-10 w-10 place-items-center rounded-full border border-border hover:bg-accent">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex gap-1.5">
              {TESTIMONIALS.map((_, idx) => (
                <button key={idx} aria-label={`Go to slide ${idx + 1}`} onClick={() => setI(idx)} className={`h-2 rounded-full transition-all ${idx === i ? "w-8 bg-primary" : "w-2 bg-border"}`} />
              ))}
            </div>
            <button onClick={next} aria-label="Next slide" className="grid h-10 w-10 place-items-center rounded-full border border-border hover:bg-accent">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}


function ProjectsPreview() {
  const featured = PROJECTS.slice(0, 6);
  return (
    <section className="bg-surface py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading>Featured Case Studies</SectionHeading>
        <SectionSub>A snapshot of stores I have built and grown for clients.</SectionSub>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p, i) => (
            <Link key={p.url} to="/case-studies/$slug" params={{ slug: CASE_STUDIES[i]!.slug }} className="group overflow-hidden rounded-2xl bg-card ring-1 ring-border transition hover:-translate-y-1 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
              <StoreThumb url={p.url} title={p.title} img={p.img} />

              <div className="p-5">
                <div className="mb-2 inline-flex rounded-full bg-primary-soft px-2.5 py-0.5 text-xs font-semibold text-accent-foreground">{p.tag}</div>
                <h3 className="text-lg font-bold">{p.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                  Read case study <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link to="/case-studies" className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 transition">
            View all case studies <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function FreeTool() {
  const [url, setUrl] = useState("");
  return (
    <section className="py-20">
      <div className="mx-auto max-w-3xl px-4 md:px-6">
        <div className="rounded-3xl bg-gradient-to-br from-primary to-emerald-700 p-10 text-primary-foreground shadow-2xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold">
            <Sparkles className="h-3.5 w-3.5" /> Free Tool
          </div>
          <h2 className="mt-4 text-3xl font-extrabold md:text-4xl">Free Shopify Store Checker</h2>
          <p className="mt-2 text-white/90">See Your Opportunities Instantly.</p>
          <p className="mt-4 text-sm text-white/80">Paste your Shopify store link to instantly generate a simple audit showing top issues + wins.</p>
          <form onSubmit={(e) => { e.preventDefault(); window.open(`${WHATSAPP}?text=${encodeURIComponent(`Please audit my store: ${url}`)}`, "_blank"); }} className="mt-6 flex flex-col gap-3 sm:flex-row">
            <input value={url} onChange={(e) => setUrl(e.target.value)} type="url" required placeholder="https://your-store.com" className="flex-1 rounded-lg bg-white/95 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-white" />
            <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-lg bg-background px-6 py-3 text-sm font-bold text-primary hover:bg-white transition">
              <Search className="h-4 w-4" /> Generate My Report
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="bg-surface py-20">
      <div className="mx-auto max-w-3xl px-4 text-center md:px-6">
        <SectionHeading>Ready to Grow Your Store?</SectionHeading>
        <SectionSub>Book a free call or send a quick message. Let's talk about your goals.</SectionSub>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/contact" className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 transition">
            <MessageCircle className="h-4 w-4" /> Contact Me
          </Link>
          <a href={CALENDLY} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg border-2 border-primary bg-background px-6 py-3 text-sm font-semibold text-primary hover:bg-primary-soft transition">
            <Calendar className="h-4 w-4" /> Book a Call
          </a>
        </div>
      </div>
    </section>
  );
}
