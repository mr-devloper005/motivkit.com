'use client'

import type { ReactNode } from 'react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'

export function PageShell({
  title,
  description,
  actions,
  variant = 'default',
  children,
}: {
  title: string
  description?: string
  actions?: ReactNode
  variant?: 'default' | 'article'
  children?: ReactNode
}) {
  const shellClass =
    variant === 'article'
      ? 'bg-[radial-gradient(circle_at_top_left,rgba(251,191,36,0.08),transparent_20%),linear-gradient(180deg,#fff8ef_0%,#ffffff_100%)]'
      : 'bg-background'

  return (
    <div className={`min-h-screen ${shellClass}`}>
      <NavbarShell />
      <main>
        <section className="border-b border-border bg-white/60 backdrop-blur">
          <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">{title}</h1>
                {description && (
                  <p className="mt-2 max-w-2xl text-muted-foreground">{description}</p>
                )}
              </div>
              {actions && <div className="flex flex-wrap gap-3">{actions}</div>}
            </div>
          </div>
        </section>
        <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          {children}
        </section>
      </main>
      <Footer />
    </div>
  )
}
