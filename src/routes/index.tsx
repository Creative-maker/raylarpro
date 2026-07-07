import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Star, MapPin, MessageCircle, Calendar, Rocket, ShoppingBag,
  Award, TrendingUp, Zap, ChevronLeft, ChevronRight, Mail, Phone,
  Linkedin, ArrowRight, CheckCircle2, Sparkles, Palette, Search,
  BarChart3, Target, Users, Menu, X, Send, Clock, MessageSquare, Globe,
} from "lucide-react";
import profileImg from "@/assets/profile.jpg";

export const Route = createFileRoute("/")({
  component: PortfolioPage,
});

const MARQUEE = "530+ Stores Completed | Free Shopify Store Audit | Discover Hidden Revenue Leaks & Growth Opportunities";

const NAV = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Case Studies", href: "#projects" },
  { label: "Blog & Resources", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

const STATS = [
  { icon: Rocket, value: "500+", label: "Projects Completed", tone: "bg-emerald-100 text-emerald-600" },
  { icon: Star, value: "5.0", label: "Average Rating", tone: "bg-amber-100 text-amber-600" },
  { icon: Users, value: "300+", label: "Happy Clients", tone: "bg-sky-100 text-sky-600" },
];

const CERTS = [
  { icon: ShoppingBag, title: "Shopify Partner Expert", org: "Shopify • Since 2020", desc: "Verified partner with hands on experience building and growing Shopify stores that sell." },
  { icon: Award, title: "eCommerce Growth Certified", org: "Digital Commerce Institute • Since 2021", desc: "Trained in building online stores that attract visitors and convert them into customers." },
  { icon: TrendingUp, title: "Conversion Optimization", org: "CRO Institute • Since 2021", desc: "Certified in making websites perform better and drive more sales." },
  { icon: Zap, title: "Klaviyo Email Marketing", org: "Klaviyo • Since 2022", desc: "Specialist in building automated flows that recover carts and grow revenue." },
];

const TESTIMONIALS = [
  { name: "Marcus Chen", meta: "eCommerce Founder", quote: "My Shopify store conversions jumped 40% after working with RaylarPro. The audit was spot-on and the fixes made a real difference to my revenue." },
  { name: "Rachel Foster", meta: "Boutique Owner", quote: "Finally found someone who understands eCommerce. RaylarPro made my store load faster, look better, and customers are actually completing their purchases now." },
  { name: "Daniel Wright", meta: "DTC Brand", quote: "The store optimization from RaylarPro was game-changing. Sales increased within the first week and support was incredibly responsive throughout." },
  { name: "Sophia Martinez", meta: "Fashion Brand", quote: "Professional, fast, and delivers results. RaylarPro dropped my abandoned cart rate significantly after implementing the recommended changes." },
  { name: "Thomas Anderson", meta: "Shopify Store Owner", quote: "Best investment I made for my online business. The ROI was visible within a month. Highly recommend for any Shopify store owner." },
];

const EXPERTISE = [
  {
    icon: ShoppingBag, title: "E-commerce & Store Growth",
    items: ["Shopify Store Setup", "Theme Customization", "Redesign & Rebuild", "Product Listing Optimization", "Shopify App Integration"],
  },
  {
    icon: Target, title: "Marketing & Conversion",
    items: ["Conversion Rate Optimization", "Technical & On-Page SEO", "Speed Optimization", "Klaviyo Email Marketing", "Sales Funnel Optimization"],
  },
  {
    icon: Sparkles, title: "Strategy & Analytics",
    items: ["Analytics Setup", "Content Marketing", "Digital Marketing Strategy", "Store Audits & Reports", "Long-term Growth Planning"],
  },
];

const PROJECTS = [
  { title: "Urban Trendly", tag: "Trendy Lifestyle Store", desc: "A modern lifestyle ecommerce store featuring trendy products and curated everyday essentials.", img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=520&fit=crop", url: "#" },
  { title: "Blaze Athletic", tag: "Sportswear & Fitness", desc: "A dynamic athletic wear store built for performance and style, offering premium sportswear and fitness gear.", img: "https://images.unsplash.com/photo-1483721310020-03333e577078?w=800&h=520&fit=crop", url: "#" },
  { title: "Harmoni Bloom", tag: "Wellness & Self Care", desc: "A serene wellness brand store focused on holistic self care products and mindful living essentials.", img: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&h=520&fit=crop", url: "#" },
  { title: "LastObject", tag: "Sustainable Products", desc: "A sleek ecommerce store focused on reusable everyday products with a minimalist feel.", img: "https://images.unsplash.com/photo-1556740758-90de374c12ad?w=800&h=520&fit=crop", url: "#" },
  { title: "Then I Met You", tag: "Korean Skincare", desc: "An elegant skincare brand with sensorial products and smooth checkout experience.", img: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&h=520&fit=crop", url: "#" },
  { title: "Auvene", tag: "Beauty & Fashion", desc: "A clean fashion and skincare brand store with beautiful product displays.", img: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&h=520&fit=crop", url: "#" },
  { title: "Beneath Your Mask", tag: "Luxury Skincare", desc: "A premium skincare brand with rich imagery and an immersive shopping experience.", img: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&h=520&fit=crop", url: "#" },
  { title: "Meow Meow Tweet", tag: "Organic Skincare", desc: "A fun and vibrant organic skincare shop with playful branding and clean UX.", img: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=800&h=520&fit=crop", url: "#" },
  { title: "Exactly Bliss", tag: "Trending Gifts", desc: "A vibrant online store featuring trending products and everyday gifts with great deals.", img: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&h=520&fit=crop", url: "#" },
  { title: "Pretty Girls Boutique", tag: "Fashion Boutique", desc: "A stylish fashion boutique with trendy clothing and accessories for women.", img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&h=520&fit=crop", url: "#" },
  { title: "THBrandside", tag: "Kitchen & Home", desc: "A modern store for reusable kitchen tools and home office essentials.", img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=520&fit=crop", url: "#" },
  { title: "Variety Vault Goods", tag: "General Store", desc: "A versatile online store offering a wide variety of quality products across multiple categories.", img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=520&fit=crop", url: "#" },
];

const REVIEWS = [
  { name: "Michael Thompson", loc: "New York, USA", quote: "RaylarPro went above and beyond on my e-commerce project. The site looks incredible and my sales have doubled since launch. Worth every penny." },
  { name: "Sarah Mitchell", loc: "Los Angeles, USA", quote: "I was skeptical at first but RaylarPro proved me wrong. Fast communication, beautiful design, and everything delivered on time. Highly recommend." },
  { name: "James Anderson", loc: "Chicago, USA", quote: "Working with RaylarPro was the best decision for my business. They understood exactly what I needed and built a site that truly represents my brand." },
  { name: "Emily Roberts", loc: "Houston, USA", quote: "RaylarPro is a true professional. The attention to detail was amazing and they were patient with all my revision requests. My store looks premium now." },
  { name: "David Williams", loc: "Phoenix, USA", quote: "From concept to launch, RaylarPro made the whole process easy. The website performs great and my customers love the new look." },
  { name: "Jennifer Davis", loc: "Philadelphia, USA", quote: "RaylarPro delivered exactly what was promised. Clean code, fast loading, and a design that converts. Already planning my next project with them." },
  { name: "Christopher Brown", loc: "San Antonio, USA", quote: "I have worked with several developers before but RaylarPro stands out. Reliable, skilled, and genuinely cares about the final result." },
  { name: "Amanda Wilson", loc: "San Diego, USA", quote: "The store RaylarPro built for me is exactly what I envisioned. Traffic is up and customers are staying longer. That says it all." },
  { name: "Matthew Taylor", loc: "Dallas, USA", quote: "RaylarPro took my rough ideas and turned them into a polished website. The communication was excellent throughout the entire project." },
  { name: "Jessica Martinez", loc: "San Jose, USA", quote: "Five stars is not enough for RaylarPro. They fixed issues from my previous developer and rebuilt everything the right way. Grateful I found them." },
  { name: "Robert Garcia", loc: "Austin, USA", quote: "RaylarPro transformed my outdated website into a modern selling machine. The ROI has been incredible and support is always responsive." },
  { name: "Lisa Johnson", loc: "Denver, USA", quote: "Could not be happier with my new Shopify store from RaylarPro. They understood my vision perfectly and executed it flawlessly." },
];

const FAQS = [
  { q: "What platforms do you work with?", a: "I specialize in Shopify, WooCommerce, and custom web development. Whether you need a full online store or a business website, I can build it on the platform that fits your needs best." },
  { q: "How long does it take to complete a project?", a: "Most projects take between 5 to 14 days depending on complexity. Simple landing pages can be done faster while full e-commerce stores with many features naturally take more time. I will give you a clear timeline before we start." },
  { q: "Do you provide support after the project is done?", a: "Absolutely. I offer ongoing support packages and I am always available for updates, fixes, or new features. Your success matters to me even after delivery." },
  { q: "What is included in your web development service?", a: "You get everything you need to launch. Design, development, mobile optimization, basic SEO setup, and all the revisions until you are happy. No hidden extras." },
  { q: "Can you help with an existing website?", a: "Yes. I regularly help clients fix, improve, or completely redesign existing websites. Send me your site and I will let you know what can be done." },
  { q: "What are your payment terms?", a: "I typically work with a 50% upfront deposit and the remaining 50% upon completion. For larger projects, we can discuss milestone payments. Everything is clear and agreed before we begin." },
];

const WHATSAPP = "https://wa.me/2349063812609";
const CALENDLY = "https://calendly.com/raylarpro";

function PortfolioPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Marquee />
      <Header />
      <main>
        <Hero />
        <StatsBar />
        <Certifications />
        <TestimonialsCarousel />
        <About />
        <Expertise />
        <Projects />
        <FreeTool />
        <Reviews />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <FloatingButtons />
    </div>
  );
}

/* ---------- Marquee ---------- */
function Marquee() {
  const item = (
    <span className="mx-8 inline-flex items-center gap-2 text-sm">
      <Rocket className="h-4 w-4 text-primary" />
      {MARQUEE.split("|").map((p, i, arr) => (
        <span key={i} className="flex items-center gap-3">
          <span>{p.trim()}</span>
          {i < arr.length - 1 && <span className="text-primary">|</span>}
        </span>
      ))}
    </span>
  );
  return (
    <div className="overflow-hidden bg-marquee py-2.5 text-marquee-foreground">
      <div className="flex w-max animate-marquee whitespace-nowrap">
        {Array.from({ length: 6 }).map((_, i) => (
          <span key={i}>{item}</span>
        ))}
      </div>
    </div>
  );
}

/* ---------- Header ---------- */
function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
        <a href="#home" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground font-black">R</span>
          <span className="text-lg font-bold tracking-tight">RaylarPro</span>
        </a>
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-muted-foreground">
          {NAV.map((n) => (
            <a key={n.label} href={n.href} className="hover:text-foreground transition-colors">{n.label}</a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a href="#" aria-label="LinkedIn" className="hidden sm:inline-flex text-muted-foreground hover:text-primary">
            <Linkedin className="h-5 w-5" />
          </a>
          <a href={CALENDLY} target="_blank" rel="noreferrer" className="hidden sm:inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition">
            Book a Call
          </a>
          <button onClick={() => setOpen(!open)} className="lg:hidden p-2" aria-label="Menu">
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="lg:hidden border-t border-border bg-background px-4 py-4">
          <div className="flex flex-col gap-3">
            {NAV.map((n) => (
              <a key={n.label} href={n.href} onClick={() => setOpen(false)} className="py-1 text-sm font-medium">{n.label}</a>
            ))}
            <a href={CALENDLY} target="_blank" rel="noreferrer" className="mt-2 inline-flex justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">Book a Call</a>
          </div>
        </div>
      )}
    </header>
  );
}

/* ---------- Hero ---------- */
function Hero() {
  return (
    <section id="home" className="bg-surface">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 md:px-6 md:py-24 lg:grid-cols-[auto_1fr]">
        <div className="relative mx-auto lg:mx-0">
          <div className="relative h-72 w-72 sm:h-80 sm:w-80 md:h-96 md:w-96">
            <div className="absolute inset-0 rounded-full ring-8 ring-primary/80" />
            <img
              src={profileImg}
              alt="Yusuff Rasheed — RaylarPro, Shopify Specialist"
              width={800}
              height={800}
              className="h-full w-full rounded-full object-cover"
            />
            <span className="absolute right-4 top-6 rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-primary-foreground shadow-lg">
              Top Rated
            </span>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-background px-4 py-2 text-xs font-semibold shadow-lg ring-1 ring-border">
              <span className="inline-flex items-center gap-1.5">
                <ShoppingBag className="h-3.5 w-3.5 text-primary" /> shopify partners
              </span>
            </div>
          </div>
        </div>
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight md:text-6xl">RaylarPro</h1>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary-soft px-3 py-1.5 text-sm font-semibold text-accent-foreground">
            <CheckCircle2 className="h-4 w-4" /> Pro Seller
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center gap-1.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
              ))}
              <span className="font-semibold">5.0</span>
              <span className="text-muted-foreground">(500+ reviews)</span>
            </div>
            <span className="inline-flex items-center gap-1.5 text-muted-foreground">
              <MapPin className="h-4 w-4" /> United Kingdom · Worldwide
            </span>
          </div>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Shopify Specialist · Shopify Store Developer · eCommerce Growth Consultant. I build
            high-converting Shopify stores that help brands attract more customers and increase sales.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={WHATSAPP} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 transition">
              <MessageCircle className="h-4 w-4" /> Contact Me
            </a>
            <a href={CALENDLY} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg border-2 border-primary bg-background px-6 py-3 text-sm font-semibold text-primary hover:bg-primary-soft transition">
              <Calendar className="h-4 w-4" /> Book a Call
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Stats ---------- */
function StatsBar() {
  return (
    <section className="bg-surface pb-16">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 md:grid-cols-3 md:px-6">
        {STATS.map((s) => (
          <div key={s.label} className="rounded-2xl bg-card p-8 text-center shadow-sm ring-1 ring-border">
            <div className={`mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full ${s.tone}`}>
              <s.icon className="h-7 w-7" />
            </div>
            <div className="text-4xl font-extrabold tracking-tight">{s.value}</div>
            <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- Certifications ---------- */
function Certifications() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionEyebrow>Professional Credentials</SectionEyebrow>
        <SectionHeading>Certifications & Achievements</SectionHeading>
        <SectionSub>Real skills backed by real credentials. Here is what I bring to the table.</SectionSub>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {CERTS.map((c) => (
            <div key={c.title} className="rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:shadow-lg">
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
  );
}

/* ---------- Testimonials carousel ---------- */
function TestimonialsCarousel() {
  const [i, setI] = useState(0);
  const t = TESTIMONIALS[i];
  const prev = () => setI((i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => setI((i + 1) % TESTIMONIALS.length);
  return (
    <section className="bg-surface py-20">
      <div className="mx-auto max-w-4xl px-4 md:px-6">
        <SectionEyebrow>Social Proof</SectionEyebrow>
        <SectionHeading>Trusted by Store Owners</SectionHeading>
        <SectionSub>Real results from real business owners who transformed their stores.</SectionSub>
        <div className="relative mt-12 rounded-3xl bg-card p-8 shadow-xl ring-1 ring-border md:p-12">
          <div className="mx-auto mb-6 grid h-20 w-20 place-items-center rounded-full bg-primary-soft text-3xl font-bold text-primary">
            {t.name.charAt(0)}
          </div>
          <p className="text-center text-lg leading-relaxed text-foreground md:text-xl">
            “{t.quote}”
          </p>
          <div className="mt-6 text-center">
            <div className="font-bold">{t.name}</div>
            <div className="text-sm text-muted-foreground">{t.meta}</div>
          </div>
          <div className="mt-8 flex items-center justify-center gap-3">
            <button onClick={prev} aria-label="Previous slide" className="grid h-10 w-10 place-items-center rounded-full border border-border hover:bg-accent">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex gap-1.5">
              {TESTIMONIALS.map((_, idx) => (
                <button key={idx} aria-label={`Go to slide ${idx + 1}`} onClick={() => setI(idx)} className={`h-2 rounded-full transition-all ${idx === i ? "w-8 bg-primary" : "w-2 bg-border"}`} />
              ))}
            </div>
            <button onClick={next} aria-label="Next slide" className="grid h-10 w-10 place-items-center rounded-full border border-border hover:bg-accent">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- About ---------- */
function About() {
  return (
    <section id="about" className="py-20">
      <div className="mx-auto max-w-4xl px-4 md:px-6">
        <SectionHeading>About RaylarPro</SectionHeading>
        <div className="mt-8 space-y-5 text-base leading-relaxed text-muted-foreground md:text-lg">
          <p>
            RaylarPro is led by <span className="font-semibold text-foreground">Yusuff Rasheed</span>,
            a Shopify Specialist with expertise in building, optimizing, and scaling Shopify stores
            for businesses across various industries. I help entrepreneurs and brands transform their
            ideas into professional, conversion-focused online stores that are designed for long-term
            growth.
          </p>
          <p>
            My services include Shopify store setup and redesign, theme customization, product
            listing optimization, conversion rate optimization (CRO), technical and on-page SEO,
            speed optimization, Shopify app integration, email marketing with Klaviyo, analytics
            setup, and sales funnel optimization.
          </p>
          <p>
            I also develop strategies to improve store visibility through SEO, content marketing, and
            digital marketing, helping businesses generate sustainable traffic and sales. My goal is
            not just to build attractive stores, but to create eCommerce businesses that perform,
            convert visitors into customers, and continue growing over time.
          </p>
        </div>
        <ul className="mt-10 grid gap-3 sm:grid-cols-2">
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
      </div>
    </section>
  );
}

/* ---------- Expertise ---------- */
function Expertise() {
  return (
    <section id="services" className="bg-surface py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading>My Expertise</SectionHeading>
        <SectionSub>Specialized skills to grow your e-commerce business.</SectionSub>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {EXPERTISE.map((e) => (
            <div key={e.title} className="rounded-2xl bg-card p-8 shadow-sm ring-1 ring-border">
              <div className="mb-5 grid h-14 w-14 place-items-center rounded-xl bg-primary text-primary-foreground">
                <e.icon className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold">{e.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {e.items.map((it) => (
                  <li key={it} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-primary" />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Projects ---------- */
function Projects() {
  return (
    <section id="projects" className="py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading>Project Showcase</SectionHeading>
        <SectionSub>A collection of websites I have built for clients. Each one designed to meet their specific needs and goals.</SectionSub>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((p) => (
            <a key={p.title} href={p.url} target="_blank" rel="noreferrer" className="group overflow-hidden rounded-2xl bg-card ring-1 ring-border transition hover:-translate-y-1 hover:shadow-xl">
              <div className="aspect-[4/3] overflow-hidden bg-muted">
                <img src={p.img} alt={`${p.title} website screenshot`} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
              </div>
              <div className="p-5">
                <div className="mb-2 inline-flex rounded-full bg-primary-soft px-2.5 py-0.5 text-xs font-semibold text-accent-foreground">{p.tag}</div>
                <h3 className="text-lg font-bold">{p.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
                <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                  Visit site <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Free tool ---------- */
function FreeTool() {
  const [url, setUrl] = useState("");
  return (
    <section className="py-20">
      <div className="mx-auto max-w-3xl px-4 md:px-6">
        <div className="rounded-3xl bg-gradient-to-br from-primary to-emerald-700 p-10 text-primary-foreground shadow-2xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold">
            <Sparkles className="h-3.5 w-3.5" /> Free Tool
          </div>
          <h2 className="mt-4 text-3xl font-extrabold md:text-4xl">Free Shopify Store Checker</h2>
          <p className="mt-2 text-white/90">See Your Opportunities Instantly.</p>
          <p className="mt-4 text-sm text-white/80">Paste your Shopify store link to instantly generate a simple audit showing top issues + wins.</p>
          <form onSubmit={(e) => { e.preventDefault(); window.open(`${WHATSAPP}?text=${encodeURIComponent(`Please audit my store: ${url}`)}`, "_blank"); }} className="mt-6 flex flex-col gap-3 sm:flex-row">
            <input value={url} onChange={(e) => setUrl(e.target.value)} type="url" required placeholder="https://your-store.com" className="flex-1 rounded-lg bg-white/95 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-white" />
            <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-lg bg-background px-6 py-3 text-sm font-bold text-primary hover:bg-white transition">
              <Search className="h-4 w-4" /> Generate My Report
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

/* ---------- Reviews grid ---------- */
function Reviews() {
  return (
    <section className="bg-surface py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionEyebrow>Client Feedback</SectionEyebrow>
        <SectionHeading>What Clients Are Saying</SectionHeading>
        <SectionSub>Real words from real people who trusted me with their projects.</SectionSub>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
        <p className="mt-10 text-center text-sm italic text-muted-foreground">...and many more satisfied clients</p>
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */
function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="py-20">
      <div className="mx-auto max-w-3xl px-4 md:px-6">
        <SectionHeading>Frequently Asked Questions</SectionHeading>
        <SectionSub>Got questions? Here are answers to the ones I hear most often.</SectionSub>
        <div className="mt-10 space-y-3">
          {FAQS.map((f, i) => (
            <div key={f.q} className="rounded-xl border border-border bg-card">
              <button onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-semibold">
                <span>{f.q}</span>
                <ChevronRight className={`h-5 w-5 flex-none text-primary transition ${open === i ? "rotate-90" : ""}`} />
              </button>
              {open === i && (
                <div className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">{f.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Contact ---------- */
function Contact() {
  return (
    <section id="contact" className="bg-surface py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading>Ready to Start Your Project?</SectionHeading>
        <SectionSub>Drop me a message or reach out on WhatsApp. Let us talk about your website vision.</SectionSub>
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget);
              const msg = `Hi RaylarPro, I'm ${fd.get("name")}. ${fd.get("message")}`;
              window.open(`${WHATSAPP}?text=${encodeURIComponent(msg)}`, "_blank");
            }}
            className="rounded-2xl bg-card p-8 shadow-sm ring-1 ring-border"
          >
            <h3 className="text-xl font-bold">Send a Message</h3>
            <div className="mt-6 space-y-4">
              <Field name="name" label="Your Name" placeholder="Jane Doe" />
              <Field name="email" type="email" label="Email Address" placeholder="you@example.com" />
              <div>
                <label className="mb-1.5 block text-sm font-semibold">Your Message</label>
                <textarea name="message" required rows={5} placeholder="Tell me about your project..." className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
              <button type="submit" className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-bold text-primary-foreground hover:opacity-90 transition">
                <Send className="h-4 w-4" /> Send Message
              </button>
            </div>
          </form>
          <div>
            <div className="rounded-2xl bg-card p-8 shadow-sm ring-1 ring-border">
              <h3 className="text-xl font-bold">Contact Details</h3>
              <div className="mt-6 space-y-5">
                <ContactRow icon={Mail} title="Email" value="raylarpro@gmail.com" href="mailto:raylarpro@gmail.com" />
                <ContactRow icon={Phone} title="Phone" value="+234 906 381 2609" href="tel:+2349063812609" />
                <ContactRow icon={MessageCircle} title="WhatsApp" value="+234 906 381 2609" href={WHATSAPP} />
                <ContactRow icon={Globe} title="Location" value="United Kingdom · Worldwide (Remote)" />
              </div>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <Perk icon={Zap} title="Quick Response" desc="Get answers within hours" />
              <Perk icon={MessageSquare} title="Direct Contact" desc="No bots, just real conversation" />
              <Perk icon={Clock} title="Always Available" desc="Ready when you are" />
            </div>
            <div className="mt-6 rounded-2xl bg-gradient-to-br from-primary to-emerald-700 p-6 text-primary-foreground">
              <h4 className="text-lg font-bold">Let's Connect</h4>
              <p className="mt-1 text-sm text-white/90">Book a free call or chat on WhatsApp to bring your website vision to life.</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <a href={CALENDLY} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg bg-background px-4 py-2 text-sm font-semibold text-primary hover:bg-white">
                  <Calendar className="h-4 w-4" /> Book a Call
                </a>
                <a href={WHATSAPP} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg bg-white/15 px-4 py-2 text-sm font-semibold text-primary-foreground ring-1 ring-white/40 hover:bg-white/25">
                  <MessageCircle className="h-4 w-4" /> WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Footer ---------- */
function Footer() {
  return (
    <footer className="border-t border-border bg-background py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 md:flex-row md:px-6">
        <div className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-sm font-black text-primary-foreground">R</span>
          <span className="font-bold">RaylarPro</span>
        </div>
        <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} RaylarPro. All rights reserved.</p>
      </div>
    </footer>
  );
}

/* ---------- Floating ---------- */
function FloatingButtons() {
  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-3">
      <a href={CALENDLY} target="_blank" rel="noreferrer" aria-label="Book a Call" className="grid h-12 w-12 place-items-center rounded-full bg-foreground text-background shadow-lg hover:scale-105 transition">
        <Calendar className="h-5 w-5" />
      </a>
      <a href={WHATSAPP} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="grid h-12 w-12 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg hover:scale-105 transition">
        <MessageCircle className="h-5 w-5" />
      </a>
    </div>
  );
}

/* ---------- Helpers ---------- */
function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return <div className="text-center text-xs font-bold uppercase tracking-widest text-primary">{children}</div>;
}
function SectionHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="mt-2 text-center text-3xl font-extrabold tracking-tight md:text-4xl">{children}</h2>;
}
function SectionSub({ children }: { children: React.ReactNode }) {
  return <p className="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">{children}</p>;
}
function Field({ name, label, type = "text", placeholder }: { name: string; label: string; type?: string; placeholder?: string }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-semibold">{label}</label>
      <input name={name} type={type} required placeholder={placeholder} className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30" />
    </div>
  );
}
function ContactRow({ icon: Icon, title, value, href }: { icon: any; title: string; value: string; href?: string }) {
  const inner = (
    <>
      <div className="grid h-11 w-11 flex-none place-items-center rounded-xl bg-primary-soft text-primary">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{title}</div>
        <div className="text-sm font-semibold">{value}</div>
      </div>
    </>
  );
  return href ? (
    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="flex items-center gap-4 hover:text-primary transition">{inner}</a>
  ) : (
    <div className="flex items-center gap-4">{inner}</div>
  );
}
function Perk({ icon: Icon, title, desc }: { icon: any; title: string; desc: string }) {
  return (
    <div className="rounded-xl bg-card p-4 text-center ring-1 ring-border">
      <Icon className="mx-auto h-5 w-5 text-primary" />
      <div className="mt-2 text-sm font-bold">{title}</div>
      <div className="text-xs text-muted-foreground">{desc}</div>
    </div>
  );
}
