# AI Quota Durable Object

This Worker provides a Durable Object (`AIQuota`) used by the Cloudflare Pages
Functions AI proxy to enforce shared daily token limits across all users.

## Deploy

From the repo root:

```powershell
cd workers/ai-quota
npx wrangler deploy
```

## Bind In Cloudflare Pages

In your Cloudflare Pages project:

1. Settings -> Functions -> Durable Objects
2. Add binding:
   - Name: `AI_QUOTA`
   - Class: `AIQuota` (from this worker/namespace)

## Endpoints (DO internal)

The Pages function calls the DO instance via:

- `GET /status?tier=standard|premium`
- `POST /add` with JSON `{ "tier": "standard|premium", "tokens": <int> }`

