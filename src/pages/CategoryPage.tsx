import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Layout } from '@/components/layout/Layout';
import { PostCard } from '@/components/blog/PostCard';
import { AdUnit } from '@/components/ads/AdUnit';
import { getPostsByCategory, PostWithSource } from '@/lib/mdx';
import { BookOpen, Heart, ThumbsUp, Star, Coffee } from 'lucide-react';

export default function CategoryPage() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [posts, setPosts] = useState<PostWithSource[]>([]);
  const [loading, setLoading] = useState(true);
  
  const categoryName = categoryId ? 
    categoryId.charAt(0).toUpperCase() + categoryId.slice(1) : 
    "Category";
  
  // Função para retornar o ícone da categoria
  const getCategoryIcon = () => {
    const icons: Record<string, React.ReactNode> = {
      'love': <Heart size={24} className="text-primary" />,
      'motivation': <ThumbsUp size={24} className="text-primary" />,
      'inspiration': <Star size={24} className="text-primary" />,
      'wisdom': <Coffee size={24} className="text-primary" />,
    };
    
    return icons[categoryId?.toLowerCase() || ''] || <BookOpen size={24} className="text-primary" />;
  };
  
  // Função para retornar as cores da categoria
  const getCategoryColorClass = () => {
    const colors = {
      'love': 'from-red-50 to-pink-50',
      'motivation': 'from-blue-50 to-indigo-50',
      'inspiration': 'from-yellow-50 to-amber-50',
      'wisdom': 'from-emerald-50 to-teal-50',
    };
    
    return colors[categoryId?.toLowerCase() || ''] || 'from-primary-50 to-purple-50';
  };
  
  useEffect(() => {
    async function loadPosts() {
      if (categoryId) {
        setLoading(true);
        const fetchedPosts = await getPostsByCategory(categoryId);
        setPosts(fetchedPosts);
        setLoading(false);
      }
    }
    
    loadPosts();
  }, [categoryId]);
  
  return (
    <Layout>
      <Helmet>
        <title>{categoryName} Phrases - PhraseBlog</title>
        <meta 
          name="description" 
          content={`Discover the best ${categoryName.toLowerCase()} phrases and quotes for every occasion.`} 
        />
      </Helmet>
      
      {/* Category Header */}
      <section className={`py-16 bg-gradient-to-br ${getCategoryColorClass()} relative overflow-hidden`}>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full opacity-20 translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full opacity-20 -translate-x-1/4 translate-y-1/4"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start mb-4">
                <div className="w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center mr-4">
                  {getCategoryIcon()}
                </div>
                <h1 className="text-4xl md:text-5xl font-bold">{categoryName} <span className="text-primary">Phrases</span></h1>
              </div>
              <p className="text-lg text-gray-700 max-w-xl">
                Browse our collection of {categoryName.toLowerCase()} phrases and quotes for every occasion
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <div className="py-8">
        <div className="container mx-auto px-4">
          <AdUnit slotId={`${categoryId}-top-banner`} format="banner" className="mx-auto" />
        </div>
      </div>
      
      {/* Posts Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex justify-center py-16">
              <div className="relative">
                <div className="h-16 w-16 rounded-full border-4 border-primary/30 border-t-primary animate-spin"></div>
                <div className="absolute top-0 left-0 h-16 w-16 flex items-center justify-center text-primary text-sm font-medium">
                  Loading
                </div>
              </div>
            </div>
          ) : posts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, index) => (
                <PostCard
                  key={post.slug}
                  title={post.frontmatter.title}
                  description={post.frontmatter.description}
                  date={post.frontmatter.date}
                  category={post.category}
                  slug={post.slug}
                  featured={post.frontmatter.featured}
                  className={index === 0 && posts.length > 5 ? "lg:col-span-2" : ""}
                />
              ))}
            </div>
          ) : (
            <div className="text-center bg-gray-50 py-16 rounded-xl">
              <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <BookOpen className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-medium mb-2">No phrases found</h3>
              <p className="text-muted-foreground mb-6">
                There are no phrases in this category yet.
              </p>
              <a href="/" className="px-6 py-2 bg-primary text-white rounded-full font-medium hover:bg-primary-600 transition-colors">
                Back to Home
              </a>
            </div>
          )}
          
          {posts.length > 6 && (
            <div className="mt-10 text-center">
              <button className="px-8 py-3 bg-white border border-gray-200 rounded-full font-medium hover:bg-gray-50 transition-colors hover:shadow-lg">
                Load more phrases
              </button>
            </div>
          )}
        </div>
      </section>
      
      <div className="py-8">
        <div className="container mx-auto px-4">
          <AdUnit slotId={`${categoryId}-bottom-banner`} format="banner" className="mx-auto" />
        </div>
      </div>
    </Layout>
  );
}