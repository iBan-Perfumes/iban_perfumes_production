export default function AdminLoading() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="space-y-2">
        <div className="h-7 w-48 rounded-lg bg-stone-200" />
        <div className="h-4 w-80 max-w-full rounded bg-stone-100" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="h-28 rounded-2xl border border-stone-200 bg-white p-5"
          >
            <div className="h-3 w-20 rounded bg-stone-100" />
            <div className="mt-4 h-8 w-16 rounded bg-stone-200" />
          </div>
        ))}
      </div>
      <div className="h-72 rounded-2xl border border-stone-200 bg-white" />
    </div>
  );
}
