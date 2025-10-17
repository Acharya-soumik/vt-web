/**
 * Blog Service - Fetches blog data from Strapi CMS
 * Integration with Strapi REST API
 */

const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const apiUrl = `${strapiUrl}/api`;

export interface BlogPost {
  id: number | string;
  document_id?: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  featured_image_url?: string | null;
  category_id?: string | null;
  status: 'draft' | 'published' | 'archived';
  author_id?: string | null;
  published_at: string | null;
  meta_title?: string | null;
  meta_description?: string | null;
  meta_keywords?: string | null;
  view_count: number;
  reading_time_minutes: number | null;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
  locale?: string | null;
  category?: BlogCategory;
  author?: Author;
}

export interface BlogCategory {
  id: number | string;
  document_id?: string;
  name: string;
  slug: string;
  description: string | null;
  color?: string;
  sort_order?: number;
  is_active?: boolean;
  locale?: string | null;
}

export interface Author {
  id: string;
  name: string;
  email: string;
}

interface StrapiResponse<T> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

interface StrapiPost {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  series_order: number | null;
  is_featured: boolean;
  allow_comments: boolean;
  scheduled_at: string | null;
  reading_time_minutes: number | null;
  view_count: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  locale: string;
  category?: {
    data: {
      id: number;
      documentId: string;
      name: string;
      slug: string;
      description: string | null;
      color: string;
      sort_order: number;
      is_active: boolean;
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
      locale: string;
    } | null;
  };
}

interface StrapiCategory {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  description: string | null;
  color: string;
  sort_order: number;
  is_active: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
}

export class BlogService {
  /**
   * Transform Strapi post to BlogPost format
   */
  private transformPost(strapiPost: StrapiPost): BlogPost {
    return {
      id: strapiPost.id,
      document_id: strapiPost.documentId,
      title: strapiPost.title,
      slug: strapiPost.slug,
      content: strapiPost.content,
      excerpt: strapiPost.excerpt,
      status: strapiPost.publishedAt ? 'published' : 'draft',
      published_at: strapiPost.publishedAt,
      view_count: strapiPost.view_count || 0,
      reading_time_minutes: strapiPost.reading_time_minutes,
      is_featured: strapiPost.is_featured || false,
      created_at: strapiPost.createdAt,
      updated_at: strapiPost.updatedAt,
      locale: strapiPost.locale,
      category: strapiPost.category?.data ? {
        id: strapiPost.category.data.id,
        document_id: strapiPost.category.data.documentId,
        name: strapiPost.category.data.name,
        slug: strapiPost.category.data.slug,
        description: strapiPost.category.data.description,
        color: strapiPost.category.data.color,
        sort_order: strapiPost.category.data.sort_order,
        is_active: strapiPost.category.data.is_active,
        locale: strapiPost.category.data.locale,
      } : undefined,
    };
  }

  /**
   * Transform Strapi category to BlogCategory format
   */
  private transformCategory(strapiCategory: StrapiCategory): BlogCategory {
    return {
      id: strapiCategory.id,
      document_id: strapiCategory.documentId,
      name: strapiCategory.name,
      slug: strapiCategory.slug,
      description: strapiCategory.description,
      color: strapiCategory.color,
      sort_order: strapiCategory.sort_order,
      is_active: strapiCategory.is_active,
      locale: strapiCategory.locale,
    };
  }

  /**
   * Get all published blog posts
   */
  async getAllPublishedPosts(limit?: number): Promise<BlogPost[]> {
    try {
      const params = new URLSearchParams({
        'populate': 'category',
        'sort': 'publishedAt:desc',
        'filters[publishedAt][$notNull]': 'true',
      });

      if (limit) {
        params.append('pagination[limit]', limit.toString());
      }

      const response = await fetch(`${apiUrl}/blog-posts?${params.toString()}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch posts: ${response.statusText}`);
      }

      const result: StrapiResponse<StrapiPost[]> = await response.json();
      return result.data.map(post => this.transformPost(post));
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      return [];
    }
  }

  /**
   * Get featured blog posts
   */
  async getFeaturedPosts(limit: number = 5): Promise<BlogPost[]> {
    try {
      const params = new URLSearchParams({
        'populate': 'category',
        'sort': 'publishedAt:desc',
        'filters[publishedAt][$notNull]': 'true',
        'filters[is_featured][$eq]': 'true',
        'pagination[limit]': limit.toString(),
      });

      const response = await fetch(`${apiUrl}/blog-posts?${params.toString()}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch featured posts: ${response.statusText}`);
      }

      const result: StrapiResponse<StrapiPost[]> = await response.json();
      return result.data.map(post => this.transformPost(post));
    } catch (error) {
      console.error('Error fetching featured posts:', error);
      return [];
    }
  }

  /**
   * Get a single blog post by slug
   */
  async getPostBySlug(slug: string): Promise<BlogPost | null> {
    try {
      const params = new URLSearchParams({
        'populate': 'category',
        'filters[slug][$eq]': slug,
        'filters[publishedAt][$notNull]': 'true',
      });

      const response = await fetch(`${apiUrl}/blog-posts?${params.toString()}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch post: ${response.statusText}`);
      }

      const result: StrapiResponse<StrapiPost[]> = await response.json();

      if (!result.data || result.data.length === 0) {
        return null;
      }

      const post = this.transformPost(result.data[0]);

      // Increment view count
      if (post) {
        await this.incrementViewCount(post.id.toString());
      }

      return post;
    } catch (error) {
      console.error('Error fetching blog post:', error);
      return null;
    }
  }

  /**
   * Get posts by category
   */
  async getPostsByCategory(categorySlug: string, limit?: number): Promise<BlogPost[]> {
    try {
      const params = new URLSearchParams({
        'populate': 'category',
        'sort': 'publishedAt:desc',
        'filters[publishedAt][$notNull]': 'true',
        'filters[category][slug][$eq]': categorySlug,
      });

      if (limit) {
        params.append('pagination[limit]', limit.toString());
      }

      const response = await fetch(`${apiUrl}/blog-posts?${params.toString()}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch posts by category: ${response.statusText}`);
      }

      const result: StrapiResponse<StrapiPost[]> = await response.json();
      return result.data.map(post => this.transformPost(post));
    } catch (error) {
      console.error('Error fetching posts by category:', error);
      return [];
    }
  }

  /**
   * Get all categories
   */
  async getAllCategories(): Promise<BlogCategory[]> {
    try {
      const params = new URLSearchParams({
        'sort': 'name:asc',
      });

      const response = await fetch(`${apiUrl}/blog-categories?${params.toString()}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch categories: ${response.statusText}`);
      }

      const result: StrapiResponse<StrapiCategory[]> = await response.json();
      return result.data.map(category => this.transformCategory(category));
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  }

  /**
   * Search blog posts
   */
  async searchPosts(query: string): Promise<BlogPost[]> {
    try {
      const params = new URLSearchParams({
        'populate': 'category',
        'sort': 'publishedAt:desc',
        'filters[publishedAt][$notNull]': 'true',
        'filters[$or][0][title][$containsi]': query,
        'filters[$or][1][content][$containsi]': query,
        'filters[$or][2][excerpt][$containsi]': query,
      });

      const response = await fetch(`${apiUrl}/blog-posts?${params.toString()}`);

      if (!response.ok) {
        throw new Error(`Failed to search posts: ${response.statusText}`);
      }

      const result: StrapiResponse<StrapiPost[]> = await response.json();
      return result.data.map(post => this.transformPost(post));
    } catch (error) {
      console.error('Error searching posts:', error);
      return [];
    }
  }

  /**
   * Get related posts (same category, excluding current post)
   */
  async getRelatedPosts(postId: string, categorySlug: string, limit: number = 3): Promise<BlogPost[]> {
    try {
      const params = new URLSearchParams({
        'populate': 'category',
        'sort': 'publishedAt:desc',
        'filters[publishedAt][$notNull]': 'true',
        'filters[category][slug][$eq]': categorySlug,
        'filters[id][$ne]': postId,
        'pagination[limit]': limit.toString(),
      });

      const response = await fetch(`${apiUrl}/blog-posts?${params.toString()}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch related posts: ${response.statusText}`);
      }

      const result: StrapiResponse<StrapiPost[]> = await response.json();
      return result.data.map(post => this.transformPost(post));
    } catch (error) {
      console.error('Error fetching related posts:', error);
      return [];
    }
  }

  /**
   * Increment view count for a post
   */
  private async incrementViewCount(postId: string): Promise<void> {
    try {
      // For now, we'll skip incrementing view count as it requires backend implementation
      // You can implement this through a custom Strapi controller
      console.log(`View count increment for post ${postId} - needs custom endpoint`);
    } catch (error) {
      console.error('Error incrementing view count:', error);
    }
  }

  /**
   * Get popular posts (by view count)
   */
  async getPopularPosts(limit: number = 5): Promise<BlogPost[]> {
    try {
      const params = new URLSearchParams({
        'populate': 'category',
        'sort': 'view_count:desc',
        'filters[publishedAt][$notNull]': 'true',
        'pagination[limit]': limit.toString(),
      });

      const response = await fetch(`${apiUrl}/blog-posts?${params.toString()}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch popular posts: ${response.statusText}`);
      }

      const result: StrapiResponse<StrapiPost[]> = await response.json();
      return result.data.map(post => this.transformPost(post));
    } catch (error) {
      console.error('Error fetching popular posts:', error);
      return [];
    }
  }

  /**
   * Get recent posts
   */
  async getRecentPosts(limit: number = 5): Promise<BlogPost[]> {
    return this.getAllPublishedPosts(limit);
  }
}

export const blogService = new BlogService();
