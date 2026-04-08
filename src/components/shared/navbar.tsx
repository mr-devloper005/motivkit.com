'use client'

import { useMemo, useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Search, Menu, X, User, FileText, Building2, LayoutGrid, Tag, Image as ImageIcon, ChevronRight, Sparkles, MapPin, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/auth-context'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import { cn } from '@/lib/utils'
import { siteContent } from '@/config/site.content'
import { getFactoryState } from '@/design/factory/get-factory-state'

const NavbarAuthControls = dynamic(() => import('@/components/shared/navbar-auth-controls').then((mod) => mod.NavbarAuthControls), {
  ssr: false,
  loading: () => null,
})

const taskIcons: Record<TaskKey, any> = {
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

const variantClasses = {
  'compact-bar': {
    shell: 'border-b border-slate-200/80 bg-white/88 text-slate-950 backdrop-blur-xl',
    logo: 'rounded-2xl border border-slate-200 bg-white shadow-sm',
    active: 'bg-slate-950 text-white',
    idle: 'text-slate-600 hover:bg-slate-100 hover:text-slate-950',
    cta: 'rounded-full bg-slate-950 text-white hover:bg-slate-800',
    mobile: 'border-t border-slate-200/70 bg-white/95',
  },
  'editorial-bar': {
    shell:
      'border border-[rgba(133,25,60,0.18)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(255,247,242,0.94)_100%)] text-[#4A102A] shadow-[0_-8px_40px_rgba(74,16,42,0.1),0_12px_40px_rgba(74,16,42,0.08)] backdrop-blur-xl',
    logo: 'rounded-2xl border border-[rgba(197,23,46,0.22)] bg-white shadow-[0_6px_24px_rgba(74,16,42,0.1)]',
    active: 'bg-[#4A102A] text-[#FCF259] shadow-[0_4px_16px_rgba(74,16,42,0.28)]',
    idle: 'text-[#85193C]/90 hover:bg-[rgba(197,23,46,0.09)] hover:text-[#4A102A]',
    cta:
      'rounded-full border border-[rgba(197,23,46,0.35)] bg-[#C5172E] px-5 text-white shadow-[0_8px_28px_rgba(197,23,46,0.35)] transition-[transform,box-shadow] hover:-translate-y-0.5 hover:bg-[#85193C] hover:shadow-[0_12px_36px_rgba(197,23,46,0.4)]',
    mobile:
      'border-t border-[rgba(133,25,60,0.12)] bg-[linear-gradient(180deg,#fffefb_0%,#fff4ec_100%)] shadow-[0_-16px_48px_rgba(74,16,42,0.1)]',
  },
  'floating-bar': {
    shell: 'border-b border-transparent bg-transparent text-white',
    logo: 'rounded-[1.35rem] border border-white/12 bg-white/8 shadow-[0_16px_48px_rgba(15,23,42,0.22)] backdrop-blur',
    active: 'bg-[#8df0c8] text-[#07111f]',
    idle: 'text-slate-200 hover:bg-white/10 hover:text-white',
    cta: 'rounded-full bg-[#8df0c8] text-[#07111f] hover:bg-[#77dfb8]',
    mobile: 'border-t border-white/10 bg-[#09101d]/96',
  },
  'utility-bar': {
    shell: 'border-b border-[#d7deca] bg-[#f4f6ef]/94 text-[#1f2617] backdrop-blur-xl',
    logo: 'rounded-xl border border-[#d7deca] bg-white shadow-sm',
    active: 'bg-[#1f2617] text-[#edf5dc]',
    idle: 'text-[#56604b] hover:bg-[#e7edd9] hover:text-[#1f2617]',
    cta: 'rounded-lg bg-[#1f2617] text-[#edf5dc] hover:bg-[#2f3a24]',
    mobile: 'border-t border-[#d7deca] bg-[#f4f6ef]',
  },
} as const

const directoryPalette = {
  'directory-clean': {
    shell: 'border-b border-slate-200 bg-white/94 text-slate-950 shadow-[0_1px_0_rgba(15,23,42,0.04)] backdrop-blur-xl',
    logo: 'rounded-2xl border border-slate-200 bg-slate-50',
    nav: 'text-slate-600 hover:text-slate-950',
    search: 'border border-slate-200 bg-slate-50 text-slate-600',
    cta: 'bg-slate-950 text-white hover:bg-slate-800',
    post: 'border border-slate-200 bg-white text-slate-950 hover:bg-slate-50',
    mobile: 'border-t border-slate-200 bg-white',
  },
  'market-utility': {
    shell: 'border-b border-[#d7deca] bg-[#f4f6ef]/96 text-[#1f2617] shadow-[0_1px_0_rgba(64,76,34,0.06)] backdrop-blur-xl',
    logo: 'rounded-xl border border-[#d7deca] bg-white',
    nav: 'text-[#56604b] hover:text-[#1f2617]',
    search: 'border border-[#d7deca] bg-white text-[#56604b]',
    cta: 'bg-[#1f2617] text-[#edf5dc] hover:bg-[#2f3a24]',
    post: 'border border-[#d7deca] bg-white text-[#1f2617] hover:bg-[#eef2e4]',
    mobile: 'border-t border-[#d7deca] bg-[#f4f6ef]',
  },
} as const

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { isAuthenticated } = useAuth()
  const { recipe } = getFactoryState()

  const navigation = useMemo(() => SITE_CONFIG.tasks.filter((task) => task.enabled && task.key !== 'profile'), [])
  const primaryNavigation = navigation.slice(0, 5)
  const mobileNavigation = navigation.map((task) => ({
    name: task.label,
    href: task.route,
    icon: taskIcons[task.key] || LayoutGrid,
  }))
  const primaryTask = SITE_CONFIG.tasks.find((task) => task.key === recipe.primaryTask && task.enabled) || primaryNavigation[0]
  const isDirectoryProduct = recipe.homeLayout === 'listing-home' || recipe.homeLayout === 'classified-home'

  if (isDirectoryProduct) {
    const palette = directoryPalette[(recipe.brandPack === 'market-utility' ? 'market-utility' : 'directory-clean') as keyof typeof directoryPalette]

    return (
      <header className={cn('sticky top-0 z-50 w-full', palette.shell)}>
        <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-4">
            <Link href="/" className="flex shrink-0 items-center gap-3">
              <div className={cn('flex h-12 w-12 items-center justify-center overflow-hidden p-1.5', palette.logo)}>
                <img src="/favicon.png?v=20260401" alt={`${SITE_CONFIG.name} logo`} width="48" height="48" className="h-full w-full object-contain" />
              </div>
              <div className="min-w-0 hidden sm:block">
                <span className="block truncate text-xl font-semibold">{SITE_CONFIG.name}</span>
                <span className="block text-[10px] uppercase tracking-[0.24em] opacity-60">{siteContent.navbar.tagline}</span>
              </div>
            </Link>

            <div className="hidden items-center gap-5 xl:flex">
              {primaryNavigation.slice(0, 4).map((task) => {
                const isActive = pathname.startsWith(task.route)
                return (
                  <Link key={task.key} href={task.route} className={cn('text-sm font-semibold transition-colors', isActive ? 'text-foreground' : palette.nav)}>
                    {task.label}
                  </Link>
                )
              })}
            </div>
          </div>

          <div className="hidden min-w-0 flex-1 items-center justify-center lg:flex">
            <div className={cn('flex w-full max-w-xl items-center gap-3 rounded-full px-4 py-3', palette.search)}>
              <Search className="h-4 w-4" />
              <span className="text-sm">Find businesses, spaces, and local services</span>
              <div className="ml-auto hidden items-center gap-1 text-xs opacity-75 md:flex">
                <MapPin className="h-3.5 w-3.5" />
                Local discovery
              </div>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            {primaryTask ? (
              <Link href={primaryTask.route} className="hidden items-center gap-2 rounded-full border border-current/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] opacity-75 md:inline-flex">
                <Sparkles className="h-3.5 w-3.5" />
                {primaryTask.label}
              </Link>
            ) : null}

            {isAuthenticated ? (
              <NavbarAuthControls />
            ) : (
              <div className="hidden items-center gap-2 md:flex">
                <Button variant="ghost" size="sm" asChild className="rounded-full px-4">
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button size="sm" asChild className={cn('rounded-full', palette.cta)}>
                  <Link href="/register">
                    <Plus className="mr-1 h-4 w-4" />
                    Add Listing
                  </Link>
                </Button>
              </div>
            )}

            <Button variant="ghost" size="icon" className="rounded-full lg:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </nav>

        {isMobileMenuOpen && (
          <div className={palette.mobile}>
            <div className="space-y-2 px-4 py-4">
              <div className={cn('mb-3 flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium', palette.search)}>
                <Search className="h-4 w-4" />
                Find businesses, spaces, and services
              </div>
              {mobileNavigation.map((item) => {
                const isActive = pathname.startsWith(item.href)
                return (
                  <Link key={item.name} href={item.href} onClick={() => setIsMobileMenuOpen(false)} className={cn('flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-colors', isActive ? 'bg-foreground text-background' : palette.post)}>
                    <item.icon className="h-5 w-5" />
                    {item.name}
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </header>
    )
  }

  const style = variantClasses[recipe.navbar]
  const isFloating = recipe.navbar === 'floating-bar'
  const isEditorial = recipe.navbar === 'editorial-bar'
  const isUtility = recipe.navbar === 'utility-bar'

  const mobileMenuPanel = (
    <div className="space-y-2 px-4 py-4">
      {isEditorial ? (
        <p className="px-1 pb-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#85193C]/75">Navigate</p>
      ) : null}
      <Link
        href="/search"
        onClick={() => setIsMobileMenuOpen(false)}
        className={cn(
          'mb-1 flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-colors',
          isEditorial
            ? 'border border-[rgba(133,25,60,0.14)] bg-white text-[#4A102A] shadow-sm'
            : 'border border-border bg-card text-muted-foreground',
        )}
      >
        <Search className="h-4 w-4 shrink-0 opacity-80" />
        Search the site
      </Link>
      {mobileNavigation.map((item) => {
        const isActive = pathname.startsWith(item.href)
        return (
          <Link
            key={item.name}
            href={item.href}
            onClick={() => setIsMobileMenuOpen(false)}
            className={cn(
              'flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-colors',
              isEditorial
                ? isActive
                  ? 'border border-[rgba(252,242,89,0.45)] bg-[#4A102A] text-[#FCF259] shadow-[0_8px_24px_rgba(74,16,42,0.2)]'
                  : 'border border-[rgba(133,25,60,0.1)] bg-white/95 text-[#85193C] hover:border-[rgba(197,23,46,0.22)] hover:bg-white'
                : isActive
                  ? style.active
                  : style.idle,
            )}
          >
            <item.icon className="h-5 w-5 shrink-0 opacity-90" />
            {item.name}
          </Link>
        )
      })}
    </div>
  )

  function MainNavRow() {
    return (
      <nav
        className={cn(
          'mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8',
          isFloating ? 'h-24 pt-4' : isEditorial ? 'min-h-[4.25rem] py-3' : 'h-20',
        )}
      >
        <div className={cn('flex min-w-0 items-center gap-4 lg:gap-7', isEditorial ? 'flex-1 xl:flex-[1.1]' : 'flex-1')}>
          <Link
            href="/"
            className={cn(
              'group flex shrink-0 items-center gap-3 whitespace-nowrap pr-1 sm:pr-2',
              isEditorial && 'gap-3.5',
            )}
          >
            <div
              className={cn(
                'flex shrink-0 items-center justify-center overflow-hidden p-1.5 transition-transform duration-300 group-hover:scale-[1.03]',
                isEditorial ? 'h-11 w-11' : 'h-12 w-12',
                style.logo,
              )}
            >
              <img src="/favicon.png?v=20260401" alt={`${SITE_CONFIG.name} logo`} width="48" height="48" className="h-full w-full object-contain" />
            </div>
            <div className="min-w-0 hidden sm:block">
              <span
                className={cn(
                  'block truncate font-semibold tracking-tight',
                  isEditorial ? 'text-[1.35rem] text-[#4A102A] sm:text-[1.45rem]' : 'text-xl text-foreground',
                )}
              >
                {SITE_CONFIG.name}
              </span>
              <span
                className={cn(
                  'hidden uppercase sm:block',
                  isEditorial
                    ? 'mt-0.5 block text-[9px] font-medium tracking-[0.32em] text-[#85193C]/75'
                    : 'text-[10px] tracking-[0.28em] text-muted-foreground',
                )}
              >
                {siteContent.navbar.tagline}
              </span>
            </div>
          </Link>

          {isEditorial ? (
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
          ) : isFloating ? (
            <div className="hidden min-w-0 flex-1 items-center gap-2 xl:flex">
              {primaryNavigation.map((task) => {
                const Icon = taskIcons[task.key] || LayoutGrid
                const isActive = pathname.startsWith(task.route)
                return (
                  <Link key={task.key} href={task.route} className={cn('flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors', isActive ? style.active : style.idle)}>
                    <Icon className="h-4 w-4" />
                    <span>{task.label}</span>
                  </Link>
                )
              })}
            </div>
          ) : isUtility ? (
            <div className="hidden min-w-0 flex-1 items-center gap-2 xl:flex">
              {primaryNavigation.map((task) => {
                const isActive = pathname.startsWith(task.route)
                return (
                  <Link key={task.key} href={task.route} className={cn('rounded-lg px-3 py-2 text-sm font-semibold transition-colors', isActive ? style.active : style.idle)}>
                    {task.label}
                  </Link>
                )
              })}
            </div>
          ) : (
            <div className="hidden min-w-0 flex-1 items-center gap-1 overflow-hidden xl:flex">
              {primaryNavigation.map((task) => {
                const Icon = taskIcons[task.key] || LayoutGrid
                const isActive = pathname.startsWith(task.route)
                return (
                  <Link key={task.key} href={task.route} className={cn('flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold transition-colors whitespace-nowrap', isActive ? style.active : style.idle)}>
                    <Icon className="h-4 w-4" />
                    <span>{task.label}</span>
                  </Link>
                )
              })}
            </div>
          )}
        </div>

        <div className={cn('flex shrink-0 items-center gap-2 sm:gap-3', isEditorial && 'lg:min-w-[12rem] lg:justify-end')}>
          {primaryTask && (recipe.navbar === 'utility-bar' || recipe.navbar === 'floating-bar') ? (
            <Link href={primaryTask.route} className="hidden items-center gap-2 rounded-full border border-current/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] opacity-80 md:inline-flex">
              <Sparkles className="h-3.5 w-3.5" />
              {primaryTask.label}
            </Link>
          ) : null}

          {isEditorial ? (
            <Link
              href="/search"
              className="hidden h-10 items-center gap-2 rounded-full border border-[rgba(133,25,60,0.16)] bg-white/95 px-4 text-xs font-semibold uppercase tracking-[0.14em] text-[#85193C] shadow-sm transition-colors hover:border-[rgba(197,23,46,0.35)] hover:bg-white hover:text-[#4A102A] md:inline-flex"
            >
              <Search className="h-4 w-4 opacity-80" />
              Search
            </Link>
          ) : (
            <Button variant="ghost" size="icon" asChild className="hidden rounded-full md:flex">
              <Link href="/search">
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </Link>
            </Button>
          )}

          {isAuthenticated ? (
            <NavbarAuthControls />
          ) : (
            <div className="hidden items-center gap-2 md:flex">
              <Button variant="ghost" size="sm" asChild className={cn('rounded-full px-4', isEditorial && 'text-[#85193C] hover:bg-[rgba(197,23,46,0.08)] hover:text-[#4A102A]')}>
                <Link href="/login">Sign In</Link>
              </Button>
              <Button size="sm" asChild className={cn(style.cta, isEditorial && 'h-10')}>
                <Link href="/register">{isEditorial ? 'Subscribe' : isUtility ? 'Post Now' : 'Get Started'}</Link>
              </Button>
            </div>
          )}

          <Button variant="ghost" size="icon" className="rounded-full lg:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </nav>
    )
  }

  return (
    <header
      data-site-nav={isEditorial ? 'bottom-float' : undefined}
      className={cn(
        isEditorial
          ? 'fixed bottom-0 left-0 right-0 z-50 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-0 sm:px-6 sm:pb-6'
          : 'sticky top-0 z-50 w-full',
        !isEditorial && style.shell,
      )}
    >
      {isEditorial ? (
        <div className="relative mx-auto w-full max-w-7xl">
          {isMobileMenuOpen ? (
            <div className="absolute bottom-full left-0 right-0 z-[60] mb-2 max-h-[min(70vh,calc(100dvh-7rem))] overflow-y-auto overscroll-contain rounded-2xl border border-[rgba(133,25,60,0.16)] border-b-[3px] border-b-[#C5172E] bg-[linear-gradient(180deg,#fffefb_0%,#fff4ec_100%)] shadow-[0_-28px_90px_rgba(74,16,42,0.22)]">
              {mobileMenuPanel}
            </div>
          ) : null}
          <div className={cn('overflow-hidden rounded-[1.25rem] sm:rounded-2xl', style.shell)}>
            <div
              className="h-1 w-full bg-[linear-gradient(90deg,#4A102A_0%,#85193C_32%,#C5172E_62%,#FCF259_100%)]"
              aria-hidden
            />
            <MainNavRow />
          </div>
        </div>
      ) : (
        <>
          <MainNavRow />
          {isFloating && primaryTask ? (
            <div className="mx-auto hidden max-w-7xl px-4 pb-3 sm:px-6 lg:block lg:px-8">
              <Link href={primaryTask.route} className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-200 backdrop-blur hover:bg-white/12">
                Featured surface
                <span>{primaryTask.label}</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          ) : null}
          {isMobileMenuOpen ? <div className={style.mobile}>{mobileMenuPanel}</div> : null}
        </>
      )}
    </header>
  )
}
