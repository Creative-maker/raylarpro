import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, MessageCircle, Calendar, MapPin, Star } from "lucide-react";
import profileImg from "@/assets/about-shot.png";
import { PageHero } from "@/components/site-chrome";
import { CERTS, WHATSAPP, CALENDLY } from "@/components/site-data";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Yusuff Rasheed , RaylarPro Shopify Specialist" },
      { name: "description", content: "Meet Yusuff Rasheed, the Shopify Specialist behind RaylarPro. 500+ stores built, certified in CRO, SEO and Klaviyo email marketing." },
      { property: "og:title", content: "About RaylarPro" },
      { property: "og:description", content: "The Shopify Specialist behind 500+ stores built for real growth." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About" title="Meet the Person Behind RaylarPro" />
      <section className="py-16">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 md:px-6 lg:grid-cols-[auto_1fr]">
          <div className="mx-auto lg:mx-0">
            <div className="relative h-72 w-72 md:h-80 md:w-80">
              <div className="absolute inset-0 rounded-full ring-8 ring-primary/80" />
              <img src={profileImg} alt="Yusuff Rasheed" width={640} height={640} className="h-full w-full rounded-full object-cover" />
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">Yusuff Rasheed</h2>
            <div className="mt-3 flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center gap-1.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
                <span className="font-semibold">5.0</span>
              </div>
              <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                <MapPin className="h-4 w-4" /> United Kingdom · Worldwide
              </span>
            </div>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground md:text-lg">
              <p>
                I'm a Shopify Specialist with expertise in building, optimizing, and scaling Shopify
                stores for businesses across various industries. I help entrepreneurs and brands
                transform their ideas into professional, conversion-focused online stores designed
                for long-term growth.
              </p>
              <p>
                My services cover Shopify store setup and redesign, theme customization, product
                listing optimization, CRO, technical and on-page SEO, speed optimization, Shopify
                app integration, email marketing with Klaviyo, analytics setup, and sales funnel
                optimization.
              </p>
              <p>
                My goal is not just to build attractive stores, but to create eCommerce businesses
                that perform, convert visitors into customers, and continue growing over time.
              </p>
            </div>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                "Professional service from start to finish",
                "Complete dedication to your project",
                "Clear and open communication",
                "Quick turnaround times",
                "Real results you can measure",
                "Long-term growth strategies",
              ].map((x) => (
                <li key={x} className="flex items-start gap-3 rounded-lg bg-card p-3 ring-1 ring-border">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-primary" />
                  <span className="text-sm font-medium">{x}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 transition">
                <MessageCircle className="h-4 w-4" /> Work With Me
              </Link>
              <a href={CALENDLY} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg border-2 border-primary bg-background px-6 py-3 text-sm font-semibold text-primary hover:bg-primary-soft transition">
                <Calendar className="h-4 w-4" /> Book a Call
              </a>
              <a href={WHATSAPP} target="_blank" rel="noreferrer" className="hidden">wa</a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <h2 className="text-center text-3xl font-extrabold tracking-tight md:text-4xl">Certifications & Achievements</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {CERTS.map((c) => (
              <div key={c.title} className="rounded-2xl border border-border bg-card p-6">
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
    </>
  );
}
