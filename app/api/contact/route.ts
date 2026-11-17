import nodemailer from 'nodemailer'

export const runtime = 'nodejs'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT ?? 587),
  secure: Number(process.env.MAIL_PORT) === 465,
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
})

function clean(value: unknown, max: number) {
  return typeof value === 'string' ? value.trim().slice(0, max) : ''
}

export async function POST(request: Request) {
  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const email = clean(body.email, 254)
  // Strip line breaks so the subject can't inject extra headers.
  const subject = clean(body.subject, 200).replace(/[\r\n]+/g, ' ')
  const message = clean(body.message, 5000)

  if (!EMAIL_RE.test(email) || !subject || !message) {
    return Response.json({ error: 'Please fill in all fields with valid values.' }, { status: 400 })
  }

  try {
    await transporter.sendMail({
      from: { name: process.env.MAIL_FROM_NAME ?? 'Website', address: process.env.MAIL_FROM_ADDRESS! },
      to: process.env.MAIL_TO_ADDRESS ?? 'contact@safenet.llc',
      replyTo: email,
      subject: `[Website inquiry] ${subject}`,
      text: `From: ${email}\nSubject: ${subject}\n\n${message}`,
    })
    return Response.json({ ok: true })
  } catch (error) {
    console.error('Contact mail failed:', error)
    return Response.json({ error: 'Failed to send message.' }, { status: 502 })
  }
}
