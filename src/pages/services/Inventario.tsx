import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Users, FileText, Clock, Home, Scale, Heart } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServiceBreadcrumb from "@/components/services/ServiceBreadcrumb";
import ServiceHero from "@/components/services/ServiceHero";
import ProcessTimeline from "@/components/services/ProcessTimeline";
import ServiceBenefits from "@/components/services/ServiceBenefits";
import ServiceFAQ from "@/components/services/ServiceFAQ";
import ServiceCTA from "@/components/services/ServiceCTA";
import heroImage from "@/assets/service-inventario.jpg";

const Inventario = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const benefits = [
    {
      icon: Clock,
      title: "Agilidade Extrajudicial",
      description: "Quando viável, o inventário extrajudicial tramita no cartório com maior rapidez, reduzindo significativamente o tempo de conclusão."
    },
    {
      icon: FileText,
      title: "Regularização Patrimonial",
      description: "Formalização legal da transferência de bens aos herdeiros, possibilitando registro, venda e outras transações."
    },
    {
      icon: Users,
      title: "Partilha Organizada",
      description: "Distribuição adequada dos bens conforme legislação sucessória, testamento (se houver) e acordo entre herdeiros."
    },
    {
      icon: Home,
      title: "Proteção do Patrimônio",
      description: "Preservação do patrimônio familiar através de processo adequado, evitando perdas e disputas futuras."
    },
    {
      icon: Scale,
      title: "Conformidade Legal",
      description: "Cumprimento de todas as exigências legais e fiscais do processo sucessório, com segurança jurídica completa."
    },
    {
      icon: Heart,
      title: "Resolução Familiar",
      description: "Condução técnica e respeitosa que busca harmonização entre os herdeiros e conclusão pacífica do processo."
    }
  ];

  const timeline = [
    {
      title: "Análise do Espólio",
      description: "Levantamento completo dos bens, direitos e eventuais dívidas deixadas pelo falecido, identificação dos herdeiros e regime de bens do casal."
    },
    {
      title: "Escolha da Via Processual",
      description: "Definição entre inventário judicial ou extrajudicial conforme requisitos legais: consenso entre herdeiros, capacidade civil plena de todos e existência ou não de testamento."
    },
    {
      title: "Documentação e Certidões",
      description: "Coleta de certidão de óbito, documentos dos herdeiros, certidões de bens imóveis, veículos, contas bancárias, investimentos e demais ativos."
    },
    {
      title: "Cálculo e Recolhimento ITCMD",
      description: "Apuração do valor do espólio, cálculo do imposto de transmissão causa mortis e providências para recolhimento junto à fazenda estadual."
    },
    {
      title: "Formalização da Partilha",
      description: "Lavratura de escritura pública (extrajudicial) ou homologação judicial da partilha, com posterior registro dos bens imóveis no cartório competente."
    }
  ];

  const faqs = [
    {
      question: "O que é inventário?",
      answer: "Inventário é o procedimento legal obrigatório para apuração, avaliação e partilha dos bens, direitos e obrigações deixados por pessoa falecida aos seus herdeiros. Trata-se de processo sucessório que regulariza a transmissão do patrimônio."
    },
    {
      question: "Qual a diferença entre inventário judicial e extrajudicial?",
      answer: "O inventário judicial tramita perante o Poder Judiciário e é obrigatório quando há: herdeiros menores ou incapazes, testamento, ou divergência entre os herdeiros. O extrajudicial é realizado diretamente em cartório quando todos os herdeiros são capazes, concordam com a partilha e não há testamento, sendo geralmente mais rápido e econômico."
    },
    {
      question: "Qual o prazo para fazer inventário?",
      answer: "O prazo legal para abertura de inventário é de 60 dias a partir do falecimento, conforme legislação tributária. O não cumprimento pode acarretar multa calculada sobre o imposto devido (ITCMD). Contudo, o inventário pode ser realizado após esse prazo, com o devido recolhimento da multa."
    },
    {
      question: "É obrigatório ter advogado?",
      answer: "Sim, a assistência de advogado é obrigatória tanto no inventário judicial quanto no extrajudicial. O profissional é responsável pela orientação jurídica, elaboração das peças necessárias, cálculo de impostos e acompanhamento de todo o procedimento."
    },
    {
      question: "Quais documentos são necessários?",
      answer: "Documentação básica inclui: certidão de óbito, documentos de identidade e CPF dos herdeiros e do falecido, certidão de casamento, documentos dos bens (escrituras, matrículas, documentos de veículos), extratos bancários, certidões negativas, e declarações de imposto de renda. Documentação complementar pode ser solicitada conforme o caso."
    },
    {
      question: "Como funciona o pagamento do ITCMD?",
      answer: "O ITCMD (Imposto sobre Transmissão Causa Mortis e Doação) é tributo estadual incidente sobre a transferência dos bens aos herdeiros. A alíquota varia conforme o estado (geralmente entre 4% e 8%). O imposto é calculado sobre o valor dos bens e deve ser recolhido antes da formalização da partilha."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Inventário e Partilha de Bens | Edna Porto Advocacia</title>
        <meta name="description" content="Inventário judicial e extrajudicial. Assessoria completa em sucessão, partilha de bens e regularização patrimonial. Atendimento em Salvador, Lauro de Freitas e Camaçari/BA." />
        <meta property="og:title" content="Inventário e Partilha de Bens | Edna Porto Advocacia" />
        <meta property="og:description" content="Regularize o patrimônio familiar com segurança jurídica. Inventário judicial e extrajudicial com especialista em direito sucessório." />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="min-h-screen">
        <Header />
        
        <ServiceBreadcrumb serviceName="Inventário" />
        
        <main>
          <ServiceHero
            title="Inventário"
            subtitle="Sucessão e Partilha de Bens"
            description="Regularização patrimonial com segurança jurídica. Assessoria especializada em inventário judicial e extrajudicial, garantindo partilha adequada e proteção do patrimônio familiar."
            image={heroImage}
            imageAlt="Documentação legal para inventário e sucessão"
          />

          {/* O Que É */}
          <section className="py-20 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-8">
                  O Que É Inventário?
                </h2>
                <div className="space-y-6 text-muted-foreground leading-relaxed">
                  <p className="text-lg">
                    O inventário é o procedimento legal destinado à apuração dos bens, direitos e obrigações da pessoa falecida (espólio), com posterior partilha entre os herdeiros legítimos ou testamentários, conforme a legislação sucessória brasileira.
                  </p>
                  <p>
                    Este processo é essencial para a regularização da transmissão patrimonial, permitindo que os herdeiros obtenham o domínio legal dos bens herdados, possibilitando sua administração, venda, doação ou qualquer outro ato de disposição.
                  </p>
                  <p>
                    O inventário pode ser realizado judicialmente (perante o Poder Judiciário) ou extrajudicialmente (diretamente no cartório de notas), dependendo das circunstâncias específicas do caso, como a existência de herdeiros menores, testamento ou consenso entre os interessados.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <ProcessTimeline 
            steps={timeline}
            title="Etapas do Processo de Inventário"
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
                    "Após falecimento de familiar que deixou bens ou direitos",
                    "Necessidade de vender ou transferir bens do falecido",
                    "Prazo de abertura do inventário se aproximando",
                    "Dúvidas sobre qual tipo de inventário realizar",
                    "Existência de divergências entre os herdeiros",
                    "Presença de testamento deixado pelo falecido",
                    "Dificuldade em localizar ou avaliar todos os bens",
                    "Necessidade de regularização para financiamento ou venda"
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

          <ServiceCTA serviceName="Inventário" />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Inventario;
