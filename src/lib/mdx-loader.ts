import { lazy } from 'react';

export interface MdxLoaderProps {
  category: string;
  slug: string;
}

export function getMdxComponent({ category, slug }: MdxLoaderProps) {
  // In a production environment, you would use a more sophisticated approach
  // This is a simplified example
  try {
    // Note: This dynamic import approach may need adjustment based on your bundler configuration
    return lazy(() => import(`../content/posts/${category}/${slug}.mdx`));
  } catch (error) {
    console.error(`Failed to load MDX for ${category}/${slug}:`, error);
    return null;
  }
}