import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Check, Copy, Loader2, Sparkles, Square } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Button } from "@/components/ui/button";
import { storeRecommendationInput, recommendationGoals, type RecommendationInput, type RecommendationEvent } from "@/lib/store-recommendations";

export function StoreRecommendations() {
  const [description, setDescription] = useState("");
  const [goal, setGoal] = useState<RecommendationInput["goal"]>("conversion");
  const [answer, setAnswer] = useState("");
  const [thinking, setThinking] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState<"idle" | "generating" | "done" | "stopped">("idle");
  const [copied, setCopied] = useState(false);
  const abort = useRef<AbortController | null>(null);
  useEffect(() => () => abort.current?.abort(), []);

  async function generate(event: React.FormEvent) {
    event.preventDefault();
    if (status === "generating") return;
    const input = storeRecommendationInput.safeParse({ description, goal });
    if (!input.success) { setError(input.error.issues[0]?.message || "Check your description."); return; }
    setError(""); setAnswer(""); setThinking(""); setCopied(false); setStatus("generating");
    const controller = new AbortController(); abort.current = controller;
    let completed = false;
    try {
      const response = await fetch("/api/public/store-recommendations", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(input.data), signal: controller.signal });
      if (!response.ok) {
        const body = await response.json() as { error?: string };
        throw new Error(body.error || "Recommendations are temporarily unavailable.");
      }
      if (!response.body) throw new Error("No recommendations were returned.");
      const reader = response.body.getReader(); const decoder = new TextDecoder(); let buffer = "";
      const receive = (line: string) => {
        if (!line.trim()) return;
        const part = JSON.parse(line) as RecommendationEvent;
        if (part.type === "text") setAnswer(value => value + (part.text || ""));
        if (part.type === "thinking") setThinking(value => value + (part.text || ""));
        if (part.type === "error") throw new Error(part.text || "Recommendations could not be completed.");
        if (part.type === "done") completed = true;
      };
      while (true) {
        const { value, done } = await reader.read();
        buffer += decoder.decode(value, { stream: !done });
        const lines = buffer.split("\n"); buffer = lines.pop() || ""; lines.forEach(receive);
        if (done) break;
      }
      receive(buffer);
      if (!completed) throw new Error("The response was interrupted. Your partial recommendations are shown below.");
      setStatus("done");
    } catch (failure) {
      if (controller.signal.aborted) setStatus("stopped");
      else { setError(failure instanceof Error ? failure.message : "Recommendations could not be completed."); setStatus("idle"); }
    } finally { abort.current = null; }
  }

  return (
    <section id="store-recommendations" className="scroll-mt-28 bg-surface py-20">
      <div className="mx-auto max-w-5xl px-4 md:px-6">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary"><Sparkles className="size-4" /> Shopify Growth Planner</div>
        <h2 className="mt-4 text-3xl font-extrabold md:text-4xl">Your store. Your next steps.</h2>
        <div className="mt-8 grid gap-8 md:grid-cols-[1fr_1.2fr]">
          <form onSubmit={generate} className="space-y-5">
            <div>
              <label htmlFor="recommendation-description" className="text-sm font-semibold">Tell us about your Shopify store</label>
              <textarea id="recommendation-description" value={description} onChange={e => setDescription(e.target.value)} disabled={status === "generating"} maxLength={4000} rows={8} aria-describedby="recommendation-privacy" placeholder="What do you sell? Who are your customers? Share your store stage, current challenges, and any budget or time constraints." className="mt-2 w-full resize-y rounded-lg border border-input bg-background p-4 text-sm leading-relaxed outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-60" />
              <div className="mt-1 text-right text-xs text-muted-foreground">{description.length.toLocaleString()} / 4,000</div>
            </div>
            <div>
              <label htmlFor="recommendation-goal" className="text-sm font-semibold">Your main goal</label>
              <select id="recommendation-goal" value={goal} disabled={status === "generating"} onChange={e => setGoal(e.target.value as RecommendationInput["goal"])} className="mt-2 w-full rounded-lg border border-input bg-background p-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                {Object.entries(recommendationGoals).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
              </select>
            </div>
            <p id="recommendation-privacy" className="text-xs leading-relaxed text-muted-foreground">Your description is sent to AI to generate advice. Do not include passwords, customer details, or confidential information.</p>
            {error && <p role="alert" className="break-words rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">{error}</p>}
            <div className="flex flex-wrap gap-2">
              <Button type="submit" disabled={status === "generating"} size="lg" className="h-auto min-h-11 whitespace-normal px-5 py-3">{status === "generating" ? <Loader2 className="animate-spin motion-reduce:animate-none" /> : <Sparkles />} {status === "generating" ? "Creating your plan…" : "Generate recommendations"}<ArrowUpRight /></Button>
              {status === "generating" && <Button type="button" variant="outline" onClick={() => abort.current?.abort()} className="h-11"><Square />Stop</Button>}
            </div>
          </form>
          <div className="min-w-0 border-t border-border pt-6 md:border-l md:border-t-0 md:pl-8 md:pt-0">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-lg font-bold">Your optimization plan</h3>
              {answer && <Button type="button" variant="ghost" size="icon" title="Copy recommendations" aria-label="Copy recommendations" onClick={async () => { try { await navigator.clipboard.writeText(answer); setCopied(true); } catch { setError("Could not copy recommendations. Please select and copy the text."); } }}>{copied ? <Check /> : <Copy />}</Button>}
            </div>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">AI-generated guidance based on your description, not a live store audit. Verify recommendations before making changes.</p>
            <p role="status" className="mt-5 text-sm text-muted-foreground">{status === "generating" ? (answer ? "Writing your recommendations…" : "Considering your store and goals…") : status === "stopped" ? "Generation stopped. Any partial recommendations are kept below." : status === "done" ? "Your recommendations are ready." : !answer ? "Your priorities and action plan will appear here." : ""}</p>
            {thinking && <details className="mt-4 text-xs text-muted-foreground"><summary className="cursor-pointer">Planning notes</summary><p className="mt-2 whitespace-pre-wrap leading-relaxed">{thinking}</p></details>}
            {answer && <div className="mt-5 break-words text-sm leading-7 [&_h2]:mb-3 [&_h2]:mt-6 [&_h2]:text-xl [&_h2]:font-bold [&_h3]:mb-2 [&_h3]:mt-5 [&_h3]:text-base [&_h3]:font-bold [&_p]:mb-3 [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:mb-4 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:mb-2"><ReactMarkdown allowedElements={["p", "h2", "h3", "h4", "strong", "em", "ul", "ol", "li", "br"]} unwrapDisallowed>{answer}</ReactMarkdown></div>}
          </div>
        </div>
      </div>
    </section>
  );
}