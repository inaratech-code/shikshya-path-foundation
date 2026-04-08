import Skeleton from '@/components/ui/Skeleton';

export default function FrontendLoading() {
  return (
    <div className="min-h-[50vh] w-full max-w-7xl mx-auto px-4 sm:px-6 py-16 space-y-8">
      <div className="space-y-3">
        <Skeleton className="h-10 w-2/3 max-w-md" rounded="lg" />
        <Skeleton className="h-5 w-full max-w-xl" rounded="md" />
        <Skeleton className="h-5 w-5/6 max-w-lg" rounded="md" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm space-y-3">
            <Skeleton className="h-40 w-full" rounded="xl" />
            <Skeleton className="h-4 w-3/4" rounded="md" />
            <Skeleton className="h-3 w-full" rounded="md" />
          </div>
        ))}
      </div>
    </div>
  );
}
