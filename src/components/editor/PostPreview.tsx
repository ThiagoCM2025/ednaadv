import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Eye } from 'lucide-react';
import { formatDate } from '@/lib/dateFormat';

interface PostPreviewProps {
  title: string;
  excerpt?: string;
  content: string;
  coverImage?: string;
  category?: string;
  readingTime: number;
  authorName?: string;
  publishedAt?: string;
}

export function PostPreview({
  title,
  excerpt,
  content,
  coverImage,
  category,
  readingTime,
  authorName = 'Edna Souza',
  publishedAt,
}: PostPreviewProps) {
  return (
    <div className="bg-background min-h-screen">
      <article className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Back button area - empty in preview */}
          <div className="mb-8" />

          {/* Category Badge */}
          {category && (
            <Badge variant="secondary" className="mb-4">
              {category}
            </Badge>
          )}

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
            {title || 'Título do Artigo'}
          </h1>

          {/* Excerpt */}
          {excerpt && (
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              {excerpt}
            </p>
          )}

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm text-muted-foreground mb-8 pb-8 border-b">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-semibold">
                  {authorName.charAt(0)}
                </span>
              </div>
              <span className="font-medium text-foreground">{authorName}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{publishedAt ? formatDate(publishedAt) : formatDate(new Date().toISOString())}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{readingTime} min de leitura</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              <span>0 visualizações</span>
            </div>
          </div>

          {/* Cover Image */}
          {coverImage && (
            <div className="mb-12">
              <img
                src={coverImage}
                alt={title}
                className="w-full aspect-[16/9] object-cover rounded-lg shadow-lg"
              />
            </div>
          )}

          {/* Content */}
          <div 
            className="prose prose-lg max-w-none
              prose-headings:text-foreground prose-headings:font-bold
              prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
              prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
              prose-p:text-foreground prose-p:leading-relaxed prose-p:mb-6
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline
              prose-strong:text-foreground prose-strong:font-semibold
              prose-ul:my-6 prose-ul:list-disc prose-ul:pl-6
              prose-ol:my-6 prose-ol:list-decimal prose-ol:pl-6
              prose-li:text-foreground prose-li:mb-2
              prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-muted-foreground
              prose-code:text-primary prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded
              prose-pre:bg-muted prose-pre:p-4 prose-pre:rounded-lg prose-pre:overflow-x-auto
              prose-img:rounded-lg prose-img:shadow-md"
            dangerouslySetInnerHTML={{ 
              __html: content || '<p class="text-muted-foreground italic">O conteúdo do artigo aparecerá aqui...</p>' 
            }}
          />

          {/* Share section - simplified for preview */}
          <div className="mt-12 pt-8 border-t">
            <p className="text-sm text-muted-foreground text-center">
              Esta é uma prévia do seu artigo
            </p>
          </div>
        </div>
      </article>
    </div>
  );
}
