var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// api/notes.ts
var corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization"
};
var jsonResponse = /* @__PURE__ */ __name((status, payload) => new Response(JSON.stringify(payload), {
  status,
  headers: { "Content-Type": "application/json", ...corsHeaders }
}), "jsonResponse");
var parseRequest = /* @__PURE__ */ __name(async (request) => {
  const url = new URL(request.url);
  let subject = url.searchParams.get("subject") || "";
  let topic = url.searchParams.get("topic") || "";
  if ((!subject || !topic) && request.method === "POST") {
    try {
      const body = await request.json();
      subject = typeof body?.subject === "string" ? body.subject : subject;
      topic = typeof body?.topic === "string" ? body.topic : topic;
    } catch {
    }
  }
  return { subject, topic };
}, "parseRequest");
var fetchWithTimeout = /* @__PURE__ */ __name(async (input, init = {}, timeoutMs = 8e3) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(input, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timeoutId);
  }
}, "fetchWithTimeout");
var stripImagesFromHtml = /* @__PURE__ */ __name((content) => {
  if (!content)
    return content;
  return content.replace(/<picture[\s\S]*?<\/picture>/gi, "").replace(/<img[^>]*>/gi, "").replace(/<iframe[\s\S]*?<\/iframe>/gi, "").replace(/<video[\s\S]*?<\/video>/gi, "").replace(/<audio[\s\S]*?<\/audio>/gi, "").replace(/<source[^>]*>/gi, "").replace(/!\[[^\]]*\]\([^)\n]*\)/g, "").replace(/!\[[^\]]*\]\[[^\]]*\]/g, "").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/\[([^\]]+)\]\[[^\]]+\]/g, "$1").replace(/^\s*\[[^\]]+\]:\s*\S+\s*$/gm, "").replace(/<https?:\/\/[^>]+>/g, "").replace(/\n{3,}/g, "\n\n");
}, "stripImagesFromHtml");
var normalize = /* @__PURE__ */ __name((value) => value.trim().toLowerCase(), "normalize");
var normalizeKey = /* @__PURE__ */ __name((value) => value.trim().toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, ""), "normalizeKey");
var resolveSubjectKey = /* @__PURE__ */ __name((subject) => {
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
}, "resolveSubjectKey");
var resolveDentalTopicKey = /* @__PURE__ */ __name((topic) => {
  const t = normalize(topic);
  if (t.includes("properties")) {
    if (t.includes("summary"))
      return "properties_summary";
    if (t.includes("mechanical"))
      return "properties_mechanical";
    if (t.includes("thermal"))
      return "properties_thermal";
    if (t.includes("rheolog"))
      return "properties_rheology";
    if (t.includes("chemical") || t.includes("biological"))
      return "properties_chemical";
    if (t.includes("optical"))
      return "properties_optical";
    return "properties";
  }
  if (t.includes("impression"))
    return "impression";
  if (t.includes("gypsum"))
    return "gypsum";
  if (t.includes("investment"))
    return "investment";
  if (t.includes("gic") || t.includes("glass ionomer")) {
    return t.includes("summary") ? "gic_summary" : "gic";
  }
  if (t.includes("denture") || t.includes("reline") || t.includes("rebase") || t.includes("polymers")) {
    if (t.includes("summary"))
      return "denture_summary";
    if (t.includes("cleansers") || t.includes("adhesives"))
      return "denture_cleansers";
    return "denture";
  }
  if (t.includes("cement") || t.includes("liner") || t.includes("base"))
    return "cements";
  if (t.includes("casting"))
    return "casting";
  if (t.includes("composite")) {
    return t.includes("summary") ? "composite_summary" : "composite";
  }
  if (t.includes("adhesion") || t.includes("bonding"))
    return "adhesion";
  if (t.includes("wax")) {
    return t.includes("summary") ? "wax_summary" : "wax";
  }
  if (t.includes("metals summary"))
    return "metals_summary";
  if (t === "alloys")
    return "alloys";
  if (t.includes("base metal"))
    return "base_metal";
  if (t.includes("wrought"))
    return "wrought";
  if (t.includes("noble"))
    return "noble";
  if (t.includes("ceramic") || t.includes("porcelain")) {
    return t.includes("summary") ? "ceramics_summary" : "ceramics";
  }
  if (t.includes("amalgam")) {
    return t.includes("summary") ? "amalgam_summary" : "amalgam";
  }
  return normalizeKey(t);
}, "resolveDentalTopicKey");
var resolveAnatomyTopicKey = /* @__PURE__ */ __name((topic) => {
  const t = normalize(topic);
  if (t.includes("pster") || t.includes("skull bone") || t.includes("suture"))
    return "skull_bones";
  if (t.includes("mandible"))
    return "mandible";
  if (t.includes("maxilla"))
    return "maxilla";
  if (t.includes("zygoma") || t.includes("zygomatic") || t.includes("cheekbone"))
    return "zygomatic";
  if (t.includes("sphenoid") || t.includes("ethmoid"))
    return "sphenoid_ethmoid";
  if (t.includes("foramina") || t.includes("fossa") || t.includes("fossae"))
    return "foramina_fossae";
  if (t.includes("osteology") || t.includes("fracture"))
    return "osteology";
  if (t.includes("head") && t.includes("neck") && t.includes("muscle") || t.includes("mastication") || t.includes("masticator") || t.includes("facial expression") || t.includes("suprahyoid") || t.includes("infrahyoid") || t.includes("tongue"))
    return "head_neck_muscles";
  return normalizeKey(t);
}, "resolveAnatomyTopicKey");
var validateUserToken = /* @__PURE__ */ __name(async (supabaseUrl, supabaseAnonKey, authHeader) => {
  if (!authHeader)
    return false;
  try {
    const res = await fetchWithTimeout(`${supabaseUrl}/auth/v1/user`, {
      headers: {
        apikey: supabaseAnonKey,
        Authorization: authHeader
      }
    }, 5e3);
    return res.ok;
  } catch {
    return false;
  }
}, "validateUserToken");
var fetchNoteFromSupabase = /* @__PURE__ */ __name(async (env, subjectKey, topicKey, authHeader) => {
  const supabaseUrl = env.SUPABASE_URL || env.VITE_SUPABASE_URL;
  const supabaseAnonKey = env.SUPABASE_ANON_KEY || env.VITE_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("[notes] Missing Supabase env vars", {
      hasUrl: Boolean(supabaseUrl),
      hasAnonKey: Boolean(supabaseAnonKey)
    });
    return { error: "Supabase environment variables are not configured." };
  }
  const isPublicPreview = subjectKey === "dental_materials" && topicKey === "impression";
  const userValid = await validateUserToken(supabaseUrl, supabaseAnonKey, authHeader);
  if (!userValid && !isPublicPreview) {
    return { error: "AUTH_REQUIRED" };
  }
  const apiKey = supabaseAnonKey;
  const authorization = authHeader && authHeader.toLowerCase().startsWith("bearer ") ? authHeader : `Bearer ${supabaseAnonKey}`;
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
    }, 8e3);
    const raw = await res.text();
    let data = null;
    if (raw) {
      try {
        data = JSON.parse(raw);
      } catch {
        data = null;
      }
    }
    if (!res.ok) {
      const error = data && data?.error ? data.error : raw || "Supabase request failed.";
      console.error("[notes] Supabase request failed", {
        status: res.status,
        subjectKey,
        topicKey,
        message: typeof error === "string" ? error.slice(0, 200) : "unknown"
      });
      return { error };
    }
    if (!data || !Array.isArray(data) || data.length === 0) {
      return { note: null };
    }
    return { note: data[0] };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Supabase request failed.";
    console.error("[notes] Supabase request threw", {
      subjectKey,
      topicKey,
      message: message.slice(0, 200)
    });
    return { error: message };
  }
}, "fetchNoteFromSupabase");
var handleNotes = /* @__PURE__ */ __name(async (request, env) => {
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
  let topicKey = null;
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
    if (topicKey === "skull_bones")
      topicKeysToTry.push("psterolgy");
    if (topicKey === "sphenoid_ethmoid") {
      topicKeysToTry.push("sphenoid", "ethmoid");
    }
  }
  let note = null;
  let lastError = null;
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
}, "handleNotes");
var onRequestOptions = /* @__PURE__ */ __name(() => {
  return new Response(null, { status: 204, headers: corsHeaders });
}, "onRequestOptions");
var onRequestGet = /* @__PURE__ */ __name(async ({ request, env }) => {
  return handleNotes(request, env);
}, "onRequestGet");
var onRequestPost = /* @__PURE__ */ __name(async ({ request, env }) => {
  return handleNotes(request, env);
}, "onRequestPost");

// api/openai.ts
var corsHeaders2 = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization"
};
var jsonResponse2 = /* @__PURE__ */ __name((status, payload) => new Response(JSON.stringify(payload), {
  status,
  headers: { "Content-Type": "application/json", ...corsHeaders2, "Cache-Control": "no-store" }
}), "jsonResponse");
var getSupabaseConfig = /* @__PURE__ */ __name((env) => {
  const url = env.SUPABASE_URL || env.VITE_SUPABASE_URL;
  const anonKey = env.SUPABASE_ANON_KEY || env.VITE_SUPABASE_ANON_KEY;
  const serviceKey = env.SUPABASE_SERVICE_ROLE_KEY;
  return { url, anonKey, serviceKey };
}, "getSupabaseConfig");
var fetchJson = /* @__PURE__ */ __name(async (res) => {
  try {
    return await res.json();
  } catch {
    return null;
  }
}, "fetchJson");
var isSubscriptionActive = /* @__PURE__ */ __name((profile) => {
  const role = String(profile?.role || "user").toLowerCase();
  if (role === "blocked")
    return false;
  if (role === "admin")
    return true;
  const isSubscribed = profile?.is_subscribed === true;
  if (!isSubscribed)
    return false;
  const end = profile?.subscription_end_date;
  if (!end)
    return true;
  if (end === "infinity" || end === "Infinity")
    return true;
  const endMs = Date.parse(end);
  if (!Number.isFinite(endMs))
    return false;
  return endMs > Date.now();
}, "isSubscriptionActive");
var validateUserAndGetId = /* @__PURE__ */ __name(async (supabaseUrl, supabaseAnonKey, authHeader) => {
  try {
    const res = await fetch(`${supabaseUrl}/auth/v1/user`, {
      headers: {
        apikey: supabaseAnonKey,
        Authorization: authHeader
      }
    });
    if (!res.ok)
      return null;
    const user = await fetchJson(res);
    const id = typeof user?.id === "string" ? user.id : null;
    return id;
  } catch {
    return null;
  }
}, "validateUserAndGetId");
var fetchProfile = /* @__PURE__ */ __name(async (supabaseUrl, supabaseAnonKey, authHeader, serviceKey, userId) => {
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
  if (!res.ok)
    return null;
  const data = await fetchJson(res);
  if (!Array.isArray(data) || data.length === 0)
    return null;
  return data[0];
}, "fetchProfile");
var onRequestOptions2 = /* @__PURE__ */ __name(() => {
  return new Response(null, { status: 204, headers: corsHeaders2 });
}, "onRequestOptions");
var onRequestPost2 = /* @__PURE__ */ __name(async ({ request, env }) => {
  try {
    const apiKey = env?.OPENAI_API_KEY;
    if (!apiKey) {
      return jsonResponse2(500, { error: "OPENAI_API_KEY is not set" });
    }
    const { url: supabaseUrl, anonKey: supabaseAnonKey, serviceKey } = getSupabaseConfig(env);
    if (!supabaseUrl || !supabaseAnonKey) {
      return jsonResponse2(500, { error: "Supabase environment variables are not configured." });
    }
    const authHeader = request.headers.get("Authorization");
    if (!authHeader) {
      return jsonResponse2(401, { error: "AUTH_REQUIRED" });
    }
    const userId = await validateUserAndGetId(supabaseUrl, supabaseAnonKey, authHeader);
    if (!userId) {
      return jsonResponse2(401, { error: "AUTH_INVALID" });
    }
    const profile = await fetchProfile(supabaseUrl, supabaseAnonKey, authHeader, serviceKey, userId);
    if (!isSubscriptionActive(profile)) {
      return jsonResponse2(403, { error: "SUBSCRIPTION_REQUIRED" });
    }
    let body;
    try {
      body = await request.json();
    } catch {
      return jsonResponse2(400, { error: "Invalid JSON body" });
    }
    const messages = Array.isArray(body?.messages) ? body.messages : null;
    if (!messages) {
      return jsonResponse2(400, { error: "Expected messages array" });
    }
    const allowedModels = String(env?.OPENAI_ALLOWED_MODELS || "gpt-4o-mini").split(",").map((s) => s.trim()).filter(Boolean);
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
        ...responseFormat ? { response_format: responseFormat } : {}
      })
    });
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
      const errorMessage = data?.error?.message || data?.error || rawText || "OpenAI request failed";
      return jsonResponse2(openaiRes.status, { error: errorMessage });
    }
    if (!data) {
      return jsonResponse2(502, { error: "OpenAI returned a non-JSON response." });
    }
    const text = data?.choices?.[0]?.message?.content || "";
    return jsonResponse2(200, { text });
  } catch (err) {
    console.error("OpenAI proxy error:", err);
    return jsonResponse2(500, { error: err?.message || "Server error" });
  }
}, "onRequestPost");

// ../.wrangler/tmp/pages-JT4Gt3/functionsRoutes-0.8371447314172861.mjs
var routes = [
  {
    routePath: "/api/notes",
    mountPath: "/api",
    method: "GET",
    middlewares: [],
    modules: [onRequestGet]
  },
  {
    routePath: "/api/notes",
    mountPath: "/api",
    method: "OPTIONS",
    middlewares: [],
    modules: [onRequestOptions]
  },
  {
    routePath: "/api/notes",
    mountPath: "/api",
    method: "POST",
    middlewares: [],
    modules: [onRequestPost]
  },
  {
    routePath: "/api/openai",
    mountPath: "/api",
    method: "OPTIONS",
    middlewares: [],
    modules: [onRequestOptions2]
  },
  {
    routePath: "/api/openai",
    mountPath: "/api",
    method: "POST",
    middlewares: [],
    modules: [onRequestPost2]
  }
];

// ../node_modules/path-to-regexp/dist.es2015/index.js
function lexer(str) {
  var tokens = [];
  var i = 0;
  while (i < str.length) {
    var char = str[i];
    if (char === "*" || char === "+" || char === "?") {
      tokens.push({ type: "MODIFIER", index: i, value: str[i++] });
      continue;
    }
    if (char === "\\") {
      tokens.push({ type: "ESCAPED_CHAR", index: i++, value: str[i++] });
      continue;
    }
    if (char === "{") {
      tokens.push({ type: "OPEN", index: i, value: str[i++] });
      continue;
    }
    if (char === "}") {
      tokens.push({ type: "CLOSE", index: i, value: str[i++] });
      continue;
    }
    if (char === ":") {
      var name = "";
      var j = i + 1;
      while (j < str.length) {
        var code = str.charCodeAt(j);
        if (
          // `0-9`
          code >= 48 && code <= 57 || // `A-Z`
          code >= 65 && code <= 90 || // `a-z`
          code >= 97 && code <= 122 || // `_`
          code === 95
        ) {
          name += str[j++];
          continue;
        }
        break;
      }
      if (!name)
        throw new TypeError("Missing parameter name at ".concat(i));
      tokens.push({ type: "NAME", index: i, value: name });
      i = j;
      continue;
    }
    if (char === "(") {
      var count = 1;
      var pattern = "";
      var j = i + 1;
      if (str[j] === "?") {
        throw new TypeError('Pattern cannot start with "?" at '.concat(j));
      }
      while (j < str.length) {
        if (str[j] === "\\") {
          pattern += str[j++] + str[j++];
          continue;
        }
        if (str[j] === ")") {
          count--;
          if (count === 0) {
            j++;
            break;
          }
        } else if (str[j] === "(") {
          count++;
          if (str[j + 1] !== "?") {
            throw new TypeError("Capturing groups are not allowed at ".concat(j));
          }
        }
        pattern += str[j++];
      }
      if (count)
        throw new TypeError("Unbalanced pattern at ".concat(i));
      if (!pattern)
        throw new TypeError("Missing pattern at ".concat(i));
      tokens.push({ type: "PATTERN", index: i, value: pattern });
      i = j;
      continue;
    }
    tokens.push({ type: "CHAR", index: i, value: str[i++] });
  }
  tokens.push({ type: "END", index: i, value: "" });
  return tokens;
}
__name(lexer, "lexer");
function parse(str, options) {
  if (options === void 0) {
    options = {};
  }
  var tokens = lexer(str);
  var _a = options.prefixes, prefixes = _a === void 0 ? "./" : _a, _b = options.delimiter, delimiter = _b === void 0 ? "/#?" : _b;
  var result = [];
  var key = 0;
  var i = 0;
  var path = "";
  var tryConsume = /* @__PURE__ */ __name(function(type) {
    if (i < tokens.length && tokens[i].type === type)
      return tokens[i++].value;
  }, "tryConsume");
  var mustConsume = /* @__PURE__ */ __name(function(type) {
    var value2 = tryConsume(type);
    if (value2 !== void 0)
      return value2;
    var _a2 = tokens[i], nextType = _a2.type, index = _a2.index;
    throw new TypeError("Unexpected ".concat(nextType, " at ").concat(index, ", expected ").concat(type));
  }, "mustConsume");
  var consumeText = /* @__PURE__ */ __name(function() {
    var result2 = "";
    var value2;
    while (value2 = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR")) {
      result2 += value2;
    }
    return result2;
  }, "consumeText");
  var isSafe = /* @__PURE__ */ __name(function(value2) {
    for (var _i = 0, delimiter_1 = delimiter; _i < delimiter_1.length; _i++) {
      var char2 = delimiter_1[_i];
      if (value2.indexOf(char2) > -1)
        return true;
    }
    return false;
  }, "isSafe");
  var safePattern = /* @__PURE__ */ __name(function(prefix2) {
    var prev = result[result.length - 1];
    var prevText = prefix2 || (prev && typeof prev === "string" ? prev : "");
    if (prev && !prevText) {
      throw new TypeError('Must have text between two parameters, missing text after "'.concat(prev.name, '"'));
    }
    if (!prevText || isSafe(prevText))
      return "[^".concat(escapeString(delimiter), "]+?");
    return "(?:(?!".concat(escapeString(prevText), ")[^").concat(escapeString(delimiter), "])+?");
  }, "safePattern");
  while (i < tokens.length) {
    var char = tryConsume("CHAR");
    var name = tryConsume("NAME");
    var pattern = tryConsume("PATTERN");
    if (name || pattern) {
      var prefix = char || "";
      if (prefixes.indexOf(prefix) === -1) {
        path += prefix;
        prefix = "";
      }
      if (path) {
        result.push(path);
        path = "";
      }
      result.push({
        name: name || key++,
        prefix,
        suffix: "",
        pattern: pattern || safePattern(prefix),
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    var value = char || tryConsume("ESCAPED_CHAR");
    if (value) {
      path += value;
      continue;
    }
    if (path) {
      result.push(path);
      path = "";
    }
    var open = tryConsume("OPEN");
    if (open) {
      var prefix = consumeText();
      var name_1 = tryConsume("NAME") || "";
      var pattern_1 = tryConsume("PATTERN") || "";
      var suffix = consumeText();
      mustConsume("CLOSE");
      result.push({
        name: name_1 || (pattern_1 ? key++ : ""),
        pattern: name_1 && !pattern_1 ? safePattern(prefix) : pattern_1,
        prefix,
        suffix,
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    mustConsume("END");
  }
  return result;
}
__name(parse, "parse");
function match(str, options) {
  var keys = [];
  var re = pathToRegexp(str, keys, options);
  return regexpToFunction(re, keys, options);
}
__name(match, "match");
function regexpToFunction(re, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.decode, decode = _a === void 0 ? function(x) {
    return x;
  } : _a;
  return function(pathname) {
    var m = re.exec(pathname);
    if (!m)
      return false;
    var path = m[0], index = m.index;
    var params = /* @__PURE__ */ Object.create(null);
    var _loop_1 = /* @__PURE__ */ __name(function(i2) {
      if (m[i2] === void 0)
        return "continue";
      var key = keys[i2 - 1];
      if (key.modifier === "*" || key.modifier === "+") {
        params[key.name] = m[i2].split(key.prefix + key.suffix).map(function(value) {
          return decode(value, key);
        });
      } else {
        params[key.name] = decode(m[i2], key);
      }
    }, "_loop_1");
    for (var i = 1; i < m.length; i++) {
      _loop_1(i);
    }
    return { path, index, params };
  };
}
__name(regexpToFunction, "regexpToFunction");
function escapeString(str) {
  return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
__name(escapeString, "escapeString");
function flags(options) {
  return options && options.sensitive ? "" : "i";
}
__name(flags, "flags");
function regexpToRegexp(path, keys) {
  if (!keys)
    return path;
  var groupsRegex = /\((?:\?<(.*?)>)?(?!\?)/g;
  var index = 0;
  var execResult = groupsRegex.exec(path.source);
  while (execResult) {
    keys.push({
      // Use parenthesized substring match if available, index otherwise
      name: execResult[1] || index++,
      prefix: "",
      suffix: "",
      modifier: "",
      pattern: ""
    });
    execResult = groupsRegex.exec(path.source);
  }
  return path;
}
__name(regexpToRegexp, "regexpToRegexp");
function arrayToRegexp(paths, keys, options) {
  var parts = paths.map(function(path) {
    return pathToRegexp(path, keys, options).source;
  });
  return new RegExp("(?:".concat(parts.join("|"), ")"), flags(options));
}
__name(arrayToRegexp, "arrayToRegexp");
function stringToRegexp(path, keys, options) {
  return tokensToRegexp(parse(path, options), keys, options);
}
__name(stringToRegexp, "stringToRegexp");
function tokensToRegexp(tokens, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.strict, strict = _a === void 0 ? false : _a, _b = options.start, start = _b === void 0 ? true : _b, _c = options.end, end = _c === void 0 ? true : _c, _d = options.encode, encode = _d === void 0 ? function(x) {
    return x;
  } : _d, _e = options.delimiter, delimiter = _e === void 0 ? "/#?" : _e, _f = options.endsWith, endsWith = _f === void 0 ? "" : _f;
  var endsWithRe = "[".concat(escapeString(endsWith), "]|$");
  var delimiterRe = "[".concat(escapeString(delimiter), "]");
  var route = start ? "^" : "";
  for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
    var token = tokens_1[_i];
    if (typeof token === "string") {
      route += escapeString(encode(token));
    } else {
      var prefix = escapeString(encode(token.prefix));
      var suffix = escapeString(encode(token.suffix));
      if (token.pattern) {
        if (keys)
          keys.push(token);
        if (prefix || suffix) {
          if (token.modifier === "+" || token.modifier === "*") {
            var mod = token.modifier === "*" ? "?" : "";
            route += "(?:".concat(prefix, "((?:").concat(token.pattern, ")(?:").concat(suffix).concat(prefix, "(?:").concat(token.pattern, "))*)").concat(suffix, ")").concat(mod);
          } else {
            route += "(?:".concat(prefix, "(").concat(token.pattern, ")").concat(suffix, ")").concat(token.modifier);
          }
        } else {
          if (token.modifier === "+" || token.modifier === "*") {
            throw new TypeError('Can not repeat "'.concat(token.name, '" without a prefix and suffix'));
          }
          route += "(".concat(token.pattern, ")").concat(token.modifier);
        }
      } else {
        route += "(?:".concat(prefix).concat(suffix, ")").concat(token.modifier);
      }
    }
  }
  if (end) {
    if (!strict)
      route += "".concat(delimiterRe, "?");
    route += !options.endsWith ? "$" : "(?=".concat(endsWithRe, ")");
  } else {
    var endToken = tokens[tokens.length - 1];
    var isEndDelimited = typeof endToken === "string" ? delimiterRe.indexOf(endToken[endToken.length - 1]) > -1 : endToken === void 0;
    if (!strict) {
      route += "(?:".concat(delimiterRe, "(?=").concat(endsWithRe, "))?");
    }
    if (!isEndDelimited) {
      route += "(?=".concat(delimiterRe, "|").concat(endsWithRe, ")");
    }
  }
  return new RegExp(route, flags(options));
}
__name(tokensToRegexp, "tokensToRegexp");
function pathToRegexp(path, keys, options) {
  if (path instanceof RegExp)
    return regexpToRegexp(path, keys);
  if (Array.isArray(path))
    return arrayToRegexp(path, keys, options);
  return stringToRegexp(path, keys, options);
}
__name(pathToRegexp, "pathToRegexp");

// ../node_modules/wrangler/templates/pages-template-worker.ts
var escapeRegex = /[.+?^${}()|[\]\\]/g;
function* executeRequest(request) {
  const requestPath = new URL(request.url).pathname;
  for (const route of [...routes].reverse()) {
    if (route.method && route.method !== request.method) {
      continue;
    }
    const routeMatcher = match(route.routePath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const mountMatcher = match(route.mountPath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const matchResult = routeMatcher(requestPath);
    const mountMatchResult = mountMatcher(requestPath);
    if (matchResult && mountMatchResult) {
      for (const handler of route.middlewares.flat()) {
        yield {
          handler,
          params: matchResult.params,
          path: mountMatchResult.path
        };
      }
    }
  }
  for (const route of routes) {
    if (route.method && route.method !== request.method) {
      continue;
    }
    const routeMatcher = match(route.routePath.replace(escapeRegex, "\\$&"), {
      end: true
    });
    const mountMatcher = match(route.mountPath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const matchResult = routeMatcher(requestPath);
    const mountMatchResult = mountMatcher(requestPath);
    if (matchResult && mountMatchResult && route.modules.length) {
      for (const handler of route.modules.flat()) {
        yield {
          handler,
          params: matchResult.params,
          path: matchResult.path
        };
      }
      break;
    }
  }
}
__name(executeRequest, "executeRequest");
var pages_template_worker_default = {
  async fetch(originalRequest, env, workerContext) {
    let request = originalRequest;
    const handlerIterator = executeRequest(request);
    let data = {};
    let isFailOpen = false;
    const next = /* @__PURE__ */ __name(async (input, init) => {
      if (input !== void 0) {
        let url = input;
        if (typeof input === "string") {
          url = new URL(input, request.url).toString();
        }
        request = new Request(url, init);
      }
      const result = handlerIterator.next();
      if (result.done === false) {
        const { handler, params, path } = result.value;
        const context = {
          request: new Request(request.clone()),
          functionPath: path,
          next,
          params,
          get data() {
            return data;
          },
          set data(value) {
            if (typeof value !== "object" || value === null) {
              throw new Error("context.data must be an object");
            }
            data = value;
          },
          env,
          waitUntil: workerContext.waitUntil.bind(workerContext),
          passThroughOnException: () => {
            isFailOpen = true;
          }
        };
        const response = await handler(context);
        if (!(response instanceof Response)) {
          throw new Error("Your Pages function should return a Response");
        }
        return cloneResponse(response);
      } else if ("ASSETS") {
        const response = await env["ASSETS"].fetch(request);
        return cloneResponse(response);
      } else {
        const response = await fetch(request);
        return cloneResponse(response);
      }
    }, "next");
    try {
      return await next();
    } catch (error) {
      if (isFailOpen) {
        const response = await env["ASSETS"].fetch(request);
        return cloneResponse(response);
      }
      throw error;
    }
  }
};
var cloneResponse = /* @__PURE__ */ __name((response) => (
  // https://fetch.spec.whatwg.org/#null-body-status
  new Response(
    [101, 204, 205, 304].includes(response.status) ? null : response.body,
    response
  )
), "cloneResponse");
export {
  pages_template_worker_default as default
};
