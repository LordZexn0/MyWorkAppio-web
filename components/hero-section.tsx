"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { ArrowDown } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HeroSectionProps {
  onCTAClick: () => void
}

export default function HeroSection({ onCTAClick }: HeroSectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoLoaded, setVideoLoaded] = useState(false)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.7 // Slow down the video slightly for better effect
    }
  }, [])

  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-white">
      {/* Video Background with reduced opacity overlay */}
      <div className="absolute inset-0 w-full h-full bg-white/30 z-10"></div>
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
          videoLoaded ? "opacity-100" : "opacity-0"
        }`}
        onLoadedData={() => setVideoLoaded(true)}
      >
        <source src="/videos/websiteback.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4 font-heading text-[#FF6B35]">
            <span className="block">MyWorkApp.io</span>
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl text-[#FFCF40] font-light max-w-3xl mx-auto">
            Modern Solutions For Tomorrow's Challenges
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="flex justify-center mt-12"
        >
          <Button
            onClick={onCTAClick}
            className="bg-[#FF6B35] hover:bg-[#FF6B35]/90 text-white px-8 py-6 rounded-none text-lg font-medium"
          >
            Explore Our Services
            <ArrowDown className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
