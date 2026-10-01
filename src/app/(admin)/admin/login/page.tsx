'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Leaf, Lock, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

export default function AdminLoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })

      const data = await res.json()

      if (res.ok) {
        localStorage.setItem('admin_auth', 'true')
        router.push('/admin')
      } else {
        setError(data.error || 'Invalid credentials')
      }
    } catch (e) {
      setError('Login failed. Please try again.')
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#04140C] px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#1A4D36]/80 border-2 border-[#D4AF37]/50 flex items-center justify-center shadow-lg shadow-[#D4AF37]/15">
            <Leaf className="w-8 h-8 text-[#F4E295]" />
          </div>
          <span className="text-[#D4AF37] text-xs uppercase tracking-widest font-semibold block mb-1">
            Executive Portal
          </span>
          <h1 className="font-serif text-3xl font-normal text-white mb-2">Ayur Veda Admin</h1>
          <p className="text-[#8A9B8F] text-sm">Sign in to manage orders and Ayurvedic dispatches</p>
        </div>

        <div className="glass-luxury-card border border-[#D4AF37]/30 rounded-2xl p-8 shadow-2xl">
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-rose-500/20 border border-rose-500/40 flex items-center gap-3 text-rose-300">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="admin"
              required
              autoComplete="username"
              icon={<Lock className="w-5 h-5" />}
            />

            <Input
              label="Password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              autoComplete="current-password"
              icon={<Lock className="w-5 h-5" />}
            />

            <Button variant="gold" size="lg" className="w-full justify-center py-3 font-semibold shadow-md" loading={loading}>
              Sign In to Dashboard
            </Button>
          </form>

          <div className="mt-6 p-4 rounded-xl bg-[#061B12] border border-[#D4AF37]/20 text-center text-xs text-[#8A9B8F]">
            <p className="font-medium text-[#F4E295] mb-1">Default Credentials</p>
            <p>Username: <code className="bg-white/10 text-white px-2 py-0.5 rounded ml-1">admin</code></p>
            <p className="mt-1">Password: <code className="bg-white/10 text-white px-2 py-0.5 rounded ml-1">admin123</code></p>
          </div>
        </div>
      </div>
    </div>
  )
}