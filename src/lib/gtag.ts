// Função para disparar eventos de conversão do Google Ads
export const trackConversion = () => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    // Conversão 1: Contato leads (original)
    (window as any).gtag('event', 'conversion', {
      'send_to': 'AW-17195676557/nJZbCI2d2cobEI3nxIdA',
      'value': 1.0,
      'currency': 'BRL'
    });
    
    // Conversão 2: Contato (nova)
    (window as any).gtag('event', 'conversion', {
      'send_to': 'AW-17195676557/-YxcCJu1r8sbEI3nxIdA',
      'value': 1.0,
      'currency': 'BRL'
    });
  }
};

// Conversão de Visualização de página (cliques em CTAs)
export const trackPageViewConversion = () => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'conversion', {
      'send_to': 'AW-17195676557/Q0clCIXt9c8bEI3nxIdA'
    });
  }
};

// Função combinada que dispara todas as conversões
export const trackAllConversions = () => {
  trackConversion();
  trackPageViewConversion();
};
