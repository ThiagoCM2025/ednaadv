import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackAllConversions } from "@/lib/gtag";

interface ServiceHeroProps {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  imageAlt: string;
}

const ServiceHero = ({ title, subtitle, description, image, imageAlt }: ServiceHeroProps) => {
  const whatsappMessage = `Olá! Gostaria de saber mais sobre ${title}.`;
  const whatsappUrl = `https://api.whatsapp.com/send/?phone=%2B5571987420684&text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={image}
          alt={imageAlt}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/50" />
      </div>

      {/* Content */}
      <div className="container relative z-10 px-4 py-20">
        <div className="max-w-3xl">
          <p className="text-secondary font-sans text-sm tracking-widest uppercase mb-4 animate-fade-in">
            {subtitle}
          </p>
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-background mb-4 sm:mb-6 animate-fade-in leading-tight">
            {title}
          </h1>
          <p className="text-background/90 text-base sm:text-lg md:text-xl mb-6 sm:mb-8 leading-relaxed animate-fade-in max-w-2xl">
            {description}
          </p>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={trackAllConversions}>
            <Button 
              size="lg" 
              className="bg-secondary hover:bg-secondary/90 text-background font-semibold group animate-fade-in"
            >
              Fale com a Especialista
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ServiceHero;