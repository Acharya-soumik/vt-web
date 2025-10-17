import { Metadata } from "next";
import BlogPostClient from "./blog-post-client";
import { blogService } from "@/services/blog-service";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Dynamic metadata generation using fetch instead of blogService
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const post = await blogService.getPostBySlug(slug);

    if (!post) {
      return {
        title: "Article Not Found | VakilTech",
        description: "The requested article could not be found.",
      };
    }

    return {
      title: `${post.title} | VakilTech`,
      description: post.excerpt || post.title,
      openGraph: {
        title: post.title,
        description: post.excerpt || "",
        type: "article",
        publishedTime: post.published_at || undefined,
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Article | VakilTech",
      description: "Read expert legal advice and insights from VakilTech.",
    };
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;

  return <BlogPostClient slug={slug} />;
}
