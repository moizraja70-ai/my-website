## 2025-02-27 - [Missing Input Validation in OpenAI Proxy]
**Vulnerability:** The `functions/api/openai.ts` endpoint was forwarding the `messages` array directly to OpenAI without any structural or content validation.
**Learning:** Cloudflare Functions are often treated as simple pass-through proxies, leading developers to skip traditional backend validation steps.
**Prevention:** Implement a strict `validateMessages` helper that enforces array structure, role validity (system, user, assistant), content type (string), message count limits (max 50), and total character limits (max 20k) before proxying requests.
