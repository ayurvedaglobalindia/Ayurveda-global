import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'

const users: any[] = []

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, password } = await request.json()

    if (!name || !email || !phone || !password) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
    }

    if (password.length < 8) {
      return NextResponse.json({ error: 'Password must be at least 8 characters' }, { status: 400 })
    }

    const existingUser = users.find(u => u.email === email)

    if (existingUser) {
      return NextResponse.json({ error: 'Email already registered' }, { status: 409 })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = {
      id: `user-${Date.now()}`,
      name,
      email,
      phone,
      password: hashedPassword,
      addresses: [],
      orders: [],
      wishlist: [],
      createdAt: new Date().toISOString(),
    }

    users.push(newUser)

    const { password: _, ...userWithoutPassword } = newUser

    const response = NextResponse.json({ user: userWithoutPassword })
    response.cookies.set('auth_token', 'mock-token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    })

    return response
  } catch (error) {
    return NextResponse.json({ error: 'Registration failed' }, { status: 500 })
  }
}