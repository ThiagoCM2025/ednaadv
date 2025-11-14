-- Criar tabela de categorias
CREATE TABLE public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  icon TEXT,
  color TEXT DEFAULT '#3b82f6',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

-- Policies para categorias
CREATE POLICY "Categorias são visíveis por todos"
ON public.categories FOR SELECT
TO public
USING (true);

CREATE POLICY "Admins podem criar categorias"
ON public.categories FOR INSERT
TO authenticated
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins podem atualizar categorias"
ON public.categories FOR UPDATE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins podem deletar categorias"
ON public.categories FOR DELETE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- Trigger para updated_at
CREATE TRIGGER update_categories_updated_at
BEFORE UPDATE ON public.categories
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();

-- Inserir categorias padrão
INSERT INTO public.categories (name, slug, description, icon, color) VALUES
  ('Usucapião', 'usucapiao', 'Ações de usucapião e direitos possessórios', '⚖️', '#8b5cf6'),
  ('Regularização', 'regularizacao', 'Regularização de imóveis e documentação', '📋', '#3b82f6'),
  ('Inventário', 'inventario', 'Inventário extrajudicial e partilha de bens', '🏛️', '#10b981'),
  ('Contratos', 'contratos', 'Elaboração e revisão de contratos imobiliários', '📝', '#f59e0b'),
  ('Consultoria', 'consultoria', 'Consultoria jurídica preventiva', '💼', '#ec4899');