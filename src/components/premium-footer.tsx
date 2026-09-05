import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Linkedin, Github, Twitter, Dribbble, Mail } from "lucide-react";
import { CALENDLY, NAV } from "./site-data";
import { FooterFaq } from "./footer-faq";
import { SERVICE_PAGES } from "./service-page-data";
import raylarLogo from "@/assets/raylar-logo.png.asset.json";

const FOOTER_SERVICES = SERVICE_PAGES.filter((s) =>
  ["shopify-store-setup", "custom-theme-development", "conversion-rate-optimization", "speed-optimization", "technical-seo", "klaviyo-automation", "store-migration"].includes(s.slug),
);

const SKILLS = [
  "Shopify Development", "Shopify Plus", "Shopify Apps", "Theme Customization",
  "Store Design", "CRO", "Landing Pages", "Performance Optimization",
  "Store Migration", "UI/UX Design", "Liquid Development", "API Integrations",
  "Headless Shopify", "SEO", "Automation",
];

const TONES = [
  "bg-[#0B0B0B] text-white border-black/20",
  "bg-white text-[#0B0B0B] border-black/10",
  "bg-[#16A34A] text-white border-[#16A34A]/40",
];

function SkillPill({ label, i, rot }: { label: string; i: number; rot: number }) {
  const tone = TONES[i % 3];
  const delay = (i % 6) * 0.15;
  return (
    <motion.span
      initial={{ opacity: 0, y: 24, rotate: rot }}
      whileInView={{ opacity: 1, y: 0, rotate: rot }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: i * 0.03, ease: "easeOut" }}
      whileHover={{ y: -6, rotate: 0, scale: 1.05 }}
      className={`inline-flex max-w-full select-none items-center whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-semibold shadow-[0_6px_20px_-8px_rgba(0,0,0,0.25)] backdrop-blur transition-all sm:px-4 sm:py-2 sm:text-sm ${tone}`}
      style={{ transform: `rotate(${rot}deg)` }}
    >
      <motion.span
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 4 + (i % 4), repeat: Infinity, ease: "easeInOut", delay }}
      >
        {label}
      </motion.span>
    </motion.span>
  );
}

const SOCIALS = [
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Dribbble, href: "#", label: "Dribbble" },
  { icon: Mail, href: "mailto:raylarpro@gmail.com", label: "Email" },
];

const SERVICES = FOOTER_SERVICES;

export function PremiumFooter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <footer className="relative overflow-hidden bg-white text-[#0B0B0B]">
      {/* radial green ambient glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(22,163,74,0.18),transparent_70%)] blur-2xl" />
        <div className="absolute bottom-0 right-0 h-[380px] w-[500px] rounded-full bg-[radial-gradient(closest-side,rgba(22,163,74,0.10),transparent_70%)] blur-3xl" />
      </div>

      {/* Skills banner */}
      <section className="relative border-b border-black/5 py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="mb-10 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/60 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#16A34A] backdrop-blur">
              What I do
            </span>
          </div>
          <div className="mx-auto flex max-w-full flex-wrap items-center justify-center gap-2 px-2 sm:gap-3 md:gap-4">
            {SKILLS.map((s, i) => {
              const rot = ((i * 53) % 20) - 10;
              return <SkillPill key={s} label={s} i={i} rot={rot} />;
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative border-b border-black/5 py-24">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#16A34A]/20 blur-3xl" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto max-w-3xl px-4 text-center md:px-6"
        >
          <h2 className="text-4xl font-extrabold tracking-tight md:text-6xl">
            Let's Build Your{" "}
            <span className="relative inline-block text-[#16A34A]">
              Next Shopify Store
              <span className="absolute -bottom-1 left-0 h-1 w-full rounded-full bg-[#16A34A]/30" />
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base text-black/60 md:text-lg">
            Book a free strategy call and let's turn your store into a conversion machine , designed, built, and optimized for growth.
          </p>
          <a
            href={CALENDLY}
            target="_blank"
            rel="noreferrer"
            className="group mt-10 inline-flex items-center gap-3 rounded-full bg-[#0B0B0B] py-3 pl-7 pr-3 text-base font-semibold text-white shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)] transition-all hover:shadow-[0_10px_40px_-5px_rgba(22,163,74,0.6)] hover:-translate-y-0.5"
          >
            Start Your Project
            <span className="grid h-10 w-10 place-items-center rounded-full bg-[#16A34A] text-white transition-transform group-hover:translate-x-1">
              <ArrowRight className="h-5 w-5" />
            </span>
          </a>
        </motion.div>
      </section>

      <FooterFaq />

      {/* Main footer grid */}
      <section className="relative py-16">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 md:grid-cols-2 md:px-6 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-white p-1.5 ring-1 ring-black/10">
                <img src={raylarLogo.url} alt="RaylarPro logo" className="h-full w-full object-contain" />
              </span>
              <span className="text-lg font-bold tracking-tight">RaylarPro</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-black/60">
              Premium Shopify development & CRO for ambitious brands ready to scale their eCommerce.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-black/10 bg-white text-black/70 shadow-sm transition-all hover:scale-110 hover:border-[#16A34A]/40 hover:bg-[#16A34A] hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Nav */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-black/50">Navigation</h3>
            <ul className="mt-5 space-y-3">
              {NAV.map((n) => (
                <li key={n.label}>
                  <Link
                    to={n.to}
                    className="group inline-flex text-sm font-medium text-black/70 transition-colors hover:text-[#16A34A]"
                  >
                    <span className="relative">
                      {n.label}
                      <span className="absolute -bottom-0.5 left-0 h-0.5 w-0 rounded-full bg-[#16A34A] transition-all duration-300 group-hover:w-full" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-black/50">Services</h3>
            <ul className="mt-5 space-y-3">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link
                    to="/services/$slug"
                    params={{ slug: s.slug }}
                    className="group inline-flex text-sm font-medium text-black/70 transition-colors hover:text-[#16A34A]"
                  >
                    <span className="relative">
                      {s.name}
                      <span className="absolute -bottom-0.5 left-0 h-0.5 w-0 rounded-full bg-[#16A34A] transition-all duration-300 group-hover:w-full" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-black/50">Newsletter</h3>
            <p className="mt-5 text-sm text-black/60">
              Monthly Shopify growth tips, CRO teardowns, and store audits. No spam.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (email) setSubscribed(true);
              }}
              className="mt-5 flex flex-col gap-3"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@brand.com"
                className="w-full rounded-full border border-black/10 bg-white px-5 py-3 text-sm outline-none transition-all focus:border-[#16A34A] focus:shadow-[0_0_0_4px_rgba(22,163,74,0.15)]"
              />
              <button
                type="submit"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#0B0B0B] px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-[#16A34A]"
              >
                {subscribed ? "Subscribed ✓" : "Subscribe"}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mx-auto mt-14 max-w-7xl px-4 md:px-6">
          <div className="flex flex-col items-center justify-between gap-4 border-t border-black/10 pt-6 text-xs text-black/50 md:flex-row">
            <p>© {new Date().getFullYear()} RaylarPro. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="#" className="transition-colors hover:text-[#16A34A]">Privacy Policy</a>
              <a href="#" className="transition-colors hover:text-[#16A34A]">Terms</a>
              <a href="#" className="transition-colors hover:text-[#16A34A]">Cookies</a>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
}
