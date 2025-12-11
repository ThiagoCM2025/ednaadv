import { Instagram, Mail, Phone, MapPin } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { trackAllConversions } from "@/lib/gtag";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  const isOnHomePage = location.pathname === '/';

  return (
    <footer className="bg-primary text-background py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex flex-col leading-none mb-4">
              <span className="text-3xl font-serif font-bold text-secondary">
                Edna Porto
              </span>
              <span className="text-xs font-sans tracking-wider text-muted/80 mt-1">
                ADVOCACIA IMOBILIÁRIA
              </span>
            </div>
            <p className="text-muted/80 text-sm leading-relaxed">
              Especialista em direito imobiliário com foco em regularização de imóveis e segurança patrimonial.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-bold text-background mb-4">
              Navegação
            </h3>
            <ul className="space-y-2">
              {["sobre", "servicos", "faq", "contato"].map((item) => (
                <li key={item}>
                  {isOnHomePage ? (
                    <button
                      onClick={() => {
                        const element = document.getElementById(item);
                        if (element) element.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="text-muted/80 hover:text-secondary transition-colors text-sm"
                    >
                      {item.charAt(0).toUpperCase() + item.slice(1)}
                    </button>
                  ) : (
                    <Link
                      to={`/?section=${item}`}
                      className="text-muted/80 hover:text-secondary transition-colors text-sm"
                    >
                      {item.charAt(0).toUpperCase() + item.slice(1)}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-heading font-bold text-background mb-4">
              Principais Serviços
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link 
                  to="/servicos/usucapiao"
                  className="text-muted/80 hover:text-secondary transition-colors"
                >
                  Usucapião
                </Link>
              </li>
              <li>
                <Link 
                  to="/servicos/compra-venda"
                  className="text-muted/80 hover:text-secondary transition-colors"
                >
                  Análise de Compra e Venda
                </Link>
              </li>
              <li>
                <Link 
                  to="/servicos/inventario"
                  className="text-muted/80 hover:text-secondary transition-colors"
                >
                  Inventário
                </Link>
              </li>
              <li>
                <Link 
                  to="/servicos/contrato-gaveta"
                  className="text-muted/80 hover:text-secondary transition-colors"
                >
                  Regularização de Contrato de Gaveta
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading font-bold text-background mb-4">
              Contato
            </h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="https://api.whatsapp.com/send/?phone=%2B5571987420684&text&type=phone_number&app_absent=0"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={trackAllConversions}
                  className="flex items-center gap-2 text-muted/80 hover:text-secondary transition-colors text-sm group"
                >
                  <Phone className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  (71) 98742-0684
                </a>
              </li>
              <li className="flex items-center gap-2 text-muted/80 text-sm">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                Salvador e Lauro de Freitas/BA
              </li>
              <li>
                <a 
                  href="https://www.instagram.com/ednaportoadv"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-muted/80 hover:text-secondary transition-colors text-sm group"
                >
                  <Instagram className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  @ednaportoadv
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-background/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted/60">
            <p>
              © {currentYear} Edna Porto Advocacia. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-6">
              <p>
                OAB/BA • Direito Imobiliário e Extrajudicial
              </p>
              <Link 
                to="/login"
                className="text-xs text-muted/40 hover:text-muted/60 transition-colors"
              >
                Admin
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;