import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Layout } from '@/components/layout/Layout';
import { PhraseBlock } from '@/components/blog/PhraseBlock';
import { AdUnit } from '@/components/ads/AdUnit';
import { Badge } from '@/components/ui/badge';
import { CalendarIcon, ArrowLeft, Heart, Share2, BookmarkPlus } from 'lucide-react';
import { format } from 'date-fns';
import { getPostBySlug } from '@/lib/mdx';

export default function PostPage() {
  const { categoryId = "", postId = "" } = useParams<{ categoryId: string; postId: string }>();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    async function fetchPost() {
      setLoading(true);
      try {
        const fetchedPost = await getPostBySlug(postId, categoryId);
        setPost(fetchedPost);
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    }

    if (categoryId && postId) {
      fetchPost();
      // Reset state when post changes
      setLiked(false);
      setBookmarked(false);
      
      // Scroll to top when post changes
      window.scrollTo(0, 0);
    }
  }, [categoryId, postId]);
  
  // Função para processar o conteúdo do post e transformar em elementos React
  const renderContent = (content: string) => {
    // Este é um exemplo simplificado. Em uma implementação real, você usaria um parser markdown/MDX
    const paragraphs = content.split('\n\n');
    
    return paragraphs.map((paragraph, index) => {
      // Identificar cabeçalhos
      if (paragraph.startsWith('# ')) {
        return <h1 key={index} className="text-3xl font-bold my-8">{paragraph.substring(2)}</h1>;
      }
      if (paragraph.startsWith('## ')) {
        return <h2 key={index} className="text-2xl font-bold my-6">{paragraph.substring(3)}</h2>;
      }
      
      // Identificar citações/frases - simplificado para demonstração
      if (paragraph.includes('"') && paragraph.length < 200) {
        return (
          <PhraseBlock
            key={index}
            text={paragraph}
            image={index % 2 === 0 ? `/images/quotes/quote-${index % 8 + 1}.jpg` : undefined}
          />
        );
      }
      
      // Parágrafo padrão
      return <p key={index} className="text-gray-700 leading-relaxed mb-4">{paragraph}</p>;
    });
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center py-24">
          <div className="relative">
            <div className="h-16 w-16 rounded-full border-4 border-primary/30 border-t-primary animate-spin"></div>
            <div className="absolute top-0 left-0 h-16 w-16 flex items-center justify-center text-primary text-sm font-medium">
              Loading
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!post) {
    return (
      <Layout>
        <div className="container py-24 text-center">
          <h1 className="text-3xl font-bold mb-4">Post Not Found</h1>
          <p className="mb-6 text-gray-600">The phrase you're looking for doesn't exist or may have been removed.</p>
          <Link to="/" className="px-6 py-2 bg-primary text-white rounded-full font-medium hover:bg-primary-600 transition-colors">
            Return to Home
          </Link>
        </div>
      </Layout>
    );
  }

  const { frontmatter, content } = post;

  return (
    <Layout>
      <Helmet>
        <title>{frontmatter.title} - PhraseQuote</title>
        <meta name="description" content={frontmatter.description} />
        <meta property="og:title" content={`${frontmatter.title} - PhraseQuote`} />
        <meta property="og:description" content={frontmatter.description} />
        {frontmatter.image && (
          <meta property="og:image" content={frontmatter.image} />
        )}
      </Helmet>

      <article>
        {/* Hero Header */}
        <header className="relative py-20 bg-gradient-to-br from-primary-50 to-white overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary-100/30 rounded-bl-full -z-10"></div>
          <div className="absolute -bottom-16 left-16 w-32 h-32 bg-primary-100/20 rounded-full -z-10"></div>
          
          <div className="container max-w-4xl mx-auto px-4">
            <Link 
              to={`/category/${categoryId}`} 
              className="inline-flex items-center text-sm text-gray-600 mb-6 hover:text-primary"
            >
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back to {categoryId.charAt(0).toUpperCase() + categoryId.slice(1)}
            </Link>
            
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="outline" className="bg-white hover:bg-gray-50">
                {categoryId.charAt(0).toUpperCase() + categoryId.slice(1)}
              </Badge>
              {frontmatter.featured && (
                <Badge className="bg-primary text-white hover:bg-primary-600">
                  Featured
                </Badge>
              )}
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              {frontmatter.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-8">
              <div className="flex items-center">
                <CalendarIcon className="mr-1.5 h-3.5 w-3.5" />
                <time dateTime={frontmatter.date}>
                  {format(new Date(frontmatter.date), 'MMMM d, yyyy')}
                </time>
              </div>
              
              {frontmatter.tags && frontmatter.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {frontmatter.tags.map(tag => (
                    <span key={tag} className="text-xs px-2 py-1 bg-gray-100 rounded-full">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
            
            <p className="text-xl text-gray-700 max-w-2xl">
              {frontmatter.description}
            </p>
          </div>
        </header>
        
        {/* Content */}
        <div className="py-12">
          <div className="container max-w-4xl mx-auto px-4">
            {/* Top Ad Banner */}
            <AdUnit slotId="post-top-banner" format="banner" className="mb-10" />
            
            {/* Floating Share Bar */}
            <div className="hidden lg:block fixed left-8 top-1/3 bg-white rounded-full shadow-lg p-3 space-y-4 z-10 transition-all duration-300 hover:shadow-xl">
              <button 
                onClick={() => setLiked(!liked)} 
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${liked ? 'bg-red-50 text-red-500' : 'hover:bg-gray-100'}`}
                aria-label="Like"
              >
                <Heart className={`h-5 w-5 ${liked ? 'fill-current' : ''}`} />
              </button>
              
              <button 
                onClick={() => setBookmarked(!bookmarked)} 
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${bookmarked ? 'bg-primary-50 text-primary' : 'hover:bg-gray-100'}`}
                aria-label="Bookmark"
              >
                <BookmarkPlus className={`h-5 w-5 ${bookmarked ? 'fill-current' : ''}`} />
              </button>
              
              <button 
                onClick={() => navigator.share?.({ title: frontmatter.title, url: window.location.href })} 
                className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                aria-label="Share"
              >
                <Share2 className="h-5 w-5" />
              </button>
            </div>
            
            {/* Main Content */}
            <div className="prose prose-lg max-w-none">
              {typeof content === 'string' ? renderContent(content) : (
                <div className="space-y-6">
                  <p className="text-gray-700 leading-relaxed">
                    This is where the post content would appear. In a real implementation, it would render the MDX content.
                  </p>
                  
                  <PhraseBlock 
                    text="The greatest glory in living lies not in never falling, but in rising every time we fall."
                    image="/images/quotes/nelson-mandela-quote.jpg" 
                  />
                  
                  <h2 className="text-2xl font-bold mt-8 mb-4">Morning Motivation</h2>
                  
                  <p className="text-gray-700 leading-relaxed">
                    Start your day with these powerful phrases that will help you stay focused and motivated.
                  </p>
                  
                  <PhraseBlock 
                    text="Today is a new beginning, a chance to turn your dreams into reality."
                  />
                </div>
              )}
            </div>
            
            {/* Mobile Share Bar */}
            <div className="lg:hidden flex justify-center gap-4 my-10 pt-8 border-t">
              <button 
                onClick={() => setLiked(!liked)} 
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${liked ? 'bg-red-50 text-red-500' : 'bg-gray-50 hover:bg-gray-100'}`}
              >
                <Heart className={`h-5 w-5 ${liked ? 'fill-current' : ''}`} />
                <span>Like</span>
              </button>
              
              <button 
                onClick={() => setBookmarked(!bookmarked)} 
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${bookmarked ? 'bg-primary-50 text-primary' : 'bg-gray-50 hover:bg-gray-100'}`}
              >
                <BookmarkPlus className={`h-5 w-5 ${bookmarked ? 'fill-current' : ''}`} />
                <span>Save</span>
              </button>
              
              <button 
                onClick={() => navigator.share?.({ title: frontmatter.title, url: window.location.href })} 
                className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full hover:bg-gray-100 transition-colors"
              >
                <Share2 className="h-5 w-5" />
                <span>Share</span>
              </button>
            </div>
            
            {/* Bottom Ad Banner */}
            <AdUnit slotId="post-bottom-banner" format="banner" className="mt-10" />
            
            {/* Tags Section */}
            {frontmatter.tags && frontmatter.tags.length > 0 && (
              <div className="mt-12 pt-6 border-t">
                <h3 className="text-lg font-semibold mb-4">Related Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {frontmatter.tags.map(tag => (
                    <a 
                      key={tag} 
                      href={`/tag/${tag}`} 
                      className="px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-full text-sm transition-colors"
                    >
                      #{tag}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </article>
    </Layout>
  );
}