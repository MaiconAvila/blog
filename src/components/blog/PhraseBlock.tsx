import React from 'react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Card } from '@/components/ui/card';
import { CopyButton } from './CopyButton';
import { cn } from '@/lib/utils';

interface PhraseBlockProps {
  image?: string;
  text: string;
  className?: string;
  imageAlt?: string;
}

export function PhraseBlock({ image, text, className, imageAlt = "Inspirational phrase" }: PhraseBlockProps) {
  return (
    <div className={cn("phrase-block relative my-8", className)}>
      {image && (
        <div className="phrase-image-container relative mb-4 transform rotate-1 hover:rotate-0 transition-transform duration-300">
          <Card className="overflow-hidden shadow-lg rounded-lg">
            <AspectRatio ratio={16 / 9} className="bg-muted overflow-hidden">
              <img
                src={image}
                alt={imageAlt}
                className="object-cover h-full w-full transition-transform duration-500 hover:scale-105"
              />
            </AspectRatio>
            <div className="absolute top-3 right-3 z-10">
              <CopyButton content={image} className="bg-white/80 backdrop-blur-sm hover:bg-white" />
            </div>
          </Card>
        </div>
      )}
      
      <div className="phrase-text-container relative">
        <Card className="p-8 bg-gradient-to-br from-white to-gray-50 border border-gray-100 shadow-md transform -rotate-1 hover:rotate-0 transition-transform duration-300 rounded-lg">
          <blockquote className="text-xl md:text-2xl font-medium italic text-center relative z-10">
            <svg className="absolute top-0 left-0 transform -translate-x-6 -translate-y-6 h-10 w-10 text-primary/10" fill="currentColor" viewBox="0 0 32 32">
              <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
            </svg>
            
            {text}
            
            <svg className="absolute bottom-0 right-0 transform translate-x-6 translate-y-6 h-10 w-10 text-primary/10 rotate-180" fill="currentColor" viewBox="0 0 32 32">
              <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
            </svg>
          </blockquote>
          <div className="absolute top-3 right-3">
            <CopyButton content={text} className="bg-white hover:bg-gray-50" />
          </div>
          
          {/* Elemento decorativo na esquina */}
          <div className="absolute bottom-0 right-0 w-12 h-12 bg-primary/5 -z-10 rounded-tl-xl"></div>
        </Card>
      </div>
    </div>
  );
}