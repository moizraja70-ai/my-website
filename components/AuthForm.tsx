import React, { useState } from 'react';
import { supabase } from '../services/supabaseClient';
import {
  User as UserIcon,
  Phone,
  Mail,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle2,
  Loader2,
} from 'lucide-react';

interface AuthFormProps {
  onAuthSuccess: () => Promise<void>;
  compact?: boolean;
}

/* ------------------------------------------------------------------ */
/*  Auth helpers (talk directly to the shared Supabase singleton)      */
/* ------------------------------------------------------------------ */

const signUpWithEmail = async (
  email: string,
  password: string,
  meta: { fullName: string; phone: string },
) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: meta.fullName,
        phone: meta.phone,
      },
    },
  });
  return { data, error };
};

const signInWithEmail = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};

const getAuthRedirectUrl = (): string => {
  // Allow overriding in local dev via `.env.local`:
  // `VITE_AUTH_REDIRECT_URL=http://localhost:5173/`
  const configured = (import.meta as any)?.env?.VITE_AUTH_REDIRECT_URL;
  if (typeof configured === 'string' && configured.trim()) return configured.trim();

  // Include trailing slash to match common Supabase allowlist patterns.
  try {
    const url = new URL(window.location.href);
    url.hash = '';
    url.search = '';
    const base = `${url.origin}${url.pathname}`;
    return base.endsWith('/') ? base : `${base}/`;
  } catch {
    const origin = window.location.origin;
    return origin.endsWith('/') ? origin : `${origin}/`;
  }
};

const signInWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: getAuthRedirectUrl(),
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
    },
  });
  return { data, error };
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

const AuthForm: React.FC<AuthFormProps> = ({ onAuthSuccess, compact }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  /* ---- form submit ---- */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    // Sign-up validations
    if (!isLogin) {
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        setLoading(false);
        return;
      }
      if (!fullName.trim()) {
        setError('Please enter your full name');
        setLoading(false);
        return;
      }
      if (!phone.trim()) {
        setError('Please enter your mobile number');
        setLoading(false);
        return;
      }
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    try {
      if (isLogin) {
        const { error: err } = await signInWithEmail(email, password);
        if (err) setError(err.message);
        else onAuthSuccess();
      } else {
        const { error: err } = await signUpWithEmail(email, password, {
          fullName,
          phone,
        });
        if (err) {
          setError(err.message);
        } else {
          setSuccess('Account created successfully! Signing you in...');
          setTimeout(async () => {
            const { error: signInErr } = await signInWithEmail(email, password);
            if (!signInErr) onAuthSuccess();
          }, 1500);
        }
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  /* ---- Google button handler ---- */
  const handleGoogleSignIn = async () => {
    try {
      console.log('Google Sign-In clicked');
      setError(null);
      setSuccess(null);
      setLoading(true);

      const { error: err } = await signInWithGoogle();
      if (err) {
        console.error('Google Sign-In Error:', err);
        setError(err.message);
        setLoading(false);
        return;
      }

      setSuccess(
        'Redirecting to Google... If nothing happens, allow pop-ups/third-party cookies and try again.',
      );
      setLoading(false);
    } catch (err: any) {
      console.error('Google Sign-In Exception:', err);
      setError(err.message);
      setLoading(false);
    }
  };

  /* ---- helpers for tab switch ---- */
  const switchToLogin = () => {
    setIsLogin(true);
    setError(null);
    setSuccess(null);
  };
  const switchToSignUp = () => {
    setIsLogin(false);
    setError(null);
    setSuccess(null);
  };

  /* ---------------------------------------------------------------- */
  /*  Render                                                           */
  /* ---------------------------------------------------------------- */
  return (
    <div
      className={
        compact
          ? 'max-w-md mx-auto px-4 pb-16'
          : 'min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4'
      }
    >
      <div className="w-full max-w-md">
        {/* Header (hidden in compact mode) */}
        {!compact && (
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              DentEdge
            </h1>
            <p className="text-slate-400 mt-2">
              Your dental exam preparation companion
            </p>
          </div>
        )}

        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 shadow-2xl">
          {/* Tabs */}
          <div className="flex bg-slate-900/50 rounded-xl p-1 mb-6">
            <button
              type="button"
              onClick={switchToLogin}
              className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                isLogin
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                  : 'text-slate-400 hover:text-slate-300'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={switchToSignUp}
              className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                isLogin
                  ? 'text-slate-400 hover:text-slate-300'
                  : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Sign-up only fields */}
            {!isLogin && (
              <>
                {/* Full name */}
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required={!isLogin}
                    className="w-full pl-11 pr-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                  />
                </div>

                {/* Mobile number */}
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="tel"
                    placeholder="Mobile Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required={!isLogin}
                    className="w-full pl-11 pr-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                  />
                </div>
              </>
            )}

            {/* Email */}
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-11 pr-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-11 pr-11 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>

            {/* Confirm password (sign-up only) */}
            {!isLogin && (
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full pl-11 pr-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                />
              </div>
            )}

            {/* Error message */}
            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Success message */}
            {success && (
              <div className="flex items-center gap-2 p-3 bg-green-500/10 border border-green-500/30 rounded-xl text-green-400 text-sm">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                <span>{success}</span>
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold rounded-xl shadow-lg shadow-purple-500/25 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  {isLogin ? 'Signing in...' : 'Creating account...'}
                </>
              ) : isLogin ? (
                'Sign In'
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-700" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-slate-800 text-slate-500">
                Or continue with
              </span>
            </div>
          </div>

          {/* Google button */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full py-3 bg-white text-slate-900 font-semibold rounded-xl hover:bg-slate-100 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.26.81-.58z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Google
          </button>

          {/* Forgot password (login only) */}
          {isLogin && (
            <p className="text-center text-slate-500 text-sm mt-6">
              Forgot your password?{' '}
              <button className="text-purple-400 hover:text-purple-300 transition-colors">
                Reset it here
              </button>
            </p>
          )}
        </div>

        {/* Footer */}
        <p className="text-center text-slate-500 text-xs mt-6">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
