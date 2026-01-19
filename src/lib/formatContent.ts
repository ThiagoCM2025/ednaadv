/**
 * Utilitário para formatar conteúdo HTML de artigos do blog
 * Garante consistência visual e estrutural em todos os artigos
 */

export function formatBlogContent(html: string): string {
  if (!html || typeof html !== 'string') return '';

  let content = html;

  // 1. Remover espaços em branco extras e normalizar quebras de linha
  content = content.replace(/\n\s*\n/g, '\n');
  content = content.replace(/>\s+</g, '><');

  // 2. Remover tags vazias (exceto br)
  content = content.replace(/<p>\s*<\/p>/gi, '');
  content = content.replace(/<p><br\s*\/?><\/p>/gi, '');
  content = content.replace(/<h[2-4]>\s*<\/h[2-4]>/gi, '');
  content = content.replace(/<li>\s*<\/li>/gi, '');
  content = content.replace(/<ul>\s*<\/ul>/gi, '');
  content = content.replace(/<ol>\s*<\/ol>/gi, '');

  // 3. Remover múltiplos <br> seguidos
  content = content.replace(/(<br\s*\/?>\s*){2,}/gi, '<br>');

  // 4. Remover estilos inline desnecessários
  content = content.replace(/\s*style="[^"]*"/gi, '');

  // 5. Garantir estrutura de headings correta (converter H1 para H2)
  content = content.replace(/<h1([^>]*)>/gi, '<h2$1>');
  content = content.replace(/<\/h1>/gi, '</h2>');

  // 6. Limpar classes inline desnecessárias (manter apenas classes essenciais)
  content = content.replace(/\s*class="[^"]*"/gi, '');

  // 7. Garantir que parágrafos tenham estrutura correta
  // Dividir parágrafos muito longos (mais de 400 caracteres)
  content = content.replace(/<p>([^<]{400,})<\/p>/gi, (match, text) => {
    const sentences = text.match(/[^.!?]+[.!?]+/g);
    if (sentences && sentences.length > 4) {
      const midpoint = Math.ceil(sentences.length / 2);
      const firstHalf = sentences.slice(0, midpoint).join('');
      const secondHalf = sentences.slice(midpoint).join('');
      return `<p>${firstHalf.trim()}</p><p>${secondHalf.trim()}</p>`;
    }
    return match;
  });

  // 8. Adicionar espaçamento adequado após headings
  content = content.replace(/<\/h2>(?!<p>)/gi, '</h2>');
  content = content.replace(/<\/h3>(?!<p>)/gi, '</h3>');

  // 9. Normalizar listas - garantir estrutura correta
  content = content.replace(/<ul>(\s*<li>)/gi, '<ul>$1');
  content = content.replace(/<ol>(\s*<li>)/gi, '<ol>$1');

  // 10. Remover &nbsp; desnecessários
  content = content.replace(/&nbsp;/gi, ' ');
  content = content.replace(/\s{2,}/g, ' ');

  // 11. Formatar destaques - garantir que strong/em estejam corretos
  content = content.replace(/<b>/gi, '<strong>');
  content = content.replace(/<\/b>/gi, '</strong>');
  content = content.replace(/<i>/gi, '<em>');
  content = content.replace(/<\/i>/gi, '</em>');

  // 12. Garantir que blockquotes tenham estrutura correta
  content = content.replace(/<blockquote>([^<]*)<\/blockquote>/gi, '<blockquote><p>$1</p></blockquote>');

  // 13. Limpar tags de formatação vazias
  content = content.replace(/<strong>\s*<\/strong>/gi, '');
  content = content.replace(/<em>\s*<\/em>/gi, '');

  // 14. Remover atributos desnecessários (mas preservar data-callout)
  content = content.replace(/\s*(id|name)="[^"]*"/gi, '');

  // 15. Trim final
  content = content.trim();

  return content;
}

/**
 * Verifica se o conteúdo precisa de formatação
 */
export function needsFormatting(html: string): boolean {
  if (!html) return false;

  // Verificar indicadores de formatação necessária
  const indicators = [
    /<p>\s*<\/p>/i,           // Parágrafos vazios
    /style="/i,               // Estilos inline
    /<h1>/i,                  // H1 (deveria ser H2)
    /(<br\s*\/?>\s*){2,}/i,   // Múltiplos BR
    /&nbsp;/i,                // NBSPs
    /<b>/i,                   // Tags antigas
    /<i>/i,                   // Tags antigas
  ];

  return indicators.some(pattern => pattern.test(html));
}
