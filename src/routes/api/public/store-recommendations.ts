import { createFileRoute } from "@tanstack/react-router";
import { handleStoreRecommendations } from "@/lib/store-recommendations.server";

export const Route = createFileRoute("/api/public/store-recommendations")({
  server: { handlers: { POST: ({ request }) => handleStoreRecommendations(request) } },
});