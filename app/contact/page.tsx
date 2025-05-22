"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Navigation from "@/components/navigation"
import ContactForm from "@/components/contact-form"
import Footer from "@/components/footer"
import { MapPin, Phone, Mail, Clock } from "lucide-react"
import LoadingScreen from "@/components/loading-screen"

export default function ContactPage() {
  const [isLoading, setIsLoading] = useState(true)

  const handleLoadingComplete = () => {
    setIsLoading(false)
  }

  // Prevent scrolling during loading
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isLoading])

  return (
    <>
      <AnimatePresence>{isLoading && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}</AnimatePresence>
      <Navigation />

      <main className="pt-16 bg-white text-gray-900">
        {/* Hero Section */}
        <section className="py-20 px-4 md:px-8 bg-gradient-to-br from-blue-50 to-orange-50">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 font-heading text-[#0F4C81]">Get In Touch</h1>
              <p className="text-xl text-gray-600 mb-8">
                Ready to transform your operations? Let's discuss how our turnkey solutions can help your business.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Info */}
        <section className="py-16 px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {[
                {
                  icon: <MapPin className="w-6 h-6" />,
                  title: "Office Location",
                  info: "123 Business District\nTech City, TC 12345",
                },
                {
                  icon: <Phone className="w-6 h-6" />,
                  title: "Phone",
                  info: "+1 (555) 123-4567",
                },
                {
                  icon: <Mail className="w-6 h-6" />,
                  title: "Email",
                  info: "hello@myworkapp.io",
                },
                {
                  icon: <Clock className="w-6 h-6" />,
                  title: "Business Hours",
                  info: "Mon - Fri: 9:00 AM - 6:00 PM\nSat - Sun: Closed",
                },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center p-6 border border-gray-200 hover:border-[#FFCF40] transition-colors"
                >
                  <div className="w-12 h-12 bg-[#FF6B35]/10 rounded-full flex items-center justify-center mx-auto mb-4 text-[#FF6B35]">
                    {item.icon}
                  </div>
                  <h3 className="font-semibold text-[#0F4C81] mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm whitespace-pre-line">{item.info}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <ContactForm />
      </main>

      <Footer />
    </>
  )
}
