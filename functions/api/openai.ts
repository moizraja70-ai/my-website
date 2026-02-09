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

    // --- SECURITY CHECKS START ---

    // 1. Validate 'messages' array
    const messages = Array.isArray(body?.messages) ? body.messages : null;
    if (!messages) {
      return jsonResponse(400, { error: 'Expected messages array' });
    }
    // Limit history length to prevent context stuffing / high token usage
    if (messages.length > 50) {
      return jsonResponse(400, { error: 'Message history too long (max 50)' });
    }

    // 2. Validate 'model' - ONLY allow specific models to prevent abuse of expensive models
    const ALLOWED_MODELS = ['gpt-4o-mini'];
    let model = typeof body?.model === 'string' && body.model ? body.model : 'gpt-4o-mini';

    if (!ALLOWED_MODELS.includes(model)) {
      return jsonResponse(400, { error: `Model not allowed. Allowed: ${ALLOWED_MODELS.join(', ')}` });
    }

    // 3. Clamp 'temperature' to valid range
    let temperature = typeof body?.temperature === 'number' ? body.temperature : 0.4;
    if (temperature < 0) temperature = 0;
    if (temperature > 2) temperature = 2;

    // --- SECURITY CHECKS END ---

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
