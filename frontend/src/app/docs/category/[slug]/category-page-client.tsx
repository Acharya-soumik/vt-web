"use client";

import { useEffect, useState } from 'react';
import { blogService, BlogPost, BlogCategory } from '@/services/blog-service';
import Link from 'next/link';
import { Clock, Calendar, ArrowLeft, ArrowRight, Layers } from 'lucide-react';
import { motion } from 'framer-motion';

interface CategoryPageClientProps {
  slug: string;
}

export default function CategoryPageClient({ slug }: CategoryPageClientProps) {
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [category, setCategory] = useState<BlogCategory | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const [cats, postData] = await Promise.all([
        blogService.getAllCategories(),
        blogService.getPostsByCategory(slug),
      ]);

      setCategories(cats);
      setPosts(postData);
      setCategory(cats.find((cat) => cat.slug === slug) || null);
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

  if (!category) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Layers className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-foreground mb-4">Category Not Found</h1>
          <p className="text-muted-foreground mb-8">The category you're looking for doesn't exist.</p>
          <Link
            href="/docs"
            className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all duration-300 hover:scale-105"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Articles
          </Link>
        </div>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="bg-card border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Link
            href="/docs"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium group transition-all"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to All Articles
          </Link>
        </div>
      </div>

      {/* Category Header */}
      <section className="relative bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-20 px-4 overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -right-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto relative z-10"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
            <Layers className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Category</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">{category.name}</h1>
          {category.description && (
            <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
              {category.description}
            </p>
          )}
          <p className="text-primary mt-6 font-medium">{posts.length} articles in this category</p>
        </motion.div>
      </section>

      {/* Category Filter */}
      <section className="max-w-7xl mx-auto px-4 py-8 border-b bg-card/50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap gap-3"
        >
          <Link
            href="/docs"
            className="px-5 py-2.5 bg-background border border-border text-foreground rounded-full text-sm font-medium hover:bg-secondary hover:border-primary transition-all duration-300 hover:scale-105 shadow-sm"
          >
            All Articles
          </Link>
          {categories.map((cat, index) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
            >
              <Link
                href={`/docs/category/${cat.slug}`}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 shadow-sm ${
                  cat.slug === slug
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-background border border-border text-foreground hover:bg-secondary hover:border-primary'
                }`}
              >
                {cat.name}
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Articles Grid */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        {posts.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {posts.map((post) => (
              <motion.div key={post.id} variants={itemVariants}>
                <Link
                  href={`/docs/${post.slug}`}
                  className="group block h-full bg-card border rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="p-6">
                    <h3 className="text-lg font-bold mb-2 text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                      {post.title}
                    </h3>
                    {post.excerpt && (
                      <p className="text-muted-foreground mb-4 line-clamp-3 text-sm leading-relaxed">
                        {post.excerpt}
                      </p>
                    )}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        {post.reading_time_minutes && (
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {post.reading_time_minutes} min
                          </span>
                        )}
                        {post.published_at && (
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {new Date(post.published_at).toLocaleDateString('en-IN', {
                              month: 'short',
                              day: 'numeric',
                            })}
                          </span>
                        )}
                      </div>
                      <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <Layers className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground text-lg mb-4">No articles found in this category yet.</p>
            <Link
              href="/docs"
              className="inline-block text-primary hover:text-primary/80 font-medium"
            >
              Browse all articles
            </Link>
          </motion.div>
        )}
      </section>

      {/* CTA Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary to-primary/90 text-primary-foreground py-20 px-4 overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center relative z-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Need Legal Assistance?</h2>
          <p className="text-xl text-primary-foreground/90 mb-10 leading-relaxed">
            Our expert lawyers are ready to help you with any legal matter.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/send-a-legal-notice"
              className="group px-8 py-4 bg-background text-foreground rounded-lg font-semibold hover:bg-background/90 transition-all duration-300 hover:scale-105 shadow-lg inline-flex items-center justify-center gap-2"
            >
              Send Legal Notice
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/consultation"
              className="group px-8 py-4 bg-transparent border-2 border-primary-foreground/30 text-primary-foreground rounded-lg font-semibold hover:bg-white/10 transition-all duration-300 hover:scale-105 inline-flex items-center justify-center gap-2"
            >
              Get Consultation
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
