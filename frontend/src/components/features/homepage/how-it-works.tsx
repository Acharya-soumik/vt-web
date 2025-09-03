import { SimpleProcess } from "./simple-process";

export function HowItWorksSection() {
  const steps = [
    {
      icon: "👨‍💼",
      title: "Connect & Consult",
      description: "Chat or call with qualified advocate to discuss your case",
      svgPath: "/4-step-process/connect_consult.svg",
    },
    {
      icon: "📝",
      title: "Get Expert Service",
      description:
        "Sit back and relax while our legal team does the heavy lifting",
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
    <section className="bg-muted/30 py-16 md:py-20">
      <div className="container mx-auto px-4">
        <SimpleProcess
          title="Simple 3-Step Process"
          subtitle="Relax while our legal team does the heavy lifting. Our transparent process ensures you know exactly what to expect."
          steps={steps}
        />

        <div className="text-center mt-12">
          <div className="bg-card border rounded-lg p-6 max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold mb-2 text-foreground">
              Why Choose Our Process?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
              <div className="flex items-center justify-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                <span>Transparent Pricing</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                <span>Indian Legal Expertise</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                <span>Real-time Updates</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
