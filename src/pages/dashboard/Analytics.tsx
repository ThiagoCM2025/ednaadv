import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Eye, FileText, TrendingUp, Activity } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { format, subDays } from 'date-fns';
import { ptBR } from 'date-fns/locale';

type PeriodFilter = '7' | '30' | '90';

export default function Analytics() {
  const [period, setPeriod] = useState<PeriodFilter>('30');

  const startDate = subDays(new Date(), parseInt(period));

  // Fetch total views
  const { data: totalViews, isLoading: isLoadingViews } = useQuery({
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
  const { data: publishedCount, isLoading: isLoadingPosts } = useQuery({
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
  const { data: viewsByDay, isLoading: isLoadingViewsByDay } = useQuery({
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
  const { data: topPosts, isLoading: isLoadingTopPosts } = useQuery({
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
          <div className="animate-fade-in" style={{ animationDelay: '0ms' }}>
            {isLoadingViews ? (
              <Card>
                <CardHeader className="pb-2">
                  <Skeleton className="h-4 w-32" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-8 w-20 mb-2" />
                  <Skeleton className="h-3 w-24" />
                </CardContent>
              </Card>
            ) : (
              <StatsCard
                title="Visualizações Totais"
                value={totalViews || 0}
                icon={Eye}
                description={`Últimos ${period} dias`}
                variant="views"
              />
            )}
          </div>
          <div className="animate-fade-in" style={{ animationDelay: '100ms' }}>
            {isLoadingViews || isLoadingPosts ? (
              <Card>
                <CardHeader className="pb-2">
                  <Skeleton className="h-4 w-32" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-8 w-20 mb-2" />
                  <Skeleton className="h-3 w-24" />
                </CardContent>
              </Card>
            ) : (
              <StatsCard
                title="Média por Artigo"
                value={avgViewsPerPost}
                icon={Activity}
                description="Views por artigo"
                variant="activity"
              />
            )}
          </div>
          <div className="animate-fade-in" style={{ animationDelay: '200ms' }}>
            {isLoadingPosts ? (
              <Card>
                <CardHeader className="pb-2">
                  <Skeleton className="h-4 w-32" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-8 w-20 mb-2" />
                  <Skeleton className="h-3 w-24" />
                </CardContent>
              </Card>
            ) : (
              <StatsCard
                title="Artigos Publicados"
                value={publishedCount || 0}
                icon={FileText}
                description="Total no blog"
                variant="posts"
              />
            )}
          </div>
          <div className="animate-fade-in" style={{ animationDelay: '300ms' }}>
            <StatsCard
              title="Taxa de Crescimento"
              value="12%"
              icon={TrendingUp}
              description="vs período anterior"
              trend={{ value: 12, isPositive: true }}
              variant="growth"
            />
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Views by Day */}
          <Card className="animate-fade-in hover:shadow-lg transition-shadow duration-300" style={{ animationDelay: '400ms' }}>
            <CardHeader>
              <CardTitle>Visualizações por Dia</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoadingViewsByDay ? (
                <div className="space-y-3">
                  <Skeleton className="h-[300px] w-full" />
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={viewsByDay}>
                    <defs>
                      <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                    <XAxis 
                      dataKey="date" 
                      stroke="hsl(var(--muted-foreground))"
                      style={{ fontSize: '12px' }}
                    />
                    <YAxis 
                      stroke="hsl(var(--muted-foreground))"
                      style={{ fontSize: '12px' }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                      }}
                      cursor={{ stroke: 'hsl(var(--primary))', strokeWidth: 1, strokeDasharray: '5 5' }}
                    />
                    <Area
                      type="monotone"
                      dataKey="views"
                      stroke="hsl(var(--primary))"
                      strokeWidth={3}
                      fill="url(#colorViews)"
                      animationDuration={1000}
                      dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, stroke: 'hsl(var(--primary))', strokeWidth: 2 }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>

          {/* Top Posts */}
          <Card className="animate-fade-in hover:shadow-lg transition-shadow duration-300" style={{ animationDelay: '500ms' }}>
            <CardHeader>
              <CardTitle>Artigos Mais Lidos</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoadingTopPosts ? (
                <div className="space-y-3">
                  <Skeleton className="h-[300px] w-full" />
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={topPosts?.slice(0, 5)} layout="vertical">
                    <defs>
                      <linearGradient id="colorBar" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="hsl(var(--secondary))" stopOpacity={0.8}/>
                        <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                    <XAxis 
                      type="number" 
                      stroke="hsl(var(--muted-foreground))"
                      style={{ fontSize: '12px' }}
                    />
                    <YAxis
                      type="category"
                      dataKey="title"
                      stroke="hsl(var(--muted-foreground))"
                      width={150}
                      tickFormatter={(value) => value.length > 20 ? value.substring(0, 20) + '...' : value}
                      style={{ fontSize: '12px' }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                      }}
                      cursor={{ fill: 'hsl(var(--muted))', opacity: 0.1 }}
                    />
                    <Bar 
                      dataKey="total_views" 
                      fill="url(#colorBar)"
                      radius={[0, 8, 8, 0]}
                      animationDuration={1000}
                    />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Category Distribution & Performance Table */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Category Distribution */}
          <Card className="animate-fade-in hover:shadow-lg transition-shadow duration-300" style={{ animationDelay: '600ms' }}>
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
                    animationBegin={0}
                    animationDuration={1000}
                  >
                    {categoryDistribution?.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={COLORS[index % COLORS.length]}
                        className="hover:opacity-80 transition-opacity duration-300 cursor-pointer"
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Performance Table */}
          <Card className="lg:col-span-2 animate-fade-in hover:shadow-lg transition-shadow duration-300" style={{ animationDelay: '700ms' }}>
            <CardHeader>
              <CardTitle>Performance de Artigos</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead>Artigo</TableHead>
                    <TableHead className="text-center">Views</TableHead>
                    <TableHead className="text-center">Dias com Views</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {postPerformance?.slice(0, 5).map((post) => (
                    <TableRow 
                      key={post.id}
                      className="hover:bg-muted/50 transition-colors duration-200 cursor-pointer"
                    >
                      <TableCell className="font-medium">{post.title}</TableCell>
                      <TableCell className="text-center font-semibold text-primary">{post.total_views}</TableCell>
                      <TableCell className="text-center">{post.days_with_views}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={post.status === 'published' ? 'default' : 'secondary'}
                          className="transition-transform duration-200 hover:scale-105"
                        >
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
