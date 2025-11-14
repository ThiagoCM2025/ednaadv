import { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useQuery, useMutation } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RichTextEditor } from '@/components/editor/RichTextEditor';
import { ImageUpload } from '@/components/upload/ImageUpload';
import { slugify } from '@/lib/slugify';
import { calculateReadingTime } from '@/lib/readingTime';
import { toast } from 'sonner';
import { ArrowLeft, Save, Send, Sparkles } from 'lucide-react';

const postSchema = z.object({
  title: z.string().min(3, 'Título deve ter no mínimo 3 caracteres').max(200),
  slug: z.string().min(1, 'Slug é obrigatório'),
  excerpt: z.string().max(300).optional(),
  content: z.string().min(1, 'Conteúdo é obrigatório'),
  cover_image_url: z.string().optional(),
  category: z.string().min(1, 'Categoria é obrigatória'),
  meta_title: z.string().max(60).optional(),
  meta_description: z.string().max(160).optional(),
  status: z.enum(['draft', 'published']),
});

type PostFormData = z.infer<typeof postSchema>;

export default function PostEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [content, setContent] = useState('');
  const [coverImage, setCoverImage] = useState<string | undefined>();
  const [readingTime, setReadingTime] = useState(0);
  const [isAIGenerated, setIsAIGenerated] = useState(false);

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

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      status: 'draft',
    },
  });

  const title = watch('title');
  const slug = watch('slug');
  const status = watch('status');

  // Auto-generate slug from title
  useEffect(() => {
    if (title && !id) {
      setValue('slug', slugify(title));
    }
  }, [title, id, setValue]);

  // Calculate reading time
  useEffect(() => {
    if (content) {
      const time = calculateReadingTime(content);
      setReadingTime(time);
    }
  }, [content]);

  // Fetch post data if editing
  const { data: postData, isLoading } = useQuery({
    queryKey: ['blog-post', id],
    queryFn: async () => {
      if (!id) return null;
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('id', id)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

  // Load AI-generated data from navigation state
  useEffect(() => {
    const state = location.state as any;
    if (state?.aiGenerated) {
      setIsAIGenerated(true);
      setValue('title', state.title);
      setValue('slug', state.slug);
      setValue('excerpt', state.excerpt || '');
      setValue('category', state.category || '');
      setValue('meta_title', state.metaTitle || '');
      setValue('meta_description', state.metaDescription || '');
      setContent(state.content);
      setCoverImage(state.coverImage);
    }
  }, [location.state, setValue]);

  // Update form when data is loaded
  useEffect(() => {
    if (postData) {
      setValue('title', postData.title);
      setValue('slug', postData.slug);
      setValue('excerpt', postData.excerpt || '');
      setValue('category', postData.category || '');
      setValue('meta_title', postData.meta_title || '');
      setValue('meta_description', postData.meta_description || '');
      setValue('status', postData.status as 'draft' | 'published');
      setContent(postData.content);
      setCoverImage(postData.cover_image_url || undefined);
    }
  }, [postData, setValue]);

  // Save mutation
  const saveMutation = useMutation({
    mutationFn: async (data: PostFormData & { content: string; reading_time: number }) => {
      const postData = {
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt || null,
        content: data.content,
        cover_image_url: data.cover_image_url || null,
        category: data.category,
        meta_title: data.meta_title || null,
        meta_description: data.meta_description || null,
        status: data.status,
        reading_time: data.reading_time,
        author_id: user!.id,
        published_at: data.status === 'published' ? new Date().toISOString() : null,
      };

      if (id) {
        const { error } = await supabase
          .from('blog_posts')
          .update(postData)
          .eq('id', id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('blog_posts')
          .insert([postData]);
        if (error) throw error;
      }
    },
    onSuccess: (_, variables) => {
      toast.success(
        variables.status === 'published'
          ? 'Artigo publicado com sucesso!'
          : 'Rascunho salvo com sucesso!'
      );
      navigate('/dashboard/posts');
    },
    onError: () => {
      toast.error('Erro ao salvar artigo');
    },
  });

  const onSubmit = (data: PostFormData) => {
    saveMutation.mutate({
      ...data,
      content,
      cover_image_url: coverImage,
      reading_time: readingTime,
    });
  };

  const handleSaveDraft = () => {
    setValue('status', 'draft');
    handleSubmit(onSubmit)();
  };

  const handlePublish = () => {
    setValue('status', 'published');
    handleSubmit(onSubmit)();
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard/posts')}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold text-foreground">
                {id ? 'Editar Artigo' : 'Novo Artigo'}
              </h1>
              {isAIGenerated && (
                <Badge variant="secondary" className="gap-1">
                  <Sparkles className="w-3 h-3" />
                  Gerado com IA
                </Badge>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleSaveDraft} disabled={saveMutation.isPending}>
              <Save className="h-4 w-4 mr-2" />
              Salvar Rascunho
            </Button>
            <Button onClick={handlePublish} disabled={saveMutation.isPending}>
              <Send className="h-4 w-4 mr-2" />
              Publicar
            </Button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Título *</Label>
                <Input
                  id="title"
                  {...register('title')}
                  placeholder="Digite o título do artigo"
                  className="text-2xl font-bold"
                />
                {errors.title && (
                  <p className="text-sm text-destructive">{errors.title.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug">Slug (URL) *</Label>
                <Input
                  id="slug"
                  {...register('slug')}
                  placeholder="url-do-artigo"
                />
                {errors.slug && (
                  <p className="text-sm text-destructive">{errors.slug.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="excerpt">Resumo</Label>
                <Textarea
                  id="excerpt"
                  {...register('excerpt')}
                  placeholder="Breve resumo do artigo (até 300 caracteres)"
                  rows={3}
                />
                {errors.excerpt && (
                  <p className="text-sm text-destructive">{errors.excerpt.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Conteúdo *</Label>
                <RichTextEditor content={content} onChange={setContent} />
                {errors.content && (
                  <p className="text-sm text-destructive">{errors.content.message}</p>
                )}
              </div>
            </div>

            {/* Right Column - Settings */}
            <div className="space-y-6">
              {/* Cover Image */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Imagem de Capa</CardTitle>
                </CardHeader>
                <CardContent>
                  <ImageUpload
                    currentImage={coverImage}
                    onUploadComplete={setCoverImage}
                    onRemove={() => setCoverImage(undefined)}
                  />
                </CardContent>
              </Card>

              {/* Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Configurações</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Categoria *</Label>
                    <Select
                      value={watch('category')}
                      onValueChange={(value) => setValue('category', value)}
                    >
                      <SelectTrigger>
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
                    {errors.category && (
                      <p className="text-sm text-destructive">{errors.category.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="meta_title">Meta Title (SEO)</Label>
                    <Input
                      id="meta_title"
                      {...register('meta_title')}
                      placeholder="Título para mecanismos de busca"
                      maxLength={60}
                    />
                    <p className="text-xs text-muted-foreground">
                      {watch('meta_title')?.length || 0}/60 caracteres
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="meta_description">Meta Description (SEO)</Label>
                    <Textarea
                      id="meta_description"
                      {...register('meta_description')}
                      placeholder="Descrição para mecanismos de busca"
                      maxLength={160}
                      rows={3}
                    />
                    <p className="text-xs text-muted-foreground">
                      {watch('meta_description')?.length || 0}/160 caracteres
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Publishing */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Publicação</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-sm text-muted-foreground">Status</Label>
                    <div className="mt-2">
                      <Badge variant={status === 'published' ? 'default' : 'secondary'}>
                        {status === 'published' ? 'Publicado' : 'Rascunho'}
                      </Badge>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm text-muted-foreground">Tempo de Leitura</Label>
                    <p className="mt-1 text-sm font-medium">
                      {readingTime} {readingTime === 1 ? 'minuto' : 'minutos'}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
