import { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { FileText, Eye, FileEdit, TrendingUp } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalPosts: 0,
    publishedPosts: 0,
    draftPosts: 0,
    totalViews: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    const { data: posts } = await supabase.from('blog_posts').select('*');
    const { data: views } = await supabase.from('blog_views').select('id');

    if (posts) {
      setStats({
        totalPosts: posts.length,
        publishedPosts: posts.filter(p => p.status === 'published').length,
        draftPosts: posts.filter(p => p.status === 'draft').length,
        totalViews: views?.length || 0,
      });
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Visão Geral</h1>
          <p className="text-muted-foreground mt-2">Estatísticas do seu blog jurídico</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Total de Artigos"
            value={stats.totalPosts}
            icon={FileText}
          />
          <StatsCard
            title="Artigos Publicados"
            value={stats.publishedPosts}
            icon={TrendingUp}
          />
          <StatsCard
            title="Rascunhos"
            value={stats.draftPosts}
            icon={FileEdit}
          />
          <StatsCard
            title="Total de Visualizações"
            value={stats.totalViews}
            icon={Eye}
          />
        </div>
      </div>
    </DashboardLayout>
  );
}
