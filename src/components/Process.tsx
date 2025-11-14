import { MessageCircle, FileSearch, FileCheck, CheckCircle } from "lucide-react";

const Process = () => {
  const steps = [
    {
      icon: MessageCircle,
      number: "01",
      title: "Consulta Inicial",
      description: "Entre em contato para uma análise preliminar do seu caso, sem compromisso."
    },
    {
      icon: FileSearch,
      number: "02",
      title: "Análise Detalhada",
      description: "Avaliação completa da documentação e situação jurídica do seu imóvel."
    },
    {
      icon: FileCheck,
      number: "03",
      title: "Plano de Ação",
      description: "Apresentação de estratégia personalizada com prazos e custos transparentes."
    },
    {
      icon: CheckCircle,
      number: "04",
      title: "Execução e Resultado",
      description: "Acompanhamento de todas as etapas até a regularização completa."
    }
  ];

  return (
    <section className="py-20 lg:py-32 bg-background relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <span className="inline-block px-4 py-2 bg-secondary/10 text-secondary font-heading font-bold text-sm rounded-full mb-6">
            COMO FUNCIONA
          </span>
          
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
            Um Processo{" "}
            <span className="text-secondary">Simples e Transparente</span>
          </h2>
          
          <p className="text-lg text-muted-foreground">
            Do primeiro contato à regularização completa, cada etapa é conduzida 
            com clareza e profissionalismo.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="relative animate-fade-in-up group"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Connecting line (hidden on mobile, visible on lg+) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-[60%] w-full h-0.5 bg-gradient-to-r from-accent/40 to-secondary/40" />
              )}
              
              <div className="relative bg-background rounded-2xl p-8 shadow-card hover-lift border border-border/50 cursor-pointer">
                {/* Number badge */}
                <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-secondary text-secondary-foreground font-heading font-bold text-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  {step.number}
                </div>
                
                <div className="w-16 h-16 rounded-xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent group-hover:scale-110 transition-all duration-300 icon-bounce">
                  <step.icon className="w-8 h-8 text-accent group-hover:text-accent-foreground transition-colors" />
                </div>
                
                <h3 className="text-xl font-heading font-bold text-foreground mb-3">
                  {step.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-4 bg-accent/10 rounded-full">
            <CheckCircle className="w-5 h-5 text-accent" />
            <span className="text-foreground font-heading font-semibold">
              Acompanhamento em todas as etapas do processo
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
