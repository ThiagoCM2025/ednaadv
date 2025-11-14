import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { topic, tone = 'profissional', length = 'médio' } = await req.json();

    console.log('Generating blog post for topic:', topic);

    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY não configurada');
    }

    // Determinar número de palavras baseado no tamanho
    const wordCount = length === 'curto' ? 500 : length === 'longo' ? 1500 : 1000;

    // Prompt otimizado para artigos jurídicos imobiliários
    const systemPrompt = `Você é um especialista em direito imobiliário brasileiro com vasta experiência em advocacia. 
Crie artigos profissionais, bem estruturados, otimizados para SEO e focados em educação do cliente.
Use linguagem técnica mas acessível. Inclua exemplos práticos quando relevante.
Estruture o conteúdo com títulos H2 e H3, parágrafos curtos, listas quando apropriado.`;

    const userPrompt = `Crie um artigo completo e detalhado sobre: "${topic}"

Tom: ${tone}
Tamanho: aproximadamente ${wordCount} palavras

IMPORTANTE: Retorne APENAS um JSON válido (sem markdown, sem \`\`\`json) com esta estrutura exata:
{
  "title": "Título atraente e otimizado para SEO (max 100 caracteres)",
  "content": "Conteúdo em HTML bem formatado com tags <h2>, <h3>, <p>, <ul>, <li>, <strong>, <em>. Use parágrafos curtos e estruture bem o conteúdo.",
  "excerpt": "Resumo envolvente de até 200 caracteres que capture a essência do artigo",
  "metaTitle": "Meta título SEO otimizado (max 60 caracteres)",
  "metaDescription": "Meta descrição SEO com palavra-chave e call-to-action (max 160 caracteres)",
  "category": "Categoria apropriada: Usucapião, Regularização, Inventário, Contratos, ou Consultoria",
  "slug": "slug-otimizado-para-url-sem-acentos"
}

Garanta que o conteúdo HTML seja válido e bem estruturado.`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI Gateway error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Limite de requisições excedido. Tente novamente em alguns instantes.' }), 
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'Créditos insuficientes. Adicione créditos em Settings → Workspace → Usage.' }), 
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      throw new Error(`AI Gateway error: ${response.status}`);
    }

    const data = await response.json();
    const generatedText = data.choices[0].message.content;
    
    console.log('Generated text:', generatedText.substring(0, 200));

    // Parse JSON da resposta, removendo possíveis marcadores de markdown
    let cleanedText = generatedText.trim();
    if (cleanedText.startsWith('```json')) {
      cleanedText = cleanedText.replace(/^```json\n/, '').replace(/\n```$/, '');
    } else if (cleanedText.startsWith('```')) {
      cleanedText = cleanedText.replace(/^```\n/, '').replace(/\n```$/, '');
    }
    
    const articleData = JSON.parse(cleanedText);

    console.log('Article generated successfully:', articleData.title);

    return new Response(JSON.stringify(articleData), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in generate-blog-post function:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Erro ao gerar artigo. Tente novamente.' 
      }), 
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
