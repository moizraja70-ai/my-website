import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface AIAssistantProps {
  pageContext?: string;
}

interface ChatMessage {
  role: 'user' | 'ai';
  text: string;
  suggestedQuestions?: string[];
}

interface AIModel {
  id: string;
  name: string;
  description: string;
  tier: 'Premium' | 'Standard';
  dailyLimit: string;
  dailyLimitNote: string;
}

/* ------------------------------------------------------------------ */
/*  Constants & helpers                                                 */
/* ------------------------------------------------------------------ */

const AI_MODELS: AIModel[] = [
  {
    id: 'gpt-5-2',
    name: 'ChatGPT 5.2',
    description: 'Latest and most powerful model',
    tier: 'Premium',
    dailyLimit: '250K tokens/day (shared)',
    dailyLimitNote: 'Shared with: GPT-5.1, GPT-4.1, GPT-4o, o1, o3',
  },
  {
    id: 'gpt-4o',
    name: 'GPT-4o',
    description: 'Most capable, best for complex queries',
    tier: 'Premium',
    dailyLimit: '250K tokens/day (shared)',
    dailyLimitNote: 'Shared with: GPT-5.2, GPT-5.1, GPT-4.1, o1, o3',
  },
  {
    id: 'gpt-4-turbo',
    name: 'GPT-4 Turbo',
    description: 'High performance, good for analysis',
    tier: 'Premium',
    dailyLimit: '250K tokens/day (shared)',
    dailyLimitNote: 'Shared with: GPT-5.2, GPT-5.1, GPT-4.1, GPT-4o, o1, o3',
  },
  {
    id: 'gpt-4o-mini',
    name: 'GPT-4o Mini',
    description: 'Fast and efficient, recommended',
    tier: 'Standard',
    dailyLimit: '2.5M tokens/day (shared)',
    dailyLimitNote: 'Shared with: GPT-5-mini, o1-mini, o3-mini, codex-mini',
  },
  {
    id: 'gpt-3.5-turbo',
    name: 'GPT-3.5 Turbo',
    description: 'Quick responses, basic queries',
    tier: 'Standard',
    dailyLimit: '2.5M tokens/day (shared)',
    dailyLimitNote: 'Shared with: GPT-5-mini, o1-mini, o3-mini, codex-mini',
  },
];

const DEFAULT_MODEL = 'gpt-4o-mini';

const getModelDisplayName = (modelId: string): string => {
  const model = AI_MODELS.find((m) => m.id === modelId);
  return model?.name || modelId;
};

/** Generate contextual follow-up suggestions based on the AI response. */
const getSuggestedQuestions = (responseText: string): string[] => {
  const suggestions: string[] = [];
  const lower = responseText.toLowerCase();

  if (lower.includes('mechanism') || lower.includes('pathway'))
    suggestions.push('What are the clinical implications?');
  if (lower.includes('treatment') || lower.includes('therapy'))
    suggestions.push('What are the contraindications?');
  if (lower.includes('disease') || lower.includes('condition'))
    suggestions.push('How is this diagnosed?');
  if (lower.includes('drug') || lower.includes('medication'))
    suggestions.push('What are the drug interactions?');

  if (suggestions.length === 0) suggestions.push('Tell me more');
  if (suggestions.length < 3) suggestions.push('How is this tested in exams?');

  return [...new Set(suggestions)].slice(0, 3);
};

/** Check whether an error is a quota/rate-limit error. */
const isQuotaError = (err: any): boolean => {
  const msg = (err?.message || JSON.stringify(err) || '').toLowerCase();
  return (
    msg.includes('quota') ||
    msg.includes('resource_exhausted') ||
    msg.includes('rate limit') ||
    msg.includes('429')
  );
};

/* ------------------------------------------------------------------ */
/*  Stub: AI chat request (plug in real endpoint)                      */
/* ------------------------------------------------------------------ */

/**
 * Sends a message to the AI backend. This is a stub that mirrors the
 * original bundled `JC` helper. Replace the `fetch` URL with your real
 * Cloudflare Pages Function / proxy endpoint.
 */
const sendAIMessage = async (
  message: string,
  _examType: string = 'FCPS',
  pageContext?: string,
  _conversationCtx?: any,
  model?: string,
): Promise<string> => {
  const res = await fetch('/api/ai-chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: model || DEFAULT_MODEL,
      messages: [
        { role: 'system', content: '' },
        { role: 'user', content: message },
      ],
      temperature: 0.4,
      ...(pageContext ? { pageContext } : {}),
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(body || `Request failed (${res.status})`);
  }

  const json = await res.json();
  return (
    json?.text ||
    json?.choices?.[0]?.message?.content ||
    ''
  ).trim();
};

/* ------------------------------------------------------------------ */
/*  Smart-link component for markdown rendering                        */
/* ------------------------------------------------------------------ */

const SmartLink: React.FC<{ href?: string; children?: React.ReactNode }> = ({
  href,
  children,
}) => {
  if (!href) return <>{children}</>;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const isYouTube =
      href.includes('youtube.com') || href.includes('youtu.be');
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent,
      );

    if (isYouTube && isMobile) {
      e.preventDefault();
      let videoId = '';
      if (href.includes('youtu.be/')) {
        videoId = href.split('youtu.be/')[1]?.split('?')[0] || '';
      } else if (href.includes('youtube.com/watch?v=')) {
        videoId = new URL(href).searchParams.get('v') || '';
      } else if (href.includes('youtube.com/embed/')) {
        videoId = href.split('/embed/')[1]?.split('?')[0] || '';
      }
      if (videoId) {
        const intentUrl = `vnd.youtube://${videoId}`;
        const webUrl = `https://www.youtube.com/watch?v=${videoId}`;
        window.location.href = intentUrl;
        setTimeout(() => {
          window.location.href = webUrl;
        }, 1000);
      }
    }
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className="text-blue-600 dark:text-blue-400 hover:underline"
    >
      {children}
    </a>
  );
};

/* ------------------------------------------------------------------ */
/*  Model Selector Dialog                                              */
/* ------------------------------------------------------------------ */

interface ModelSelectorProps {
  currentModel: string;
  onModelChange: (id: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const ModelSelector: React.FC<ModelSelectorProps> = ({
  currentModel,
  onModelChange,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[400]"
        onClick={onClose}
      />
      <div className="fixed inset-0 flex items-center justify-center z-[401] pointer-events-none">
        <div
          className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl w-[90vw] md:w-[500px] p-8 pointer-events-auto animate-in scale-95 fade-in duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Select AI Model
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Choose your preferred language model for responses
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Model list */}
          <div className="space-y-3">
            {AI_MODELS.map((model) => (
              <button
                key={model.id}
                onClick={() => {
                  onModelChange(model.id);
                  onClose();
                }}
                className={`w-full text-left p-4 rounded-2xl transition-all duration-200 border-2 group ${
                  currentModel === model.id
                    ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-500 dark:border-blue-400'
                    : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-white/5 hover:border-blue-300 dark:hover:border-blue-500'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3
                      className={`font-bold text-lg ${
                        currentModel === model.id
                          ? 'text-blue-700 dark:text-blue-300'
                          : 'text-slate-900 dark:text-white'
                      }`}
                    >
                      {model.name}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                      {model.description}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 bg-slate-200/50 dark:bg-slate-700/50 px-2 py-1 rounded">
                        {model.dailyLimit}
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400 italic">
                        {model.dailyLimitNote}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-[11px] font-bold px-3 py-1 rounded-full whitespace-nowrap ${
                        model.tier === 'Premium'
                          ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300'
                          : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                      }`}
                    >
                      {model.tier}
                    </span>
                    {currentModel === model.id && (
                      <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Footer tips */}
          <div className="mt-8 pt-6 border-t border-slate-200 dark:border-white/5 space-y-3">
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              <strong>Tip:</strong> Premium models (GPT-5.2, GPT-4o) provide
              better responses for complex queries. Standard models (GPT-4o
              Mini) are faster and cost-effective.
            </p>
            <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-3 space-y-2">
              <p className="text-xs font-semibold text-orange-700 dark:text-orange-300">
                Shared Daily Token Limits (Reset at Midnight UTC):
              </p>
              <div className="space-y-2 text-xs text-orange-600 dark:text-orange-400">
                <div>
                  <p className="font-semibold mb-1">
                    Premium Tier (250K tokens/day - Shared):
                  </p>
                  <p className="text-[11px] ml-2">
                    GPT-5.2, GPT-5.1, GPT-4.1, GPT-4o, o1, o3
                  </p>
                </div>
                <div>
                  <p className="font-semibold mb-1">
                    Standard Tier (2.5M tokens/day - Shared):
                  </p>
                  <p className="text-[11px] ml-2">
                    GPT-5-mini, GPT-4o Mini, o1-mini, o3-mini
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

/* ------------------------------------------------------------------ */
/*  Main AIAssistant component                                         */
/* ------------------------------------------------------------------ */

const AIAssistant: React.FC<AIAssistantProps> = ({ pageContext }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [quotaExhausted, setQuotaExhausted] = useState(false);
  const [showModelSelector, setShowModelSelector] = useState(false);
  const [selectedModel, setSelectedModel] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('selectedAIModel') || DEFAULT_MODEL;
    }
    return DEFAULT_MODEL;
  });

  const chatRef = useRef<HTMLDivElement>(null);

  const handleModelChange = (modelId: string) => {
    setSelectedModel(modelId);
    if (typeof window !== 'undefined') {
      localStorage.setItem('selectedAIModel', modelId);
    }
  };

  // Auto-scroll when new messages arrive
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, loading]);

  /* ---- Send message ---- */
  const handleSend = async (overrideText?: string) => {
    const text = (overrideText ?? input).trim();
    if (!text || loading || quotaExhausted) return;

    const userText = text;
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', text: userText }]);
    setLoading(true);

    try {
      const aiResponse = await sendAIMessage(
        userText,
        'Public',
        pageContext,
        undefined,
        selectedModel,
      );
      const suggested = getSuggestedQuestions(aiResponse);
      setMessages((prev) => [
        ...prev,
        { role: 'ai', text: aiResponse, suggestedQuestions: suggested },
      ]);
    } catch (err: any) {
      console.error('AI Error:', err);
      if (isQuotaError(err)) {
        setQuotaExhausted(true);
        setMessages((prev) => [
          ...prev,
          {
            role: 'ai',
            text: `**Daily limit reached** - You've hit the daily token limit for this model tier.\n\n**Premium Models** (GPT-5.2, GPT-4o, GPT-4 Turbo): 250K tokens/day (shared)\n\n**Standard Models** (GPT-4o Mini, GPT-3.5 Turbo): 2.5M tokens/day (shared)\n\nPlease try again after midnight UTC when the quota resets.`,
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: 'ai',
            text: `I encountered an error: ${err?.message || JSON.stringify(err)}. If you are the admin, in Cloudflare **Pages** open your project -> Settings -> Environment variables -> add secret OPENAI_API_KEY (Production, and Preview if needed) then redeploy.`,
          },
        ]);
      }
    } finally {
      setLoading(false);
    }
  };

  /* ---------------------------------------------------------------- */
  /*  Render                                                           */
  /* ---------------------------------------------------------------- */
  return (
    <div className="fixed bottom-24 md:bottom-6 right-6 z-[300]">
      {/* ---- Chat panel ---- */}
      {isOpen ? (
        <div
          className={`bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl border border-slate-200 dark:border-white/10 flex flex-col overflow-hidden animate-in slide-in-from-bottom-8 duration-500 transition-all ease-in-out ${
            isExpanded
              ? 'w-[90vw] md:w-[80vw] lg:w-[1000px] h-[85vh]'
              : 'w-[22rem] md:w-[26rem] h-[600px]'
          }`}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-5 text-white flex justify-between items-center shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <div>
                <span className="font-bold block leading-none">
                  DentEdge Assistant
                </span>
                <span className="text-[10px] text-blue-100 font-bold uppercase tracking-wider">
                  Quick Review Mode
                </span>
              </div>
            </div>

            <div className="flex gap-2">
              {/* Model selector trigger */}
              <button
                onClick={() => setShowModelSelector(true)}
                className="hover:bg-white/10 rounded-full p-2 transition-colors group relative"
                title="Select AI Model"
              >
                <div className="absolute -bottom-12 right-0 bg-slate-900 text-white text-[10px] font-bold px-3 py-1 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                  {getModelDisplayName(selectedModel)}
                </div>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </button>

              {/* Expand / Collapse */}
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="hover:bg-white/10 rounded-full p-2 transition-colors"
                title={isExpanded ? 'Collapse' : 'Expand'}
              >
                {isExpanded ? (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 14h6m0 0v6m0-6L3 21m17-7h-6m0 0v6m0-6l7 7m-7-17h6m0 0v6m0-6L21 3M4 10h6m0 0V4m0 6L3 3"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                    />
                  </svg>
                )}
              </button>

              {/* Close */}
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/10 rounded-full p-2 transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Messages area */}
          <div
            ref={chatRef}
            className="flex-1 p-5 overflow-y-auto space-y-5 bg-slate-50/50 dark:bg-slate-950/50"
          >
            {/* Quota warning */}
            {quotaExhausted && (
              <div className="text-xs font-semibold text-red-700 bg-red-100/80 dark:text-red-300 dark:bg-red-900/40 px-4 py-3 rounded-xl border border-red-300 dark:border-red-700">
                Daily limit reached for this model tier. Resets at midnight UTC.
              </div>
            )}

            {/* Empty state */}
            {messages.length === 0 && (
              <div className="text-center py-12 px-6">
                <div className="bg-blue-50 dark:bg-blue-500/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600 dark:text-blue-400">
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-2">
                  How can I help you study?
                </h4>
                <p className="text-sm text-slate-500 leading-relaxed italic">
                  &quot;Explain the mechanism of Warfarin and its interaction
                  with Vitamin K.&quot;
                </p>
              </div>
            )}

            {/* Chat messages */}
            {messages.map((msg, idx) => (
              <div key={idx}>
                <div
                  className={`flex ${
                    msg.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[90%] p-4 rounded-2xl text-sm shadow-sm ${
                      msg.role === 'user'
                        ? 'bg-blue-600 text-white rounded-tr-none font-medium'
                        : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-100 dark:border-white/5 rounded-tl-none medical-serif'
                    }`}
                  >
                    {msg.role === 'ai' ? (
                      <div className="prose prose-slate dark:prose-invert prose-sm max-w-none">
                        <ReactMarkdown
                          components={{ a: SmartLink as any }}
                        >
                          {msg.text}
                        </ReactMarkdown>
                      </div>
                    ) : (
                      msg.text
                    )}
                  </div>
                </div>

                {/* Suggested follow-up questions */}
                {msg.role === 'ai' &&
                  msg.suggestedQuestions &&
                  msg.suggestedQuestions.length > 0 && (
                    <div className="mt-3 ml-0 flex flex-col gap-1.5">
                      {msg.suggestedQuestions.map((q, qi) => (
                        <button
                          key={qi}
                          onClick={() => handleSend(q)}
                          className="text-left px-3 py-2 text-[11px] font-semibold bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors"
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  )}
              </div>
            ))}

            {/* Loading dots */}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-white/5 rounded-tl-none flex items-center gap-2">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                    Reviewing clinical pearls...
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Input bar */}
          <div className="p-4 border-t bg-white dark:bg-slate-900 border-slate-100 dark:border-white/5">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(input);
              }}
              className="flex gap-3"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={quotaExhausted}
                placeholder="Type your question..."
                className="flex-1 bg-slate-100 dark:bg-slate-950 border-none rounded-2xl px-5 py-3 text-sm focus:ring-4 focus:ring-blue-500/10 outline-none text-slate-900 dark:text-white"
              />
              <button
                type="submit"
                disabled={loading || quotaExhausted || !input.trim()}
                className={`p-3 rounded-xl transition-colors shadow-lg shadow-blue-200 dark:shadow-blue-900/20 ${
                  loading || quotaExhausted || !input.trim()
                    ? 'bg-blue-400 text-white/80'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M5 10l7-7m0 0l7 7m-7-7v18"
                  />
                </svg>
              </button>
            </form>
          </div>
        </div>
      ) : (
        /* ---- Floating action button ---- */
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 text-white p-4 rounded-3xl shadow-2xl hover:scale-105 transition-all active:scale-95 group relative border-4 border-white dark:border-slate-800"
        >
          <div className="absolute -top-14 right-0 bg-slate-900 text-white text-[11px] font-bold px-4 py-2 rounded-xl shadow-xl opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap translate-y-2 group-hover:translate-y-0">
            QUICK CLINICAL QUERY
          </div>
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
        </button>
      )}

      {/* Model selector dialog */}
      <ModelSelector
        currentModel={selectedModel}
        onModelChange={handleModelChange}
        isOpen={showModelSelector}
        onClose={() => setShowModelSelector(false)}
      />
    </div>
  );
};

export default AIAssistant;
