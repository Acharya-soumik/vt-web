"use client";

interface ProcessStep {
  icon: string;
  number: string;
  title: string;
  description: string;
}

interface ProvenProcessProps {
  title?: string;
  steps?: ProcessStep[];
}

const defaultSteps: ProcessStep[] = [
  {
    icon: "📋",
    number: "01",
    title: "Document Review and Legal Consultation",
    description:
      "We analyze your case and review all relevant documents and discuss the legal strategy with you",
  },
  {
    icon: "⚖️",
    number: "02",
    title: "Legal Drafting",
    description:
      "Expert lawyers draft a compelling notice citing relevant laws",
  },
  {
    icon: "📮",
    number: "03",
    title: "Professional Dispatch",
    description: "Notice served via registered post with delivery confirmation",
  },
  {
    icon: "📞",
    number: "04",
    title: "Follow-up Support",
    description: "Guidance on next legal steps and response handling",
  },
];

export function ProvenProcess({
  title = "Our proven process",
  steps = defaultSteps,
}: ProvenProcessProps) {
  return (
    <section className="py-12">
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-foreground text-center">
          {title}
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="relative bg-gradient-to-br from-card to-primary/5 border border-primary/10 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                  {step.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-primary/20 text-primary px-2 py-1 rounded-full text-xs font-bold">
                      {step.number}
                    </span>
                    <h3 className="font-bold text-foreground">{step.title}</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
