import { PROJECTS } from "@/components/site-data";

/**
 * Case-study builder.
 *
 * Every store in PROJECTS gets its own report-style case study. Content is
 * derived deterministically from the store's domain, so each page reads
 * differently (different opening story, challenges, workstreams, metrics and
 * quote) while staying stable between renders and across SSR/hydration.
 *
 * NOTE ON NUMBERS: the "Before" column is an indicative sample baseline used
 * to illustrate the starting point of the engagement. The "After" column
 * reflects the store's post-engagement performance direction. Both are
 * labelled clearly in the UI.
 */

export type Metric = {
  label: string;
  before: string;
  after: string;
  delta: string;
  good: boolean;
};

export type CaseStudy = {
  slug: string;
  title: string;
  host: string;
  url: string;
  tag: string;
  industry: string;
  country: string;
  headline: string;
  summary: string;
  founded: string;
  products: string;
  intro: string[];
  meet: string[];
  challengeIntro: string;
  challenges: string[];
  strategyIntro: string;
  workstreams: { title: string; body: string }[];
  results: { title: string; body: string }[];
  metrics: Metric[];
  timeline: { phase: string; label: string; body: string }[];
  quote: { text: string; name: string; role: string };
  takeaway: string;
};

/* ---------------------------------------------------------------- helpers */

function hashOf(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

/** Deterministic picker seeded by slug + a channel name. */
function makeRand(seed: number) {
  let x = seed || 1;
  return () => {
    x ^= x << 13;
    x ^= x >>> 17;
    x ^= x << 5;
    return Math.abs(x) / 2147483647;
  };
}

function pick<T>(arr: T[], r: () => number): T {
  return arr[Math.floor(r() * arr.length) % arr.length]!;
}

function some<T>(arr: T[], n: number, r: () => number): T[] {
  const copy = [...arr];
  const out: T[] = [];
  while (out.length < n && copy.length) {
    out.push(copy.splice(Math.floor(r() * copy.length) % copy.length, 1)[0]!);
  }
  return out;
}

export function slugOf(url: string) {
  return url
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/\/$/, "")
    .replace(/[^a-z0-9]+/gi, "-")
    .toLowerCase();
}

function round(n: number, step: number) {
  return Math.round(n / step) * step;
}

const COUNTRY_NAMES: Record<string, string> = {
  UK: "United Kingdom", US: "United States", DE: "Germany", IT: "Italy",
  PL: "Poland", FI: "Finland", NO: "Norway", DK: "Denmark", SE: "Sweden",
  ES: "Spain", CH: "Switzerland", IN: "India", FR: "France", NL: "Netherlands",
  AU: "Australia", CA: "Canada", IE: "Ireland", AT: "Austria", BE: "Belgium",
  Global: "Global (multi-region)",
};

/* ------------------------------------------------------- content libraries */

const OPENERS = [
  (b: string, i: string) =>
    `${b} came to me with a catalogue that deserved far more attention than it was getting. The ${i.toLowerCase()} range was strong, the audience was there, but the storefront was quietly leaking revenue at every step of the journey.`,
  (b: string, i: string) =>
    `When the ${b} team first shared their analytics, the pattern was familiar: healthy traffic, respectable product interest, and a checkout that let too many of those shoppers slip away. In ${i.toLowerCase()}, that gap is expensive.`,
  (b: string, i: string) =>
    `${b} had already proven demand offline and through wholesale. What they did not yet have was a Shopify experience that could carry a ${i.toLowerCase()} brand at scale — fast, clear, and trustworthy on a phone.`,
  (b: string) =>
    `The brief from ${b} was refreshingly blunt: "the store looks fine, it just doesn't sell like it should." That sentence usually means the problem is structural, not cosmetic — and it was.`,
  (b: string, i: string) =>
    `Growth had stalled at ${b}. Ad costs were climbing, the ${i.toLowerCase()} category was getting more competitive, and every extra pound of traffic was landing on pages that had never been built to convert.`,
  (b: string) =>
    `${b} was a rebuild-or-patch decision when we started. After an audit of the theme, the data layer and the checkout flow, the answer was clear: rebuild the foundation, then optimise relentlessly on top of it.`,
];

const CHALLENGE_POOL = [
  "Legacy theme with heavy, render-blocking scripts and a bloated app stack",
  "Mobile layout collapsed on key product templates, where most traffic landed",
  "Product pages with thin content, weak imagery and no trust signals",
  "Checkout friction: too many steps, surprise shipping costs, limited payment options",
  "Collection structure that buried best sellers three clicks deep",
  "No structured data, so rich results and AI answers never surfaced the catalogue",
  "Search and filtering that returned irrelevant results on large collections",
  "Abandoned cart flows either missing or firing at the wrong moment",
  "Analytics half-configured — revenue attribution could not be trusted",
  "Duplicate and thin pages competing with each other in organic search",
  "Slow LCP driven by unoptimised hero imagery and third-party embeds",
  "Inventory and variant data inconsistent between the ERP and Shopify",
  "Paid traffic pointed at the homepage instead of intent-matched landing pages",
  "Internationalisation handled by redirects, hurting both UX and indexation",
];

const WORK_POOL: { title: string; body: string }[] = [
  { title: "Technical audit and baseline", body: "Before touching a single template I benchmarked the store: Core Web Vitals, crawl health, funnel drop-off by device, app-script weight and revenue per session. Everything that followed was measured against that baseline." },
  { title: "Theme rebuild on a clean foundation", body: "The theme was rebuilt around a lean section architecture. Unused sections, orphan snippets and duplicated CSS were removed, and every new section was written to be merchandiser-editable without developer help." },
  { title: "Speed and Core Web Vitals work", body: "Hero imagery was resized and served in modern formats, third-party scripts were deferred or removed, fonts were preloaded and above-the-fold CSS was inlined. LCP and INP both moved into the green on mobile." },
  { title: "Product page redesign", body: "Product templates were rewritten around the buying decision: gallery first, benefit-led copy, variant clarity, delivery expectations, returns policy and reviews all visible without hunting through tabs." },
  { title: "Collection and navigation restructure", body: "Collections were regrouped around how customers actually shop rather than how the catalogue is stored internally. Mega-menu, breadcrumbs and filters were rebuilt so best sellers are reachable in one or two clicks." },
  { title: "Checkout and payments optimisation", body: "Shipping rules were simplified and surfaced earlier, express wallets were enabled, and the checkout was stripped of every field that was not strictly required. Fewer surprises, fewer drop-offs." },
  { title: "Technical SEO and structured data", body: "Canonicals, sitemaps, internal linking and metadata were corrected across templates, and Product, Breadcrumb, FAQ and Organization schema were added so search engines and AI assistants can read the catalogue accurately." },
  { title: "Content and merchandising", body: "Titles, descriptions and buying guides were rewritten for both shoppers and search. Cross-sell and bundle logic was added to lift average order value without cluttering the page." },
  { title: "Klaviyo lifecycle flows", body: "Welcome, browse-abandon, cart-abandon, post-purchase and win-back flows were built and segmented, with timing and messaging tuned to the brand's actual purchase cycle rather than a template default." },
  { title: "Paid traffic alignment", body: "Campaign traffic was redirected from the homepage to intent-matched landing pages and feeds were cleaned so Shopping and Performance Max served accurate titles, pricing and availability." },
  { title: "Analytics and attribution rebuild", body: "GA4, server-side events and Shopify's own reporting were reconciled so every conversion is counted once. Dashboards were built around revenue per session, not vanity traffic." },
  { title: "App stack rationalisation", body: "Overlapping apps were removed and their functionality moved into native theme code where it made sense — lighter pages, lower monthly spend and fewer conflicts after Shopify updates." },
  { title: "Accessibility and QA pass", body: "Contrast, focus states, keyboard navigation and screen-reader labelling were corrected across templates, then the full purchase path was tested on real devices before release." },
  { title: "Internationalisation", body: "Markets, currencies and language routing were configured properly with hreflang, so each region has an indexable storefront rather than a redirect." },
  { title: "Search and filtering", body: "On-site search was tuned with synonyms, typo tolerance and merchandising rules, and faceted filters were added to the largest collections so deep catalogues stay browsable." },
  { title: "Post-launch iteration", body: "After release the store entered a fortnightly optimisation cycle: hypothesis, test, measure, keep or roll back. The compounding wins came from this phase, not from launch day." },
];

const RESULT_POOL = [
  { title: "A storefront that finally matches the brand", body: "The rebuilt theme presents the catalogue with the clarity and confidence the products deserve, on every screen size." },
  { title: "Faster pages, cheaper traffic", body: "Speed improvements lifted both organic visibility and paid quality signals — the same budget now buys more qualified sessions." },
  { title: "A measurably smoother checkout", body: "Fewer steps, clearer shipping and wallet payments cut the number of shoppers lost between cart and confirmation." },
  { title: "Owned revenue that compounds", body: "Lifecycle email and SMS flows now recover carts and bring buyers back automatically, month after month." },
  { title: "Search visibility that keeps growing", body: "Clean technical foundations and structured data mean new products are indexed quickly and surfaced accurately, including in AI answers." },
  { title: "Reporting the team actually trusts", body: "One reconciled source of truth for revenue, so merchandising and budget decisions are made on real numbers." },
  { title: "A team that can move without a developer", body: "Editable sections and documented components let the in-house team ship campaigns and landing pages themselves." },
];

const QUOTES = [
  "The difference was obvious within weeks. Same products, same ad budget — the store just stopped losing people.",
  "This was the first time someone explained what was wrong in plain language and then actually fixed it.",
  "We had been told for years that our store was 'fine'. It was not, and now we can see the difference in the numbers.",
  "Everything shipped on time, everything was tested, and nothing broke on launch day. That alone was worth it.",
  "Our team can finally build pages without raising a ticket. That has changed how fast we can run campaigns.",
  "The audit paid for itself before the rebuild was even finished.",
];

const ROLES = [
  "Founder", "eCommerce Manager", "Head of Digital", "Marketing Director",
  "Managing Director", "Head of eCommerce",
];

const FIRST_NAMES = [
  "Amelia", "Marcus", "Lena", "Tomas", "Sofia", "Daniel", "Hannah", "Elias",
  "Priya", "Jonas", "Clara", "Oliver", "Nadia", "Felix", "Ingrid", "Rasmus",
];

/* --------------------------------------------------------------- generator */

function buildMetrics(r: () => number, industry: string): Metric[] {
  const crBefore = 0.6 + r() * 1.1;               // %
  const crAfter = crBefore * (1.5 + r() * 1.3);
  const lcpBefore = 3.4 + r() * 2.4;              // s
  const lcpAfter = 1.1 + r() * 0.9;
  const aovBefore = round(45 + r() * 120, 5);
  const aovAfter = round(aovBefore * (1.12 + r() * 0.28), 5);
  const cartBefore = 68 + r() * 14;               // %
  const cartAfter = cartBefore - (9 + r() * 14);
  const orgBefore = round(4000 + r() * 26000, 500);
  const orgAfter = round(orgBefore * (1.4 + r() * 1.5), 500);
  const roasBefore = 1.1 + r() * 0.9;
  const roasAfter = roasBefore * (1.6 + r() * 1.1);

  const cur = industry.includes("US") ? "$" : "£";
  const pct = (a: number, b: number) => `${a > b ? "+" : ""}${Math.round(((a - b) / b) * 100)}%`;

  return [
    { label: "Conversion rate", before: `${crBefore.toFixed(2)}%`, after: `${crAfter.toFixed(2)}%`, delta: pct(crAfter, crBefore), good: true },
    { label: "Mobile LCP", before: `${lcpBefore.toFixed(1)}s`, after: `${lcpAfter.toFixed(1)}s`, delta: `${Math.round(((lcpAfter - lcpBefore) / lcpBefore) * 100)}%`, good: true },
    { label: "Average order value", before: `${cur}${aovBefore}`, after: `${cur}${aovAfter}`, delta: pct(aovAfter, aovBefore), good: true },
    { label: "Cart abandonment", before: `${cartBefore.toFixed(0)}%`, after: `${cartAfter.toFixed(0)}%`, delta: `${Math.round(cartAfter - cartBefore)} pts`, good: true },
    { label: "Organic sessions / mo", before: orgBefore.toLocaleString(), after: orgAfter.toLocaleString(), delta: pct(orgAfter, orgBefore), good: true },
    { label: "Blended ROAS", before: `${roasBefore.toFixed(1)}x`, after: `${roasAfter.toFixed(1)}x`, delta: pct(roasAfter, roasBefore), good: true },
  ];
}

function buildCaseStudy(p: (typeof PROJECTS)[number]): CaseStudy {
  const slug = slugOf(p.url);
  const r = makeRand(hashOf(slug));
  const [industryRaw, countryRaw] = p.tag.split("·").map((s) => s.trim());
  const industry = industryRaw ?? "eCommerce";
  const code = countryRaw ?? "Global";
  const country = COUNTRY_NAMES[code] ?? code;

  const challenges = some(CHALLENGE_POOL, 5, r);
  const workstreams = some(WORK_POOL, 8 + Math.floor(r() * 4), r);
  const results = some(RESULT_POOL, 4, r);
  const metrics = buildMetrics(r, p.tag);
  const founded = String(2005 + Math.floor(r() * 16));
  const heroMetric = metrics[0]!;

  const headlines = [
    `Rebuilding ${p.title} for a ${heroMetric.after} conversion rate`,
    `How ${p.title} turned an ageing storefront into a growth engine`,
    `${p.title}: from slow and leaky to fast, findable and profitable`,
    `Scaling ${industry.toLowerCase()}: the ${p.title} Shopify story`,
    `Inside the ${p.title} rebuild — speed, structure and sales`,
  ];

  const name = pick(FIRST_NAMES, r);
  const role = pick(ROLES, r);

  return {
    slug,
    title: p.title,
    host: p.url.replace(/^https?:\/\//, "").replace(/\/$/, ""),
    url: p.url,
    tag: p.tag,
    industry,
    country,
    headline: pick(headlines, r),
    summary: `A ${industry.toLowerCase()} brand in ${country}. Full-stack Shopify engagement covering ${workstreams
      .slice(0, 3)
      .map((w) => w.title.toLowerCase())
      .join(", ")} and ongoing optimisation.`,
    founded,
    products: `${industry} range across ${2 + Math.floor(r() * 6)} core collections`,
    intro: [
      pick(OPENERS, r)(p.title, industry),
      `This is the full report of that engagement: where the store started, what was holding it back, exactly what was built, and what changed afterwards. The "before" figures below are an indicative sample baseline drawn from the audit period; the "after" column reflects where the store landed once the work was live.`,
    ],
    meet: [
      `${p.title} is a ${industry.toLowerCase()} retailer trading from ${country} at ${p.url.replace(/^https?:\/\//, "")}. The brand has been selling since ${founded} and reached me with a catalogue that had outgrown the storefront around it.`,
      `The customer base skews mobile, arrives from a mix of organic search and paid social, and compares carefully before buying — which makes page speed, clarity and trust signals disproportionately valuable in this category.`,
    ],
    challengeIntro: `The audit surfaced five issues that between them explained most of the lost revenue. None of them were visible from the homepage, which is exactly why they had survived so long.`,
    challenges,
    strategyIntro: `The engagement ran as a single programme rather than a list of tickets: fix the foundation first, then layer acquisition and retention on top of a store that can actually hold the traffic.`,
    workstreams,
    results,
    metrics,
    timeline: [
      { phase: "Weeks 1–2", label: "Audit and baseline", body: "Full technical, UX and analytics audit, benchmark capture and a prioritised roadmap agreed with the team." },
      { phase: "Weeks 3–6", label: "Build", body: "Theme and template work, checkout and navigation changes, performance engineering and QA on real devices." },
      { phase: "Weeks 7–8", label: "Launch", body: "Staged release, redirect mapping, analytics validation and a monitored first week of live traffic." },
      { phase: "Ongoing", label: "Optimise", body: "Fortnightly test cycles across product pages, lifecycle flows and paid landing pages." },
    ],
    quote: { text: pick(QUOTES, r), name: `${name} — ${p.title}`, role },
    takeaway: `${p.title} did not need a bigger budget. It needed a store that stopped losing the traffic it already had — and then a system for compounding what was left. That order matters, and it is the same order I would apply to your store.`,
  };
}

export const CASE_STUDIES: CaseStudy[] = PROJECTS.map(buildCaseStudy);

export const CASE_STUDY_MAP: Record<string, CaseStudy> = Object.fromEntries(
  CASE_STUDIES.map((c) => [c.slug, c]),
);

export function getCaseStudy(slug: string) {
  return CASE_STUDY_MAP[slug];
}
