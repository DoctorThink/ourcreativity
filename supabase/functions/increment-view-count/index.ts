
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

/**
 * @openapi
 * /increment-view-count:
 *   post:
 *     summary: Increments the view count for a specific work.
 *     description: A fire-and-forget endpoint to increment the view count of a work by one.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               karya_id:
 *                 type: string
 *                 format: uuid
 *                 description: The ID of the karya to increment the view count for.
 *     responses:
 *       '200':
 *         description: Successfully incremented.
 *       '400':
 *         description: Bad request, karya_id is missing or invalid.
 *       '500':
 *         description: Internal server error.
 */
Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { karya_id } = await req.json();

    if (!karya_id) {
      return new Response(JSON.stringify({ error: 'karya_id is required' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      });
    }

    // Using the Service Role Key to update the view count, bypassing RLS.
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Fetch the current view count to increment it.
    // This is not atomic, but for a view counter, it's an acceptable tradeoff
    // to avoid managing another database function.
    const { data: currentData, error: selectError } = await supabaseAdmin
      .from('karya')
      .select('view_count')
      .eq('id', karya_id)
      .single();

    if (selectError) throw selectError;

    const newViewCount = (currentData?.view_count || 0) + 1;

    const { error: updateError } = await supabaseAdmin
      .from('karya')
      .update({ view_count: newViewCount })
      .eq('id', karya_id);

    if (updateError) throw updateError;

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error('Error incrementing view count:', error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});
