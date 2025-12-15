import { MessageCircle } from "lucide-react";
import { trackAllConversions } from "@/lib/gtag";

const FloatingWhatsApp = () => {
  const whatsappUrl = "https://api.whatsapp.com/send/?phone=%2B5571987420684&text=Olá,%20gostaria%20de%20saber%20mais%20sobre%20os%20serviços%20de%20advocacia%20imobiliária.&type=phone_number&app_absent=0";

  const handleClick = () => {
    trackAllConversions();
    window.open(whatsappUrl, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 sm:w-16 sm:h-16 bg-[#25D366] hover:bg-[#20BD5A] rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 group animate-fade-in"
      aria-label="Contato via WhatsApp"
    >
      <MessageCircle className="w-7 h-7 sm:w-8 sm:h-8 text-white group-hover:rotate-12 transition-transform" />
      
      {/* Pulse effect */}
      <span className="absolute w-full h-full rounded-full bg-[#25D366] animate-ping opacity-30" />
      
      {/* Tooltip - hidden on mobile */}
      <span className="absolute right-full mr-3 px-3 py-2 bg-foreground text-background text-sm font-medium rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden sm:block pointer-events-none">
        Fale conosco
      </span>
    </button>
  );
};

export default FloatingWhatsApp;
