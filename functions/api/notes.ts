import { NOTES } from "../../data/notesData";
import { ANATOMY_NOTES } from "../../data/anatomyNotes";

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

type SubjectKey = "dental_materials" | "general_embryology" | "anatomy";
type DentalTopicKey = keyof typeof NOTES.dental_materials;
type AnatomyTopicKey = keyof typeof ANATOMY_NOTES;

const normalize = (value: string) => value.trim().toLowerCase();

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

const resolveDentalTopicKey = (topic: string): DentalTopicKey | null => {
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

  const normalizedKey = t.replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");
  if (normalizedKey in NOTES.dental_materials) {
    return normalizedKey as DentalTopicKey;
  }

  return null;
};

const resolveAnatomyTopicKey = (topic: string): AnatomyTopicKey | null => {
  const t = normalize(topic);

  if (t.includes("skull bone") || t.includes("sutures")) return "skull_bones";
  if (t.includes("mandible")) return "mandible";
  if (t.includes("maxilla")) return "maxilla";
  if (t.includes("zygomatic") || t.includes("cheekbone")) return "zygomatic";
  if (t.includes("sphenoid")) return "sphenoid";
  if (t.includes("ethmoid")) return "ethmoid";
  if (t.includes("foramina") || t.includes("fossae")) return "foramina_fossae";
  if (t.includes("osteology") || t.includes("fracture")) return "osteology";

  const normalizedKey = t.replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");
  if (normalizedKey in ANATOMY_NOTES) {
    return normalizedKey as AnatomyTopicKey;
  }

  return null;
};

const handleNotes = async (request: Request) => {
  const { subject, topic } = await parseRequest(request);
  if (!subject) {
    return jsonResponse(400, { error: "Missing subject." });
  }

  const subjectKey = resolveSubjectKey(subject);
  if (!subjectKey) {
    return jsonResponse(400, { error: "Unsupported subject." });
  }

  if (subjectKey === "general_embryology") {
    const note = NOTES.general_embryology.summary;
    return jsonResponse(200, {
      subject: "General Embryology",
      topic: topic || "Summary",
      content: note.content,
      keyPoints: note.keyPoints
    });
  }

  if (subjectKey === "anatomy") {
    if (!topic) {
      return jsonResponse(400, { error: "Missing topic." });
    }

    const topicKey = resolveAnatomyTopicKey(topic);
    if (!topicKey) {
      return jsonResponse(404, { error: "Notes not found." });
    }

    const note = ANATOMY_NOTES[topicKey];
    return jsonResponse(200, {
      subject: "Anatomy",
      topic,
      content: note.content,
      keyPoints: note.keyPoints
    });
  }

  if (!topic) {
    return jsonResponse(400, { error: "Missing topic." });
  }

  const topicKey = resolveDentalTopicKey(topic);
  if (!topicKey) {
    return jsonResponse(404, { error: "Notes not found." });
  }

  const note = NOTES.dental_materials[topicKey];
  return jsonResponse(200, {
    subject: "Dental Materials",
    topic,
    content: note.content,
    keyPoints: note.keyPoints
  });
};

export const onRequestOptions: PagesFunction = () => {
  return new Response(null, { status: 204, headers: corsHeaders });
};

export const onRequestGet: PagesFunction = async ({ request }) => {
  return handleNotes(request);
};

export const onRequestPost: PagesFunction = async ({ request }) => {
  return handleNotes(request);
};
