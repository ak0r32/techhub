import { ArrowUpRight, BookOpen, CalendarClock, ChartColumnBig, CircleDashed, Film, Sparkles, Star, TrendingUp, Users } from 'lucide-react';
import Link from 'next/link';

const metrics = [
  { label: 'Total courses', value: '128', change: '+12%', icon: BookOpen },
  { label: 'Total videos', value: '96', change: '+9%', icon: Film },
  { label: 'Draft content', value: '24', change: '+4%', icon: CircleDashed },
  { label: 'Published', value: '184', change: '+18%', icon: Star },
];

const recentItems = [
  { title: 'AI for Product Teams', status: 'Published', updated: '2 hours ago' },
  { title: 'Data Storytelling Masterclass', status: 'In Review', updated: '5 hours ago' },
  { title: 'Growth Marketing Shorts Series', status: 'Draft', updated: 'Yesterday' },
];

const upcoming = [
  { title: 'UX Research Bootcamp', date: 'Oct 24, 2026' },
  { title: 'Developer Productivity Sprint', date: 'Oct 27, 2026' },
  { title: 'Intro to AI Governance', date: 'Oct 30, 2026' },
];

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-slate-100 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl p-6">
        <header className="mb-6 flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-700 dark:bg-slate-900">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-sky-600">ContentForge</p>
            <h1 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">Operations dashboard</h1>
          </div>

          <div className="flex items-center gap-3">
            <button className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200">
              Export report
            </button>
            <Link href="/studio/courses" className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white dark:bg-sky-500 dark:text-slate-950">
              New content
            </Link>
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {metrics.map(({ label, value, change, icon: Icon }) => (
            <div key={label} className="panel p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
                  <p className="mt-3 text-3xl font-bold text-slate-900 dark:text-white">{value}</p>
                </div>
                <span className="rounded-lg bg-sky-50 p-3 text-sky-600 dark:bg-sky-500/10 dark:text-sky-300">
                  <Icon className="h-5 w-5" />
                </span>
              </div>
              <p className="mt-4 text-sm font-medium text-emerald-600">{change} this month</p>
            </div>
          ))}
        </section>

        <section className="mt-6 grid gap-6 xl:grid-cols-[1.6fr_1fr]">
          <div className="panel p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Content creation trends</h2>
              <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                <TrendingUp className="h-4 w-4 text-emerald-500" />
                18.6% vs last period
              </div>
            </div>

            <div className="grid h-64 place-items-center rounded-xl border border-dashed border-slate-200 bg-slate-50 text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
              Chart placeholder: content creation trend chart
            </div>
          </div>

          <div className="panel p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Publishing pipeline</h2>
              <ArrowUpRight className="h-4 w-4 text-slate-400" />
            </div>
            <div className="space-y-4">
              {recentItems.map((item) => (
                <div key={item.title} className="rounded-xl border border-slate-200 p-3 dark:border-slate-700">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-medium text-slate-800 dark:text-slate-100">{item.title}</p>
                    <span className="badge border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-300">
                      {item.status}
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">Updated {item.updated}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-6 xl:grid-cols-[1.3fr_1fr]">
          <div className="panel p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Recently edited content</h2>
              <span className="text-sm text-slate-500 dark:text-slate-400">Last 7 days</span>
            </div>
            <div className="space-y-3">
              {['Marketing strategy playbook', 'AI ethics workshop', 'Video retention teardown'].map((item, idx) => (
                <div key={item} className="flex items-center justify-between rounded-xl border border-slate-200 p-3 dark:border-slate-700">
                  <div className="flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-lg bg-sky-50 text-sky-600 dark:bg-sky-500/10 dark:text-sky-300">
                      {idx + 1}
                    </div>
                    <div>
                      <p className="font-medium text-slate-800 dark:text-slate-100">{item}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Course asset</p>
                    </div>
                  </div>
                  <button className="text-sm text-slate-500 hover:text-slate-800 dark:hover:text-slate-200">Open</button>
                </div>
              ))}
            </div>
          </div>

          <div className="panel p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Upcoming publishing</h2>
              <CalendarClock className="h-4 w-4 text-slate-400" />
            </div>
            <div className="space-y-4">
              {upcoming.map((item) => (
                <div key={item.title} className="rounded-xl border border-slate-200 p-3 dark:border-slate-700">
                  <p className="font-medium text-slate-800 dark:text-slate-100">{item.title}</p>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{item.date}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-6 md:grid-cols-3">
          <div className="panel p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Completion metrics</h2>
              <Users className="h-4 w-4 text-slate-400" />
            </div>
            <div className="h-40 rounded-xl border border-dashed border-slate-200 bg-slate-50 text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
              Progress chart
            </div>
          </div>

          <div className="panel p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Video performance</h2>
              <ChartColumnBig className="h-4 w-4 text-slate-400" />
            </div>
            <div className="h-40 rounded-xl border border-dashed border-slate-200 bg-slate-50 text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
              Video analytics
            </div>
          </div>

          <div className="panel p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">AI assistant</h2>
              <Sparkles className="h-4 w-4 text-slate-400" />
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Generate course outlines, lesson drafts, and video scripts in a secure workflow.
            </p>
            <button className="mt-4 rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-600">
              Launch AI assistant
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
