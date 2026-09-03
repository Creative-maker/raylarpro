CREATE TABLE public.seo_monitor_runs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  site_url text NOT NULL,
  status text NOT NULL DEFAULT 'ok',
  sitemap_errors integer NOT NULL DEFAULT 0,
  sitemap_warnings integer NOT NULL DEFAULT 0,
  urls_checked integer NOT NULL DEFAULT 0,
  urls_indexed integer NOT NULL DEFAULT 0,
  issues jsonb NOT NULL DEFAULT '[]'::jsonb,
  summary text,
  alert_sent boolean NOT NULL DEFAULT false
);

GRANT ALL ON public.seo_monitor_runs TO service_role;

ALTER TABLE public.seo_monitor_runs ENABLE ROW LEVEL SECURITY;

CREATE INDEX seo_monitor_runs_created_at_idx ON public.seo_monitor_runs (created_at DESC);