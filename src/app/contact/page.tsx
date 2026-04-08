import { Building2, FileText, Image as ImageIcon, Mail, MapPin, Phone, Sparkles, Bookmark } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SITE_CONFIG } from '@/lib/site-config'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { getProductKind } from '@/design/factory/get-product-kind'

export default function ContactPage() {
  const { recipe } = getFactoryState()
  const productKind = getProductKind(recipe)
  const lanes =
    productKind === 'directory'
      ? [
          { icon: Building2, title: 'Business onboarding', body: 'Add listings, verify operational details, and bring your business surface live quickly.' },
          { icon: Phone, title: 'Partnership support', body: 'Talk through bulk publishing, local growth, and operational setup questions.' },
          { icon: MapPin, title: 'Coverage requests', body: 'Need a new geography or category lane? We can shape the directory around it.' },
        ]
      : productKind === 'editorial'
        ? [
            { icon: FileText, title: 'Editorial submissions', body: 'Pitch essays, columns, and long-form ideas that fit the publication.' },
            { icon: Mail, title: 'Newsletter partnerships', body: 'Coordinate sponsorships, collaborations, and issue-level campaigns.' },
            { icon: Sparkles, title: 'Contributor support', body: 'Get help with voice, formatting, and publication workflow questions.' },
          ]
        : productKind === 'visual'
          ? [
              { icon: ImageIcon, title: 'Creator collaborations', body: 'Discuss gallery launches, creator features, and visual campaigns.' },
              { icon: Sparkles, title: 'Licensing and use', body: 'Reach out about usage rights, commercial requests, and visual partnerships.' },
              { icon: Mail, title: 'Media kits', body: 'Request creator decks, editorial support, or visual feature placement.' },
            ]
          : [
              { icon: Bookmark, title: 'Collection submissions', body: 'Suggest resources, boards, and links that deserve a place in the library.' },
              { icon: Mail, title: 'Resource partnerships', body: 'Coordinate curation projects, reference pages, and link programs.' },
              { icon: Sparkles, title: 'Curator support', body: 'Need help organizing shelves, collections, or profile-connected boards?' },
            ]

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#fff9f7_0%,#ffece5_100%)] text-[#4A102A]">
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <section className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(133,25,60,0.22)] bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#85193C] shadow-sm backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5 text-[#C5172E]" aria-hidden />
              Contact {SITE_CONFIG.name}
            </div>
            <h1 className="mt-6 font-display text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
              A support page that matches the product, not a generic contact form.
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-8 text-[#85193C]/90">
              Tell us what you are trying to publish, fix, or launch. We will route it through the right lane instead of forcing every request into the same support bucket.
            </p>
            <div className="mt-8 space-y-4">
              {lanes.map((lane) => (
                <div
                  key={lane.title}
                  className="rounded-[1.6rem] border border-[rgba(133,25,60,0.18)] bg-white/70 p-5 shadow-[0_1px_0_rgba(74,16,42,0.06)] backdrop-blur-sm"
                >
                  <lane.icon className="h-5 w-5 text-[#C5172E]" aria-hidden />
                  <h2 className="mt-3 text-xl font-semibold text-[#4A102A]">{lane.title}</h2>
                  <p className="mt-2 text-sm leading-7 text-[#85193C]/88">{lane.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-[rgba(133,25,60,0.22)] bg-white/85 p-7 shadow-[0_12px_40px_-20px_rgba(74,16,42,0.35)] backdrop-blur-sm">
            <h2 className="text-2xl font-semibold text-[#4A102A]">Send a message</h2>
            <p className="mt-2 text-sm text-[#85193C]/85">We read every note—include links or context when it helps.</p>
            <form className="mt-6 grid gap-4">
              <input
                className="h-12 rounded-xl border border-[rgba(133,25,60,0.22)] bg-white/90 px-4 text-sm text-[#4A102A] placeholder:text-[#85193C]/45 outline-none ring-[#85193C]/30 focus:border-[#85193C]/50 focus:ring-2"
                placeholder="Your name"
              />
              <input
                className="h-12 rounded-xl border border-[rgba(133,25,60,0.22)] bg-white/90 px-4 text-sm text-[#4A102A] placeholder:text-[#85193C]/45 outline-none ring-[#85193C]/30 focus:border-[#85193C]/50 focus:ring-2"
                placeholder="Email address"
                type="email"
              />
              <input
                className="h-12 rounded-xl border border-[rgba(133,25,60,0.22)] bg-white/90 px-4 text-sm text-[#4A102A] placeholder:text-[#85193C]/45 outline-none ring-[#85193C]/30 focus:border-[#85193C]/50 focus:ring-2"
                placeholder="What do you need help with?"
              />
              <textarea
                className="min-h-[180px] rounded-2xl border border-[rgba(133,25,60,0.22)] bg-white/90 px-4 py-3 text-sm text-[#4A102A] placeholder:text-[#85193C]/45 outline-none ring-[#85193C]/30 focus:border-[#85193C]/50 focus:ring-2"
                placeholder="Share the full context so we can respond with the right next step."
              />
              <button
                type="submit"
                className="inline-flex h-12 items-center justify-center rounded-full bg-[#85193C] px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-[#4A102A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FCF259]/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#fff9f7]"
              >
                Send message
              </button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
