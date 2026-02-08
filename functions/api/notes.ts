import { IMPRESSION_KEY_POINTS, IMPRESSION_MATERIALS_NOTES } from "../../data/impressionMaterialsNotes";

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

const handleNotes = async (request: Request) => {
  const { subject, topic } = await parseRequest(request);
  if (!subject || !topic) {
    return jsonResponse(400, { error: "Missing subject or topic." });
  }

  const subjectLower = subject.toLowerCase();
  if (!subjectLower.includes("dental materials")) {
    return jsonResponse(400, { error: "Unsupported subject." });
  }

  if (!topic.toLowerCase().includes("impression")) {
    return jsonResponse(404, { error: "Notes not found." });
  }

  return jsonResponse(200, {
    subject: "Dental Materials",
    topic,
    content: IMPRESSION_MATERIALS_NOTES,
    keyPoints: IMPRESSION_KEY_POINTS
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
