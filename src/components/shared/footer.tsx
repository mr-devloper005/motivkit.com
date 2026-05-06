import Link from 'next/link'
import { FileText, Building2, LayoutGrid, Tag, Github, Twitter, Linkedin, Image as ImageIcon, User, ArrowRight, Sparkles } from 'lucide-react'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import { siteContent } from '@/config/site.content'
import { getFactoryState } from '@/design/factory/get-factory-state'

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

const footerLinks = {
  platform: SITE_CONFIG.tasks.filter((task) => task.enabled).map((task) => ({
    name: task.label,
    href: task.route,
    icon: taskIcons[task.key] || LayoutGrid,
  })),
  company: [
    { name: 'About', href: '/about' },
    { name: 'Careers', href: '/careers' },
    { name: 'Blog', href: '/blog' },
    { name: 'Press', href: '/press' },
  ],
  resources: [
    { name: 'Help Center', href: '/help' },
    { name: 'Community', href: '/community' },
    { name: 'Developers', href: '/developers' },
    { name: 'Status', href: '/status' },
  ],
  legal: [
    { name: 'Privacy', href: '/privacy' },
    { name: 'Terms', href: '/terms' },
    { name: 'Cookies', href: '/cookies' },
    { name: 'Licenses', href: '/licenses' },
  ],
}

const socialLinks = [
  { name: 'Twitter', href: 'https://twitter.com', icon: Twitter },
  { name: 'GitHub', href: 'https://github.com', icon: Github },
  { name: 'LinkedIn', href: 'https://linkedin.com', icon: Linkedin },
]

export function Footer() {
  const { recipe } = getFactoryState()
  const enabledTasks = SITE_CONFIG.tasks.filter((task) => task.enabled)
  const primaryTask = enabledTasks.find((task) => task.key === recipe.primaryTask) || enabledTasks[0]

  if (recipe.footer === 'minimal-footer') {
    return (
      <footer className="border-t border-border/70 bg-background/60 text-foreground">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-8 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <p className="text-lg font-semibold">{SITE_CONFIG.name}</p>
            <p className="mt-1 text-sm text-muted-foreground">{SITE_CONFIG.description}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {enabledTasks.slice(0, 5).map((task) => (
              <Link key={task.key} href={task.route} className="rounded-lg border border-border/60 bg-card/70 px-3 py-2 text-sm font-medium text-foreground hover:bg-accent/30">
                {task.label}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    )
  }

  if (recipe.footer === 'dense-footer') {
    return (
      <footer className="border-t border-white/10 bg-[linear-gradient(180deg,rgb(18,12,20)_0%,rgb(28,18,32)_100%)] text-[rgb(248,244,220)]">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr_1fr]">
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-7">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/12 bg-white/8 p-1.5">
                  <img src="/favicon.png?v=20260401" alt={`${SITE_CONFIG.name} logo`} width="48" height="48" className="h-full w-full object-contain" />
                </div>
                <div>
                  <p className="text-lg font-semibold">{SITE_CONFIG.name}</p>
                  <p className="text-xs uppercase tracking-[0.24em] text-white/55">{siteContent.footer.tagline}</p>
                </div>
              </div>
              <p className="mt-5 max-w-md text-sm leading-7 text-white/70">{SITE_CONFIG.description}</p>
              {primaryTask ? (
                <Link href={primaryTask.route} className="mt-6 inline-flex items-center gap-2 rounded-full bg-[rgb(132,197,177)] px-4 py-2.5 text-sm font-semibold text-[rgb(18,12,20)] hover:bg-[rgba(132,197,177,0.92)]">
                  Explore {primaryTask.label}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              ) : null}
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-3">
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-[0.24em] text-white/55">Surfaces</h3>
                <ul className="mt-4 space-y-3 text-sm text-white/80">
                  {footerLinks.platform.map((item: any) => (
                    <li key={item.name}><Link href={item.href} className="flex items-center gap-2 hover:text-white">{item.icon ? <item.icon className="h-4 w-4" /> : null}{item.name}</Link></li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-[0.24em] text-white/55">Resources</h3>
                <ul className="mt-4 space-y-3 text-sm text-white/80">
                  {footerLinks.resources.map((item) => (
                    <li key={item.name}><Link href={item.href} className="hover:text-white">{item.name}</Link></li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-[0.24em] text-white/55">Connect</h3>
                <div className="mt-4 flex gap-3">
                  {socialLinks.map((item) => (
                    <Link key={item.name} href={item.href} target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/10 bg-white/8 p-2.5 text-white/80 hover:bg-white/12 hover:text-white">
                      <item.icon className="h-4 w-4" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10 border-t border-white/10 pt-5 text-sm text-white/55">&copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.</div>
        </div>
      </footer>
    )
  }

  if (recipe.footer === 'editorial-footer') {
    return (
      <footer className="border-t border-border/70 bg-[linear-gradient(180deg,rgba(240,233,182,0.7)_0%,rgba(240,233,182,0.45)_100%)] text-foreground">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr_0.9fr]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                <Sparkles className="h-3.5 w-3.5" />
                Editorial desk
              </div>
              <h3 className="mt-5 text-3xl font-semibold tracking-[-0.04em]">{SITE_CONFIG.name}</h3>
              <p className="mt-4 max-w-md text-sm leading-7 text-muted-foreground">{SITE_CONFIG.description}</p>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Sections</h4>
              <ul className="mt-4 space-y-3 text-sm">
                {footerLinks.platform.map((item: any) => (
                  <li key={item.name}><Link href={item.href} className="hover:text-foreground">{item.name}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Company</h4>
              <ul className="mt-4 space-y-3 text-sm">
                {footerLinks.company.map((item) => (
                  <li key={item.name}><Link href={item.href} className="hover:text-foreground">{item.name}</Link></li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </footer>
    )
  }

  return (
    <footer className="border-t border-border/70 bg-[linear-gradient(180deg,rgba(250,248,234,0.7)_0%,rgba(240,233,182,0.35)_100%)] text-foreground">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr_0.8fr]">
          <div>
            <Link href="/" className="flex items-center gap-3">
              <div className="h-11 w-11 overflow-hidden rounded-2xl border border-border/60 bg-card/70 p-1 shadow-sm">
                <img src="/favicon.png?v=20260401" alt={`${SITE_CONFIG.name} logo`} width="44" height="44" className="h-full w-full object-contain" />
              </div>
              <div>
                <span className="block text-lg font-semibold">{SITE_CONFIG.name}</span>
                <span className="text-xs uppercase tracking-[0.22em] text-muted-foreground">{siteContent.footer.tagline}</span>
              </div>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-7 text-muted-foreground">{SITE_CONFIG.description}</p>
          </div>
          {(['platform', 'company', 'resources', 'legal'] as const).map((section) => (
            <div key={section}>
              <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-muted-foreground">{section}</h3>
              <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
                {footerLinks[section].map((item: any) => (
                  <li key={item.name}><Link href={item.href} className="flex items-center gap-2 hover:text-foreground">{item.icon ? <item.icon className="h-4 w-4" /> : null}{item.name}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 border-t border-border/70 pt-6 text-center text-sm text-muted-foreground">&copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.</div>
      </div>
    </footer>
  )
}
