import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Calendar, Clock, Eye, ArrowLeft, Share2 } from 'lucide-react';
import { formatDate } from '@/lib/dateFormat';
import { toast } from 'sonner';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();

  // Fetch post by slug
  const { data: post, isLoading } = useQuery({
    queryKey: ['blog-post', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select(`
          *,
          profiles!blog_posts_author_id_fkey(full_name, email, avatar_url)
        `)
        .eq('slug', slug)
        .eq('status', 'published')
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!slug,
  });

  // Fetch view count
  const { data: stats } = useQuery({
    queryKey: ['blog-post-stats', post?.id],
    queryFn: async () => {
      if (!post?.id) return null;
      const { data, error } = await supabase
        .from('blog_post_stats')
        .select('total_views')
        .eq('id', post.id)
        .single();
      if (error) return null;
      return data;
    },
    enabled: !!post?.id,
  });

  // Track view on mount
  useEffect(() => {
    if (post?.id) {
      const trackView = async () => {
        try {
          await supabase.functions.invoke('track-blog-view', {
            body: { post_id: post.id },
          });
        } catch (error) {
          console.error('Error tracking view:', error);
        }
      };
      trackView();
    }
  }, [post?.id]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post?.title,
        text: post?.excerpt || '',
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copiado para a área de transferência!');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <Skeleton className="h-12 w-32 mb-8" />
            <Skeleton className="h-16 w-full mb-4" />
            <Skeleton className="h-6 w-3/4 mb-8" />
            <Skeleton className="aspect-[16/9] w-full mb-8" />
            <div className="space-y-4">
              {[...Array(8)].map((_, i) => (
                <Skeleton key={i} className="h-4 w-full" />
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Artigo não encontrado</h1>
            <p className="text-muted-foreground mb-8">
              O artigo que você está procurando não existe ou foi removido.
            </p>
            <Button asChild>
              <Link to="/blog">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar ao Blog
              </Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Article Header */}
      <article className="flex-1 py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Back Button */}
          <Button variant="ghost" asChild className="mb-8">
            <Link to="/blog">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar ao Blog
            </Link>
          </Button>

          {/* Category Badge */}
          {post.category && (
            <Badge variant="secondary" className="mb-4">
              {post.category}
            </Badge>
          )}

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold font-heading text-foreground mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Excerpt */}
          {post.excerpt && (
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              {post.excerpt}
            </p>
          )}

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-8 pb-8 border-b">
            {post.profiles?.full_name && (
              <div className="flex items-center gap-3">
                {post.profiles.avatar_url ? (
                  <img
                    src={post.profiles.avatar_url}
                    alt={post.profiles.full_name}
                    className="w-12 h-12 rounded-full"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground font-semibold">
                    {post.profiles.full_name.charAt(0)}
                  </div>
                )}
                <div>
                  <p className="font-semibold text-foreground">
                    {post.profiles.full_name}
                  </p>
                  <p className="text-sm">Autora</p>
                </div>
              </div>
            )}
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(post.published_at!)}</span>
            </div>
            {post.reading_time && (
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{post.reading_time} min de leitura</span>
              </div>
            )}
            {stats?.total_views !== undefined && (
              <div className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                <span>{stats.total_views} visualizações</span>
              </div>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={handleShare}
              className="ml-auto"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Compartilhar
            </Button>
          </div>

          {/* Cover Image */}
          {post.cover_image_url && (
            <div className="mb-12 rounded-lg overflow-hidden shadow-card">
              <img
                src={post.cover_image_url}
                alt={post.title}
                className="w-full aspect-[16/9] object-cover"
              />
            </div>
          )}

          {/* Content */}
          <div
            className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:text-foreground prose-p:text-foreground prose-a:text-primary hover:prose-a:text-secondary prose-strong:text-foreground prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Author Bio */}
          {post.profiles?.full_name && (
            <div className="mt-16 pt-8 border-t">
              <div className="flex gap-4">
                {post.profiles.avatar_url ? (
                  <img
                    src={post.profiles.avatar_url}
                    alt={post.profiles.full_name}
                    className="w-16 h-16 rounded-full"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground font-semibold text-xl">
                    {post.profiles.full_name.charAt(0)}
                  </div>
                )}
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-1">
                    {post.profiles.full_name}
                  </h3>
                  <p className="text-muted-foreground">
                    Advogada especialista em Direito Imobiliário
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </article>

      <Footer />
    </div>
  );
}
