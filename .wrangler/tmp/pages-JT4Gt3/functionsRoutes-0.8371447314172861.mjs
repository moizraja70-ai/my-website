import { onRequestGet as __api_notes_ts_onRequestGet } from "C:\\Users\\b\\Downloads\\dentedge\\my-website\\functions\\api\\notes.ts"
import { onRequestOptions as __api_notes_ts_onRequestOptions } from "C:\\Users\\b\\Downloads\\dentedge\\my-website\\functions\\api\\notes.ts"
import { onRequestPost as __api_notes_ts_onRequestPost } from "C:\\Users\\b\\Downloads\\dentedge\\my-website\\functions\\api\\notes.ts"
import { onRequestOptions as __api_openai_ts_onRequestOptions } from "C:\\Users\\b\\Downloads\\dentedge\\my-website\\functions\\api\\openai.ts"
import { onRequestPost as __api_openai_ts_onRequestPost } from "C:\\Users\\b\\Downloads\\dentedge\\my-website\\functions\\api\\openai.ts"

export const routes = [
    {
      routePath: "/api/notes",
      mountPath: "/api",
      method: "GET",
      middlewares: [],
      modules: [__api_notes_ts_onRequestGet],
    },
  {
      routePath: "/api/notes",
      mountPath: "/api",
      method: "OPTIONS",
      middlewares: [],
      modules: [__api_notes_ts_onRequestOptions],
    },
  {
      routePath: "/api/notes",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_notes_ts_onRequestPost],
    },
  {
      routePath: "/api/openai",
      mountPath: "/api",
      method: "OPTIONS",
      middlewares: [],
      modules: [__api_openai_ts_onRequestOptions],
    },
  {
      routePath: "/api/openai",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_openai_ts_onRequestPost],
    },
  ]