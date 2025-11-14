-- Criar bucket para capas de blog geradas por IA
INSERT INTO storage.buckets (id, name, public)
VALUES ('blog-covers', 'blog-covers', true)
ON CONFLICT (id) DO NOTHING;

-- RLS Policy para permitir upload de admins
CREATE POLICY "Admin users can upload blog covers"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'blog-covers' AND
  has_role(auth.uid(), 'admin'::app_role)
);

-- Policy para leitura pública
CREATE POLICY "Public can view blog covers"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'blog-covers');

-- Policy para admins atualizarem
CREATE POLICY "Admin users can update blog covers"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'blog-covers' AND
  has_role(auth.uid(), 'admin'::app_role)
);

-- Policy para admins deletarem
CREATE POLICY "Admin users can delete blog covers"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'blog-covers' AND
  has_role(auth.uid(), 'admin'::app_role)
);