type ProfileRow = {
  role?: string | null;
  is_subscribed?: boolean | null;
  subscription_end_date?: string | null;
};

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization"
};

const jsonResponse = (status: number, payload: Record<string, unknown>) =>
  new Response(JSON.stringify(payload), {
    status,
    headers: { "Content-Type": "application/json", ...corsHeaders, "Cache-Control": "no-store" }
  });

const getSupabaseConfig = (env: Record<string, string | undefined>) => {
  const url = env.SUPABASE_URL || env.VITE_SUPABASE_URL;
  const anonKey = env.SUPABASE_ANON_KEY || env.VITE_SUPABASE_ANON_KEY;
  const serviceKey = env.SUPABASE_SERVICE_ROLE_KEY;
  return { url, anonKey, serviceKey };
};

const fetchJson = async (res: Response) => {
  try {
    return await res.json();
  } catch {
    return null;
  }
};

const isSubscriptionActive = (profile: ProfileRow | null) => {
  const role = String(profile?.role || "user").toLowerCase();
  if (role === "blocked") return false;
  if (role === "admin") return true;

  const isSubscribed = profile?.is_subscribed === true;
  if (!isSubscribed) return false;

  const end = profile?.subscription_end_date;
  if (!end) return true;
  if (end === "infinity" || end === "Infinity") return true;

  const endMs = Date.parse(end);
  if (!Number.isFinite(endMs)) return false;
  return endMs > Date.now();
};

const validateUserAndGetId = async (
  supabaseUrl: string,
  supabaseAnonKey: string,
  authHeader: string
): Promise<string | null> => {
  try {
    const res = await fetch(`${supabaseUrl}/auth/v1/user`, {
      headers: {
        apikey: supabaseAnonKey,
        Authorization: authHeader
      }
    });
    if (!res.ok) return null;
    const user = await fetchJson(res);
    const id = typeof user?.id === "string" ? user.id : null;
    return id;
  } catch {
    return null;
  }
};

const fetchProfile = async (
  supabaseUrl: string,
  supabaseAnonKey: string,
  authHeader: string,
  serviceKey: string | undefined,
  userId: string
): Promise<ProfileRow | null> => {
  const url = new URL(`${supabaseUrl}/rest/v1/profiles`);
  url.searchParams.set("select", "role,is_subscribed,subscription_end_date");
  url.searchParams.set("id", `eq.${userId}`);
  url.searchParams.set("limit", "1");

  const apiKey = serviceKey || supabaseAnonKey;
  const authorization = serviceKey ? `Bearer ${serviceKey}` : authHeader;

  const res = await fetch(url.toString(), {
    headers: {
      apikey: apiKey,
      Authorization: authorization
    }
  });

  if (!res.ok) return null;
  const data = await fetchJson(res);
  if (!Array.isArray(data) || data.length === 0) return null;
  return data[0] as ProfileRow;
};

const MAX_HISTORY = 50;
const MAX_CHARS = 20000;
const VALID_ROLES = new Set(["system", "user", "assistant"]);

const validateMessages = (messages: any[]): { validMessages: any[]; error?: string } => {
  if (!Array.isArray(messages)) {
    return { validMessages: [], error: "Expected messages array" };
  }

  // Truncate to last N messages
  const recentMessages = messages.slice(-MAX_HISTORY);

  const validMessages = [];
  let totalChars = 0;

  for (const msg of recentMessages) {
    if (!msg || typeof msg !== "object") return { validMessages: [], error: "Invalid message format" };

    const role = msg.role;
    const content = msg.content;

    if (!VALID_ROLES.has(role)) {
      return { validMessages: [], error: `Invalid role: ${role}` };
    }

    if (typeof content !== "string") {
      return { validMessages: [], error: "Content must be a string" };
    }

    totalChars += content.length;
    if (totalChars > MAX_CHARS) {
      return { validMessages: [], error: `Total content length exceeds limit of ${MAX_CHARS} characters` };
    }

    validMessages.push({ role, content });
  }

  if (validMessages.length === 0) {
    return { validMessages: [], error: "No valid messages found" };
  }

  return { validMessages };
};

export const onRequestOptions: PagesFunction = () => {
  return new Response(null, { status: 204, headers: corsHeaders });
};

export const onRequestPost: PagesFunction = async ({ request, env }) => {
  try {
    const apiKey = env?.OPENAI_API_KEY;
    if (!apiKey) {
      return jsonResponse(500, { error: "OPENAI_API_KEY is not set" });
    }

    const { url: supabaseUrl, anonKey: supabaseAnonKey, serviceKey } = getSupabaseConfig(env as any);
    if (!supabaseUrl || !supabaseAnonKey) {
      return jsonResponse(500, { error: "Supabase environment variables are not configured." });
    }

    const authHeader = request.headers.get("Authorization");
    if (!authHeader) {
      return jsonResponse(401, { error: "AUTH_REQUIRED" });
    }

    const userId = await validateUserAndGetId(supabaseUrl, supabaseAnonKey, authHeader);
    if (!userId) {
      return jsonResponse(401, { error: "AUTH_INVALID" });
    }

    const profile = await fetchProfile(supabaseUrl, supabaseAnonKey, authHeader, serviceKey, userId);
    if (!isSubscriptionActive(profile)) {
      return jsonResponse(403, { error: "SUBSCRIPTION_REQUIRED" });
    }

    let body: any;
    try {
      body = await request.json();
    } catch {
      return jsonResponse(400, { error: "Invalid JSON body" });
    }

    const rawMessages = Array.isArray(body?.messages) ? body.messages : null;
    const { validMessages, error: validationError } = validateMessages(rawMessages);

    if (validationError || !validMessages) {
      return jsonResponse(400, { error: validationError || "Invalid messages" });
    }

    const messages = validMessages;

    const allowedModels = String(env?.OPENAI_ALLOWED_MODELS || "gpt-4o-mini")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const requestedModel = typeof body?.model === "string" && body.model ? body.model : allowedModels[0];
    const model = allowedModels.includes(requestedModel) ? requestedModel : allowedModels[0];
    const temperature = typeof body?.temperature === "number" ? Math.max(0, Math.min(1, body.temperature)) : 0.4;
    const responseFormat = body?.response_format;

    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`
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
      const errorMessage = data?.error?.message || data?.error || rawText || "OpenAI request failed";
      return jsonResponse(openaiRes.status, { error: errorMessage });
    }

    if (!data) {
      return jsonResponse(502, { error: "OpenAI returned a non-JSON response." });
    }

    const text = data?.choices?.[0]?.message?.content || "";
    return jsonResponse(200, { text });
  } catch (err: any) {
    console.error("OpenAI proxy error:", err);
    return jsonResponse(500, { error: err?.message || "Server error" });
  }
};
