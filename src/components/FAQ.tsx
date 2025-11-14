import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "Quanto tempo leva para regularizar um imóvel?",
      answer: "O prazo varia conforme a complexidade do caso. Usucapião extrajudicial pode levar de 6 a 12 meses, enquanto regularizações mais simples podem ser concluídas em 2 a 4 meses. Após análise inicial, apresento um cronograma detalhado."
    },
    {
      question: "Quais documentos são necessários para iniciar?",
      answer: "Geralmente são necessários: documentos pessoais (RG, CPF, comprovante de residência), documentação do imóvel (escritura, registro, IPTU), e comprovantes de posse. Cada caso pode exigir documentos específicos que serão solicitados na consulta inicial."
    },
    {
      question: "Como funciona o inventário extrajudicial?",
      answer: "É uma forma mais rápida e econômica de realizar a partilha de bens quando não há menores envolvidos e todos os herdeiros estão de acordo. O processo é feito em cartório, com acompanhamento jurídico, e pode ser concluído em poucos meses."
    },
    {
      question: "Qual a diferença entre usucapião judicial e extrajudicial?",
      answer: "A usucapião extrajudicial é feita em cartório, sendo mais rápida e econômica. A judicial é necessária quando há contestação ou não é possível comprovar os requisitos de forma administrativa. Avalio cada caso para indicar a melhor opção."
    },
    {
      question: "Atende em outras cidades além de Salvador?",
      answer: "Sim! Atendo presencialmente em Salvador, Lauro de Freitas e Camaçari. Para outras localidades da Bahia, avalio a viabilidade de atendimento remoto ou com deslocamento, dependendo da complexidade do caso."
    },
    {
      question: "Quais são as formas de pagamento?",
      answer: "Trabalho com honorários transparentes, que podem ser parcelados conforme o caso. Após a análise inicial, apresento uma proposta detalhada com todas as etapas e custos envolvidos, incluindo taxas e despesas do processo."
    }
  ];

  return (
    <section id="faq" className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <span className="inline-block px-4 py-2 bg-secondary/10 text-secondary font-heading font-bold text-sm rounded-full mb-6">
            DÚVIDAS FREQUENTES
          </span>
          
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
            Perguntas{" "}
            <span className="text-secondary">Mais Comuns</span>
          </h2>
          
          <p className="text-lg text-muted-foreground">
            Esclarecimentos sobre os serviços e processos mais solicitados.
          </p>
        </div>

        <div className="max-w-4xl mx-auto animate-slide-up">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border border-border rounded-xl px-6 bg-background shadow-card hover:shadow-elegant transition-shadow"
              >
                <AccordionTrigger className="text-left font-heading font-bold text-foreground hover:text-secondary hover:no-underline py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
