"use client";

import { TestimonialsSection } from "@/components/shared/testimonials-section";

export function TrustSignalsSection() {
  const stats = [
    { number: "150+", label: "Clients Served" },
    { number: "₹50L+", label: "Legal Fees Saved" },
    { number: "25+", label: "Expert Lawyers" },
    { number: "4.8/5", label: "Customer Rating" },
  ];

  return (
    <section id="trust-signals" className="bg-muted/30 py-16 md:py-20">
      <div className="container mx-auto px-4">
        {/* Statistics */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            What our clients say about us
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Join hundreds of Indian who trust vakiltech for all their legal
            needs.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <TestimonialsSection
          title="Real Stories from Indian Business Owners"
          subtitle="Hear from entrepreneurs who transformed their legal experience with Vakil-Tech"
          showBadge={false}
          className="my-0"
        />

        {/* Google Reviews Trust Signal */}
        <div className="text-center mt-12 mb-8 px-4">
          <div 
            className="inline-flex flex-col sm:flex-row items-center justify-center gap-4 bg-white/90 backdrop-blur-sm border border-gray-200/50 rounded-2xl px-4 sm:px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-300 max-w-full cursor-pointer"
            onClick={() => {
              window.open('https://www.google.com/search?q=vakil.tech&sca_esv=4e89ca1d2fd0e141&sxsrf=AE3TifNS44juTr7nm6eg2fPK6zWzZ5BmkA%3A1758045013887&source=hp&ei=VaPJaLuONK6G4-EPprasoAI&iflsig=AOw8s4IAAAAAaMmxZZCvtmVKG5viqN1GasnVCZ75cRDX&ved=0ahUKEwj7jLOE7N2PAxUuwzgGHSYbCyQQ4dUDCBo&uact=5&oq=vakil.tech&gs_lp=Egdnd3Mtd2l6Igp2YWtpbC50ZWNoMgoQIxiABBgnGIoFMgQQIxgnMgQQIxgnMgQQABgeMgQQABgeSNUPUABY0Q1wAHgAkAEAmAGrAqABtwyqAQUyLjYuMrgBA8gBAPgBAZgCCqAC1gzCAgsQABiABBiRAhiKBcICCxAuGIAEGNEDGMcBwgIIEC4YgAQYsQPCAggQABiABBixA8ICBRAAGIAEwgILEAAYgAQYsQMYgwHCAgoQABiABBhDGIoFwgIQEC4YgAQYQxjHARiKBRivAcICBRAuGIAEwgIOEAAYgAQYkQIYsQMYigXCAgsQLhiABBjHARivAcICAhAmwgIGEAAYChgemAMAkgcHMi42LjEuMaAHj3eyBwcyLjYuMS4xuAfWDMIHBTAuOC4yyAcZ&sclient=gws-wiz#lrd=0x890462832b1f13d3:0x30e5efc632c5c327,1,,,,', '_blank');
            }}
          >
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

        {/* Trust Badges */}
        <div className="text-center mt-12">
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="text-sm font-semibold text-muted-foreground">
              Bar Council Registered Network Lawyers
            </div>
            <div className="text-sm font-semibold text-muted-foreground">
              Data Protection Compliant
            </div>
            <div className="text-sm font-semibold text-muted-foreground">
              24/7 Legal Support
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
