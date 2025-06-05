"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Navigation from "@/components/navigation"
import HeroSection from "@/components/hero-section"
import SupplyChainAnimation from "@/components/supply-chain-animation"
import Footer from "@/components/footer"
import RegisterSW from "./register-sw"
import Analytics from "./analytics"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle } from "lucide-react"
import LoadingScreen from "@/components/loading-screen"

export default function Home() {
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
      <RegisterSW />
      <Analytics />
      <AnimatePresence>{isLoading && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}</AnimatePresence>
      <Navigation />

      <main className="bg-white text-gray-900">
        <HeroSection />

        {/* Quick Overview Section */}
        <section className="py-20 px-4 md:px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading text-[#0F4C81]">
                Turnkey Solutions That Work
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                We deliver complete, ready-to-use systems that transform your operations from day one.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                "Logistics & Supply Chain",
                "Digital Warehouse Management",
                "IoT Sensors & Tracking",
                "Custom Digital Workflows",
              ].map((service, index) => (
                <motion.div
                  key={service}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center p-6 border border-gray-200 hover:border-[#FFCF40] transition-colors"
                >
                  <div className="w-12 h-12 bg-[#FF6B35]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-6 h-6 text-[#FF6B35]" />
                  </div>
                  <h3 className="font-semibold text-[#0F4C81] mb-2">{service}</h3>
                  <p className="text-sm text-gray-600">Ready-to-deploy solutions</p>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/services">
                <Button className="bg-[#FF6B35] hover:bg-[#FF6B35]/90 text-white px-8 py-4 rounded-none">
                  Learn More About Our Services
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Supply Chain Animation Section */}
        <SupplyChainAnimation />

        {/* CTA Section */}
        <section className="py-20 px-4 md:px-8 bg-gray-50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading text-[#0F4C81]">
              Ready to Transform Your Operations?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Get started with a free consultation and see how our turnkey solutions can streamline your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button className="bg-[#FF6B35] hover:bg-[#FF6B35]/90 text-white px-8 py-4 rounded-none">
                  Get Free Consultation
                </Button>
              </Link>
              <Link href="/why-us">
                <Button
                  variant="outline"
                  className="border-[#0F4C81] text-[#0F4C81] hover:bg-[#0F4C81] hover:text-white px-8 py-4 rounded-none"
                >
                  Why Choose Us
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
