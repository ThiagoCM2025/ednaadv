import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { FileWarning, Shield, FileCheck, AlertCircle, Home, Scale } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServiceBreadcrumb from "@/components/services/ServiceBreadcrumb";
import ServiceHero from "@/components/services/ServiceHero";
import ProcessTimeline from "@/components/services/ProcessTimeline";
import ServiceBenefits from "@/components/services/ServiceBenefits";
import ServiceFAQ from "@/components/services/ServiceFAQ";
import ServiceCTA from "@/components/services/ServiceCTA";
import heroImage from "@/assets/service-contrato-gaveta.jpg";

const ContratoGaveta = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const benefits = [
    {
      icon: Shield,
      title: "Segurança Jurídica",
      description: "Transformação do contrato particular em escritura pública registrada, garantindo proteção legal completa ao comprador."
    },
    {
      icon: FileCheck,
      title: "Registro Oficial",
      description: "Obtenção da matrícula do imóvel em nome do comprador, possibilitando todos os direitos inerentes à propriedade formal."
    },
    {
      icon: Home,
      title: "Possibilidade de Transação",
      description: "Com a regularização, o imóvel pode ser vendido, doado, dado em garantia ou transferido legalmente."
    },
    {
      icon: AlertCircle,
      title: "Eliminação de Riscos",
      description: "Resolução definitiva da insegurança jurídica típica dos contratos de gaveta, protegendo o investimento realizado."
    },
    {
      icon: Scale,
      title: "Direito à Adjudicação",
      description: "Possibilidade de compelir o vendedor a outorgar a escritura através de ação judicial de adjudicação compulsória."
    },
    {
      icon: FileWarning,
      title: "Proteção Contra Terceiros",
      description: "Após o registro, o imóvel fica protegido contra reivindicações de terceiros e problemas com o vendedor."
    }
  ];

  const timeline = [
    {
      title: "Análise do Contrato",
      description: "Verificação detalhada do contrato particular, documentação das partes, comprovantes de pagamento e cumprimento das obrigações contratuais."
    },
    {
      title: "Verificação da Matrícula",
      description: "Análise da matrícula do imóvel para confirmar titularidade do vendedor, ausência de ônus e regularidade documental."
    },
    {
      title: "Notificação Extrajudicial",
      description: "Tentativa de regularização amigável através de notificação ao vendedor para comparecimento em cartório e lavratura da escritura."
    },
    {
      title: "Ação de Adjudicação",
      description: "Se necessário, propositura de ação judicial de adjudicação compulsória para suprir a recusa ou ausência do vendedor."
    },
    {
      title: "Escritura e Registro",
      description: "Lavratura da escritura pública de compra e venda (amigável ou por mandado judicial) e registro na matrícula do imóvel."
    }
  ];

  const faqs = [
    {
      question: "O que é contrato de gaveta?",
      answer: "Contrato de gaveta é a denominação popular dada à situação em que alguém compra um imóvel apenas com contrato particular (documento sem fé pública), sem providenciar a escritura pública e o respectivo registro no cartório de imóveis. O comprador fica apenas com a posse, sem a propriedade formalmente reconhecida."
    },
    {
      question: "Quais os riscos de ter um contrato de gaveta?",
      answer: "Os principais riscos incluem: impossibilidade de vender o imóvel legalmente, falta de proteção contra atos do vendedor (como venda dupla ou penhora), dificuldade em comprovar a propriedade, impossibilidade de financiar reformas ou utilizar como garantia, e insegurança jurídica quanto ao domínio do bem."
    },
    {
      question: "Como regularizar um contrato de gaveta?",
      answer: "A regularização pode ocorrer de forma amigável, com o vendedor comparecendo ao cartório para outorgar a escritura, ou judicialmente, através de ação de adjudicação compulsória quando o vendedor se recusa ou está em local incerto. É necessário comprovar o pagamento integral ou a quitação acordada."
    },
    {
      question: "O que é adjudicação compulsória?",
      answer: "Adjudicação compulsória é a ação judicial prevista no Código Civil que permite ao comprador de imóvel obter judicialmente o registro da propriedade quando o vendedor se recusa a outorgar a escritura, desde que comprovado o pagamento e cumprimento das obrigações contratuais."
    },
    {
      question: "Preciso ter pago todo o imóvel?",
      answer: "Sim, para a regularização é necessário comprovar o pagamento integral do valor acordado ou estar em dia com as parcelas conforme o contrato. Eventual saldo devedor deve estar de acordo com o contratado ou ser negociado para quitação antes da formalização."
    },
    {
      question: "Quanto tempo demora o processo?",
      answer: "O prazo varia significativamente: na via amigável (com cooperação do vendedor), pode ser concluído em poucas semanas. Na via judicial, depende da complexidade do caso e do andamento processual, tipicamente entre 6 meses a 2 anos. A tentativa extrajudicial é sempre o primeiro passo recomendado."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Regularização de Contrato de Gaveta | Edna Porto Advocacia</title>
        <meta name="description" content="Regularização de contratos particulares de compra e venda de imóveis. Transforme seu contrato de gaveta em escritura pública registrada. Adjudicação compulsória em Salvador e Lauro de Freitas." />
        <meta property="og:title" content="Regularização de Contrato de Gaveta | Edna Porto Advocacia" />
        <meta property="og:description" content="Proteja seu patrimônio regularizando contratos de gaveta. Assessoria especializada em adjudicação compulsória e escrituração de imóveis." />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="min-h-screen">
        <Header />
        
        <ServiceBreadcrumb serviceName="Regularização de Contrato de Gaveta" />
        
        <main>
          <ServiceHero
            title="Regularização de Contrato de Gaveta"
            subtitle="Segurança Patrimonial"
            description="Transforme seu contrato particular em escritura pública registrada. Assessoria completa para regularização de contratos de gaveta e adjudicação compulsória de imóveis."
            image={heroImage}
            imageAlt="Regularização de contratos particulares de imóveis"
          />

          {/* O Que É */}
          <section className="py-20 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-8">
                  O Que É Contrato de Gaveta?
                </h2>
                <div className="space-y-6 text-muted-foreground leading-relaxed">
                  <p className="text-lg">
                    O contrato de gaveta é uma situação comum no mercado imobiliário brasileiro, caracterizada pela compra de imóvel formalizada apenas por contrato particular, sem a devida escritura pública e registro no cartório de imóveis competente.
                  </p>
                  <p>
                    Nesta situação, embora o comprador tenha pago (total ou parcialmente) e esteja na posse do imóvel, ele não possui a propriedade formalmente reconhecida, pois o bem continua registrado em nome do vendedor ou de terceiros. Isso gera insegurança jurídica significativa e limita os direitos do adquirente.
                  </p>
                  <p>
                    A regularização consiste em transformar esse contrato particular em escritura pública devidamente registrada, transferindo efetivamente a propriedade ao comprador e conferindo segurança jurídica plena à aquisição. Quando o vendedor não coopera, é possível recorrer à ação de adjudicação compulsória.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <ProcessTimeline 
            steps={timeline}
            title="Etapas da Regularização"
          />

          <ServiceBenefits benefits={benefits} title="Por Que Regularizar?" />

          {/* Quando Procurar */}
          <section className="py-20 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-12 text-center">
                  Quando Buscar Regularização
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    "Você possui apenas contrato particular do imóvel",
                    "Pagou o imóvel mas não tem escritura pública",
                    "O vendedor se recusa a fazer a escritura",
                    "Perdeu contato com o vendedor original",
                    "Precisa vender ou financiar o imóvel",
                    "Quer garantir segurança jurídica do patrimônio",
                    "Necessita comprovar propriedade do bem",
                    "Enfrenta problemas com herdeiros do vendedor"
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

          <ServiceCTA serviceName="Regularização de Contrato de Gaveta" />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default ContratoGaveta;
