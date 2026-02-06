export const onRequestOptions: PagesFunction = () => {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    }
  });
};

export const onRequestPost: PagesFunction = async ({ request, env }) => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  };

  const jsonResponse = (status: number, payload: Record<string, unknown>) =>
    new Response(JSON.stringify(payload), {
      status,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });

  try {
    const apiKey = env?.OPENAI_API_KEY;
    if (!apiKey) {
      return jsonResponse(500, { error: 'OPENAI_API_KEY is not set' });
    }

    let body: any;
    try {
      body = await request.json();
    } catch {
      return jsonResponse(400, { error: 'Invalid JSON body' });
    }

    const messages = Array.isArray(body?.messages) ? body.messages : null;
    if (!messages) {
      return jsonResponse(400, { error: 'Expected messages array' });
    }

    const temperature = typeof body?.temperature === 'number' ? body.temperature : 0.4;
    const model = typeof body?.model === 'string' && body.model ? body.model : 'gpt-4o-mini';
    const responseFormat = body?.response_format;

    const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model,
        messages,
        temperature,
        ...(responseFormat ? { response_format: responseFormat } : {})
      })
    });

    const rawText = await openaiRes.text();
    let data: any = null;
    if (rawText) {
      try {
        data = JSON.parse(rawText);
      } catch {
        data = null;
      }
    }

    if (!openaiRes.ok) {
      const errorMessage = data?.error?.message || data?.error || rawText || 'OpenAI request failed';
      return jsonResponse(openaiRes.status, { error: errorMessage });
    }

    if (!data) {
      return jsonResponse(502, { error: 'OpenAI returned a non-JSON response.' });
    }

    const text = data?.choices?.[0]?.message?.content || '';
    return jsonResponse(200, { text });
  } catch (err: any) {
    console.error('OpenAI proxy error:', err);
    return jsonResponse(500, { error: err?.message || 'Server error' });
  }
};
