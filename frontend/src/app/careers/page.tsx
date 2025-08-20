import type { Metadata } from "next";
import Image from "next/image";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Users,
  Scale,
  Star,
  Trophy,
  CheckCircle,
  Mail,
  Phone,
  Briefcase,
  Award,
  Heart,
} from "lucide-react";
import { generatePageMetadata } from "@/lib/seo";
import { CareerApplicationForm } from "@/components/features/careers/career-application-form";

export const metadata: Metadata = generatePageMetadata("careers");

export default function CareersPage() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Careers", current: true },
  ];

  const values = [
    {
      icon: <Star className="h-8 w-8" />,
      title: "Excellence Standards",
      description:
        "We maintain the highest standards of legal excellence and client service",
      color: "text-yellow-600",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Expert Team",
      description:
        "Work alongside India's most accomplished legal professionals",
      color: "text-blue-600",
    },
    {
      icon: <Trophy className="h-8 w-8" />,
      title: "Career Growth",
      description:
        "Accelerate your career with challenging cases and mentorship",
      color: "text-green-600",
    },
    {
      icon: <Scale className="h-8 w-8" />,
      title: "Impactful Work",
      description: "Handle significant cases that make a real difference",
      color: "text-purple-600",
    },
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
          <div className="flex flex-col lg:flex-row items-center justify-center gap-12 mb-8">
            <div className="flex-1 lg:text-left">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
                Join Our Elite Legal Team
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl lg:mx-0 mx-auto">
                We&apos;re hiring expert lawyers to work with the best. Join us
                in delivering exceptional legal services and advancing your
                career with India&apos;s leading legal tech platform.
              </p>
            </div>
            <div className="flex-shrink-0">
              <Image
                src="/lawyers.png"
                alt="Professional lawyers team"
                width={400}
                height={300}
                className="rounded-lg shadow-lg"
                priority
              />
            </div>
          </div>
        </section>

        {/* Why Join Us Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
            Why Work With Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-all duration-300"
              >
                <CardHeader>
                  <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <div className={value.color}>{value.icon}</div>
                  </div>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* What We Look For */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <Briefcase className="h-6 w-6 mr-3 text-primary" />
              What We Look For in Expert Lawyers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-foreground mb-4 flex items-center">
                  <Award className="h-5 w-5 mr-2 text-primary" />
                  Professional Excellence
                </h4>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                    Proven track record of successful case outcomes
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                    Strong analytical and research capabilities
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                    Excellent written and oral advocacy skills
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                    Active Bar Council membership in good standing
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-4 flex items-center">
                  <Heart className="h-5 w-5 mr-2 text-primary" />
                  Personal Qualities
                </h4>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                    Commitment to ethical practice and integrity
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                    Client-focused approach and communication skills
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                    Ability to work collaboratively in a team environment
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                    Passion for continuous learning and development
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="bg-muted/30 rounded-lg p-8 mb-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-8 text-foreground">
              Join a Growing Team
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <div className="text-4xl font-bold text-primary mb-2">
                  15000+
                </div>
                <div className="text-muted-foreground">Clients Served</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">
                  ₹2Cr+
                </div>
                <div className="text-muted-foreground">Legal Fees Saved</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">25+</div>
                <div className="text-muted-foreground">Cities Covered</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">
                  4.8/5
                </div>
                <div className="text-muted-foreground">Client Rating</div>
              </div>
            </div>
          </div>
        </div>

        {/* Application Form */}
        <CareerApplicationForm />

        {/* Contact Information */}
        <Card className="mt-8">
          <CardContent className="p-8 text-center">
            <h3 className="text-xl font-semibold text-foreground mb-4">
              Have Questions?
            </h3>
            <p className="text-muted-foreground mb-6">
              For any queries about the application process or our requirements,
              please reach out to our HR team.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <div className="flex items-center justify-center text-muted-foreground">
                <Mail className="h-4 w-4 mr-2" />
                help@vakiltech.com
              </div>
              <div className="flex items-center justify-center text-muted-foreground">
                <Phone className="h-4 w-4 mr-2" />
                +91 98765 43210
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
