import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Star, MapPin, MessageCircle, Calendar, ChevronLeft, ChevronRight,
  ShoppingBag, CheckCircle2, ArrowRight, Sparkles, Search,
} from "lucide-react";
import profileImg from "@/assets/profile.jpg";
import { SectionEyebrow, SectionHeading, SectionSub } from "@/components/site-chrome";
import {
  STATS, CERTS, TESTIMONIALS, EXPERTISE, PROJECTS, WHATSAPP, CALENDLY,
} from "@/components/site-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "RaylarPro — Shopify Specialist & eCommerce Growth Consultant" },
      { name: "description", content: "Yusuff Rasheed (RaylarPro) builds high-converting Shopify stores, boosts CRO, SEO and speed. Store setup, redesign, Klaviyo and app integrations." },
      { property: "og:title", content: "RaylarPro — Shopify Specialist & eCommerce Growth Consultant" },
      { property: "og:description", content: "High-converting Shopify stores designed for long-term growth." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <Hero />
      <StatsBar />
      <Certifications />
      <TestimonialsCarousel />
      <ExpertisePreview />
      <ProjectsPreview />
      <FreeTool />
      <CTA />
    </>
  );
}

function Hero() {
  return (
    <section className="bg-surface">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 md:px-6 md:py-24 lg:grid-cols-[auto_1fr]">
        <div className="relative mx-auto lg:mx-0">
          <div className="relative h-72 w-72 sm:h-80 sm:w-80 md:h-96 md:w-96">
            <div className="absolute inset-0 rounded-full ring-8 ring-primary/80" />
            <img src={profileImg} alt="Yusuff Rasheed — RaylarPro, Shopify Specialist" width={800} height={800} className="h-full w-full rounded-full object-cover" />
            <span className="absolute right-4 top-6 rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-primary-foreground shadow-lg">Top Rated</span>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-background px-4 py-2 text-xs font-semibold shadow-lg ring-1 ring-border">
              <span className="inline-flex items-center gap-1.5">
                <ShoppingBag className="h-3.5 w-3.5 text-primary" /> shopify partners
              </span>
            </div>
          </div>
        </div>
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight md:text-6xl">RaylarPro</h1>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary-soft px-3 py-1.5 text-sm font-semibold text-accent-foreground">
            <CheckCircle2 className="h-4 w-4" /> Pro Seller
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center gap-1.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
              ))}
              <span className="font-semibold">5.0</span>
              <span className="text-muted-foreground">(500+ reviews)</span>
            </div>
            <span className="inline-flex items-center gap-1.5 text-muted-foreground">
              <MapPin className="h-4 w-4" /> United Kingdom · Worldwide
            </span>
          </div>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Shopify Specialist · Shopify Store Developer · eCommerce Growth Consultant. I build
            high-converting Shopify stores that help brands attract more customers and increase sales.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={WHATSAPP} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 transition">
              <MessageCircle className="h-4 w-4" /> Contact Me
            </a>
            <a href={CALENDLY} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg border-2 border-primary bg-background px-6 py-3 text-sm font-semibold text-primary hover:bg-primary-soft transition">
              <Calendar className="h-4 w-4" /> Book a Call
            </a>
          </div>
        </div>
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

function ExpertisePreview() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading>My Expertise</SectionHeading>
        <SectionSub>Specialized skills to grow your e-commerce business.</SectionSub>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {EXPERTISE.map((e) => (
            <div key={e.title} className="rounded-2xl bg-card p-8 shadow-sm ring-1 ring-border">
              <div className="mb-5 grid h-14 w-14 place-items-center rounded-xl bg-primary text-primary-foreground">
                <e.icon className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold">{e.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {e.items.map((it) => (
                  <li key={it} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-primary" />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link to="/services" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
            See all services <ArrowRight className="h-4 w-4" />
          </Link>
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
          {featured.map((p) => (
            <a key={p.title} href={p.url} target="_blank" rel="noreferrer" className="group overflow-hidden rounded-2xl bg-card ring-1 ring-border transition hover:-translate-y-1 hover:shadow-xl">
              <div className="aspect-[4/3] overflow-hidden bg-muted">
                <img src={p.img} alt={`${p.title} website screenshot`} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
              </div>
              <div className="p-5">
                <div className="mb-2 inline-flex rounded-full bg-primary-soft px-2.5 py-0.5 text-xs font-semibold text-accent-foreground">{p.tag}</div>
                <h3 className="text-lg font-bold">{p.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
              </div>
            </a>
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
