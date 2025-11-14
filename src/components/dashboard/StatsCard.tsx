import { LucideIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
  variant?: 'views' | 'growth' | 'posts' | 'activity';
}

const gradientVariants = {
  views: 'from-blue-500/10 via-blue-500/5 to-transparent',
  growth: 'from-green-500/10 via-green-500/5 to-transparent',
  posts: 'from-purple-500/10 via-purple-500/5 to-transparent',
  activity: 'from-orange-500/10 via-orange-500/5 to-transparent',
};

const iconBgVariants = {
  views: 'bg-blue-500/10',
  growth: 'bg-green-500/10',
  posts: 'bg-purple-500/10',
  activity: 'bg-orange-500/10',
};

const iconColorVariants = {
  views: 'text-blue-600 dark:text-blue-400',
  growth: 'text-green-600 dark:text-green-400',
  posts: 'text-purple-600 dark:text-purple-400',
  activity: 'text-orange-600 dark:text-orange-400',
};

export function StatsCard({ 
  title, 
  value, 
  icon: Icon, 
  description, 
  trend,
  className,
  variant = 'views'
}: StatsCardProps) {
  return (
    <Card 
      className={cn(
        'relative overflow-hidden transition-all duration-300',
        'hover:shadow-xl hover:-translate-y-1',
        'bg-gradient-to-br',
        gradientVariants[variant],
        className
      )}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className={cn(
          'p-2 rounded-lg transition-transform duration-300 hover:scale-110',
          iconBgVariants[variant]
        )}>
          <Icon className={cn('h-4 w-4', iconColorVariants[variant])} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground transition-all duration-300">
          {value}
        </div>
        {(description || trend) && (
          <div className="mt-1 flex items-center gap-2">
            {trend && (
              <span
                className={cn(
                  'text-xs font-medium transition-colors duration-300',
                  trend.isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                )}
              >
                {trend.isPositive ? '↗' : '↘'} {trend.isPositive ? '+' : ''}{trend.value}%
              </span>
            )}
            {description && (
              <p className="text-xs text-muted-foreground">{description}</p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
