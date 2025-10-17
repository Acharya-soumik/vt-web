"use client";

import { useEffect, useState } from 'react';
import { blogService, BlogPost, BlogCategory } from '@/services/blog-service';
import Link from 'next/link';
import { Clock, Calendar, Eye, ArrowRight, BookOpen, TrendingUp, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function BlogPageClient() {
  const [allPosts, setAllPosts] = useState<BlogPost[]>([]);
  const [featuredPosts, setFeaturedPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const [posts, featured, cats] = await Promise.all([
        blogService.getAllPublishedPosts(),
        blogService.getFeaturedPosts(3),
        blogService.getAllCategories(),
      ]);
      setAllPosts(posts);
      setFeaturedPosts(featured);
      setCategories(cats);
      setLoading(false);
    }
    loadData();
  }, []);

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
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse">
          <BookOpen className="w-12 h-12 text-primary animate-bounce" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-20 px-4 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -left-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-1/2 -right-1/2 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-pulse delay-700" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto relative z-10"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Legal Knowledge Hub</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
            Expert Legal Insights &
            <span className="block mt-2 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Practical Guides
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
            Navigate complex legal matters with confidence. Access comprehensive guides, expert advice, and practical resources crafted by experienced lawyers.
          </p>
          <div className="mt-8 flex flex-wrap gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              <span>{allPosts.length} Articles</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              <span>Updated Weekly</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              <span>Expert Verified</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="h-1 w-12 bg-gradient-to-r from-primary to-primary/40 rounded-full" />
              <h2 className="text-3xl font-bold text-foreground">Featured Articles</h2>
            </div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-3 gap-8"
          >
            {featuredPosts.map((post) => (
              <motion.div key={post.id} variants={itemVariants}>
                <Link
                  href={`/docs/${post.slug}`}
                  className="group block h-full bg-card border rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                >
                  <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                        Featured
                      </span>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <BookOpen className="w-16 h-16 text-white/80 group-hover:scale-110 transition-transform duration-500" />
                    </div>
                  </div>
                  <div className="p-6">
                    {post.category && (
                      <span className="inline-block px-3 py-1 bg-secondary text-secondary-foreground text-xs font-semibold rounded-full mb-3">
                        {post.category.name}
                      </span>
                    )}
                    <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    {post.excerpt && (
                      <p className="text-muted-foreground mb-4 line-clamp-3 text-sm leading-relaxed">
                        {post.excerpt}
                      </p>
                    )}
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      {post.reading_time_minutes && (
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {post.reading_time_minutes} min
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5" />
                        {post.view_count}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </section>
      )}

      {/* Categories Filter */}
      {categories.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-8 border-y bg-card/50">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap gap-3"
          >
            <Link
              href="/docs"
              className="px-5 py-2.5 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:bg-primary/90 transition-all duration-300 hover:scale-105 shadow-sm"
            >
              All Articles
            </Link>
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
              >
                <Link
                  href={`/docs/category/${category.slug}`}
                  className="px-5 py-2.5 bg-background border border-border text-foreground rounded-full text-sm font-medium hover:bg-secondary hover:border-primary transition-all duration-300 hover:scale-105 shadow-sm"
                >
                  {category.name}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </section>
      )}

      {/* All Posts */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="h-1 w-12 bg-gradient-to-r from-primary to-primary/40 rounded-full" />
            <h2 className="text-3xl font-bold text-foreground">All Articles</h2>
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {allPosts.map((post) => (
            <motion.div
              key={post.id}
              variants={itemVariants}
            >
              <Link
                href={`/docs/${post.slug}`}
                className="group block h-full bg-card border rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="p-6">
                  {post.category && (
                    <span className="inline-block px-3 py-1 bg-secondary text-secondary-foreground text-xs font-semibold rounded-full mb-3">
                      {post.category.name}
                    </span>
                  )}
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

        {allPosts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground text-lg">No articles found. Check back soon!</p>
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
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Need Professional Legal Help?</h2>
          <p className="text-xl text-primary-foreground/90 mb-10 leading-relaxed">
            Our expert lawyers are ready to assist you with personalized legal solutions tailored to your needs.
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
              Book Consultation
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
