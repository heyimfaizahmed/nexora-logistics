import { useState, useEffect } from 'react'
import { AuthContext } from './useAuth'

const STORAGE_KEY = 'nexora_auth_session_v1'

const DEFAULT_DEMO_USER = {
  id: 'NX-USER-0941',
  name: 'Marcus Vance',
  email: 'trade.director@enterprise.com',
  company: 'Global Semiconductor Foundry NV',
  role: 'Senior Trade & Logistics Director',
  eoriNumber: 'NL8492019482',
  accountTier: 'SOVEREIGN ALLIANCE // TIER-1',
  activeAllocations: [
    {
      manifestId: 'NX-882901',
      corridor: 'Rotterdam [RTM] ──→ Singapore [SIN]',
      cargo: 'Semiconductor EUV Cryogenic Modules',
      status: 'IN TRANSIT (BERTHING ETA: 36H)',
      carrier: 'NEXORA MERIDIAN (24,000 TEU)',
      timestamp: '2026-09-14T14:32:00Z',
    },
    {
      manifestId: 'NX-994215',
      corridor: 'Toulouse [TLS] ──→ Seattle [BFI]',
      cargo: 'Composite Wing Spars (Vibration Damped)',
      status: 'CUSTOMS CLEARED // PRE-FLIGHT',
      carrier: 'CHARTERED AIR CORRIDOR',
      timestamp: '2026-09-15T08:15:00Z',
    },
  ],
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : null
    } catch {
      return null
    }
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
      } else {
        localStorage.removeItem(STORAGE_KEY)
      }
    } catch {
      // Ignore storage errors in restricted contexts
    }
  }, [user])

  const login = async (email, password) => {
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 600))

    if (!email || !password) {
      setLoading(false)
      throw new Error('Please provide both enterprise email and authorization key.')
    }

    if (password.length < 6) {
      setLoading(false)
      throw new Error('Security policy requires an authorization key of at least 6 characters.')
    }

    const authenticatedUser = {
      ...DEFAULT_DEMO_USER,
      email,
      name: email.split('@')[0].replace('.', ' ').replace(/(^\w|\s\w)/g, (m) => m.toUpperCase()),
    }

    setUser(authenticatedUser)
    setLoading(false)
    return authenticatedUser
  }

  const signup = async (formData) => {
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 700))

    const { name, email, company, eoriNumber, password } = formData

    if (!name || !email || !password) {
      setLoading(false)
      throw new Error('Mandatory registration parameters missing.')
    }

    if (password.length < 6) {
      setLoading(false)
      throw new Error('Authorization key must be at least 6 characters in length.')
    }

    const newUser = {
      id: `NX-USER-${Math.floor(1000 + Math.random() * 9000)}`,
      name,
      email,
      company: company || 'Enterprise Logistics Partner',
      role: 'Operations Dispatch Officer',
      eoriNumber: eoriNumber || 'PENDING_VALIDATION',
      accountTier: 'VERIFIED TRADER // STANDARD',
      activeAllocations: [],
    }

    setUser(newUser)
    setLoading(false)
    return newUser
  }

  const logout = () => {
    setUser(null)
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {
      // Safe fallback
    }
  }

  const updateProfile = (data) => {
    setUser((prev) => (prev ? { ...prev, ...data } : null))
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, loading, login, signup, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  )
}
