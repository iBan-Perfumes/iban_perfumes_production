export default function AdminProductsLoading() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="h-7 w-40 rounded-lg bg-stone-200" />
          <div className="h-4 w-64 max-w-full rounded bg-stone-100" />
        </div>
        <div className="h-9 w-32 rounded-lg bg-amber-100" />
      </div>
      <div className="h-16 rounded-2xl border border-stone-200 bg-white" />
      <div className="h-96 rounded-2xl border border-stone-200 bg-white" />
    </div>
  );
}
