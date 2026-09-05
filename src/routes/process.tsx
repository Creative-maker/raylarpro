import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight, Search, PenTool, Code2, Rocket, LineChart, LifeBuoy, Check,
} from "lucide-react";
import { PageHero } from "@/components/site-chrome";

const STEPS = [
  {
    icon: Search,
    title: "Discovery & Store Audit",
    duration: "Days 1–3",
    desc: "I start with a full technical and conversion audit of your store , speed, checkout friction, product pages, trust signals, SEO and analytics. You get a written report with the exact revenue leaks I find.",
    points: ["Kick-off call & goal setting", "Full 40-point store audit", "Competitor & benchmark review", "Prioritised opportunity list"],
  },
  {
    icon: PenTool,
    title: "Strategy & Roadmap",
    duration: "Days 4–7",
    desc: "We turn findings into a prioritised roadmap ranked by revenue impact versus effort, so the highest-value work ships first instead of getting buried in a backlog.",
    points: ["Impact vs. effort scoring", "Wireframes for key templates", "Scope, timeline & milestones", "Success metrics agreed upfront"],
  },
  {
    icon: Code2,
    title: "Design & Build",
    duration: "Weeks 2–4",
    desc: "Theme development, custom sections, app integrations and performance work , built cleanly on your live theme's duplicate so your store keeps selling while we work.",
    points: ["Conversion-first UI design", "Custom Liquid sections", "App & integration setup", "Mobile-first performance budget"],
  },
  {
    icon: Rocket,
    title: "QA & Launch",
    duration: "Launch week",
    desc: "Every template is tested across devices, browsers and the full checkout path before go-live. Launch happens with a rollback plan and zero downtime.",
    points: ["Cross-device & browser QA", "Checkout & payment testing", "Analytics + events verified", "Zero-downtime deployment"],
  },
  {
    icon: LineChart,
    title: "Optimise & Scale",
    duration: "Ongoing",
    desc: "Post-launch, we measure what actually changed. A/B tests, email flows and iterative CRO work compound your results month after month.",
    points: ["A/B testing programme", "Klaviyo flow optimisation", "Monthly performance reporting", "SEO & content growth"],
  },
  {
    icon: LifeBuoy,
    title: "Support & Partnership",
    duration: "Always on",
    desc: "You get a direct line for fixes, questions and new ideas , no ticket queues. Most clients stay on a retainer because the work keeps paying for itself.",
    points: ["Direct WhatsApp / email access", "Priority bug fixes", "Quarterly growth reviews", "Roadmap for the next quarter"],
  },
];

export const Route = createFileRoute("/process")({
  head: () => ({
    meta: [
      { title: "My Work Process , How RaylarPro Delivers Shopify Growth" },
      {
        name: "description",
        content:
          "A transparent six-stage Shopify workflow: discovery audit, strategy roadmap, design and build, QA and launch, optimisation, and ongoing partnership.",
      },
      { property: "og:title", content: "My Work Process , RaylarPro" },
      { property: "og:description", content: "The six-stage workflow behind every Shopify project I deliver." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://raylarpro.lovable.app/process" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://raylarpro.lovable.app/process" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: "The RaylarPro Shopify Growth Process",
          description: "How RaylarPro takes a Shopify store from audit to sustained growth.",
          step: STEPS.map((s, i) => ({
            "@type": "HowToStep",
            position: i + 1,
            name: s.title,
            text: s.desc,
          })),
        }),
      },
    ],
  }),
  component: ProcessPage,
});

function ProcessPage() {
  return (
    <>
      <PageHero
        eyebrow="My Work Process"
        title="How Great Shopify Stores Actually Get Built"
        sub="A transparent, six-stage workflow , so you always know what is happening, what comes next, and how it moves revenue."
      />

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-4 md:px-6">
          <div className="relative">
            <div className="pointer-events-none absolute left-[27px] top-4 hidden h-[calc(100%-2rem)] w-px bg-gradient-to-b from-primary/60 via-border to-transparent md:block" />
            <div className="space-y-6">
              {STEPS.map((s, i) => (
                <motion.article
                  key={s.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.45, delay: i * 0.05 }}
                  className="relative flex flex-col gap-5 rounded-3xl border border-border bg-card p-6 md:flex-row md:p-8"
                >
                  <div className="flex items-center gap-4 md:block">
                    <span className="grid h-14 w-14 flex-none place-items-center rounded-2xl bg-foreground text-background shadow-[0_10px_30px_-12px_oklch(0.66_0.19_145/0.6)]">
                      <s.icon className="h-6 w-6 text-primary" />
                    </span>
                    <span className="mt-3 block text-xs font-bold uppercase tracking-[0.18em] text-primary md:text-center">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="text-xl font-extrabold tracking-tight md:text-2xl">{s.title}</h2>
                      <span className="rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-accent-foreground">
                        {s.duration}
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">{s.desc}</p>
                    <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                      {s.points.map((p) => (
                        <li key={p} className="flex items-start gap-2.5 text-sm text-foreground/85">
                          <span className="mt-0.5 grid h-4 w-4 flex-none place-items-center rounded-full bg-primary-soft text-primary">
                            <Check className="h-3 w-3" strokeWidth={3} />
                          </span>
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>

          <div className="mt-14 rounded-3xl bg-surface p-8 text-center ring-1 ring-border md:p-12">
            <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">Ready to start at stage one?</h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              Every project begins with a free store audit. No obligation , you keep the report either way.
            </p>
            <Link
              to="/contact"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
            >
              Get My Free Audit <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
