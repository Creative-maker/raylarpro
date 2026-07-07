import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/site-chrome";
import { POSTS } from "@/components/site-data";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog & Resources — Shopify Growth Tips | RaylarPro" },
      { name: "description", content: "Practical Shopify guides on CRO, SEO, speed, Klaviyo email flows, and product page design — from RaylarPro." },
      { property: "og:title", content: "Blog & Resources — RaylarPro" },
      { property: "og:description", content: "Guides and playbooks for growing your Shopify store." },
    ],
  }),
  component: BlogPage,
});

function BlogPage() {
  const [featured, ...rest] = POSTS;
  return (
    <>
      <PageHero
        eyebrow="Blog & Resources"
        title="Playbooks for Shopify Growth"
        sub="Practical guides on conversion, SEO, speed, and email — pulled from real client work."
      />
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <article className="grid overflow-hidden rounded-3xl bg-card ring-1 ring-border md:grid-cols-2">
            <div className="aspect-[16/10] overflow-hidden bg-muted md:aspect-auto">
              <img src={featured.img} alt={featured.title} className="h-full w-full object-cover" />
            </div>
            <div className="flex flex-col justify-center p-8 md:p-10">
              <div className="flex items-center gap-3 text-xs font-semibold">
                <span className="rounded-full bg-primary-soft px-2.5 py-0.5 text-accent-foreground">{featured.tag}</span>
                <span className="text-muted-foreground">{featured.date}</span>
              </div>
              <h2 className="mt-4 text-2xl font-extrabold tracking-tight md:text-3xl">{featured.title}</h2>
              <p className="mt-3 text-muted-foreground">{featured.desc}</p>
              <a href="#" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
                Read article <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </article>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((p) => (
              <a key={p.slug} href="#" className="group overflow-hidden rounded-2xl bg-card ring-1 ring-border transition hover:-translate-y-1 hover:shadow-xl">
                <div className="aspect-[16/10] overflow-hidden bg-muted">
                  <img src={p.img} alt={p.title} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-3 text-xs font-semibold">
                    <span className="rounded-full bg-primary-soft px-2.5 py-0.5 text-accent-foreground">{p.tag}</span>
                    <span className="text-muted-foreground">{p.date}</span>
                  </div>
                  <h3 className="mt-3 text-lg font-bold">{p.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
                  <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                    Read more <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
