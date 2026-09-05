import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CalendarCheck,
  CheckCircle2,
  Download,
  Gauge,
  HelpCircle,
  Loader2,
  Rocket,
  Search,
  Sparkles,
  TrendingUp,
  User,
  X,
} from "lucide-react";
import { z } from "zod";
import { runStoreAudit } from "@/lib/store-audit.functions";
import type { AuditResult } from "@/lib/store-audit";

const SESSION_KEY = "raylarpro.intent-popup.seen";
const DELAY_MS = 15000;

type Intent = { id: string; label: string; icon: typeof Rocket; to?: string; hash?: string };

const INTENTS: Intent[] = [
  { id: "growth", label: "I want help growing my Shopify store", icon: TrendingUp, to: "/contact" },
  { id: "audit", label: "I want a free Shopify store audit", icon: Gauge },
  { id: "about", label: "I want to learn more about RaylarPro", icon: User, to: "/about" },
  { id: "services", label: "I want to explore your services", icon: Sparkles, to: "/services" },
  { id: "question", label: "I have a specific question", icon: HelpCircle, to: "/contact" },
  { id: "other", label: "Something else", icon: Search, to: "/case-studies" },
];

const CHALLENGES = [
  "More conversions",
  "More traffic",
  "Better Shopify store",
  "Faster website",
  "Better retention",
  "I'm not sure",
];

const PROGRESS_STEPS = [
  "Analyzing your storefront…",
  "Checking conversion signals…",
  "Reviewing trust elements…",
  "Checking performance…",
  "Preparing your opportunities…",
];

const formSchema = z.object({
  storeUrl: z
    .string()
    .trim()
    .min(4, { message: "Enter your store URL" })
    .max(255)
    .refine((v) => /^([a-z0-9-]+\.)+[a-z]{2,}/i.test(v.replace(/^https?:\/\//i, "")), {
      message: "Enter a valid store URL, e.g. yourstore.com",
    }),
  email: z.string().trim().email({ message: "Enter a valid email address" }).max(255),
});

const scoreTone = (n: number) =>
  n >= 80 ? "text-primary" : n >= 60 ? "text-foreground" : "text-destructive";

function ScoreBar({ label, score, delay }: { label: string; score: number; delay: number }) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3 text-sm">
        <span className="font-medium text-muted-foreground">{label}</span>
        <span className={`font-bold tabular-nums ${scoreTone(score)}`}>{score}</span>
      </div>
      <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
          className="h-full rounded-full bg-primary"
        />
      </div>
    </div>
  );
}

function ScoreRing({ score }: { score: number }) {
  const r = 52;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative grid h-32 w-32 shrink-0 place-items-center">
      <svg viewBox="0 0 120 120" className="h-32 w-32 -rotate-90">
        <circle cx="60" cy="60" r={r} className="stroke-secondary" strokeWidth="8" fill="none" />
        <motion.circle
          cx="60"
          cy="60"
          r={r}
          className="stroke-primary"
          strokeWidth="8"
          strokeLinecap="round"
          fill="none"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: c - (c * score) / 100 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>
      <div className="absolute text-center">
        <div className="text-3xl font-black tracking-tight tabular-nums">{score}</div>
        <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">/ 100</div>
      </div>
    </div>
  );
}

export function IntentPopup() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<"intent" | "form" | "analyzing" | "results" | "error">("intent");
  const [intent, setIntent] = useState<string | null>(null);
  const [values, setValues] = useState({ storeUrl: "", email: "", challenge: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<AuditResult | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const dialogRef = useRef<HTMLDivElement>(null);
  const audit = useServerFn(runStoreAudit);

  const close = useCallback(() => {
    setOpen(false);
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      /* ignore */
    }
    if (seen) return;

    const timer = window.setTimeout(() => {
      const el = document.activeElement as HTMLElement | null;
      const typing =
        !!el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.isContentEditable);
      const otherModal = !!document.querySelector('[role="dialog"], [data-state="open"][role="alertdialog"]');
      if (typing || otherModal || document.hidden) return;
      setOpen(true);
      try {
        sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        /* ignore */
      }
    }, DELAY_MS);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && step !== "analyzing") close();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, step, close]);

  useEffect(() => {
    if (step !== "analyzing") return;
    setProgress(0);
    const id = window.setInterval(() => setProgress((p) => Math.min(p + 1, PROGRESS_STEPS.length - 1)), 900);
    return () => window.clearInterval(id);
  }, [step]);

  function pickIntent(item: Intent) {
    setIntent(item.label);
    if (item.id === "audit") {
      setStep("form");
      return;
    }
    close();
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = formSchema.safeParse(values);
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) next[String(issue.path[0])] = issue.message;
      setErrors(next);
      return;
    }
    setErrors({});
    setStep("analyzing");
    try {
      const res = await audit({
        data: {
          storeUrl: parsed.data.storeUrl,
          email: parsed.data.email,
          intent: intent ?? undefined,
          challenge: values.challenge || undefined,
        },
      });
      setResult(res);
      setStep("results");
    } catch (err) {
      setErrorMsg(
        err instanceof Error && err.message && err.message.length < 200
          ? err.message
          : "Something went wrong running your audit. Please try again in a moment.",
      );
      setStep("error");
    }
  }

  function download() {
    if (!result) return;
    const lines = [
      `RaylarPro , Quick Shopify Store Audit`,
      `Store: ${result.url}`,
      `Date: ${new Date(result.checkedAt).toUTCString()}`,
      ``,
      `Overall score: ${result.overall}/100`,
      ...result.categories.map((c) => `  ${c.label}: ${c.score}`),
      ``,
      `Your biggest opportunities`,
      ...result.findings.map((f, i) => `  ${String(i + 1).padStart(2, "0")}. ${f.title}\n      ${f.detail}`),
      ``,
      result.platformNote,
      `This is a quick automated assessment based on publicly accessible information from your storefront.`,
      `Prepared by RaylarPro , raylarpro.lovable.app`,
    ];
    const blob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `raylarpro-audit-${result.domain}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const field =
    "mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/30";
  const ring =
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[120] flex items-end justify-center bg-foreground/40 p-0 backdrop-blur-sm sm:items-center sm:p-6"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget && step !== "analyzing") close();
          }}
        >
          <motion.div
            ref={dialogRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-label="What brings you to RaylarPro?"
            initial={{ y: 32, opacity: 0, scale: 0.985 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 24, opacity: 0, scale: 0.99 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            className="relative max-h-[92dvh] w-full max-w-2xl overflow-y-auto overscroll-contain rounded-t-3xl border border-border bg-card p-6 shadow-2xl shadow-foreground/10 outline-none sm:rounded-3xl sm:p-9"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 -top-24 mx-auto h-48 w-2/3 rounded-full bg-primary/20 blur-3xl"
            />

            <button
              type="button"
              onClick={close}
              aria-label="Close"
              disabled={step === "analyzing"}
              className={`absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-border bg-background text-muted-foreground transition hover:text-foreground disabled:opacity-40 ${ring}`}
            >
              <X className="h-4 w-4" />
            </button>

            <div className="relative">
              {/* ---------- INTENT ---------- */}
              {step === "intent" && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                  <div className="text-xs font-bold uppercase tracking-[0.2em] text-primary">RaylarPro</div>
                  <h2 className="mt-3 pr-10 text-2xl font-black leading-tight tracking-tight sm:text-3xl">
                    What brings you to RaylarPro?
                  </h2>
                  <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">
                    Whether you're looking to grow your Shopify store, explore my work, or simply see what's
                    possible, I'm happy to point you in the right direction.
                  </p>

                  <div className="mt-6 grid gap-2.5 sm:grid-cols-2">
                    {INTENTS.map((item, i) => {
                      const Icon = item.icon;
                      const inner = (
                        <>
                          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                            <Icon className="h-4 w-4" />
                          </span>
                          <span className="text-left text-sm font-semibold leading-snug">{item.label}</span>
                          <ArrowRight className="ml-auto h-4 w-4 shrink-0 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-primary" />
                        </>
                      );
                      const cls = `group flex w-full items-center gap-3 rounded-2xl border border-border bg-background p-3.5 transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10 ${ring}`;
                      return (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.05 + i * 0.04 }}
                        >
                          {item.to ? (
                            <Link to={item.to} onClick={() => pickIntent(item)} className={cls}>
                              {inner}
                            </Link>
                          ) : (
                            <button type="button" onClick={() => pickIntent(item)} className={cls}>
                              {inner}
                            </button>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* ---------- FORM ---------- */}
              {step === "form" && (
                <motion.form
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  onSubmit={submit}
                  noValidate
                >
                  <button
                    type="button"
                    onClick={() => setStep("intent")}
                    className={`inline-flex items-center gap-1.5 rounded-full text-xs font-semibold text-muted-foreground transition hover:text-foreground ${ring}`}
                  >
                    <ArrowLeft className="h-3.5 w-3.5" /> Back
                  </button>
                  <h2 className="mt-4 pr-10 text-2xl font-black leading-tight tracking-tight sm:text-3xl">
                    Let's find your store's biggest opportunities.
                  </h2>
                  <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">
                    Enter your store URL and I'll run a quick conversion, trust, UX, performance and SEO check.
                  </p>

                  <div className="mt-6 grid gap-4">
                    <div>
                      <label htmlFor="ip-url" className="text-sm font-semibold">Store URL</label>
                      <input
                        id="ip-url"
                        autoFocus
                        value={values.storeUrl}
                        onChange={(e) => setValues((v) => ({ ...v, storeUrl: e.target.value }))}
                        placeholder="yourstore.com"
                        maxLength={255}
                        className={field}
                      />
                      {errors["storeUrl"] && (
                        <p className="mt-1.5 text-xs font-medium text-destructive">{errors["storeUrl"]}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="ip-email" className="text-sm font-semibold">Email address</label>
                      <input
                        id="ip-email"
                        type="email"
                        value={values.email}
                        onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
                        placeholder="you@company.com"
                        maxLength={255}
                        className={field}
                      />
                      {errors["email"] && (
                        <p className="mt-1.5 text-xs font-medium text-destructive">{errors["email"]}</p>
                      )}
                    </div>
                    <div>
                      <span className="text-sm font-semibold">
                        What is your biggest growth challenge?{" "}
                        <span className="font-normal text-muted-foreground">(optional)</span>
                      </span>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {CHALLENGES.map((c) => {
                          const active = values.challenge === c;
                          return (
                            <button
                              key={c}
                              type="button"
                              aria-pressed={active}
                              onClick={() => setValues((v) => ({ ...v, challenge: active ? "" : c }))}
                              className={`rounded-full border px-3.5 py-2 text-xs font-semibold transition ${ring} ${
                                active
                                  ? "border-primary bg-primary-soft text-primary"
                                  : "border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground"
                              }`}
                            >
                              {c}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className={`group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-foreground py-3.5 pl-6 pr-3 text-sm font-semibold text-background transition hover:-translate-y-0.5 sm:w-auto ${ring}`}
                  >
                    Run My Free Audit
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-primary text-primary-foreground transition-transform group-hover:translate-x-0.5">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </button>
                  <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                    A quick automated assessment based on publicly accessible information from your storefront.
                  </p>
                </motion.form>
              )}

              {/* ---------- ANALYZING ---------- */}
              {step === "analyzing" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-10 text-center">
                  <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-primary-soft text-primary">
                    <Loader2 className="h-6 w-6 animate-spin" />
                  </span>
                  <h2 className="mt-6 text-xl font-black tracking-tight sm:text-2xl">Running your audit</h2>
                  <div className="mt-6 space-y-2" role="status" aria-live="polite">
                    {PROGRESS_STEPS.map((s, i) => (
                      <div
                        key={s}
                        className={`text-sm transition ${
                          i < progress ? "text-muted-foreground" : i === progress ? "font-semibold text-foreground" : "text-muted-foreground/40"
                        }`}
                      >
                        {i < progress && <CheckCircle2 className="mr-1.5 inline h-3.5 w-3.5 text-primary" />}
                        {s}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* ---------- RESULTS ---------- */}
              {step === "results" && result && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                  <div className="text-xs font-bold uppercase tracking-[0.2em] text-primary">{result.domain}</div>
                  <h2 className="mt-3 pr-10 text-2xl font-black tracking-tight sm:text-3xl">
                    Your RaylarPro Store Score
                  </h2>

                  <div className="mt-6 flex flex-col items-center gap-6 rounded-3xl border border-border bg-background p-5 sm:flex-row sm:p-6">
                    <ScoreRing score={result.overall} />
                    <div className="w-full flex-1 space-y-3.5">
                      {result.categories.map((c, i) => (
                        <ScoreBar key={c.key} label={c.label} score={c.score} delay={0.15 + i * 0.08} />
                      ))}
                    </div>
                  </div>

                  <h3 className="mt-8 text-lg font-black tracking-tight">Your biggest opportunities</h3>
                  <ol className="mt-4 space-y-3">
                    {result.findings.map((f, i) => (
                      <motion.li
                        key={f.title}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + i * 0.06 }}
                        className="flex gap-3.5 rounded-2xl border border-border bg-background p-4"
                      >
                        <span className="text-sm font-black tabular-nums text-primary">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <div>
                          <div className="text-sm font-bold leading-snug">{f.title}</div>
                          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{f.detail}</p>
                        </div>
                      </motion.li>
                    ))}
                  </ol>

                  <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                    {result.platformNote} This is a quick automated assessment based on publicly accessible
                    information , not a full technical or analytics audit.
                  </p>

                  <div className="mt-8 rounded-3xl border border-primary/30 bg-primary-soft/50 p-5 sm:p-6">
                    <h3 className="text-lg font-black tracking-tight">
                      Want to turn these opportunities into growth?
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      I can help you fix the technical, conversion and growth issues holding your Shopify store
                      back.
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2.5">
                      <Link
                        to="/contact"
                        onClick={close}
                        className={`group inline-flex items-center gap-2 rounded-full bg-foreground py-3 pl-5 pr-3 text-sm font-semibold text-background transition hover:-translate-y-0.5 ${ring}`}
                      >
                        Start Your Project
                        <span className="grid h-7 w-7 place-items-center rounded-full bg-primary text-primary-foreground">
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </span>
                      </Link>
                      <Link
                        to="/contact"
                        onClick={close}
                        className={`inline-flex items-center gap-2 rounded-full border-2 border-primary px-5 py-3 text-sm font-semibold text-primary transition hover:bg-primary-soft ${ring}`}
                      >
                        <CalendarCheck className="h-4 w-4" /> Book a Strategy Call
                      </Link>
                      <button
                        type="button"
                        onClick={download}
                        className={`inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-3 text-sm font-semibold transition hover:border-primary/40 ${ring}`}
                      >
                        <Download className="h-4 w-4" /> Download Audit
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ---------- ERROR ---------- */}
              {step === "error" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-8 text-center">
                  <h2 className="text-xl font-black tracking-tight sm:text-2xl">We couldn't finish that audit</h2>
                  <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">{errorMsg}</p>
                  <div className="mt-6 flex flex-wrap justify-center gap-2.5">
                    <button
                      type="button"
                      onClick={() => setStep("form")}
                      className={`inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-semibold text-background transition hover:-translate-y-0.5 ${ring}`}
                    >
                      Try again
                    </button>
                    <button
                      type="button"
                      onClick={close}
                      className={`inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-semibold transition hover:border-primary/40 ${ring}`}
                    >
                      Close
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
