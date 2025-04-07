import React from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface AdUnitProps {
  slotId: string;
  className?: string;
  format?: 'banner' | 'rectangle' | 'sidebar';
}

export function AdUnit({ slotId, className, format = 'rectangle' }: AdUnitProps) {
  // This will be replaced with actual Google AdSense code in production
  React.useEffect(() => {
    // In a real implementation, you'd use the Google AdSense script
    // window.adsbygoogle = window.adsbygoogle || [];
    // window.adsbygoogle.push({});
  }, [slotId]);

  const formatClasses = {
    banner: "h-[90px] max-w-[728px]",
    rectangle: "h-[250px] max-w-[300px]",
    sidebar: "h-[600px] max-w-[300px]",
  };

  return (
    <Card className={cn(
      "bg-muted/30 flex items-center justify-center overflow-hidden my-6 mx-auto text-muted-foreground",
      formatClasses[format],
      className
    )}>
      <div className="text-center p-4">
        <p className="text-sm">Advertisement</p>
        <p className="text-xs">Ad slot: {slotId}</p>
        {/* The actual ad code would go here */}
        {/* <ins className="adsbygoogle" style={{ display: 'block' }} data-ad-client="ca-pub-XXXX" data-ad-slot={slotId} data-ad-format="auto" data-full-width-responsive="true"></ins> */}
      </div>
    </Card>
  );
}