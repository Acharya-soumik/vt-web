"use client";

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { blogService, BlogPost } from "@/services/blog-service";
import Link from "next/link";
import {
  Clock,
  Calendar,
  Eye,
  ArrowLeft,
  Share2,
  BookmarkPlus,
  ArrowRight,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";

interface BlogPostClientProps {
  slug: string;
}

export default function BlogPostClient({ slug }: BlogPostClientProps) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const postData = await blogService.getPostBySlug(slug);

      if (!postData) {
        notFound();
      }

      setPost(postData);

      if (postData.category?.slug) {
        const related = await blogService.getRelatedPosts(
          postData.id.toString(),
          postData.category.slug,
          3
        );
        setRelatedPosts(related);
      }

      setLoading(false);
    }

    loadData();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="bg-card border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link
            href="/docs"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium group transition-all"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Articles
          </Link>
        </div>
      </div>

      {/* Article Header */}
      <article className="max-w-4xl mx-auto px-4 py-12">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          {post.category && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link
                href={`/docs/category/${post.category.slug}`}
                className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-6 hover:bg-primary/20 transition-all duration-300 hover:scale-105"
              >
                {post.category.name}
              </Link>
            </motion.div>
          )}

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight"
          >
            {post.title}
          </motion.h1>

          {post.excerpt && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl text-muted-foreground mb-8 leading-relaxed"
            >
              {post.excerpt}
            </motion.p>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap items-center gap-6 pb-8 border-b"
          >
            {post.author && (
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/60 rounded-full flex items-center justify-center text-primary-foreground font-bold shadow-lg">
                  {post.author.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-medium text-foreground">
                    {post.author.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Expert Legal Advisor
                  </p>
                </div>
              </div>
            )}

            <div className="flex items-center gap-6 ml-auto text-sm text-muted-foreground">
              {post.published_at && (
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {new Date(post.published_at).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              )}
              {post.reading_time_minutes && (
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {post.reading_time_minutes} min read
                </span>
              )}
              <span className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                {post.view_count} views
              </span>
            </div>
          </motion.div>

          {/* Share Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex items-center gap-3 mt-6"
          >
            <button className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-all duration-300 hover:scale-105 text-sm font-medium">
              <Share2 className="w-4 h-4" />
              Share
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-card border rounded-lg hover:bg-secondary transition-all duration-300 hover:scale-105 text-sm font-medium">
              <BookmarkPlus className="w-4 h-4" />
              Save
            </button>
          </motion.div>
        </motion.header>

        {/* Article Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="prose prose-lg max-w-none mb-16"
        >
          <ReactMarkdown
            components={{
              h1: ({ children }) => (
                <h1 className="text-3xl font-bold text-foreground mt-12 mb-6 pb-3 border-b">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-2xl font-bold text-foreground mt-10 mb-5">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-xl font-bold text-foreground mt-8 mb-4">
                  {children}
                </h3>
              ),
              p: ({ children }) => (
                <p className="text-foreground/90 leading-relaxed mb-6">
                  {children}
                </p>
              ),
              ul: ({ children }) => (
                <ul className="space-y-3 mb-6 text-foreground/90">
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="space-y-3 mb-6 text-foreground/90">
                  {children}
                </ol>
              ),
              li: ({ children }) => <li className="ml-4 pl-2">{children}</li>,
              a: ({ href, children }) => (
                <a
                  href={href}
                  className="text-primary hover:text-primary/80 underline decoration-primary/30 hover:decoration-primary transition-all"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {children}
                </a>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-primary pl-6 italic text-muted-foreground my-6 py-2 bg-primary/5 rounded-r">
                  {children}
                </blockquote>
              ),
              code: ({ children }) => (
                <code className="bg-secondary px-2 py-1 rounded text-sm font-mono text-foreground">
                  {children}
                </code>
              ),
              pre: ({ children }) => (
                <pre className="bg-muted border p-6 rounded-lg overflow-x-auto mb-6 text-sm">
                  {children}
                </pre>
              ),
              strong: ({ children }) => (
                <strong className="font-bold text-foreground">
                  {children}
                </strong>
              ),
            }}
          >
            {post.content}
          </ReactMarkdown>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative bg-gradient-to-br from-primary via-primary to-primary/90 text-primary-foreground rounded-2xl p-10 mb-16 overflow-hidden"
        >
          {/* Animated background */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          </div>

          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Need Professional Legal Assistance?
            </h3>
            <p className="text-primary-foreground/90 mb-8 text-lg">
              Our expert lawyers are ready to help you with personalized
              solutions tailored to your specific needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/send-a-legal-notice"
                className="group px-8 py-4 bg-background text-foreground rounded-lg font-semibold hover:bg-background/90 transition-all duration-300 hover:scale-105 shadow-lg text-center inline-flex items-center justify-center gap-2"
              >
                Send Legal Notice
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/consultation"
                className="group px-8 py-4 bg-transparent border-2 border-primary-foreground/30 text-primary-foreground rounded-lg font-semibold hover:bg-white/10 transition-all duration-300 hover:scale-105 text-center inline-flex items-center justify-center gap-2"
              >
                Book Consultation
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </motion.div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="bg-secondary/30 border-t py-16">
          <div className="max-w-6xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-10">
                <div className="h-1 w-12 bg-gradient-to-r from-primary to-primary/40 rounded-full" />
                <h2 className="text-3xl font-bold text-foreground">
                  Related Articles
                </h2>
              </div>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost, index) => (
                <motion.div
                  key={relatedPost.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link
                    href={`/docs/${relatedPost.slug}`}
                    className="group block h-full bg-card border rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                  >
                    <div className="p-6">
                      {relatedPost.category && (
                        <span className="inline-block px-3 py-1 bg-secondary text-secondary-foreground text-xs font-semibold rounded-full mb-3">
                          {relatedPost.category.name}
                        </span>
                      )}
                      <h3 className="text-lg font-bold mb-3 text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                        {relatedPost.title}
                      </h3>
                      {relatedPost.excerpt && (
                        <p className="text-muted-foreground mb-4 line-clamp-3 text-sm leading-relaxed">
                          {relatedPost.excerpt}
                        </p>
                      )}
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        {relatedPost.reading_time_minutes && (
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {relatedPost.reading_time_minutes} min
                          </span>
                        )}
                        <ArrowRight className="w-4 h-4 ml-auto group-hover:translate-x-1 transition-transform text-primary" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
