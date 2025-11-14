import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2, Sparkles, Image as ImageIcon, Upload, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface AIPostGeneratorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type LoadingStep = 'idle' | 'generating-content' | 'generating-image' | 'preview';
type Tone = 'profissional' | 'formal' | 'casual';
type Length = 'curto' | 'médio' | 'longo';

interface GeneratedArticle {
  title: string;
  content: string;
  excerpt: string;
  metaTitle: string;
  metaDescription: string;
  category: string;
  slug: string;
  imageUrl?: string;
}

export function AIPostGenerator({ open, onOpenChange }: AIPostGeneratorProps) {
  const navigate = useNavigate();
  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState<Tone>('profissional');
  const [length, setLength] = useState<Length>('médio');
  const [generateImage, setGenerateImage] = useState(true);
  const [loadingStep, setLoadingStep] = useState<LoadingStep>('idle');
  const [generatedArticle, setGeneratedArticle] = useState<GeneratedArticle | null>(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedCategory, setEditedCategory] = useState('');
  const [editedExcerpt, setEditedExcerpt] = useState('');

  // Fetch categories from database
  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('id, name, slug')
        .order('name');
      if (error) throw error;
      return data;
    },
  });

  const handleGenerate = async () => {
    if (!topic.trim()) {
      toast.error('Por favor, insira um tema para o artigo');
      return;
    }

    try {
      setLoadingStep('generating-content');

      // Generate article content
      const { data: contentData, error: contentError } = await supabase.functions.invoke(
        'generate-blog-post',
        {
          body: { topic, tone, length }
        }
      );

      if (contentError) throw contentError;

      console.log('Content generated:', contentData);

      let imageUrl: string | undefined;

      if (generateImage) {
        setLoadingStep('generating-image');
        
        try {
          const { data: imageData, error: imageError } = await supabase.functions.invoke(
            'generate-blog-image',
            {
              body: { title: contentData.title }
            }
          );

          if (imageError) {
            console.error('Image generation error:', imageError);
            toast.error('Não foi possível gerar a imagem, mas o artigo foi criado com sucesso');
          } else {
            imageUrl = imageData.imageUrl;
            console.log('Image generated:', imageUrl);
          }
        } catch (imgError) {
          console.error('Image generation failed:', imgError);
          toast.error('Não foi possível gerar a imagem, mas o artigo foi criado com sucesso');
        }
      }

      setGeneratedArticle({
        ...contentData,
        imageUrl
      });
      setEditedTitle(contentData.title);
      setEditedCategory(contentData.category);
      setEditedExcerpt(contentData.excerpt);
      setLoadingStep('preview');
      toast.success('Artigo gerado com sucesso!');

    } catch (error: any) {
      console.error('Error generating article:', error);
      
      if (error.message?.includes('429')) {
        toast.error('Limite de requisições excedido. Aguarde um momento e tente novamente.');
      } else if (error.message?.includes('402')) {
        toast.error('Créditos insuficientes. Adicione créditos em Settings → Workspace → Usage.');
      } else {
        toast.error('Erro ao gerar artigo. Tente novamente.');
      }
      
      setLoadingStep('idle');
    }
  };

  const handleRegenerateImage = async () => {
    if (!generatedArticle) return;

    try {
      setLoadingStep('generating-image');
      
      const { data: imageData, error: imageError } = await supabase.functions.invoke(
        'generate-blog-image',
        {
          body: { title: editedTitle }
        }
      );

      if (imageError) throw imageError;

      setGeneratedArticle({
        ...generatedArticle,
        imageUrl: imageData.imageUrl
      });
      
      setLoadingStep('preview');
      toast.success('Nova imagem gerada!');

    } catch (error) {
      console.error('Error regenerating image:', error);
      toast.error('Erro ao gerar nova imagem. Tente novamente.');
      setLoadingStep('preview');
    }
  };

  const handleSaveAsDraft = async () => {
    if (!generatedArticle) return;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Usuário não autenticado');

      const { error } = await supabase.from('blog_posts').insert({
        title: editedTitle,
        slug: generatedArticle.slug,
        excerpt: editedExcerpt,
        content: generatedArticle.content,
        cover_image_url: generatedArticle.imageUrl,
        category: editedCategory,
        meta_title: generatedArticle.metaTitle,
        meta_description: generatedArticle.metaDescription,
        status: 'draft',
        author_id: user.id,
      });

      if (error) throw error;

      toast.success('Artigo salvo como rascunho!');
      onOpenChange(false);
      navigate('/dashboard/posts');

    } catch (error) {
      console.error('Error saving draft:', error);
      toast.error('Erro ao salvar rascunho');
    }
  };

  const handleEdit = () => {
    if (!generatedArticle) return;

    // Navigate to editor with pre-filled data
    navigate('/dashboard/posts/new', {
      state: {
        aiGenerated: true,
        title: editedTitle,
        slug: generatedArticle.slug,
        excerpt: editedExcerpt,
        content: generatedArticle.content,
        coverImage: generatedArticle.imageUrl,
        category: editedCategory,
        metaTitle: generatedArticle.metaTitle,
        metaDescription: generatedArticle.metaDescription,
      }
    });
    onOpenChange(false);
  };

  const handleClose = () => {
    setTopic('');
    setTone('profissional');
    setLength('médio');
    setGenerateImage(true);
    setLoadingStep('idle');
    setGeneratedArticle(null);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            Criar Artigo com IA
          </DialogTitle>
        </DialogHeader>

        {loadingStep === 'idle' && (
          <div className="space-y-6">
            <div>
              <Label htmlFor="topic">Tema do Artigo *</Label>
              <Input
                id="topic"
                placeholder="Ex: Direito trabalhista e férias"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="mt-2"
              />
            </div>

            <div>
              <Label>Estilo</Label>
              <RadioGroup value={tone} onValueChange={(v) => setTone(v as Tone)} className="mt-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="profissional" id="profissional" />
                  <Label htmlFor="profissional">Profissional</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="formal" id="formal" />
                  <Label htmlFor="formal">Formal</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="casual" id="casual" />
                  <Label htmlFor="casual">Casual</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label>Tamanho</Label>
              <RadioGroup value={length} onValueChange={(v) => setLength(v as Length)} className="mt-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="curto" id="curto" />
                  <Label htmlFor="curto">Curto (~500 palavras)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="médio" id="médio" />
                  <Label htmlFor="médio">Médio (~1000 palavras)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="longo" id="longo" />
                  <Label htmlFor="longo">Longo (~1500 palavras)</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="generate-image"
                checked={generateImage}
                onCheckedChange={(checked) => setGenerateImage(checked as boolean)}
              />
              <Label htmlFor="generate-image">Gerar imagem de capa automaticamente</Label>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" onClick={handleClose} className="flex-1">
                Cancelar
              </Button>
              <Button onClick={handleGenerate} className="flex-1">
                <Sparkles className="w-4 h-4 mr-2" />
                Gerar Artigo
              </Button>
            </div>
          </div>
        )}

        {(loadingStep === 'generating-content' || loadingStep === 'generating-image') && (
          <div className="space-y-6 py-8">
            <div className="flex flex-col items-center justify-center gap-4">
              <Loader2 className="w-12 h-12 animate-spin text-primary" />
              <div className="text-center space-y-2">
                <h3 className="font-semibold text-lg">
                  {loadingStep === 'generating-content' ? '🤖 Gerando conteúdo...' : '🎨 Gerando imagem...'}
                </h3>
                <div className="space-y-1 text-sm text-muted-foreground">
                  {loadingStep === 'generating-content' ? (
                    <>
                      <p className="flex items-center gap-2">✓ Analisando tema</p>
                      <p className="flex items-center gap-2">⏳ Criando conteúdo estruturado...</p>
                    </>
                  ) : (
                    <>
                      <p className="flex items-center gap-2">✓ Conteúdo criado</p>
                      <p className="flex items-center gap-2">⏳ Gerando imagem profissional...</p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {loadingStep === 'preview' && generatedArticle && (
          <div className="space-y-6">
            <div className="space-y-4">
              {generatedArticle.imageUrl && (
                <div className="relative">
                  <img 
                    src={generatedArticle.imageUrl} 
                    alt="Capa do artigo"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
              )}

              <div>
                <Label htmlFor="edit-title">Título</Label>
                <Input
                  id="edit-title"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="edit-category">Categoria</Label>
                <Select value={editedCategory} onValueChange={setEditedCategory}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories?.map((category) => (
                      <SelectItem key={category.id} value={category.name}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="edit-excerpt">Resumo</Label>
                <Textarea
                  id="edit-excerpt"
                  value={editedExcerpt}
                  onChange={(e) => setEditedExcerpt(e.target.value)}
                  className="mt-2"
                  rows={3}
                />
              </div>

              <div>
                <Label>Prévia do Conteúdo</Label>
                <div 
                  className="mt-2 border rounded-lg p-4 max-h-[400px] overflow-y-auto bg-muted/30
                    prose prose-sm max-w-none
                    prose-headings:text-foreground prose-headings:font-bold
                    prose-h2:text-xl prose-h2:mt-6 prose-h2:mb-3
                    prose-h3:text-lg prose-h3:mt-4 prose-h3:mb-2
                    prose-p:text-foreground prose-p:leading-relaxed prose-p:mb-3
                    prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                    prose-strong:text-foreground prose-strong:font-semibold
                    prose-ul:my-3 prose-ul:list-disc prose-ul:pl-6
                    prose-ol:my-3 prose-ol:list-decimal prose-ol:pl-6
                    prose-li:text-foreground prose-li:mb-1
                    prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-4 prose-blockquote:italic"
                  dangerouslySetInnerHTML={{ __html: generatedArticle.content }}
                />
                <p className="text-xs text-muted-foreground mt-2">
                  ℹ️ Esta é uma prévia do conteúdo gerado. Você pode editá-lo clicando em "Editar".
                </p>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRegenerateImage}
                  className="flex-1"
                >
                  <ImageIcon className="w-4 h-4 mr-2" />
                  Gerar Nova Imagem
                </Button>
              </div>
            </div>

            <div className="flex gap-2 pt-4 border-t">
              <Button variant="outline" onClick={handleClose}>
                <X className="w-4 h-4 mr-2" />
                Descartar
              </Button>
              <Button variant="outline" onClick={handleEdit} className="flex-1">
                ✏️ Editar
              </Button>
              <Button onClick={handleSaveAsDraft} className="flex-1">
                💾 Salvar Rascunho
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
