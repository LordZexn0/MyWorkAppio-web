"use client"

import type React from "react"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import HeroSection from "@/components/hero-section"
import ServicesSection from "@/components/services-section"
import ContactForm from "@/components/contact-form"
import Footer from "@/components/footer"
import RegisterSW from "./register-sw"
import Analytics from "./analytics"

export default function Home() {
  const servicesRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)
  const servicesInView = useInView(servicesRef, { once: true, amount: 0.2 })
  const contactInView = useInView(contactRef, { once: true, amount: 0.2 })

  const scrollToSection = (sectionRef: React.RefObject<HTMLDivElement>) => {
    sectionRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-white text-gray-900">
      <RegisterSW />
      <Analytics />
      <HeroSection onCTAClick={() => scrollToSection(servicesRef)} />

      <motion.div
        ref={servicesRef}
        initial={{ opacity: 0 }}
        animate={servicesInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full"
      >
        <ServicesSection onContactClick={() => scrollToSection(contactRef)} />
      </motion.div>

      <motion.div
        ref={contactRef}
        initial={{ opacity: 0 }}
        animate={contactInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full"
      >
        <ContactForm />
      </motion.div>

      <Footer />
    </main>
  )
}
