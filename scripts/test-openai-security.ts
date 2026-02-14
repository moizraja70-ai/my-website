
import { onRequestPost } from '../functions/api/openai';

// Mock Types
type MockFetch = (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;

// Global Setup
const originalFetch = global.fetch;
let fetchCalls: { url: string; method: string; body: any }[] = [];

// Mock Fetch Implementation
const mockFetch: MockFetch = async (input, init) => {
  const url = input.toString();
  const method = init?.method || 'GET';
  let body: any = null;
  if (init?.body) {
    try {
      body = JSON.parse(init.body as string);
    } catch {
      body = init.body;
    }
  }

  fetchCalls.push({ url, method, body });

  // Mock Supabase Auth User Check
  if (url.includes('/auth/v1/user')) {
    return new Response(JSON.stringify({ id: 'test-user-id' }), { status: 200 });
  }

  // Mock Supabase Profile Check
  if (url.includes('/rest/v1/profiles')) {
    return new Response(JSON.stringify([{ role: 'user', is_subscribed: true }]), { status: 200 });
  }

  // Mock Quota Check
  if (url.includes('ai-quota/status')) {
    return new Response(JSON.stringify({ day: '2023-10-27', used: 0 }), { status: 200 });
  }

  // Mock Quota Add
  if (url.includes('ai-quota/add')) {
    return new Response(JSON.stringify({ day: '2023-10-27', used: 100 }), { status: 200 });
  }

  // Mock OpenAI API
  if (url.includes('api.openai.com/v1/chat/completions')) {
    return new Response(JSON.stringify({
      choices: [{ message: { content: 'This is a mocked response.' } }],
      usage: { total_tokens: 10 }
    }), { status: 200 });
  }

  return new Response(null, { status: 404 });
};

// Install Mocks
global.fetch = mockFetch as any;
// Ensure Response is available globally
if (!global.Response) {
  (global as any).Response = class Response {
    constructor(body: any, init: any) {
        this.body = body;
        this.status = init?.status || 200;
        this.headers = new Map(Object.entries(init?.headers || {}));
    }
    async json() { return JSON.parse(this.body); }
    async text() { return this.body; }
  }
}

// Env Mock
const env = {
  SUPABASE_URL: 'https://test.supabase.co',
  SUPABASE_ANON_KEY: 'test-anon-key',
  OPENAI_API_KEY: 'test-openai-key',
  AI_DAILY_TOKEN_LIMIT_STANDARD: '1000',
  AI_QUOTA: {
    idFromName: () => 'id',
    get: (id: any) => ({
      fetch: mockFetch
    })
  }
};

async function runTest() {
  console.log('--- Starting OpenAI Security Fix Verification ---');

  // Reset fetch calls
  fetchCalls = [];

  // 1. Valid Request (Control Case)
  console.log('\nTest 1: Sending Valid Request...');
  const validReq = new Request('https://api.example.com/openai', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer test-token'
    },
    body: JSON.stringify({
      messages: [{ role: 'user', content: 'Hello' }]
    })
  });

  const res1 = await onRequestPost({ request: validReq, env: env as any, params: {}, waitUntil: () => {}, next: () => {}, data: {} } as any);
  console.log('Result 1 status:', res1.status);

  const openaiCall1 = fetchCalls.find(c => c.url.includes('api.openai.com'));
  if (openaiCall1 && res1.status === 200) {
    console.log('✅ Control case passed: Valid request processed correctly.');
  } else {
    console.error(`❌ Control case failed: Status ${res1.status}, OpenAI called: ${!!openaiCall1}`);
  }

  // 2. Invalid Request: Missing Role
  console.log('\nTest 2: Sending Invalid Request (Missing Role)...');
  fetchCalls = []; // Reset
  const invalidReq = new Request('https://api.example.com/openai', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer test-token'
    },
    body: JSON.stringify({
      messages: [{ content: 'Missing role' }] // Invalid: missing 'role'
    })
  });

  const res2 = await onRequestPost({ request: invalidReq, env: env as any, params: {}, waitUntil: () => {}, next: () => {}, data: {} } as any);
  console.log('Result 2 status:', res2.status);
  const json2 = await res2.json();
  console.log('Result 2 error:', (json2 as any).error);

  const openaiCall2 = fetchCalls.find(c => c.url.includes('api.openai.com'));
  if (!openaiCall2 && res2.status === 400) {
    console.log('✅ Security Test Passed: Invalid message (missing role) blocked.');
  } else {
    console.error(`❌ Security Test Failed: Status ${res2.status}, OpenAI called: ${!!openaiCall2}`);
  }

  // 3. Invalid Request: Huge Content
  console.log('\nTest 3: Sending Invalid Request (Huge Content)...');
  fetchCalls = []; // Reset
  const hugeContent = 'a'.repeat(25000); // 25k chars
  const hugeReq = new Request('https://api.example.com/openai', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer test-token'
    },
    body: JSON.stringify({
      messages: [{ role: 'user', content: hugeContent }]
    })
  });

  const res3 = await onRequestPost({ request: hugeReq, env: env as any, params: {}, waitUntil: () => {}, next: () => {}, data: {} } as any);
  console.log('Result 3 status:', res3.status);
  const json3 = await res3.json();
  console.log('Result 3 error:', (json3 as any).error);

  const openaiCall3 = fetchCalls.find(c => c.url.includes('api.openai.com'));
  if (!openaiCall3 && res3.status === 400) {
    console.log('✅ Security Test Passed: Huge message (25k chars) blocked.');
  } else {
    console.error(`❌ Security Test Failed: Status ${res3.status}, OpenAI called: ${!!openaiCall3}`);
  }

  // 4. Invalid Request: Too Many Messages
  console.log('\nTest 4: Sending Invalid Request (Too Many Messages)...');
  fetchCalls = []; // Reset
  const manyMessages = Array(55).fill({ role: 'user', content: 'hi' });
  const manyReq = new Request('https://api.example.com/openai', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer test-token'
    },
    body: JSON.stringify({
      messages: manyMessages
    })
  });

  const res4 = await onRequestPost({ request: manyReq, env: env as any, params: {}, waitUntil: () => {}, next: () => {}, data: {} } as any);
  console.log('Result 4 status:', res4.status);
  const json4 = await res4.json();
  console.log('Result 4 error:', (json4 as any).error);

  const openaiCall4 = fetchCalls.find(c => c.url.includes('api.openai.com'));
  if (!openaiCall4 && res4.status === 400) {
    console.log('✅ Security Test Passed: Too many messages blocked.');
  } else {
    console.error(`❌ Security Test Failed: Status ${res4.status}, OpenAI called: ${!!openaiCall4}`);
  }

  // 5. Invalid Request: Invalid Role
  console.log('\nTest 5: Sending Invalid Request (Invalid Role)...');
  fetchCalls = []; // Reset
  const invalidRoleReq = new Request('https://api.example.com/openai', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer test-token'
    },
    body: JSON.stringify({
      messages: [{ role: 'hacker', content: 'hello' }]
    })
  });

  const res5 = await onRequestPost({ request: invalidRoleReq, env: env as any, params: {}, waitUntil: () => {}, next: () => {}, data: {} } as any);
  console.log('Result 5 status:', res5.status);
  const json5 = await res5.json();
  console.log('Result 5 error:', (json5 as any).error);

  const openaiCall5 = fetchCalls.find(c => c.url.includes('api.openai.com'));
  if (!openaiCall5 && res5.status === 400) {
    console.log('✅ Security Test Passed: Invalid role blocked.');
  } else {
    console.error(`❌ Security Test Failed: Status ${res5.status}, OpenAI called: ${!!openaiCall5}`);
  }

  console.log('\n--- Verification Complete ---');
}

runTest().catch(console.error);
