import { MessageCircle } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { trackAllConversions } from "@/lib/gtag";

const FloatingWhatsApp = () => {
  const location = useLocation();
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  
  const shouldHide = location.pathname.startsWith('/dashboard') || location.pathname === '/login';

  // Observar quando o rodapé entra na tela para esconder o botão
  useEffect(() => {
    if (shouldHide) return;
    
    const footer = document.getElementById('site-footer');
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFooterVisible(entry.isIntersecting);
      },
      {
        rootMargin: '0px 0px 100px 0px',
        threshold: 0.01
      }
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, [location.pathname, shouldHide]);

  // Ocultar no dashboard e login
  if (shouldHide) {
    return null;
  }
  
  const whatsappUrl = "https://api.whatsapp.com/send/?phone=%2B5571987420684&text=Olá,%20gostaria%20de%20saber%20mais%20sobre%20os%20serviços%20de%20advocacia%20imobiliária.&type=phone_number&app_absent=0";

  const handleClick = () => {
    trackAllConversions();
    window.open(whatsappUrl, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className={`fixed bottom-6 right-6 z-50 w-12 h-12 sm:w-14 sm:h-14 bg-[#25D366] hover:bg-[#20BD5A] rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 group animate-fade-in ${
        isFooterVisible ? 'opacity-0 pointer-events-none translate-y-4' : 'opacity-100 translate-y-0'
      }`}
      aria-label="Contato via WhatsApp"
    >
      <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 text-white group-hover:rotate-12 transition-transform" />
      
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
