import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowUpRight, Linkedin, Menu, X, MessageCircle, Calendar, Rocket } from "lucide-react";
import { MARQUEE_TEXT, NAV, CALENDLY, WHATSAPP } from "./site-data";
import raylarLogo from "@/assets/raylar-logo.png";

export function Marquee() {
  const item = (
    <span className="mx-8 inline-flex items-center gap-2 text-sm">
      <Rocket className="h-4 w-4 text-primary" />
      {MARQUEE_TEXT.split("|").map((p, i, arr) => (
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

export function PillCTA({ href, to, children, className = "" }: { href?: string; to?: string; children: React.ReactNode; className?: string }) {
  const inner = (
    <span className={`group relative inline-flex items-center gap-2 rounded-full bg-foreground py-2 pl-5 pr-2 text-sm font-semibold text-background shadow-[0_10px_30px_-10px_oklch(0.66_0.19_145/0.45)] transition hover:shadow-[0_14px_40px_-10px_oklch(0.66_0.19_145/0.7)] ${className}`}>
      <span>{children}</span>
      <span className="grid h-8 w-8 place-items-center rounded-full bg-primary text-primary-foreground transition-transform duration-300 group-hover:translate-x-0.5 group-hover:rotate-12">
        <ArrowUpRight className="h-4 w-4" />
      </span>
    </span>
  );
  if (to) return <Link to={to}>{inner}</Link>;
  return <a href={href} target="_blank" rel="noreferrer">{inner}</a>;
}

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-3 z-40 px-3 md:top-5 md:px-6"
    >
      <div className="pointer-events-none absolute inset-x-6 top-1/2 -z-10 h-16 -translate-y-1/2 rounded-full bg-primary/20 blur-2xl" />
      <div className="mx-auto flex h-[62px] w-full max-w-[1300px] items-center justify-between rounded-full border border-primary/30 bg-foreground/90 px-3 pl-5 text-background shadow-[0_10px_40px_-10px_rgba(0,0,0,0.35),0_0_0_1px_oklch(0.66_0.19_145/0.15),0_0_30px_-5px_oklch(0.66_0.19_145/0.35)] backdrop-blur-xl md:h-[70px] md:pl-6">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-white p-1">
            <img src={raylarLogo} alt="RaylarPro logo" className="h-full w-full object-contain" />
          </span>
          <span className="text-base font-bold tracking-tight">RaylarPro</span>
        </Link>
        <nav className="hidden xl:flex items-center gap-1 text-sm font-medium">
          {NAV.map((n) => (
            <Link
              key={n.label}
              to={n.to}
              activeOptions={{ exact: true }}
              activeProps={{ className: "text-white [&_span]:scale-x-100" }}
              className="group relative px-3 py-2 text-white/70 transition-colors hover:text-white"
            >
              {n.label}
              <span className="pointer-events-none absolute inset-x-3 -bottom-0.5 h-[2px] origin-left scale-x-0 rounded-full bg-primary transition-transform duration-300 group-hover:scale-x-100" />
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2 shrink-0">
          <PillCTA to="/contact" className="hidden sm:inline-flex">Start Your Project</PillCTA>
          <button onClick={() => setOpen(!open)} className="xl:hidden grid h-10 w-10 place-items-center rounded-full text-white" aria-label="Menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto mt-2 max-w-[1300px] rounded-3xl border border-primary/20 bg-foreground/95 p-4 text-background backdrop-blur-xl xl:hidden"
        >
          <div className="flex flex-col gap-1">
            {NAV.map((n) => (
              <Link key={n.label} to={n.to} onClick={() => setOpen(false)} className="rounded-full px-4 py-2.5 text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white">
                {n.label}
              </Link>
            ))}
            <PillCTA to="/contact" className="mt-2 w-full justify-center">Start Your Project</PillCTA>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-background py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 md:flex-row md:px-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-white p-1 ring-1 ring-border">
            <img src={raylarLogo} alt="RaylarPro logo" className="h-full w-full object-contain" />
          </span>
          <span className="font-bold">RaylarPro</span>
        </Link>
        <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
          {NAV.map((n) => (
            <Link key={n.label} to={n.to} className="hover:text-foreground transition-colors">
              {n.label}
            </Link>
          ))}
        </nav>
        <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} RaylarPro.</p>
      </div>
    </footer>
  );
}

export function FloatingButtons() {
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

export function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return <div className="text-center text-xs font-bold uppercase tracking-widest text-primary">{children}</div>;
}
export function SectionHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="mt-2 text-center text-3xl font-extrabold tracking-tight md:text-4xl">{children}</h2>;
}
export function PageHero({ eyebrow, title, sub }: { eyebrow?: string; title: string; sub?: string }) {
  return (
    <section className="bg-surface py-16 md:py-20">
      <div className="mx-auto max-w-4xl px-4 text-center md:px-6">
        {eyebrow && <div className="text-xs font-bold uppercase tracking-widest text-primary">{eyebrow}</div>}
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight md:text-5xl">{title}</h1>
        {sub && <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">{sub}</p>}
      </div>
    </section>
  );
}
export function SectionSub({ children }: { children: React.ReactNode }) {
  return <p className="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">{children}</p>;
}

// Linkedin re-exported for backwards compat if imported elsewhere
export { Linkedin };
