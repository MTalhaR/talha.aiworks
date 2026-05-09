import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  try {
    const body = await req.json()
    const { name, email, phone, services, budget, timeline, description } = body

    // Basic validation
    if (!name || !email || !phone || !services?.length || !budget || !timeline || !description) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const to = process.env.CONTACT_EMAIL
    const from = process.env.FROM_EMAIL || 'onboarding@resend.dev'

    if (!to) {
      console.error('CONTACT_EMAIL env var is not set')
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
    }

    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <style>
    body { font-family: system-ui, sans-serif; background: #020817; color: #e2e8f0; margin: 0; padding: 0; }
    .wrapper { max-width: 560px; margin: 0 auto; padding: 32px 24px; }
    .header { background: linear-gradient(135deg, #22d3ee22, #a855f722); border: 1px solid #22d3ee33;
               border-radius: 12px; padding: 24px; margin-bottom: 24px; }
    h1 { font-size: 22px; font-weight: 700; margin: 0 0 4px; color: #22d3ee; }
    .sub { color: #94a3b8; font-size: 13px; margin: 0; }
    .row { background: #0a1628; border: 1px solid #1e3a5f; border-radius: 8px;
           padding: 14px 18px; margin-bottom: 12px; }
    .label { font-size: 11px; text-transform: uppercase; letter-spacing: .08em; color: #64748b; margin-bottom: 4px; }
    .value { font-size: 15px; color: #e2e8f0; }
    .chip { display: inline-block; background: rgba(34,211,238,.12); border: 1px solid rgba(34,211,238,.25);
            color: #22d3ee; border-radius: 20px; padding: 3px 12px; font-size: 13px; margin: 2px; }
    .desc { background: #0a1628; border: 1px solid #1e3a5f; border-radius: 8px; padding: 14px 18px;
             white-space: pre-wrap; font-size: 14px; color: #cbd5e1; line-height: 1.6; }
    .footer { margin-top: 24px; font-size: 12px; color: #475569; text-align: center; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1>🤖 New Project Request</h1>
      <p class="sub">Received via your AI Portfolio contact form</p>
    </div>

    <div class="row">
      <div class="label">Full Name</div>
      <div class="value">${name}</div>
    </div>
    <div class="row">
      <div class="label">Email</div>
      <div class="value">${email}</div>
    </div>
    <div class="row">
      <div class="label">Phone</div>
      <div class="value">${phone}</div>
    </div>
    <div class="row">
      <div class="label">Services Requested</div>
      <div class="value">${(services as string[]).map((s) => `<span class="chip">${s}</span>`).join(' ')}</div>
    </div>
    <div class="row">
      <div class="label">Budget Range</div>
      <div class="value">${budget}</div>
    </div>
    <div class="row">
      <div class="label">Timeline</div>
      <div class="value">${timeline}</div>
    </div>

    <div class="label" style="margin:16px 0 6px;font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:#64748b;">
      Project Description
    </div>
    <div class="desc">${description}</div>

    <div class="footer">Sent from your AI Portfolio • Reply directly to ${email}</div>
  </div>
</body>
</html>`

    await resend.emails.send({
      from,
      to,
      reply_to: email,
      subject: `[AI Portfolio] New request from ${name} — ${(services as string[]).join(', ')}`,
      html,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact API error:', err)
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
  }
}
