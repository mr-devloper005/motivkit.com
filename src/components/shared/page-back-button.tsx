'use client'

import { useRouter, usePathname } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

export function PageBackButton() {
  const router = useRouter()
  const pathname = usePathname()

  if (pathname === '/') {
    return null
  }

  return (
    <button
      type="button"
      onClick={() => router.back()}
      className="fixed left-4 top-4 z-50 inline-flex items-center gap-2 rounded-full border border-[rgba(133,25,60,0.25)] bg-[#fff9f7]/95 px-3.5 py-2 text-sm font-medium text-[#4A102A] shadow-sm backdrop-blur-sm transition hover:border-[#85193C]/40 hover:bg-white hover:text-[#85193C] dark:border-white/15 dark:bg-background/90 dark:text-foreground dark:hover:bg-secondary"
      aria-label="Go back to previous page"
    >
      <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden />
      Back
    </button>
  )
}
