import { NextResponse } from "next/server"
import { Resend } from "resend"

const resendApiKey = process.env.RESEND_API_KEY
const FROM = process.env.RESEND_FROM_EMAIL || "Felfel Kitchen <business@felfelkitchen.in>"
const TO = "business@felfelkitchen.in"

export async function POST(req: Request) {
  try {
    if (!resendApiKey) {
      return NextResponse.json({ ok: false, error: "Missing RESEND_API_KEY" }, { status: 500 })
    }

    const { name, email, message } = await req.json().catch(() => ({}) as any)
    if (!name || !email || !message) {
      return NextResponse.json({ ok: false, error: "Name, email, and message are required" }, { status: 400 })
    }

    // Basic sanitization
    const esc = (s: string) =>
      String(s).replace(
        /[&<>"']/g,
        (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string,
      )

    const resend = new Resend(resendApiKey)

    // Debug logs (remove after resolving issues)
    console.log("[v0] Sending email via Resend", { from: "business@felfelkitche.in", to: TO })

    const { data, error } = await resend.emails.send({
      from: FROM,
      to: [TO],
      replyTo: email,
      subject: `New feedback from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `
        <div style="font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif; color: #1f2937;">
          <h2 style="margin:0 0 8px 0;">New Feedback</h2>
          <p style="margin:0 0 4px 0;"><strong>Name:</strong> ${esc(name)}</p>
          <p style="margin:0 0 12px 0;"><strong>Email:</strong> ${esc(email)}</p>
          <div style="padding:12px; background:#f9fafb; border:1px solid #e5e7eb; border-radius:8px;">
            <pre style="white-space:pre-wrap; margin:0; font-family: ui-monospace, SFMono-Regular, Menlo, monospace;">${esc(message)}</pre>
          </div>
        </div>
      `,
    })

    if (error) {
      console.log("[v0] Resend error:", error)
      // Helpful guidance for common Resend test-mode errors
      const hint =
        "If you see 'testing emails only', verify your sending domain in Resend and set RESEND_FROM_EMAIL to an address on that domain (e.g., no-reply@felfelkitchen.in), then Publish."
      return NextResponse.json({ ok: false, error: error.message, hint }, { status: 400 })
    }

    return NextResponse.json({ ok: true, id: data?.id })
  } catch (e: any) {
    console.log("[v0] Contact API error:", e?.message || e)
    return NextResponse.json({ ok: false, error: "Unexpected server error" }, { status: 500 })
  }
}
