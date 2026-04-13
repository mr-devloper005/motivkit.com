import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { Heart, Lightbulb, Shield, Users } from 'lucide-react'
import { PageShell } from '@/components/shared/page-shell'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { mockTeamMembers } from '@/data/mock-data'
import { buildPageMetadata } from '@/lib/seo'
import { SITE_CONFIG } from '@/lib/site-config'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const title = `Team | ${SITE_CONFIG.name}`
  const description = `Meet the people designing and building ${SITE_CONFIG.name}: editorial, product, engineering, and operations in one distributed studio.`
  return buildPageMetadata({
    path: '/team',
    title,
    description,
    openGraphTitle: title,
    openGraphDescription: description,
  })
}

const principles = [
  {
    title: 'Trust by default',
    body: 'We design for verified voices, transparent sourcing, and moderation that scales with care.',
    icon: Shield,
  },
  {
    title: 'Creators in the loop',
    body: 'Product decisions are shaped by writers, editors, and community leads—not only metrics.',
    icon: Users,
  },
  {
    title: 'Thoughtful pace',
    body: 'We ship iteratively but refuse to ship clutter. Calm software is a competitive advantage.',
    icon: Heart,
  },
  {
    title: 'Curiosity over hype',
    body: 'We prototype, write postmortems, and share what failed so the ecosystem can learn with us.',
    icon: Lightbulb,
  },
]

export default function TeamPage() {
  return (
    <PageShell
      title="People behind the platform"
      description={`Meet the cross-functional crew building ${SITE_CONFIG.name}: editorial, product, engineering, and operations working as one studio.`}
      actions={
        <>
          <Button variant="outline" asChild>
            <Link href="/careers">View open roles</Link>
          </Button>
          <Button asChild>
            <Link href="/contact">Partner with us</Link>
          </Button>
        </>
      }
    >
      <section className="grid gap-6 lg:grid-cols-3">
        <Card className="border-[#dbc6b6] bg-gradient-to-br from-white to-[#fff4e8] lg:col-span-2">
          <CardContent className="space-y-4 p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">How we work</p>
            <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Distributed by design, aligned by craft.
            </h2>
            <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
              We operate in small squads—editorial paired with design and engineering—so decisions stay close to readers.
              Weekly critique, async memos, and a shared library of research keep us moving without burning out.
            </p>
            <div className="grid gap-4 pt-2 sm:grid-cols-3">
              <div className="rounded-xl border border-border bg-card/80 p-4 text-center">
                <p className="text-2xl font-semibold text-foreground">6</p>
                <p className="text-xs text-muted-foreground">core disciplines</p>
              </div>
              <div className="rounded-xl border border-border bg-card/80 p-4 text-center">
                <p className="text-2xl font-semibold text-foreground">12</p>
                <p className="text-xs text-muted-foreground">countries represented</p>
              </div>
              <div className="rounded-xl border border-border bg-card/80 p-4 text-center">
                <p className="text-2xl font-semibold text-foreground">92%</p>
                <p className="text-xs text-muted-foreground">would recommend us*</p>
              </div>
            </div>
            <p className="text-[11px] text-muted-foreground">*Internal engagement pulse, rolling 90 days.</p>
          </CardContent>
        </Card>
        <Card className="border-[#dbc6b6] bg-[#2f1d16] text-[#fff4e4]">
          <CardContent className="flex h-full flex-col justify-between p-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#e8c4a8]">Join the studio</p>
              <p className="mt-4 text-lg font-semibold leading-snug">We are hiring editors, engineers, and community leads.</p>
            </div>
            <Button asChild className="mt-6 bg-[#fff4e4] text-[#2f1d16] hover:bg-white">
              <Link href="/careers">See careers</Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      <section className="mt-14">
        <div className="mb-8 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">Leadership & craft</p>
          <h2 className="mt-2 text-2xl font-semibold text-foreground">Faces you will see on calls and in the byline.</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Bios stay short on purpose—reach out if you want the longer story on a project we shipped together.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {mockTeamMembers.map((member) => (
            <Card
              key={member.id}
              className="group overflow-hidden border-border bg-card transition-shadow hover:shadow-lg"
            >
              <div className="relative aspect-[4/3] w-full bg-muted">
                <Image
                  src={member.avatar}
                  alt={member.name}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <CardContent className="space-y-3 p-6">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{member.name}</h3>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                  <p className="text-xs text-muted-foreground">{member.location}</p>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">{member.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">Principles</p>
        <h2 className="mt-2 text-2xl font-semibold text-foreground">What we optimize for together.</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {principles.map(({ title, body, icon: Icon }) => (
            <Card key={title} className="border-border bg-secondary/20">
              <CardContent className="flex gap-4 p-6">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border bg-card">
                  <Icon className="h-5 w-5 text-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{body}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </PageShell>
  )
}
