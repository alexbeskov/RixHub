import { NextRequest, NextResponse } from 'next/server'
import { supabase, isSupabaseConfigured, addSubscriber } from '@/lib/supabase'
import fs from 'fs/promises'
import path from 'path'

const RESEND_API_KEY = process.env.RESEND_API_KEY
const RESEND_FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev'

async function sendWelcomeEmail(email: string) {
  if (!RESEND_API_KEY) return

  try {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: RESEND_FROM_EMAIL,
        to: email,
        subject: 'Welcome to RixHub!',
        html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Welcome to RixHub</title>
</head>
<body style="margin:0; padding:0; background-color:#0a0a0a; font-family:system-ui,-apple-system,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#0a0a0a;">
    <tr>
      <td align="center" style="padding:40px 20px;">
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px; width:100%; background-color:#111; border-radius:16px; border:1px solid #1f1f1f;">
          <tr>
            <td style="padding:40px 32px 24px; text-align:center;">
              <h1 style="color:#e5e5e5; font-size:24px; margin:0 0 12px; font-weight:700;">Welcome to RixHub!</h1>
              <p style="color:#a855f7; font-size:14px; margin:0; font-weight:500;">AI tools, prompts & guides for vibe coders</p>
            </td>
          </tr>
          <tr>
            <td style="padding:0 32px 32px;">
              <p style="color:#e5e5e5; font-size:16px; line-height:1.6; margin:0 0 24px;">
                Thanks for subscribing! You'll be the first to know about new AI tools, prompts, and guides.
              </p>
              <div style="text-align:center;">
                <a href="https://rix-hub-opal.vercel.app" style="display:inline-block; padding:12px 24px; background-color:#a855f7; color:#000; text-decoration:none; border-radius:8px; font-weight:600; font-size:14px;">Visit RixHub</a>
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding:0 32px 40px; text-align:center;">
              <p style="color:#666; font-size:12px; margin:0;">BY RixyHub 2026</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`,
      }),
    })
  } catch (err) {
    console.error('Failed to send welcome email:', err)
  }
}

// Fallback JSON storage for local dev / preview without Supabase
async function saveToJson(email: string) {
  try {
    const filePath = path.join(process.cwd(), 'data', 'subscribers.json')
    let subscribers: string[] = []
    try {
      const data = await fs.readFile(filePath, 'utf-8')
      subscribers = JSON.parse(data)
      if (!Array.isArray(subscribers)) subscribers = []
    } catch {
      // file doesn't exist yet
    }
    if (!subscribers.includes(email)) {
      subscribers.push(email)
      await fs.writeFile(filePath, JSON.stringify(subscribers, null, 2))
    }
    return { alreadyExists: false }
  } catch (err) {
    console.error('JSON fallback error:', err)
    return { alreadyExists: false }
  }
}

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    const normalizedEmail = email.trim().toLowerCase()
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(normalizedEmail)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 })
    }

    let result
    if (isSupabaseConfigured()) {
      result = await addSubscriber(normalizedEmail)
    } else {
      result = await saveToJson(normalizedEmail)
    }

    // Send welcome email (fire and forget)
    await sendWelcomeEmail(normalizedEmail)

    return NextResponse.json({
      success: true,
      alreadyExists: result.alreadyExists,
      message: result.alreadyExists
        ? 'You are already subscribed!'
        : 'Successfully subscribed!',
    })
  } catch (error: any) {
    console.error('Subscribe error:', error)

    // Provide helpful message if Supabase is missing
    if (!isSupabaseConfigured() && !process.env.RESEND_API_KEY) {
      return NextResponse.json(
        {
          error: 'Server not fully configured. Please set SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY and RESEND_API_KEY in environment variables.',
        },
        { status: 503 }
      )
    }

    return NextResponse.json(
      { error: error.message || 'Server error' },
      { status: 500 }
    )
  }
}
