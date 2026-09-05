import { useState } from "react";
import { ChevronDown, LifeBuoy, ShieldCheck, ShoppingBag, Sparkles } from "lucide-react";

type QA = { q: string; a: string };

const GROUPS: { key: string; label: string; icon: typeof Sparkles; faqs: QA[] }[] = [
  {
    key: "services",
    label: "Services",
    icon: Sparkles,
    faqs: [
      { q: "Which Shopify services do you actually offer?", a: "Seven categories: Shopify development, store optimisation & CRO, SEO & AI search, paid growth (SEM), email & SMS marketing, integrations & AI automation, and growth consultancy , 42 individual services in total, each with its own page." },
      { q: "Can I book a single service or do I need a package?", a: "Single services are fine. Most brands start with one clearly scoped piece of work, see the result, then expand. There is no minimum retainer." },
      { q: "How quickly can you start?", a: "Discovery calls are usually available within 48 hours, and build slots typically open within one to two weeks. Urgent fixes and troubleshooting can often be picked up same week." },
      { q: "Do you work with brands outside the UK?", a: "Yes. I work with merchants across the UK, EU, US and Africa, with overlapping hours arranged at kickoff so communication never stalls." },
    ],
  },
  {
    key: "trust",
    label: "Trust",
    icon: ShieldCheck,
    faqs: [
      { q: "What proof do you have of past results?", a: "Every store I have worked on has a published case study with a documented before-and-after: baseline metrics, the work carried out, and the measured outcome. Nothing is anonymised or vague." },
      { q: "Who actually does the work?", a: "I do. There is no junior handoff and no white-labelled subcontracting. You speak to the person writing the code and reading the analytics." },
      { q: "Is my store data safe?", a: "Access is requested at the minimum permission level needed, credentials are never shared, staff accounts are removed at project close, and NDAs are signed on request." },
      { q: "How do you communicate during a project?", a: "A shared board for progress, weekly written updates, and Loom videos for anything visual. No silent weeks and no surprise invoices." },
    ],
  },
  {
    key: "products",
    label: "Products",
    icon: ShoppingBag,
    faqs: [
      { q: "Which platforms and tools do you build on?", a: "Shopify and Shopify Plus first, with Liquid, headless Hydrogen, Klaviyo, Google Ads, GA4, Shopify Flow and the main CRM/ERP integrations around it." },
      { q: "Do you build custom Shopify apps?", a: "Yes , private and public apps, custom checkout extensions and API integrations where an off-the-shelf app cannot do the job or costs more than it returns." },
      { q: "Will I own everything you build?", a: "Completely. Code, theme files, accounts, documentation and assets are yours, transferred at handover with nothing held hostage." },
      { q: "Can you migrate my store from another platform?", a: "Yes. WooCommerce, Magento, BigCommerce, Wix and custom builds , products, customers, orders, content and SEO redirects all transfer with a validation report." },
    ],
  },
  {
    key: "guarantee",
    label: "Guarantee",
    icon: LifeBuoy,
    faqs: [
      { q: "What is your guarantee?", a: "If a delivered item does not match the written scope we agreed, it is fixed at no additional cost. Scope is agreed in writing before work starts, so there is never a dispute about what was promised." },
      { q: "What if the results do not land?", a: "Baselines are recorded before work begins. If a change underperforms, it is rolled back or iterated within the engagement rather than left in place and reported as a win." },
      { q: "How do payments work?", a: "Milestone based , typically 50% to reserve the slot and 50% on delivery. Larger builds are split across monthly milestones. No hidden fees or surprise change orders." },
      { q: "What support do I get after launch?", a: "30 days of post-launch support is included with every project, covering bug fixes and questions. Optional monthly care plans are available afterwards, cancellable any time." },
    ],
  },
];

export function FooterFaq() {
  const [group, setGroup] = useState(GROUPS[0]!.key);
  const [open, setOpen] = useState<string | null>(GROUPS[0]!.faqs[0]!.q);
  const active = GROUPS.find((g) => g.key === group)!;

  return (
    <section className="relative border-b border-black/5 py-20">
      <div className="mx-auto max-w-5xl px-4 md:px-6">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/60 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#16A34A] backdrop-blur">
            FAQ
          </span>
          <h2 className="mt-5 text-3xl font-extrabold tracking-tight md:text-4xl">
            Answers Before You <span className="text-[#16A34A]">Ask</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-black/60 md:text-base">
            Services, trust, products and guarantees , the questions merchants ask most, answered plainly.
          </p>
        </div>

        <div className="mt-9 flex flex-wrap justify-center gap-2" role="tablist" aria-label="FAQ categories">
          {GROUPS.map(({ key, label, icon: Icon }) => {
            const isActive = key === group;
            return (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => {
                  setGroup(key);
                  setOpen(GROUPS.find((g) => g.key === key)!.faqs[0]!.q);
                }}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16A34A] focus-visible:ring-offset-2 ${
                  isActive
                    ? "border-transparent bg-[#0B0B0B] text-white shadow-[0_10px_30px_-12px_rgba(22,163,74,0.8)]"
                    : "border-black/10 bg-white text-black/70 hover:border-[#16A34A]/40 hover:text-[#16A34A]"
                }`}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                {label}
              </button>
            );
          })}
        </div>

        <div className="mt-8 space-y-3">
          {active.faqs.map((f) => {
            const isOpen = open === f.q;
            return (
              <div
                key={f.q}
                className={`rounded-2xl border bg-white/70 backdrop-blur transition-colors ${
                  isOpen ? "border-[#16A34A]/40" : "border-black/10"
                }`}
              >
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? null : f.q)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16A34A] focus-visible:ring-offset-2 md:text-base"
                  >
                    {f.q}
                    <ChevronDown
                      aria-hidden="true"
                      className={`h-5 w-5 flex-none text-[#16A34A] transition-transform ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                </h3>
                {isOpen && <div className="px-5 pb-5 text-sm leading-relaxed text-black/60">{f.a}</div>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
