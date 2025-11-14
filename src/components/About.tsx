import { Shield, Scale, Heart, Award } from "lucide-react";
import aboutImage from "@/assets/edna-about.jpg";

const About = () => {
  const qualities = [
    {
      icon: Shield,
      title: "Segurança Jurídica",
      description: "Proteção completa do seu patrimônio com soluções preventivas e eficazes"
    },
    {
      icon: Scale,
      title: "Expertise Comprovada",
      description: "Especialização em direito imobiliário extrajudicial e regularização"
    },
    {
      icon: Heart,
      title: "Atendimento Humanizado",
      description: "Abordagem acolhedora e descomplicada para questões complexas"
    },
    {
      icon: Award,
      title: "Resultados Garantidos",
      description: "Compromisso com a excelência e satisfação do cliente"
    }
  ];

  return (
    <section id="sobre" className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Side */}
          <div className="relative order-2 lg:order-1 animate-fade-in-left">
            <div className="relative rounded-2xl overflow-hidden shadow-elegant hover-lift group">
              <img
                src={aboutImage}
                alt="Dra. Edna Porto - Advogada especialista em direito imobiliário"
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent" />
            </div>
            
            {/* Decorative accent */}
            <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -z-10" />
          </div>

          {/* Content Side */}
          <div className="order-1 lg:order-2 animate-fade-in-right">
            <span className="inline-block px-4 py-2 bg-accent/10 text-accent font-heading font-bold text-sm rounded-full mb-6">
              SOBRE MIM
            </span>
            
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
              Edna Porto
            </h2>
            
            <p className="text-lg text-secondary font-heading font-semibold mb-6">
              Advogada Imobiliarista
            </p>
            
            <p className="text-base text-muted-foreground leading-relaxed mb-6">
              Expert em direito imobiliário extrajudicial e regularização de imóveis, 
              com atuação focada na segurança patrimonial, regularização e prevenção de litígios.
            </p>
            
            <p className="text-base text-muted-foreground leading-relaxed mb-8">
              Com perfil decidido, objetivo e orientado a resultados, ofereço soluções 
              jurídicas que combinam expertise técnica com uma abordagem acolhedora e 
              descomplicada, sempre priorizando a tranquilidade dos meus clientes.
            </p>

            <div className="space-y-6">
              {qualities.map((quality, index) => (
                <div 
                  key={index}
                  className="flex gap-4 p-4 rounded-xl hover:bg-muted/50 transition-all duration-300 group cursor-pointer animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 group-hover:scale-110 transition-all duration-300">
                      <quality.icon className="w-6 h-6 text-accent group-hover:rotate-12 transition-transform" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-foreground mb-1">
                      {quality.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {quality.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
