"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Phone, MapPin, Clock, Star, ChefHat, Utensils, Mail, Send } from "lucide-react"
import Image from "next/image"

export default function FelfelKitchen() {
  const [isVisible, setIsVisible] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage("")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
        }),
      })

      const data = await response.json().catch(() => ({}) as any)

      if (response.ok) {
        setSubmitMessage("Thank you for your feedback! We will get back to you soon.")
        setFormData({ name: "", email: "", phone: "", message: "" })
      } else {
        const hint = data?.hint ? ` Hint: ${data.hint}` : ""
        setSubmitMessage((data?.error || "Sorry, there was an error sending your message.") + hint)
      }
    } catch {
      setSubmitMessage("Sorry, there was an error sending your message. Please try calling us directly.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      {/* Header */}
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Image src="/logo.png" alt="Felfel Kitchen Logo" width={60} height={60} className="rounded-lg" />
              <div>
                <h1 className="text-2xl font-bold text-amber-900">Felfel Kitchen</h1>
                <p className="text-sm text-red-600 font-medium">Authentic North East Cuisine</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-amber-800">
                <Phone className="w-4 h-4" />
                <span className="text-sm font-medium">+91-8983770199</span>
              </div>
              <Button
                className="bg-red-600 hover:bg-red-700 text-white"
                onClick={() => (window.location.href = "tel:+918983770199")}
              >
                Order Now
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto text-center">
          <div
            className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <h2 className="text-5xl md:text-6xl font-bold text-amber-900 mb-6 text-balance">
              Taste the Authentic
              <span className="text-red-600 block">North East</span>
            </h2>
            <p className="text-xl text-amber-800 mb-8 max-w-2xl mx-auto text-pretty">
              Experience the rich flavors and traditional recipes from the beautiful North Eastern states of India,
              crafted with love and authentic ingredients.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-3"
                onClick={() => (window.location.href = "tel:+918983770199")}
              >
                <Phone className="w-5 h-5 mr-2" />
                Order Now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-red-200 transition-colors">
                <ChefHat className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-amber-900 mb-2">Authentic Recipes</h3>
              <p className="text-amber-700">Traditional recipes passed down through generations</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                <Utensils className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-amber-900 mb-2">Fresh Ingredients</h3>
              <p className="text-amber-700">Only the freshest ingredients sourced daily</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-200 transition-colors">
                <Star className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold text-amber-900 mb-2">Quality Service</h3>
              <p className="text-amber-700">Exceptional service with every order</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gradient-to-b from-amber-50 to-orange-50">
        <div className="container mx-auto max-w-2xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-amber-900 mb-4">Contact Us</h2>
            <p className="text-xl text-amber-700 text-pretty">
              We'd love to hear your feedback! Share your thoughts about our food and service.
            </p>
          </div>

          <Card className="overflow-hidden shadow-xl">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-amber-900 mb-2">
                      Name *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="border-amber-300 focus:border-red-500 focus:ring-red-500"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-amber-900 mb-2">
                      Phone
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="border-amber-300 focus:border-red-500 focus:ring-red-500"
                      placeholder="Your phone number"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-amber-900 mb-2">
                    Email *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="border-amber-300 focus:border-red-500 focus:ring-red-500"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-amber-900 mb-2">
                    Your Feedback *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="border-amber-300 focus:border-red-500 focus:ring-red-500"
                    placeholder="Tell us about your experience, suggestions, or any questions you have..."
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-3"
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Send Feedback
                    </>
                  )}
                </Button>

                {submitMessage && (
                  <div
                    className={`text-center p-4 rounded-lg ${
                      submitMessage.includes("Thank you") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}
                  >
                    {submitMessage}
                  </div>
                )}
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact & Hours */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-amber-900 mb-6">Visit Us</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-amber-900">Address</h3>
                    <p className="text-amber-700 text-pretty">
                      RH/11, lane number 5, Dhayarkar Colony,
                      <br />
                      Pingale Wasti, Koregaon Park Annexe,
                      <br />
                      Mundhwa, Pune, Maharashtra 411036
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-6 h-6 text-red-600" />
                  <div>
                    <h3 className="font-semibold text-amber-900">Phone</h3>
                    <p className="text-amber-700">+91-8983770199</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Clock className="w-6 h-6 text-red-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-amber-900">Hours</h3>
                    <div className="text-amber-700">
                      <p>Monday - Sunday</p>
                      <p>11:00 AM - 11:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-2xl p-8 text-white">
              <h2 className="text-3xl font-bold mb-4">Order Now</h2>
              <p className="text-red-100 mb-6 text-pretty">
                Craving authentic North Eastern cuisine? Call us now or visit our restaurant for a memorable dining
                experience.
              </p>
              <div className="space-y-4">
                <Button
                  size="lg"
                  className="w-full bg-white text-red-600 hover:bg-red-50"
                  onClick={() => (window.location.href = "tel:+918983770199")}
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call +91-8983770199
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full border-white text-white hover:bg-white hover:text-red-600 bg-transparent"
                  onClick={() =>
                    window.open(
                      "https://maps.google.com/?q=RH/11,+lane+number+5,+Dhayarkar+Colony,+Pingale+Wasti,+Koregaon+Park+Annexe,+Mundhwa,+Pune,+Maharashtra+411036",
                      "_blank",
                    )
                  }
                >
                  <MapPin className="w-5 h-5 mr-2" />
                  Get Directions
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-amber-900 text-amber-100 py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Image src="/logo.png" alt="Felfel Kitchen Logo" width={50} height={50} className="rounded-lg" />
                <div>
                  <h3 className="text-xl font-bold text-white">Felfel Kitchen</h3>
                  <p className="text-sm text-red-300">Authentic North East Cuisine</p>
                </div>
              </div>
              <p className="text-amber-200 text-pretty">
                Bringing you the authentic taste of North Eastern India with traditional recipes and fresh ingredients.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-4">Contact Info</h3>
              <div className="space-y-2">
                <p className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>+91-8983770199</span>
                </p>
                <p className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>business@felfelkitchen.in</span>
                </p>
                <p className="flex items-start space-x-2">
                  <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                  <span className="text-pretty">
                    RH/11, lane number 5, Dhayarkar Colony, Pingale Wasti, Koregaon Park Annexe, Mundhwa, Pune,
                    Maharashtra 411036
                  </span>
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-4">Opening Hours</h3>
              <div className="space-y-2">
                <p>Monday - Sunday</p>
                <p className="text-red-300 font-semibold">11:00 AM - 11:00 PM</p>
              </div>
            </div>
          </div>
          <div className="border-t border-amber-800 mt-8 pt-8 text-center">
            <p className="text-amber-300">© 2024 Felfel Kitchen. All rights reserved. | Authentic North East Cuisine</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
