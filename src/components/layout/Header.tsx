import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Menu, X, BookOpen, Heart, ThumbsUp, Home } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { getAllCategories } from '@/lib/mdx';

export function Header() {
  const [categories, setCategories] = useState<string[]>([]);
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    async function loadCategories() {
      const fetchedCategories = await getAllCategories();
      setCategories(fetchedCategories);
    }
    
    loadCategories();

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Mapeamento de ícones para categorias comuns
  const categoryIcons: Record<string, React.ReactNode> = {
    love: <Heart className="h-4 w-4 mr-2" />,
    motivation: <ThumbsUp className="h-4 w-4 mr-2" />,
    default: <BookOpen className="h-4 w-4 mr-2" />
  };
  
  return (
    <header className={`sticky top-0 z-40 transition-all duration-300 ${
      isScrolled ? 'bg-white/80 backdrop-blur-md shadow-md' : 'bg-transparent'
    }`}>
      {/* Barra superior decorativa */}
      <div className="h-1 w-full bg-gradient-to-r from-primary-300 via-primary to-primary-700"></div>
      
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="relative z-10">
            <div className="flex items-center">
              <div className="rounded-lg bg-primary text-white p-2 rotate-3">
                <BookOpen className="h-6 w-6" />
              </div>
              <h1 className="ml-2 font-bold text-xl tracking-tight">
                <span className="text-primary">Phrase</span>Blog
              </h1>
            </div>
          </Link>
          
          {/* Menu desktop */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link to="/" className="circle-nav-item bg-white border border-gray-200">
              <Home className="h-5 w-5" />
            </Link>
            
            {categories.map(category => {
              const icon = categoryIcons[category] || categoryIcons.default;
              return (
                <Link 
                  key={category}
                  to={`/category/${category}`} 
                  className="px-4 py-2 rounded-full text-sm font-medium text-gray-700 hover:bg-primary hover:text-white transition-colors"
                >
                  <div className="flex items-center">
                    {icon}
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </div>
                </Link>
              );
            })}
            
            {/* Botão de pesquisa */}
            <div className="ml-2 relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <Input
                type="search"
                placeholder="Search phrases..."
                className="pl-10 pr-4 py-2 w-full rounded-full border-2 border-gray-200 focus:border-primary focus:ring-primary"
              />
            </div>
          </nav>
          
          {/* Menu mobile */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button size="icon" variant="ghost" className="rounded-full">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[85vw] max-w-sm bg-white p-0">
                <div className="bg-primary text-white p-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold">Menu</h2>
                    <SheetClose asChild>
                      <Button variant="ghost" size="icon" className="text-white hover:text-white">
                        <X className="h-5 w-5" />
                      </Button>
                    </SheetClose>
                  </div>
                </div>
                <div className="p-6">
                  <div className="mb-6">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Search className="h-4 w-4 text-gray-400" />
                      </div>
                      <Input
                        type="search"
                        placeholder="Search phrases..."
                        className="pl-10 w-full"
                      />
                    </div>
                  </div>
                  
                  <nav className="flex flex-col space-y-3">
                    <SheetClose asChild>
                      <Link to="/" className="flex items-center p-3 rounded-lg hover:bg-gray-100">
                        <Home className="h-5 w-5 mr-3 text-primary" />
                        <span className="font-medium">Home</span>
                      </Link>
                    </SheetClose>
                    
                    {categories.map(category => {
                      const icon = categoryIcons[category] || categoryIcons.default;
                      return (
                        <SheetClose asChild key={category}>
                          <Link 
                            to={`/category/${category}`} 
                            className="flex items-center p-3 rounded-lg hover:bg-gray-100"
                          >
                            <div className="mr-3 text-primary">{icon}</div>
                            <span className="font-medium">
                              {category.charAt(0).toUpperCase() + category.slice(1)}
                            </span>
                          </Link>
                        </SheetClose>
                      );
                    })}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}