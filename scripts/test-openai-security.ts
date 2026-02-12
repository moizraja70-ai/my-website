
// Minimal polyfill for Cloudflare Workers environment
if (!globalThis.Response) {
  globalThis.Response = class Response {
    body: any;
    status: number;
    headers: Headers;
    ok: boolean;
    constructor(body: any, init: any = {}) {
      this.body = body;
      this.status = init.status || 200;
      this.ok = this.status >= 200 && this.status < 300;
      this.headers = new Headers(init.headers);
    }
    async json() { return JSON.parse(this.body); }
    async text() { return this.body; }
  } as any;
}

if (!globalThis.Headers) {
  globalThis.Headers = class Headers {
    map: Map<string, string>;
    constructor(init: any) {
      this.map = new Map(Object.entries(init || {}));
    }
    get(key: string) { return this.map.get(key) || null; }
    set(key: string, value: string) { this.map.set(key, value); }
    [Symbol.iterator]() { return this.map.entries(); }
  } as any;
}

// Mock env
const env = {
  OPENAI_API_KEY: 'test-key',
  SUPABASE_URL: 'https://test.supabase.co',
  SUPABASE_ANON_KEY: 'test-anon',
  SUPABASE_SERVICE_ROLE_KEY: 'test-service',
  OPENAI_ALLOWED_MODELS: 'gpt-4o-mini'
};

// We need to import the function.
// Since we are running with tsx, we can import .ts files directly.
import { onRequestPost } from '../functions/api/openai';

// Mock fetch to spy on calls
const fetchSpy = {
  calls: [] as { url: string, init: RequestInit }[]
};

globalThis.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
  const url = input.toString();
  fetchSpy.calls.push({ url, init: init || {} });

  if (url.includes('/auth/v1/user')) {
    return new Response(JSON.stringify({ id: 'user-123' }), { status: 200 });
  }
  if (url.includes('/rest/v1/profiles')) {
    return new Response(JSON.stringify([{ role: 'user', is_subscribed: true, subscription_end_date: 'Infinity' }]), { status: 200 });
  }
  if (url.includes('api.openai.com')) {
    return new Response(JSON.stringify({
      choices: [{ message: { content: 'Mock response' } }]
    }), { status: 200 });
  }
  return new Response('Not Found', { status: 404 });
};

async function runTest(name: string, payload: any, expectedStatus: number, errorMatch?: string) {
  // Reset spy
  fetchSpy.calls = [];

  const request = {
    method: 'POST',
    url: 'https://example.com/api/openai',
    headers: new Headers({ 'Authorization': 'Bearer token', 'Content-Type': 'application/json' }),
    json: async () => payload,
  };

  const context = {
    request,
    env,
    params: {},
    waitUntil: () => {},
    next: () => {},
    data: {},
  };

  try {
    const res = await onRequestPost(context as any);
    const data = await res.json().catch(() => ({}));

    if (res.status !== expectedStatus) {
      console.log(`❌ [FAIL] ${name}: Expected status ${expectedStatus}, got ${res.status}`);
      return false;
    }

    if (errorMatch && (!data.error || !data.error.includes(errorMatch))) {
      console.log(`❌ [FAIL] ${name}: Expected error containing "${errorMatch}", got "${data.error}"`);
      return false;
    }

    console.log(`✅ [PASS] ${name}`);
    return true;

  } catch (err) {
    console.log(`❌ [FAIL] ${name}: Exception`, err);
    return false;
  }
}

async function main() {
  console.log('--- Starting OpenAI Security Tests ---');

  // Test 1: Valid Request
  await runTest('Valid Request', {
    messages: [{ role: 'user', content: 'Hello' }]
  }, 200);

  // Test 2: Invalid Role (should fail with fix, currently passes)
  // Current code does not check role, so mock OpenAI would receive it.
  // We want to assert that it FAILS (400)
  const roleCheck = await runTest('Invalid Role', {
    messages: [{ role: 'invalid_role', content: 'Hello' }]
  }, 400, 'Invalid role');
  if (!roleCheck) console.log('   (This is expected failure before fix)');

  // Test 3: Content not string (should fail with fix, currently passes)
  const contentCheck = await runTest('Content Not String', {
    messages: [{ role: 'user', content: 12345 }]
  }, 400, 'Content must be a string');
  if (!contentCheck) console.log('   (This is expected failure before fix)');

  // Test 4: Content too long (should fail with fix, currently passes)
  const longContent = 'a'.repeat(20001);
  const lengthCheck = await runTest('Content Too Long', {
    messages: [{ role: 'user', content: longContent }]
  }, 400, 'exceeds limit');
  if (!lengthCheck) console.log('   (This is expected failure before fix)');

  // Test 5: Too many messages (should be truncated)
  // We check if fetch to OpenAI only has 50 messages
  fetchSpy.calls = []; // reset
  const manyMessages = Array.from({ length: 60 }, (_, i) => ({ role: 'user', content: `msg ${i}` }));
  await runTest('Many Messages (Truncation)', { messages: manyMessages }, 200);

  const openAICall = fetchSpy.calls.find(c => c.url.includes('api.openai.com'));
  if (openAICall) {
    const body = JSON.parse(openAICall.init.body as string);
    if (body.messages.length === 50) {
      console.log('✅ [PASS] Truncation Logic: Sent 50 messages');
    } else {
      console.log(`❌ [FAIL] Truncation Logic: Sent ${body.messages.length} messages (Expected 50)`);
    }
  } else {
    console.log('❌ [FAIL] Truncation Logic: OpenAI not called');
  }

  console.log('--- Tests Completed ---');
}

main();
