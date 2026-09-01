/** Pure analysis helpers for the free store audit. Server-side only usage, but framework-free. */

export type AuditFinding = { title: string; detail: string; category: string };

export type AuditResult = {
  domain: string;
  url: string;
  overall: number;
  categories: { key: string; label: string; score: number }[];
  findings: AuditFinding[];
  checkedAt: string;
  platformNote: string;
};

const clamp = (n: number) => Math.max(0, Math.min(100, Math.round(n)));

const count = (html: string, re: RegExp) => (html.match(re) ?? []).length;
const has = (html: string, re: RegExp) => re.test(html);

export function normalizeUrl(raw: string): string {
  const trimmed = raw.trim();
  const withProto = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  const u = new URL(withProto);
  if (!/^https?:$/.test(u.protocol)) throw new Error("Unsupported protocol");
  if (!u.hostname.includes(".")) throw new Error("Invalid domain");
  return u.origin + (u.pathname === "/" ? "" : u.pathname);
}

export function analyze(input: {
  url: string;
  html: string;
  bytes: number;
  ttfbMs: number;
  totalMs: number;
  status: number;
}): AuditResult {
  const { url, html, bytes, ttfbMs, totalMs } = input;
  const domain = new URL(url).hostname.replace(/^www\./, "");
  const lower = html.toLowerCase();
  const text = lower.replace(/<script[\s\S]*?<\/script>/g, " ").replace(/<[^>]+>/g, " ");

  const findings: AuditFinding[] = [];
  const add = (category: string, title: string, detail: string) =>
    findings.push({ category, title, detail });

  /* ---------------- SEO ---------------- */
  const title = (html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? "").trim();
  const metaDesc = (
    html.match(/<meta[^>]+name=["']description["'][^>]*content=["']([^"']*)["']/i)?.[1] ??
    html.match(/<meta[^>]+content=["']([^"']*)["'][^>]*name=["']description["']/i)?.[1] ??
    ""
  ).trim();
  const h1s = count(html, /<h1[\s>]/gi);
  const h2s = count(html, /<h2[\s>]/gi);
  const jsonLd = count(html, /application\/ld\+json/gi);
  const canonical = has(html, /rel=["']canonical["']/i);
  const ogTitle = has(html, /property=["']og:title["']/i);
  const noindex = has(lower, /name=["']robots["'][^>]*noindex/);

  let seo = 100;
  if (!title) { seo -= 22; add("SEO & Discoverability", "Add a page title", `No <title> tag was found on ${domain}. Search engines and social shares have nothing to display.`); }
  else if (title.length < 25 || title.length > 65) { seo -= 8; add("SEO & Discoverability", "Tighten your page title", `Your title is ${title.length} characters ("${title.slice(0, 70)}"). Aim for 25–65 characters with the brand plus the main value proposition.`); }
  if (!metaDesc) { seo -= 18; add("SEO & Discoverability", "Write a meta description", `${domain} has no meta description, so Google writes its own snippet for your homepage.`); }
  else if (metaDesc.length < 70 || metaDesc.length > 165) { seo -= 6; add("SEO & Discoverability", "Resize your meta description", `It is ${metaDesc.length} characters. 70–165 characters gets shown in full on most result pages.`); }
  if (h1s === 0) { seo -= 14; add("SEO & Discoverability", "Add a single H1 heading", "No H1 was found. The main heading tells both shoppers and crawlers what this page is about."); }
  else if (h1s > 1) { seo -= 8; add("SEO & Discoverability", "Reduce to one H1", `${h1s} H1 headings were found. Keep one and demote the rest to H2/H3 for a clean heading structure.`); }
  if (h2s < 2) seo -= 6;
  if (jsonLd === 0) { seo -= 14; add("SEO & Discoverability", "Add structured data", "No JSON-LD structured data was detected. Product, Organization and Breadcrumb schema unlock rich results and star ratings."); }
  if (!canonical) seo -= 6;
  if (!ogTitle) { seo -= 6; add("SEO & Discoverability", "Add Open Graph tags", "Missing og: tags mean links shared on WhatsApp, X and Facebook render as plain text."); }
  if (noindex) { seo -= 30; add("SEO & Discoverability", "Page is set to noindex", "A robots noindex directive was found — this page is asking search engines not to list it."); }

  /* ---------------- Performance ---------------- */
  const imgs = count(html, /<img[\s>]/gi);
  const lazy = count(html, /loading=["']lazy["']/gi);
  const scripts = count(html, /<script[\s>]/gi);
  const externalScripts = count(html, /<script[^>]+src=["']https?:\/\//gi);
  const modernImg = count(html, /\.(webp|avif)/gi);
  const kb = Math.round(bytes / 1024);

  let perf = 100;
  if (ttfbMs > 1200) { perf -= 22; add("Performance", "Slow server response", `First byte took ${ttfbMs}ms. Anything over 800ms delays every other asset — usually app bloat or heavy Liquid loops.`); }
  else if (ttfbMs > 800) perf -= 12;
  if (kb > 600) { perf -= 18; add("Performance", "Trim the HTML payload", `The homepage document alone is ${kb}KB before images. Heavy inline markup and app snippets push mobile LCP past the 2.5s threshold.`); }
  else if (kb > 350) perf -= 8;
  if (externalScripts > 14) { perf -= 18; add("Performance", "Reduce third-party scripts", `${externalScripts} external scripts load on this page. Each one competes with your product images for mobile bandwidth.`); }
  else if (externalScripts > 8) perf -= 9;
  if (scripts > 40) perf -= 6;
  if (imgs > 6 && lazy / Math.max(imgs, 1) < 0.4) { perf -= 14; add("Performance", "Lazy-load below-the-fold images", `${imgs} images were found but only ${lazy} use lazy loading, so the browser downloads everything before first paint.`); }
  if (imgs > 4 && modernImg === 0) { perf -= 10; add("Performance", "Serve next-gen image formats", "No WebP or AVIF assets detected. Converting product and banner imagery typically cuts image weight by 30–50%."); }
  if (totalMs > 2500) perf -= 8;

  /* ---------------- Trust ---------------- */
  const reviewSignals = /review|rating|★|stars|trustpilot|judge\.me|loox|yotpo|okendo|stamped/;
  const testimonial = /testimonial|"what our customers|customers say|loved by/;
  const shipping = /shipping|delivery|free returns|dispatch/;
  const returns = /return policy|refund|returns policy|money[- ]back/;
  const contactPage = /\/pages\/contact|contact us|mailto:|tel:/;
  const security = /secure checkout|ssl|payment icons|visa|mastercard|paypal|apple pay|shop pay|klarna/;
  const social = /instagram\.com|tiktok\.com|facebook\.com|youtube\.com/;
  const about = /\/pages\/about|our story|about us/;
  const faq = /\bfaq\b|frequently asked/;

  let trust = 100;
  if (!reviewSignals.test(text)) { trust -= 22; add("Trust & Credibility", "Surface customer reviews", `No review or rating signals were visible on ${domain}. Star ratings near the buy button are the single highest-impact trust element for a new visitor.`); }
  if (!testimonial.test(text)) trust -= 6;
  if (!shipping.test(text)) { trust -= 14; add("Trust & Credibility", "Make shipping terms visible", "Shipping or delivery information was not found on the landing page. Unclear delivery expectations are a top cause of abandonment."); }
  if (!returns.test(text)) { trust -= 14; add("Trust & Credibility", "Publish your returns promise", "No returns or refund wording was detected. A visible, plain-English returns line reduces first-purchase hesitation."); }
  if (!contactPage.test(lower)) { trust -= 12; add("Trust & Credibility", "Add reachable contact details", "No contact link, email or phone number was found. Buyers check this before spending with an unfamiliar brand."); }
  if (!security.test(text)) { trust -= 10; add("Trust & Credibility", "Show payment and security signals", "No payment method or secure-checkout signals were visible. Payment icons in the footer are a cheap, proven reassurance."); }
  if (!social.test(lower)) trust -= 8;
  if (!about.test(text)) trust -= 6;
  if (!faq.test(text)) trust -= 4;

  /* ---------------- Conversion & UX ---------------- */
  const ctaWords = /add to cart|buy now|shop now|order now|get yours|start shopping|add to bag/;
  const ctaCount = (text.match(new RegExp(ctaWords, "g")) ?? []).length;
  const navLinks = count(html, /<nav[\s>]/gi);
  const search = has(lower, /type=["']search["']|\/search|aria-label=["'][^"']*search/);
  const viewport = has(lower, /name=["']viewport["']/);
  const collections = count(lower, /\/collections\//g);
  const products = count(lower, /\/products\//g);
  const heroCopy = /<h1[^>]*>([\s\S]{0,180}?)<\/h1>/i.exec(html)?.[1]?.replace(/<[^>]+>/g, "").trim() ?? "";
  const popupClutter = count(lower, /newsletter|subscribe|10% off/g);

  let conv = 100;
  if (ctaCount === 0) { conv -= 24; add("Conversion & UX", "Strengthen your primary call to action", "No clear buying CTA (Add to cart / Shop now / Buy now) was detected above the fold. A single, repeated, high-contrast action beats several competing links."); }
  else if (ctaCount < 3) { conv -= 10; add("Conversion & UX", "Repeat the CTA down the page", `Only ${ctaCount} buying CTA${ctaCount === 1 ? " was" : "s were"} found. Shoppers decide at different scroll depths — repeat the action after each proof block.`); }
  if (!heroCopy) { conv -= 14; add("Conversion & UX", "Clarify the value proposition", "There is no headline stating what you sell and why it is better. A visitor should understand the offer in five seconds."); }
  else if (heroCopy.length < 15) { conv -= 8; add("Conversion & UX", "Expand the hero headline", `Your main headline is very short ("${heroCopy}"). Add the outcome the customer gets, not just the brand name.`); }
  if (navLinks === 0) { conv -= 10; add("Conversion & UX", "Add clear primary navigation", "No semantic navigation element was found, which hurts product discovery and accessibility."); }
  if (!search) { conv -= 10; add("Conversion & UX", "Add storefront search", "No search input was detected. Visitors who search convert at multiples of those who browse."); }
  if (collections < 3) { conv -= 12; add("Conversion & UX", "Improve product discovery", `Only ${collections} collection link${collections === 1 ? "" : "s"} were found on the landing page. Surface your best-selling categories directly.`); }
  if (!viewport) { conv -= 16; add("Conversion & UX", "Fix the mobile viewport", "No responsive viewport meta tag was found — mobile visitors will see a zoomed-out desktop layout."); }
  if (popupClutter > 6) conv -= 6;

  /* ---------------- Product experience ---------------- */
  const price = /\$|£|€|₦|price|from \d/;
  const variants = /size|colour|color|variant|select option/;
  const stock = /in stock|sold out|low stock|only \d+ left/;
  const benefits = /why (you'll )?love|benefits|features|made with|ingredients|materials/;
  const bundle = /bundle|save \d+%|buy 2|free gift/;

  let prod = 100;
  if (products === 0) { prod -= 20; add("Product Experience", "Link products from the landing page", "No product links were detected on the entry page, so visitors must hunt through menus before they see anything for sale."); }
  else if (products < 4) prod -= 8;
  if (!price.test(text)) { prod -= 16; add("Product Experience", "Show pricing earlier", "No pricing was visible on the entry page. Hidden prices force an extra click and lose price-sensitive shoppers."); }
  if (imgs < 6) { prod -= 12; add("Product Experience", "Add richer product imagery", `Only ${imgs} images were found. Lifestyle, scale and detail shots do most of the selling online.`); }
  if (!variants.test(text)) prod -= 8;
  if (!stock.test(text)) { prod -= 8; add("Product Experience", "Show availability signals", "No stock or availability wording was found. Honest low-stock and in-stock labels reduce hesitation."); }
  if (!benefits.test(text)) { prod -= 12; add("Product Experience", "Lead with benefits, not specs", "No benefit-led copy blocks were detected. Tell shoppers what changes for them before listing specifications."); }
  if (!bundle.test(text)) { prod -= 8; add("Product Experience", "Add an AOV lever", "No bundles, volume savings or gift offers were detected — the fastest way to lift average order value on existing traffic."); }
  if (!reviewSignals.test(text)) prod -= 12;

  const shopify = /cdn\.shopify\.com|shopify\.theme|myshopify\.com|shopifycloud/.test(lower);

  const categories = [
    { key: "conversion", label: "Conversion & UX", score: clamp(conv) },
    { key: "trust", label: "Trust & Credibility", score: clamp(trust) },
    { key: "product", label: "Product Experience", score: clamp(prod) },
    { key: "performance", label: "Performance", score: clamp(perf) },
    { key: "seo", label: "SEO & Discoverability", score: clamp(seo) },
  ];

  const overall = clamp(
    categories[0]!.score * 0.28 +
      categories[1]!.score * 0.22 +
      categories[2]!.score * 0.2 +
      categories[3]!.score * 0.15 +
      categories[4]!.score * 0.15,
  );

  const weakest = [...categories].sort((a, b) => a.score - b.score);
  const ranked = findings
    .slice()
    .sort((a, b) => weakest.findIndex((c) => c.label === a.category) - weakest.findIndex((c) => c.label === b.category))
    .slice(0, 5);

  if (ranked.length === 0) {
    ranked.push({
      category: "Conversion & UX",
      title: "No blocking issues found in the public scan",
      detail: `${domain} passes every automated public check. The next gains come from testing offers, merchandising and checkout — which needs analytics access, not a page scan.`,
    });
  }

  return {
    domain,
    url,
    overall,
    categories,
    findings: ranked,
    checkedAt: new Date().toISOString(),
    platformNote: shopify
      ? "Shopify storefront detected."
      : "This does not look like a Shopify storefront — checks were run against the public page as-is.",
  };
}
