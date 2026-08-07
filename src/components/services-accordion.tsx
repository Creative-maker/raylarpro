import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ChevronDown, Check, ArrowRight } from "lucide-react";
import { SERVICE_CATEGORIES } from "@/components/services-catalog";

export function ServicesAccordion() {
  const [open, setOpen] = useState<string | null>(SERVICE_CATEGORIES[0]!.slug);

  // Open + scroll to the category referenced in the URL hash (e.g. /services#seo-ai-search)
  useEffect(() => {
    const applyHash = () => {
      const slug = window.location.hash.replace("#", "");
      if (!slug) return;
      if (!SERVICE_CATEGORIES.some((c) => c.slug === slug)) return;
      setOpen(slug);
      requestAnimationFrame(() => {
        document.getElementById(slug)?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    };
    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, []);

  return (
    <section
      id="service-categories"
      className="relative overflow-hidden bg-background py-20 scroll-mt-24 md:py-28"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[380px] w-[680px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-4xl px-4 md:px-6">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Service Categories
          </div>
          <h2 className="mt-5 text-4xl font-black tracking-tight md:text-5xl">
            Explore Each <span className="text-primary">Category</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
            Expand a category to see the full description and every service included.
          </p>
        </div>

        <div className="mt-12 space-y-3">
          {SERVICE_CATEGORIES.map((c) => {
            const isOpen = open === c.slug;
            return (
              <div
                key={c.slug}
                id={c.slug}
                className={`overflow-hidden rounded-2xl border bg-card transition-colors scroll-mt-28 ${
                  isOpen ? "border-primary/40" : "border-border"
                }`}
              >
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`${c.slug}-panel`}
                    id={`${c.slug}-trigger`}
                    onClick={() => setOpen(isOpen ? null : c.slug)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background hover:bg-primary-soft/40 md:px-6"
                  >
                    <span className="min-w-0">
                      <span className="block text-[11px] font-bold uppercase tracking-[0.2em] text-primary">
                        {c.label}
                      </span>
                      <span className="mt-1 block text-lg font-bold tracking-tight md:text-xl">
                        {c.title}
                      </span>
                    </span>
                    <span className="flex flex-none items-center gap-3">
                      <span className="hidden rounded-full bg-primary-soft px-2.5 py-1 text-[11px] font-bold text-primary sm:inline">
                        {c.items.length} services
                      </span>
                      <ChevronDown
                        aria-hidden="true"
                        className={`h-5 w-5 text-primary transition-transform duration-300 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </span>
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="panel"
                      id={`${c.slug}-panel`}
                      role="region"
                      aria-labelledby={`${c.slug}-trigger`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-border px-5 pb-6 pt-5 md:px-6">
                        <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
                          {c.desc}
                        </p>
                        <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                          {c.items.map((it) => (
                            <li key={it}>
                              <Link
                                to="/services/$slug"
                                params={{ slug: slugify(it) }}
                                className="group flex items-start gap-2.5 rounded-lg px-2 py-1.5 text-sm text-foreground/85 transition hover:bg-primary-soft/50 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                              >
                                <span className="mt-0.5 grid h-4 w-4 flex-none place-items-center rounded-full bg-primary-soft text-primary">
                                  <Check className="h-3 w-3" strokeWidth={3} />
                                </span>
                                <span className="flex-1">{it}</span>
                                <ArrowRight className="mt-0.5 h-3.5 w-3.5 flex-none text-primary opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100" aria-hidden="true" />
                              </Link>
                            </li>
                          ))}
                        </ul>
                        <div className="mt-6">
                          <Link
                            to="/contact"
                            className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                          >
                            Discuss {c.title}
                            <ArrowRight className="h-4 w-4" aria-hidden="true" />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
