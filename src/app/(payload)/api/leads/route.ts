import configPromise from '@payload-config'
import { getPayload } from 'payload'
import nodemailer from 'nodemailer'

const allowedSubmissionTypes = new Set(['contact', 'quote-request', 'callback-request'])

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

type LeadPayload = {
  name?: string
  email?: string
  phone?: string
  company?: string
  subject?: string
  message?: string
  submissionType?: 'contact' | 'quote-request' | 'callback-request'
  serviceSlug?: string
  serviceTitle?: string
}

type SubmissionType = 'contact' | 'quote-request' | 'callback-request'

const json = (body: Record<string, unknown>, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders,
    },
  })

const normalizeText = (value: unknown) => String(value ?? '').trim()

const normalizeEmail = (value: unknown) => String(value ?? '').trim().toLowerCase()

const normalizeSubmissionType = (value: unknown): SubmissionType => {
  const normalized = String(value ?? '').trim()
  return allowedSubmissionTypes.has(normalized) ? (normalized as SubmissionType) : 'contact'
}

const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

const getTransporter = () => {
  const host = process.env.SMTP_HOST
  const port = Number(process.env.SMTP_PORT || 587)
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS

  if (!host || !port || !user || !pass) {
    return null
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user,
      pass,
    },
  })
}

const buildEmailBody = (input: {
  submissionType: string
  name: string
  email: string
  phone: string
  company: string
  subject: string
  message: string
  serviceTitle: string
}) => {
  const rows = [
    ['Submission type', input.submissionType],
    ['Name', input.name],
    ['Email', input.email],
    ['Phone', input.phone || '-'],
    ['Company', input.company || '-'],
    ['Service', input.serviceTitle || '-'],
    ['Subject', input.subject || '-'],
    ['Message', input.message || '-'],
  ]

  const text = rows.map(([label, value]) => `${label}: ${value}`).join('\n')

  const html = `
    <div style="font-family: Arial, sans-serif; color: #111827; line-height: 1.6;">
      <h2 style="margin: 0 0 16px;">New lead from Octopus frontend</h2>
      <table style="border-collapse: collapse; width: 100%;">
        <tbody>
          ${rows
            .map(
              ([label, value]) => `
                <tr>
                  <td style="padding: 8px 12px; border: 1px solid #e5e7eb; font-weight: 700; width: 180px;">${label}</td>
                  <td style="padding: 8px 12px; border: 1px solid #e5e7eb; white-space: pre-line;">${String(value)}</td>
                </tr>
              `,
            )
            .join('')}
        </tbody>
      </table>
    </div>
  `

  return { text, html }
}

export const OPTIONS = async () => new Response(null, { status: 204, headers: corsHeaders })

export const POST = async (request: Request) => {
  try {
    const body = (await request.json()) as LeadPayload
    const payload = await getPayload({ config: configPromise })

    const name = normalizeText(body.name)
    const email = normalizeEmail(body.email)
    const phone = normalizeText(body.phone)
    const company = normalizeText(body.company)
    const message = normalizeText(body.message)
    const submissionType = normalizeSubmissionType(body.submissionType)
    const serviceSlug = normalizeText(body.serviceSlug)
    const serviceTitleFallback = normalizeText(body.serviceTitle)
    const subject =
      normalizeText(body.subject) ||
      (serviceTitleFallback ? `${serviceTitleFallback} request` : 'Website lead')

    if (!name || !email) {
      return json(
        {
          ok: false,
          error: 'Name and email are required.',
        },
        400,
      )
    }

    if (!isValidEmail(email)) {
      return json(
        {
          ok: false,
          error: 'Email address is invalid.',
        },
        400,
      )
    }

    const servicePage = serviceSlug
      ? await payload.find({
          collection: 'servicePages',
          limit: 1,
          depth: 0,
          where: {
            slug: {
              equals: serviceSlug,
            },
          },
        })
      : null

    const serviceDoc = servicePage?.docs?.[0]
    const serviceTitle =
      (typeof serviceDoc?.title === 'string' ? serviceDoc.title : '') || serviceTitleFallback

    const submission = await payload.create({
      collection: 'formSubmissions',
      data: {
        name,
        email,
        phone,
        company,
        subject,
        message,
        submissionType,
        servicePage: serviceDoc?.id,
        status: 'new',
      },
    })

    const transporter = getTransporter()
    let emailSent = false

    if (transporter) {
      const recipient = process.env.LEAD_NOTIFICATION_EMAIL || 'info@octopusgr.com'
      const from = process.env.SMTP_FROM || process.env.SMTP_USER || 'no-reply@octopusgr.com'
      const { text, html } = buildEmailBody({
        submissionType,
        name,
        email,
        phone,
        company,
        subject,
        message,
        serviceTitle,
      })

      await transporter.sendMail({
        to: recipient,
        from,
        replyTo: email,
        subject: `[Octopus Lead] ${subject}`,
        text,
        html,
      })

      emailSent = true
    } else {
      console.warn('Lead email skipped: SMTP settings are incomplete.')
    }

    return json(
      {
        ok: true,
        id: submission.id,
        emailSent,
      },
      201,
    )
  } catch (error) {
    console.error('Lead submission failed.', error)

    return json(
      {
        ok: false,
        error: 'Unable to submit the form right now.',
      },
      500,
    )
  }
}
