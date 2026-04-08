import Skeleton from '@/components/ui/Skeleton';

export default function AdminLoading() {
  return (
    <div className="min-w-0 max-w-full space-y-8">
      <div className="space-y-2">
        <Skeleton className="h-9 w-64 max-w-full" rounded="lg" />
        <Skeleton className="h-4 w-96 max-w-full" rounded="md" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4">
            <Skeleton className="h-12 w-12 rounded-xl" />
            <Skeleton className="h-8 w-24" rounded="lg" />
            <Skeleton className="h-3 w-full" rounded="md" />
          </div>
        ))}
      </div>
      <Skeleton className="h-48 w-full rounded-2xl" />
    </div>
  );
}
