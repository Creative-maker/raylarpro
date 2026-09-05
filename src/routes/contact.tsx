import { createFileRoute } from "@tanstack/react-router";
import {
  Mail, Phone, MessageCircle, Globe, Send, Zap, MessageSquare, Clock, Calendar,
} from "lucide-react";
import { PageHero } from "@/components/site-chrome";
import { WHATSAPP, CALENDLY } from "@/components/site-data";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact RaylarPro , Start Your Shopify Project" },
      { name: "description", content: "Get in touch with RaylarPro. Email, phone, WhatsApp, or book a free call to discuss your Shopify store project." },
      { property: "og:title", content: "Contact RaylarPro" },
      { property: "og:description", content: "Let's talk about your Shopify store." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Ready to Start Your Project?"
        sub="Drop me a message or reach out on WhatsApp. Let us talk about your website vision."
      />
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid gap-8 lg:grid-cols-2">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const fd = new FormData(e.currentTarget);
                const msg = `Hi RaylarPro, I'm ${fd.get("name")}. ${fd.get("message")}`;
                window.open(`${WHATSAPP}?text=${encodeURIComponent(msg)}`, "_blank");
              }}
              className="rounded-2xl bg-card p-8 shadow-sm ring-1 ring-border"
            >
              <h2 className="text-xl font-bold">Send a Message</h2>
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
                <h2 className="text-xl font-bold">Contact Details</h2>
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
                <h3 className="text-lg font-bold">Let's Connect</h3>
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
    </>
  );
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
