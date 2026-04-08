'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Sparkles } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'

const inputClass =
  'h-12 rounded-xl border border-[rgba(133,25,60,0.22)] bg-white/90 px-4 text-sm text-[#4A102A] placeholder:text-[#85193C]/45 outline-none ring-[#85193C]/30 focus:border-[#85193C]/50 focus:ring-2'

export function RegisterForm() {
  const router = useRouter()
  const { signup, isLoading } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    try {
      await signup(name, email, password)
      router.push('/')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not create account.')
    }
  }

  return (
    <div className="rounded-[2rem] border border-[rgba(133,25,60,0.22)] bg-white/85 p-8 shadow-[0_12px_40px_-20px_rgba(74,16,42,0.35)] backdrop-blur-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#85193C]/85">Create account</p>
      <p className="mt-2 text-sm text-[#85193C]/80">Your profile is saved in this browser only (local storage).</p>
      <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
        {error ? (
          <p className="rounded-xl border border-[#C5172E]/35 bg-[#C5172E]/10 px-4 py-3 text-sm text-[#4A102A]" role="alert">
            {error}
          </p>
        ) : null}
        <input
          className={inputClass}
          placeholder="Full name"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          className={inputClass}
          placeholder="Email address"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className={inputClass}
          placeholder="Password"
          type="password"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex h-12 items-center justify-center rounded-full bg-[#85193C] px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-[#4A102A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FCF259]/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#fff9f7] disabled:pointer-events-none disabled:opacity-60"
        >
          {isLoading ? 'Creating…' : 'Create account'}
        </button>
      </form>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-sm text-[#85193C]/90">
        <span>Already have an account?</span>
        <Link href="/login" className="inline-flex items-center gap-2 font-semibold text-[#4A102A] hover:text-[#C5172E]">
          <Sparkles className="h-4 w-4 shrink-0 text-[#C5172E]" />
          Sign in
        </Link>
      </div>
    </div>
  )
}
