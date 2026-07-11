import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Calendar, MessageCircle } from "lucide-react";
import { PageHero } from "@/components/site-chrome";
import { FAQS, WHATSAPP, CALENDLY } from "@/components/site-data";
import { ServicesGrid } from "@/components/services-grid";
import { ServicesDetailed } from "@/components/services-detailed";
import { useState } from "react";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Shopify Store Setup, CRO & SEO | RaylarPro" },
      { name: "description", content: "Shopify store setup, redesign, CRO, technical SEO, speed optimization, Klaviyo email flows, and app integrations by RaylarPro." },
      { property: "og:title", content: "Services — RaylarPro" },
      { property: "og:description", content: "Everything you need to launch, optimize, and grow your Shopify store." },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <>
      <PageHero
        eyebrow="What I Do"
        title="Services Built to Grow Shopify Stores"
        sub="From new-store launches to full redesigns and ongoing growth work — pick the package that fits where you are today."
      />
      <ServicesGrid />
      <ServicesDetailed />




      <section className="bg-surface py-16">
        <div className="mx-auto max-w-3xl px-4 md:px-6">
          <h2 className="text-center text-3xl font-extrabold tracking-tight md:text-4xl">Frequently Asked Questions</h2>
          <div className="mt-10 space-y-3">
            {FAQS.map((f, i) => (
              <div key={f.q} className="rounded-xl border border-border bg-card">
                <button onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-semibold">
                  <span>{f.q}</span>
                  <ArrowRight className={`h-5 w-5 flex-none text-primary transition ${open === i ? "rotate-90" : ""}`} />
                </button>
                {open === i && (
                  <div className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">{f.a}</div>
                )}
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 transition">
              <MessageCircle className="h-4 w-4" /> Start a Project
            </Link>
            <a href={CALENDLY} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg border-2 border-primary bg-background px-6 py-3 text-sm font-semibold text-primary hover:bg-primary-soft transition">
              <Calendar className="h-4 w-4" /> Book a Call
            </a>
            <a href={WHATSAPP} target="_blank" rel="noreferrer" className="hidden">chat</a>
          </div>
        </div>
      </section>
    </>
  );
}
