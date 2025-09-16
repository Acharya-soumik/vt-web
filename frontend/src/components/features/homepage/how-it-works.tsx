import { SimpleProcess } from "./simple-process";

export function HowItWorksSection() {
  const steps = [
    {
      icon: "₹",
      title: "Raise a Request",
      description: "fill the form and get a lawyer assigned within 3 hrs",
      svgPath: "/4-step-process/pay_advance.svg",
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
          subtitle="Sit back and relax while we handle your legal notice from start to finish"
          steps={steps}
        />

        <div className="text-center mt-12">
          <div className="bg-card border rounded-lg p-6 max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold mb-2 text-foreground">
              Why Choose Our Legal Notice Service?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
              <div className="flex items-center justify-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                <span>24-Hour Delivery</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                <span>Expert Legal Advocates</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                <span>Legally Valid Notices</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
