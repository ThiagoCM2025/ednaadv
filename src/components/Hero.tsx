import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Phone, MessageCircle, Shield, Clock, MapPin } from "lucide-react";
import heroImage from "@/assets/edna-hero.jpg";
import { trackConversion } from "@/lib/gtag";

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);
  const [visibleWords, setVisibleWords] = useState(0);
  const whatsappUrl = "https://api.whatsapp.com/send/?phone=%2B5571987420684&text=Olá,%20gostaria%20de%20saber%20mais%20sobre%20os%20serviços%20de%20advocacia%20imobiliária.&type=phone_number&app_absent=0";

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const words = ["Seu", "Imóvel", "Regularizado", "de", "Forma", "Rápida", "e", "Segura"];
    let currentIndex = 0;
    
    const interval = setInterval(() => {
      if (currentIndex < words.length) {
        setVisibleWords(currentIndex + 1);
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const handleWhatsAppClick = () => {
    trackConversion();
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-primary">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-[center_top_20%] bg-no-repeat opacity-80 transition-transform duration-100 ease-out"
          style={{ 
            backgroundImage: `url(${heroImage})`,
            transform: `translateY(${scrollY * 0.5}px) scale(1.1)`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-accent/60" />
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
            {["Seu", "Imóvel", "Regularizado", "de", "Forma"].map((word, index) => (
              <span
                key={index}
                className={`inline-block mr-3 md:mr-4 transition-all duration-700 ${
                  index < visibleWords
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {word}
              </span>
            ))}
            <br />
            <span
              className={`inline-block mr-3 md:mr-4 text-secondary transition-all duration-700 ${
                visibleWords >= 6 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: "600ms" }}
            >
              Rápida
            </span>
            <span
              className={`inline-block mr-3 md:mr-4 text-secondary transition-all duration-700 ${
                visibleWords >= 7 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: "700ms" }}
            >
              e
            </span>
            <span
              className={`inline-block text-secondary transition-all duration-700 ${
                visibleWords >= 8 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: "800ms" }}
            >
              Segura
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted/90 mb-8 leading-relaxed max-w-2xl">
            Especialista em direito imobiliário e regularização de imóveis. 
            Cuide do seu patrimônio com quem entende, para que você tenha tempo de cuidar do que realmente importa.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg" 
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-heading font-bold text-base h-14 px-8 shadow-elegant hover-lift btn-ripple btn-glow-pulse group"
              onClick={handleWhatsAppClick}
            >
              <MessageCircle className="mr-2 h-5 w-5 group-hover:scale-110 group-hover:rotate-12 transition-transform" />
              Agende sua Consulta
            </Button>
            
            <div className="inline-flex items-center justify-center gap-2 h-14 px-8 rounded-md border-2 border-background text-background font-heading font-bold text-base">
              <Phone className="h-5 w-5" />
              (71) 98742-0684
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-background/20">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl">
              <div className="flex flex-col items-center text-center group animate-fade-in-up">
                <div className="mb-3 p-3 rounded-full bg-secondary/20 border border-secondary/30 group-hover:scale-110 group-hover:bg-secondary/30 transition-all duration-300">
                  <Shield className="h-6 w-6 text-secondary" />
                </div>
                <div className="text-sm font-heading font-semibold text-background">Segurança Jurídica</div>
              </div>
              
              <div className="flex flex-col items-center text-center group animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
                <div className="mb-3 p-3 rounded-full bg-secondary/20 border border-secondary/30 group-hover:scale-110 group-hover:bg-secondary/30 transition-all duration-300">
                  <Clock className="h-6 w-6 text-secondary" />
                </div>
                <div className="text-sm font-heading font-semibold text-background">Resposta Rápida</div>
              </div>
              
              <div className="flex flex-col items-center text-center group animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                <div className="mb-3 p-3 rounded-full bg-secondary/20 border border-secondary/30 group-hover:scale-110 group-hover:bg-secondary/30 transition-all duration-300">
                  <MapPin className="h-6 w-6 text-secondary" />
                </div>
                <div className="text-sm font-heading font-semibold text-background">Salvador e Região</div>
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
