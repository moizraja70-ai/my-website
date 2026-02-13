## 2025-05-15 - Cloudflare Functions Input Validation
**Vulnerability:** The `openai.ts` function directly passed user input to the OpenAI API without structural validation or size limits.
**Learning:** Cloudflare Pages Functions do not have built-in request validation middleware by default. Each function must manually validate deep JSON structures.
**Prevention:** Use a shared validation utility or schema library (like Zod) for all API endpoints to enforce input constraints before processing.
