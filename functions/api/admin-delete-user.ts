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
    const supabaseUrl = env.SUPABASE_URL || env.VITE_SUPABASE_URL;
    const supabaseAnonKey = env.SUPABASE_ANON_KEY || env.VITE_SUPABASE_ANON_KEY;
    const serviceRoleKey = env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseAnonKey || !serviceRoleKey) {
      return jsonResponse(500, { error: 'Missing Supabase environment variables.' });
    }

    const authHeader = request.headers.get('Authorization') || '';
    if (!authHeader.startsWith('Bearer ')) {
      return jsonResponse(401, { error: 'Missing Authorization header.' });
    }

    let body: any;
    try {
      body = await request.json();
    } catch {
      return jsonResponse(400, { error: 'Invalid JSON body.' });
    }

    const userId = typeof body?.userId === 'string' ? body.userId : '';
    if (!userId) {
      return jsonResponse(400, { error: 'Missing userId.' });
    }

    // Verify caller is an admin using anon key + user token
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
    const callerId = me?.id;
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
    const role = Array.isArray(profileData) ? profileData?.[0]?.role : profileData?.role;
    if (role !== 'admin') {
      return jsonResponse(403, { error: 'Forbidden. Admins only.' });
    }

    // Delete profile row (service role)
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

    // Delete auth user (service role)
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
  } catch (err: any) {
    console.error('Admin delete error:', err);
    return jsonResponse(500, { error: err?.message || 'Server error' });
  }
};
