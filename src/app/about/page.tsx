import Link from 'next/link'
import { Compass, Layers, LineChart, Rocket } from 'lucide-react'
import { PageShell } from '@/components/shared/page-shell'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { SITE_CONFIG } from '@/lib/site-config'

const milestones = [
  {
    year: '2023',
    title: 'The first prototype',
    detail: 'A weekend project focused on calmer reading lists for remote teams.',
    icon: Rocket,
  },
  {
    year: '2024',
    title: 'Editorial + discovery',
    detail: 'Merged publishing tools with structured discovery so stories never felt orphaned.',
    icon: Layers,
  },
  {
    year: '2025',
    title: 'Scale with taste',
    detail: 'Search, personalization, and moderation shipped without sacrificing the quiet UI.',
    icon: LineChart,
  },
  {
    year: '2026',
    title: 'Open platform chapter',
    detail: 'Partnerships, API access, and richer analytics for organizations who live in the product.',
    icon: Compass,
  },
]

const pillars = [
  {
    title: 'Readers first',
    body: 'We measure success by completion rates, saves, and return visits—not rage clicks or infinite scroll.',
  },
  {
    title: 'Transparent curation',
    body: 'Editors and algorithms both explain why something surfaced. Trust scales when the logic is visible.',
  },
  {
    title: 'Responsible growth',
    body: 'We grow communities with clear guidelines, human review, and tooling that empowers moderators.',
  },
]

export default function AboutPage() {
  return (
    <PageShell
      title={`The ${SITE_CONFIG.name} story`}
      description="We are building a modern reading and discovery platform where long-form work gets the respect it deserves—and where businesses can show up without shouting."
      actions={
        <>
          <Button variant="outline" asChild>
            <Link href="/team">Meet the team</Link>
          </Button>
          <Button asChild>
            <Link href="/press">Press room</Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_1.05fr] lg:items-start">
        <Card className="border-border bg-gradient-to-b from-card to-secondary/30">
          <CardContent className="space-y-5 p-8">
            <Badge variant="secondary">Mission</Badge>
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">
              Help people find signal in a noisy web—without turning the internet into a casino.
            </h2>
            <p className="text-sm leading-7 text-muted-foreground">
              {SITE_CONFIG.name} exists because we kept losing great articles inside chat threads and bookmark folders. We
              wanted a single surface where writing, visuals, and structured listings reinforce each other instead of
              competing for attention.
            </p>
            <p className="text-sm leading-7 text-muted-foreground">
              Today we partner with independent publishers, in-house content teams, and community curators who care about
              depth. Our roadmap is public enough to be honest, and private enough to protect the craft.
            </p>
            <Button variant="outline" asChild className="mt-2 w-fit">
              <Link href="/blog">Read our latest notes</Link>
            </Button>
          </CardContent>
        </Card>
        <Card className="overflow-hidden border-border">
          <CardContent className="grid gap-0 p-0 sm:grid-cols-2">
            <div className="space-y-3 border-b border-border p-8 sm:border-b-0 sm:border-r">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Snapshot</p>
              <p className="text-4xl font-semibold text-foreground">12k+</p>
              <p className="text-sm text-muted-foreground">Creators and teams actively publishing or curating.</p>
            </div>
            <div className="space-y-3 p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Reach</p>
              <p className="text-4xl font-semibold text-foreground">180k</p>
              <p className="text-sm text-muted-foreground">Resources bookmarked and shared across workspaces.</p>
            </div>
            <div className="space-y-3 border-t border-border p-8 sm:col-span-2 sm:border-t">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Discovery</p>
              <p className="text-4xl font-semibold text-foreground">8.6k</p>
              <p className="text-sm text-muted-foreground">Structured listings and pages surfaced with context, not spam.</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <section className="mt-16">
        <div className="mb-8 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">Timeline</p>
          <h2 className="mt-2 text-2xl font-semibold text-foreground">From side project to publishing infrastructure.</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {milestones.map((m) => (
            <Card key={m.year} className="border-border bg-card">
              <CardContent className="flex gap-4 p-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-border bg-secondary/50">
                  <m.icon className="h-5 w-5 text-foreground" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{m.year}</p>
                  <h3 className="mt-1 text-lg font-semibold text-foreground">{m.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{m.detail}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-16 rounded-[1.75rem] border border-border bg-secondary/25 p-8 sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">Operating ethos</p>
        <h2 className="mt-2 text-2xl font-semibold text-foreground">Three commitments we revisit every quarter.</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {pillars.map((p) => (
            <div key={p.title} className="rounded-xl border border-border bg-card p-5">
              <h3 className="font-semibold text-foreground">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/contact">Talk with us</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/careers">Explore careers</Link>
          </Button>
        </div>
      </section>
    </PageShell>
  )
}
