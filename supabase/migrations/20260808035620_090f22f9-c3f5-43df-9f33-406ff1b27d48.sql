CREATE TABLE public.store_audits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  store_url text NOT NULL,
  store_domain text NOT NULL,
  email text NOT NULL,
  intent text,
  growth_challenge text,
  overall_score integer NOT NULL,
  conversion_score integer NOT NULL,
  trust_score integer NOT NULL,
  product_score integer NOT NULL,
  performance_score integer NOT NULL,
  seo_score integer NOT NULL,
  findings jsonb NOT NULL DEFAULT '[]'::jsonb
);

GRANT ALL ON public.store_audits TO service_role;

ALTER TABLE public.store_audits ENABLE ROW LEVEL SECURITY;

CREATE INDEX store_audits_created_at_idx ON public.store_audits (created_at DESC);
CREATE INDEX store_audits_email_idx ON public.store_audits (email);