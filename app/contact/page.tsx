"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { MapPin, Phone, Mail, Clock } from "lucide-react"
import ContactForm from "@/components/contact-form"
import { useCMS } from "@/hooks/use-cms"

export default function ContactPage() {
  const { content } = useCMS()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || !content) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#FF6B35]"></div>
      </div>
    )
  }

  const contactData = content.contact
  const siteContact = content.site.contact

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#0F4C81] to-[#1a5490] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 font-heading">{contactData.hero.title}</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">{contactData.hero.description}</p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form - Now First */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="order-1"
            >
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-bold text-[#0F4C81] mb-6">{contactData.form.title}</h2>
                <ContactForm />
              </div>
            </motion.div>

            {/* Contact Information - Now Second */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="order-2"
            >
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-[#0F4C81] mb-6">Get in Touch</h2>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Ready to transform your business operations? Contact us today to discuss your specific needs and
                    discover how our solutions can drive your success.
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Address */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-md"
                  >
                    <div className="w-12 h-12 bg-[#0F4C81] rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#0F4C81] mb-1">Address</h3>
                      <p className="text-gray-600 whitespace-pre-line">{siteContact.address}</p>
                    </div>
                  </motion.div>

                  {/* Phone */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-md"
                  >
                    <div className="w-12 h-12 bg-[#FF6B35] rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#0F4C81] mb-1">Phone</h3>
                      <a
                        href={`tel:${siteContact.phone}`}
                        className="text-gray-600 hover:text-[#FF6B35] transition-colors"
                      >
                        {siteContact.phone}
                      </a>
                    </div>
                  </motion.div>

                  {/* Email */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-md"
                  >
                    <div className="w-12 h-12 bg-[#FFCF40] rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#0F4C81] mb-1">Email</h3>
                      <a
                        href={`mailto:${siteContact.email}`}
                        className="text-gray-600 hover:text-[#FF6B35] transition-colors"
                      >
                        {siteContact.email}
                      </a>
                    </div>
                  </motion.div>

                  {/* Business Hours */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.9 }}
                    className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-md"
                  >
                    <div className="w-12 h-12 bg-[#0F4C81] rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#0F4C81] mb-1">Business Hours</h3>
                      <p className="text-gray-600 whitespace-pre-line">{siteContact.businessHours}</p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
