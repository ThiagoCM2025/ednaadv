import { CheckCircle2 } from "lucide-react";

interface TimelineStep {
  title: string;
  description: string;
}

interface ProcessTimelineProps {
  steps: TimelineStep[];
  title?: string;
}

const ProcessTimeline = ({ steps, title = "Como Funciona o Processo" }: ProcessTimelineProps) => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary text-center mb-16">
          {title}
        </h2>
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-accent/20 hidden md:block" />
            
            {steps.map((step, index) => (
              <div 
                key={index} 
                className="relative flex gap-6 mb-12 last:mb-0 group animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Number Circle */}
                <div className="relative flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-background font-bold text-lg shadow-elegant z-10 group-hover:scale-110 transition-transform">
                    {index + 1}
                  </div>
                  <CheckCircle2 className="absolute -right-1 -top-1 w-5 h-5 text-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Content */}
                <div className="flex-1 pb-8 pt-2">
                  <h3 className="font-heading text-xl font-bold text-primary mb-3">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessTimeline;
