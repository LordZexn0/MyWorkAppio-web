"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Truck, Package, BarChart3, Warehouse, ArrowRight } from "lucide-react"
import { useCMSSection } from "@/hooks/use-cms"

const iconMap = {
  Warehouse,
  Package,
  Truck,
  BarChart3,
}

export default function SupplyChainAnimation() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const { content } = useCMSSection("supplyChain")

  if (!content) {
    return null // Loading state
  }

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  const arrowVariants = {
    hidden: { opacity: 0, width: 0 },
    visible: { opacity: 1, width: "100%", transition: { duration: 0.8, delay: 0.2 } },
  }

  return (
    <section className="w-full py-20 px-4 md:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading text-[#0F4C81]">{content.title}</h2>
          <div className="h-px w-20 bg-[#FFCF40] mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-gray-600">{content.description}</p>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-2 py-10"
        >
          {content.steps.map((step, index) => {
            const IconComponent = iconMap[step.icon as keyof typeof iconMap]
            return (
              <div key={step.title}>
                <motion.div variants={itemVariants} className="flex flex-col items-center text-center px-4">
                  <div className="w-20 h-20 rounded-full bg-[#0F4C81]/10 flex items-center justify-center mb-4">
                    <IconComponent className={`w-10 h-10 ${step.color}`} />
                  </div>
                  <h3 className={`text-lg font-semibold mb-2 ${step.color}`}>{step.title}</h3>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </motion.div>

                {/* Arrow between steps (desktop) */}
                {index < content.steps.length - 1 && (
                  <motion.div
                    variants={arrowVariants}
                    className="hidden md:block w-full max-w-[60px] h-[2px] bg-[#FFCF40]"
                  />
                )}
              </div>
            )
          })}
        </motion.div>

        {/* Mobile arrows */}
        <div className="md:hidden flex flex-col items-center">
          {content.steps.slice(0, -1).map((_, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="my-2"
            >
              <ArrowRight className="w-6 h-6 text-[#FFCF40]" />
            </motion.div>
          ))}
        </div>

        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mt-16"
        >
          <p className="text-lg text-gray-700 font-medium">{content.conclusion}</p>
        </motion.div>
      </div>
    </section>
  )
}
