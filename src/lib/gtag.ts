// Função para disparar evento de conversão do Google Ads
export const trackConversion = () => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'conversion', {
      'send_to': 'AW-17195676557/nJZbCI2d2cobEI3nxIdA',
      'value': 1.0,
      'currency': 'BRL'
    });
  }
};
