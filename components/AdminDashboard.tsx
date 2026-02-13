import React, { useState, useEffect, useRef } from 'react';
import { CircleX, Search, AlertTriangle, Loader, CheckCircle } from 'lucide-react';
import {
  fetchPaginatedProfiles,
  updateUserProfile,
  deleteUser,
} from '../services/supabaseClient';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface UserProfile {
  id: string;
  email: string | null;
  full_name: string | null;
  role: string | null;
  is_subscribed: boolean;
  subscription_plan: string | null;
  subscription_end_date: string | null;
}

type SubscriptionDuration = '2-months' | '4-months' | '6-months';

const PAGE_SIZE = 200;
const REQUEST_TIMEOUT_MS = 20_000;
const MAX_AUTO_RETRIES = 2;
const RETRY_DELAY_MS = 1_200;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** True when the error message looks like an abort / cancellation. */
function isAbortError(message: string): boolean {
  return message.toLowerCase().includes('abort');
}

/** True when the error is likely a timeout or abort — i.e. transient. */
function isTransientError(message: string): boolean {
  const lower = message.toLowerCase();
  return isAbortError(message) || lower.includes('timeout');
}

/** Map a duration key to the number of months it represents. */
function durationToMonths(duration: SubscriptionDuration): number {
  switch (duration) {
    case '2-months':
      return 2;
    case '6-months':
      return 6;
    case '4-months':
    default:
      return 4;
  }
}

// ---------------------------------------------------------------------------
// RLS Fix SQL (displayed when a permission error is detected)
// ---------------------------------------------------------------------------

const RLS_FIX_SQL = `-- Enable RLS if it isn't already
alter table public.profiles enable row level security;

-- Allow users to read their own profile
create policy "Profiles: read own"
on public.profiles for select
using (auth.uid() = id);

-- Allow admins to read all profiles
create policy "Profiles: admin read"
on public.profiles for select
using (
  exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  )
);

-- Allow admins to update profiles
create policy "Profiles: admin update"
on public.profiles for update
using (
  exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  )
)
with check (
  exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  )
);`;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const AdminDashboard: React.FC = () => {
  // ---- State ----------------------------------------------------------------

  const [users, setUsers] = useState<UserProfile[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [errorCode, setErrorCode] = useState<string | null>(null);
  const [showRlsFix, setShowRlsFix] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [processingUserId, setProcessingUserId] = useState<string | null>(null);
  const [selectedPlans, setSelectedPlans] = useState<Record<string, SubscriptionDuration>>({});
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const retryCount = useRef<number>(0);
  const [hiddenUserIds, setHiddenUserIds] = useState<Set<string>>(new Set());

  // ---- Initial fetch --------------------------------------------------------

  useEffect(() => {
    fetchUsers(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---- Retry logic ----------------------------------------------------------

  /**
   * Attempt an automatic retry for transient errors (max `MAX_AUTO_RETRIES`).
   * Returns `true` if a retry was scheduled, `false` otherwise.
   */
  function scheduleRetryIfPossible(isFullRefresh: boolean): boolean {
    if (retryCount.current >= MAX_AUTO_RETRIES) return false;
    retryCount.current += 1;
    setTimeout(() => fetchUsers(isFullRefresh, { isRetry: true }), RETRY_DELAY_MS);
    return true;
  }

  // ---- Fetch users (paginated) ----------------------------------------------

  async function fetchUsers(
    isFullRefresh: boolean = true,
    options?: { isRetry?: boolean },
  ): Promise<void> {
    const isRetry = !!options?.isRetry;
    let retryScheduled = false;

    // Reset state on a fresh (non-retry) full refresh.
    if (isFullRefresh) {
      if (!isRetry) {
        retryCount.current = 0;
        setUsers([]);
        setCurrentPage(0);
        setHasMore(true);
        setHiddenUserIds(new Set());
      }
      setIsLoading(true);
      setErrorMessage(null);
      setErrorCode(null);
      setShowRlsFix(false);
    } else {
      setIsLoadingMore(true);
    }

    try {
      // Build a timeout race so a hung request doesn't block the UI forever.
      const timeoutPromise = new Promise<never>((_resolve, reject) =>
        setTimeout(
          () => reject(new Error('Request timed out. Check your network.')),
          REQUEST_TIMEOUT_MS,
        ),
      );

      const pageIndex = isFullRefresh ? 0 : currentPage + 1;
      const rangeStart = pageIndex * PAGE_SIZE;
      const rangeEnd = rangeStart + PAGE_SIZE - 1;

      const response = await Promise.race([
        fetchPaginatedProfiles({ from: rangeStart, to: rangeEnd }),
        timeoutPromise,
      ]);

      const { data, error } = response || {};

      if (error) {
        console.error('Failed to fetch users:', error);
        const message = (error as any).message || JSON.stringify(error);

        if (isTransientError(message) && scheduleRetryIfPossible(isFullRefresh)) {
          retryScheduled = true;
          return;
        }

        setErrorMessage(message);
        setErrorCode((error as any).code || null);
      } else if (data) {
        const fetchedUsers: UserProfile[] = data || [];
        setUsers((prev) => (isFullRefresh ? fetchedUsers : [...prev, ...fetchedUsers]));
        setCurrentPage(pageIndex);
        setHasMore(fetchedUsers.length === PAGE_SIZE);
      }
    } catch (err: unknown) {
      console.error('Fetch error:', err);
      const message =
        (err as Error)?.message || String(err) || 'Unknown error occurred';

      if (isTransientError(message) && scheduleRetryIfPossible(isFullRefresh)) {
        retryScheduled = true;
        return;
      }

      setErrorMessage(message);
    } finally {
      if (retryScheduled) return;
      if (isFullRefresh) {
        setIsLoading(false);
      } else {
        setIsLoadingMore(false);
      }
    }
  }

  // ---- Toggle subscription --------------------------------------------------

  async function handleToggleSubscription(user: UserProfile): Promise<void> {
    if (user.role === 'blocked') {
      alert('This user is blocked. Unblock them first if you want to grant access.');
      return;
    }

    const displayName = user.email || user.id;
    const action = user.is_subscribed ? 'REMOVE' : 'GRANT';

    if (!confirm(`Are you sure you want to ${action} subscription for ${displayName}?`)) {
      return;
    }

    setProcessingUserId(user.id);

    const plan: SubscriptionDuration = selectedPlans[user.id] || '4-months';
    const months = durationToMonths(plan);

    const updatePayload = user.is_subscribed
      ? {
          is_subscribed: false,
          subscription_plan: null,
          subscription_end_date: null,
        }
      : {
          is_subscribed: true,
          subscription_plan: plan,
          subscription_end_date: new Date(
            new Date().setMonth(new Date().getMonth() + months),
          ).toISOString(),
        };

    const { error } = await updateUserProfile(user.id, updatePayload);

    if (error) {
      alert('Failed to update: ' + (error as any).message);
    } else {
      await fetchUsers();
    }

    setProcessingUserId(null);
  }

  // ---- Block / Unblock user -------------------------------------------------

  async function handleToggleBlock(user: UserProfile): Promise<void> {
    if (user.role === 'admin') {
      alert('Admins cannot be blocked.');
      return;
    }

    const isBlocked = user.role === 'blocked';
    const action = isBlocked ? 'UNBLOCK' : 'BLOCK';
    const displayName = user.email || user.id;

    if (!confirm(`Are you sure you want to ${action} ${displayName}?`)) {
      return;
    }

    setProcessingUserId(user.id);

    const updatePayload = isBlocked
      ? { role: 'user' }
      : {
          role: 'blocked',
          is_subscribed: false,
          subscription_plan: null,
          subscription_end_date: null,
        };

    const { error } = await updateUserProfile(user.id, updatePayload);

    if (error) {
      alert('Failed to update: ' + (error as any).message);
    } else {
      await fetchUsers();
    }

    setProcessingUserId(null);
  }

  // ---- Delete user ----------------------------------------------------------

  async function handleDeleteUser(user: UserProfile): Promise<void> {
    const displayName = user.email || user.id;

    if (!confirm(`Permanently DELETE ${displayName}? This removes the user from Auth and Profiles.`)) {
      return;
    }

    setProcessingUserId(user.id);

    const { error } = await deleteUser(user.id);

    if (error) {
      alert('Failed to delete: ' + ((error as any).message || JSON.stringify(error)));
    } else {
      // Optimistically remove the user from local state.
      setUsers((prev) => prev.filter((u) => u.id !== user.id));
    }

    setProcessingUserId(null);
  }

  // ---- Hide a user from the list (local-only) ------------------------------

  function handleHideUser(userId: string): void {
    setHiddenUserIds((prev) => new Set(prev).add(userId));
  }

  // ---- Derived / computed values --------------------------------------------

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filteredUsers: UserProfile[] = (
    normalizedQuery.length === 0
      ? users
      : users.filter(
          (u) =>
            (u.email || '').toLowerCase().includes(normalizedQuery) ||
            (u.full_name || '').toLowerCase().includes(normalizedQuery) ||
            u.id.toLowerCase().includes(normalizedQuery),
        )
  ).filter((u) => !hiddenUserIds.has(u.id));

  const normalizedError = (errorMessage || '').toLowerCase();
  const isPermissionError =
    errorCode === '42501' ||
    normalizedError.includes('permission') ||
    normalizedError.includes('rls') ||
    normalizedError.includes('not authorized');
  const isTimeoutError =
    normalizedError.includes('timed out') || normalizedError.includes('timeout');
  const isAbort = normalizedError.includes('abort');

  // ---- Render ---------------------------------------------------------------

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans p-6">
      <div className="max-w-6xl mx-auto">
        {/* ---- Header ---- */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
            <p className="text-slate-500 mt-1">Manage users and subscriptions</p>
          </div>
          <button
            onClick={() => (window.location.href = '/')}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm transition-colors"
          >
            Back to App
          </button>
        </div>

        {/* ---- Search & Refresh toolbar ---- */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 mb-6 flex gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search by email or name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-purple-500"
            />
          </div>
          <button
            onClick={() => fetchUsers(true)}
            disabled={isLoading}
            className="px-4 py-2 bg-purple-600/20 text-purple-300 hover:bg-purple-600/30 rounded-lg text-sm font-medium transition-colors"
          >
            Refresh List
          </button>
        </div>

        {/* ---- Main table card ---- */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
          {/* ---- Error banner ---- */}
          {errorMessage && (
            <div className="p-4 bg-red-900/50 border-l-4 border-red-500 text-red-200 mb-4 mx-4 mt-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 flex-shrink-0" />
                <strong>Error Loading Data:</strong> {errorMessage}
              </div>

              <div className="text-sm opacity-80 mt-1">
                {isPermissionError &&
                  'Likely cause: RLS policy is blocking admin access.'}
                {!isPermissionError &&
                  (isTimeoutError || isAbort) &&
                  'Likely cause: network timeout or Supabase URL/key misconfigured.'}
                {!isPermissionError &&
                  !isTimeoutError &&
                  'Likely cause: network error or permissions.'}
              </div>

              {isPermissionError && (
                <button
                  onClick={() => setShowRlsFix((prev) => !prev)}
                  className="mt-3 px-3 py-1.5 rounded-lg bg-red-500/20 text-red-100 hover:bg-red-500/30 text-xs font-medium"
                >
                  {showRlsFix ? 'Hide Fix' : 'Show RLS Fix SQL'}
                </button>
              )}

              {isPermissionError && showRlsFix && (
                <pre className="mt-3 text-xs bg-black/40 border border-red-500/30 rounded-lg p-3 overflow-auto whitespace-pre-wrap">
                  {RLS_FIX_SQL}
                </pre>
              )}
            </div>
          )}

          {/* ---- Loading spinner ---- */}
          {isLoading ? (
            <div className="p-12 flex justify-center">
              <Loader className="w-8 h-8 animate-spin text-purple-500" />
            </div>
          ) : (
            /* ---- Users table ---- */
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-800/50 text-slate-400 text-xs uppercase tracking-wider">
                    <th className="p-4 font-medium">User</th>
                    <th className="p-4 font-medium">Role</th>
                    <th className="p-4 font-medium">Status</th>
                    <th className="p-4 font-medium">Plan</th>
                    <th className="p-4 font-medium text-right">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-800">
                  {filteredUsers.map((user) => (
                    <tr
                      key={user.id}
                      className="hover:bg-slate-800/30 transition-colors"
                    >
                      {/* ---- User info ---- */}
                      <td className="p-4">
                        <div className="font-medium text-white">
                          {user.email || '(no email in profile)'}
                        </div>
                        <div className="text-xs text-slate-500">
                          {user.full_name || 'No Name'}
                        </div>
                        <div className="text-[10px] text-slate-600 font-mono mt-0.5">
                          {user.id}
                        </div>
                      </td>

                      {/* ---- Role badge ---- */}
                      <td className="p-4">
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            user.role === 'admin'
                              ? 'bg-purple-500/20 text-purple-300'
                              : 'bg-slate-700/50 text-slate-400'
                          }`}
                        >
                          {user.role || 'user'}
                        </span>
                      </td>

                      {/* ---- Subscription status ---- */}
                      <td className="p-4">
                        {user.role === 'blocked' ? (
                          <div className="flex items-center gap-1.5 text-red-400 text-sm">
                            <CircleX className="w-4 h-4" />
                            <span>Blocked</span>
                          </div>
                        ) : user.is_subscribed ? (
                          <div className="flex items-center gap-1.5 text-green-400 text-sm">
                            <CheckCircle className="w-4 h-4" />
                            <span>Active</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 text-slate-500 text-sm">
                            <CircleX className="w-4 h-4" />
                            <span>Free</span>
                          </div>
                        )}
                      </td>

                      {/* ---- Plan details ---- */}
                      <td className="p-4 text-sm text-slate-400">
                        {user.subscription_plan || '-'}
                        {user.subscription_end_date && (
                          <div className="text-[10px] text-slate-600">
                            Ends:{' '}
                            {new Date(user.subscription_end_date).toLocaleDateString()}
                          </div>
                        )}
                      </td>

                      {/* ---- Action buttons ---- */}
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {/* Hide (remove from local list) */}
                          <button
                            onClick={() => handleHideUser(user.id)}
                            className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all bg-slate-700/40 text-slate-300 hover:bg-slate-700/60 border border-slate-600/40"
                          >
                            Remove
                          </button>

                          {/* Permanently delete */}
                          <button
                            onClick={() => handleDeleteUser(user)}
                            disabled={processingUserId === user.id}
                            className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all bg-red-600/20 text-red-300 hover:bg-red-600/30 border border-red-500/20"
                          >
                            Delete
                          </button>

                          {/* Plan selector (only for unsubscribed, non-blocked users) */}
                          {!user.is_subscribed && user.role !== 'blocked' && (
                            <select
                              value={selectedPlans[user.id] || '4-months'}
                              onChange={(e) =>
                                setSelectedPlans((prev) => ({
                                  ...prev,
                                  [user.id]: e.target.value as SubscriptionDuration,
                                }))
                              }
                              className="bg-slate-900/70 border border-slate-700 text-slate-200 text-xs rounded-lg px-2 py-1.5 focus:outline-none focus:border-purple-500"
                            >
                              <option value="2-months">2 months</option>
                              <option value="4-months">4 months</option>
                              <option value="6-months">6 months</option>
                            </select>
                          )}

                          {/* Grant / Revoke access */}
                          <button
                            onClick={() => handleToggleSubscription(user)}
                            disabled={
                              processingUserId === user.id || user.role === 'blocked'
                            }
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                              user.is_subscribed
                                ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20'
                                : 'bg-green-500/10 text-green-400 hover:bg-green-500/20 border border-green-500/20'
                            } ${user.role === 'blocked' ? 'opacity-50 cursor-not-allowed' : ''}`}
                          >
                            {processingUserId === user.id ? (
                              <Loader className="w-4 h-4 animate-spin" />
                            ) : user.is_subscribed ? (
                              'Revoke Access'
                            ) : (
                              'Grant Access'
                            )}
                          </button>

                          {/* Block / Unblock */}
                          <button
                            onClick={() => handleToggleBlock(user)}
                            disabled={
                              processingUserId === user.id || user.role === 'admin'
                            }
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                              user.role === 'blocked'
                                ? 'bg-slate-700/40 text-slate-300 hover:bg-slate-700/60 border border-slate-600/40'
                                : 'bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20'
                            } ${user.role === 'admin' ? 'opacity-50 cursor-not-allowed' : ''}`}
                          >
                            {user.role === 'blocked' ? 'Unblock' : 'Reject'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {/* ---- Empty state ---- */}
                  {filteredUsers.length === 0 && (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-slate-500">
                        No users found matching &quot;{searchQuery}&quot;
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* ---- Load More button ---- */}
          {!isLoading && hasMore && (
            <div className="p-4 flex justify-center border-t border-slate-800">
              <button
                onClick={() => fetchUsers(false)}
                disabled={isLoadingMore}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-sm text-slate-200 transition-colors flex items-center gap-2"
              >
                {isLoadingMore && <Loader className="w-4 h-4 animate-spin" />}
                {isLoadingMore ? 'Loading...' : 'Load More'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
