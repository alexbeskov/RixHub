import { NextRequest, NextResponse } from 'next/server'
import { isSupabaseConfigured, getAllSubscribers } from '@/lib/supabase'
import fs from 'fs/promises'
import path from 'path'

const RESEND_API_KEY = process.env.RESEND_API_KEY
const RESEND_FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev'

interface NotifyPayload {
  title: string
  message: string
  type?: 'manual' | 'github'
  link?: string
}

async function getSubscribersFromJson(): Promise<string[]> {
  try {
    const filePath = path.join(process.cwd(), 'data', 'subscribers.json')
    const data = await fs.readFile(filePath, 'utf-8')
    const parsed = JSON.parse(data)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

async function sendNotificationEmail(
  to: string,
  payload: NotifyPayload
) {
  if (!RESEND_API_KEY) throw new Error('RESEND_API_KEY not configured')

  const link = payload.link || 'https://rix-hub-opal.vercel.app'
  const tag = payload.type === 'github' ? '🔄 Auto Update' : '📢 Manual Update'

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${payload.title}</title>
</head>
<body style="margin:0; padding:0; background-color:#0a0a0a; font-family:system-ui,-apple-system,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#0a0a0a;">
    <tr>
      <td align="center" style="padding:40px 20px;">
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px; width:100%; background-color:#111; border-radius:16px; border:1px solid #1f1f1f;">
          <tr>
            <td style="padding:40px 32px 16px; text-align:center;">
              <span style="display:inline-block; padding:4px 12px; background-color:#a855f7; color:#000; border-radius:999px; font-size:12px; font-weight:600;">${tag}</span>
              <h1 style="color:#e5e5e5; font-size:22px; margin:16px 0 0; font-weight:700;">${payload.title}</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:0 32px 32px;">
              <p style="color:#e5e5e5; font-size:16px; line-height:1.6; margin:0 0 24px;">
                ${payload.message}
              </p>
              <div style="text-align:center;">
                <a href="${link}" style="display:inline-block; padding:12px 24px; background-color:#a855f7; color:#000; text-decoration:none; border-radius:8px; font-weight:600; font-size:14px;">Check it out</a>
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding:0 32px 40px; text-align:center;">
              <p style="color:#666; font-size:12px; margin:0 0 8px;">BY RixyHub 2026</p>
              <p style="color:#444; font-size:11px; margin:0;">
                <a href="${link}/api/unsubscribe?email=${encodeURIComponent(to)}" style="color:#444; text-decoration:underline;">Unsubscribe</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`

  return fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: RESEND_FROM_EMAIL,
      to,
      subject: payload.title,
      html,
    }),
  })
}

// Rate limiting: simple in-memory store (resets on server restart)
const lastNotifyByIp = new Map<string, number>()
const RATE_LIMIT_MS = 60_000 // 1 minute

export async function POST(req: NextRequest) {
  try {
    // Simple rate limiting by IP
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown'
    const last = lastNotifyByIp.get(ip)
    if (last && Date.now() - last < RATE_LIMIT_MS) {
      return NextResponse.json(
        { error: 'Rate limited. Please wait 60 seconds between notifications.' },
        { status: 429 }
      )
    }
    lastNotifyByIp.set(ip, Date.now())

    const body: NotifyPayload = await req.json()

    if (!body.title || !body.message) {
      return NextResponse.json(
        { error: 'title and message are required' },
        { status: 400 }
      )
    }

    if (!RESEND_API_KEY) {
      return NextResponse.json(
        { error: 'RESEND_API_KEY not configured. Cannot send emails.' },
        { status: 503 }
      )
    }

    // Get subscribers
    let subscribers: string[]
    if (isSupabaseConfigured()) {
      subscribers = await getAllSubscribers()
    } else {
      subscribers = await getSubscribersFromJson()
    }

    if (subscribers.length === 0) {
      return NextResponse.json(
        { error: 'No subscribers found' },
        { status: 400 }
      )
    }

    // Send emails with batching (Resend supports up to 50 BCC addresses per email, but let's send individually for personalization)
    const results = { sent: 0, failed: 0, errors: [] as string[] }

    // Batch in groups of 10 to avoid overwhelming the API
    const BATCH_SIZE = 10
    for (let i = 0; i < subscribers.length; i += BATCH_SIZE) {
      const batch = subscribers.slice(i, i + BATCH_SIZE)
      await Promise.all(
        batch.map(async (email) => {
          try {
            const res = await sendNotificationEmail(email, body)
            if (!res.ok) {
              const err = await res.text()
              throw new Error(err)
            }
            results.sent++
          } catch (err: any) {
            results.failed++
            results.errors.push(`${email}: ${err.message}`)
            console.error(`Failed to send to ${email}:`, err)
          }
        })
      )
    }

    return NextResponse.json({
      success: true,
      totalSubscribers: subscribers.length,
      sent: results.sent,
      failed: results.failed,
      errors: results.errors.slice(0, 5), // Return first 5 errors only
    })
  } catch (error: any) {
    console.error('Notify error:', error)
    return NextResponse.json(
      { error: error.message || 'Server error' },
      { status: 500 }
    )
  }
}

// GitHub webhook endpoint (same route, GET for webhook verification, POST for events)
export async function GET(req: NextRequest) {
  // For GitHub webhook verification (ping event)
  return NextResponse.json({ ok: true, message: 'Webhook endpoint active' })
}
