import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Shield, Clock, FileCheck, Home, Scale, Users } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServiceBreadcrumb from "@/components/services/ServiceBreadcrumb";
import ServiceHero from "@/components/services/ServiceHero";
import ProcessTimeline from "@/components/services/ProcessTimeline";
import ServiceBenefits from "@/components/services/ServiceBenefits";
import ServiceFAQ from "@/components/services/ServiceFAQ";
import ServiceCTA from "@/components/services/ServiceCTA";
import heroImage from "@/assets/service-usucapiao.jpg";

const Usucapiao = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const benefits = [
    {
      icon: Shield,
      title: "Segurança Jurídica",
      description: "Obtenha o título definitivo de propriedade com respaldo legal completo, garantindo seus direitos sobre o imóvel."
    },
    {
      icon: FileCheck,
      title: "Regularização Completa",
      description: "Transforme a posse em propriedade registrada, possibilitando venda, doação e financiamento do imóvel."
    },
    {
      icon: Clock,
      title: "Modalidade Extrajudicial",
      description: "Quando possível, o processo extrajudicial oferece maior agilidade e redução de custos em comparação ao judicial."
    },
    {
      icon: Home,
      title: "Valorização Patrimonial",
      description: "Imóveis regularizados têm maior valor de mercado e facilitam transações comerciais futuras."
    },
    {
      icon: Scale,
      title: "Amparo Legal",
      description: "Processo fundamentado no Código Civil e legislação específica, respeitando todos os requisitos legais."
    },
    {
      icon: Users,
      title: "Tranquilidade Familiar",
      description: "Garanta o patrimônio familiar com documentação regular, permitindo planejamento sucessório adequado."
    }
  ];

  const timeline = [
    {
      title: "Análise Preliminar",
      description: "Avaliação detalhada do caso, verificação dos requisitos legais, análise do tempo de posse e documentação disponível."
    },
    {
      title: "Levantamento Documental",
      description: "Coleta de certidões, comprovantes de posse, testemunhas, plantas, fotos e demais elementos probatórios necessários."
    },
    {
      title: "Escolha da Via Processual",
      description: "Definição entre processo judicial ou extrajudicial conforme viabilidade e características do caso específico."
    },
    {
      title: "Protocolo e Acompanhamento",
      description: "Peticionamento junto ao cartório de imóveis ou poder judiciário, com acompanhamento de todas as etapas processuais."
    },
    {
      title: "Registro da Propriedade",
      description: "Após sentença favorável ou ata notarial, realização do registro da propriedade no cartório de imóveis competente."
    }
  ];

  const faqs = [
    {
      question: "O que é usucapião?",
      answer: "Usucapião é um modo originário de aquisição de propriedade através da posse prolongada, contínua e pacífica de um imóvel, cumprindo os requisitos estabelecidos em lei. É um instrumento jurídico que reconhece o direito de quem exerce a posse com as características legais exigidas."
    },
    {
      question: "Quais são os tipos de usucapião?",
      answer: "Existem diversas modalidades: usucapião extraordinária (15 anos sem justo título, ou 10 anos com moradia ou investimentos produtivos), ordinária (10 anos com justo título e boa-fé), especial urbana (5 anos para imóveis de até 250m²), especial rural (5 anos para área rural de até 50 hectares) e familiar (2 anos para ex-cônjuge). Cada modalidade possui requisitos específicos."
    },
    {
      question: "Quanto tempo é necessário para usucapir um imóvel?",
      answer: "O prazo varia conforme a modalidade: de 2 a 15 anos. O tempo de posse deve ser contínuo, ininterrupto e pacífico, sem oposição do proprietário. A análise do caso específico definirá qual modalidade se aplica e o prazo correspondente."
    },
    {
      question: "É possível fazer usucapião extrajudicial?",
      answer: "Sim, quando há consenso entre as partes interessadas e o imóvel está regular em termos documentais. O processo extrajudicial tramita diretamente no cartório de imóveis, sendo geralmente mais rápido e econômico que o processo judicial."
    },
    {
      question: "Preciso de advogado para fazer usucapião?",
      answer: "Sim, a assistência de advogado é obrigatória tanto no processo judicial quanto no extrajudicial de usucapião. O profissional é essencial para análise correta dos requisitos, elaboração adequada da documentação e acompanhamento processual."
    },
    {
      question: "Quais documentos são necessários?",
      answer: "É necessário apresentar documentos pessoais, comprovantes de posse (contas, correspondências, declarações), planta do imóvel, certidões da matrícula, prova de pagamento de impostos quando houver, fotos do local e rol de testemunhas. A documentação específica varia conforme o caso."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Usucapião - Regularização de Propriedade | Edna Porto Advocacia</title>
        <meta name="description" content="Regularize seu imóvel através de usucapião. Especialista em processos judiciais e extrajudiciais de aquisição de propriedade por posse prolongada. Atendimento em Salvador, Lauro de Freitas e Camaçari." />
        <meta property="og:title" content="Usucapião - Regularização de Propriedade | Edna Porto Advocacia" />
        <meta property="og:description" content="Transforme sua posse em propriedade regularizada com segurança jurídica. Processos de usucapião judicial e extrajudicial." />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="min-h-screen">
        <Header />
        
        <ServiceBreadcrumb serviceName="Usucapião" />
        
        <main>
          <ServiceHero
            title="Usucapião"
            subtitle="Regularização de Propriedade"
            description="Transforme a posse prolongada em propriedade regularizada. Assessoria completa em processos de usucapião judicial e extrajudicial para garantir segurança jurídica ao seu patrimônio."
            image={heroImage}
            imageAlt="Propriedade residencial moderna para processo de usucapião"
          />

          {/* O Que É */}
          <section className="py-20 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-8">
                  O Que É Usucapião?
                </h2>
                <div className="space-y-6 text-muted-foreground leading-relaxed">
                  <p className="text-lg">
                    A usucapião é um instituto jurídico previsto no Código Civil brasileiro que permite a aquisição da propriedade de um bem imóvel através da posse prolongada, contínua, pacífica e incontestada, cumprindo determinados requisitos legais.
                  </p>
                  <p>
                    Trata-se de um modo originário de aquisição de propriedade, fundamentado no princípio da função social da propriedade e na proteção da posse qualificada. A legislação reconhece que aquele que exerce a posse com características específicas e pelo tempo determinado em lei faz jus ao reconhecimento da propriedade.
                  </p>
                  <p>
                    O processo de usucapião pode ser conduzido tanto pela via judicial quanto, em determinadas situações, pela via extrajudicial (diretamente no cartório de registro de imóveis), oferecendo alternativas conforme as particularidades de cada caso.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <ProcessTimeline 
            steps={timeline}
            title="Etapas do Processo de Usucapião"
          />

          <ServiceBenefits benefits={benefits} />

          {/* Quando Procurar */}
          <section className="py-20 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-12 text-center">
                  Quando Buscar Orientação Jurídica
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    "Você possui imóvel há muitos anos sem escritura ou registro",
                    "Comprou imóvel apenas com contrato particular e o vendedor desapareceu",
                    "Ocupa terreno ou casa de forma pacífica há longo período",
                    "Construiu ou investiu em imóvel que não está em seu nome",
                    "Herdou propriedade sem documentação adequada",
                    "Precisa regularizar situação para vender ou financiar o imóvel"
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

          <ServiceCTA serviceName="Usucapião" />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Usucapiao;
