"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WordRotate } from "@/components/ui/word-rotate";
import { HeroBackground } from "@/components/ui/hero-background";
import { useFormContext } from "@/contexts/form-context";
import { SimpleProcess } from "../homepage/simple-process";
import Image from "next/image";

export function LegalNoticeLanding() {
  const { openForm } = useFormContext();
  
  const handleCallbackRequest = () => {
    openForm('legal-notice');
  };

  const handleLearnMore = () => {
    const processSection = document.getElementById('legal-process');
    if (processSection) {
      processSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const services = [
    {
      title: "Matrimonial Disputes",
      description: "Professional legal support for matrimonial and family law matters",
      image: "/legal-notice/matrimonial-disputes.png",
      features: [
        "Privacy Guaranteed",
        "Pick a male or Female lawyer"
      ]
    },
    {
      title: "Money Recovery",
      description: "Effective legal solutions for recovering outstanding payments and debts",
      image: "/legal-notice/marketing-software-feature-1.webp",
      features: [
        "Threaten Legal Action",
        "Follow up on unpaid bills"
      ]
    },
    {
      title: "Consumer Disputes",
      description: "Expert legal assistance for consumer rights and dispute resolution",
      image: "/legal-notice/consumer-disputes.png",
      features: [
        "Seek Refund",
        "Seek Compensation"
      ]
    }
  ];

  const processSteps = [
    {
      icon: "₹",
      title: "Pay Advance",
      description: "Pay ₹400 advance to get connected with a legal professional"
    },
    {
      icon: "👨‍💼",
      title: "Connect & Consult",
      description: "Chat or call with qualified advocate to discuss your case"
    },
    {
      icon: "📝",
      title: "Notice Drafting",
      description: "Advocate drafts professional legal notice after document review"
    },
    {
      icon: "✅",
      title: "Approve & Send",
      description: "Review, approve and get signed notice posted with acknowledgment"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="relative text-center py-16 md:py-20 overflow-hidden">
        <HeroBackground variant="legal" className="absolute inset-0" />
        <div className="relative z-10 max-w-4xl mx-auto">
          {/* Main Headline with Word Rotation */}
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            File a Legal Notice for <WordRotate className="text-primary" words={["Divorce", "Money Recovery", "Property Disputes", "Contract Breaches", "Employment Issues", "Business Disputes"]} />
          </h1>
          
          {/* Tagline */}
          <p className="text-xl md:text-2xl font-semibold text-muted-foreground mb-6">
            Send Legally Valid Notices in 24 Hours
          </p>
          
          {/* Description */}
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Get professionally drafted legal notices that comply with Indian law. Whether you need to recover money, 
            resolve property disputes, or handle family matters - our expert lawyers ensure your notice is legally 
            sound and effective. Fast, reliable, and court-ready.
          </p>
          
          {/* Updated CTA */}
          <div className="text-2xl font-bold text-primary mb-8">
            Need Help with Legal Notice?
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3"
              onClick={handleCallbackRequest}
            >
              Request Callback
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-primary text-primary hover:bg-secondary px-8 py-3"
              onClick={handleLearnMore}
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Most in Need Section */}
      <section className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Most in need
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Thousands of Indians face on a regular basis
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="w-32 h-32 mx-auto mb-4 relative">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-contain"
                  />
                </div>
                <CardTitle className="text-xl mb-4">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center justify-center">
                      <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* 4-Step Process */}
      <section id="legal-process" className="py-16">
        <SimpleProcess
          title="Simple 4-Step Process"
          subtitle="Professional legal notice service designed for simplicity and effectiveness"
          steps={processSteps}
        />
        <div className="mx-auto text-center">

          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg"
            onClick={handleCallbackRequest}
          >
            Start Your Legal Notice Now
          </Button>
          </div>
        
        {/* Primary CTA after process explanation */}
        {/* <div className="text-center mt-12">
          <h3 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
            Ready to Get Started?
          </h3>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Connect with our legal experts today and get your professional legal notice in 24 hours
          </p>
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg"
            onClick={handleCallbackRequest}
          >
            Start Your Legal Notice Now
          </Button>
        </div> */}
      </section>
<br />
      {/* Pricing & Value Proposition */}
      <section className="py-16 bg-card border rounded-lg">
        <div className="text-center max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-foreground">
           Why Choose Us?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
              <span className="text-muted-foreground">Expert legal professionals</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
              <span className="text-muted-foreground">Legally compliant notices</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
              <span className="text-muted-foreground">Fast turnaround time</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
              <span className="text-muted-foreground">Customized to your case</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
              <span className="text-muted-foreground">Ongoing support</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
              <span className="text-muted-foreground">No hidden charges</span>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
} 