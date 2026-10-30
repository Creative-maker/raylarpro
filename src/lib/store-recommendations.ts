import { z } from "zod";

export const storeRecommendationInput = z.object({
  description: z.string().trim().min(30, "Please share at least 30 characters about your store.").max(4000, "Keep your store description under 4,000 characters."),
  goal: z.enum(["conversion", "traffic", "retention", "speed", "launch"]),
});

export const recommendationGoals = {
  conversion: "Increase conversions",
  traffic: "Grow organic traffic",
  retention: "Bring customers back",
  speed: "Improve store speed",
  launch: "Launch my store",
} as const;

export type RecommendationInput = z.infer<typeof storeRecommendationInput>;
export type RecommendationEvent = { type: "text" | "thinking" | "error" | "done"; text?: string };