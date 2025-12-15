import { Card, CardContent } from "@/components/ui/card";
import { Quote, Star } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Maria Silva",
      role: "Proprietária de Imóvel",
      content: "A Dra. Edna resolveu um problema que se arrastava há anos com meu imóvel. Profissionalismo excepcional e atendimento humanizado. Recomendo!",
      rating: 5
    },
    {
      name: "João Santos",
      role: "Empresário",
      content: "Processo de usucapião concluído com sucesso em tempo recorde. A clareza na comunicação e a expertise jurídica fizeram toda a diferença.",
      rating: 5
    },
    {
      name: "Ana Paula Oliveira",
      role: "Herdeira",
      content: "O inventário extrajudicial foi muito mais rápido e econômico do que imaginávamos. Gratidão pelo trabalho impecável!",
      rating: 5
    }
  ];

  return (
    <section className="py-20 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <span className="inline-block px-4 py-2 bg-accent/10 text-accent font-heading font-bold text-sm rounded-full mb-6">
            DEPOIMENTOS
          </span>
          
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
            O Que Dizem Meus{" "}
            <span className="text-secondary">Clientes</span>
          </h2>
          
          <p className="text-lg text-muted-foreground">
            A satisfação de quem confia no meu trabalho é minha maior conquista.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index}
              className="border-none shadow-card hover-lift hover-glow bg-background animate-fade-in-up group h-full flex flex-col"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <CardContent className="p-6 sm:p-8 flex-1 flex flex-col">
                <Quote className="w-10 h-10 text-secondary/30 mb-4 group-hover:text-secondary/50 transition-colors" />
                
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-secondary text-secondary" />
                  ))}
                </div>
                
                <p className="text-muted-foreground leading-relaxed mb-6 italic flex-1">
                  "{testimonial.content}"
                </p>
                
                <div className="border-t border-border pt-4 mt-auto">
                  <p className="font-heading font-bold text-foreground">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
