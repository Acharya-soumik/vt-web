"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WordRotate } from "@/components/ui/word-rotate";
import { ExpertCarousel } from "@/components/ui/expert-carousel";
import { useFormContext } from "@/contexts/form-context";
import { SimpleProcess } from "../homepage/simple-process";
import { legalExperts } from "@/data/experts";
import Image from "next/image";

export function LegalNoticeLanding({
  topicTitle,
  city,
}: { topicTitle?: string; city?: string } = {}) {
  const { openForm } = useFormContext();

  const handleCallbackRequest = () => {
    openForm("legal-notice");
  };

  const services = [
    {
      title: "Matrimonial Disputes",
      description:
        "Professional legal support for matrimonial and family law matters",
      image: "/legal-notice/matrimonial-disputes.png",
      features: ["Privacy Guaranteed", "Pick a male or Female lawyer"],
    },
    {
      title: "Money Recovery",
      description:
        "Effective legal solutions for recovering outstanding payments and debts",
      image: "/legal-notice/marketing-software-feature-1.webp",
      features: ["Threaten Legal Action", "Follow up on unpaid bills"],
    },
    {
      title: "Consumer Disputes",
      description:
        "Expert legal assistance for consumer rights and dispute resolution",
      image: "/legal-notice/consumer-disputes.png",
      features: ["Seek Refund", "Seek Compensation"],
    },
  ];

  const processSteps = [
    {
      icon: "₹",
      title: "Pay Advance",
      description:
        "Pay ₹400 advance to get connected with a legal professional",
      svgPath: "/4-step-process/pay_advance.svg",
    },
    {
      icon: "👨‍💼",
      title: "Connect & Consult",
      description: "Chat or call with qualified advocate to discuss your case",
      svgPath: "/4-step-process/connect_consult.svg",
    },
    {
      icon: "📝",
      title: "Notice Drafting",
      description:
        "Advocate drafts professional legal notice after document review",
      svgPath: "/4-step-process/draft.svg",
    },
    {
      icon: "✅",
      title: "Approve & Send",
      description:
        "Review, approve and get signed notice posted with acknowledgment",
      svgPath: "/4-step-process/approve_send.svg",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-2 md:py-8">
      {/* Hero Section */}
      <section className="relative text-center py-16 md:py-20 overflow-hidden">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/10 to-primary/5 animate-pulse"></div>
        <div
          className="absolute inset-0 bg-gradient-to-tr from-transparent via-primary/3 to-transparent animate-pulse"
          style={{ animationDelay: "1s", animationDuration: "3s" }}
        ></div>
        <div
          className="absolute inset-0 bg-gradient-to-bl from-secondary/5 via-transparent to-primary/3 animate-pulse"
          style={{ animationDelay: "2s", animationDuration: "4s" }}
        ></div>

        {/* Floating Elements */}
        <div
          className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-xl animate-bounce"
          style={{ animationDelay: "0.5s", animationDuration: "6s" }}
        ></div>
        <div
          className="absolute bottom-20 right-10 w-24 h-24 bg-secondary/10 rounded-full blur-xl animate-bounce"
          style={{ animationDelay: "1.5s", animationDuration: "5s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/4 w-16 h-16 bg-primary/5 rounded-full blur-lg animate-pulse"
          style={{ animationDelay: "2.5s", animationDuration: "7s" }}
        ></div>

        <div className="relative z-10 max-w-4xl mx-auto">
          {/* Image first */}
          <div className="relative mb-8 max-w-md mx-auto">
            <div className="relative w-full h-80 rounded-2xl overflow-hidden">
              {/* Subtle circular gradient behind the illustration */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[72%] aspect-square rounded-full bg-[radial-gradient(circle_at_center,rgba(244,63,94,0.22)_0%,rgba(59,130,246,0.16)_50%,transparent_80%)] animate-gradient-pulse"></div>
              </div>
              <Image
                src="/legal-notice/hero.svg"
                alt="Legal Notice Consultation"
                fill
                className="object-contain p-4"
                priority
              />
            </div>
          </div>

          {/* Main Headline with Word Rotation */}
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            {topicTitle ? (
              <>
                Send a Legal Notice for{" "}
                <span className="text-primary">{topicTitle}</span>
                {city ? (
                  <>
                    {" "}
                    in <span className="text-primary">{city}</span>
                  </>
                ) : null}
              </>
            ) : (
              <>
                Send a Legal Notice for{" "}
                <WordRotate
                  className="text-primary"
                  words={[
                    "Divorce",
                    "Money Recovery",
                    "Property Disputes",
                    "Contract Breaches",
                    "Employment Issues",
                    "Business Disputes",
                  ]}
                />
                {city ? (
                  <>
                    {" "}
                    in <span className="text-primary">{city}</span>
                  </>
                ) : null}
              </>
            )}
          </h1>

          {/* Description */}
          <p className="text-md md:text-xl font-semibold text-muted-foreground mb-6">
            Send Legally Valid Notices in 24 Hours
          </p>

          {/* Primary CTA */}
          <div className="flex justify-center">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg"
              onClick={handleCallbackRequest}
            >
              Request Callback
            </Button>
          </div>
        </div>
      </section>

      {/* Expert Carousel Section */}
      <ExpertCarousel
        experts={legalExperts}
        title="Consult top experts across legal areas"
        subtitle="Connect with experienced legal professionals who can help you with your specific legal needs"
      />

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
            <Card
              key={index}
              className="text-center hover:shadow-lg transition-all duration-300"
            >
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
                    <li
                      key={featureIndex}
                      className="flex items-center justify-center"
                    >
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
          className="border-0 shadow shadow-primary border-b-2 border-primary"
        />
        <div className="mx-auto text-center">
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg mt-2"
            onClick={handleCallbackRequest}
          >
            Raise a Request
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
              <span className="text-muted-foreground">
                Expert legal professionals
              </span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
              <span className="text-muted-foreground">
                Legally compliant notices
              </span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
              <span className="text-muted-foreground">
                Fast turnaround time
              </span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
              <span className="text-muted-foreground">
                Customized to your case
              </span>
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
