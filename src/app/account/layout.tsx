import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Account',
  description: 'Your signed-in account details',
}

export default function AccountLayout({ children }: { children: ReactNode }) {
  return children
}
