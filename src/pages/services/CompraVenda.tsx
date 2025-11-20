import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Search, FileText, ShieldCheck, AlertTriangle, CheckCircle2, Gavel } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServiceBreadcrumb from "@/components/services/ServiceBreadcrumb";
import ServiceHero from "@/components/services/ServiceHero";
import ProcessTimeline from "@/components/services/ProcessTimeline";
import ServiceBenefits from "@/components/services/ServiceBenefits";
import ServiceFAQ from "@/components/services/ServiceFAQ";
import ServiceCTA from "@/components/services/ServiceCTA";
import heroImage from "@/assets/service-compra-venda.jpg";

const CompraVenda = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const benefits = [
    {
      icon: ShieldCheck,
      title: "Segurança Transacional",
      description: "Verificação completa da documentação antes da compra, evitando problemas futuros e garantindo tranquilidade na aquisição."
    },
    {
      icon: Search,
      title: "Due Diligence Completa",
      description: "Análise minuciosa de matrículas, certidões, débitos, restrições e regularidade documental do imóvel e proprietário."
    },
    {
      icon: AlertTriangle,
      title: "Identificação de Riscos",
      description: "Detecção prévia de ônus, gravames, penhoras, hipotecas e outras restrições que possam comprometer a transação."
    },
    {
      icon: FileText,
      title: "Documentação Adequada",
      description: "Orientação sobre todos os documentos necessários para uma compra ou venda segura e juridicamente válida."
    },
    {
      icon: CheckCircle2,
      title: "Validação Jurídica",
      description: "Confirmação da capacidade de compra e venda, verificando legitimidade dos vendedores e regularidade do imóvel."
    },
    {
      icon: Gavel,
      title: "Prevenção de Litígios",
      description: "Análise preventiva que reduz drasticamente riscos de disputas judiciais e problemas pós-aquisição."
    }
  ];

  const timeline = [
    {
      title: "Análise da Matrícula",
      description: "Verificação completa do histórico do imóvel no cartório de registro, incluindo todas as averbações e certidões vinculadas."
    },
    {
      title: "Certidões e Débitos",
      description: "Levantamento de certidões de ônus reais, IPTU, condomínio, certidões pessoais dos proprietários e demais documentos pertinentes."
    },
    {
      title: "Verificação Documental",
      description: "Análise de documentos pessoais dos vendedores, escrituras anteriores, alvarás, habite-se e regularidade junto aos órgãos competentes."
    },
    {
      title: "Avaliação de Riscos",
      description: "Identificação e relatório de eventuais impedimentos, restrições ou riscos que possam comprometer a transação imobiliária."
    },
    {
      title: "Parecer Técnico",
      description: "Emissão de parecer jurídico detalhado com recomendações e orientações para prosseguimento seguro da compra ou venda."
    }
  ];

  const faqs = [
    {
      question: "Por que fazer análise jurídica antes de comprar um imóvel?",
      answer: "A análise jurídica prévia é fundamental para identificar problemas que podem comprometer a aquisição, como débitos ocultos, irregularidades documentais, restrições de uso, pendências judiciais ou questões de titularidade. Essa verificação previne prejuízos financeiros significativos e problemas jurídicos futuros."
    },
    {
      question: "O que é verificado na matrícula do imóvel?",
      answer: "A matrícula é o documento que contém todo o histórico jurídico do imóvel. Verificamos: cadeia dominial (histórico de proprietários), registro de ônus (hipotecas, penhoras), medidas judiciais, averbações de construção, alienações, matrículas antigas vinculadas e regularidade da área e confrontações."
    },
    {
      question: "Quais certidões são necessárias?",
      answer: "Principais certidões incluem: certidão de ônus reais, IPTU atualizado, certidão de débitos condominiais, certidões negativas da justiça federal e estadual dos proprietários, certidão de distribuição cível e criminal, certidão de protesto, além de documentação específica conforme o tipo de imóvel."
    },
    {
      question: "Quanto tempo leva a análise?",
      answer: "O prazo varia conforme a complexidade do imóvel e a documentação disponível, tipicamente entre 7 a 15 dias úteis. Casos mais complexos ou com irregularidades identificadas podem demandar prazo maior para análise aprofundada e solução das questões."
    },
    {
      question: "A análise garante que não haverá problemas?",
      answer: "A análise jurídica reduz significativamente os riscos, mas não pode garantir absolutamente contra vícios ocultos ou situações futuras imprevisíveis. Contudo, uma due diligence completa identifica a imensa maioria dos problemas potenciais, permitindo decisão informada sobre a transação."
    },
    {
      question: "E se forem encontrados problemas?",
      answer: "Quando identificadas irregularidades, apresentamos relatório detalhado com orientações sobre: possibilidade de resolução prévia, impacto na negociação, alternativas contratuais, ajuste de valores ou, em casos graves, recomendação de não prosseguimento da transação."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Análise de Compra e Venda de Imóveis | Edna Porto Advocacia</title>
        <meta name="description" content="Due diligence imobiliária completa. Análise jurídica de imóveis antes da compra, verificação de documentação e certidões. Segurança em transações imobiliárias em Salvador e Lauro de Freitas." />
        <meta property="og:title" content="Análise de Compra e Venda de Imóveis | Edna Porto Advocacia" />
        <meta property="og:description" content="Proteja seu investimento com análise jurídica completa antes de comprar ou vender imóveis. Due diligence imobiliária especializada." />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="min-h-screen">
        <Header />
        
        <ServiceBreadcrumb serviceName="Análise de Compra e Venda" />
        
        <main>
          <ServiceHero
            title="Análise de Compra e Venda"
            subtitle="Due Diligence Imobiliária"
            description="Proteção jurídica completa em transações imobiliárias. Verificação minuciosa de documentação, certidões e regularidade para compra ou venda segura de imóveis."
            image={heroImage}
            imageAlt="Análise de documentação para compra e venda de imóveis"
          />

          {/* O Que É */}
          <section className="py-20 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-8">
                  O Que É Análise de Compra e Venda?
                </h2>
                <div className="space-y-6 text-muted-foreground leading-relaxed">
                  <p className="text-lg">
                    A análise jurídica de compra e venda imobiliária, também conhecida como due diligence imobiliária, é um procedimento técnico de verificação completa da situação legal do imóvel e das partes envolvidas na transação.
                  </p>
                  <p>
                    Este serviço consiste na investigação minuciosa de toda documentação relacionada ao imóvel, incluindo análise de matrícula, certidões, alvarás, regularidade fiscal e documental dos proprietários, além da verificação de eventuais ônus, gravames ou restrições que possam comprometer a transação.
                  </p>
                  <p>
                    O objetivo é identificar preventivamente quaisquer irregularidades, pendências ou riscos jurídicos, permitindo que a decisão de compra ou venda seja tomada com base em informações completas e seguras, evitando prejuízos financeiros e transtornos futuros.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <ProcessTimeline 
            steps={timeline}
            title="Etapas da Análise Jurídica"
          />

          <ServiceBenefits benefits={benefits} title="Por Que Fazer Análise Jurídica?" />

          {/* Quando Procurar */}
          <section className="py-20 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-12 text-center">
                  Quando Solicitar Análise Jurídica
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    "Antes de assinar qualquer compromisso de compra e venda",
                    "Ao receber proposta de compra do seu imóvel",
                    "Quando identificar documentação incompleta ou irregular",
                    "Em transações de imóveis herdados ou antigos",
                    "Antes de financiar a compra de um imóvel",
                    "Quando houver dúvidas sobre regularidade documental",
                    "Em casos de imóveis com múltiplos proprietários",
                    "Para verificar débitos de IPTU ou condomínio"
                  ].map((item, index) => (
                    <div 
                      key={index}
                      className="flex items-start gap-3 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors animate-fade-in"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-background text-sm font-bold">✓</span>
                      </div>
                      <p className="text-foreground">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <ServiceFAQ questions={faqs} />

          <ServiceCTA serviceName="Análise de Compra e Venda" />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default CompraVenda;
