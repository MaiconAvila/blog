import { compareDesc } from 'date-fns';

export interface PostFrontmatter {
  title: string;
  description: string;
  date: string;
  category: string;
  image?: string;
  featured?: boolean;
  tags?: string[];
}

export interface PostWithSource {
  slug: string;
  category: string;
  frontmatter: PostFrontmatter;
  content: string;
}

// Use Vite's import.meta.glob to load JSON modules - caminho corrigido sem barra inicial
const postModules = import.meta.glob('../content/posts/**/*.mdx');

export async function getAllPosts(): Promise<PostWithSource[]> {
  const posts: PostWithSource[] = [];

  try {
    for (const path in postModules) {
      try {
        const module = await postModules[path]();
        const pathSegments = path.split('/');
        const fileName = pathSegments[pathSegments.length - 1];
        const category = pathSegments[pathSegments.length - 2];
        const slug = fileName.replace('.mdx', '');

        // Adicionando log para debug
        console.log(`Carregando post: ${path}, categoria: ${category}, slug: ${slug}`);
        
        // Verificar se module.default existe
        if (!module.default) {
          console.error(`Módulo não tem 'default': ${path}`, module);
          continue;
        }

        posts.push({
          slug,
          category,
          frontmatter: module.default.frontmatter || {},
          content: module.default.content || "",
        });
      } catch (error) {
        console.error(`Erro ao processar o arquivo ${path}:`, error);
      }
    }

    return posts.sort((a, b) =>
      compareDesc(new Date(a.frontmatter.date), new Date(b.frontmatter.date))
    );
  } catch (error) {
    console.error("Erro ao obter posts:", error);
    return [];
  }
}

export async function getPostsByCategory(category: string): Promise<PostWithSource[]> {
  try {
    const posts = await getAllPosts();
    return posts.filter(post => post.category === category);
  } catch (error) {
    console.error(`Erro ao buscar posts por categoria ${category}:`, error);
    return [];
  }
}

export async function getFeaturedPosts(): Promise<PostWithSource[]> {
  try {
    const posts = await getAllPosts();
    return posts.filter(post => post.frontmatter.featured);
  } catch (error) {
    console.error("Erro ao buscar posts em destaque:", error);
    return [];
  }
}

export async function getRecentPosts(count = 6): Promise<PostWithSource[]> {
  try {
    const posts = await getAllPosts();
    return posts.slice(0, count);
  } catch (error) {
    console.error("Erro ao buscar posts recentes:", error);
    return [];
  }
}

export async function getAllCategories(): Promise<string[]> {
  try {
    const posts = await getAllPosts();
    const categories = new Set(posts.map(post => post.category));
    return Array.from(categories);
  } catch (error) {
    console.error("Erro ao buscar categorias:", error);
    return [];
  }
}

export async function getPostBySlug(slug: string, category: string): Promise<PostWithSource | null> {
  try {
    const posts = await getAllPosts();
    return posts.find(post => post.slug === slug && post.category === category) || null;
  } catch (error) {
    console.error(`Erro ao buscar post ${category}/${slug}:`, error);
    return null;
  }
}