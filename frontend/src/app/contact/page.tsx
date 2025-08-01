import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ContactInfo } from "@/components/features/contact/contact-info";
import { ContactForm } from "@/components/features/contact/contact-form";
import { QuickActions } from "@/components/features/contact/quick-actions";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata('contact');

export default function ContactPage() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Contact", current: true }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        {/* Breadcrumb Navigation */}
        <div className="mb-8">
          <Breadcrumb items={breadcrumbItems} />
        </div>
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Get in Touch
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Have questions about our legal services? We&apos;re here to help. 
            Reach out to us through any of the channels below or fill out the form.
          </p>
        </section>

        {/* Contact Information */}
        <section className="mb-16">
          <ContactInfo />
        </section>

        {/* Contact Form */}
        <section className="mb-16">
          <div className="max-w-2xl mx-auto">
            <ContactForm />
          </div>
        </section>

        {/* Quick Actions */}
        <section className="mb-16">
          <QuickActions />
        </section>
      </div>
    </div>
  );
} 