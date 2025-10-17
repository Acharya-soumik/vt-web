import { Metadata } from 'next';
import { blogService } from '@/services/blog-service';
import CategoryPageClient from './category-page-client';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const categories = await blogService.getAllCategories();
  const category = categories.find((cat) => cat.slug === slug);

  if (!category) {
    return {
      title: 'Category Not Found | VakilTech',
      description: 'The requested category could not be found.',
    };
  }

  return {
    title: `${category.name} - Legal Articles | VakilTech`,
    description: category.description || `Browse ${category.name} articles and guides on VakilTech.`,
    keywords: `${category.name}, legal articles, legal guides, VakilTech`,
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;

  return <CategoryPageClient slug={slug} />;
}
