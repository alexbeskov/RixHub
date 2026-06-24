import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }

    const normalizedEmail = email.trim().toLowerCase()

    // Store email locally
    const filePath = path.join(process.cwd(), 'data', 'subscribers.json')
    let subscribers: string[] = []
    try {
      const data = await fs.readFile(filePath, 'utf-8')
      subscribers = JSON.parse(data)
      if (!Array.isArray(subscribers)) subscribers = []
    } catch {
      // file doesn't exist yet
    }

    if (!subscribers.includes(normalizedEmail)) {
      subscribers.push(normalizedEmail)
      await fs.writeFile(filePath, JSON.stringify(subscribers, null, 2))
    }

    // Send welcome email via Resend if API key is configured
    const RESEND_API_KEY = process.env.RESEND_API_KEY
    const RESEND_FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev'

    if (RESEND_API_KEY) {
      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: RESEND_FROM_EMAIL,
            to: normalizedEmail,
            subject: 'Welcome to RixHub!',
            html: `
              <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #111;">
                <h1 style="font-size: 24px; margin-bottom: 16px;">Welcome to RixHub!</h1>
                <p style="font-size: 16px; line-height: 1.5; margin-bottom: 24px;">
                  Thanks for subscribing to RixHub updates. You'll be the first to know about new AI tools, prompts, and guides.
                </p>
                <p style="font-size: 14px; color: #666;">
                  BY RixyHub 2026
                </p>
              </div>
            `,
          }),
        })
      } catch (err) {
        console.error('Failed to send welcome email:', err)
        // Don't fail the subscription if email sending fails
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Subscribe error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
