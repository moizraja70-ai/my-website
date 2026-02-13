# AI Chat Configuration (Disabled)

Status: Disabled in UI on 2026-02-04.

Model:
- `gemini-2.5-flash-lite`

Tutor behavior:
- Progressive disclosure (short answers, user-led depth).
- No quiz mode by default.

Chat context:
- Uses only the last 3 messages.
- Summaries disabled to minimize API usage.

API key handling:
- Supports optional user key stored in browser localStorage.
- Falls back to `VITE_GEMINI_API_KEY` if no user key is set.

Primary files (if you want to re-enable later):
- `services/geminiService.ts`
- `components/AIChatView.tsx`
- `components/AIAssistant.tsx`
- `App.tsx`
- `types.ts`

Re-enable steps (high level):
1. Add `ai-chat` back to `ViewMode` in `types.ts`.
2. Restore `AIChatView` and `AIAssistant` imports and view rendering in `App.tsx`.
3. Add a navigation entry to open the AI chat view.
