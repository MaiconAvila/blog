import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CalendarIcon, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface PostCardProps {
  title: string;
  description: string;
  date: string;
  category: string;
  slug: string;
  className?: string;
  featured?: boolean;
}

export function PostCard({ 
  title, description, date, category, slug, className, featured = false
}: PostCardProps) {
  return (
    <Link to={`/post/${category}/${slug}`} className="block no-underline group">
      <Card className={cn(
        "h-full transition-all overflow-hidden hover:shadow-lg border",
        featured ? "border-primary/30 bg-primary/5" : "border-gray-100",
        "hover-lift card-uniform", // Alterado de card-disruptive para card-uniform
        className
      )}>
        <div className="p-6">
          <div className="mb-4">
            {featured && (
              <div className="mb-2">
                <Badge variant="default" className="bg-primary text-white hover:bg-primary-600">Featured</Badge>
              </div>
            )}
            
            <Badge variant="outline" className="bg-white text-gray-600 hover:bg-gray-100">{category}</Badge>
          </div>
          
          <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">{title}</h3>
          
          <p className="text-muted-foreground line-clamp-3 mb-4">{description}</p>
          
          <div className="flex flex-wrap items-center justify-between">
            <div className="flex items-center text-sm text-muted-foreground">
              <CalendarIcon className="mr-1.5 h-3.5 w-3.5" />
              <time dateTime={date}>
                {format(new Date(date), 'MMMM d, yyyy')}
              </time>
            </div>
            
            <div className="mt-2 sm:mt-0">
              <span className="inline-flex items-center text-sm font-medium text-primary">
                Read post
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}