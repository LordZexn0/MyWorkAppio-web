"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Truck, Package, BarChart3, Warehouse, ArrowRight } from "lucide-react"

export default function SupplyChainAnimation() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

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
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading text-[#0F4C81]">
            Our End-to-End Supply Chain Solution
          </h2>
          <div className="h-px w-20 bg-[#FFCF40] mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-gray-600">
            From warehouse to delivery, our integrated platform streamlines every step of your logistics operations.
          </p>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-2 py-10"
        >
          {/* Warehouse */}
          <motion.div variants={itemVariants} className="flex flex-col items-center text-center px-4">
            <div className="w-20 h-20 rounded-full bg-[#0F4C81]/10 flex items-center justify-center mb-4">
              <Warehouse className="w-10 h-10 text-[#0F4C81]" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-[#0F4C81]">Warehouse</h3>
            <p className="text-sm text-gray-600">Inventory tracking and management</p>
          </motion.div>

          {/* Arrow 1 */}
          <motion.div variants={arrowVariants} className="hidden md:block w-full max-w-[60px] h-[2px] bg-[#FFCF40]" />

          {/* Packaging */}
          <motion.div variants={itemVariants} className="flex flex-col items-center text-center px-4">
            <div className="w-20 h-20 rounded-full bg-[#FFCF40]/10 flex items-center justify-center mb-4">
              <Package className="w-10 h-10 text-[#FFCF40]" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-[#FFCF40]">Packaging</h3>
            <p className="text-sm text-gray-600">Automated order processing</p>
          </motion.div>

          {/* Arrow 2 */}
          <motion.div variants={arrowVariants} className="hidden md:block w-full max-w-[60px] h-[2px] bg-[#FF6B35]" />

          {/* Shipping */}
          <motion.div variants={itemVariants} className="flex flex-col items-center text-center px-4">
            <div className="w-20 h-20 rounded-full bg-[#FF6B35]/10 flex items-center justify-center mb-4">
              <Truck className="w-10 h-10 text-[#FF6B35]" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-[#FF6B35]">Shipping</h3>
            <p className="text-sm text-gray-600">Real-time tracking and routing</p>
          </motion.div>

          {/* Arrow 3 */}
          <motion.div variants={arrowVariants} className="hidden md:block w-full max-w-[60px] h-[2px] bg-[#0F4C81]" />

          {/* Analytics */}
          <motion.div variants={itemVariants} className="flex flex-col items-center text-center px-4">
            <div className="w-20 h-20 rounded-full bg-[#0F4C81]/10 flex items-center justify-center mb-4">
              <BarChart3 className="w-10 h-10 text-[#0F4C81]" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-[#0F4C81]">Analytics</h3>
            <p className="text-sm text-gray-600">Performance insights and reporting</p>
          </motion.div>
        </motion.div>

        {/* Mobile arrows (visible only on small screens) */}
        <div className="md:hidden flex flex-col items-center">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="my-2"
            >
              <ArrowRight
                className={`w-6 h-6 ${i === 1 ? "text-[#FFCF40]" : i === 2 ? "text-[#FF6B35]" : "text-[#0F4C81]"}`}
              />
            </motion.div>
          ))}
        </div>

        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mt-16"
        >
          <p className="text-lg text-gray-700 font-medium">
            Our integrated platform connects every step of your supply chain for maximum efficiency.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
