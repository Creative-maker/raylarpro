import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2, Loader2 } from "lucide-react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

const schema = z.object({
  name: z.string().trim().nonempty({ message: "Please enter your name" }).max(100),
  email: z.string().trim().email({ message: "Enter a valid email address" }).max(255),
  storeUrl: z.string().trim().max(255).optional(),
  message: z.string().trim().max(1000).optional(),
});

type Props = { serviceSlug: string; serviceName: string };

export function AuditForm({ serviceSlug, serviceName }: Props) {
  const [values, setValues] = useState({ name: "", email: "", storeUrl: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  const set = (k: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setValues((v) => ({ ...v, [k]: e.target.value }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) next[String(issue.path[0])] = issue.message;
      setErrors(next);
      return;
    }
    setErrors({});
    setStatus("sending");
    const { error } = await supabase.from("audit_leads").insert({
      name: parsed.data.name,
      email: parsed.data.email,
      store_url: parsed.data.storeUrl || null,
      message: parsed.data.message || null,
      service_slug: serviceSlug,
      service_name: serviceName,
    });
    if (error) {
      setStatus("error");
      return;
    }
    setStatus("done");
  }

  const field =
    "mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/30";

  return (
    <div id="audit-form" className="scroll-mt-28 rounded-3xl border border-border bg-card p-6 md:p-9">
      {status === "done" ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          role="status"
          aria-live="polite"
          className="py-8 text-center"
        >
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-primary-soft text-primary">
            <CheckCircle2 className="h-7 w-7" />
          </span>
          <h3 className="mt-5 text-2xl font-black tracking-tight">Request received</h3>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
            Thanks {values.name.split(" ")[0]} — your free {serviceName.toLowerCase()} audit request is in. I'll review
            your store and reply to <span className="font-semibold text-foreground">{values.email}</span> within one
            business day.
          </p>
          <button
            type="button"
            onClick={() => {
              setValues({ name: "", email: "", storeUrl: "", message: "" });
              setStatus("idle");
            }}
            className="mt-6 inline-flex items-center gap-2 rounded-full border-2 border-primary px-5 py-2.5 text-sm font-semibold text-primary transition hover:bg-primary-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            Send another request
          </button>
        </motion.div>
      ) : (
        <form onSubmit={onSubmit} noValidate className="grid gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Free Store Audit</div>
            <h3 className="mt-3 text-2xl font-black tracking-tight md:text-3xl">
              Get a free audit for {serviceName}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Tell me about your store and I'll send back a prioritised list of fixes — no cost, no obligation.
            </p>
          </div>

          <div>
            <label htmlFor="af-name" className="text-sm font-semibold">Name</label>
            <input id="af-name" value={values.name} onChange={set("name")} maxLength={100} className={field} placeholder="Your name" />
            {errors['name'] && <p className="mt-1.5 text-xs font-medium text-destructive">{errors['name']}</p>}
          </div>

          <div>
            <label htmlFor="af-email" className="text-sm font-semibold">Email</label>
            <input id="af-email" type="email" value={values.email} onChange={set("email")} maxLength={255} className={field} placeholder="you@company.com" />
            {errors['email'] && <p className="mt-1.5 text-xs font-medium text-destructive">{errors['email']}</p>}
          </div>

          <div className="md:col-span-2">
            <label htmlFor="af-store" className="text-sm font-semibold">Store URL <span className="font-normal text-muted-foreground">(optional)</span></label>
            <input id="af-store" value={values.storeUrl} onChange={set("storeUrl")} maxLength={255} className={field} placeholder="yourstore.com" />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="af-message" className="text-sm font-semibold">What do you need help with? <span className="font-normal text-muted-foreground">(optional)</span></label>
            <textarea id="af-message" rows={4} value={values.message} onChange={set("message")} maxLength={1000} className={field} placeholder="Share goals, current issues, or timelines." />
          </div>

          {status === "error" && (
            <p role="alert" className="md:col-span-2 rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
              Something went wrong sending your request. Please try again in a moment.
            </p>
          )}

          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={status === "sending"}
              className="group inline-flex items-center gap-2 rounded-full bg-foreground py-3 pl-6 pr-3 text-sm font-semibold text-background transition hover:-translate-y-0.5 disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {status === "sending" ? "Sending…" : "Get My Free Store Audit"}
              <span className="grid h-8 w-8 place-items-center rounded-full bg-primary text-primary-foreground transition-transform group-hover:translate-x-0.5">
                {status === "sending" ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowUpRight className="h-4 w-4" />}
              </span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
