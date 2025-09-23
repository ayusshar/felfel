"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState<string>("")

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus("loading")
    setMessage("")
    const form = e.currentTarget
    const formData = new FormData(form)
    const payload = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      phone: String(formData.get("phone") || ""),
      message: String(formData.get("message") || ""),
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setStatus("error")
        setMessage(data?.error || "Something went wrong. Please try again.")
        return
      }
      setStatus("success")
      setMessage("Thank you! Your feedback has been sent.")
      form.reset()
    } catch (err) {
      setStatus("error")
      setMessage("Network error. Please check your connection and try again.")
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 w-full max-w-xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium">
            Name
          </label>
          <Input id="name" name="name" placeholder="Your name" required />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <Input id="email" name="email" placeholder="you@example.com" type="email" required />
        </div>
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-medium">
          Phone (optional)
        </label>
        <Input id="phone" name="phone" placeholder="+91-XXXXXXXXXX" />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium">
          Feedback
        </label>
        <Textarea id="message" name="message" placeholder="Tell us about your experience..." rows={5} required />
      </div>

      <div className="flex items-center gap-3">
        <Button
          type="submit"
          disabled={status === "loading"}
          className="bg-[var(--brand)] text-white hover:bg-[var(--brand-600)] transition"
        >
          {status === "loading" ? "Sending..." : "Send Feedback"}
        </Button>
        {status === "success" && <p className="text-green-600 text-sm">{message}</p>}
        {status === "error" && <p className="text-red-600 text-sm">{message}</p>}
      </div>
    </form>
  )
}

export default ContactForm
