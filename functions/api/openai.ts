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
    const apiKey = (env as any)?.OPENAI_API_KEY;
    if (!apiKey) {
      return jsonResponse(500, { error: 'OPENAI_API_KEY is not set' });
    }

    let body: any;
    try {
      body = await request.json();
    } catch {
      return jsonResponse(400, { error: 'Invalid JSON body' });
    }

    // Security: Enforce model
    const ENFORCED_MODEL = 'gpt-4o-mini';

    // Security: Validate messages array
    const rawMessages = Array.isArray(body?.messages) ? body.messages : null;
    if (!rawMessages) {
      return jsonResponse(400, { error: 'Expected messages array' });
    }

    // Security: Validate message content and structure
    const MAX_CONTENT_LENGTH = 20000;
    const VALID_ROLES = ['system', 'user', 'assistant'];

    for (const msg of rawMessages) {
      if (!msg || typeof msg !== 'object') {
        return jsonResponse(400, { error: 'Invalid message object' });
      }
      if (!msg.role || !VALID_ROLES.includes(msg.role)) {
        return jsonResponse(400, { error: `Invalid role: ${msg.role}` });
      }
      if (typeof msg.content !== 'string') {
        return jsonResponse(400, { error: 'Message content must be a string' });
      }
      if (msg.content.length > MAX_CONTENT_LENGTH) {
        return jsonResponse(400, { error: 'Message content exceeds maximum length' });
      }
    }

    // Security: Limit history to last 50 messages + system prompt
    const MAX_HISTORY = 50;
    let finalMessages = [];

    if (rawMessages.length > 0) {
      const systemMessage = rawMessages[0].role === 'system' ? rawMessages[0] : null;
      const otherMessages = systemMessage ? rawMessages.slice(1) : rawMessages;

      const truncatedMessages = otherMessages.length > MAX_HISTORY
        ? otherMessages.slice(-MAX_HISTORY)
        : otherMessages;

      if (systemMessage) {
        finalMessages = [systemMessage, ...truncatedMessages];
      } else {
        finalMessages = truncatedMessages;
      }
    }

    const temperature = typeof body?.temperature === 'number' ? body.temperature : 0.4;
    const responseFormat = body?.response_format;

    const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: ENFORCED_MODEL,
        messages: finalMessages,
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
      // Security: Don't leak raw upstream errors unless necessary, but here we might need some info.
      // We'll return the message but be careful.
      const errorMessage = data?.error?.message || 'OpenAI request failed';
      return jsonResponse(openaiRes.status, { error: errorMessage });
    }

    if (!data) {
      return jsonResponse(502, { error: 'OpenAI returned a non-JSON response.' });
    }

    const text = data?.choices?.[0]?.message?.content || '';
    return jsonResponse(200, { text });
  } catch (err: any) {
    console.error('OpenAI proxy error:', err);
    return jsonResponse(500, { error: 'Internal Server Error' }); // Generic error
  }
};
