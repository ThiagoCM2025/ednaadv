import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Eye } from 'lucide-react';
import { formatDate } from '@/lib/dateFormat';

interface BlogCardProps {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  coverImage?: string;
  category?: string;
  publishedAt: string;
  readingTime?: number;
  views?: number;
  author?: {
    full_name?: string;
  };
}

export function BlogCard({
  title,
  slug,
  excerpt,
  coverImage,
  category,
  publishedAt,
  readingTime,
  views,
  author,
}: BlogCardProps) {
  return (
    <Link to={`/blog/${slug}`}>
      <Card className="overflow-hidden hover:shadow-elegant transition-all duration-300 group h-full">
        {coverImage && (
          <div className="aspect-[16/9] overflow-hidden">
            <img
              src={coverImage}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        <CardHeader>
          {category && (
            <Badge variant="secondary" className="w-fit mb-2">
              {category}
            </Badge>
          )}
          <h3 className="text-2xl font-bold font-heading text-foreground group-hover:text-secondary transition-colors line-clamp-2">
            {title}
          </h3>
        </CardHeader>
        <CardContent>
          {excerpt && (
            <p className="text-muted-foreground line-clamp-3 mb-4">{excerpt}</p>
          )}
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(publishedAt)}</span>
            </div>
            {readingTime && (
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{readingTime} min</span>
              </div>
            )}
            {views !== undefined && (
              <div className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                <span>{views} views</span>
              </div>
            )}
          </div>
        </CardContent>
        {author?.full_name && (
          <CardFooter>
            <p className="text-sm text-muted-foreground">Por {author.full_name}</p>
          </CardFooter>
        )}
      </Card>
    </Link>
  );
}
