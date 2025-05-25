"use client"

import { motion } from "framer-motion"
import { ArrowRight, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useCMSSection } from "@/hooks/use-cms"

export default function HeroSection() {
  const { content: homeContent } = useCMSSection("home")

  if (!homeContent) {
    return null // Loading state
  }

  const { hero, stats } = homeContent

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-orange-50">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#FFCF40]/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#FF6B35]/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#0F4C81]/10 rounded-full blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full px-4 text-center pt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 font-heading text-[#0F4C81]">
            <span className="block">{hero.title}</span>
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl font-bold text-black mb-8 max-w-3xl mx-auto">{hero.subtitle}</p>
          <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-2xl mx-auto">{hero.description}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/services">
            <Button className="bg-[#FF6B35] hover:bg-[#FF6B35]/90 text-white px-8 py-6 rounded-none text-lg font-medium">
              {hero.primaryButton}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link href="/case-studies">
            <Button
              variant="outline"
              className="border-[#0F4C81] text-[#0F4C81] hover:bg-[#0F4C81] hover:text-white px-8 py-6 rounded-none text-lg font-medium"
            >
              <Play className="mr-2 h-5 w-5" />
              {hero.secondaryButton}
            </Button>
          </Link>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 max-w-4xl mx-auto"
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#FF6B35] mb-2">{stat.number}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
