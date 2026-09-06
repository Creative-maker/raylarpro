import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Clock, Mail, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { PageHero } from "@/components/site-chrome";
import { POSTS } from "@/components/site-data";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog & Resources , Shopify Growth Tips | RaylarPro" },
      { name: "description", content: "Practical Shopify guides on CRO, SEO, speed, Klaviyo email flows, and product page design , from RaylarPro." },
      { property: "og:title", content: "Blog & Resources , RaylarPro" },
      { property: "og:description", content: "Guides and playbooks for growing your Shopify store." },
      { property: "og:url", content: "https://www.raylarpro.com/blog" },
    ],
    links: [{ rel: "canonical", href: "https://www.raylarpro.com/blog" }],
  }),
  component: BlogPage,
});

const TAGS = ["All", "CRO", "Email", "Performance", "Design", "SEO", "Strategy"] as const;

function BlogPage() {
  const [featured, ...rest] = POSTS;
  const [tag, setTag] = useState<(typeof TAGS)[number]>("All");
  const [q, setQ] = useState("");

  const filtered = useMemo(
    () =>
      rest.filter(
        (p) =>
          (tag === "All" || p.tag === tag) &&
          (q.trim() === "" || (p.title + " " + p.desc).toLowerCase().includes(q.toLowerCase()))
      ),
    [rest, tag, q]
  );

  return (
    <>
      <PageHero
        eyebrow="Blog & Resources"
        title="Playbooks for Shopify Growth"
        sub="Practical guides on conversion, SEO, speed, and email , pulled from real client work."
      />

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          {/* Featured */}
          <Link
            to="/blog/$slug"
            params={{ slug: featured.slug }}
            className="group grid overflow-hidden rounded-3xl bg-card ring-1 ring-border transition hover:shadow-xl md:grid-cols-2"
          >
            <div className="aspect-[16/10] overflow-hidden bg-muted md:aspect-auto">
              <img src={featured.img} alt={featured.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
            </div>
            <div className="flex flex-col justify-center p-8 md:p-10">
              <div className="flex items-center gap-3 text-xs font-semibold">
                <span className="rounded-full bg-primary px-2.5 py-0.5 text-primary-foreground">Featured</span>
                <span className="rounded-full bg-primary-soft px-2.5 py-0.5 text-accent-foreground">{featured.tag}</span>
                <span className="text-muted-foreground">{featured.date}</span>
                <span className="hidden items-center gap-1 text-muted-foreground sm:inline-flex">
                  <Clock className="h-3.5 w-3.5" /> {featured.readTime}
                </span>
              </div>
              <h2 className="mt-4 text-2xl font-extrabold tracking-tight md:text-3xl">{featured.title}</h2>
              <p className="mt-3 text-muted-foreground">{featured.desc}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                Read article <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </span>
            </div>
          </Link>

          {/* Filters */}
          <div className="mt-12 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap gap-2">
              {TAGS.map((t) => (
                <button
                  key={t}
                  onClick={() => setTag(t)}
                  className={`rounded-full px-4 py-1.5 text-sm font-semibold ring-1 transition ${
                    tag === t
                      ? "bg-primary text-primary-foreground ring-primary"
                      : "bg-card text-muted-foreground ring-border hover:text-foreground"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
            <label className="relative w-full md:w-72">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search articles"
                className="w-full rounded-full bg-card py-2 pl-10 pr-4 text-sm ring-1 ring-border outline-none focus:ring-primary"
              />
            </label>
          </div>

          {/* Grid */}
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
              <Link
                key={p.slug}
                to="/blog/$slug"
                params={{ slug: p.slug }}
                className="group overflow-hidden rounded-2xl bg-card ring-1 ring-border transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="aspect-[16/10] overflow-hidden bg-muted">
                  <img src={p.img} alt={p.title} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-3 text-xs font-semibold">
                    <span className="rounded-full bg-primary-soft px-2.5 py-0.5 text-accent-foreground">{p.tag}</span>
                    <span className="text-muted-foreground">{p.date}</span>
                    <span className="inline-flex items-center gap-1 text-muted-foreground">
                      <Clock className="h-3.5 w-3.5" /> {p.readTime}
                    </span>
                  </div>
                  <h3 className="mt-3 text-lg font-bold">{p.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
                  <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                    Read more <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                  </div>
                </div>
              </Link>
            ))}
            {filtered.length === 0 && (
              <p className="col-span-full py-12 text-center text-muted-foreground">No articles match your filters yet.</p>
            )}
          </div>

          {/* Newsletter */}
          <div className="mt-16 overflow-hidden rounded-3xl bg-surface p-8 ring-1 ring-border md:p-12">
            <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-primary text-primary-foreground">
                <Mail className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-2xl font-extrabold tracking-tight md:text-3xl">Get Shopify growth tips in your inbox</h3>
                <p className="mt-2 text-muted-foreground">One short email a month with a fresh audit playbook and the best article of the month. No fluff, unsubscribe anytime.</p>
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Thanks , you're on the list.");
                }}
                className="flex w-full max-w-md flex-col gap-2 sm:flex-row"
              >
                <input
                  type="email"
                  required
                  placeholder="you@brand.com"
                  className="flex-1 rounded-full bg-background px-5 py-3 text-sm ring-1 ring-border outline-none focus:ring-primary"
                />
                <button type="submit" className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
