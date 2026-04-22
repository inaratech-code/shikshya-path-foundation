import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-[70vh] bg-black flex items-center justify-center px-6">
      <div className="flex items-center gap-6 text-white">
        <div className="text-4xl sm:text-5xl font-semibold tracking-tight">404</div>
        <div className="h-10 w-px bg-white/25" aria-hidden="true" />
        <div className="text-sm sm:text-base text-white/90">This page could not be found.</div>
      </div>

      <div className="sr-only">
        <Link href="/">Go to home</Link>
      </div>
    </main>
  );
}

