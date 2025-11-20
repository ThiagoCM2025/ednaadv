import { MessageCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface ServiceCTAProps {
  title?: string;
  description?: string;
  serviceName: string;
}

const ServiceCTA = ({ 
  title = "Precisa de Assessoria Jurídica Especializada?",
  description = "Entre em contato e receba orientação profissional sobre seu caso.",
  serviceName
}: ServiceCTAProps) => {
  const whatsappMessage = `Olá! Gostaria de agendar uma consulta sobre ${serviceName}.`;
  const whatsappUrl = `https://api.whatsapp.com/send/?phone=%2B5571987420684&text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <Card className="max-w-4xl mx-auto bg-gradient-to-br from-accent to-accent/80 border-none shadow-elegant overflow-hidden">
          <CardContent className="p-8 md:p-12 relative">
            {/* Decorative Element */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -z-0" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-background/20 flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-background" />
                </div>
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-background">
                  {title}
                </h2>
              </div>
              
              <p className="text-background/90 text-lg mb-8 max-w-2xl leading-relaxed">
                {description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <Button 
                    size="lg" 
                    className="bg-secondary hover:bg-secondary/90 text-background font-semibold group w-full sm:w-auto"
                  >
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Falar no WhatsApp
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </a>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => {
                    const element = document.getElementById('contato');
                    if (element) element.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="bg-background/10 border-background/30 text-background hover:bg-background/20 backdrop-blur-sm w-full sm:w-auto"
                >
                  Enviar Mensagem
                </Button>
              </div>

              <div className="mt-8 pt-8 border-t border-background/20">
                <p className="text-background/70 text-sm">
                  <strong className="text-background">OAB/BA</strong> • Especialista em Direito Imobiliário e Extrajudicial
                </p>
                <p className="text-background/70 text-sm mt-2">
                  Atendimento em Salvador e Lauro de Freitas
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ServiceCTA;
