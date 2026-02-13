
// scripts/test-openai-security.ts

// MOCK GLOBALS
class MockResponse {
  body: any;
  status: number;
  headers: Map<string, string>;
  ok: boolean;

  constructor(body: any, init: any = {}) {
    this.body = body;
    this.status = init.status || 200;
    this.ok = this.status >= 200 && this.status < 300;
    this.headers = new Map(Object.entries(init.headers || {}));
  }
  async json() { return typeof this.body === 'string' ? JSON.parse(this.body) : this.body; }
  async text() { return typeof this.body === 'string' ? this.body : JSON.stringify(this.body); }
}

class MockRequest {
  url: string;
  method: string;
  headers: Map<string, string>;
  body: any;

  constructor(url: string, init: any = {}) {
    this.url = url;
    this.method = init.method || 'GET';
    this.headers = new Map(Object.entries(init.headers || {}));
    this.body = init.body;
  }
  async json() { return JSON.parse(this.body); }
}

globalThis.Response = MockResponse as any;
globalThis.Request = MockRequest as any;

// MOCK FETCH
const mockFetch: any = async (url: any, init: any) => {
  const u = String(url);

  // Supabase Auth Mock
  if (u.includes('/auth/v1/user')) {
    return new MockResponse({ id: 'test-user-id' }, { status: 200 });
  }

  // Supabase Profile Mock
  if (u.includes('/rest/v1/profiles')) {
    return new MockResponse([{ role: 'user', is_subscribed: true, subscription_end_date: 'Infinity' }], { status: 200 });
  }

  // OpenAI API Mock
  if (u.includes('api.openai.com/v1/chat/completions')) {
     // Return success
     return new MockResponse({
       choices: [{ message: { content: "Mocked OpenAI Response" } }]
     }, { status: 200 });
  }

  return new MockResponse({ error: 'Not Found' }, { status: 404 });
};
globalThis.fetch = mockFetch;

import { onRequestPost } from '../functions/api/openai';

async function runTests() {
  const env = {
    OPENAI_API_KEY: 'sk-test',
    SUPABASE_URL: 'https://test.supabase.co',
    SUPABASE_ANON_KEY: 'test-anon-key',
    SUPABASE_SERVICE_ROLE_KEY: 'test-service-key'
  };

  const makeRequest = async (messages: any) => {
    const req = new MockRequest('https://api.dentedge.com/api/openai', {
      method: 'POST',
      headers: { 'Authorization': 'Bearer user-token', 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages })
    });
    // Call the function
    return await onRequestPost({ request: req as any, env, params: {}, data: {}, next: async () => new MockResponse(null) });
  };

  console.log("Running Security Tests...");
  let passed = 0;
  let failed = 0;

  const assert = (condition: boolean, msg: string) => {
    if (condition) {
      console.log(`✅ PASS: ${msg}`);
      passed++;
    } else {
      console.error(`❌ FAIL: ${msg}`);
      failed++;
    }
  };

  // Test 1: Valid Request
  try {
    const res = await makeRequest([{ role: 'user', content: 'Hello' }]);
    const data = await res.json();
    assert(res.status === 200 && data.text === "Mocked OpenAI Response", "Valid request should succeed");
  } catch (e) {
    assert(false, `Valid request threw error: ${e}`);
  }

  // Test 2: Invalid Messages (Not Array)
  try {
    const res = await makeRequest("not-an-array");
    assert(res.status === 400, "Should reject non-array messages");
  } catch (e) {
    assert(false, `Test 2 threw: ${e}`);
  }

  // Test 3: Invalid Role (should fail with 400 if validation is added, currently might pass)
  try {
    const res = await makeRequest([{ role: 'hacker', content: 'Hello' }]);
    if (res.status === 400) {
        assert(true, "Rejected invalid role");
    } else {
        console.log(`⚠️  Allowed invalid role (Status: ${res.status}) - Expected for now`);
        // We count this as fail for the FINAL verification, but for now we note it.
        // Actually, my plan says "Expect Failure". So I should assert strict compliance.
        assert(false, "Should reject invalid role");
    }
  } catch (e) {
     assert(false, `Test 3 threw: ${e}`);
  }

  // Test 4: Missing Content
  try {
    const res = await makeRequest([{ role: 'user' }]); // missing content
    if (res.status === 400) {
        assert(true, "Rejected missing content");
    } else {
        assert(false, "Should reject missing content");
    }
  } catch (e) { assert(false, `Test 4 threw: ${e}`); }

  // Test 5: Too Many Messages (>50)
  try {
    const hugeHistory = Array(51).fill({ role: 'user', content: 'x' });
    const res = await makeRequest(hugeHistory);
    if (res.status === 400) {
        assert(true, "Rejected > 50 messages");
    } else {
        assert(false, "Should reject > 50 messages");
    }
  } catch (e) { assert(false, `Test 5 threw: ${e}`); }

  // Test 6: Content Too Long (>20k chars)
  try {
    const longContent = 'a'.repeat(20001);
    const res = await makeRequest([{ role: 'user', content: longContent }]);
    if (res.status === 400) {
        assert(true, "Rejected content > 20k chars");
    } else {
        assert(false, "Should reject content > 20k chars");
    }
  } catch (e) { assert(false, `Test 6 threw: ${e}`); }

  console.log(`\nSummary: ${passed} Passed, ${failed} Failed`);
  if (failed > 0) process.exit(1);
}

runTests().catch(e => {
    console.error(e);
    process.exit(1);
});
