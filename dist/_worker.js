// Cloudflare Pages Advanced Mode worker
// Serves static assets and handles /api/openai without requiring the functions/ directory.

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization'
};

const jsonResponse = (status, payload) =>
  new Response(JSON.stringify(payload), {
    status,
    headers: { 'Content-Type': 'application/json', ...corsHeaders }
  });

const handleOpenAI = async (request, env) => {
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  if (request.method !== 'POST') {
    return jsonResponse(405, { error: 'Method Not Allowed' });
  }

  const apiKey = env && env.OPENAI_API_KEY;
  if (!apiKey) {
    return jsonResponse(500, { error: 'OPENAI_API_KEY is not set' });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse(400, { error: 'Invalid JSON body' });
  }

  const messages = Array.isArray(body && body.messages) ? body.messages : null;
  if (!messages) {
    return jsonResponse(400, { error: 'Expected messages array' });
  }

  const temperature = typeof body.temperature === 'number' ? body.temperature : 0.4;
  const model = typeof body.model === 'string' && body.model ? body.model : 'gpt-4o-mini';
  const responseFormat = body.response_format;

  let openaiRes;
  try {
    openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
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
  } catch (err) {
    return jsonResponse(502, { error: 'OpenAI request failed' });
  }

  const rawText = await openaiRes.text();
  let data = null;
  if (rawText) {
    try {
      data = JSON.parse(rawText);
    } catch {
      data = null;
    }
  }

  if (!openaiRes.ok) {
    const errorMessage = (data && data.error && (data.error.message || data.error)) || rawText || 'OpenAI request failed';
    return jsonResponse(openaiRes.status, { error: errorMessage });
  }

  if (!data) {
    return jsonResponse(502, { error: 'OpenAI returned a non-JSON response.' });
  }

  const text = (data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) || '';
  return jsonResponse(200, { text });
};

const handleAdminDeleteUser = async (request, env) => {
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  if (request.method !== 'POST') {
    return jsonResponse(405, { error: 'Method Not Allowed' });
  }

  const supabaseUrl = (env && (env.SUPABASE_URL || env.VITE_SUPABASE_URL)) || '';
  const supabaseAnonKey = (env && (env.SUPABASE_ANON_KEY || env.VITE_SUPABASE_ANON_KEY)) || '';
  const serviceRoleKey = (env && env.SUPABASE_SERVICE_ROLE_KEY) || '';

  if (!supabaseUrl || !supabaseAnonKey || !serviceRoleKey) {
    return jsonResponse(500, { error: 'Missing Supabase environment variables.' });
  }

  const authHeader = request.headers.get('Authorization') || '';
  if (!authHeader.startsWith('Bearer ')) {
    return jsonResponse(401, { error: 'Missing Authorization header.' });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse(400, { error: 'Invalid JSON body.' });
  }

  const userId = typeof body && typeof body.userId === 'string' ? body.userId : '';
  if (!userId) {
    return jsonResponse(400, { error: 'Missing userId.' });
  }

  const meRes = await fetch(`${supabaseUrl}/auth/v1/user`, {
    headers: {
      'Content-Type': 'application/json',
      'apikey': supabaseAnonKey,
      'Authorization': authHeader
    }
  });

  if (!meRes.ok) {
    return jsonResponse(401, { error: 'Unauthorized.' });
  }

  const me = await meRes.json();
  const callerId = me && me.id;
  if (!callerId) {
    return jsonResponse(401, { error: 'Unauthorized.' });
  }

  const profileRes = await fetch(`${supabaseUrl}/rest/v1/profiles?id=eq.${callerId}&select=role`, {
    headers: {
      'Content-Type': 'application/json',
      'apikey': supabaseAnonKey,
      'Authorization': authHeader
    }
  });

  if (!profileRes.ok) {
    return jsonResponse(403, { error: 'Forbidden. Admins only.' });
  }

  const profileData = await profileRes.json();
  const role = Array.isArray(profileData) ? (profileData[0] && profileData[0].role) : profileData && profileData.role;
  if (role !== 'admin') {
    return jsonResponse(403, { error: 'Forbidden. Admins only.' });
  }

  const deleteProfileRes = await fetch(`${supabaseUrl}/rest/v1/profiles?id=eq.${userId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'apikey': serviceRoleKey,
      'Authorization': `Bearer ${serviceRoleKey}`
    }
  });

  if (!deleteProfileRes.ok) {
    const errText = await deleteProfileRes.text();
    return jsonResponse(500, { error: errText || 'Failed to delete profile.' });
  }

  const deleteAuthRes = await fetch(`${supabaseUrl}/auth/v1/admin/users/${userId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'apikey': serviceRoleKey,
      'Authorization': `Bearer ${serviceRoleKey}`
    }
  });

  if (!deleteAuthRes.ok) {
    const errText = await deleteAuthRes.text();
    return jsonResponse(500, { error: errText || 'Failed to delete auth user.' });
  }

  return jsonResponse(200, { ok: true });
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/api/openai') {
      return handleOpenAI(request, env);
    }
    if (url.pathname === '/api/admin-delete-user') {
      return handleAdminDeleteUser(request, env);
    }

    const assetResponse = await env.ASSETS.fetch(request);
    if (assetResponse.status !== 404) {
      return assetResponse;
    }

    if (request.method !== 'GET' && request.method !== 'HEAD') {
      return assetResponse;
    }

    const indexRequest = new Request(new URL('/index.html', request.url), {
      method: 'GET',
      headers: request.headers
    });
    return env.ASSETS.fetch(indexRequest);
  }
};
