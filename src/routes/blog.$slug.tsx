import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Calendar, Clock, MessageCircle, Tag } from "lucide-react";
import { POSTS, CALENDLY, WHATSAPP } from "@/components/site-data";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = POSTS.find((p) => p.slug === params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return { meta: [{ title: "Article not found — RaylarPro" }, { name: "robots", content: "noindex" }] };
    }
    const p = loaderData.post;
    return {
      meta: [
        { title: `${p.title} — RaylarPro` },
        { name: "description", content: p.desc },
        { property: "og:title", content: p.title },
        { property: "og:description", content: p.desc },
        { property: "og:type", content: "article" },
        { property: "og:image", content: p.img },
        { property: "og:url", content: `/blog/${params.slug}` },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: p.img },
      ],
      links: [{ rel: "canonical", href: `/blog/${params.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: p.title,
            description: p.desc,
            image: p.img,
            datePublished: p.date,
            author: { "@type": "Person", name: "Yusuff Rasheed (RaylarPro)" },
          }),
        },
      ],
    };
  },
  notFoundComponent: PostNotFound,
  component: PostPage,
});

function PostPage() {
  const { post } = Route.useLoaderData();
  const related = POSTS.filter((p) => p.slug !== post.slug && p.tag === post.tag).slice(0, 3);
  const fallback = POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);
  const recs = related.length ? related : fallback;

  return (
    <>
      <article>
        {/* Hero */}
        <header className="bg-surface py-14 md:py-20">
          <div className="mx-auto max-w-3xl px-4 md:px-6">
            <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" /> Back to Blog
            </Link>
            <div className="mt-6 flex flex-wrap items-center gap-3 text-xs font-semibold">
              <span className="inline-flex items-center gap-1 rounded-full bg-primary-soft px-3 py-1 text-accent-foreground">
                <Tag className="h-3.5 w-3.5" /> {post.tag}
              </span>
              <span className="inline-flex items-center gap-1 text-muted-foreground">
                <Calendar className="h-3.5 w-3.5" /> {post.date}
              </span>
              <span className="inline-flex items-center gap-1 text-muted-foreground">
                <Clock className="h-3.5 w-3.5" /> {post.readTime}
              </span>
            </div>
            <h1 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight md:text-5xl">{post.title}</h1>
            <p className="mt-4 text-lg text-muted-foreground">{post.desc}</p>
            <div className="mt-6 flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-primary text-sm font-black text-primary-foreground">R</span>
              <div className="text-sm">
                <div className="font-semibold">Yusuff Rasheed</div>
                <div className="text-muted-foreground">Shopify Specialist · RaylarPro</div>
              </div>
            </div>
          </div>
        </header>

        {/* Cover */}
        <div className="mx-auto max-w-5xl px-4 md:px-6">
          <div className="-mt-8 overflow-hidden rounded-3xl ring-1 ring-border">
            <img src={post.img} alt={post.title} className="aspect-[16/9] w-full object-cover" />
          </div>
        </div>

        {/* Body */}
        <div className="mx-auto max-w-3xl px-4 py-14 md:px-6 md:py-16">
          <p className="text-lg leading-relaxed text-foreground/90">{post.intro}</p>
          {post.sections.map((s) => (
            <section key={s.heading} className="mt-10">
              <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">{s.heading}</h2>
              {s.body.map((para, i) => (
                <p key={i} className="mt-4 leading-relaxed text-foreground/90">
                  {para}
                </p>
              ))}
              {s.list && (
                <ul className="mt-4 space-y-2">
                  {s.list.map((li) => (
                    <li key={li} className="flex gap-3 leading-relaxed text-foreground/90">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      <span>{li}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          <div className="mt-12 rounded-2xl bg-primary-soft p-6 md:p-8">
            <div className="text-xs font-bold uppercase tracking-widest text-accent-foreground">Key takeaway</div>
            <p className="mt-2 text-lg font-medium text-foreground">{post.takeaway}</p>
          </div>

          {/* CTA */}
          <div className="mt-12 rounded-2xl bg-card p-6 ring-1 ring-border md:p-8">
            <h3 className="text-xl font-extrabold tracking-tight md:text-2xl">Want this applied to your store?</h3>
            <p className="mt-2 text-muted-foreground">Book a free 20-minute call or send me a message on WhatsApp — I will personally look at your store and tell you the three things I would fix first.</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a href={CALENDLY} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90">
                <Calendar className="h-4 w-4" /> Book a Free Call
              </a>
              <a href={WHATSAPP} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background hover:opacity-90">
                <MessageCircle className="h-4 w-4" /> WhatsApp Me
              </a>
            </div>
          </div>
        </div>
      </article>

      {/* Related */}
      <section className="border-t border-border bg-surface py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="flex items-end justify-between">
            <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">Keep reading</h2>
            <Link to="/blog" className="text-sm font-semibold text-primary hover:underline">All articles</Link>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recs.map((p) => (
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
                  </div>
                  <h3 className="mt-3 text-lg font-bold">{p.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
                  <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                    Read more <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function PostNotFound() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center md:px-6">
      <div className="text-xs font-bold uppercase tracking-widest text-primary">404</div>
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight md:text-4xl">Article not found</h1>
      <p className="mt-3 text-muted-foreground">The article you were looking for doesn't exist or has been moved.</p>
      <Link to="/blog" className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90">
        <ArrowLeft className="h-4 w-4" /> Back to Blog
      </Link>
    </div>
  );
}
