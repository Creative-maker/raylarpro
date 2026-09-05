import { SERVICE_CATEGORIES } from "./services-catalog";

export type Pillar = { title: string; desc: string };
export type Step = { title: string; desc: string };
export type QA = { q: string; a: string };

export type ServicePage = {
  slug: string;
  name: string;
  categorySlug: string;
  categoryTitle: string;
  categoryLabel: string;
  badge: string;
  heroTitle: string;
  heroSub: string;
  whatWeDoTitle: string;
  whatWeDoBody: string;
  pillars: Pillar[];
  processTitle: string;
  steps: Step[];
  outcomes: string[];
  deliverables: string[];
  stats: { value: string; label: string }[];
  testimonial: { quote: string; name: string; meta: string };
  faqs: QA[];
};

export const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/\([^)]*\)/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/** Tiny deterministic hash so every service reads differently but stays stable. */
function hash(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}
const pick = <T,>(arr: T[], seed: number, offset = 0) => arr[(seed + offset) % arr.length]!;

const HERO_VERBS = [
  "Set Up",
  "Fine-Tune",
  "Scale",
  "Engineer",
  "Future-Proof",
  "Rebuild",
];

const HERO_SUBS = [
  "Give your store the best possible start. A clean, launch-ready foundation that is organised, optimised and easy to manage , so you can focus on growing the brand while the store takes care of sales.",
  "Stop guessing what is holding revenue back. Get a measured, documented improvement programme with clear before-and-after numbers you can take to the board.",
  "Built the way high-growth Shopify brands build: fast, tested, documented, and handed over so your team can run it without me in the room.",
  "Every change is tied to a metric. Nothing ships unless it makes the store faster, clearer, or more profitable.",
];

const PILLAR_TEMPLATES: ((n: string, c: string) => Pillar)[] = [
  (n) => ({
    title: `End-to-End ${n}`,
    desc: `Everything is handled , discovery, build, QA and handover , so ${n.toLowerCase()} is delivered complete, without loose ends or half-finished tickets.`,
  }),
  () => ({
    title: "Speed, Stability and Store Performance",
    desc: "Loading times are optimised, technical bottlenecks are removed, and Core Web Vitals are monitored so customers get a seamless experience on every device.",
  }),
  () => ({
    title: "Smooth Management and Maintenance",
    desc: "Regular updates, backups, app hygiene and performance checks keep the store running efficiently every day after launch , not just on day one.",
  }),
  () => ({
    title: "Scalable, Growth-Ready Structure",
    desc: "Clean collections, SEO-ready templates and dependable integrations give your brand a structure that still works at ten times the traffic.",
  }),
  () => ({
    title: "Measurable Commercial Outcomes",
    desc: "Baselines are captured before work starts, so the impact on conversion rate, AOV and revenue per session is visible rather than assumed.",
  }),
  () => ({
    title: "Documentation Your Team Can Use",
    desc: "Loom walkthroughs, written SOPs and a change log mean your internal team can maintain and extend the work confidently.",
  }),
];

const STEP_SETS: Step[][] = [
  [
    { title: "Discovery & Planning", desc: "We map your products, customers and commercial goals, then agree scope, timeline and the metrics this engagement is judged on." },
    { title: "Setup & Configuration", desc: "Core configuration is completed , settings, taxes, shipping, payments, domains, apps and integrations , with a documented checklist." },
    { title: "Content & Design Alignment", desc: "Templates, collections and content are aligned to the brand so the storefront looks intentional and merchandises properly." },
    { title: "Review & Launch Prep", desc: "Cross-device QA, analytics validation, redirects and a full pre-launch checklist before anything goes live." },
    { title: "Post-Launch Support", desc: "After launch I keep monitoring performance, managing updates and maintaining apps so the experience stays frictionless for you and your customers." },
  ],
  [
    { title: "Audit & Baseline", desc: "Current performance is measured and recorded , analytics, session recordings, field data and revenue per session , so improvement is provable." },
    { title: "Opportunity Mapping", desc: "Findings are ranked by expected impact against effort, producing a prioritised roadmap rather than a list of opinions." },
    { title: "Build & Implement", desc: "Changes are built on a staging theme, peer-reviewed and shipped in controlled batches so nothing destabilises the live store." },
    { title: "Validate & Measure", desc: "Each release is measured against the baseline; anything that underperforms is rolled back or iterated." },
    { title: "Scale What Works", desc: "Winning patterns are rolled out across templates, and the roadmap is refreshed with the next tier of opportunities." },
  ],
  [
    { title: "Technical Discovery", desc: "Theme, apps, data layer and third-party scripts are inventoried to understand exactly what the store is carrying today." },
    { title: "Architecture & Spec", desc: "A written technical specification defines the data model, integration points, edge cases and acceptance criteria before a line of code is written." },
    { title: "Implementation", desc: "Work is delivered in reviewable increments with version control, so you can see progress weekly instead of waiting for a big reveal." },
    { title: "Testing & Hardening", desc: "Functional, cross-browser, mobile and load testing, plus error monitoring so failures surface before customers find them." },
    { title: "Handover & Support", desc: "Documentation, training and a support window so your team owns the result with confidence." },
  ],
];

const OUTCOME_POOL = [
  "Higher conversion rate on the templates that carry most of your traffic",
  "Faster load times and improved Core Web Vitals on mobile",
  "Fewer support tickets caused by broken or confusing store behaviour",
  "A cleaner, more merchandisable catalogue structure",
  "Better attribution, so you can see which channels actually pay",
  "More revenue per session without buying more traffic",
  "A store your team can update without developer help",
  "Reduced app bloat and lower monthly running costs",
];

const DELIVERABLE_POOL = [
  "Written scope and timeline agreed up front",
  "Staging environment for safe review",
  "Full QA report across desktop, tablet and mobile",
  "Analytics and event tracking validated",
  "Loom video walkthrough of everything delivered",
  "Written SOP for ongoing maintenance",
  "Before-and-after performance report",
  "30 days of post-launch support",
];

const QUOTES = [
  { quote: "What stood out most was the reliability. Everything landed on time, and I never had to chase an update. The work paid for itself in the first month.", name: "Marcus Chen", meta: "eCommerce Founder" },
  { quote: "Finally someone who explains the commercial reasoning, not just the code. Our store is faster, cleaner and customers are actually completing checkout.", name: "Rachel Foster", meta: "Boutique Owner" },
  { quote: "We had three agencies before this. The difference was the measurement , every change came with a number attached.", name: "Daniel Wright", meta: "DTC Brand" },
  { quote: "Professional, calm and genuinely invested in the outcome. Our revenue per session is up and the team can finally manage the store themselves.", name: "Amara Okafor", meta: "Head of eCommerce" },
];

const STAT_SETS = [
  [
    { value: "530+", label: "Shopify stores delivered" },
    { value: "7 days", label: "Typical launch window" },
    { value: "5.0", label: "Average client rating" },
  ],
  [
    { value: "+38%", label: "Average conversion lift" },
    { value: "<2.5s", label: "Target LCP on mobile" },
    { value: "300+", label: "Brands supported" },
  ],
  [
    { value: "12 yrs", label: "eCommerce experience" },
    { value: "24 hrs", label: "Support response time" },
    { value: "98%", label: "Clients who return" },
  ],
];

function buildFaqs(name: string, category: string, seed: number): QA[] {
  const base: QA[] = [
    {
      q: `What's included in your ${name} service?`,
      a: `${name} covers discovery, implementation, quality assurance and handover. You get a written scope before anything starts, a staging environment to review the work, full cross-device testing, and documentation so your team can maintain it afterwards. Post-launch support is included for 30 days.`,
    },
    {
      q: `How long does ${name} usually take?`,
      a: `Most ${name.toLowerCase()} engagements run between two and six weeks depending on catalogue size, the number of integrations, and how quickly content and approvals come back. A firm timeline is confirmed after the discovery call , and I hold to it.`,
    },
    {
      q: "Do I need to buy a Shopify plan before we start?",
      a: "You can start on a free Shopify development store and only move to a paid plan when you are ready to launch. If you already have a plan, we work inside it. I will advise which tier genuinely fits your order volume rather than upselling you to Plus.",
    },
    {
      q: "Will the work be mobile-friendly?",
      a: "Yes. Mobile is treated as the primary experience, not an afterthought. Everything is built responsive-first and tested on real devices across iOS and Android, plus tablet and desktop breakpoints, before it ships.",
    },
    {
      q: "Can you work with my existing theme and apps?",
      a: "In most cases yes. I audit your current theme and app stack first, keep what earns its place, and recommend replacing anything that slows the store down or duplicates functionality you are already paying for.",
    },
    {
      q: `How does ${category} affect my revenue?`,
      a: "Baselines are captured before work begins, so the impact is measured rather than claimed. You receive a before-and-after report covering conversion rate, average order value, revenue per session and page performance.",
    },
    {
      q: "What happens after the project ends?",
      a: "You get a Loom walkthrough, written SOPs and 30 days of support. Beyond that, ongoing retainers are available for maintenance, monitoring and continuous optimisation , but they are optional, never a lock-in.",
    },
    {
      q: "How do payments and guarantees work?",
      a: "Projects are split into milestone payments, typically 50% to book the slot and 50% on delivery. If a delivered item does not match the agreed written scope, it is fixed at no extra cost. No hidden fees, no surprise change orders.",
    },
  ];
  // rotate the tail so no two service pages read identically
  return [...base.slice(0, 2), ...base.slice(2).sort((a, b) => (hash(a.q + seed) % 7) - (hash(b.q + seed) % 7))];
}

function buildServicePage(name: string, category: (typeof SERVICE_CATEGORIES)[number]): ServicePage {
  const seed = hash(name + category.slug);
  const clean = name.replace(/\s*\([^)]*\)/, "");
  const pillars = [0, 1, 2, 3].map((i) => pick(PILLAR_TEMPLATES, seed, i * 2)(clean, category.title));
  // guarantee unique pillar titles
  const seen = new Set<string>();
  const uniquePillars: Pillar[] = [];
  let p = 0;
  while (uniquePillars.length < 4) {
    const cand = PILLAR_TEMPLATES[(seed + p) % PILLAR_TEMPLATES.length]!(clean, category.title);
    if (!seen.has(cand.title)) {
      seen.add(cand.title);
      uniquePillars.push(cand);
    }
    p++;
    if (p > 30) break;
  }

  return {
    slug: slugify(name),
    name: clean,
    categorySlug: category.slug,
    categoryTitle: category.title,
    categoryLabel: category.label,
    badge: "Recognised Shopify Partner",
    heroTitle: `${pick(HERO_VERBS, seed)} Your Store With ${clean}`,
    heroSub: pick(HERO_SUBS, seed, 1),
    whatWeDoTitle: `${/^shopify/i.test(clean) ? clean : `Shopify ${clean}`} That Performs, Converts and Sells`,
    whatWeDoBody: `${category.desc} ${clean} is where that starts. Launching or changing a Shopify store is only the beginning , what matters is keeping it optimised for performance, conversion and sustainable growth. I handle both sides: a solid build, then the updates, apps and operations that keep it fast, functional and profitable.`,
    pillars: uniquePillars.length === 4 ? uniquePillars : pillars,
    processTitle: `How ${clean} Is Delivered for Long-Term Success`,
    steps: pick(STEP_SETS, seed, 2),
    outcomes: [0, 1, 2, 3].map((i) => pick(OUTCOME_POOL, seed, i * 3)).filter((v, i, a) => a.indexOf(v) === i),
    deliverables: [0, 1, 2, 3, 4].map((i) => pick(DELIVERABLE_POOL, seed, i * 3)).filter((v, i, a) => a.indexOf(v) === i),
    stats: pick(STAT_SETS, seed, 3),
    testimonial: pick(QUOTES, seed, 4),
    faqs: buildFaqs(clean, category.title, seed),
  };
}

export const SERVICE_PAGES: ServicePage[] = SERVICE_CATEGORIES.flatMap((c) =>
  c.items.map((item) => buildServicePage(item, c)),
);

export const getServicePage = (slug: string) => SERVICE_PAGES.find((s) => s.slug === slug);

/** Six sibling services shown in the "Other Services" block. */
export function relatedServices(slug: string): ServicePage[] {
  const current = getServicePage(slug);
  if (!current) return SERVICE_PAGES.slice(0, 6);
  const siblings = SERVICE_PAGES.filter((s) => s.categorySlug === current.categorySlug && s.slug !== slug);
  const others = SERVICE_PAGES.filter((s) => s.categorySlug !== current.categorySlug);
  return [...siblings, ...others].slice(0, 6);
}
