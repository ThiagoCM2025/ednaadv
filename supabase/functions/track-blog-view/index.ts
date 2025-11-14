import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { post_id } = await req.json()
    
    if (!post_id) {
      throw new Error('post_id is required')
    }

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    )

    const userAgent = req.headers.get('user-agent') || ''
    const referrer = req.headers.get('referer') || ''

    console.log('Tracking view for post:', post_id)

    const { error } = await supabaseClient
      .from('blog_views')
      .insert({
        post_id,
        user_agent: userAgent,
        referrer: referrer,
      })

    if (error) {
      console.error('Error tracking view:', error)
      throw error
    }

    console.log('View tracked successfully')

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error in track-blog-view function:', error)
    const message = error instanceof Error ? error.message : 'Unknown error'
    return new Response(
      JSON.stringify({ error: message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
    )
  }
})
