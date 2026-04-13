import Link from 'next/link'
import { Clock, Globe2, HeartPulse, Laptop, Sparkles, Users } from 'lucide-react'
import { PageShell } from '@/components/shared/page-shell'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { SITE_CONFIG } from '@/lib/site-config'

const roles = [
  {
    title: 'Senior Product Designer',
    location: 'Remote (US / EU)',
    type: 'Full-time',
    level: 'Senior',
    focus: 'Systems thinking, editorial layouts, and prototyping with engineering.',
  },
  {
    title: 'Staff Frontend Engineer',
    location: 'Hybrid · New York',
    type: 'Full-time',
    level: 'Staff',
    focus: 'Next.js, performance, and accessible components used across reading surfaces.',
  },
  {
    title: 'Community Programs Lead',
    location: 'Remote (Americas)',
    type: 'Full-time',
    level: 'Lead',
    focus: 'Curriculum design, ambassador programs, and healthy moderation playbooks.',
  },
  {
    title: 'Technical Writer (Contract)',
    location: 'Remote',
    type: 'Contract',
    level: 'Mid',
    focus: 'API docs, integration guides, and partner-facing tutorials.',
  },
]

const process = [
  { step: '01', label: 'Intro call', detail: 'Values fit, scope of role, and what excites you about reading products.' },
  { step: '02', label: 'Skills deep dive', detail: 'Portfolio or code review with the people you would actually ship with.' },
  { step: '03', label: 'Collaborative session', detail: 'A scoped exercise—design critique, architecture discussion, or workshop.' },
  { step: '04', label: 'Offer & onboarding', detail: 'Clear ramp plan, buddy pairing, and goals for your first 90 days.' },
]

const benefits = [
  { title: 'Remote-first', body: 'Async-friendly rituals with optional studio weeks twice a year.', icon: Globe2 },
  { title: 'Health coverage', body: 'Medical, dental, and vision for employees and dependents.', icon: HeartPulse },
  { title: 'Learning budget', body: '$2,000/year for courses, books, and conferences.', icon: Sparkles },
  { title: 'Equipment', body: 'Top-tier laptop, display, and home-office stipend on day one.', icon: Laptop },
  { title: 'Balanced hours', body: 'No hero culture—protected focus blocks and humane on-call.', icon: Clock },
  { title: 'Parental leave', body: '16 weeks primary, 8 weeks secondary, plus flexible return.', icon: Users },
]

export default function CareersPage() {
  return (
    <PageShell
      title={`Careers at ${SITE_CONFIG.name}`}
      description={`Help us shape the next era of calm, trustworthy publishing. ${SITE_CONFIG.name} is growing deliberately—every hire should raise the bar for craft and kindness.`}
      actions={
        <>
          <Button variant="outline" asChild>
            <Link href="/team">Meet the team</Link>
          </Button>
          <Button asChild>
            <Link href="/contact">Introduce yourself</Link>
          </Button>
        </>
      }
    >
      <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <Card className="border-border bg-card">
          <CardContent className="space-y-3 p-8">
            <Badge variant="secondary">Open roles</Badge>
            <h2 className="text-2xl font-semibold text-foreground">Roles we are actively hiring for</h2>
            <p className="text-sm text-muted-foreground">
              Do not see a perfect match? Send a general application—we invent roles for exceptional people.
            </p>
          </CardContent>
        </Card>
        <Card className="border-[#dbc6b6] bg-gradient-to-br from-[#2f1d16] to-[#452920] text-[#fff4e4]">
          <CardContent className="flex h-full flex-col justify-center space-y-3 p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#e8c4a8]">Culture note</p>
            <p className="text-lg font-semibold leading-snug">We hire for curiosity, communication, and care—not buzzwords.</p>
            <p className="text-sm text-[#f0dcc8]">Interview loops are designed to be respectful of your time and energy.</p>
          </CardContent>
        </Card>
      </section>

      <div className="mt-10 grid gap-5 lg:grid-cols-2">
        {roles.map((role) => (
          <Card key={role.title} className="border-border bg-card transition-shadow hover:shadow-md">
            <CardContent className="space-y-4 p-6">
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">{role.level}</Badge>
                <Badge variant="outline">{role.type}</Badge>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground">{role.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{role.location}</p>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">{role.focus}</p>
              <Button variant="outline" asChild>
                <Link href="/contact">Apply for this role</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <section className="mt-16">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">Interview journey</p>
        <h2 className="mt-2 text-2xl font-semibold text-foreground">What to expect after you hit send.</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {process.map((p) => (
            <Card key={p.step} className="border-border bg-secondary/20">
              <CardContent className="p-5">
                <p className="text-2xl font-semibold text-foreground/40">{p.step}</p>
                <h3 className="mt-2 font-semibold text-foreground">{p.label}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.detail}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-16 rounded-[1.75rem] border border-border bg-muted/40 p-8 sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">Benefits</p>
        <h2 className="mt-2 text-2xl font-semibold text-foreground">Support for the whole you—not just the job title.</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b) => (
            <div key={b.title} className="flex gap-3 rounded-xl border border-border bg-card p-5">
              <b.icon className="mt-0.5 h-5 w-5 shrink-0 text-foreground" />
              <div>
                <h3 className="font-semibold text-foreground">{b.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{b.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  )
}
