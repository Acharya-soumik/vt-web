"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WordRotate } from "@/components/ui/word-rotate";
import { useFormContext } from "@/contexts/form-context";
import { SimpleProcess } from "../homepage/simple-process";
import Image from "next/image";

export function LegalNoticeLanding() {
  const { openForm } = useFormContext();
  
  const handleCallbackRequest = () => {
    openForm('legal-notice');
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
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/10 to-primary/5 animate-pulse"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-primary/3 to-transparent animate-pulse" style={{ animationDelay: '1s', animationDuration: '3s' }}></div>
        <div className="absolute inset-0 bg-gradient-to-bl from-secondary/5 via-transparent to-primary/3 animate-pulse" style={{ animationDelay: '2s', animationDuration: '4s' }}></div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-xl animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '6s' }}></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-secondary/10 rounded-full blur-xl animate-bounce" style={{ animationDelay: '1.5s', animationDuration: '5s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-primary/5 rounded-full blur-lg animate-pulse" style={{ animationDelay: '2.5s', animationDuration: '7s' }}></div>
        
        <div className="relative z-10 max-w-4xl mx-auto">
          {/* Main Headline with Word Rotation */}
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            File a Legal Notice for <WordRotate className="text-primary" words={["Divorce", "Money Recovery", "Property Disputes", "Contract Breaches", "Employment Issues", "Business Disputes"]} />
          </h1>
          
          {/* Tagline */}
          <p className="text-md md:text-xl font-semibold text-muted-foreground mb-6">
            Send Legally Valid Notices in 24 Hours
          </p>
          
          
          {/* Image with Integrated CTA */}
          <div className="relative mb-8 max-w-md mx-auto">
            <div className="relative w-full h-80 rounded-2xl overflow-hidden shadow-2xl">
              {/* Image Container with Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 rounded-2xl"></div>
              <Image
                src="/legal-notice/request-a-callback.png"
                alt="Legal Notice Consultation"
                fill
                className="object-contain p-4"
                priority
              />
              
              {/* Floating Call-to-Action Card */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-primary/20">
                <div className="text-center">
                  <h3 className="text-lg font-bold text-primary mb-2">
                    Need Help with Legal Notice?
                  </h3>
                  <Button 
                    size="sm" 
                    className="bg-primary hover:bg-primary/90 text-primary-foreground w-full"
                    onClick={handleCallbackRequest}
                  >
                    Request Callback
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary/20 rounded-full animate-pulse"></div>
            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-secondary/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
          
          {/* CTA Buttons */}
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