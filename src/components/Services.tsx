import { FileText, Home, Users, Gavel, ClipboardCheck, Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const Services = () => {
  const { elementRef: headerRef, isVisible: headerVisible } = useScrollReveal();
  const { elementRef: cardsRef, isVisible: cardsVisible } = useScrollReveal();
  const services = [
    {
      icon: Home,
      title: "Usucapião",
      description: "Processo para regularizar a posse do seu imóvel com segurança jurídica e agilidade."
    },
    {
      icon: FileText,
      title: "Regularização de Imóveis",
      description: "Documentação e legalização completa do seu patrimônio imobiliário."
    },
    {
      icon: Users,
      title: "Inventário Extrajudicial",
      description: "Solução rápida e econômica para partilha de bens sem necessidade de processo judicial."
    },
    {
      icon: ClipboardCheck,
      title: "Escrituras e Contratos",
      description: "Elaboração e análise de contratos de compra, venda e locação de imóveis."
    },
    {
      icon: Gavel,
      title: "Ações Imobiliárias",
      description: "Representação judicial em disputas de propriedade e questões imobiliárias."
    },
    {
      icon: Shield,
      title: "Consultoria Preventiva",
      description: "Orientação jurídica para evitar problemas futuros com seu imóvel."
    }
  ];

  return (
    <section id="servicos" className="py-20 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <div 
          ref={headerRef}
          className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-1000 ${
            headerVisible 
              ? "opacity-100 translate-y-0" 
              : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-block px-4 py-2 bg-accent/10 text-accent font-heading font-bold text-sm rounded-full mb-6">
            SERVIÇOS
          </span>
          
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
            Soluções Completas em{" "}
            <span className="text-secondary">Direito Imobiliário</span>
          </h2>
          
          <p className="text-lg text-muted-foreground">
            Atendimento especializado para todas as suas necessidades imobiliárias, 
            com foco em resultados e tranquilidade.
          </p>
        </div>

        <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <Card 
              key={index}
              className={`border-none shadow-card hover-lift bg-background group cursor-pointer transition-all duration-700 ${
                cardsVisible 
                  ? "opacity-100 scale-100" 
                  : "opacity-0 scale-95"
              }`}
              style={{ 
                transitionDelay: cardsVisible ? `${index * 100}ms` : '0ms'
              }}
            >
              <CardContent className="p-8">
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent group-hover:scale-110 transition-all duration-300 icon-bounce">
                  <service.icon className="w-7 h-7 text-accent group-hover:text-accent-foreground transition-colors" />
                </div>
                
                <h3 className="text-xl font-heading font-bold text-foreground mb-3">
                  {service.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-2">
            <span className="font-heading font-bold text-foreground">Atendimento em:</span>
          </p>
          <p className="text-lg text-secondary font-heading font-semibold">
            Salvador • Lauro de Freitas • Camaçari/BA
          </p>
        </div>
      </div>
    </section>
  );
};

export default Services;
