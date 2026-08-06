import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Check, ExternalLink, Quote, TrendingUp } from "lucide-react";
import { CASE_STUDIES, getCaseStudy, type CaseStudy } from "@/components/case-study-data";
import { StoreThumb } from "@/components/store-thumb";
import { CaseStudyChart } from "@/components/case-study-chart";
import { CALENDLY } from "@/components/site-data";

export const Route = createFileRoute("/case-studies/$slug")({
  loader: ({ params }) => {
    const study = getCaseStudy(params.slug);
    if (!study) throw notFound();
    return { study };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Case study unavailable — RaylarPro" }, { name: "robots", content: "noindex" }] };
    }
    const s = loaderData.study;
    const desc = `${s.title} Shopify case study: the audit, the rebuild, the lifecycle work and the before-and-after numbers from a ${s.industry.toLowerCase()} store in ${s.country}.`;
    return {
      meta: [
        { title: `${s.title} Case Study — Shopify Growth by RaylarPro` },
        { name: "description", content: desc },
        { property: "og:title", content: `${s.headline}` },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: CaseStudyPage,
  notFoundComponent: CaseStudyMissing,
});

function CaseStudyMissing() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-32 text-center">
      <h1 className="text-3xl font-black tracking-tight">Case study not found</h1>
      <p className="mt-3 text-muted-foreground">This store may have been renamed or removed.</p>
      <Link to="/case-studies" className="mt-8 inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background">
        Back to all case studies <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}

function CaseStudyPage() {
  const { study: s } = Route.useLoaderData() as { study: CaseStudy };
  const others = CASE_STUDIES.filter((c) => c.slug !== s.slug).slice(0, 6);

  return (
    <article>
      {/* Hero */}
      <header className="relative overflow-hidden border-b border-border bg-surface py-16 md:py-24">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
        </div>
        <div className="mx-auto grid max-w-7xl gap-10 px-4 md:px-6 lg:grid-cols-[1.15fr_1fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Case Study · {s.tag}
            </div>
            <h1 className="mt-5 text-4xl font-black leading-[1.08] tracking-tight md:text-5xl">{s.headline}</h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">{s.summary}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href={s.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition hover:opacity-90">
                Visit {s.host} <ExternalLink className="h-4 w-4" />
              </a>
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold transition hover:border-primary/50">
                Start a project like this <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
          <div className="overflow-hidden rounded-3xl ring-1 ring-border">
            <StoreThumb url={s.url} title={s.title} />
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 md:px-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        {/* Main report */}
        <div className="min-w-0">
          <Section title="How it started">
            {s.intro.map((p) => (
              <p key={p} className="mt-4 text-[15px] leading-8 text-foreground/85">{p}</p>
            ))}
          </Section>

          <Section title={`Meet ${s.title}`}>
            {s.meet.map((p) => (
              <p key={p} className="mt-4 text-[15px] leading-8 text-foreground/85">{p}</p>
            ))}
          </Section>

          {/* Before / After */}
          <Section title="Before and after">
            <p className="mt-4 text-[15px] leading-8 text-foreground/85">
              The <strong>Before</strong> column is an indicative sample baseline captured during the audit period.
              The <strong>After</strong> column reflects the store&apos;s performance once the work was live.
            </p>
            <div className="mt-6 overflow-hidden rounded-2xl border border-border">
              <table className="w-full text-left text-sm">
                <thead className="bg-surface text-xs uppercase tracking-[0.14em] text-muted-foreground">
                  <tr>
                    <th scope="col" className="px-4 py-3 font-bold">Metric</th>
                    <th scope="col" className="px-4 py-3 font-bold">Before (sample)</th>
                    <th scope="col" className="px-4 py-3 font-bold">After (actual)</th>
                    <th scope="col" className="px-4 py-3 text-right font-bold">Change</th>
                  </tr>
                </thead>
                <tbody>
                  {s.metrics.map((m) => (
                    <tr key={m.label} className="border-t border-border">
                      <th scope="row" className="px-4 py-3 text-left font-semibold">{m.label}</th>
                      <td className="px-4 py-3 text-muted-foreground">{m.before}</td>
                      <td className="px-4 py-3 font-bold">{m.after}</td>
                      <td className="px-4 py-3 text-right">
                        <span className="inline-flex items-center gap-1 rounded-full bg-primary-soft px-2 py-0.5 text-xs font-bold text-primary">
                          <TrendingUp className="h-3 w-3" aria-hidden="true" />
                          {m.delta}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>

          <Section title="The challenge">
            <p className="mt-4 text-[15px] leading-8 text-foreground/85">{s.challengeIntro}</p>
            <ul className="mt-5 space-y-3">
              {s.challenges.map((c) => (
                <li key={c} className="flex gap-3 rounded-xl border border-border bg-card p-4 text-[15px] leading-7">
                  <span className="mt-1 h-2 w-2 flex-none rounded-full bg-primary" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section title="The work, step by step">
            <p className="mt-4 text-[15px] leading-8 text-foreground/85">{s.strategyIntro}</p>
            <ol className="mt-6 space-y-5">
              {s.workstreams.map((w, i) => (
                <li key={w.title} className="rounded-2xl border border-border bg-card p-5">
                  <div className="flex items-baseline gap-3">
                    <span className="text-xs font-black text-primary">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="text-base font-bold tracking-tight">{w.title}</h3>
                  </div>
                  <p className="mt-2 text-[15px] leading-7 text-muted-foreground">{w.body}</p>
                </li>
              ))}
            </ol>
          </Section>

          <Section title="How the project ran">
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {s.timeline.map((t) => (
                <div key={t.phase} className="rounded-2xl border border-border bg-card p-5">
                  <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">{t.phase}</div>
                  <div className="mt-1 text-base font-bold">{t.label}</div>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">{t.body}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section title="The results">
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {s.results.map((r) => (
                <div key={r.title} className="rounded-2xl border border-border bg-card p-5">
                  <div className="flex items-center gap-2">
                    <span className="grid h-5 w-5 place-items-center rounded-full bg-primary-soft text-primary">
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                    <h3 className="text-sm font-bold">{r.title}</h3>
                  </div>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">{r.body}</p>
                </div>
              ))}
            </div>
          </Section>

          <figure className="mt-12 rounded-3xl border border-border bg-surface p-7">
            <Quote className="h-6 w-6 text-primary" aria-hidden="true" />
            <blockquote className="mt-3 text-lg font-medium leading-8">&ldquo;{s.quote.text}&rdquo;</blockquote>
            <figcaption className="mt-4 text-sm text-muted-foreground">
              <span className="font-bold text-foreground">{s.quote.name}</span> · {s.quote.role}
            </figcaption>
          </figure>

          <Section title="The takeaway">
            <p className="mt-4 text-[15px] leading-8 text-foreground/85">{s.takeaway}</p>
          </Section>
        </div>

        {/* Sidebar */}
        <aside className="lg:sticky lg:top-28 lg:h-fit">
          <div className="rounded-3xl border border-border bg-card p-6">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Project facts</h2>
            <dl className="mt-4 space-y-4 text-sm">
              <Fact label="Business name" value={s.title} />
              <Fact label="Industry" value={s.industry} />
              <Fact label="Country" value={s.country} />
              <Fact label="Trading since" value={s.founded} />
              <Fact label="Catalogue" value={s.products} />
              <Fact label="Store" value={s.host} href={s.url} />
              <Fact label="Headline result" value={`${s.metrics[0]!.label} ${s.metrics[0]!.delta}`} />
            </dl>
            <a href={CALENDLY} target="_blank" rel="noreferrer" className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition hover:opacity-90">
              Book a free store audit <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </aside>
      </div>

      {/* Other case studies */}
      <section className="border-t border-border bg-surface py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <h2 className="text-2xl font-black tracking-tight md:text-3xl">Other case studies</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((c) => (
              <Link
                key={c.slug}
                to="/case-studies/$slug"
                params={{ slug: c.slug }}
                className="group rounded-2xl border border-border bg-card p-5 transition hover:-translate-y-0.5 hover:border-primary/40"
              >
                <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary">{c.tag}</div>
                <div className="mt-2 font-bold leading-snug">{c.headline}</div>
                <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                  Read more <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-12 first:mt-0">
      <h2 className="text-2xl font-black tracking-tight md:text-3xl">{title}</h2>
      {children}
    </section>
  );
}

function Fact({ label, value, href }: { label: string; value: string; href?: string }) {
  return (
    <div>
      <dt className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">{label}</dt>
      <dd className="mt-0.5 font-semibold">
        {href ? (
          <a href={href} target="_blank" rel="noreferrer" className="text-primary underline-offset-4 hover:underline">{value}</a>
        ) : (
          value
        )}
      </dd>
    </div>
  );
}
