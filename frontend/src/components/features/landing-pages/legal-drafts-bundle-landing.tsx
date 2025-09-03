"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Download, FileText, Shield, Clock, Star } from "lucide-react";
import { useFormContext } from "@/contexts/form-context";

interface BundleOption {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  description: string;
  features: string[];
  popular?: boolean;
}

const bundleOptions: BundleOption[] = [
  {
    id: "hindi-english",
    name: "Hindi + English",
    price: 357,
    originalPrice: 1785,
    description: "Complete bundle in Hindi and English languages",
    features: [
      "3500+ Legal Drafts",
      "Hindi & English versions",
      "Instant download",
      "Lifetime access",
      "Regular updates",
    ],
  },
  {
    id: "marathi-only",
    name: "Marathi Only",
    price: 315,
    originalPrice: 1575,
    description: "Complete bundle in Marathi language",
    features: [
      "3500+ Legal Drafts",
      "Marathi language",
      "Instant download",
      "Lifetime access",
      "Regular updates",
    ],
  },
  {
    id: "hindi-english-marathi",
    name: "Hindi + English + Marathi",
    price: 499,
    originalPrice: 2495,
    description: "Complete bundle in all three languages",
    features: [
      "3500+ Legal Drafts",
      "Hindi, English & Marathi",
      "Instant download",
      "Lifetime access",
      "Regular updates",
      "Most popular choice",
    ],
    popular: true,
  },
];

const legalCategories = [
  "Agreements",
  "Affidavits",
  "Bail Bonds",
  "Contracts",
  "Deeds",
  "Notices",
  "Petitions",
  "Wills",
  "Power of Attorney",
  "Rent Agreements",
  "Sale Deeds",
  "Partnership Deeds",
  "Employment Contracts",
  "NDA Agreements",
  "Service Agreements",
  "Loan Agreements",
  "Gift Deeds",
  "Lease Deeds",
  "Settlement Deeds",
  "Divorce Petitions",
  "Maintenance Petitions",
  "Property Disputes",
  "Consumer Complaints",
  "Insurance Claims",
  "Banking Documents",
  "Corporate Documents",
  "Tax Documents",
  "Family Law Documents",
];

const faqs = [
  {
    question: "How many drafts are included in the bundle?",
    answer:
      "The bundle contains over 3500+ professionally drafted legal documents covering all major legal categories and requirements.",
  },
  {
    question: "Are the drafts editable?",
    answer:
      "Yes, all drafts are provided in editable formats (Word documents) so you can customize them according to your specific needs.",
  },
  {
    question: "How will I receive the drafts after payment?",
    answer:
      "You will receive an instant download link on WhatsApp immediately after successful payment. The link will be valid for lifetime access.",
  },
  {
    question: "What if I don't get the product after payment?",
    answer:
      "If you don't receive the download link within 5 minutes, please contact us on WhatsApp at +91 9347388278. We guarantee delivery or full refund.",
  },
  {
    question: "What is the refund policy?",
    answer:
      "We offer a 100% money-back guarantee if you're not satisfied with the quality of the drafts. Contact us within 7 days of purchase.",
  },
];

export function LegalDraftsBundleLanding() {
  const { openForm } = useFormContext();
  const [selectedBundle, setSelectedBundle] = useState<string>(
    "hindi-english-marathi"
  );

  const handleBuyNow = () => {
    openForm("legal-drafts-bundle");
  };

  const selectedBundleData = bundleOptions.find(
    (bundle) => bundle.id === selectedBundle
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header with green bar */}
      <div className="bg-green-600 text-white text-sm py-1 px-4">
        <div className="container mx-auto flex justify-between items-center">
          <span>+500 New Templates Added</span>
          <span>Limited Time Offer</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Side - Product Image */}
          <div className="text-center md:text-left">
            <div className="relative inline-block">
              <div className="w-64 h-80 bg-gradient-to-br from-gray-900 to-gray-700 rounded-lg shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-orange-500/20"></div>
                <div className="absolute top-4 left-4 right-4 text-center">
                  <div className="text-white font-bold text-lg mb-2">
                    3500+ Legal Drafts
                  </div>
                  <div className="text-yellow-400 text-sm">
                    Professional Templates
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-red-600 text-white text-xs px-3 py-1 rounded-full inline-block">
                    +500 New Templates Added
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Bundle Selection */}
          <div className="space-y-6">
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Instant Download for{" "}
                <span className="text-primary">Rs. 499/-</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                Get instant access to 3500+ professional legal drafts,
                agreements, contracts, notices, and more.
              </p>
            </div>

            {/* Bundle Selection */}
            <div className="space-y-4">
              {bundleOptions.map((bundle) => (
                <div
                  key={bundle.id}
                  className={`relative border-2 rounded-lg p-4 cursor-pointer transition-all ${
                    selectedBundle === bundle.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  } ${bundle.popular ? "ring-2 ring-primary/20" : ""}`}
                  onClick={() => setSelectedBundle(bundle.id)}
                >
                  {bundle.popular && (
                    <div className="absolute -top-3 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                          selectedBundle === bundle.id
                            ? "border-primary bg-primary"
                            : "border-border"
                        }`}
                      >
                        {selectedBundle === bundle.id && (
                          <div className="w-2 h-2 bg-primary-foreground rounded-full"></div>
                        )}
                      </div>
                      <div>
                        <div className="font-semibold text-foreground">
                          {bundle.name}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {bundle.description}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">
                        ₹{bundle.price}
                      </div>
                      <div className="text-sm text-muted-foreground line-through">
                        ₹{bundle.originalPrice}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Buy Now Button */}
            <Button
              size="lg"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-4 text-lg font-semibold"
              onClick={handleBuyNow}
            >
              Buy Now - ₹{selectedBundleData?.price}
            </Button>

            <p className="text-sm text-muted-foreground text-center">
              300+ New Templates added in February 2024
            </p>
          </div>
        </div>

        {/* Limited Time Offer */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center bg-green-600 text-white px-6 py-3 rounded-full text-xl font-bold">
            <Check className="w-6 h-6 mr-2" />
            80% OFF LIMITED TIME OFFER!! at Rs. 499
          </div>
        </div>

        {/* Description */}
        <div className="max-w-4xl mx-auto mt-8 text-center">
          <p className="text-lg text-muted-foreground leading-relaxed">
            This comprehensive legal drafts bundle is designed for lawyers, law
            students, and businesses who need professional legal documents. Each
            draft is carefully crafted by legal experts and covers all major
            legal requirements. Save time and ensure accuracy with our
            ready-to-use templates.
          </p>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="bg-secondary/50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Customer Reviews
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="text-center">
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className="w-5 h-5 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">
                    &ldquo;Excellent collection of legal drafts. Saved me hours
                    of work. Highly recommended for any legal
                    professional.&rdquo;
                  </p>
                  <div className="font-semibold text-foreground">
                    Customer Name
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            How it works?
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: 1,
                title: "Complete Payment",
                description: "Complete Payment using Razorpay.",
              },
              {
                step: 2,
                title: "Get Download Link",
                description: "Click on the download link on your WhatsApp.",
              },
              {
                step: 3,
                title: "Download Files",
                description: "Download the files on your device.",
              },
              {
                step: 4,
                title: "Start Using",
                description: "Start using the drafts.",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-semibold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contents */}
      <section className="bg-secondary/50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            What are the contents of the Legal Draft Bundle?
          </h2>
          <div className="grid md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {legalCategories.map((category) => (
              <div
                key={category}
                className="bg-background p-4 rounded-lg text-center"
              >
                <FileText className="w-6 h-6 mx-auto mb-2 text-primary" />
                <div className="font-medium text-foreground">{category}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Have a Question?
          </h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features and Download */}
      <section className="bg-secondary/50 py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Top Features */}
            <div>
              <h2 className="text-3xl font-bold mb-8">Top Features</h2>
              <div className="space-y-4">
                {[
                  { icon: Download, text: "Editable drafts" },
                  { icon: Clock, text: "Instant download" },
                  { icon: Shield, text: "Lifetime access" },
                  { icon: FileText, text: "Regular updates" },
                  { icon: Check, text: "Easy to use" },
                ].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <feature.icon className="w-5 h-5 text-primary" />
                    <span className="text-foreground">{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Download Section */}
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-6">Download it instantly</h2>
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg"
                onClick={handleBuyNow}
              >
                Buy Now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            What If you don&apos;t get the product after payment?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            We guarantee instant delivery. If you don&apos;t receive the
            download link within 5 minutes, contact us immediately and
            we&apos;ll resolve it or provide a full refund.
          </p>
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
            onClick={() => window.open("https://wa.me/919347388278", "_blank")}
          >
            Contact Us
          </Button>
        </div>
      </section>

      {/* Contact */}
      <section className="bg-secondary/50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Do you have any questions?
          </h2>
          <p className="text-2xl font-semibold text-primary">+91 9347388278</p>
        </div>
      </section>

      {/* Payment Methods */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg font-semibold mb-6">
            100% SECURE PAYMENTS POWERED BY
          </p>
          <div className="flex justify-center items-center space-x-8 mb-8">
            <div className="text-2xl font-bold text-blue-600">Razorpay</div>
          </div>
          <div className="flex justify-center items-center space-x-6 text-sm text-muted-foreground">
            <span>G Pay</span>
            <span>PhonePe</span>
            <span>UPI</span>
            <span>PayPal</span>
            <span>Paytm</span>
          </div>
        </div>
      </section>

      {/* Brand Philosophy */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-bold mb-4">
                Like a Chef knows the Ingredients, We know the intricacies of
                law.
              </h2>
              <div className="text-xl font-semibold mb-4">VAKIL.TECH</div>
              <p className="text-lg opacity-90">Your trusted legal partner</p>
              <p className="mt-4 opacity-80">
                With years of experience in legal services, we understand the
                complexities of law and provide you with the most comprehensive
                and accurate legal documents.
              </p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 /20 rounded-full mx-auto flex items-center justify-center">
                <span className="text-4xl">👨‍⚖️</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
