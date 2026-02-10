## 2026-02-10 - OpenAI Proxy Enforcement Bypass
**Vulnerability:** The OpenAI proxy function blindly forwarded client-provided `model` and `messages` parameters without validation. This allowed clients to request expensive models (e.g., GPT-4) and send massive message histories, bypassing intended limits.
**Learning:** Cloudflare Functions acting as API proxies often default to "pass-through" behavior, creating a dangerous gap between client-side intent (security by obscurity) and server-side enforcement.
**Prevention:** Always hardcode critical parameters (like model selection) server-side and strictly validate payload structure (like message history length) before proxying to paid services.
