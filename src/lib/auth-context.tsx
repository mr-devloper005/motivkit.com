'use client'

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react'
import type { User } from '@/types'
import { currentUser } from '@/data/mock-data'
import { loadFromStorage, saveToStorage, storageKeys } from '@/lib/local-storage'

export type LocalAccount = {
  email: string
  password: string
  name: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  /** True after client has read persisted user from storage (avoids flash before hydration). */
  hasHydrated: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  signup: (name: string, email: string, password: string) => Promise<void>
  updateUser: (updates: Partial<User>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [hasHydrated, setHasHydrated] = useState(false)

  useEffect(() => {
    const storedUser = loadFromStorage<User | null>(storageKeys.user, null)
    if (storedUser) {
      setUser(storedUser)
    }
    setHasHydrated(true)
  }, [])

  const buildUser = useCallback((overrides: Partial<User>) => {
    const joinedDate = new Date().toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    })
    return {
      ...currentUser,
      id: `user-${Date.now()}`,
      joinedDate,
      followers: 0,
      following: 0,
      isVerified: false,
      ...overrides,
    }
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 400))

    const normalized = email.trim().toLowerCase()
    const accounts = loadFromStorage<LocalAccount[]>(storageKeys.localAccounts, [])
    const match = accounts.find((a) => a.email.toLowerCase() === normalized)

    if (!match || match.password !== password) {
      setIsLoading(false)
      throw new Error('Invalid email or password.')
    }

    const nextUser = buildUser({
      email: match.email,
      name: match.name,
    })
    setUser(nextUser)
    saveToStorage(storageKeys.user, nextUser)
    setIsLoading(false)
  }, [buildUser])

  const logout = useCallback(() => {
    setUser(null)
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(storageKeys.user)
    }
  }, [])

  const signup = useCallback(async (name: string, email: string, password: string) => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 400))

    const trimmedEmail = email.trim()
    const normalized = trimmedEmail.toLowerCase()
    const accounts = loadFromStorage<LocalAccount[]>(storageKeys.localAccounts, [])

    if (accounts.some((a) => a.email.toLowerCase() === normalized)) {
      setIsLoading(false)
      throw new Error('An account with this email already exists.')
    }

    if (!name.trim() || !trimmedEmail || !password) {
      setIsLoading(false)
      throw new Error('Please fill in all fields.')
    }

    const nextAccounts: LocalAccount[] = [
      ...accounts,
      { email: trimmedEmail, password, name: name.trim() },
    ]
    saveToStorage(storageKeys.localAccounts, nextAccounts)

    const nextUser = buildUser({
      name: name.trim(),
      email: trimmedEmail,
    })
    setUser(nextUser)
    saveToStorage(storageKeys.user, nextUser)
    setIsLoading(false)
  }, [buildUser])

  const updateUser = useCallback((updates: Partial<User>) => {
    setUser((prev) => {
      if (!prev) return prev
      const nextUser = { ...prev, ...updates }
      saveToStorage(storageKeys.user, nextUser)
      return nextUser
    })
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        hasHydrated,
        login,
        logout,
        signup,
        updateUser
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
