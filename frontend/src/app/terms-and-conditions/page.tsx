import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { LegalCTA } from "@/components/features/legal/legal-cta";
import { generateLegalMetadata } from "@/lib/seo";

export const metadata: Metadata = generateLegalMetadata("terms-and-conditions");

export default function TermsAndConditionsPage() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Terms and Conditions", current: true },
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
            Terms and Conditions
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            These terms and conditions govern your use of Vakiltech.in and the
            services provided by Vakil Tech. Please read them carefully before
            using our platform.
          </p>
          <p className="text-sm text-muted-foreground mt-4">
            Last updated: October 20, 2023
          </p>
        </section>

        {/* Terms Content */}
        <section className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="acceptance">
              <AccordionTrigger className="text-left">
                1. Acceptance of Terms
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">
                  By accessing and using Vakiltech.in, you accept and agree to
                  be bound by these Terms and Conditions. If you do not agree to
                  these terms, please do not use our website or services.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="service-description">
              <AccordionTrigger className="text-left">
                2. Service Description
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground mb-4">
                  Vakil Tech operates as a legal services aggregator platform.
                  We connect clients with qualified legal professionals who
                  provide various legal services including:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Legal consultation and advice</li>
                  <li>Document drafting and review</li>
                  <li>Legal notice services</li>
                  <li>Corporate retainer services</li>
                  <li>Compliance and regulatory guidance</li>
                </ul>
                <p className="text-muted-foreground mt-4">
                  All legal services are provided by qualified legal
                  professionals registered with the Bar Council of India.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="user-responsibilities">
              <AccordionTrigger className="text-left">
                3. User Responsibilities
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground mb-4">
                  As a user of our platform, you agree to:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Provide accurate and complete information</li>
                  <li>Cooperate with our legal professionals</li>
                  <li>Pay fees as agreed upon</li>
                  <li>Maintain confidentiality of legal advice</li>
                  <li>Not use our services for illegal purposes</li>
                  <li>Respect the intellectual property rights of others</li>
                  <li>
                    Not attempt to gain unauthorized access to our systems
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="payment-refund">
              <AccordionTrigger className="text-left">
                4. Payment and Refund Policy
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Payment Terms</h3>
                    <p className="text-muted-foreground">
                      All fees are quoted in Indian Rupees (INR) and include
                      applicable taxes. Payment is due as specified in your
                      service agreement. We accept various payment methods
                      including online transfers and digital payments.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Refund Policy</h3>
                    <p className="text-muted-foreground">
                      We offer refunds in accordance with our satisfaction
                      guarantee. Refund requests must be made within 30 days of
                      service completion. Processing fees may apply and are
                      non-refundable.
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="confidentiality">
              <AccordionTrigger className="text-left">
                5. Confidentiality
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">
                  We maintain strict confidentiality of all client information
                  and legal matters, subject to legal requirements and your
                  consent. Our confidentiality obligations are governed by
                  applicable laws and professional ethics. All communications
                  between you and our legal professionals are protected by
                  attorney-client privilege.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="limitation-liability">
              <AccordionTrigger className="text-left">
                6. Limitation of Liability
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground mb-4">
                  Vakil Tech&apos;s liability is limited to the extent permitted
                  by law. We are not liable for:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Indirect or consequential damages</li>
                  <li>Loss of profits or business opportunities</li>
                  <li>
                    Damages arising from client&apos;s failure to follow advice
                  </li>
                  <li>Third-party actions or decisions</li>
                  <li>Technical issues or service interruptions</li>
                  <li>Data loss or security breaches beyond our control</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="intellectual-property">
              <AccordionTrigger className="text-left">
                7. Intellectual Property
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">
                  All content on our website, including text, graphics, logos,
                  and software, is owned by Vakil Tech and protected by
                  intellectual property laws. You may not reproduce, distribute,
                  or create derivative works without our written permission.
                  Legal documents prepared for you remain your property.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="website-use">
              <AccordionTrigger className="text-left">
                8. Website Use
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Acceptable Use</h3>
                    <p className="text-muted-foreground">
                      You agree to use our website only for lawful purposes and
                      in accordance with these terms.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">
                      Prohibited Activities
                    </h3>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1">
                      <li>
                        Attempting to gain unauthorized access to our systems
                      </li>
                      <li>Interfering with website functionality</li>
                      <li>Transmitting harmful code or content</li>
                      <li>Violating any applicable laws or regulations</li>
                      <li>
                        Impersonating others or providing false information
                      </li>
                    </ul>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="dispute-resolution">
              <AccordionTrigger className="text-left">
                9. Dispute Resolution
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground mb-4">
                  Any disputes arising from these terms or our services will be
                  resolved through:
                </p>
                <ol className="list-decimal list-inside text-muted-foreground space-y-1">
                  <li>Direct communication and negotiation</li>
                  <li>Mediation if required</li>
                  <li>Arbitration in Mumbai, India</li>
                  <li>Court proceedings as a last resort</li>
                </ol>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="governing-law">
              <AccordionTrigger className="text-left">
                10. Governing Law
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">
                  These terms are governed by the laws of India. Any legal
                  proceedings will be subject to the jurisdiction of courts in
                  Mumbai, Maharashtra. All disputes will be resolved in
                  accordance with Indian law.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="changes-terms">
              <AccordionTrigger className="text-left">
                11. Changes to Terms
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">
                  We reserve the right to modify these terms at any time.
                  Changes will be effective immediately upon posting on our
                  website. Continued use of our services constitutes acceptance
                  of modified terms. We will notify users of significant changes
                  via email or website notification.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="contact-info">
              <AccordionTrigger className="text-left">
                12. Contact Information
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground mb-4">
                  For questions about these terms and conditions, please contact
                  us:
                </p>
                <div className="space-y-2 text-muted-foreground">
                  <p>Email: legal@vakiltech.in</p>
                  <p>Phone: +91 7047683995</p>
                  <p>
                    Address: Vakil Tech Legal Services, Mumbai, Maharashtra,
                    India
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        {/* CTA Section */}
        <LegalCTA />
      </div>
    </div>
  );
}
