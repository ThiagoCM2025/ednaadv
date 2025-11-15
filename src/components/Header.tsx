import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MessageCircle, Menu, X } from "lucide-react";
import logoBranco from "@/assets/logo-branco.png";
import logoDourado from "@/assets/logo-dourado.png";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  const isOnBlogPage = location.pathname.startsWith('/blog');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  const whatsappUrl = "https://api.whatsapp.com/send/?phone=%2B5571987420684&text=Olá,%20gostaria%20de%20saber%20mais%20sobre%20os%20serviços.&type=phone_number&app_absent=0";

  const navItems = [
    { label: "Sobre", href: "sobre" },
    { label: "Serviços", href: "servicos" },
    { label: "Blog", href: "/blog", isLink: true },
    { label: "FAQ", href: "faq" },
    { label: "Contato", href: "contato" },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        isScrolled 
          ? "bg-background/80 backdrop-blur-xl shadow-elegant border-b border-border/50" 
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button 
            onClick={() => {
              if (isOnBlogPage) {
                navigate('/');
              } else {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            className="flex items-center group"
          >
            <img 
              src={isScrolled ? logoDourado : logoBranco}
              alt="Edna Porto - Advocacia Imobiliária"
              className="h-10 md:h-14 w-auto transition-opacity duration-500 hover:opacity-90"
            />
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              item.isLink ? (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`font-sans font-medium transition-colors hover:text-secondary ${
                    isScrolled ? "text-foreground" : "text-background"
                  }`}
                >
                  {item.label}
                </Link>
              ) : isOnBlogPage ? (
                <Link
                  key={item.href}
                  to={`/?section=${item.href}`}
                  className={`font-sans font-medium transition-colors hover:text-secondary ${
                    isScrolled ? "text-foreground" : "text-background"
                  }`}
                >
                  {item.label}
                </Link>
              ) : (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className={`font-sans font-medium transition-colors hover:text-secondary ${
                    isScrolled ? "text-foreground" : "text-background"
                  }`}
                >
                  {item.label}
                </button>
              )
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Button 
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-heading font-bold"
              onClick={() => window.open(whatsappUrl, '_blank')}
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              Agendar Consulta
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-muted/20 transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className={`h-6 w-6 ${isScrolled ? "text-foreground" : "text-background"}`} />
            ) : (
              <Menu className={`h-6 w-6 ${isScrolled ? "text-foreground" : "text-background"}`} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-background border-t border-border animate-fade-in">
          <nav className="container mx-auto px-4 py-6 flex flex-col gap-4">
            {navItems.map((item) => (
              item.isLink ? (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-foreground font-medium hover:text-secondary transition-colors py-2"
                >
                  {item.label}
                </Link>
              ) : isOnBlogPage ? (
                <Link
                  key={item.href}
                  to={`/?section=${item.href}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-left font-sans font-medium text-foreground hover:text-secondary transition-colors py-2"
                >
                  {item.label}
                </Link>
              ) : (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className="text-left font-sans font-medium text-foreground hover:text-secondary transition-colors py-2"
                >
                  {item.label}
                </button>
              )
            ))}
            <Button 
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-heading font-bold mt-2"
              onClick={() => {
                window.open(whatsappUrl, '_blank');
                setIsMobileMenuOpen(false);
              }}
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              Agendar Consulta
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
