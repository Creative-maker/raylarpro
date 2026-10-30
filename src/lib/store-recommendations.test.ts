import { describe, expect, test } from "bun:test";
import { storeRecommendationInput } from "./store-recommendations";

describe("merchant recommendation validation", () => {
  test("accepts a merchant description and supported growth goal", () => {
    const input = storeRecommendationInput.parse({ description: "  I sell refillable skincare on Shopify and want more repeat orders.  ", goal: "retention" });
    expect(input.description).toBe("I sell refillable skincare on Shopify and want more repeat orders.");
    expect(input.goal).toBe("retention");
  });
  test("rejects empty or oversized merchant descriptions", () => {
    expect(storeRecommendationInput.safeParse({ description: " ", goal: "conversion" }).success).toBe(false);
    expect(storeRecommendationInput.safeParse({ description: "a".repeat(4001), goal: "conversion" }).success).toBe(false);
  });
  test("rejects unsupported goals before AI work", () => {
    expect(storeRecommendationInput.safeParse({ description: "I sell organic skincare and want to improve my Shopify store.", goal: "untrusted-goal" }).success).toBe(false);
  });
});