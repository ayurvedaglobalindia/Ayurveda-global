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
    <div className="min-h-screen flex items-center justify-center bg-ayur-cream px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-ayur-forest to-ayur-sage flex items-center justify-center">
            <Leaf className="w-8 h-8 text-ayur-cream" />
          </div>
          <h1 className="font-heading text-3xl font-medium text-ayur-black mb-2">Admin Login</h1>
          <p className="text-ayur-stone">Sign in to access the dashboard</p>
        </div>

        <div className="bg-white border border-ayur-beige rounded-2xl p-8">
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 flex items-center gap-3 text-red-700">
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

            <Button variant="primary" size="lg" className="w-full" loading={loading}>
              Sign In
            </Button>
          </form>

          <div className="mt-6 p-4 rounded-xl bg-ayur-cream text-center text-sm text-ayur-stone">
            <p className="font-medium text-ayur-forest mb-1">Default Credentials</p>
            <p>Username: <code className="bg-white px-2 py-0.5 rounded">admin</code></p>
            <p>Password: <code className="bg-white px-2 py-0.5 rounded">admin123</code></p>
          </div>
        </div>
      </div>
    </div>
  )
}