# DentEdge Cloudflare Fix & Project Summary

## 1. Project Summary (What has been built)
- **High-Yield MCQs**: Integrated modules for Amalgam, Cements, Metals, Gypsum, etc.
- **AI Dental Tutor**: OpenAI-powered AI (via server-side proxy) capable of answering clinical questions.
- **Glassmorphism Design**: Professional dark-mode interface with translucent panels.
- **Dashboard**: Advanced progress analytics for FCPS Part 1.

## 2. Why your build may fail
Cloudflare sees this on your GitHub:
`[Your Repo Name] / dentedge / package.json`

Cloudflare **wants** to see this:
`[Your Repo Name] / package.json`

## 3. The "In Front" Fix
In your Cloudflare Pages Dashboard, change this one setting:
1. Go to **Settings** -> **Build & deployments**.
2. Click **Configure build settings**.
3. Change **Root Directory** to: `/dentedge`
4. Change **Build Output Directory** to: `dist`
5. **Save and Deploy**.

## 4. Deployment Methods

> **WARNING: Do NOT use Cloudflare "Direct Upload" (drag-and-drop of the dist folder).**
> Direct Upload only deploys static files. The server-side API proxy
> (`functions/api/openai.ts`) lives outside `dist/` and will NOT be included.
> This causes `/api/openai` to return 404, breaking all AI features.

### Option A: Git Integration (Recommended)
Connect your GitHub repository to Cloudflare Pages. Cloudflare will automatically
build and deploy both the static site (`dist/`) and the Pages Functions
(`functions/`) on every push.

### Option B: Wrangler CLI
```bash
npm run build
npx wrangler pages deploy dist
```
Wrangler automatically detects and deploys the `functions/` directory alongside
`dist/`, so the `/api/openai` endpoint will work correctly.

## 5. Setting Up the OpenAI API Key
The AI tutor requires an `OPENAI_API_KEY` set as a **server-side secret** (NOT a build variable):
1. In Cloudflare Pages, go to **Settings → Environment variables**.
2. Add variable: Name = `OPENAI_API_KEY`, Value = your OpenAI key.
3. Set it for both **Production** and **Preview** environments.
4. Mark it as **Encrypted/Secret**.
5. **Redeploy** after adding the secret.

> **Important:** Never use `VITE_OPENAI_API_KEY` — any `VITE_` prefixed variable
> gets embedded in the client-side JavaScript and is visible to anyone.

## 6. Verifying the AI Proxy Works
After deploying, visit `https://your-site.pages.dev/api/openai` in your browser.
- If you see `{"error":"Expected messages array"}` → the proxy IS deployed (good).
- If you see a 404 page → the `functions/` directory was not deployed (check steps above).

---
**Build Success Checklist:**
- [x] `vite.config.ts` updated for Cloudflare.
- [x] `package.json` verified with correct build scripts.
- [x] Asset paths set to standard root `/`.
- [x] `functions/api/openai.ts` deployed (NOT using Direct Upload).
- [x] `OPENAI_API_KEY` set as server-side secret in Cloudflare environment variables.

## 7. Database Setup (Supabase)
If you are seeing "Content unavailable", you likely need to set up the database.
Please refer to `SETUP.md` for instructions on creating the table and seeding the notes data.
