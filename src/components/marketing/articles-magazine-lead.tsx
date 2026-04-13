import Link from 'next/link'
import { ArrowRight, BookOpen, Sparkles } from 'lucide-react'
import { CATEGORY_OPTIONS } from '@/lib/categories'
import { SITE_CONFIG } from '@/lib/site-config'

const spotlightTopics = CATEGORY_OPTIONS.slice(0, 8)

export function ArticlesMagazineLead() {
  return (
    <section className="mb-12 space-y-10">
      <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[#dbc6b6] bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#72594a]">
            <Sparkles className="h-3.5 w-3.5" />
            Reading desk
          </div>
          <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-[-0.04em] text-[#2f1d16] sm:text-5xl">
            Ideas, playbooks, and stories worth saving to your next team meeting.
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-8 text-[#72594a]">
            {SITE_CONFIG.name} articles are edited for clarity: fewer hot takes, more frameworks you can reuse. Browse by
            topic, then jump into related listings and resources when you need proof in the wild.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 rounded-full bg-[#2f1d16] px-5 py-3 text-sm font-semibold text-[#fff4e4] transition hover:bg-[#452920]"
            >
              Start publishing
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/search"
              className="inline-flex items-center gap-2 rounded-full border border-[#dbc6b6] bg-[#fff8ef] px-5 py-3 text-sm font-semibold text-[#2f1d16] hover:bg-white"
            >
              Search the library
            </Link>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-[1.75rem] border border-[#dbc6b6] bg-gradient-to-br from-white to-[#fff1df] p-6 shadow-[0_18px_50px_rgba(47,29,22,0.06)]">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#72594a]">This week</p>
            <p className="mt-3 text-lg font-semibold text-[#2f1d16]">Deep dives on culture, craft, and sustainable growth.</p>
            <p className="mt-2 text-sm text-[#72594a]">Fresh perspectives land every week—bookmark what resonates.</p>
          </div>
          <div className="flex flex-col justify-between rounded-[1.75rem] border border-[#dbc6b6] bg-[#2f1d16] p-6 text-[#fff4e4]">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#e8c4a8]">
              <BookOpen className="h-4 w-4" />
              Editorial standard
            </div>
            <p className="mt-4 text-sm leading-7 text-[#f5e5d6]">
              Every story is structured with a clear thesis, actionable takeaways, and suggested follow-up reading.
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-[2rem] border border-[#dbc6b6] bg-white/90 p-6 shadow-[0_18px_50px_rgba(47,29,22,0.05)] sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#72594a]">Explore by lane</p>
            <p className="mt-1 text-sm text-[#72594a]">Tap a topic to filter the feed without losing context.</p>
          </div>
          <form className="flex w-full max-w-md items-center gap-2 sm:w-auto" action="/articles">
            <select
              name="category"
              defaultValue="all"
              className="h-11 flex-1 rounded-xl border border-[#dbc6b6] bg-white px-3 text-sm text-[#2f1d16]"
            >
              <option value="all">All categories</option>
              {CATEGORY_OPTIONS.map((item) => (
                <option key={item.slug} value={item.slug}>
                  {item.name}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="h-11 shrink-0 rounded-xl bg-[#2f1d16] px-4 text-sm font-medium text-[#fff4e4] hover:bg-[#452920]"
            >
              Apply
            </button>
          </form>
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          {spotlightTopics.map((item) => (
            <Link
              key={item.slug}
              href={`/articles?category=${item.slug}`}
              className="rounded-full border border-[#e8d5c8] bg-[#fff8ef] px-3 py-1.5 text-xs font-medium text-[#2f1d16] transition hover:border-[#2f1d16] hover:bg-white"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
