const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization"
};

const jsonResponse = (status: number, payload: Record<string, unknown>) =>
  new Response(JSON.stringify(payload), {
    status,
    headers: { "Content-Type": "application/json", ...corsHeaders }
  });

const parseRequest = async (request: Request) => {
  const url = new URL(request.url);
  let subject = url.searchParams.get("subject") || "";
  let topic = url.searchParams.get("topic") || "";

  if ((!subject || !topic) && request.method === "POST") {
    try {
      const body = await request.json();
      subject = typeof body?.subject === "string" ? body.subject : subject;
      topic = typeof body?.topic === "string" ? body.topic : topic;
    } catch {
      // ignore
    }
  }

  return { subject, topic };
};

const fetchWithTimeout = async (
  input: RequestInfo | URL,
  init: RequestInit = {},
  timeoutMs = 8000
) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(input, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timeoutId);
  }
};

type SubjectKey = "dental_materials" | "general_embryology" | "anatomy";
type NoteRecord = { subject: string; topic: string; content: string; key_points?: string[] | null };

const stripImagesFromHtml = (content: string) => {
  if (!content) return content;
  return content
    .replace(/<picture[\s\S]*?<\/picture>/gi, "")
    .replace(/<img[^>]*>/gi, "")
    .replace(/<iframe[\s\S]*?<\/iframe>/gi, "")
    .replace(/<video[\s\S]*?<\/video>/gi, "")
    .replace(/<audio[\s\S]*?<\/audio>/gi, "")
    .replace(/<source[^>]*>/gi, "")
    .replace(/!\[[^\]]*\]\([^)\n]*\)/g, "")
    .replace(/!\[[^\]]*\]\[[^\]]*\]/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\[([^\]]+)\]\[[^\]]+\]/g, "$1")
    .replace(/^\s*\[[^\]]+\]:\s*\S+\s*$/gm, "")
    .replace(/<https?:\/\/[^>]+>/g, "")
    .replace(/\n{3,}/g, "\n\n");
};

const normalize = (value: string) => value.trim().toLowerCase();
const normalizeKey = (value: string) =>
  value.trim().toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");

const resolveSubjectKey = (subject: string): SubjectKey | null => {
  const normalized = normalize(subject);
  if (normalized.includes("dental materials")) {
    return "dental_materials";
  }
  if (normalized.includes("general embryology") || normalized.includes("embryology")) {
    return "general_embryology";
  }
  if (normalized.includes("anatomy")) {
    return "anatomy";
  }
  return null;
};

const resolveDentalTopicKey = (topic: string): string | null => {
  const t = normalize(topic);

  if (t.includes("properties")) {
    if (t.includes("summary")) return "properties_summary";
    if (t.includes("mechanical")) return "properties_mechanical";
    if (t.includes("thermal")) return "properties_thermal";
    if (t.includes("rheolog")) return "properties_rheology";
    if (t.includes("chemical") || t.includes("biological")) return "properties_chemical";
    if (t.includes("optical")) return "properties_optical";
    return "properties";
  }

  if (t.includes("impression")) return "impression";
  if (t.includes("gypsum")) return "gypsum";
  if (t.includes("investment")) return "investment";

  if (t.includes("gic") || t.includes("glass ionomer")) {
    return t.includes("summary") ? "gic_summary" : "gic";
  }

  if (t.includes("denture") || t.includes("reline") || t.includes("rebase") || t.includes("polymers")) {
    if (t.includes("summary")) return "denture_summary";
    if (t.includes("cleansers") || t.includes("adhesives")) return "denture_cleansers";
    return "denture";
  }

  if (t.includes("cement") || t.includes("liner") || t.includes("base")) return "cements";
  if (t.includes("casting")) return "casting";

  if (t.includes("composite")) {
    return t.includes("summary") ? "composite_summary" : "composite";
  }

  if (t.includes("adhesion") || t.includes("bonding")) return "adhesion";

  if (t.includes("wax")) {
    return t.includes("summary") ? "wax_summary" : "wax";
  }

  if (t.includes("metals summary")) return "metals_summary";
  if (t === "alloys") return "alloys";
  if (t.includes("base metal")) return "base_metal";
  if (t.includes("wrought")) return "wrought";
  if (t.includes("noble")) return "noble";

  if (t.includes("ceramic") || t.includes("porcelain")) {
    return t.includes("summary") ? "ceramics_summary" : "ceramics";
  }

  if (t.includes("amalgam")) {
    return t.includes("summary") ? "amalgam_summary" : "amalgam";
  }

  return normalizeKey(t);
};

const resolveAnatomyTopicKey = (topic: string): string | null => {
  const t = normalize(topic);

  if (t.includes("pster") || t.includes("skull bone") || t.includes("suture")) return "skull_bones";
  if (t.includes("mandible")) return "mandible";
  if (t.includes("maxilla")) return "maxilla";
  if (t.includes("zygoma") || t.includes("zygomatic") || t.includes("cheekbone")) return "zygomatic";
  if (t.includes("sphenoid") || t.includes("ethmoid")) return "sphenoid_ethmoid";
  if (t.includes("foramina") || t.includes("fossa") || t.includes("fossae")) return "foramina_fossae";
  if (t.includes("osteology") || t.includes("fracture")) return "osteology";
  if (
    (t.includes("head") && t.includes("neck") && t.includes("muscle")) ||
    t.includes("mastication") ||
    t.includes("masticator") ||
    t.includes("facial expression") ||
    t.includes("suprahyoid") ||
    t.includes("infrahyoid") ||
    t.includes("tongue")
  ) return "head_neck_muscles";

  return normalizeKey(t);
};

const validateUserToken = async (
  supabaseUrl: string,
  supabaseAnonKey: string,
  authHeader?: string | null
) => {
  if (!authHeader) return false;
  try {
    const res = await fetchWithTimeout(`${supabaseUrl}/auth/v1/user`, {
      headers: {
        apikey: supabaseAnonKey,
        Authorization: authHeader
      }
    }, 5000);
    return res.ok;
  } catch {
    return false;
  }
};

const fetchNoteFromSupabase = async (
  env: Record<string, string | undefined>,
  subjectKey: string,
  topicKey: string,
  authHeader?: string | null
) => {
  const supabaseUrl = env.SUPABASE_URL || env.VITE_SUPABASE_URL;
  const supabaseAnonKey = env.SUPABASE_ANON_KEY || env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("[notes] Missing Supabase env vars", {
      hasUrl: Boolean(supabaseUrl),
      hasAnonKey: Boolean(supabaseAnonKey)
    });
    return { error: "Supabase environment variables are not configured." } as const;
  }

  const isPublicPreview = subjectKey === 'dental_materials' && topicKey === 'impression';
  const userValid = await validateUserToken(supabaseUrl, supabaseAnonKey, authHeader);
  if (!userValid && !isPublicPreview) {
    return { error: "AUTH_REQUIRED" } as const;
  }

  // NOTE: Always query Supabase as the end-user (anon key + user's access token).
  // Using the service role key here would bypass RLS and defeat subscription gating.
  const apiKey = supabaseAnonKey;
  const authorization =
    authHeader && authHeader.toLowerCase().startsWith("bearer ")
      ? authHeader
      : `Bearer ${supabaseAnonKey}`;

  const url = new URL(`${supabaseUrl}/rest/v1/notes`);
  url.searchParams.set("select", "subject,topic,content,key_points");
  url.searchParams.set("subject_key", `eq.${subjectKey}`);
  url.searchParams.set("topic_key", `eq.${topicKey}`);
  url.searchParams.set("limit", "1");

  try {
    const res = await fetchWithTimeout(url.toString(), {
      headers: {
        apikey: apiKey,
        Authorization: authorization,
        "Content-Type": "application/json"
      }
    }, 8000);

    const raw = await res.text();
    let data: NoteRecord[] | null = null;
    if (raw) {
      try {
        data = JSON.parse(raw) as NoteRecord[];
      } catch {
        data = null;
      }
    }

    if (!res.ok) {
      const error = data && (data as any)?.error ? (data as any).error : raw || "Supabase request failed.";
      console.error("[notes] Supabase request failed", {
        status: res.status,
        subjectKey,
        topicKey,
        message: typeof error === "string" ? error.slice(0, 200) : "unknown"
      });
      return { error } as const;
    }

    if (!data || !Array.isArray(data) || data.length === 0) {
      return { note: null } as const;
    }

    return { note: data[0] } as const;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Supabase request failed.";
    console.error("[notes] Supabase request threw", {
      subjectKey,
      topicKey,
      message: message.slice(0, 200)
    });
    return { error: message } as const;
  }
};

const handleNotes = async (request: Request, env: Record<string, string | undefined>) => {
  let { subject, topic } = await parseRequest(request);
  if (!subject) {
    return jsonResponse(400, { error: "Missing subject." });
  }

  const subjectKey = resolveSubjectKey(subject);
  if (!subjectKey) {
    return jsonResponse(400, { error: "Unsupported subject." });
  }

  if (!topic) {
    if (subjectKey === "general_embryology") {
      topic = "Summary";
    } else {
      return jsonResponse(400, { error: "Missing topic." });
    }
  }

  let topicKey: string | null = null;
  if (subjectKey === "dental_materials") {
    topicKey = resolveDentalTopicKey(topic);
  } else if (subjectKey === "anatomy") {
    topicKey = resolveAnatomyTopicKey(topic);
  } else if (subjectKey === "general_embryology") {
    topicKey = "summary";
  } else {
    topicKey = normalizeKey(topic);
  }

  if (!topicKey) {
    return jsonResponse(404, { error: "Notes not found." });
  }

  const authHeader = request.headers.get("Authorization");
  const topicKeysToTry = [topicKey];
  if (subjectKey === "anatomy") {
    if (topicKey === "skull_bones") topicKeysToTry.push("psterolgy");
    if (topicKey === "sphenoid_ethmoid") {
      topicKeysToTry.push("sphenoid", "ethmoid");
    }
  }

  let note: NoteRecord | null = null;
  let lastError: string | null = null;
  for (const key of topicKeysToTry) {
    const result = await fetchNoteFromSupabase(env, subjectKey, key, authHeader);
    if ("error" in result) {
      if (result.error === "AUTH_REQUIRED") {
        return jsonResponse(401, { error: "Authentication required." });
      }
      lastError = typeof result.error === "string" ? result.error : "Supabase request failed.";
      continue;
    }
    if (result.note) {
      note = result.note;
      break;
    }
  }

  if (!note) {
    if (lastError) {
      return jsonResponse(500, { error: lastError });
    }
    return jsonResponse(404, { error: "Notes not found." });
  }

  const safeContent = stripImagesFromHtml(note.content || "");

  return jsonResponse(200, {
    subject: note.subject || subject,
    topic: note.topic || topic,
    content: safeContent,
    keyPoints: Array.isArray(note.key_points) ? note.key_points : []
  });
};

export const onRequestOptions: PagesFunction = () => {
  return new Response(null, { status: 204, headers: corsHeaders });
};

export const onRequestGet: PagesFunction = async ({ request, env }) => {
  return handleNotes(request, env as Record<string, string | undefined>);
};

export const onRequestPost: PagesFunction = async ({ request, env }) => {
  return handleNotes(request, env as Record<string, string | undefined>);
};
