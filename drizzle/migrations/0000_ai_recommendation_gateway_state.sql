CREATE TABLE public.ai_recommendation_gateway_state (
  id text PRIMARY KEY,
  message text NOT NULL,
  status integer NOT NULL DEFAULT 403,
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.ai_recommendation_gateway_state TO service_role;
ALTER TABLE public.ai_recommendation_gateway_state ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Service role manages gateway state" ON public.ai_recommendation_gateway_state FOR ALL TO service_role USING (true) WITH CHECK (true);
COMMENT ON TABLE public.ai_recommendation_gateway_state IS 'Server-only durable terminal gateway denial state. Clear only after provider access has been restored.';