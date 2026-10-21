export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-slate-100 px-6 dark:bg-slate-950">
      <div className="panel max-w-md p-8 text-center">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-sky-600">404</p>
        <h1 className="mt-4 text-3xl font-bold text-slate-900 dark:text-white">Page not found</h1>
        <p className="mt-3 text-slate-600 dark:text-slate-300">The route you requested does not exist in ContentForge.</p>
      </div>
    </main>
  );
}
