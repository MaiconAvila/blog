import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { BookOpen, Heart, ThumbsUp, Star, Coffee } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CategoryCardProps {
  name: string;
  slug: string;
  postCount: number;
  className?: string;
  icon?: React.ReactNode;
}

export function CategoryCard({ name, slug, postCount, className }: CategoryCardProps) {
  // Mapeamento de ícones para categorias comuns
  const getCategoryIcon = (category: string) => {
    const icons: Record<string, React.ReactNode> = {
      'love': <Heart size={24} />,
      'motivation': <ThumbsUp size={24} />,
      'inspiration': <Star size={24} />,
      'wisdom': <Coffee size={24} />,
    };
    
    return icons[category.toLowerCase()] || <BookOpen size={24} />;
  };
  
  // Gerar cores de fundo distintas para categorias
  const getCategoryColorClass = (category: string) => {
    const colors = {
      'love': 'from-red-50 to-pink-50 border-pink-100',
      'motivation': 'from-blue-50 to-indigo-50 border-indigo-100',
      'inspiration': 'from-yellow-50 to-amber-50 border-amber-100',
      'wisdom': 'from-emerald-50 to-teal-50 border-teal-100',
    };
    
    return colors[category.toLowerCase()] || 'from-primary-50 to-purple-50 border-purple-100';
  };

  return (
    <Link to={`/category/${slug}`} className="block no-underline">
      <Card className={cn(
        "category-card overflow-hidden h-full transition-all hover:-translate-y-1 hover:shadow-md hover:shadow-primary/10 border",
        getCategoryColorClass(slug),
        "bg-gradient-to-br card-uniform", // Alterado de card-disruptive para card-uniform
        className
      )}>
        <div className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-bold mb-2">{name}</h3>
              <p className="text-sm text-gray-600">{postCount} {postCount === 1 ? 'post' : 'posts'}</p>
            </div>
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-sm border border-gray-100 text-primary">
              {getCategoryIcon(slug)}
            </div>
          </div>
          
          <div className="mt-4">
            <span className="inline-flex items-center text-sm font-medium text-primary">
              Browse phrases
              <svg className="w-4 h-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
}