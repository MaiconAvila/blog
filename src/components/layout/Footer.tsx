import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllCategories } from '@/lib/mdx';
import { BookOpen, ChevronRight, Mail, Instagram, Twitter, Facebook } from 'lucide-react';

export function Footer() {
  const [categories, setCategories] = useState<string[]>([]);
  const year = new Date().getFullYear();
  
  useEffect(() => {
    async function loadCategories() {
      const fetchedCategories = await getAllCategories();
      setCategories(fetchedCategories);
    }
    
    loadCategories();
  }, []);
  
  return (
    <footer className="relative border-t pt-12 pb-8 bg-gradient-to-br from-gray-50 via-white to-primary-50 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary/5 rounded-full translate-x-1/3 translate-y-1/3"></div>
      
      <div className="container relative mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <div className="flex items-center mb-4">
              <div className="rounded-lg bg-primary text-white p-2 rotate-3">
                <BookOpen className="h-6 w-6" />
              </div>
              <h1 className="ml-2 font-bold text-xl tracking-tight">
                <span className="text-primary">Phrase</span>Blog
              </h1>
            </div>
            
            <p className="text-gray-600 mb-6 max-w-xs">
              Inspiring phrases and quotes for every moment of your life. Share wisdom and find motivation in our collection.
            </p>
            
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition-colors">
                <Facebook size={18} />
              </a>
              <a href="mailto:contact@phraseblog.com" className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition-colors">
                <Mail size={18} />
              </a>
            </div>
          </div>
          
          <div className="md:col-span-3">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <span className="w-8 h-[3px] bg-primary mr-3"></span>
              Categories
            </h3>
            <ul className="space-y-2">
              {categories.map(category => (
                <li key={category}>
                  <Link 
                    to={`/category/${category}`}
                    className="flex items-center text-gray-600 hover:text-primary transition-colors"
                  >
                    <ChevronRight className="h-4 w-4 mr-1 text-primary" />
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="md:col-span-3">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <span className="w-8 h-[3px] bg-primary mr-3"></span>
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="flex items-center text-gray-600 hover:text-primary transition-colors">
                  <ChevronRight className="h-4 w-4 mr-1 text-primary" />
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="flex items-center text-gray-600 hover:text-primary transition-colors">
                  <ChevronRight className="h-4 w-4 mr-1 text-primary" />
                  About
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="flex items-center text-gray-600 hover:text-primary transition-colors">
                  <ChevronRight className="h-4 w-4 mr-1 text-primary" />
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/contact" className="flex items-center text-gray-600 hover:text-primary transition-colors">
                  <ChevronRight className="h-4 w-4 mr-1 text-primary" />
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <span className="w-8 h-[3px] bg-primary mr-3"></span>
              Subscribe
            </h3>
            <p className="text-gray-600 mb-4 text-sm">
              Get notified about new phrases and updates.
            </p>
            <form className="relative">
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-4 py-2 pr-10 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
              <button 
                type="submit" 
                className="absolute right-0 top-0 h-full px-3 text-primary hover:text-primary-700"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </form>
          </div>
        </div>
        
        <div className="mt-10 pt-6 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>© {year} PhraseBlog. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex space-x-4">
            <Link to="/terms" className="hover:text-primary">Terms</Link>
            <Link to="/privacy" className="hover:text-primary">Privacy</Link>
            <Link to="/cookies" className="hover:text-primary">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}