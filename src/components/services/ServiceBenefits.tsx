import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface Benefit {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface ServiceBenefitsProps {
  benefits: Benefit[];
  title?: string;
}

const ServiceBenefits = ({ benefits, title = "Benefícios do Serviço" }: ServiceBenefitsProps) => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary text-center mb-16">
          {title}
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <Card 
                key={index} 
                className="border-border/50 hover-lift animate-fade-in bg-card"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6">
                  <div className="w-14 h-14 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                    <Icon className="w-7 h-7 text-accent" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-primary mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServiceBenefits;
