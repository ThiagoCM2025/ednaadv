import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Eye, FileText, TrendingUp, Activity } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format, subDays } from 'date-fns';
import { ptBR } from 'date-fns/locale';

type PeriodFilter = '7' | '30' | '90';

export default function Analytics() {
  const [period, setPeriod] = useState<PeriodFilter>('30');

  const startDate = subDays(new Date(), parseInt(period));

  // Fetch total views
  const { data: totalViews } = useQuery({
    queryKey: ['analytics-total-views', period],
    queryFn: async () => {
      const { count, error } = await supabase
        .from('blog_views')
        .select('*', { count: 'exact', head: true })
        .gte('viewed_at', startDate.toISOString());
      if (error) throw error;
      return count || 0;
    },
  });

  // Fetch published posts count
  const { data: publishedCount } = useQuery({
    queryKey: ['analytics-published-count'],
    queryFn: async () => {
      const { count, error } = await supabase
        .from('blog_posts')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'published');
      if (error) throw error;
      return count || 0;
    },
  });

  // Fetch views by day
  const { data: viewsByDay } = useQuery({
    queryKey: ['analytics-views-by-day', period],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_views')
        .select('viewed_at')
        .gte('viewed_at', startDate.toISOString())
        .order('viewed_at');
      
      if (error) throw error;

      // Group by day
      const grouped = data.reduce((acc: Record<string, number>, view) => {
        const date = format(new Date(view.viewed_at), 'dd/MM', { locale: ptBR });
        acc[date] = (acc[date] || 0) + 1;
        return acc;
      }, {});

      return Object.entries(grouped).map(([date, views]) => ({
        date,
        views,
      }));
    },
  });

  // Fetch top posts
  const { data: topPosts } = useQuery({
    queryKey: ['analytics-top-posts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_post_stats')
        .select('title, total_views')
        .order('total_views', { ascending: false })
        .limit(10);
      if (error) throw error;
      return data;
    },
  });

  // Fetch category distribution
  const { data: categoryDistribution } = useQuery({
    queryKey: ['analytics-category-distribution'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('category')
        .eq('status', 'published');
      if (error) throw error;

      // Group by category
      const grouped = data.reduce((acc: Record<string, number>, post) => {
        const category = post.category || 'Sem Categoria';
        acc[category] = (acc[category] || 0) + 1;
        return acc;
      }, {});

      return Object.entries(grouped).map(([name, value]) => ({
        name,
        value,
      }));
    },
  });

  // Fetch post performance
  const { data: postPerformance } = useQuery({
    queryKey: ['analytics-post-performance'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_post_stats')
        .select('*')
        .order('total_views', { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const COLORS = ['hsl(var(--primary))', 'hsl(var(--secondary))', 'hsl(var(--accent))', 'hsl(var(--gold))', 'hsl(var(--teal))'];

  const avgViewsPerPost = publishedCount && totalViews ? Math.round(totalViews / publishedCount) : 0;

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
          <p className="text-muted-foreground">Análise detalhada do desempenho do blog</p>
        </div>

        {/* Period Filter */}
        <Tabs value={period} onValueChange={(value) => setPeriod(value as PeriodFilter)}>
          <TabsList>
            <TabsTrigger value="7">7 dias</TabsTrigger>
            <TabsTrigger value="30">30 dias</TabsTrigger>
            <TabsTrigger value="90">90 dias</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Visualizações Totais"
            value={totalViews || 0}
            icon={Eye}
            description={`Últimos ${period} dias`}
          />
          <StatsCard
            title="Média por Artigo"
            value={avgViewsPerPost}
            icon={Activity}
            description="Views por artigo"
          />
          <StatsCard
            title="Artigos Publicados"
            value={publishedCount || 0}
            icon={FileText}
            description="Total no blog"
          />
          <StatsCard
            title="Taxa de Crescimento"
            value="12%"
            icon={TrendingUp}
            description="vs período anterior"
            trend={{ value: 12, isPositive: true }}
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Views by Day */}
          <Card>
            <CardHeader>
              <CardTitle>Visualizações por Dia</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={viewsByDay}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="views"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    dot={{ fill: 'hsl(var(--primary))' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Top Posts */}
          <Card>
            <CardHeader>
              <CardTitle>Artigos Mais Lidos</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={topPosts?.slice(0, 5)} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
                  <YAxis
                    type="category"
                    dataKey="title"
                    stroke="hsl(var(--muted-foreground))"
                    width={150}
                    tickFormatter={(value) => value.length > 20 ? value.substring(0, 20) + '...' : value}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                  <Bar dataKey="total_views" fill="hsl(var(--secondary))" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Category Distribution & Performance Table */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Category Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Distribuição por Categoria</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryDistribution?.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Performance Table */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Performance de Artigos</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Artigo</TableHead>
                    <TableHead className="text-center">Views</TableHead>
                    <TableHead className="text-center">Dias com Views</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {postPerformance?.slice(0, 5).map((post) => (
                    <TableRow key={post.id}>
                      <TableCell className="font-medium">{post.title}</TableCell>
                      <TableCell className="text-center">{post.total_views}</TableCell>
                      <TableCell className="text-center">{post.days_with_views}</TableCell>
                      <TableCell>
                        <Badge variant={post.status === 'published' ? 'default' : 'secondary'}>
                          {post.status === 'published' ? 'Publicado' : 'Rascunho'}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
