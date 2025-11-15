import { Button } from "@/components/ui/button";
import { Phone, MessageCircle, Mail, MapPin, Instagram } from "lucide-react";
import contactImage from "@/assets/edna-contact.jpg";

const Contact = () => {
  const whatsappUrl = "https://api.whatsapp.com/send/?phone=%2B5571987420684&text=Olá,%20gostaria%20de%20agendar%20uma%20consulta.&type=phone_number&app_absent=0";

  return (
    <section id="contato" className="py-20 lg:py-32 bg-muted/30 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-secondary/5" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content Side */}
          <div className="animate-fade-in">
            <span className="inline-block px-4 py-2 bg-accent/10 text-accent font-heading font-bold text-sm rounded-full mb-6">
              ENTRE EM CONTATO
            </span>
            
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
              Agende sua{" "}
              <span className="text-secondary">Consulta Inicial</span>
            </h2>
            
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Estou pronta para ouvir seu caso e apresentar as melhores soluções 
              para as questões do seu imóvel. Entre em contato e dê o primeiro passo 
              rumo à regularização do seu patrimônio.
            </p>

            {/* Contact Info */}
            <div className="space-y-6 mb-10">
              <a 
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl hover:bg-background transition-all group"
              >
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent group-hover:scale-110 transition-all">
                  <MessageCircle className="w-6 h-6 text-accent group-hover:text-accent-foreground" />
                </div>
                <div>
                  <p className="font-heading font-bold text-foreground group-hover:text-accent transition-colors">
                    WhatsApp
                  </p>
                  <p className="text-muted-foreground">(71) 98742-0684</p>
                </div>
              </a>

              <a 
                href="tel:5571987420684"
                className="flex items-center gap-4 p-4 rounded-xl hover:bg-background transition-all group"
              >
                <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center group-hover:bg-secondary group-hover:scale-110 transition-all">
                  <Phone className="w-6 h-6 text-secondary group-hover:text-secondary-foreground" />
                </div>
                <div>
                  <p className="font-heading font-bold text-foreground group-hover:text-secondary transition-colors">
                    Telefone
                  </p>
                  <p className="text-muted-foreground">(71) 98742-0684</p>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 rounded-xl">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="font-heading font-bold text-foreground">Atendimento</p>
                  <p className="text-muted-foreground">Salvador, Lauro de Freitas e Camaçari/BA</p>
                </div>
              </div>

              <a 
                href="https://www.instagram.com/ednaportoadv"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl hover:bg-background transition-all group"
              >
                <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-[#f09433] group-hover:via-[#e6683c] group-hover:to-[#bc1888] group-hover:scale-110 transition-all">
                  <Instagram className="w-6 h-6 text-secondary group-hover:text-white" />
                </div>
                <div>
                  <p className="font-heading font-bold text-foreground group-hover:text-[#e6683c] transition-colors">
                    Instagram
                  </p>
                  <p className="text-muted-foreground">@ednaportoadv</p>
                </div>
              </a>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-heading font-bold h-14 px-8 shadow-elegant hover-lift btn-ripple btn-shimmer group"
                onClick={() => window.open(whatsappUrl, '_blank')}
              >
                <MessageCircle className="mr-2 h-5 w-5 group-hover:scale-110 group-hover:rotate-12 transition-transform" />
                Falar no WhatsApp
              </Button>
              
              <Button 
                size="lg" 
                variant="outline"
                className="border-2 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground font-heading font-bold h-14 px-8 btn-pulse group"
                onClick={() => window.open(`tel:5571987420684`)}
              >
                <Phone className="mr-2 h-5 w-5" />
                Ligar Agora
              </Button>
            </div>
          </div>

          {/* Image Side */}
          <div className="relative order-first lg:order-last animate-scale-in">
            <div className="relative rounded-2xl overflow-hidden shadow-elegant">
              <img
                src={contactImage}
                alt="Entre em contato com Dra. Edna Porto"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
            </div>
            
            {/* Decorative accents */}
            <div className="absolute -top-6 -left-6 w-64 h-64 bg-accent/10 rounded-full blur-3xl -z-10" />
            <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
