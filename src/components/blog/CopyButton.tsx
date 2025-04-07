import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CopyButtonProps {
  content: string;
  className?: string;
  variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

export function CopyButton({ content, className, variant = 'outline', size = 'icon' }: CopyButtonProps) {
  const [hasCopied, setHasCopied] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setHasCopied(true);
    setShowTooltip(true);
    
    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
    
    setTimeout(() => {
      setShowTooltip(false);
    }, 2200);
  };

  return (
    <div className="relative">
      <Button
        variant={variant}
        size={size}
        className={cn(
          "copy-button rounded-full transition-all",
          hasCopied ? "bg-primary text-white border-primary" : "",
          "hover:scale-105 active:scale-95 hover:shadow-md hover:shadow-primary/20",
          className
        )}
        onClick={handleCopy}
        aria-label="Copy to clipboard"
      >
        {hasCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </Button>
      
      {showTooltip && (
        <div className="absolute -bottom-9 left-1/2 transform -translate-x-1/2 bg-black text-white px-2 py-1 rounded text-xs whitespace-nowrap">
          {hasCopied ? 'Copied!' : 'Copy to clipboard'}
        </div>
      )}
    </div>
  );
}