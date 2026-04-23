'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { LogIn, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { MAIN_SITE_LOGO_PATH } from '@/data/siteContent';
import { createClient } from '@/lib/supabase/client';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    // Middleware will redirect if already logged in; keep this as a client fallback.
    (async () => {
      try {
        const supabase = createClient();
        const { data } = await supabase.auth.getUser();
        if (data.user) router.replace('/admin');
      } catch {
        // ignore
      }
    })();
  }, [router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });
      if (error) throw error;
      router.push('/admin');
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Invalid email or password.');
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
      <div className="bg-white max-w-md w-full rounded-[2rem] shadow-2xl overflow-hidden">
        <div className="bg-slate-900 p-8 text-center">
          <div className="flex flex-col items-center gap-3 mb-2">
            <div className="inline-flex rounded-2xl bg-white px-4 py-3 shadow-lg shadow-black/25 ring-2 ring-white/10">
              <Image
                src={MAIN_SITE_LOGO_PATH}
                alt="Shikshya Path Foundation Logo"
                width={400}
                height={100}
                className="h-14 sm:h-16 w-auto max-w-[min(100%,280px)] object-contain object-center"
                priority
              />
            </div>
            <h1 className="text-center text-2xl font-black text-white">Admin Secure Access</h1>
            <p className="text-center text-slate-400 text-sm">Shikshya Path Portal</p>
          </div>
        </div>

        <form className="p-8 space-y-6" onSubmit={handleSubmit}>
          {error ? (
            <div
              className="flex items-start gap-2 rounded-xl bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-800"
              role="alert"
            >
              <AlertCircle className="shrink-0 mt-0.5" size={18} />
              <span>{error}</span>
            </div>
          ) : null}

          <div>
            <label htmlFor="admin-email" className="block text-sm font-semibold text-slate-700 mb-2">
              Email
            </label>
            <input
              id="admin-email"
              name="email"
              type="email"
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all bg-slate-50"
              placeholder="Enter admin email"
              required
            />
          </div>

          <div>
            <label htmlFor="admin-password" className="block text-sm font-semibold text-slate-700 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                id="admin-password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 pr-12 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all bg-slate-50"
                placeholder="Enter password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute inset-y-0 right-2 inline-flex items-center justify-center w-10 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center gap-2 text-slate-600 cursor-pointer">
              <input type="checkbox" className="rounded text-[var(--color-primary)] focus:ring-[var(--color-primary)]" />
              Remember me
            </label>
            <span className="text-slate-400">Forgot password? Contact support.</span>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full flex items-center justify-center gap-2 bg-[var(--color-primary)] text-white font-bold px-8 py-4 rounded-xl hover:opacity-95 transition-colors disabled:opacity-60 shadow-xl shadow-[var(--color-primary)]/20 text-lg mt-4"
          >
            Login to Dashboard <LogIn size={20} />
          </button>
        </form>
      </div>
    </div>
  );
}
