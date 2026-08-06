import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Star } from "lucide-react";
import { PageHero } from "@/components/site-chrome";
import { PROJECTS, REVIEWS } from "@/components/site-data";
import { CASE_STUDIES } from "@/components/case-study-data";
import { StoreThumb } from "@/components/store-thumb";

export const Route = createFileRoute("/case-studies/")({
  head: () => ({
    meta: [
      { title: "Case Studies — Shopify Stores by RaylarPro" },
      { name: "description", content: "Explore Shopify stores designed, built and optimized by RaylarPro across fashion, wellness, skincare, sportswear and lifestyle brands." },
      { property: "og:title", content: "Case Studies — RaylarPro" },
      { property: "og:description", content: "A showcase of Shopify stores built for real growth." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CaseStudiesPage,
});

function CaseStudiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Case Studies"
        title="Stores Built to Sell"
        sub="A collection of Shopify stores I have designed, developed, and optimized — each tailored to the brand's audience and goals."
      />
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PROJECTS.map((p, i) => {
              const study = CASE_STUDIES[i]!;
              return (
                <div key={p.url} className="group overflow-hidden rounded-2xl bg-card ring-1 ring-border transition hover:-translate-y-1 hover:shadow-xl">
                  <Link to="/case-studies/$slug" params={{ slug: study.slug }} className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                    <StoreThumb url={p.url} title={p.title} img={p.img} />
                  </Link>

                  <div className="p-5">
                    <div className="mb-2 inline-flex rounded-full bg-primary-soft px-2.5 py-0.5 text-xs font-semibold text-accent-foreground">{p.tag}</div>
                    <h2 className="text-lg font-bold">
                      <Link to="/case-studies/$slug" params={{ slug: study.slug }} className="hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                        {p.title}
                      </Link>
                    </h2>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
                    <div className="mt-4 flex items-center justify-between gap-3">
                      <Link to="/case-studies/$slug" params={{ slug: study.slug }} className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                        Read case study <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                      </Link>
                      <a href={p.url} target="_blank" rel="noreferrer" className="text-xs font-semibold text-muted-foreground hover:text-foreground">
                        Visit site ↗
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-surface py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <h2 className="text-center text-3xl font-extrabold tracking-tight md:text-4xl">What Clients Are Saying</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {REVIEWS.map((r) => (
              <div key={r.name} className="rounded-2xl bg-card p-6 ring-1 ring-border">
                <div className="mb-3 flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm leading-relaxed text-foreground">{r.quote}</p>
                <div className="mt-5 flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-primary-soft font-bold text-primary">{r.name.charAt(0)}</div>
                  <div>
                    <div className="text-sm font-bold">{r.name}</div>
                    <div className="text-xs text-muted-foreground">{r.loc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
