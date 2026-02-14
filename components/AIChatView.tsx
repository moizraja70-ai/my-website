import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { supabase } from '../services/supabaseClient';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface ChatMessage {
  role: 'user' | 'ai';
  text: string;
  timestamp: Date;
  suggestedQuestions?: string[];
}

interface ConversationContext {
  summary: string;
  recentMessages: { role: string; text: string }[];
}

interface AIModel {
  id: string;
  name: string;
  description: string;
  tier: 'Premium' | 'Standard';
  dailyLimit: string;
  dailyLimitNote: string;
}

interface ModelSelectorProps {
  currentModel: string;
  onModelChange: (id: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const AI_MODELS: AIModel[] = [
  {
    id: 'gpt-5-2',
    name: 'ChatGPT 5.2',
    description: 'High-end model (best quality)',
    tier: 'Premium',
    dailyLimit: '250K tokens/day (shared)',
    dailyLimitNote: 'Shared premium pool across all users',
  },
  {
    id: 'gpt-4o',
    name: 'GPT-4o',
    description: 'Standard model (recommended)',
    tier: 'Standard',
    dailyLimit: '1M tokens/day (shared)',
    dailyLimitNote: 'Shared standard pool across all users',
  },
  {
    id: 'gpt-4o-mini',
    name: 'GPT-4o Mini',
    description: 'Fast and efficient',
    tier: 'Standard',
    dailyLimit: '1M tokens/day (shared)',
    dailyLimitNote: 'Shared standard pool across all users',
  },
];

const DEFAULT_MODEL = 'gpt-4o';

const isKnownModel = (modelId: string): boolean =>
  AI_MODELS.some((m) => m.id === modelId);

/** Number of recent messages to include as conversation context. */
const RECENT_MESSAGE_WINDOW = 3;

/** Maximum conversation summaries before compaction (unused in public mode). */
const MAX_SUMMARY_COMPACTIONS = 9999;

/** Whether to enable automatic conversation compaction. */
const ENABLE_COMPACTION = false;

/** Starter prompts shown in the empty-state welcome screen. */
const STARTER_PROMPTS = [
  'Explain Heart Failure types',
  'Cushing vs Addison Disease',
  'Differential for Hematuria',
  'MOA of Statins',
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

/**
 * Returns the human-readable display name for a model ID.
 */
const getModelDisplayName = (modelId: string): string => {
  const model = AI_MODELS.find((m) => m.id === modelId);
  return model?.name ?? modelId;
};

/**
 * Generates contextual follow-up question suggestions based on the
 * AI response text. Returns up to 3 unique suggestions.
 */
const generateSuggestedQuestions = (responseText: string): string[] => {
  const suggestions: string[] = [];
  const lowerText = responseText.toLowerCase();

  if (lowerText.includes('mechanism') || lowerText.includes('pathway')) {
    suggestions.push('What are the clinical implications of this mechanism?');
  }
  if (lowerText.includes('treatment') || lowerText.includes('therapy')) {
    suggestions.push('What are the contraindications or side effects?');
  }
  if (lowerText.includes('disease') || lowerText.includes('condition')) {
    suggestions.push('How is this diagnosed in clinical practice?');
  }
  if (lowerText.includes('drug') || lowerText.includes('medication')) {
    suggestions.push('How does this drug interact with other medications?');
  }

  // Ensure at least one generic suggestion exists.
  if (suggestions.length === 0) {
    suggestions.push('Can you explain that in more detail?');
  }

  // Add a secondary generic suggestion based on question phrasing.
  const hasTopicReference = responseText.match(
    /(?:regarding|about|concerning)\s+([^.!?]+)/i,
  );
  if (hasTopicReference) {
    suggestions.push("What's the differential diagnosis for this?");
  } else {
    suggestions.push('How is this tested in exams?');
  }

  // Deduplicate and cap at 3.
  return [...new Set(suggestions)].slice(0, 3);
};

/**
 * Determines whether an error object represents a quota or rate-limit
 * error from the AI backend.
 */
const isQuotaError = (error: unknown): boolean => {
  const message = (
    (error as any)?.message ||
    JSON.stringify(error) ||
    ''
  ).toLowerCase();

  return (
    message.includes('quota') ||
    message.includes('resource_exhausted') ||
    message.includes('rate limit') ||
    message.includes('429')
  );
};

/* ------------------------------------------------------------------ */
/*  Stub: AI chat request                                              */
/* ------------------------------------------------------------------ */

/**
 * Sends a message to the AI backend proxy. Replace the fetch URL with
 * your actual Cloudflare Pages Function or proxy endpoint.
 */
const sendAIMessage = async (
  message: string,
  _examType: string = 'Public',
  _pageContext?: string,
  conversationContext?: ConversationContext,
  model?: string,
): Promise<string> => {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  try {
    const { data } = await supabase.auth.getSession();
    const accessToken = data?.session?.access_token;
    if (accessToken) headers.Authorization = `Bearer ${accessToken}`;
  } catch { /* ignore */ }

  const response = await fetch('/api/ai-chat', {
    method: 'POST',
    headers,
    body: JSON.stringify({
      model: model || DEFAULT_MODEL,
      messages: [
        { role: 'system', content: '' },
        { role: 'user', content: message },
      ],
      temperature: 0.4,
      ...(conversationContext ? { conversationContext } : {}),
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(body || `Request failed (${response.status})`);
  }

  const json = await response.json();
  return (
    json?.text ??
    json?.choices?.[0]?.message?.content ??
    ''
  ).trim();
};

/* ------------------------------------------------------------------ */
/*  SmartLink - Markdown anchor with YouTube deep-link support          */
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
        videoId = href.split('youtu.be/')[1]?.split('?')[0] ?? '';
      } else if (href.includes('youtube.com/watch?v=')) {
        videoId = new URL(href).searchParams.get('v') ?? '';
      } else if (href.includes('youtube.com/embed/')) {
        videoId = href.split('/embed/')[1]?.split('?')[0] ?? '';
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
/*  ModelSelector Dialog                                                */
/* ------------------------------------------------------------------ */

const ModelSelector: React.FC<ModelSelectorProps> = ({
  currentModel,
  onModelChange,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[400]"
        onClick={onClose}
      />

      {/* Dialog */}
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
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
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
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
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
              <strong>Tip:</strong> GPT-5.2 uses the Premium pool (250K/day).
              GPT-4o and GPT-4o Mini use the Standard pool (1M/day).
            </p>
            <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-3 space-y-2">
              <p className="text-xs font-semibold text-orange-700 dark:text-orange-300">
                Shared Daily Token Limits (Reset at Midnight UTC):
              </p>
              <div className="space-y-2 text-xs text-orange-600 dark:text-orange-400">
                <div>
                  <p className="font-semibold mb-1">Premium Tier (250K tokens/day - Shared):</p>
                  <p className="text-[11px] ml-2">GPT-5.2</p>
                </div>
                <div>
                  <p className="font-semibold mb-1">Standard Tier (1M tokens/day - Shared):</p>
                  <p className="text-[11px] ml-2">GPT-4o, GPT-4o Mini</p>
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
/*  AIChatView - Full-page AI tutor chat interface                     */
/* ------------------------------------------------------------------ */

const AIChatView: React.FC = () => {
  // ---- State ----
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isQuotaExhausted, setIsQuotaExhausted] = useState(false);
  const [conversationSummary, setConversationSummary] = useState('');
  const [summaryCompactionCount, setSummaryCompactionCount] = useState(0);
  const [isModelSelectorOpen, setIsModelSelectorOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('selectedAIModel');
      const initial = stored || DEFAULT_MODEL;
      return isKnownModel(initial) ? initial : DEFAULT_MODEL;
    }
    return DEFAULT_MODEL;
  });

  const chatContainerRef = useRef<HTMLDivElement>(null);

  // ---- Model persistence ----
  const handleModelChange = (modelId: string): void => {
    setSelectedModel(modelId);
    if (typeof window !== 'undefined') {
      localStorage.setItem('selectedAIModel', modelId);
    }
  };

  // ---- Auto-scroll on new messages or loading state change ----
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  // ---- Send message handler ----
  const handleSendMessage = async (
    event?: React.FormEvent,
    overrideText?: string,
  ): Promise<void> => {
    event?.preventDefault();

    const messageText = (overrideText ?? inputText).trim();
    if (!messageText || isLoading || isQuotaExhausted) return;

    // Clear input immediately for snappy UX.
    const userMessageText = messageText;
    setInputText('');

    // Append the user message.
    const userMessage: ChatMessage = {
      role: 'user',
      text: userMessageText,
      timestamp: new Date(),
    };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      // Build a sliding window of recent messages for conversation context.
      // Exclude the very last message (the new user message) from the
      // "recent" window -- the backend receives it as the primary prompt.
      const compactionGap =
        Math.max(0, updatedMessages.length - RECENT_MESSAGE_WINDOW) -
        summaryCompactionCount;
      const shouldCompact =
        ENABLE_COMPACTION && compactionGap >= MAX_SUMMARY_COMPACTIONS;
      const windowStart = Math.max(
        shouldCompact ? summaryCompactionCount : 0,
        updatedMessages.length - RECENT_MESSAGE_WINDOW,
      );
      const recentMessages = updatedMessages
        .slice(windowStart, updatedMessages.length - 1)
        .map((msg) => ({ role: msg.role, text: msg.text }));

      const conversationContext: ConversationContext = {
        summary: conversationSummary,
        recentMessages,
      };

      // Call the AI backend.
      const aiResponseText = await sendAIMessage(
        userMessageText,
        'Public',
        undefined,
        conversationContext,
        selectedModel,
      );

      const suggestedQuestions = generateSuggestedQuestions(aiResponseText);

      const aiMessage: ChatMessage = {
        role: 'ai',
        text: aiResponseText,
        timestamp: new Date(),
        suggestedQuestions,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error: unknown) {
      console.error('AI Error:', error);

      if (isQuotaError(error)) {
        setIsQuotaExhausted(true);
        setMessages((prev) => [
          ...prev,
          {
            role: 'ai',
            text: [
              '**Daily limit reached** - You have hit the daily token limit for this model tier.',
              '',
              '**Premium Models** (GPT-5.2): 250K tokens/day (shared)',
              '',
              '**Standard Models** (GPT-4o, GPT-4o Mini): 1M tokens/day (shared)',
              '',
              'Please try again after midnight UTC when the quota resets.',
            ].join('\n'),
            timestamp: new Date(),
          },
        ]);
      } else {
        const errorMessage =
          (error as any)?.message || JSON.stringify(error);
        console.error('Full AI Error:', error);
        setMessages((prev) => [
          ...prev,
          {
            role: 'ai',
            text: [
              `I encountered an error: **"${errorMessage}"**.`,
              '',
              '**Fix:** Do not use a browser-exposed `VITE_OPENAI_API_KEY` (it will be leaked/blocked). ',
              'In Cloudflare **Pages**: open your project -> **Settings -> Environment variables** -> ',
              'add the server-side secret `OPENAI_API_KEY` (Production, and Preview if needed), then redeploy. ',
              'The app calls the `/api/ai-chat` endpoint (server-side proxy).',
            ].join(''),
            timestamp: new Date(),
          },
        ]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // ================================================================
  //  Render
  // ================================================================

  return (
    <div className="max-w-5xl mx-auto h-[calc(100vh-12rem)] flex flex-col glass-panel rounded-[2rem] overflow-hidden bg-white/60 dark:bg-slate-900/40">

      {/* ---- Header bar ---- */}
      <div className="border-b border-slate-200 dark:border-white/5 px-8 py-5 flex items-center justify-between bg-slate-50/80 dark:bg-slate-900/50">
        {/* Left: icon + title */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-cyan-600 to-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-cyan-900/50">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
          </div>
          <div>
            <h2 className="font-bold text-slate-900 dark:text-white text-lg">
              DentEdge AI Tutor
            </h2>
            <div className="flex items-center gap-2">
              {/* Pulsing green dot */}
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">
                Active Learning Session
              </span>
            </div>
          </div>
        </div>

        {/* Right: model selector button */}
        <button
          onClick={() => setIsModelSelectorOpen(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/5 hover:border-cyan-500/50 dark:hover:border-cyan-500/50 transition-colors group"
          title="Select AI Model"
        >
          <svg
            className="w-4 h-4 text-slate-600 dark:text-slate-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-400"
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
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 group-hover:text-cyan-600 dark:group-hover:text-cyan-400">
            {getModelDisplayName(selectedModel)}
          </span>
        </button>
      </div>

      {/* ---- Message area ---- */}
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-8 space-y-8 bg-slate-50/50 dark:bg-slate-950/30"
      >
        {/* Empty state / welcome screen */}
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center max-w-lg mx-auto space-y-8">
            {/* Large chat icon */}
            <div className="w-24 h-24 bg-slate-200 dark:bg-slate-800 rounded-full flex items-center justify-center text-cyan-600 dark:text-cyan-500 relative ring-1 ring-slate-300 dark:ring-white/10">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>

            {/* Welcome copy */}
            <div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                Welcome to your Personal Clinic.
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed">
                I am trained in clinical medicine and medical education. How can
                I help clarify your studies today?
              </p>
            </div>

            {/* Starter prompt buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              {STARTER_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => setInputText(prompt)}
                  className="text-left p-4 text-sm font-medium bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-white/5 rounded-2xl hover:border-cyan-500/50 hover:text-cyan-600 dark:hover:text-cyan-400 text-slate-600 dark:text-slate-300 transition-all shadow-sm hover:shadow-md"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Conversation messages */
          messages.map((message, index) => (
            <div key={index}>
              <div
                className={`flex ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                } animate-in fade-in slide-in-from-bottom-3 duration-500`}
              >
                <div
                  className={`max-w-[85%] flex flex-col ${
                    message.role === 'user' ? 'items-end' : 'items-start'
                  }`}
                >
                  {/* Message bubble */}
                  <div
                    className={`px-6 py-4 rounded-3xl leading-relaxed ${
                      message.role === 'user'
                        ? 'bg-cyan-600 text-white rounded-tr-none shadow-[0_0_20px_rgba(8,145,178,0.3)] text-sm font-medium'
                        : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 shadow-sm border border-slate-200 dark:border-white/5 rounded-tl-none medical-serif text-base'
                    }`}
                  >
                    {message.role === 'ai' ? (
                      <div className="prose prose-sm max-w-none prose-p:leading-relaxed prose-headings:text-slate-900 dark:prose-headings:text-white prose-strong:text-cyan-600 dark:prose-strong:text-cyan-400 prose-slate dark:prose-invert">
                        <ReactMarkdown
                          components={{ a: SmartLink as any }}
                        >
                          {message.text}
                        </ReactMarkdown>
                      </div>
                    ) : (
                      <div className="whitespace-pre-wrap">
                        {message.text}
                      </div>
                    )}
                  </div>

                  {/* Timestamp */}
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-2 font-bold px-2 uppercase tracking-widest">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>

                  {/* Suggested follow-up questions */}
                  {message.role === 'ai' &&
                    message.suggestedQuestions &&
                    message.suggestedQuestions.length > 0 && (
                      <div className="mt-4 flex flex-col gap-2 w-full max-w-md">
                        {message.suggestedQuestions.map(
                          (question, questionIndex) => (
                            <button
                              key={questionIndex}
                              onClick={() =>
                                handleSendMessage(undefined, question)
                              }
                              className="text-left px-4 py-3 text-xs font-semibold bg-cyan-50 dark:bg-cyan-900/20 border border-cyan-200 dark:border-cyan-800 rounded-2xl text-cyan-700 dark:text-cyan-300 hover:bg-cyan-100 dark:hover:bg-cyan-900/40 transition-colors"
                            >
                              {question}
                            </button>
                          ),
                        )}
                      </div>
                    )}
                </div>
              </div>
            </div>
          ))
        )}

        {/* Loading indicator */}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white dark:bg-slate-800 px-6 py-5 rounded-3xl shadow-sm border border-slate-200 dark:border-white/5 rounded-tl-none flex items-center gap-4">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 bg-cyan-500 rounded-full animate-bounce" />
                <div className="w-2.5 h-2.5 bg-cyan-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                <div className="w-2.5 h-2.5 bg-cyan-500 rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
              <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">
                Consulting Textbook...
              </span>
            </div>
          </div>
        )}
      </div>

      {/* ---- Input area ---- */}
      <div className="p-6 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-white/5">
        {/* Quota warning banner */}
        {isQuotaExhausted && (
          <div className="mb-3 text-xs font-semibold text-red-700 bg-red-100/80 dark:text-red-300 dark:bg-red-900/40 px-4 py-3 rounded-xl border border-red-300 dark:border-red-700">
            Daily limit reached for this model tier. Resets at midnight UTC.
          </div>
        )}

        <form
          onSubmit={handleSendMessage}
          className="relative flex items-center gap-3 max-w-4xl mx-auto"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={isQuotaExhausted}
            placeholder="Ask a question about physiology, pathology, or clinical cases..."
            className="flex-1 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-white/5 rounded-2xl px-8 py-5 text-slate-900 dark:text-white placeholder:text-slate-500 focus:ring-1 focus:ring-cyan-500/50 outline-none transition-all pr-20 text-base"
          />
          <button
            type="submit"
            disabled={!inputText.trim() || isLoading || isQuotaExhausted}
            className={`absolute right-2.5 p-3 rounded-xl transition-all ${
              !inputText.trim() || isLoading || isQuotaExhausted
                ? 'text-slate-400 dark:text-slate-600'
                : 'bg-cyan-600 text-white shadow-[0_0_15px_rgba(6,182,212,0.4)] hover:bg-cyan-500 active:scale-90'
            }`}
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M13 5l7 7-7 7M5 5l7 7-7 7"
              />
            </svg>
          </button>
        </form>
      </div>

      {/* ---- Model selector dialog ---- */}
      <ModelSelector
        currentModel={selectedModel}
        onModelChange={handleModelChange}
        isOpen={isModelSelectorOpen}
        onClose={() => setIsModelSelectorOpen(false)}
      />
    </div>
  );
};

export default AIChatView;
