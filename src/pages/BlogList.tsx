import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BlogCard } from '@/components/blog/BlogCard';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { Search } from 'lucide-react';

export default function BlogList() {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Fetch categories
  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('id, name')
        .order('name');
      if (error) throw error;
      return data;
    },
  });

  // Fetch posts with stats
  const { data: posts, isLoading } = useQuery({
    queryKey: ['public-blog-posts', categoryFilter, search],
    queryFn: async () => {
      let query = supabase
        .from('blog_posts')
        .select(`
          *,
          profiles!blog_posts_author_id_fkey(full_name, email)
        `)
        .eq('status', 'published')
        .order('published_at', { ascending: false });

      if (categoryFilter !== 'all') {
        query = query.eq('category', categoryFilter);
      }

      if (search) {
        query = query.or(`title.ilike.%${search}%,excerpt.ilike.%${search}%`);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });

  // Fetch stats for view counts
  const { data: stats } = useQuery({
    queryKey: ['public-blog-stats'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_post_stats')
        .select('id, total_views');
      if (error) throw error;
      return data;
    },
  });

  const getViewsForPost = (postId: string) => {
    const stat = stats?.find((s) => s.id === postId);
    return stat?.total_views || 0;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-accent to-primary py-20 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold font-heading mb-6">
              Blog Jurídico
            </h1>
            <p className="text-xl text-white/90">
              Artigos, insights e análises sobre Direito Imobiliário e muito mais
            </p>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 border-b bg-card">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row gap-4 max-w-2xl">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar artigos..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="sm:w-[200px]">
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                {categories?.map((category) => (
                  <SelectItem key={category.id} value={category.name}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 flex-1">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="aspect-[16/9] w-full" />
                  <Skeleton className="h-8 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              ))}
            </div>
          ) : posts && posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <BlogCard
                  key={post.id}
                  id={post.id}
                  title={post.title}
                  slug={post.slug}
                  excerpt={post.excerpt || undefined}
                  coverImage={post.cover_image_url || undefined}
                  category={post.category || undefined}
                  publishedAt={post.published_at!}
                  readingTime={post.reading_time || undefined}
                  views={getViewsForPost(post.id)}
                  author={post.profiles}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Nenhum artigo encontrado
              </h3>
              <p className="text-muted-foreground">
                Tente ajustar os filtros de busca
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
