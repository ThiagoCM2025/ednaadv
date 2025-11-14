import { Button } from "@/components/ui/button";
import { Phone, MessageCircle } from "lucide-react";
import heroImage from "@/assets/edna-hero.jpg";

const Hero = () => {
  const whatsappUrl = "https://api.whatsapp.com/send/?phone=%2B5571987420684&text=Olá,%20gostaria%20de%20saber%20mais%20sobre%20os%20serviços%20de%20advocacia%20imobiliária.&type=phone_number&app_absent=0";

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-primary">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-[center_top_30%] bg-no-repeat opacity-50"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-accent/90" />
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 py-20 lg:py-32">
        <div className="max-w-3xl animate-fade-in">
          <div className="mb-6">
            <span className="inline-block px-4 py-2 bg-secondary/20 text-secondary border border-secondary/30 rounded-full text-sm font-heading font-bold tracking-wide">
              DIREITO IMOBILIÁRIO
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-background mb-6 leading-tight">
            Seu Imóvel Regularizado de Forma{" "}
            <span className="text-secondary">Rápida e Segura</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted/90 mb-8 leading-relaxed max-w-2xl">
            Especialista em direito imobiliário e regularização de imóveis. 
            Cuide do seu patrimônio com quem entende, para que você tenha tempo de cuidar do que realmente importa.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg" 
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-heading font-bold text-base h-14 px-8 shadow-elegant group"
              onClick={() => window.open(whatsappUrl, '_blank')}
            >
              <MessageCircle className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              Agende sua Consulta
            </Button>
            
            <div className="inline-flex items-center justify-center gap-2 h-14 px-8 rounded-md border-2 border-background text-background font-heading font-bold text-base">
              <Phone className="h-5 w-5" />
              (71) 98742-0684
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-background/20">
            <div className="grid grid-cols-3 gap-6 md:gap-12">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-serif font-bold text-secondary mb-2">15+</div>
                <div className="text-xs md:text-sm text-muted/80 font-sans">Anos de Experiência</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-serif font-bold text-secondary mb-2">500+</div>
                <div className="text-xs md:text-sm text-muted/80 font-sans">Casos Resolvidos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-serif font-bold text-secondary mb-2">98%</div>
                <div className="text-xs md:text-sm text-muted/80 font-sans">Taxa de Sucesso</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
};

export default Hero;
