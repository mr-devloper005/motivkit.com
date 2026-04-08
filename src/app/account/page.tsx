'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { LogOut, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { useAuth } from '@/lib/auth-context'

export default function AccountPage() {
  const router = useRouter()
  const { user, hasHydrated, logout } = useAuth()

  useEffect(() => {
    if (hasHydrated && !user) {
      router.replace('/login')
    }
  }, [hasHydrated, user, router])

  if (!hasHydrated) {
    return (
      <div className="min-h-screen bg-background">
        <NavbarShell />
        <main className="mx-auto max-w-lg px-4 py-16 text-center text-muted-foreground">Loading…</main>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <NavbarShell />
        <main className="mx-auto max-w-lg px-4 py-16 text-center text-muted-foreground">Redirecting to sign in…</main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <NavbarShell />
      <main className="mx-auto max-w-lg px-4 py-12 sm:px-6 sm:py-16">
        <div className="rounded-2xl border border-[rgba(133,25,60,0.14)] bg-card p-8 shadow-sm">
          <div className="flex flex-col items-center text-center">
            <Avatar className="h-20 w-20 border border-[rgba(133,25,60,0.18)]">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="text-lg">{user.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <h1 className="mt-6 flex items-center gap-2 text-xl font-semibold text-foreground">
              <User className="h-5 w-5 text-muted-foreground" aria-hidden />
              Your account
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">Signed-in user details</p>
          </div>

          <dl className="mt-10 space-y-4 border-t border-border pt-8">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Name</dt>
              <dd className="mt-1 text-base text-foreground">{user.name}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email</dt>
              <dd className="mt-1 text-base text-foreground">{user.email}</dd>
            </div>
          </dl>

          <Button
            type="button"
            variant="outline"
            className="mt-10 w-full border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive"
            onClick={() => {
              logout()
              router.push('/')
            }}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sign out
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  )
}
