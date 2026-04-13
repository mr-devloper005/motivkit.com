import Link from 'next/link'
import { ArrowRight, MessageCircle, PenLine } from 'lucide-react'
import { CATEGORY_OPTIONS } from '@/lib/categories'
import { SITE_CONFIG } from '@/lib/site-config'

const angles = CATEGORY_OPTIONS.filter((c) =>
  ['technology', 'business', 'lifestyle', 'digital', 'news'].includes(c.slug),
)

export function BlogMagazineLead() {
  return (
    <section className="mb-12 space-y-10">
      <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[#dbc6b6] bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#72594a]">
            <PenLine className="h-3.5 w-3.5" />
            Field notes
          </div>
          <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-[-0.04em] text-[#2f1d16] sm:text-5xl">
            Shorter posts, sharper angles—what we are learning while building in public.
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-8 text-[#72594a]">
            The {SITE_CONFIG.name} blog is where product, community, and content teams share experiments, retrospectives, and
            customer stories. It pairs with long articles when you want the narrative behind the roadmap.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/articles"
              className="inline-flex items-center gap-2 rounded-full bg-[#2f1d16] px-5 py-3 text-sm font-semibold text-[#fff4e4] transition hover:bg-[#452920]"
            >
              Read long-form
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-[#dbc6b6] bg-[#fff8ef] px-5 py-3 text-sm font-semibold text-[#2f1d16] hover:bg-white"
            >
              Pitch a guest post
            </Link>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-[2rem] border border-[#dbc6b6] bg-gradient-to-br from-[#fffdf9] via-white to-[#ffe8d2] p-8 shadow-[0_24px_70px_rgba(47,29,22,0.08)]">
          <MessageCircle className="absolute right-6 top-6 h-28 w-28 text-[#f0dcc8] opacity-60" aria-hidden />
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#72594a]">Rhythm</p>
          <ul className="relative mt-6 space-y-4 text-sm text-[#2f1d16]">
            <li className="flex gap-3">
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#c17a4a]" />
              Monday metrics: what moved the previous week.
            </li>
            <li className="flex gap-3">
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#c17a4a]" />
              Mid-week design notes and interface craft.
            </li>
            <li className="flex gap-3">
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#c17a4a]" />
              Friday community recap—voices from the hub.
            </li>
          </ul>
        </div>
      </div>

      <div className="rounded-[2rem] border border-[#dbc6b6] bg-white/90 p-6 sm:p-8">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <p className="text-sm text-[#72594a]">Filter commentary by theme to follow the thread you care about.</p>
          <form className="flex w-full max-w-md items-center gap-2 md:w-auto" action="/blog">
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
        <div className="mt-5 flex flex-wrap gap-2">
          {angles.map((item) => (
            <Link
              key={item.slug}
              href={`/blog?category=${item.slug}`}
              className="rounded-full border border-[#e8d5c8] bg-[#fff8ef] px-3 py-1.5 text-xs font-medium text-[#2f1d16] hover:border-[#2f1d16] hover:bg-white"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
