import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { isAdminEmail } from '@/lib/adminAllowlist';

function supabaseFrom(req: NextRequest, res: NextResponse) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY');
  }

  return createServerClient(url, key, {
    cookies: {
      getAll() {
        return req.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => res.cookies.set(name, value, options));
      },
    },
  });
}

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = supabaseFrom(req, res);

  // Keep the auth session fresh.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = req.nextUrl.pathname;
  const isAdminRoute = pathname === '/admin' || pathname.startsWith('/admin/');
  const isLoginRoute = pathname === '/login';

  if (isAdminRoute) {
    if (!user) {
      const url = req.nextUrl.clone();
      url.pathname = '/login';
      url.searchParams.set('next', pathname);
      return NextResponse.redirect(url);
    }

    const allowlistRaw = process.env.ADMIN_EMAIL_ALLOWLIST;
    if (!isAdminEmail(user.email, allowlistRaw)) {
      const url = req.nextUrl.clone();
      url.pathname = '/login';
      url.searchParams.set('error', 'not_allowed');
      return NextResponse.redirect(url);
    }
  }

  if (isLoginRoute && user) {
    const allowlistRaw = process.env.ADMIN_EMAIL_ALLOWLIST;
    if (isAdminEmail(user.email, allowlistRaw)) {
      const url = req.nextUrl.clone();
      url.pathname = '/admin';
      return NextResponse.redirect(url);
    }
  }

  return res;
}

export const config = {
  matcher: ['/admin/:path*', '/login'],
};

