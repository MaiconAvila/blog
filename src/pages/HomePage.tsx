import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Layout } from '@/components/layout/Layout';
import { CategoryCard } from '@/components/blog/CategoryCard';
import { PostCard } from '@/components/blog/PostCard';
import { AdUnit } from '@/components/ads/AdUnit';
import { getAllCategories, getFeaturedPosts, getPostsByCategory, getRecentPosts, PostWithSource } from '@/lib/mdx';
import { ArrowRight } from 'lucide-react';

export default function HomePage() {
  const [categories, setCategories] = useState<string[]>([]);
  const [featuredPosts, setFeaturedPosts] = useState<PostWithSource[]>([]);
  const [recentPosts, setRecentPosts] = useState<PostWithSource[]>([]);
  const [categoryPosts, setCategoryPosts] = useState<Record<string, PostWithSource[]>>({});
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const fetchedCategories = await getAllCategories();
        setCategories(fetchedCategories);
        
        const fetchedFeatured = await getFeaturedPosts();
        const fetchedRecent = await getRecentPosts(6);
        
        setFeaturedPosts(fetchedFeatured);
        setRecentPosts(fetchedRecent);
        
        const postsMap: Record<string, PostWithSource[]> = {};
        for (const category of fetchedCategories) {
          postsMap[category] = await getPostsByCategory(category);
        }
        setCategoryPosts(postsMap);
      } catch (error) {
        console.error("Error loading blog data:", error);
      } finally {
        setLoading(false);
      }
    }
    
    loadData();
  }, []);
  
  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-[50vh]">
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
  
  return (
    <Layout>
      <Helmet>
        <title>PhraseBlog - Inspiring Quotes and Phrases</title>
        <meta name="description" content="Discover inspiring quotes and phrases for every occasion. Share meaningful words with your loved ones." />
        <meta property="og:title" content="PhraseBlog - Inspiring Quotes and Phrases" />
        <meta property="og:description" content="Discover inspiring quotes and phrases for every occasion." />
      </Helmet>
      
      {/* Hero Section */}
      <section className="relative py-12 md:py-20 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-primary-100 to-primary-200 rounded-bl-full opacity-30 -z-10"></div>
        <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-gradient-to-tr from-primary-100 to-primary-200 rounded-tr-full opacity-20 -z-10"></div>
        
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 relative inline-block">
              <span className="relative z-10">
                Find Your Perfect <span className="text-primary">Phrase</span>
              </span>
              <span className="absolute -bottom-1 left-0 w-full h-4 bg-primary-100 -z-0 transform -rotate-1"></span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Discover inspiring phrases and quotes for every moment of your life. Share wisdom and find motivation in our collection.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <a href="#categories" className="px-8 py-3 bg-primary text-white rounded-full font-medium hover:bg-primary-600 transition-colors shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transform hover:-translate-y-1 hover:scale-105 transition-all">
                Explore Categories
              </a>
              <a href="#featured" className="px-8 py-3 bg-white border border-gray-200 rounded-full font-medium hover:bg-gray-50 transition-colors hover:shadow-lg">
                Featured Phrases
              </a>
            </div>
          </div>
        </div>
      </section>
      
      {/* Ad Section */}
      <div className="py-4">
        <div className="container mx-auto px-4">
          <AdUnit slotId="home-top-banner" format="banner" className="mx-auto" />
        </div>
      </div>
      
      {/* Categories Section */}
      <section id="categories" className="py-16 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex items-center mb-10">
            <div className="h-0.5 bg-gray-200 flex-grow mr-6"></div>
            <h2 className="text-3xl font-bold">
              <span className="title-highlight">Browse Categories</span>
            </h2>
            <div className="h-0.5 bg-gray-200 flex-grow ml-6"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map(category => {
              const posts = categoryPosts[category] || [];
              return (
                <CategoryCard
                  key={category}
                  name={category.charAt(0).toUpperCase() + category.slice(1)}
                  slug={category}
                  postCount={posts.length}
                />
              );
            })}
          </div>
        </div>
      </section>
      
      {/* Featured Posts Section */}
      {featuredPosts.length > 0 && (
        <section id="featured" className="py-16 bg-gradient-to-r from-primary-50 via-white to-white relative">
          <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary-300 to-transparent"></div>
          <div className="container mx-auto px-4">
            <div className="mb-10">
              <h2 className="text-3xl font-bold mb-2">
                <span className="title-highlight">Featured Phrases</span>
              </h2>
              <p className="text-gray-600">Handpicked quotes that inspire and motivate.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredPosts.slice(0, 3).map(post => (
                <div key={`${post.category}-${post.slug}`} className="animate-float" style={{ animationDelay: `${Math.random() * 1000}ms` }}>
                  <PostCard
                    title={post.frontmatter.title}
                    description={post.frontmatter.description}
                    date={post.frontmatter.date}
                    category={post.category}
                    slug={post.slug}
                    featured={true}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      
      {/* Recent Posts Section */}
      <section className="py-16 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold mb-2">
                <span className="title-highlight">Recent Phrases</span>
              </h2>
              <p className="text-gray-600">The latest additions to our collection.</p>
            </div>
            
            <a href="/all-posts" className="hidden md:flex items-center text-primary hover:text-primary-700 font-medium">
              View all phrases
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {recentPosts.map((post, index) => (
              <PostCard
                key={`${post.category}-${post.slug}`}
                title={post.frontmatter.title}
                description={post.frontmatter.description}
                date={post.frontmatter.date}
                category={post.category}
                slug={post.slug}
                className={index === 0 ? "lg:col-span-2" : ""}
              />
            ))}
          </div>
          
          <div className="mt-10 text-center md:hidden">
            <a href="/all-posts" className="inline-flex items-center text-primary hover:text-primary-700 font-medium">
              View all phrases
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </div>
        </div>
      </section>
      
      {/* Bottom Ad Section */}
      <div className="py-4 mb-8">
        <div className="container mx-auto px-4">
          <AdUnit slotId="home-bottom-banner" format="banner" className="mx-auto" />
        </div>
      </div>
      
      {/* CTA Section - Atualizado para usar cantos padronizados */}
      <section className="py-12 mb-16 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-primary-50 via-primary-100 to-white p-10 md:p-16 rounded-2xl relative overflow-hidden shadow-xl card-uniform">
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-200/20 rounded-full translate-x-1/3 -translate-y-1/3"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-300/10 rounded-full -translate-x-1/3 translate-y-1/3"></div>
            
            <div className="relative z-10 text-center md:text-left flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0 md:mr-10">
                <h2 className="text-3xl font-bold mb-4">Get Daily Inspiration</h2>
                <p className="text-gray-600 max-w-md">
                  Subscribe to receive daily motivational quotes directly to your inbox.
                </p>
              </div>
              
              <div className="w-full md:w-auto">
                <form className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="px-5 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary min-w-[250px]"
                  />
                  <button className="px-6 py-3 bg-primary text-white rounded-full font-medium hover:bg-primary-600 transition-colors shadow-md shadow-primary/20">
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}