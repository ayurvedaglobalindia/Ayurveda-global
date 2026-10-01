import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'

const users: any[] = [
  {
    id: 'user-1',
    name: 'Demo User',
    email: 'demo@ayurvedaglobal.com',
    phone: '+919876543210',
    password: '$2a$10$xVqJZqJZqJZqJZqJZqJZqO', // password: demo123
    addresses: [],
    orders: [],
    wishlist: [],
    createdAt: new Date().toISOString(),
  }
]

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 })
    }

    const user = users.find(u => u.email === email)

    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    const isValid = await bcrypt.compare(password, user.password)

    if (!isValid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    const { password: _, ...userWithoutPassword } = user

    const response = NextResponse.json({ user: userWithoutPassword })
    response.cookies.set('auth_token', 'mock-token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    })

    return response
  } catch (error) {
    return NextResponse.json({ error: 'Login failed' }, { status: 500 })
  }
}