import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight, ArrowUpRight, BadgeCheck, Calendar, Check, ChevronDown,
  MessageCircle, Quote, Sparkles, Star,
} from "lucide-react";
import { CALENDLY } from "@/components/site-data";
import type { ServicePage } from "@/components/service-page-data";
import { getServicePage, relatedServices } from "@/components/service-page-data";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = getServicePage(params.slug);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Service not found — RaylarPro" }, { name: "robots", content: "noindex" }] };
    }
    const s = loaderData.service;
    const title = `${s.name} — Shopify ${s.categoryTitle} | RaylarPro`;
    const desc = s.heroSub.slice(0, 155);
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: ServiceNotFound,
  component: ServiceDetailPage,
});

function ServiceNotFound() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-28 text-center md:px-6">
      <h1 className="text-3xl font-black tracking-tight md:text-4xl">Service not found</h1>
      <p className="mt-4 text-muted-foreground">That service page doesn't exist. Browse the full list instead.</p>
      <Link to="/services" className="mt-8 inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background">
        All Services <ArrowRight className="h-4 w-4" />
      </Link>
    </section>
  );
}

function ServiceDetailPage() {
  const { service } = Route.useLoaderData() as { service: ServicePage };
  const related = relatedServices(service.slug);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-surface py-20 md:py-28">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-primary/12 blur-3xl" />
        </div>
        <div className="mx-auto max-w-4xl px-4 text-center md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-primary"
          >
            <BadgeCheck className="h-4 w-4" aria-hidden="true" /> {service.badge}
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.05 }}
            className="mt-6 text-4xl font-black tracking-tight md:text-6xl"
          >
            {service.heroTitle}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.1 }}
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            {service.heroSub}
          </motion.p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-foreground py-3 pl-6 pr-3 text-sm font-semibold text-background transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Get A Free Store Audit
              <span className="grid h-8 w-8 place-items-center rounded-full bg-primary text-primary-foreground transition-transform group-hover:translate-x-0.5">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </Link>
            <a
              href={CALENDLY} target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border-2 border-primary bg-background px-6 py-3 text-sm font-semibold text-primary transition hover:bg-primary-soft"
            >
              <Calendar className="h-4 w-4" /> Book a Call
            </a>
          </div>
          <div className="mt-12 grid grid-cols-3 gap-3 rounded-2xl border border-border bg-card p-5">
            {service.stats.map((s) => (
              <div key={s.label}>
                <div className="text-2xl font-black text-primary md:text-3xl">{s.value}</div>
                <div className="mt-1 text-[11px] font-medium uppercase tracking-wide text-muted-foreground md:text-xs">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section className="bg-background py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-primary">What I Do</div>
              <h2 className="mt-4 text-3xl font-black tracking-tight md:text-4xl">{service.whatWeDoTitle}</h2>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground">{service.whatWeDoBody}</p>
              <Link
                to="/contact"
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                <MessageCircle className="h-4 w-4" /> Get A Quote
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {service.pillars.map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.45, delay: i * 0.06 }}
                  className="rounded-2xl border border-border bg-card p-5 transition hover:border-primary/40 hover:shadow-[0_18px_40px_-24px_oklch(0.66_0.19_145/0.6)]"
                >
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary-soft text-primary">
                    <Sparkles className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 text-base font-bold tracking-tight">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="bg-surface py-20 md:py-24">
        <div className="mx-auto max-w-5xl px-4 md:px-6">
          <h2 className="text-center text-3xl font-black tracking-tight md:text-4xl">{service.processTitle}</h2>
          <ol className="mt-12 space-y-4">
            {service.steps.map((s, i) => (
              <motion.li
                key={s.title}
                initial={{ opacity: 0, x: -14 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.4, delay: i * 0.05 }}
                className="flex gap-4 rounded-2xl border border-border bg-card p-5 md:p-6"
              >
                <span className="grid h-10 w-10 flex-none place-items-center rounded-full bg-foreground text-sm font-black text-background">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-lg font-bold tracking-tight">{s.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                </div>
              </motion.li>
            ))}
          </ol>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-primary">Outcomes</h3>
              <ul className="mt-4 space-y-2.5">
                {service.outcomes.map((o) => (
                  <li key={o} className="flex items-start gap-2.5 text-sm text-foreground/85">
                    <span className="mt-0.5 grid h-4 w-4 flex-none place-items-center rounded-full bg-primary-soft text-primary">
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                    {o}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-primary">What You Receive</h3>
              <ul className="mt-4 space-y-2.5">
                {service.deliverables.map((d) => (
                  <li key={d} className="flex items-start gap-2.5 text-sm text-foreground/85">
                    <span className="mt-0.5 grid h-4 w-4 flex-none place-items-center rounded-full bg-primary-soft text-primary">
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* OTHER SERVICES */}
      <section className="bg-background py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <h2 className="text-center text-3xl font-black tracking-tight md:text-4xl">My Other Shopify Services</h2>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <Link
                key={r.slug}
                to="/services/$slug"
                params={{ slug: r.slug }}
                className="group rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_20px_44px_-26px_oklch(0.66_0.19_145/0.65)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary">{r.categoryTitle}</div>
                <h3 className="mt-2 text-lg font-bold tracking-tight">{r.name}</h3>
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{r.whatWeDoBody.split(".")[0]}.</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                  Learn more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link to="/services" className="inline-flex items-center gap-2 rounded-full border-2 border-primary px-6 py-3 text-sm font-semibold text-primary transition hover:bg-primary-soft">
              View All Services <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="bg-surface py-20 md:py-24">
        <div className="mx-auto max-w-3xl px-4 text-center md:px-6">
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Testimonial</div>
          <h2 className="mt-3 text-3xl font-black tracking-tight md:text-4xl">Stories That Speak for Themselves</h2>
          <div className="mt-10 rounded-3xl border border-border bg-card p-8 text-left md:p-10">
            <div className="flex items-center gap-1 text-primary">
              {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
            </div>
            <Quote className="mt-5 h-7 w-7 text-primary/40" aria-hidden="true" />
            <p className="mt-3 text-lg leading-relaxed text-foreground/90">"{service.testimonial.quote}"</p>
            <div className="mt-6 text-sm font-bold">{service.testimonial.name}</div>
            <div className="text-sm text-muted-foreground">{service.testimonial.meta}</div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-background py-16">
        <div className="mx-auto max-w-3xl px-4 text-center md:px-6">
          <h2 className="text-3xl font-black tracking-tight md:text-4xl">
            Let's Set Up <span className="text-primary">{service.name}</span> That Works for You
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90">
              Get A Free Store Audit <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-surface py-20 md:py-24">
        <div className="mx-auto max-w-3xl px-4 md:px-6">
          <h2 className="text-center text-3xl font-black tracking-tight md:text-4xl">Frequently Asked Questions</h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-muted-foreground">
            Everything worth knowing about {service.name.toLowerCase()} before we start.
          </p>
          <div className="mt-10 space-y-3">
            {service.faqs.map((f, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={f.q} className={`rounded-2xl border bg-card transition-colors ${isOpen ? "border-primary/40" : "border-border"}`}>
                  <h3>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background md:text-base"
                    >
                      {f.q}
                      <ChevronDown className={`h-5 w-5 flex-none text-primary transition-transform ${isOpen ? "rotate-180" : ""}`} aria-hidden="true" />
                    </button>
                  </h3>
                  {isOpen && <div className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">{f.a}</div>}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
