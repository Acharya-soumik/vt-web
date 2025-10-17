import { Metadata } from 'next';
import BlogPageClient from './blog-page-client';

export const metadata: Metadata = {
  title: 'Legal Knowledge Hub - Expert Legal Guides & Resources | VakilTech',
  description: 'Access comprehensive legal guides, expert advice, and practical resources on agreements, legal notices, consumer rights, and more. Stay informed with VakilTech.',
  keywords: 'legal guides, legal advice India, agreement drafting, legal notices, consumer rights, business law, legal resources',
  openGraph: {
    title: 'Legal Knowledge Hub - Expert Legal Guides | VakilTech',
    description: 'Comprehensive legal guides and expert advice on agreements, legal notices, consumer rights, and more.',
    type: 'website',
  },
};

export default function BlogPage() {
  return <BlogPageClient />;
}
