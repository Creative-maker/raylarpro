import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Rocket, Linkedin, Menu, X, MessageCircle, Calendar } from "lucide-react";
import { MARQUEE_TEXT, NAV, CALENDLY, WHATSAPP } from "./site-data";

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

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground font-black">R</span>
          <span className="text-lg font-bold tracking-tight">RaylarPro</span>
        </Link>
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-muted-foreground">
          {NAV.map((n) => (
            <Link
              key={n.label}
              to={n.to}
              activeOptions={{ exact: true }}
              activeProps={{ className: "text-foreground" }}
              className="hover:text-foreground transition-colors"
            >
              {n.label}
            </Link>
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
              <Link key={n.label} to={n.to} onClick={() => setOpen(false)} className="py-1 text-sm font-medium">
                {n.label}
              </Link>
            ))}
            <a href={CALENDLY} target="_blank" rel="noreferrer" className="mt-2 inline-flex justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">Book a Call</a>
          </div>
        </div>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-background py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 md:flex-row md:px-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-sm font-black text-primary-foreground">R</span>
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
  return <h1 className="mt-2 text-center text-3xl font-extrabold tracking-tight md:text-4xl">{children}</h1>;
}
export function SectionSub({ children }: { children: React.ReactNode }) {
  return <p className="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">{children}</p>;
}
