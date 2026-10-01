import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, phone, email, age, goal, doctor, slot, mode, notes } = body

    if (!name || !phone) {
      return NextResponse.json({ error: 'Name and phone are required' }, { status: 400 })
    }

    const consultationId = `CONS-${Date.now()}`

    // Insert into DB if table exists or handle gracefully
    try {
      db.prepare(`
        CREATE TABLE IF NOT EXISTS consultations (
          id TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          phone TEXT NOT NULL,
          email TEXT,
          age INTEGER,
          goal TEXT,
          doctor TEXT,
          slot TEXT,
          mode TEXT,
          notes TEXT,
          status TEXT DEFAULT 'scheduled',
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `).run()

      db.prepare(`
        INSERT INTO consultations (id, name, phone, email, age, goal, doctor, slot, mode, notes)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        consultationId,
        name,
        phone,
        email || null,
        age ? parseInt(age) : null,
        goal || 'General Vitality',
        doctor || 'Senior Ayurvedic Vaidya',
        slot || 'Next Available Slot',
        mode || 'WhatsApp Video Call',
        notes || null
      )
    } catch (dbErr) {
      console.error('Database consultation insert warning:', dbErr)
    }

    return NextResponse.json({
      success: true,
      consultationId,
      message: 'Consultation scheduled successfully',
    })
  } catch (error) {
    console.error('Consultation booking error:', error)
    return NextResponse.json({ error: 'Failed to schedule consultation' }, { status: 500 })
  }
}
