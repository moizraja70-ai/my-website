type QuotaTier = "standard" | "premium";

// Minimal Durable Object state typing (avoids needing @cloudflare/workers-types in the main app tsconfig).
type DurableObjectStateLike = {
  storage: {
    get<T>(key: string): Promise<T | undefined>;
    put(key: string, value: unknown): Promise<void>;
    put(values: Record<string, unknown>): Promise<void>;
  };
};

type QuotaState = {
  day: string;
  standardUsed: number;
  premiumUsed: number;
};

const jsonResponse = (status: number, payload: Record<string, unknown>) => {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store"
    }
  });
};

const getUtcDay = () => new Date().toISOString().slice(0, 10);

const parseTier = (value: unknown): QuotaTier | null => {
  const v = String(value || "").toLowerCase();
  if (v === "standard") return "standard";
  if (v === "premium") return "premium";
  return null;
};

const parseTokenDelta = (value: unknown): number | null => {
  const n = typeof value === "string" ? Number.parseInt(value, 10) : typeof value === "number" ? value : NaN;
  if (!Number.isFinite(n) || n < 0) return null;
  return Math.floor(n);
};

export class AIQuota {
  private state: DurableObjectStateLike;

  constructor(state: DurableObjectStateLike) {
    this.state = state;
  }

  private async loadAndMaybeReset(): Promise<QuotaState> {
    const today = getUtcDay();

    const storedDay = (await this.state.storage.get<string>("day")) || "";
    const storedStandard = (await this.state.storage.get<number>("standard_used")) ?? 0;
    const storedPremium = (await this.state.storage.get<number>("premium_used")) ?? 0;

    if (storedDay !== today) {
      const reset: QuotaState = { day: today, standardUsed: 0, premiumUsed: 0 };
      await this.state.storage.put({
        day: reset.day,
        standard_used: reset.standardUsed,
        premium_used: reset.premiumUsed
      });
      return reset;
    }

    return {
      day: storedDay,
      standardUsed: Number.isFinite(storedStandard) && storedStandard > 0 ? Math.floor(storedStandard) : 0,
      premiumUsed: Number.isFinite(storedPremium) && storedPremium > 0 ? Math.floor(storedPremium) : 0
    };
  }

  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;

    if (request.method === "GET" && path === "/status") {
      const tier = parseTier(url.searchParams.get("tier"));
      if (!tier) return jsonResponse(400, { error: "INVALID_TIER" });

      const state = await this.loadAndMaybeReset();
      const used = tier === "premium" ? state.premiumUsed : state.standardUsed;
      return jsonResponse(200, { day: state.day, used });
    }

    if (request.method === "POST" && path === "/add") {
      const body: any = await request.json().catch(() => null);
      const tier = parseTier(body?.tier);
      const tokens = parseTokenDelta(body?.tokens);

      if (!tier) return jsonResponse(400, { error: "INVALID_TIER" });
      if (tokens === null) return jsonResponse(400, { error: "INVALID_TOKENS" });

      const state = await this.loadAndMaybeReset();
      if (tokens === 0) {
        const used = tier === "premium" ? state.premiumUsed : state.standardUsed;
        return jsonResponse(200, { day: state.day, used });
      }

      if (tier === "premium") {
        const next = state.premiumUsed + tokens;
        await this.state.storage.put("premium_used", next);
        return jsonResponse(200, { day: state.day, used: next });
      }

      const next = state.standardUsed + tokens;
      await this.state.storage.put("standard_used", next);
      return jsonResponse(200, { day: state.day, used: next });
    }

    return jsonResponse(404, { error: "NOT_FOUND" });
  }
}

export default {
  // Optional health endpoint; DO is the primary feature of this Worker.
  fetch() {
    return new Response("AI quota worker (Durable Object).", {
      status: 200,
      headers: { "Content-Type": "text/plain; charset=utf-8" }
    });
  }
};
