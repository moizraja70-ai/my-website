type ProfileRow = {
  role?: string | null;
  is_subscribed?: boolean | null;
  subscription_end_date?: string | null;
};

type QuotaTier = "standard" | "premium";
type QuotaStatus = { day: string; used: number };

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization"
};

const jsonResponse = (
  status: number,
  payload: Record<string, unknown>,
  extraHeaders: Record<string, string> = {}
) =>
  new Response(JSON.stringify(payload), {
    status,
    headers: { "Content-Type": "application/json", ...corsHeaders, "Cache-Control": "no-store", ...extraHeaders }
  });

const parsePositiveInt = (value: unknown, fallback: number) => {
  const n = typeof value === "string" ? Number.parseInt(value, 10) : typeof value === "number" ? value : NaN;
  return Number.isFinite(n) && n > 0 ? Math.floor(n) : fallback;
};

const getQuotaConfig = (env: Record<string, string | undefined>) => {
  const standardLimit = parsePositiveInt(env.AI_DAILY_TOKEN_LIMIT_STANDARD, 1_000_000);
  const premiumLimit = parsePositiveInt(env.AI_DAILY_TOKEN_LIMIT_PREMIUM, 250_000);
  const premiumModels = String(env.OPENAI_PREMIUM_MODELS || "gpt-5-2")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  return { standardLimit, premiumLimit, premiumModels };
};

const getQuotaStub = (env: any) => {
  const ns = env?.AI_QUOTA;
  if (!ns || typeof ns.idFromName !== "function" || typeof ns.get !== "function") return null;
  // Single global counter shared across all users.
  const id = ns.idFromName("global");
  return ns.get(id);
};

const fetchQuotaStatus = async (stub: any, tier: QuotaTier): Promise<QuotaStatus | null> => {
  try {
    const res = await stub.fetch(`https://ai-quota/status?tier=${encodeURIComponent(tier)}`);
    if (!res.ok) return null;
    const json: any = await res.json().catch(() => null);
    const day = typeof json?.day === "string" ? json.day : null;
    const used = Number.isFinite(Number(json?.used)) ? Number(json.used) : null;
    if (!day || used === null) return null;
    return { day, used: Math.max(0, Math.floor(used)) };
  } catch {
    return null;
  }
};

const addQuotaUsage = async (stub: any, tier: QuotaTier, tokens: number): Promise<QuotaStatus | null> => {
  const delta = Number.isFinite(tokens) && tokens > 0 ? Math.floor(tokens) : 0;
  if (delta <= 0) return null;

  try {
    const res = await stub.fetch("https://ai-quota/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tier, tokens: delta })
    });
    if (!res.ok) return null;
    const json: any = await res.json().catch(() => null);
    const day = typeof json?.day === "string" ? json.day : null;
    const used = Number.isFinite(Number(json?.used)) ? Number(json.used) : null;
    if (!day || used === null) return null;
    return { day, used: Math.max(0, Math.floor(used)) };
  } catch {
    return null;
  }
};

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

const validateMessages = (messages: any[]): string | null => {
  if (!Array.isArray(messages)) return "Expected messages array";
  if (messages.length > 50) return "Message history limit exceeded (max 50)";

  let totalCharCount = 0;
  for (const msg of messages) {
    if (!msg || typeof msg !== "object") return "Invalid message format";
    const role = msg.role;
    const content = msg.content;

    if (!["system", "user", "assistant"].includes(role)) {
      return "Invalid message role";
    }

    if (typeof content !== "string") {
      return "Message content must be a string";
    }

    totalCharCount += content.length;
  }

  if (totalCharCount > 20000) {
    return "Total message content exceeds 20,000 characters";
  }

  return null;
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

    const messages = Array.isArray(body?.messages) ? body.messages : null;
    if (!messages) {
      return jsonResponse(400, { error: "Expected messages array" });
    }

    const validationError = validateMessages(messages);
    if (validationError) {
      return jsonResponse(400, { error: validationError });
    }

    const allowedModels = String(env?.OPENAI_ALLOWED_MODELS || "gpt-4o-mini")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const requestedModel = typeof body?.model === "string" && body.model ? body.model : allowedModels[0];
    const model = allowedModels.includes(requestedModel) ? requestedModel : allowedModels[0];
    const temperature = typeof body?.temperature === "number" ? Math.max(0, Math.min(1, body.temperature)) : 0.4;
    const responseFormat = body?.response_format;

    // ---------- Shared daily token quotas (across all users) ----------

    const quotaStub = getQuotaStub(env as any);
    if (!quotaStub) {
      return jsonResponse(500, { error: "AI_QUOTA_NOT_CONFIGURED" });
    }

    const { standardLimit, premiumLimit, premiumModels } = getQuotaConfig(env as any);
    const tier: QuotaTier = premiumModels.includes(model) ? "premium" : "standard";
    const limit = tier === "premium" ? premiumLimit : standardLimit;

    const quotaStatus = await fetchQuotaStatus(quotaStub, tier);
    if (!quotaStatus) {
      return jsonResponse(500, { error: "AI_QUOTA_UNAVAILABLE" });
    }

    if (quotaStatus.used >= limit) {
      return jsonResponse(429, {
        error: "DAILY_QUOTA_EXCEEDED",
        message: "quota exceeded",
        tier,
        day: quotaStatus.day,
        used: quotaStatus.used,
        limit
      });
    }

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

    const tokensUsed = Number(data?.usage?.total_tokens);
    const tokenDelta = Number.isFinite(tokensUsed) && tokensUsed > 0 ? Math.floor(tokensUsed) : 0;

    const updatedQuota =
      tokenDelta > 0 ? await addQuotaUsage(quotaStub, tier, tokenDelta) : null;

    const quotaHeaders: Record<string, string> = {
      "X-AI-Quota-Day": updatedQuota?.day || quotaStatus.day,
      "X-AI-Quota-Tier": tier,
      "X-AI-Quota-Used": String(updatedQuota?.used ?? quotaStatus.used),
      "X-AI-Quota-Limit": String(limit),
      "X-AI-Model": model
    };
    if (tokenDelta > 0) quotaHeaders["X-AI-Tokens-Used"] = String(tokenDelta);

    return jsonResponse(200, { text }, quotaHeaders);
  } catch (err: any) {
    console.error("OpenAI proxy error:", err);
    return jsonResponse(500, { error: err?.message || "Server error" });
  }
};
