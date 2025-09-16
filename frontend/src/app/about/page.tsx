import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Shield, Zap, Heart } from "lucide-react";
import { AboutCTA } from "@/components/features/about/about-cta";
import { generatePageMetadata } from "@/lib/seo";
import Image from "next/image";

export const metadata: Metadata = generatePageMetadata("about");

export default function AboutPage() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "About", current: true },
  ];

  const values = [
    {
      icon: <Target className="h-8 w-8" />,
      title: "Results-Driven",
      description:
        "We focus on outcomes that matter to you; the vakiltech way.",
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Trust & Transparency",
      description:
        "Complete transparency in pricing and processes, building trust with every interaction.",
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Innovation",
      description:
        "Modern legal solutions that leverage technology while maintaining traditional expertise.",
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Client-Centric",
      description:
        "We truely understand your problems and your success is our priority.",
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
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            About vakiltech
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We&apos;re on a mission to make professional legal services
            accessible, affordable, and effective for individual and businesses
            in India. No more legal complexity.
          </p>
        </section>

        {/* Our Values */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
            Our Values
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-all duration-300"
              >
                <CardHeader>
                  <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <div className="text-primary">{value.icon}</div>
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

        {/* Stats */}
        <section className="bg-muted/30 rounded-lg p-8 mb-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-8 text-foreground">
              Our Impact
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
                <div className="text-muted-foreground">Avg Customer Rating</div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="mb-16 bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl font-bold text-center mb-8 text-foreground">
            Vakiltech in Action ⚡️
          </h2>
          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* WhatsApp Chat Testimonial */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-primary/30 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
              <Card className="relative overflow-hidden border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-0">
                  <div className="bg-gradient-to-r from-green-500 to-green-600 p-4">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.690" />
                      </svg>
                      Client Success Story
                    </h3>
                  </div>
                  <div className="p-6">
                    <div className="relative">
                      <Image
                        src="/about-us/whatsapp-chat-testomonial.webp"
                        alt="Client praising vakiltech services via WhatsApp chat"
                        width={500}
                        height={600}
                        className="w-full h-auto max-h-[500px] object-contain rounded-lg shadow-inner"
                        priority
                      />
                    </div>
                    <div className="mt-4 p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                      <p className="text-green-800 font-medium text-sm">
                        ✓ Landlord refunded ₹17,000 | ✓ Case settled
                        successfully | ✓ Client satisfied and referring others
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Court Work Image */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-primary/30 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
              <Card className="relative overflow-hidden border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-0">
                  <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        />
                      </svg>
                      Our Legal Expertise
                    </h3>
                  </div>
                  <div className="p-6">
                    <div className="relative overflow-hidden rounded-lg">
                      <Image
                        src="/about-us/court-work.webp"
                        alt="Professional lawyer working in court representing clients"
                        width={500}
                        height={400}
                        className="w-full h-[400px] object-cover transition-transform duration-500 group-hover:scale-105"
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                      <p className="text-blue-800 font-medium text-sm mb-2">
                        Experienced Legal Representation
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                          25+ Cities
                        </span>
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                          Court Expertise
                        </span>
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                          Real Results
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Google Reviews Trust Signal */}
          <div className="mt-8 text-center px-4">
            <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-4 bg-white/90 backdrop-blur-sm border border-gray-200/50 rounded-2xl px-4 sm:px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-300 max-w-full">
              <div className="flex items-center gap-3 min-w-0">
                <svg
                  className="w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#4285f4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34a853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#fbbc05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#ea4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <div className="text-left min-w-0">
                  <div className="flex items-center gap-1 text-yellow-500">
                    <span className="text-xl sm:text-2xl font-bold text-gray-900">
                      4.7
                    </span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 sm:w-5 sm:h-5 ${
                            i < 4
                              ? "text-yellow-400"
                              : i === 4
                              ? "text-yellow-300"
                              : "text-gray-300"
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 font-medium whitespace-nowrap">
                    Google Reviews
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <AboutCTA />
      </div>
    </div>
  );
}
