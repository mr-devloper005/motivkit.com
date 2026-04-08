'use client'

import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useAuth } from '@/lib/auth-context'

export function NavbarAuthControls() {
  const { user } = useAuth()

  return (
    <Link
      href="/account"
      className="flex shrink-0 items-center rounded-full ring-offset-background transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      aria-label="Account"
    >
      <Avatar className="h-9 w-9 border border-[rgba(133,25,60,0.14)]">
        <AvatarImage src={user?.avatar} alt={user?.name ?? ''} />
        <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
      </Avatar>
    </Link>
  )
}
