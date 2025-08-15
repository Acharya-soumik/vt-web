"use client";

import { useFormContext } from "@/contexts/form-context";
import Link from "next/link";
import { ExpertCarousel } from "@/components/ui/expert-carousel";
import { legalExperts } from "@/data/experts";
import { comprehensiveLegalNoticeTopicFAQMap } from "@/data/comprehensive-faqs";
import { topicDescriptions } from "@/data/topic-descriptions";

interface LegalNoticeTopicLandingProps {
  topicTitle: string;
  description?: string;
  city?: string;
  topicKey?: string;
}

export function LegalNoticeTopicLandingUniform({
  topicTitle,
  description,
  city,
  topicKey,
}: LegalNoticeTopicLandingProps) {
  const { openForm } = useFormContext();
  
  // Get topic description - 100+ words
  const topicDescription = topicKey ? topicDescriptions[topicKey] : null;
  
  return (
    <div className="container mx-auto px-4 pb-8">
      {/* Standard Hero Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[800px] h-[800px] bg-gradient-to-r from-primary/20 to-transparent rounded-full blur-3xl opacity-20" />
        </div>
        
        <div className="relative max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                  Professional Legal Service
                </div>
                <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
                  {topicTitle}
                  {city && (
                    <span className="block text-primary mt-2">
                      in {city}
                    </span>
                  )}
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  {description || "Professional legal notice drafting and delivery service with expert guidance."}
                </p>
                
                {/* Standard Benefits */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-sm text-foreground font-medium">
                    ✓ Drafted by experienced advocates
                  </div>
                  <div className="text-sm text-foreground font-medium">
                    ✓ Compliant with Indian legal standards
                  </div>
                  <div className="text-sm text-foreground font-medium">
                    ✓ Trackable delivery with proof
                  </div>
                  <div className="text-sm text-foreground font-medium">
                    ✓ 24-48 hour delivery
                  </div>
                </div>
              </div>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  onClick={() => openForm("legal-notice")}
                >
                  Start Legal Notice
                </button>
                <Link
                  href={`?type=legal-notice`}
                  className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 text-center"
                >
                  Get Free Consultation
                </Link>
              </div>
              
              {/* Trust indicators */}
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                  <span>Expert Lawyers</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                  <span>24-48 Hour Delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                  <span>Legal Compliance</span>
                </div>
              </div>
            </div>
            
            {/* Hero Image */}
            <div className="relative">
              <div className="relative w-full h-80 md:h-96 rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 to-primary/5 p-8 flex items-center justify-center">
                <img
                  src="/legal-notice/consumer-disputes.png"
                  alt={`${topicTitle} legal notice service`}
                  className="w-full h-full object-contain drop-shadow-2xl"
                />
              </div>
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Expert Carousel Section */}
      <ExpertCarousel 
        experts={legalExperts}
        title="Consult top experts across legal areas"
        subtitle="Connect with experienced legal professionals who can help you with your specific legal needs"
      />

      {/* Standard Content Sections */}
      <section className="grid md:grid-cols-3 gap-6 mt-12">
        <div className="md:col-span-2 space-y-8">
          {/* Standard content blocks */}
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20 rounded-xl p-6">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
              <span className="text-blue-600">👥</span>
              Who needs this service?
            </h2>
            <div className="grid gap-3">
              <div className="flex items-start gap-3 p-3 bg-background/60 rounded-lg">
                <span className="text-green-500 mt-0.5">✓</span>
                <span className="text-foreground">Individuals or businesses facing legal disputes</span>
              </div>
              <div className="flex items-start gap-3 p-3 bg-background/60 rounded-lg">
                <span className="text-green-500 mt-0.5">✓</span>
                <span className="text-foreground">Those seeking formal legal communication before court proceedings</span>
              </div>
              <div className="flex items-start gap-3 p-3 bg-background/60 rounded-lg">
                <span className="text-green-500 mt-0.5">✓</span>
                <span className="text-foreground">Anyone wanting to establish legal documentation for their claim</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-amber-50 to-amber-100 dark:from-amber-950/20 dark:to-amber-900/20 rounded-xl p-6">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
              <span className="text-amber-600">📄</span>
              Documents typically needed
            </h2>
            <div className="grid gap-3">
              <div className="flex items-start gap-3 p-3 bg-background/60 rounded-lg">
                <span className="text-amber-500 mt-0.5">📋</span>
                <span className="text-foreground">Relevant agreements, contracts, or transaction records</span>
              </div>
              <div className="flex items-start gap-3 p-3 bg-background/60 rounded-lg">
                <span className="text-amber-500 mt-0.5">📋</span>
                <span className="text-foreground">Identity and address proof of all parties involved</span>
              </div>
              <div className="flex items-start gap-3 p-3 bg-background/60 rounded-lg">
                <span className="text-amber-500 mt-0.5">📋</span>
                <span className="text-foreground">Supporting evidence like receipts, communications, or witness statements</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20 rounded-xl p-6">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
              <span className="text-green-600">🎯</span>
              What you'll receive
            </h2>
            <div className="grid gap-3">
              <div className="flex items-start gap-3 p-3 bg-background/60 rounded-lg">
                <span className="text-green-500 mt-0.5">🚀</span>
                <span className="text-foreground">Professionally drafted legal notice by qualified advocates</span>
              </div>
              <div className="flex items-start gap-3 p-3 bg-background/60 rounded-lg">
                <span className="text-green-500 mt-0.5">🚀</span>
                <span className="text-foreground">Registered delivery with acknowledgment receipt</span>
              </div>
              <div className="flex items-start gap-3 p-3 bg-background/60 rounded-lg">
                <span className="text-green-500 mt-0.5">🚀</span>
                <span className="text-foreground">Legal guidance for next steps and follow-up actions</span>
              </div>
            </div>
          </div>

          {/* Standard Process */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-foreground text-center">
              Our proven process
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  icon: "📋",
                  title: "Document Review",
                  text: "We analyze your case and review all relevant documents"
                },
                {
                  icon: "⚖️",
                  title: "Legal Drafting",
                  text: "Expert lawyers draft a compelling notice citing relevant laws"
                },
                {
                  icon: "📮",
                  title: "Professional Dispatch",
                  text: "Notice served via registered post with delivery confirmation"
                },
                {
                  icon: "📞",
                  title: "Follow-up Support",
                  text: "Guidance on next legal steps and response handling"
                }
              ].map((step, index) => (
                <div
                  key={step.title}
                  className="relative bg-gradient-to-br from-card to-primary/5 border border-primary/10 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                      {step.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-primary/20 text-primary px-2 py-1 rounded-full text-xs font-bold">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <h3 className="font-bold text-foreground">{step.title}</h3>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        {step.text}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Standard Timeline */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-foreground text-center">
              Timeline & Expected Outcomes
            </h2>
            <div className="grid md:grid-cols-4 gap-4">
              {[
                { label: "Document Review", value: "Same day" },
                { label: "Notice Drafting", value: "24-48 hours" },
                { label: "Dispatch & Delivery", value: "2-3 days" },
                { label: "Response Period", value: "15-30 days" }
              ].map((timeline, index) => (
                <div key={timeline.label} className="relative">
                  <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3 text-primary font-bold">
                      {index + 1}
                    </div>
                    <div className="text-sm text-muted-foreground mb-1">{timeline.label}</div>
                    <div className="font-bold text-lg text-primary">{timeline.value}</div>
                  </div>
                  {index < 3 && (
                    <div className="hidden md:block absolute top-1/2 -right-2 w-4 h-0.5 bg-primary/30" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Standard CTA Card */}
        <div className="sticky top-8">
          <div className="border border-primary/20 rounded-2xl p-6 bg-gradient-to-br from-card to-primary/5 shadow-xl backdrop-blur-sm">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                Most Popular
              </div>
              <h3 className="text-xl font-bold text-foreground">Get Started Today</h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                  <span className="text-sm font-medium">Advance Payment</span>
                  <span className="text-2xl font-bold text-primary">₹400</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Balance due only after draft approval
                </p>
              </div>
              
              <div className="space-y-3">
                <button
                  onClick={() => openForm("legal-notice")}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg py-3 font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Start Legal Notice
                </button>
                <Link
                  href={`?type=legal-notice`}
                  className="block w-full text-center border border-primary/20 text-primary hover:bg-primary/5 rounded-lg py-3 font-medium transition-all duration-300"
                >
                  Get Free Consultation
                </Link>
              </div>
              
              {/* Trust badges */}
              <div className="pt-4 border-t border-border/50 space-y-2">
                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                  <span>🛡️</span>
                  <span>100% Confidential</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                  <span>⚖️</span>
                  <span>Expert Legal Team</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                  <span>📞</span>
                  <span>24/7 Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Topic Description Section (100+ words) */}
      {topicDescription && (
        <section className="mt-16 mb-12">
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-secondary/30 to-secondary/10 rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-foreground mb-6 text-center">
              About {topicTitle}
            </h2>
            <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed text-justify">
              <p>{topicDescription}</p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default LegalNoticeTopicLandingUniform;