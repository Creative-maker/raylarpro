CREATE TABLE public.audit_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  store_url text,
  message text,
  service_slug text,
  service_name text,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT INSERT ON public.audit_leads TO anon;
GRANT INSERT ON public.audit_leads TO authenticated;
GRANT ALL ON public.audit_leads TO service_role;

ALTER TABLE public.audit_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit an audit request"
ON public.audit_leads FOR INSERT TO anon, authenticated
WITH CHECK (true);