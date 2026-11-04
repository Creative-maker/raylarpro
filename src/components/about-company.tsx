import { Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, Quote, Layers, Target, Cpu, TrendingUp, RefreshCw, ExternalLink } from "lucide-react";
import raylarLogo from "@/assets/raylar-logo.png";
import { STATS, TESTIMONIALS, PROJECTS } from "./site-data";

const SERVICES = [
  "Ecommerce Website Design and Development",
  "Shopify Store Design and Development",
  "Ecommerce SEO and Search Optimization",
  "Ecommerce Marketing and Customer Acquisition",
  "Growth and Conversion Optimization",
  "Product Listing and Store Management",
  "Ecommerce Automation and Technology",
];

const WHY = [
  { icon: Layers, title: "A Complete Ecommerce Approach", desc: "Development, SEO, marketing, optimization, and technology under one roof, so nothing falls between agencies." },
  { icon: Target, title: "Business-Focused Solutions", desc: "Every recommendation is tied to a real problem, like low traffic, weak rankings, or poor conversion, not vanity work." },
  { icon: Cpu, title: "Innovation and Technology", desc: "Modern tools, AI automation, and integrations that help your store run leaner and scale faster." },
  { icon: TrendingUp, title: "Growth-Oriented Thinking", desc: "We look beyond launch day and plan for the revenue, retention, and visibility your store needs next." },
  { icon: RefreshCw, title: "Commitment to Improvement", desc: "Ecommerce keeps changing, so we keep testing, measuring, and refining long after go-live." },
];

export function AboutCompany() {
  return (
    <>
      <section className="py-16 md:py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 md:px-6 lg:grid-cols-[1fr_auto]">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-primary">About RaylarPro</div>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight md:text-4xl">Your Ecommerce Growth Partner</h2>
            <p className="mt-2 text-lg font-semibold">We help businesses build, optimize, and grow successful online stores.</p>
            <div className="mt-5 space-y-4 text-base leading-relaxed text-muted-foreground md:text-lg">
              <p>Building a successful ecommerce business takes more than launching a website. It requires the right strategy, professional development, effective marketing, search engine optimization, and continuous improvement. At RaylarPro, we bring these elements together for entrepreneurs, startups, and established brands.</p>
              <p>Whether you are launching your first Shopify store, improving your Google rankings, or looking for ways to increase online sales, we build solutions around your business goals.</p>
            </div>
          </div>
          <div className="mx-auto">
            <div className="relative grid h-64 w-64 place-items-center rounded-3xl bg-card p-10 shadow-xl ring-1 ring-border md:h-72 md:w-72">
              <div className="absolute inset-0 -z-10 rounded-3xl bg-primary/20 blur-3xl" />
              <img src={raylarLogo} alt="RaylarPro logo" className="h-full w-full object-contain" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface py-16">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <h2 className="text-center text-3xl font-extrabold tracking-tight md:text-4xl">Results That Speak</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {STATS.map((s) => (
              <div key={s.label} className="rounded-2xl border border-border bg-card p-6 text-center">
                <div className="text-4xl font-extrabold text-primary">{s.value}</div>
                <div className="mt-1 text-sm font-medium text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.slice(0, 3).map((t) => (
              <figure key={t.name} className="rounded-2xl border border-border bg-card p-6">
                <Quote className="h-6 w-6 text-primary" />
                <blockquote className="mt-3 text-sm leading-relaxed text-muted-foreground">{t.quote}</blockquote>
                <figcaption className="mt-4 text-sm font-bold">{t.name} <span className="font-normal text-muted-foreground">, {t.meta}</span></figcaption>
              </figure>
            ))}
          </div>
          <h3 className="mt-14 text-center text-xl font-bold">Stores We Have Worked On</h3>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {PROJECTS.slice(0, 8).map((p) => (
              <a key={p.title} href={p.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium hover:border-primary hover:text-primary transition">
                {p.title} <ExternalLink className="h-3.5 w-3.5" />
              </a>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link to="/case-studies" className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">See all case studies <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <h2 className="text-center text-3xl font-extrabold tracking-tight md:text-4xl">Complete Ecommerce Services Under One Roof</h2>
          <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((x) => (
              <li key={x} className="flex items-start gap-3 rounded-lg bg-card p-4 ring-1 ring-border">
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-primary" />
                <span className="text-sm font-medium">{x}</span>
              </li>
            ))}
          </ul>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="text-lg font-bold">For New Entrepreneurs</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">We make it easier to move from a business idea to a functioning online store, with the right Shopify setup, product listings, SEO foundations, and growth strategy.</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="text-lg font-bold">For Established Businesses</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Struggling with low traffic, poor rankings, underperforming product pages, or weak conversions? We find the opportunities and fix what is holding your store back.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface py-16">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <h2 className="text-center text-3xl font-extrabold tracking-tight md:text-4xl">What Makes RaylarPro Different</h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">Most agencies do one piece. We connect every part of your store so growth compounds.</p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {WHY.map((w) => (
              <div key={w.title} className="rounded-2xl border border-border bg-card p-6">
                <div className="mb-4 grid h-12 w-12 place-items-center rounded-xl bg-primary-soft text-primary"><w.icon className="h-6 w-6" /></div>
                <h3 className="font-bold">{w.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{w.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="text-lg font-bold text-primary">Our Mission</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">To empower entrepreneurs and businesses with professional ecommerce services, innovative digital solutions, and growth-focused strategies that make building and scaling online businesses easier.</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="text-lg font-bold text-primary">Our Vision</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">To become a leading global ecommerce service provider, recognized for helping businesses build stronger online stores, achieve better digital visibility, and unlock their full growth potential.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-4xl rounded-3xl bg-foreground px-6 py-12 text-center text-background md:px-12">
          <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">Let's Build Something That Grows</h2>
          <p className="mx-auto mt-3 max-w-2xl text-background/70">Your business has potential. Let's build the right foundation to unlock it.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 transition">Get Started , Request a Quote <ArrowRight className="h-4 w-4" /></Link>
            <Link to="/services" className="inline-flex items-center gap-2 rounded-lg border-2 border-primary px-6 py-3 text-sm font-semibold text-primary hover:bg-primary/10 transition">Explore Our Services</Link>
          </div>
          <p className="mt-8 text-sm font-bold tracking-wide">RaylarPro. Build Smarter. Grow Further.</p>
        </div>
      </section>
    </>
  );
}
