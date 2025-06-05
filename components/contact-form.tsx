"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Send, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import emailjs from "@emailjs/browser"

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const formRef = useRef<HTMLFormElement>(null)
  const [selectedServices, setSelectedServices] = useState<string[]>([])

  useEffect(() => {
    // Initialize EmailJS
    emailjs.init("LZZ5ipyB4DIFG4QkQ")
  }, [])

  const validateForm = () => {
    const errors: Record<string, string> = {}
    const form = formRef.current

    if (!form) return false

    const name = form.name.value
    const email = form.email.value
    const phone = form.phone.value
    const message = form.message.value

    if (!name.trim()) errors.name = "Name is required"
    if (!email.trim()) errors.email = "Email is required"
    else if (!/^\S+@\S+\.\S+$/.test(email)) errors.email = "Email is invalid"
    if (!phone.trim()) errors.phone = "Phone number is required"
    if (!message.trim()) errors.message = "Message is required"

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      // Prepare form data with selected services
      if (formRef.current) {
        // Create template parameters object - use field names that match your EmailJS template variables
        const templateParams = {
          from_name: formRef.current.name.value,
          from_email: formRef.current.email.value,
          phone_number: formRef.current.phone.value,
          company: formRef.current.company.value || "Not provided",
          selected_services: selectedServices.length > 0 ? selectedServices.join(", ") : "No services selected",
          message: formRef.current.message.value,
          // Add these fields explicitly to ensure they appear in the email
          name: formRef.current.name.value,
          email: formRef.current.email.value,
          phone: formRef.current.phone.value,
          services: selectedServices.length > 0 ? selectedServices.join(", ") : "No services selected",
        }

        console.log("Sending form data:", templateParams)

        // Send email using EmailJS with explicit template parameters
        await emailjs.send("service_j44x4lk", "template_6rmkeos", templateParams, "LZZ5ipyB4DIFG4QkQ")
      }

      setIsSubmitted(true)
      formRef.current?.reset()
      setSelectedServices([])
    } catch (error) {
      console.error("Error sending email:", error)
      alert("There was an error sending your message. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const toggleService = (service: string) => {
    setSelectedServices((prev) => (prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]))
  }

  return (
    <section className="w-full py-16 px-4 md:px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading text-[#FF6B35]">Send Us a Message</h2>
          <div className="h-px w-20 bg-[#FFCF40] mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-gray-600">
            Fill out the form below and we'll get back to you within 24 hours.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {isSubmitted ? (
            <div className="bg-white p-8 rounded-lg border border-gray-200 text-center max-w-2xl mx-auto">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                className="mb-6 mx-auto w-20 h-20 flex items-center justify-center rounded-full bg-[#FFCF40]/10"
              >
                <CheckCircle className="h-10 w-10 text-[#FF6B35]" />
              </motion.div>
              <h3 className="text-2xl font-bold mb-4 font-heading text-[#FF6B35]">Message Sent!</h3>
              <p className="text-gray-600 mb-6">
                Thank you for reaching out. We'll get back to you as soon as possible.
              </p>
              <Button
                onClick={() => setIsSubmitted(false)}
                className="bg-[#FF6B35] hover:bg-[#FF6B35]/90 text-white rounded-none"
              >
                Send Another Message
              </Button>
            </div>
          ) : (
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm"
            >
              <div className="grid md:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Your full name"
                      className={`bg-white border-gray-300 focus:border-[#FFCF40] rounded-none ${
                        formErrors.name ? "border-red-500" : ""
                      }`}
                    />
                    {formErrors.name && <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>}
                  </div>

                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Your email address"
                      className={`bg-white border-gray-300 focus:border-[#FFCF40] rounded-none ${
                        formErrors.email ? "border-red-500" : ""
                      }`}
                    />
                    {formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
                  </div>

                  <div>
                    <Label htmlFor="company">Company (Optional)</Label>
                    <Input
                      id="company"
                      name="company"
                      placeholder="Your company name"
                      className="bg-white border-gray-300 focus:border-[#FFCF40] rounded-none"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="Your phone number"
                      className={`bg-white border-gray-300 focus:border-[#FFCF40] rounded-none ${
                        formErrors.phone ? "border-red-500" : ""
                      }`}
                    />
                    {formErrors.phone && <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>}
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell us about your project or requirements"
                      rows={6}
                      className={`bg-white border-gray-300 focus:border-[#FFCF40] rounded-none resize-none ${
                        formErrors.message ? "border-red-500" : ""
                      }`}
                    />
                    {formErrors.message && <p className="text-red-500 text-sm mt-1">{formErrors.message}</p>}
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Services of Interest (Optional)</Label>
                    <div className="grid grid-cols-1 gap-3 mt-2">
                      {[
                        "Logistics and Supply Chain Management",
                        "Digital Warehouse Management",
                        "IoT Sensors and Tracking",
                        "Custom Digital Workflow Development",
                      ].map((service) => (
                        <div key={service} className="flex items-center space-x-2">
                          <Checkbox
                            id={service}
                            checked={selectedServices.includes(service)}
                            onCheckedChange={() => toggleService(service)}
                            className="border-[#FFCF40] data-[state=checked]:bg-[#FF6B35] data-[state=checked]:border-[#FF6B35]"
                          />
                          <Label htmlFor={service} className="font-normal cursor-pointer text-sm">
                            {service}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 text-center">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#FF6B35] hover:bg-[#FF6B35]/90 text-white py-3 px-8 rounded-none"
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      Send Message
                      <Send className="ml-2 h-5 w-5" />
                    </span>
                  )}
                </Button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}
