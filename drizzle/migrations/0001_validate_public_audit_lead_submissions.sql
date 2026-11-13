DROP POLICY "Anyone can submit an audit request" ON public.audit_leads;

CREATE POLICY "Valid public audit submissions only"
ON public.audit_leads
FOR INSERT
TO anon, authenticated
WITH CHECK (
  char_length(btrim(name)) BETWEEN 1 AND 100
  AND char_length(email) BETWEEN 6 AND 255
  AND email ~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$'
  AND (store_url IS NULL OR char_length(btrim(store_url)) <= 255)
  AND (message IS NULL OR char_length(message) <= 1000)
  AND (service_slug IS NULL OR char_length(service_slug) <= 120)
  AND (service_name IS NULL OR char_length(service_name) <= 160)
);