'use client'

import { useMemo, useState, type ComponentType } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Building2, FileText, Image as ImageIcon, LayoutGrid, Menu, Search, Tag, User, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/auth-context'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import { cn } from '@/lib/utils'
import { siteContent } from '@/config/site.content'

const NavbarAuthControls = dynamic(() => import('@/components/shared/navbar-auth-controls').then((m) => m.NavbarAuthControls), {
  ssr: false,
  loading: () => null,
})

const iconMap: Record<TaskKey, ComponentType<{ className?: string }>> = {
  article: FileText,
  listing: Building2,
  sbm: LayoutGrid,
  classified: Tag,
  image: ImageIcon,
  profile: User,
  social: LayoutGrid,
  pdf: FileText,
  org: Building2,
  comment: FileText,
}

const style = {
  shell:
    'border border-[rgba(133,25,60,0.18)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(255,247,242,0.94)_100%)] text-[#4A102A] shadow-[0_12px_40px_rgba(74,16,42,0.08)] backdrop-blur-xl',
  logo: 'rounded-2xl border border-[rgba(197,23,46,0.22)] bg-white shadow-[0_6px_24px_rgba(74,16,42,0.1)]',
  active: 'bg-[#4A102A] text-[#FCF259] shadow-[0_4px_16px_rgba(74,16,42,0.28)]',
  idle: 'text-[#85193C]/90 hover:bg-[rgba(197,23,46,0.09)] hover:text-[#4A102A]',
}

export function HeroInlineNav({ className }: { className?: string }) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { isAuthenticated } = useAuth()
  const navigation = useMemo(() => SITE_CONFIG.tasks.filter((task) => task.enabled && task.key !== 'profile'), [])
  const primaryNavigation = navigation.slice(0, 5)
  const mobileNavigation = navigation.map((task) => ({
    name: task.label,
    href: task.route,
    icon: iconMap[task.key] || LayoutGrid,
  }))

  const mobilePanel = (
    <div className="space-y-2 px-4 py-4">
      <p className="px-1 pb-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#85193C]/75">Navigate</p>
      <Link
        href="/search"
        onClick={() => setOpen(false)}
        className="mb-1 flex items-center gap-3 rounded-2xl border border-[rgba(133,25,60,0.14)] bg-white px-4 py-3 text-sm font-semibold text-[#4A102A] shadow-sm"
      >
        <Search className="h-4 w-4 shrink-0 opacity-80" />
        Search the site
      </Link>
      {mobileNavigation.map((item) => {
        const isActive = pathname.startsWith(item.href)
        const Icon = item.icon
        return (
          <Link
            key={item.name}
            href={item.href}
            onClick={() => setOpen(false)}
            className={cn(
              'flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-colors',
              isActive
                ? 'border border-[rgba(252,242,89,0.45)] bg-[#4A102A] text-[#FCF259] shadow-[0_8px_24px_rgba(74,16,42,0.2)]'
                : 'border border-[rgba(133,25,60,0.1)] bg-white/95 text-[#85193C] hover:border-[rgba(197,23,46,0.22)] hover:bg-white',
            )}
          >
            <Icon className="h-5 w-5 shrink-0 opacity-90" />
            {item.name}
          </Link>
        )
      })}
      {!isAuthenticated ? (
        <div className="border-t border-[rgba(133,25,60,0.12)] px-1 pt-4">
          <p className="px-1 pb-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#85193C]/75">Account</p>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="flex flex-1 items-center justify-center rounded-2xl border border-[rgba(133,25,60,0.16)] bg-white px-4 py-3 text-sm font-semibold text-[#85193C] hover:bg-[rgba(197,23,46,0.06)]"
            >
              Sign in
            </Link>
            <Link
              href="/register"
              onClick={() => setOpen(false)}
              className="flex flex-1 items-center justify-center rounded-2xl border border-[rgba(133,25,60,0.28)] bg-white/95 px-4 py-3 text-sm font-semibold text-[#4A102A] hover:bg-white"
            >
              Sign up
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  )

  return (
    <div className={cn('relative z-20 w-full', className)}>
      {open ? (
        <div className="absolute left-0 right-0 top-full z-[60] mt-2 max-h-[min(70vh,calc(100dvh-7rem))] overflow-y-auto overscroll-contain rounded-2xl border border-[rgba(133,25,60,0.16)] border-b-[3px] border-b-[#C5172E] bg-[linear-gradient(180deg,#fffefb_0%,#fff4ec_100%)] shadow-[0_24px_80px_rgba(74,16,42,0.2)] lg:hidden">
          {mobilePanel}
        </div>
      ) : null}
      <div className={cn('overflow-hidden rounded-[1.25rem] sm:rounded-2xl', style.shell)}>
        <div
          className="h-1 w-full bg-[linear-gradient(90deg,#4A102A_0%,#85193C_32%,#C5172E_62%,#FCF259_100%)]"
          aria-hidden
        />
        <nav className="mx-auto flex min-h-[4.25rem] max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex min-w-0 flex-1 items-center gap-4 lg:gap-7 xl:flex-[1.1]">
            <Link href="/" className="group flex shrink-0 items-center gap-3.5 whitespace-nowrap pr-1 sm:pr-2">
              <div
                className={cn(
                  'flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden p-1.5 transition-transform duration-300 group-hover:scale-[1.03]',
                  style.logo,
                )}
              >
                <img src="/favicon.png?v=20260401" alt={`${SITE_CONFIG.name} logo`} width="48" height="48" className="h-full w-full object-contain" />
              </div>
              <div className="min-w-0 hidden sm:block">
                <span className="block truncate text-[1.35rem] font-semibold tracking-tight text-[#4A102A] sm:text-[1.45rem]">{SITE_CONFIG.name}</span>
                <span className="mt-0.5 block text-[9px] font-medium uppercase tracking-[0.32em] text-[#85193C]/75">{siteContent.navbar.tagline}</span>
              </div>
            </Link>

            <div className="hidden min-w-0 flex-1 justify-center lg:flex">
              <nav
                aria-label="Primary navigation"
                className="inline-flex max-w-full items-center gap-0.5 overflow-x-auto rounded-full border border-[rgba(133,25,60,0.16)] bg-[rgba(255,255,255,0.88)] p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_6px_28px_rgba(74,16,42,0.07)]"
              >
                {primaryNavigation.map((task) => {
                  const isActive = pathname.startsWith(task.route)
                  return (
                    <Link
                      key={task.key}
                      href={task.route}
                      className={cn(
                        'shrink-0 rounded-full px-3.5 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] transition-all sm:px-5 sm:text-[11px] sm:tracking-[0.2em]',
                        isActive ? style.active : style.idle,
                      )}
                    >
                      {task.label}
                    </Link>
                  )
                })}
              </nav>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3 lg:min-w-[12rem] lg:justify-end">
            <Link
              href="/search"
              className="hidden h-10 items-center gap-2 rounded-full border border-[rgba(133,25,60,0.16)] bg-white/95 px-4 text-xs font-semibold uppercase tracking-[0.14em] text-[#85193C] shadow-sm transition-colors hover:border-[rgba(197,23,46,0.35)] hover:bg-white hover:text-[#4A102A] md:inline-flex"
            >
              <Search className="h-4 w-4 opacity-80" />
              Search
            </Link>

            {isAuthenticated ? (
              <NavbarAuthControls />
            ) : (
              <div className="hidden items-center gap-2 md:flex">
                <Button variant="ghost" size="sm" asChild className="rounded-full px-4 text-[#85193C] hover:bg-[rgba(197,23,46,0.08)] hover:text-[#4A102A]">
                  <Link href="/login">Sign in</Link>
                </Button>
                <Button variant="outline" size="sm" asChild className="h-10 rounded-full border-[rgba(133,25,60,0.35)] bg-white/90 text-[#4A102A] hover:bg-white hover:text-[#85193C]">
                  <Link href="/register">Sign up</Link>
                </Button>
              </div>
            )}

            <Button variant="ghost" size="icon" className="rounded-full lg:hidden" onClick={() => setOpen(!open)} aria-expanded={open}>
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </nav>
      </div>
    </div>
  )
}
