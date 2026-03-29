'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { LogIn, AlertCircle } from 'lucide-react';
import { MAIN_SITE_LOGO_PATH } from '@/data/siteContent';
import {
  DEMO_ADMIN_ID,
  DEMO_ADMIN_PASSWORD,
  demoCredentialsMatch,
  hasAdminSession,
  saveAdminSession,
} from '@/lib/adminAuth';

export default function AdminLoginPage() {
  const router = useRouter();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (hasAdminSession()) {
      router.replace('/admin');
    }
  }, [router]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    if (demoCredentialsMatch(id, password)) {
      saveAdminSession();
      router.push('/admin');
      router.refresh();
    } else {
      setError('Invalid admin ID or password.');
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
          <div className="rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-sm text-slate-600">
            <p className="font-semibold text-slate-800 mb-1">Demo credentials</p>
            <p>
              <span className="text-slate-500">ID:</span>{' '}
              <code className="text-slate-900 font-mono text-[13px]">{DEMO_ADMIN_ID}</code>
            </p>
            <p className="mt-1">
              <span className="text-slate-500">Password:</span>{' '}
              <code className="text-slate-900 font-mono text-[13px]">{DEMO_ADMIN_PASSWORD}</code>
            </p>
          </div>

          {error && (
            <div
              className="flex items-start gap-2 rounded-xl bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-800"
              role="alert"
            >
              <AlertCircle className="shrink-0 mt-0.5" size={18} />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label htmlFor="admin-id" className="block text-sm font-semibold text-slate-700 mb-2">
              Admin ID
            </label>
            <input
              id="admin-id"
              name="adminId"
              type="text"
              autoComplete="username"
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all bg-slate-50"
              placeholder="Enter admin ID"
              required
            />
          </div>

          <div>
            <label htmlFor="admin-password" className="block text-sm font-semibold text-slate-700 mb-2">
              Password
            </label>
            <input
              id="admin-password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all bg-slate-50"
              placeholder="Enter password"
              required
            />
          </div>

          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center gap-2 text-slate-600 cursor-pointer">
              <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-600" />
              Remember me
            </label>
            <span className="text-slate-400">Forgot password? Contact support.</span>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white font-bold px-8 py-4 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-60 shadow-xl shadow-blue-600/20 text-lg mt-4"
          >
            Login to Dashboard <LogIn size={20} />
          </button>
        </form>
      </div>
    </div>
  );
}
