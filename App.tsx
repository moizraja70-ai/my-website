
import React, { useState, useEffect, Suspense, lazy, useTransition } from 'react';
import { Loader2 } from 'lucide-react';
import { MedicalSubject, ViewMode, ExamStream } from './types';
import { addExtraScrambling } from './services/contentProtection';

// Lazy-loaded heavy components (loaded AFTER login)
const SubjectCard = lazy(() => import('./components/SubjectCard'));
const SummaryView = lazy(() => import('./components/SummaryView'));
const Quiz = lazy(() => import('./components/Quiz'));
const QuestionBankView = lazy(() => import('./components/QuestionBankView'));
const SubjectDetailView = lazy(() => import('./components/SubjectDetailView'));
const ProgressAnalyticsDashboard = lazy(() => import('./components/ProgressAnalyticsDashboard'));
const QuickQuizModal = lazy(() => import('./components/QuickQuizModal'));
const AdminDashboard = lazy(() => import('./components/AdminDashboard'));
const AIChatView = lazy(() => import('./components/AIChatView'));

// Static imports for fast initial load (login/subscription)
import AuthForm from './components/AuthForm';
import SubscriptionPlans from './components/SubscriptionPlans';
import AIAssistant from './components/AIAssistant';
import DentEdgeLogo from './components/DentEdgeLogo';
import { supabase, signOut, forceLocalSignOut, onAuthStateChange, getSubscriptionStatus, isUserAdmin, requestUserSubscriptionPlan } from './services/supabaseClient';
import { fetchQuizStats, updateQuizStats, fetchMockScores, saveMockScore } from './services/analyticsService';
import type { User } from '@supabase/supabase-js';

const resolveUserEmail = (user: User | null): string | null => {
  if (!user) return null;
  if (user.email) return user.email;
  const meta: any = user.user_metadata || {};
  return meta.email || meta.preferred_email || meta.preferredEmail || null;
};
const FCPS_PART_1_MBBS_MAJOR = [
  MedicalSubject.ANATOMY,
  MedicalSubject.PHYSIOLOGY
];

const FCPS_PART_1_MBBS_MINOR = [
  MedicalSubject.BIOCHEMISTRY,
  MedicalSubject.PHARMACOLOGY,
  MedicalSubject.MICROBIOLOGY,
  MedicalSubject.GENERAL_PATHOLOGY,
  MedicalSubject.GENERAL_EMBRYOLOGY
];

const FCPS_PART_1_DENTAL = [
  MedicalSubject.ORAL_HISTOLOGY,
  MedicalSubject.TOOTH_MORPHOLOGY,
  MedicalSubject.DENTAL_MATERIALS,
  MedicalSubject.ORAL_PATHOLOGY,
  MedicalSubject.ORAL_MEDICINE_RADIOLOGY,
  MedicalSubject.PERIODONTOLOGY,
  MedicalSubject.COMMUNITY_MEDICINE,
  MedicalSubject.PEDIATRICS
];

const DebugPanel: React.FC<{ user: User | null; isAdmin: boolean; authLoading: boolean; hasSubscription: boolean; error: any; onForceLogout: () => void }> = ({ user, isAdmin, authLoading, hasSubscription, error, onForceLogout }) => {
  const userEmail = resolveUserEmail(user);

  // Only show debug panel to admins
  if (!isAdmin) {
    console.debug('Debug panel hidden for non-admin');
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-[9999] pointer-events-auto">
      <div className="bg-slate-950/95 border border-green-500/30 rounded-2xl p-4 shadow-2xl backdrop-blur-md min-w-[240px]">
        <div className="flex justify-between items-center mb-3">
          <span className="text-[10px] font-bold text-green-500 uppercase tracking-widest">Debug Status</span>
          <button
            onClick={onForceLogout}
            className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-[10px] font-bold rounded-lg transition-colors uppercase tracking-tight"
          >
            Force Logout
          </button>
        </div>

        <div className="space-y-1.5 font-mono text-[11px]">
          <div className="flex justify-between items-center">
            <span className="text-slate-500">Loading:</span>
            <span className={authLoading ? 'text-amber-400' : 'text-green-400'}>{String(authLoading)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-500">User:</span>
            <span className="text-blue-400 truncate ml-4 max-w-[140px]">{userEmail || 'null'}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-500">Subscribed:</span>
            <span className={hasSubscription || isAdmin ? 'text-green-400' : 'text-red-400'}>
              {String(hasSubscription || isAdmin)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-500">Origin:</span>
            <span className="text-amber-400 truncate ml-4 max-w-[140px] shadow-sm">{typeof window !== 'undefined' ? window.location.origin : 'null'}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-500">Deployed:</span>
            <span className="text-cyan-400 text-[10px] ml-4 truncate max-w-[140px]">{typeof __BUILD_TIMESTAMP__ !== 'undefined' ? new Date(__BUILD_TIMESTAMP__).toLocaleString() : 'N/A'}</span>
          </div>
          {error && (
            <div className="mt-2 p-2 bg-red-500/10 border border-red-500/20 rounded-lg text-[10px] text-red-400 break-words max-w-[200px]">
              {typeof error === 'string' ? error : JSON.stringify(error)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const AuthIssueBanner: React.FC<{ message: string; onReset: () => void; onReload: () => void; onHardReset?: () => void }> = ({ message, onReset, onReload, onHardReset }) => (
  <div className="mx-4 md:mx-8 mt-4 mb-6 rounded-xl border border-red-500/40 bg-red-500/10 text-red-200 px-4 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
    <div className="text-sm">
      <div className="font-semibold">Login issue detected</div>
      <div className="text-red-300">{message}</div>
    </div>
    <div className="flex items-center gap-3">
      <button
        onClick={onReset}
        className="px-3 py-1.5 rounded-lg bg-red-500/20 text-red-200 hover:bg-red-500/30 text-sm font-medium"
      >
        Reset Login
      </button>
      <button
        onClick={onReload}
        className="px-3 py-1.5 rounded-lg bg-white/10 text-white hover:bg-white/20 text-sm font-medium"
      >
        Retry
      </button>
      {onHardReset && (
        <button
          onClick={onHardReset}
          className="px-3 py-1.5 rounded-lg bg-amber-500/20 text-amber-200 hover:bg-amber-500/30 text-sm font-medium"
        >
          Hard Reset Cache
        </button>
      )}
    </div>
  </div>
);

const isAuthAbortError = (err: any) => {
  const message = String(err?.message || err || '').toLowerCase();
  const name = String(err?.name || '').toLowerCase();
  return (
    message.includes('abort') ||
    message.includes('signal') ||
    message.includes('cancelled') ||
    message.includes('canceled') ||
    name === 'aborterror'
  );
};

const isAuthTimeoutError = (err: any) => {
  const message = String(err?.message || err || '').toLowerCase();
  return message.includes('timed out') || message.includes('timeout');
};

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const clearClientStoredState = async (clearHttpCache: boolean) => {
  try {
    for (const key of Object.keys(localStorage)) {
      if ((key.startsWith('sb-') && key.endsWith('-auth-token')) || key.startsWith('dentedge_')) {
        localStorage.removeItem(key);
      }
    }
  } catch {
    // ignore storage errors
  }

  try {
    for (const key of Object.keys(sessionStorage)) {
      if ((key.startsWith('sb-') && key.endsWith('-auth-token')) || key.startsWith('dentedge_')) {
        sessionStorage.removeItem(key);
      }
    }
  } catch {
    // ignore storage errors
  }

  if (clearHttpCache && typeof window !== 'undefined' && 'caches' in window) {
    try {
      const names = await window.caches.keys();
      await Promise.all(names.map((name) => window.caches.delete(name)));
    } catch {
      // ignore cache storage errors
    }
  }
};

type AccessCache = {
  hasSubscription: boolean;
  isAdmin: boolean;
  at: number;
};

const ACCESS_CACHE_KEY = 'dentedge_access_cache_v1';
const readAccessCache = (): AccessCache | null => {
  try {
    const raw = localStorage.getItem(ACCESS_CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<AccessCache> | null;
    if (!parsed || typeof parsed !== 'object') return null;
    if (typeof parsed.at !== 'number') return null;
    if (typeof parsed.hasSubscription !== 'boolean') return null;
    if (typeof parsed.isAdmin !== 'boolean') return null;

    // Cache is purely for fast UI on reload; keep it short-lived.
    const MAX_AGE_MS = 24 * 60 * 60 * 1000;
    if (Date.now() - parsed.at > MAX_AGE_MS) return null;
    return parsed as AccessCache;
  } catch {
    return null;
  }
};

const writeAccessCache = (value: Omit<AccessCache, 'at'>) => {
  try {
    const payload: AccessCache = { ...value, at: Date.now() };
    localStorage.setItem(ACCESS_CACHE_KEY, JSON.stringify(payload));
  } catch {
    // ignore storage errors
  }
};

const getOAuthErrorFromUrl = () => {
  if (typeof window === 'undefined') return null;

  const readParams = (raw: string) => {
    const value = raw.startsWith('#') ? raw.slice(1) : raw.startsWith('?') ? raw.slice(1) : raw;
    return new URLSearchParams(value);
  };

  const hashParams = readParams(window.location.hash || '');
  const searchParams = readParams(window.location.search || '');

  const error =
    hashParams.get('error') ||
    searchParams.get('error') ||
    null;

  const description =
    hashParams.get('error_description') ||
    searchParams.get('error_description') ||
    null;

  if (!error && !description) return null;
  return decodeURIComponent((description || error || 'OAuth login failed').replace(/\+/g, ' '));
};

const App: React.FC = () => {
  const initialAccessCache = readAccessCache();
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(() => initialAccessCache?.isAdmin ?? false);
  const [hasSubscription, setHasSubscription] = useState(() => initialAccessCache?.hasSubscription ?? false);
  const [hasAccessCache, setHasAccessCache] = useState(() => Boolean(initialAccessCache));
  const [isAccessChecking, setIsAccessChecking] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [debugError, setDebugError] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [view, setView] = useState<ViewMode>('dashboard');
  const [previousView, setPreviousView] = useState<ViewMode>('dashboard'); // Track history for back navigation
  const [examStream] = useState<ExamStream>('FCPS');
  const [selectedSubject, setSelectedSubject] = useState<MedicalSubject | string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string | undefined>(undefined);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    try {
      const stored = localStorage.getItem('dentedge_theme');
      if (stored === 'dark') return true;
      if (stored === 'light') return false;
    } catch {
      // ignore storage errors
    }
    return false;
  });
  const [isNavigating, startTransition] = useTransition();
  const [pageContext, setPageContext] = useState<string | undefined>(undefined);
  // Track completed subjects
  const [completedSubjects, setCompletedSubjects] = useState<Set<string>>(new Set());

  // Quick Quiz Modal state
  const [showQuickQuiz, setShowQuickQuiz] = useState(false);
  const [quizSubject, setQuizSubject] = useState<MedicalSubject | null>(null);
  // Track quiz stats per subject: {subject: {correct: number, incorrect: number } }
  const [quizStats, setQuizStats] = useState<Record<string, { correct: number; incorrect: number }>>({});
  // Track mock scores over time (Challenge mode only)
  interface MockScore {
    score: number;
    total: number;
    timestamp: number;
  }
  const [mockScoreHistory, setMockScoreHistory] = useState<MockScore[]>([]);
  // Current page content for AI Tutor context

  // Preview/Freemium mode state
  const [previewMode, setPreviewMode] = useState(false);
  const allowAllAccess = import.meta.env.DEV;
  const [showSubscribePopup, setShowSubscribePopup] = useState(false);

  const canSeeAdmin = isAdmin;
  const isPreviewUser = previewMode && !hasSubscription && !canSeeAdmin && !allowAllAccess;

  const handleHardResetCache = async () => {
    await clearClientStoredState(true);
    const cleanBase = `${window.location.origin}${window.location.pathname}`;
    window.location.replace(`${cleanBase}?cache_bust=${Date.now()}`);
  };

  const isSubscriptionActive = (data?: { is_subscribed?: boolean; subscription_end_date?: string | null }) => {
    if (data?.is_subscribed) return true;
    if (data?.subscription_end_date) {
      const end = new Date(data.subscription_end_date).getTime();
      if (!Number.isNaN(end) && end > Date.now()) return true;
    }
    return false;
  };

  const handleBlockedAccount = async () => {
    setDebugError('Your account has been blocked. Please contact support.');
    setHasSubscription(false);
    setIsAdmin(false);
    setIsAccessChecking(false);
    try {
      await signOut();
    } catch {
      forceLocalSignOut();
    }
    setUser(null);
    setView('dashboard');
  };

  // Auto-clean stale local auth/app cache after a new deploy.
  useEffect(() => {
    const run = async () => {
      const buildVersion = typeof __BUILD_TIMESTAMP__ !== 'undefined'
        ? String(__BUILD_TIMESTAMP__)
        : 'dev';
      const versionKey = 'dentedge_build_version';
      let previousVersion: string | null = null;

      try {
        previousVersion = localStorage.getItem(versionKey);
      } catch {
        previousVersion = null;
      }

      if (previousVersion && previousVersion !== buildVersion) {
        await clearClientStoredState(false);
      }

      try {
        localStorage.setItem(versionKey, buildVersion);
      } catch {
        // ignore storage errors
      }
    };

    run();
  }, []);

  const isPreviewAllowedTopic = (topic?: string) => {
    return (topic || '').trim().toLowerCase() === 'impression materials';
  };

  const refreshAccessFromBackend = async (targetUserId?: string): Promise<boolean | null> => {
    const userId = targetUserId || user?.id;
    if (!userId) {
      setIsAccessChecking(false);
      return false;
    }
    setIsAccessChecking(true);

    const withTimeout = <T,>(promise: Promise<T>, ms = 8000): Promise<T> => {
      return Promise.race([
        promise,
        new Promise<T>((_, reject) => {
          const timer = setTimeout(() => {
            reject(new Error(`Access check timed out after ${ms}ms`));
          }, ms);
          promise.finally(() => clearTimeout(timer)).catch(() => { });
        })
      ]);
    };

    const retryDelays = [0, 250, 800, 1500];
    for (let attempt = 0; attempt < retryDelays.length; attempt += 1) {
      if (retryDelays[attempt] > 0) {
        await wait(retryDelays[attempt]);
      }

      try {
        const [{ data, error }, adminStatus] = await Promise.all([
          withTimeout(getSubscriptionStatus(userId), 8000),
          withTimeout(isUserAdmin(userId), 8000)
        ]);

        if (error) {
          if (isAuthAbortError(error) || isAuthTimeoutError(error)) {
            continue;
          }
          throw error;
        }

        if (data?.role === 'blocked') {
          await handleBlockedAccount();
          setIsAccessChecking(false);
          return false;
        }

        const active = adminStatus || isSubscriptionActive(data || undefined);
        setIsAdmin(adminStatus);
        setHasSubscription(active);
        writeAccessCache({ isAdmin: adminStatus, hasSubscription: active });
        setHasAccessCache(true);
        setIsAccessChecking(false);
        setDebugError(null);
        return active;
      } catch (err: any) {
        if (isAuthAbortError(err) || isAuthTimeoutError(err)) {
          continue;
        }
        // Non-transient failure (RLS, misconfig, etc). Treat as "not subscribed" so
        // users are not stuck on the verifying screen forever.
        setIsAccessChecking(false);
        setIsAdmin(false);
        setHasSubscription(false);
        setDebugError(err?.message || String(err));
        writeAccessCache({ isAdmin: false, hasSubscription: false });
        setHasAccessCache(true);
        return false;
      }
    }

    // Transient auth/profile fetch failure; do not force pending state.
    setDebugError(null);
    setIsAccessChecking(false);
    return null;
  };


  // Check auth state on mount
  useEffect(() => {
    const oauthUrlError = getOAuthErrorFromUrl();
    if (oauthUrlError) {
      setDebugError(`Google sign-in failed: ${oauthUrlError}`);
      // Clear OAuth hash/query error payload to avoid stale repeated errors on refresh.
      window.history.replaceState(null, '', window.location.pathname);
    }

    const hasOAuthHash = typeof window !== 'undefined' && window.location.hash.includes('access_token');
    const hasCachedSession = () => {
      if (typeof window === 'undefined') return false;
      const hasToken = (storage: Storage) =>
        Object.keys(storage).some(key => key.startsWith('sb-') && key.endsWith('-auth-token'));
      try {
        if (hasToken(window.localStorage) || hasToken(window.sessionStorage)) return true;
      } catch {
        // ignore storage access errors
      }
      return false;
    };

    // Fast-path: if no cached session and no OAuth hash, don't block the login UI.
    const cachedSession = hasCachedSession();
    if (!hasOAuthHash && !cachedSession) {
      setAuthLoading(false);
    }

    // Fail-safe: never keep the spinner up too long.
    const authReleaseTimer = setTimeout(() => {
      if (!hasOAuthHash) {
        setAuthLoading(false);
      }
    }, cachedSession ? 1500 : 600);

    // Timeout wrapper to prevent hanging
    const withTimeout = <T,>(promise: Promise<T>, ms: number): Promise<T> => {
      return Promise.race([
        promise,
        new Promise<T>((_, reject) => {
          const timer = setTimeout(() => {
            const err = new Error('Session check timed out after ' + ms + 'ms');
            reject(err);
          }, ms);
          // Clear timer if promise resolves/rejects first to prevent memory leak
          promise.finally(() => clearTimeout(timer)).catch(() => { });
        })
      ]);
    };

    // Set up auth state listener FIRST (needed for OAuth callback)
    const { data: { subscription } } = onAuthStateChange(async (event, session) => {
      console.log('AUTH EVENT:', event, session?.user?.email);
      if (window.location.hash) {
        console.log('URL HASH DETECTED:', window.location.hash.substring(0, 50) + '...');
      }

      try {
        // Handle OAuth callback specifically
        if (event === 'SIGNED_IN' && session?.user) {
          console.log('SIGNED_IN: User logged in via OAuth or email');
          setUser(session.user);
          setIsAccessChecking(true);
          setAuthLoading(false);
          setDebugError(null);

          // Access checks run through one path with retries to avoid transient abort races.
          const access = await refreshAccessFromBackend(session.user.id);
          if (access === null) {
            window.setTimeout(() => {
              refreshAccessFromBackend(session.user.id);
            }, 1200);
          }

          // Clean URL if it has OAuth tokens
          if (window.location.hash.includes('access_token')) {
            console.log('AUTH: Found access token in hash, cleaning up URL');
            window.history.replaceState(null, '', window.location.pathname);
          } else if (window.location.hash.includes('error=')) {
            const errorMatch = window.location.hash.match(/error_description=([^&]+)/);
            const errorMsg = errorMatch ? decodeURIComponent(errorMatch[1].replace(/\+/g, ' ')) : 'Unknown OAuth error';
            console.error('AUTH: OAuth Error in URL hash:', errorMsg);
            setDebugError(`Login failed: ${errorMsg}`);
          }
          return;
        }

        if (event === 'SIGNED_OUT') {
          console.log('SIGNED_OUT: User logged out');
          setUser(null);
          setIsAccessChecking(false);
          setHasSubscription(false);
          setDebugError(null);
          return;
        }

        // Handle other events (incl. INITIAL_SESSION on page refresh)
        setUser(session?.user ?? null);
        setIsAccessChecking(Boolean(session?.user));
        setAuthLoading(false);
        if (session?.user) {
          const access = await refreshAccessFromBackend(session.user.id);
          if (access === null) {
            window.setTimeout(() => {
              refreshAccessFromBackend(session.user.id);
            }, 1200);
          }
          setDebugError(null);
        } else {
          setIsAccessChecking(false);
          setHasSubscription(false);
          setDebugError(null);
        }
      } catch (err: any) {
        console.error('Auth change error:', err);
        const message = err?.message || String(err);

        // Ignore abort errors from race conditions between listeners
        const isAbortError = isAuthAbortError(err);

        if (!isAbortError) {
          // DB calls failed before subscription status could be updated.
          // Set error only for non-abort errors
          console.error('Auth state change handler error:', message);
        }
        setIsAccessChecking(false);
      }
    });

    // THEN check initial session (for page refresh scenarios)
    const initSession = async () => {
      let sessionEmail: string | null = null; // captured early for catch fallback
      try {
        console.log('INIT: Checking existing session...');

        const { data: { session }, error } = await withTimeout(
          supabase.auth.getSession(),
          15000
        );

        if (error) {
          const message = error?.message || String(error);
          const isAbortError = isAuthAbortError(error);
          const isTimeout = isAuthTimeoutError(error);

          if (isAbortError || isTimeout) {
            console.warn('INIT: Session check aborted/timeout - ignoring.', message);
            setDebugError(null);
          } else {
            console.error('INIT: Session error', error);
            setDebugError(message);
          }
        } else if (session?.user) {
          sessionEmail = session.user.email;
          console.log('INIT: Found existing session for', session.user.email);
          setDebugError(null);
          // Let the UI render immediately; do not block on DB checks.
          setUser(session.user);
          setAuthLoading(false);

          setIsAccessChecking(true);
          const access = await refreshAccessFromBackend(session.user.id);
          if (access === null) {
            window.setTimeout(() => {
              refreshAccessFromBackend(session.user.id);
            }, 1200);
          }
        } else {
          console.log('INIT: No existing session');
          setIsAccessChecking(false);
          setDebugError(null);
        }
      } catch (err: any) {
        const message = err?.message || String(err);
        // Supabase internally aborts getSession/getUser when onAuthStateChange fires.
        // This is a benign race — the auth state listener already handles sign-in, so ignore it.
        // Check for various abort signal indicators
        const isAbortError = isAuthAbortError(err);

        if (isAbortError) {
          console.warn('INIT: Session check aborted by auth state change – ignoring.', message);
          // Don't set error, just finish loading
          setDebugError(null);
          setAuthLoading(false);
        } else if (isAuthTimeoutError(err)) {
          console.warn('INIT: Session check timed out â€“ continuing without session.', message);
          setDebugError(null);
          setAuthLoading(false);
        } else if (sessionEmail) {
          // Session was valid but a later DB call failed; keep cached session.
          console.warn('INIT: Auth init failed after session load - keeping cached session.');
          setDebugError(null);
        } else {
          console.error('Auth initialization error:', err);
          setDebugError(message);
          setUser(null);
          setIsAccessChecking(false);
          setHasSubscription(false);
        }
      } finally {
        setAuthLoading(false);
      }
    };
    initSession();

    return () => {
      subscription.unsubscribe();
      clearTimeout(authReleaseTimer);
    };
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Safety net: never let the "Verifying your account access..." spinner hang forever.
  // If isAccessChecking is stuck for more than 60s, force it off so the UI is usable.
  const [accessCheckTimedOut, setAccessCheckTimedOut] = useState(false);
  useEffect(() => {
    if (!isAccessChecking) {
      setAccessCheckTimedOut(false);
      return;
    }
    const safetyTimer = window.setTimeout(() => {
      setIsAccessChecking(false);
      setAccessCheckTimedOut(true);
    }, 60000);
    return () => window.clearTimeout(safetyTimer);
  }, [isAccessChecking]);

  // Keep access flags in sync with backend (e.g., admin approves pending users later).
  // This avoids users getting stuck in preview mode due stale browser session state.
  useEffect(() => {
    if (!user?.id) {
      setIsAccessChecking(false);
      return;
    }

    let cancelled = false;
    let retryTimer: number | null = null;
    let nullAttempts = 0;
    const retryBackoffMs = [1500, 3000, 6000];

    const scheduleRetry = (ms: number) => {
      if (cancelled) return;
      if (retryTimer) {
        window.clearTimeout(retryTimer);
      }
      retryTimer = window.setTimeout(() => {
        refreshAccessState('retry');
      }, ms);
    };

    const refreshAccessState = async (reason: string) => {
      if (cancelled) return;
      const access = await refreshAccessFromBackend(user.id);
      if (cancelled) return;

      if (access === null) {
        nullAttempts += 1;
        if (nullAttempts <= retryBackoffMs.length) {
          scheduleRetry(retryBackoffMs[nullAttempts - 1]);
        } else {
          // Stop retrying forever; show the "could not verify" UI instead.
          setIsAccessChecking(false);
          setAccessCheckTimedOut(true);
        }
        return;
      }
      nullAttempts = 0;

      if (retryTimer) {
        window.clearTimeout(retryTimer);
        retryTimer = null;
      }

      try {
        localStorage.setItem('dentedge_last_access_sync', new Date().toISOString());
      } catch {
        // ignore storage errors
      }
    };

    // Immediate refresh on user/session change.
    refreshAccessState('user-change');

    const ONE_HOUR_MS = 60 * 60 * 1000;
    const intervalId = window.setInterval(() => {
      refreshAccessState('hourly');
    }, ONE_HOUR_MS);

    const handleFocus = () => refreshAccessState('focus');
    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        refreshAccessState('visible');
      }
    };
    const handleOnline = () => refreshAccessState('online');

    window.addEventListener('focus', handleFocus);
    document.addEventListener('visibilitychange', handleVisibility);
    window.addEventListener('online', handleOnline);

    return () => {
      cancelled = true;
      window.clearInterval(intervalId);
      if (retryTimer) {
        window.clearTimeout(retryTimer);
      }
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('online', handleOnline);
    };
  }, [user?.id]);

  // Load quiz stats from Supabase when user logs in
  useEffect(() => {
    if (user?.id) {
      fetchQuizStats(user.id).then(data => setQuizStats(data || {}));
    }
  }, [user?.id]);

  // Load mock scores from Supabase when user logs in
  useEffect(() => {
    if (user?.id) {
      fetchMockScores(user.id).then(data => setMockScoreHistory(data || []));
    }
  }, [user?.id]);

  // Content protection: block copy, select-all, and devtools shortcuts (skip for admin)
  useEffect(() => {
    if (canSeeAdmin) return;

    const blockCopy = (e: ClipboardEvent) => {
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) return;
      e.preventDefault();
      const selection = window.getSelection()?.toString() || '';
      if (selection && e.clipboardData) {
        e.clipboardData.setData('text/plain', addExtraScrambling(selection));
      }
    };

    const blockKeys = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const isInput = target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable);

      let shouldBlock = false;

      if ((e.ctrlKey || e.metaKey) && e.key === 'a' && !isInput) shouldBlock = true;
      if ((e.ctrlKey || e.metaKey) && e.key === 'c' && !isInput) shouldBlock = true;
      if ((e.ctrlKey || e.metaKey) && e.key === 's') shouldBlock = true;
      if (e.key === 'F12') shouldBlock = true;
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'I' || e.key === 'i')) shouldBlock = true;
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'J' || e.key === 'j')) shouldBlock = true;
      if ((e.ctrlKey || e.metaKey) && (e.key === 'u' || e.key === 'U')) shouldBlock = true;

      if (shouldBlock) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        return false;
      }
    };

    const blockContextMenu = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) return;
      e.preventDefault();
    };

    document.addEventListener('copy', blockCopy);
    document.addEventListener('keydown', blockKeys, true);
    document.addEventListener('contextmenu', blockContextMenu);

    return () => {
      document.removeEventListener('copy', blockCopy);
      document.removeEventListener('keydown', blockKeys, true);
      document.removeEventListener('contextmenu', blockContextMenu);
    };
  }, [canSeeAdmin]);

  useEffect(() => {
    if (view === 'question-banks' && !canSeeAdmin) {
      setView('dashboard');
    }
  }, [view, canSeeAdmin]);

  const toggleTheme = () => {
    setIsDarkMode(prev => {
      const next = !prev;
      try {
        localStorage.setItem('dentedge_theme', next ? 'dark' : 'light');
      } catch {
        // ignore storage errors
      }
      return next;
    });
  };

  const handleSignOut = () => {
    console.log('LOGOUT: Nuclear clear starting...');
    // Nuclear option: Clear ALL storage and reload
    try {
      localStorage.clear();
      sessionStorage.clear();
    } catch (e) {
      console.error('Storage clear failed:', e);
    }
    setDebugError(null);
    setUser(null);
    setIsAccessChecking(false);
    setHasSubscription(false);
    setView('dashboard');
    setPreviousView('dashboard');
    setSelectedSubject(null);
    setSelectedTopic(undefined);
    // Force reload to login page
    window.location.href = window.location.origin;
  };

  const handleResetLogin = () => {
    forceLocalSignOut();
    setDebugError(null);
    setUser(null);
    setIsAccessChecking(false);
    setHasSubscription(false);
    setView('dashboard');
    setPreviousView('dashboard');
    setSelectedSubject(null);
    setSelectedTopic(undefined);
  };

  const handleIHavePaidRefresh = async () => {
    const active = await refreshAccessFromBackend();
    if (active === true) {
      alert('Access updated. Your account is now active.');
      return;
    }
    if (active === false) {
      alert('Still pending. If you already paid, ask admin to approve your profile and try again.');
      return;
    }
    alert('Could not verify access right now. Please retry in a few seconds.');
  };

  const handleSubscriptionPlanSelect = async (plan: string) => {
    if (!user?.id) return;
    if (plan !== '2-months' && plan !== '4-months' && plan !== '6-months') return;

    const { error } = await requestUserSubscriptionPlan(user.id, plan);
    if (error) {
      const errorMessage = (error as any)?.message || JSON.stringify(error);
      alert(`Failed to submit plan request: ${errorMessage}`);
      return;
    }

    const activeNow = await refreshAccessFromBackend();
    if (activeNow === true) {
      alert('Access updated. Your account is now active.');
      return;
    }
    if (activeNow === null) {
      alert('Plan request submitted, but access check is temporarily unavailable. Please click "I Have Paid - Refresh Access" again in a few seconds.');
      return;
    }
    alert('Plan request submitted. Admin will activate your account after payment verification.');
  };


  const handleSubjectClick = (subject: MedicalSubject) => {
    if (isPreviewUser && subject !== MedicalSubject.DENTAL_MATERIALS) {
      setShowSubscribePopup(true);
      return;
    }
    setSelectedSubject(subject);
    setView('subject-detail');
  };

  const handleToggleSubjectComplete = (subject: MedicalSubject, e: React.MouseEvent) => {
    setCompletedSubjects(prev => {
      const newSet = new Set(prev);
      if (newSet.has(subject)) {
        newSet.delete(subject);
      } else {
        newSet.add(subject);
      }
      return newSet;
    });
  };

  const handleNoteTopicSelect = (topic: string) => {
    handleRestrictedNavigation('summary', topic);
  };

  const handleQuizTopicSelect = (topic: string) => {
    handleRestrictedNavigation('quiz', topic);
  };

  const handleTopicBankClick = (topicTitle: string) => {
    setSelectedSubject(topicTitle);
    setSelectedTopic(undefined);
    setPreviousView('question-banks');
    setView('quiz');
  };

  const handleStartQuiz = () => {
    setPreviousView('summary');
    setView('quiz');
  };

  const handleToggleComplete = (subject: string, e?: React.MouseEvent) => {
    setCompletedSubjects(prev => {
      const newSet = new Set(prev);
      if (newSet.has(subject)) {
        newSet.delete(subject);
      } else {
        newSet.add(subject);
      }
      return newSet;
    });
  };

  const handleUpdateQuizStats = (subject: MedicalSubject, correct: boolean) => {
    setQuizStats(prev => {
      const current = prev[subject] || { correct: 0, incorrect: 0 };
      return {
        ...prev,
        [subject]: {
          correct: correct ? current.correct + 1 : current.correct,
          incorrect: correct ? current.incorrect : current.incorrect + 1
        }
      };
    });
  };

  const handleBatchUpdateQuizStats = (subject: MedicalSubject, correct: number, incorrect: number, difficulty?: string) => {
    // Update local state immediately
    setQuizStats(prev => {
      const current = prev[subject] || { correct: 0, incorrect: 0 };
      const updated = {
        correct: current.correct + correct,
        incorrect: current.incorrect + incorrect
      };

      // Save to Supabase in background
      if (user?.id) {
        updateQuizStats(user.id, subject, updated.correct, updated.incorrect).catch(err => {
          console.error('Failed to update quiz stats on Supabase:', err);
        });
      }

      return { ...prev, [subject]: updated };
    });

    // If Challenge mode, also track in mockScoreHistory
    if (difficulty === 'Challenge' && user?.id) {
      const total = correct + incorrect;
      const timestamp = Date.now();
      const newEntry = { score: correct, total, timestamp };

      setMockScoreHistory(prev => [...prev, newEntry].slice(-10));
      saveMockScore(user.id, correct, total, timestamp).catch(err => {
        console.error('Failed to save mock score on Supabase:', err);
      });
    }
  };

  const handleBackToDashboard = () => {
    setView('dashboard');
    setSelectedSubject(null);
    setSelectedTopic(undefined);
  };

  const handleBackToSubject = () => {
    setView('subject-detail');
    setSelectedTopic(undefined);
  }

  const renderSubjectGrid = (title: string, subjects: MedicalSubject[], colorClass: string = "text-slate-400 dark:text-slate-300", borderClass: string = "border-slate-300 dark:border-white/10") => {
    // Sort logic: Incomplete first, then Completed
    const sortedSubjects = [...subjects].sort((a, b) => {
      const aCompleted = completedSubjects.has(a);
      const bCompleted = completedSubjects.has(b);
      if (aCompleted === bCompleted) return 0;
      return aCompleted ? 1 : -1; // completed goes to bottom
    });

    return (
      <div className="mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="flex items-center gap-4 mb-6">
          <h2 className={`text-lg font-bold uppercase tracking-widest px-4 border rounded-full py-1 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm ${colorClass} ${borderClass}`}>
            {title}
          </h2>
          <div className={`h-px flex-1 ${borderClass.replace('border', 'bg')}`}></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedSubjects.map(subject => (
            <SubjectCard
              key={subject}
              subject={subject}
              onClick={handleSubjectClick}
              isCompleted={completedSubjects.has(subject)}
              onToggleComplete={handleToggleComplete}
              isLocked={isPreviewUser}
              onLockedClick={() => setShowSubscribePopup(true)}
            />
          ))}
        </div>
      </div>
    );
  };

  const renderDashboardContent = () => {
    // We can pass the grouped subjects into the dashboard if needed, or simply let the dashboard be the main view
    // For now, based on the request "make it in the main home page", we replace the subject grids with the analytics dashboard.
    // However, the user might still need access to subjects.
    // Let's assume the "Start Study Session" or other interactions lead to the subject selector or we keep subject selector below.

    // User asked "make it in the main home page". The image shows a full dashboard.
    // I will render the Analytics Dashboard as the primary view.
    return (
      <div className="space-y-12">
        <ProgressAnalyticsDashboard
          stream={examStream}
          completedSubjects={Array.from(completedSubjects)}
          quizStats={quizStats}
          userName={user?.email?.split('@')[0] || "Student"}
          isPreviewMode={previewMode}
          onLockedAccess={() => setShowSubscribePopup(true)}
          onStartStudy={(topic) => {
            if (topic === 'Impression Materials') {
              setSelectedSubject(MedicalSubject.DENTAL_MATERIALS);
              setSelectedTopic('Impression Materials');
              setPreviousView('dashboard');
              setView('quiz');
            } else {
              if (isPreviewUser) {
                setShowSubscribePopup(true);
              } else if (canSeeAdmin) {
                setView('question-banks');
              } else {
                setView('dashboard');
              }
            }
          }
          }
          mockScores={mockScoreHistory}
        />

        {/* We keep the subject grids below as "Course Content" for easy access */}
        <div className="pt-8 border-t border-slate-200 dark:border-white/5">
          {/* In preview mode, show Dental Materials first with "Preview Available" label */}
          {previewMode && (
            <div className="mb-12">
              <div className="flex items-center gap-4 mb-6">
                <h2 className="text-lg font-bold uppercase tracking-widest px-4 border rounded-full py-1 bg-green-50 dark:bg-green-900/20 border-green-500/30 text-green-700 dark:text-green-400">
                  ✓ Preview Available
                </h2>
                <div className="h-px flex-1 bg-green-500/20"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                <SubjectCard
                  key={MedicalSubject.DENTAL_MATERIALS}
                  subject={MedicalSubject.DENTAL_MATERIALS}
                  onClick={handleSubjectClick}
                  isCompleted={completedSubjects.has(MedicalSubject.DENTAL_MATERIALS)}
                  onToggleComplete={handleToggleComplete}
                />
              </div>
            </div>
          )}

          <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-8 px-2">
            {previewMode ? 'Unlock Premium Access' : 'Course Modules'}
          </h3>
          {renderSubjectGrid("MBBS Major Topics", FCPS_PART_1_MBBS_MAJOR, "text-purple-600 dark:text-purple-400", "border-purple-500/20")}
          {renderSubjectGrid("MBBS Minor Topics", FCPS_PART_1_MBBS_MINOR, "text-purple-600 dark:text-purple-400", "border-purple-500/20")}
          {renderSubjectGrid("Dental Sciences", FCPS_PART_1_DENTAL, "text-purple-600 dark:text-purple-400", "border-purple-500/20")}
        </div>
      </div>
    );
  };

  const heroStats = { percent: '50%', label: 'FCPS Part 1', desc: 'Golden File High-Yield' };

  // Show loading spinner while checking auth
  if (authLoading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
        <DebugPanel user={user} isAdmin={isAdmin} authLoading={authLoading} hasSubscription={hasSubscription} error={debugError} onForceLogout={handleSignOut} />
      </div>
    );
  }

  const authIssueMessage = typeof debugError === 'string' ? debugError : debugError ? String(debugError) : '';
  const showAuthIssue =
    Boolean(authIssueMessage) &&
    !isAuthTimeoutError(authIssueMessage) &&
    !isAuthAbortError(authIssueMessage);

  // Show login form if not authenticated
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {showAuthIssue && (
          <AuthIssueBanner
            message={authIssueMessage}
            onReset={handleResetLogin}
            onReload={() => window.location.reload()}
            onHardReset={handleHardResetCache}
          />
        )}

        {/* Public landing content — indexed by search engines */}
        <div className="max-w-4xl mx-auto px-4 pt-20 pb-6 text-center">
          <h1 className="text-5xl font-bold text-white mb-3">DentEdge</h1>
          <p className="text-xl text-slate-300 mb-2">High-Yield Dental Exam Preparation</p>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Curated notes, 2,000+ MCQs, and AI-powered tutoring for FCPS Part 1.
          </p>
        </div>

        <div className="max-w-3xl mx-auto px-4 pb-8">
          <div className="grid grid-cols-1 gap-4 text-center">
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="text-purple-400 font-bold text-lg">FCPS</div>
              <div className="text-slate-400 text-sm">Part 1 Preparation</div>
            </div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-4 pb-10">
          <div className="grid grid-cols-2 gap-x-6 gap-y-3">
            {['2,000+ practice MCQs', 'Dental Materials & Oral Biology', 'AI-powered study tutor', 'FCPS-specific study plans', 'Progress tracking & analytics', 'Dark & light mode'].map(feature => (
              <div key={feature} className="flex items-center gap-2 text-slate-300 text-sm">
                <span className="text-green-400 font-bold">✓</span>
                {feature}
              </div>
            ))}
          </div>
        </div>

        <AuthForm
          onAuthSuccess={async () => {
            try {
              const { data, error } = await supabase.auth.getSession();
              if (error) {
                setDebugError(error.message || String(error));
                return;
              }
              if (data?.session?.user) {
                setUser(data.session.user);
                setIsAccessChecking(true);
                setAuthLoading(false);
                setDebugError(null);
              } else {
                // Fallback: if session is not yet hydrated, reload to re-run auth bootstrap.
                window.location.reload();
              }
            } catch (err: any) {
              setDebugError(err?.message || String(err));
            }
          }}
          compact
        />
        <DebugPanel user={user} isAdmin={isAdmin} authLoading={authLoading} hasSubscription={hasSubscription} error={debugError} onForceLogout={handleSignOut} />
      </div>
    );
  }

  // RENDER: Preview Mode Banner (for preview mode users only)
  const renderPreviewBanner = () => {
    if (hasSubscription || canSeeAdmin || !previewMode || allowAllAccess) return null;
    return (
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 text-center text-sm font-medium animate-in slide-in-from-top duration-500 relative z-50">
        <span>🔓 You are in Preview Mode. <span className="font-bold underline cursor-pointer" onClick={() => setPreviewMode(false)}>Unlock Full Access</span> to see all content.</span>
      </div>
    );
  };

  // CHECK: Content Access Logic
  const checkContentAccess = (targetView: ViewMode, topic?: string) => {
    // 1. Admins & Subscribers have full access
    if (hasSubscription || canSeeAdmin || allowAllAccess) return true;

    // 2. In preview mode, allow only Impression Materials.
    if (previewMode && isPreviewAllowedTopic(topic) && (targetView === 'summary' || targetView === 'quiz')) return true;

    // 3. Free content fallback.
    if (isPreviewAllowedTopic(topic)) return true;

    // 4. Otherwise: Blocked
    return false;
  };

  const handleRestrictedNavigation = (targetView: ViewMode, topic?: string, subject?: MedicalSubject) => {
    if (checkContentAccess(targetView, topic)) {
      startTransition(() => {
        if (subject) setSelectedSubject(subject);
        if (topic) setSelectedTopic(topic);
        setView(targetView);
      });
    } else {
      // Show subscription popup modal for locked content
      setShowSubscribePopup(true);
    }
  };



  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
      </div>
    }>
      {/* Subscription Popup Modal */}
      {showSubscribePopup && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-8 shadow-2xl border border-slate-200 dark:border-slate-800 text-center animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white mx-auto mb-4 shadow-lg">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">This Topic is Locked</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">Subscribe to unlock all topics, notes, and MCQs.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowSubscribePopup(false)}
                className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-slate-200 dark:border-slate-700"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowSubscribePopup(false);
                  setPreviewMode(false);
                }}
                className="flex-1 px-4 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:brightness-110 shadow-lg transition-all"
              >
                Subscribe Now
              </button>
            </div>
          </div>
        </div>
      )}

      <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark bg-slate-900' : 'bg-slate-50'}`}>
        {renderPreviewBanner()}

        {showAuthIssue && (
          <AuthIssueBanner
            message={authIssueMessage}
            onReset={handleResetLogin}
            onReload={() => window.location.reload()}
            onHardReset={handleHardResetCache}
          />
        )}
        <DebugPanel user={user} isAdmin={isAdmin} authLoading={authLoading} hasSubscription={hasSubscription} error={debugError} onForceLogout={handleSignOut} />

        {/* Floating Theme Toggle for Immersive Views */}
        {(view === 'quiz' || view === 'summary') && (
          <div className="fixed top-6 right-8 z-[100] animate-in slide-in-from-right-10 duration-500">
            <button
              onClick={toggleTheme}
              className="p-3 rounded-2xl bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-white transition-all shadow-2xl border border-slate-200 dark:border-white/10 group active:scale-95"
              title="Toggle Theme"
            >
              {isDarkMode ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
              )}
            </button>
          </div>
        )}

        {/* --- Desktop Top Navigation (Restricted to Subscribers/Admins) --- */}
        {(hasSubscription || canSeeAdmin) && view !== 'quiz' && view !== 'summary' && (
          <nav className="glass-panel sticky top-4 mx-4 md:mx-8 z-40 rounded-2xl px-6 py-3 hidden md:flex items-center justify-between mt-4">
            <div
              className="flex items-center gap-3 cursor-pointer group"
              onClick={handleBackToDashboard}
            >
              <DentEdgeLogo size={48} className="drop-shadow-lg group-hover:drop-shadow-2xl transition-all" />
              <span className="font-bold text-xl tracking-tight text-slate-800 dark:text-white">DentEdge</span>
            </div>

            <div className="flex items-center bg-white/50 dark:bg-slate-900/50 rounded-full p-1 border border-slate-200 dark:border-white/5">
              <button
                onClick={handleBackToDashboard}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${view === 'dashboard' ? 'bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
              >
                Dashboard
              </button>
              {/* MCQ Bank button removed as per user request */}
              <button
                onClick={() => setView('ai-chat')}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${view === 'ai-chat' ? 'bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
              >
                AI Tutor
              </button>

              {canSeeAdmin && (
                <button
                  onClick={() => setView('admin' as any)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${view === 'admin' ? 'bg-purple-500 text-white shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-purple-500'}`}
                >
                  Admin
                </button>
              )}
            </div>

            <div className="flex items-center gap-4">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-white transition-colors"
                title="Toggle Theme"
              >
                {isDarkMode ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
                )}
              </button>

              {canSeeAdmin && (
                <button
                  onClick={() => setView('admin' as any)}
                  className="px-3 py-1.5 bg-purple-600 text-white text-xs font-bold rounded shadow-lg hover:bg-purple-500 transition-all border border-purple-400"
                >
                  ADMIN PANEL
                </button>
              )}

              {/* User Profile & Sign Out */}
              <div className="flex items-center gap-3">
                <span className="text-sm text-slate-600 dark:text-slate-400 hidden lg:block">
                  {user?.email?.split('@')[0]}
                </span>
                <button
                  onClick={handleSignOut}
                  className="px-4 py-2 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors text-sm font-medium"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </nav>
        )}

        {/* Main Content Area */}
        <main className="flex-1 container max-w-[1800px] mx-auto px-4 py-8 pb-32 md:pb-8">

          {/* STRICT GATE: Block everything if not subscribed/admin, unless in preview mode */}
          {(!hasSubscription && !canSeeAdmin && !previewMode && isAccessChecking && !debugError && !hasAccessCache) ? (
            <div className="max-w-3xl mx-auto text-center py-16 animate-in fade-in duration-300">
              <div className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-sm">
                <Loader2 className="w-5 h-5 animate-spin text-purple-600" />
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                  Verifying your account access...
                </span>
              </div>
            </div>
          ) : (accessCheckTimedOut && !hasSubscription && !canSeeAdmin && !previewMode) ? (
            <div className="max-w-md mx-auto text-center py-16 animate-in fade-in duration-300">
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                  Could not verify your access. This is usually a temporary network issue.
                </p>
                <div className="flex items-center justify-center gap-3">
                  <button
                    onClick={() => { setAccessCheckTimedOut(false); refreshAccessFromBackend(); }}
                    className="px-4 py-2 rounded-xl bg-purple-600 text-white hover:bg-purple-700 transition-colors text-sm font-medium"
                  >
                    Retry
                  </button>
                  <button
                    onClick={handleSignOut}
                    className="px-4 py-2 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors text-sm font-medium"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          ) : ((!hasSubscription && !canSeeAdmin && !previewMode) ? (
            <div className="animate-in fade-in zoom-in-95 duration-500">
              {/* Mobile Sign Out logic since Nav is hidden */}
              <div className="flex justify-end mb-4 mx-4">
                <button
                  onClick={handleSignOut}
                  className="px-4 py-2 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors text-sm font-medium"
                >
                  Sign Out
                </button>
              </div>

              <div className="max-w-4xl mx-auto text-center mb-8">
                <div className="inline-block p-3 rounded-full bg-red-100 dark:bg-red-900/30 text-red-500 mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                </div>
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Account Pending Activation</h2>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  Select a plan below to activate your account. If you have already paid, please contact Admin to approve your request.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-2">
                  <button
                    onClick={handleIHavePaidRefresh}
                    className="px-4 py-2.5 rounded-xl bg-green-600 hover:bg-green-500 text-white text-sm font-bold shadow-lg transition-colors"
                  >
                    I Have Paid - Refresh Access
                  </button>
                  <button
                    onClick={handleHardResetCache}
                    className="px-4 py-2.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-white text-sm font-medium transition-colors"
                  >
                    Hard Reset Cache
                  </button>
                </div>

              </div>

              {/* Single Row Grid: Preview Card + Subscription Plans */}
              <div className="max-w-6xl mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                  {/* FREE PREVIEW Card (Square) */}
                  <div
                    onClick={() => {
                      setPreviewMode(true);
                      setSelectedSubject(MedicalSubject.DENTAL_MATERIALS);
                      setView('dashboard');
                    }}
                    className="relative cursor-pointer group"
                  >
                    {/* FREE PREVIEW Badge */}
                    <div className="absolute -top-3 right-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 rounded-full text-[10px] font-bold shadow-lg z-10">
                      FREE PREVIEW
                    </div>

                    {/* Square Card */}
                    <div className="glass-panel min-h-80 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-500/30 hover:border-purple-400 dark:hover:border-purple-400 transition-all hover:shadow-lg group-hover:scale-105 flex flex-col items-center justify-center p-6 text-center">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-100 to-blue-100 dark:from-cyan-900/40 dark:to-blue-900/40 flex items-center justify-center text-cyan-600 dark:text-cyan-400 mb-3">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                        Dental Materials
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                        1 Topic Free
                      </p>
                      <div className="inline-flex items-center gap-1 px-2 py-1 bg-purple-200 dark:bg-purple-700 rounded text-[10px] font-semibold text-purple-700 dark:text-purple-200">
                        Try Free
                      </div>
                    </div>
                  </div>

                  {/* Subscription Plans (3 columns) */}
                  <SubscriptionPlans onSelectPlan={handleSubscriptionPlanSelect} compact={true} />

                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Special Case: Free AI Chat for Unsubscribed Users uses the same view render logic, 
                  but we need to ensure the standard dashboard views don't leak if they somehow got here.
                  Since 'view' state controls rendering, logic holds. 
              */}

              {view === 'dashboard' && (hasSubscription || canSeeAdmin || previewMode || allowAllAccess) && (
                <div className="animate-in fade-in duration-500">

                  {/* Program Badge */}
                  <div className="flex justify-center mb-8">
                    <div className="px-6 py-2 rounded-full text-sm font-bold bg-purple-600 text-white shadow-lg shadow-purple-900/50">
                      FCPS Part 1
                    </div>
                  </div>

                  {/* Main Dashboard Content */}
                  {renderDashboardContent()}
                </div>
              )}

              {view === 'subject-detail' && selectedSubject && (
                <div className="animate-in slide-in-from-right-4 fade-in duration-500">
                  <SubjectDetailView
                    subject={selectedSubject as MedicalSubject}
                    stream={examStream}
                    onSelectNoteTopic={handleNoteTopicSelect}
                    onSelectQuizTopic={handleQuizTopicSelect}
                    onBack={handleBackToDashboard}
                    isPreviewMode={isPreviewUser}
                  />
                </div>
              )}

              {view === 'summary' && selectedSubject && (
                <div className="animate-in slide-in-from-right-4 fade-in duration-500">
                  <SummaryView
                    isDarkMode={isDarkMode}
                    subject={selectedSubject as MedicalSubject}
                    topic={selectedTopic}
                    stream={examStream}
                    onStartQuiz={handleStartQuiz}
                    onBack={handleBackToSubject}
                    onPageContentChange={setPageContext}
                    isAdmin={canSeeAdmin}
                  />
                </div>
              )}

              {view === 'quiz' && selectedSubject && (
                <div className="animate-in zoom-in-95 fade-in duration-300">
                  <Quiz
                    subject={selectedSubject as MedicalSubject}
                    topic={selectedTopic}
                    stream={examStream}
                    onClose={() => {
                      if (selectedTopic && typeof selectedSubject === 'string') {
                        // Came from Topic Bank
                        setView(canSeeAdmin ? 'question-banks' : 'dashboard');
                      } else if (selectedTopic) {
                        // Came from Summary View (Standard Flow)
                        setView('summary');
                      } else {
                        // Fallback
                        setView(canSeeAdmin ? 'question-banks' : 'dashboard');
                      }
                    }}
                    onReviewNotes={() => {
                      if (typeof selectedSubject === 'string' && selectedSubject.includes(' - Practice Questions')) {
                        const cleanSubject = selectedSubject.replace(' - Practice Questions', '');
                        setSelectedSubject(cleanSubject);
                        setSelectedTopic(undefined);
                      }
                      setView('summary');
                    }}
                    onExitToDashboard={() => {
                      setSelectedSubject(null);
                      setSelectedTopic(undefined);
                      setView('dashboard');
                    }}
                    onUpdateStats={handleBatchUpdateQuizStats}
                  />
                </div>
              )}


              {view === 'question-banks' && canSeeAdmin && (
                <div className="animate-in fade-in zoom-in-95 duration-300">
                  <QuestionBankView
                    stream={examStream}
                    onSelectTopic={handleTopicBankClick}
                  />
                </div>
              )}

              {view === 'admin' && canSeeAdmin && (
                <div className="animate-in fade-in zoom-in-95 duration-300">
                  <Suspense fallback={<Loader2 className="w-8 h-8 animate-spin text-purple-600 mx-auto" />}>
                    <AdminDashboard />
                  </Suspense>
                </div>
              )}

              {view === 'ai-chat' && (
                <div className="animate-in fade-in zoom-in-95 duration-300">
                  <Suspense fallback={<Loader2 className="w-8 h-8 animate-spin text-cyan-600 mx-auto" />}>
                    <AIChatView />
                  </Suspense>
                </div>
              )}
            </>
          ))}

        </main>

        {/* AI Tutor */}
        <AIAssistant pageContext={pageContext} />

        {/* Quick Quiz Modal */}
        {showQuickQuiz && quizSubject && (
          <QuickQuizModal
            subject={quizSubject}
            stream={examStream}
            onClose={() => setShowQuickQuiz(false)}
            onUpdateStats={handleUpdateQuizStats}
            stats={quizStats[quizSubject]}
          />
        )}
      </div>
    </Suspense>
  );
};

export default App;
