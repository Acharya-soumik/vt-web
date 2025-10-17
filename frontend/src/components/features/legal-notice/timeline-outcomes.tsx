"use client";

interface TimelineStep {
  label: string;
  value: string;
}

interface TimelineOutcomesProps {
  title?: string;
  steps?: TimelineStep[];
}

const defaultSteps: TimelineStep[] = [
  { label: "Document Review", value: "Same day" },
  { label: "Notice Drafting", value: "24-48 hours" },
  { label: "Dispatch & Delivery", value: "2-3 days" },
  { label: "Response Period", value: "15-30 days" },
];

export function TimelineOutcomes({
  title = "Timeline & Expected Outcomes",
  steps = defaultSteps,
}: TimelineOutcomesProps) {
  return (
    <section className="py-12">
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-foreground text-center">
          {title}
        </h2>
        <div className="grid md:grid-cols-4 gap-4">
          {steps.map((timeline, index) => (
            <div key={timeline.label} className="relative">
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3 text-primary font-bold">
                  {index + 1}
                </div>
                <div className="text-sm text-muted-foreground mb-1">
                  {timeline.label}
                </div>
                <div className="font-bold text-lg text-primary">
                  {timeline.value}
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-2 w-4 h-0.5 bg-primary/30" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
