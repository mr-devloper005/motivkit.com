import { FileText, Sparkles } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { RegisterForm } from '@/components/auth/register-form'
import { SITE_CONFIG } from '@/lib/site-config'

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#fff9f7_0%,#ffece5_100%)] text-[#4A102A]">
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
          <div className="rounded-[2rem] border border-[rgba(133,25,60,0.18)] bg-white/70 p-8 shadow-[0_1px_0_rgba(74,16,42,0.06)] backdrop-blur-sm">
            <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(133,25,60,0.2)] bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#85193C]">
              <Sparkles className="h-3.5 w-3.5 text-[#C5172E]" aria-hidden />
              {SITE_CONFIG.name}
            </div>
            <FileText className="mt-6 h-8 w-8 text-[#C5172E]" aria-hidden />
            <h1 className="mt-4 font-display text-4xl font-semibold tracking-[-0.04em]">Create your contributor account</h1>
            <p className="mt-5 text-sm leading-8 text-[#85193C]/90">
              Set up a profile for drafts, reviews, and publishing — credentials are stored locally in your browser, not sent to a remote server.
            </p>
            <div className="mt-8 grid gap-4">
              {['Onboarding aligned with this publication', 'No one-size-fits-all shell', 'Profile and discovery in one tone'].map((item) => (
                <div
                  key={item}
                  className="rounded-[1.5rem] border border-[rgba(133,25,60,0.14)] bg-white/80 px-4 py-4 text-sm text-[#85193C]/95"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <RegisterForm />
        </section>
      </main>
      <Footer />
    </div>
  )
}
