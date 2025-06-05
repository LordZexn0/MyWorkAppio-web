"use client"

import { motion } from "framer-motion"
import { Truck, Package, BarChart3, Warehouse, ArrowRight } from "lucide-react"

const steps = [
  {
    icon: Warehouse,
    title: "Warehouse",
    description: "Inventory tracking and management",
    color: "text-blue-900",
    bgColor: "bg-blue-900",
  },
  {
    icon: Package,
    title: "Packaging",
    description: "Automated order processing",
    color: "text-yellow-500",
    bgColor: "bg-yellow-500",
  },
  {
    icon: Truck,
    title: "Shipping",
    description: "Real-time tracking and routing",
    color: "text-orange-500",
    bgColor: "bg-orange-500",
  },
  {
    icon: BarChart3,
    title: "Analytics",
    description: "Performance insights and reporting",
    color: "text-blue-900",
    bgColor: "bg-blue-900",
  },
]

export default function SupplyChainAnimation() {
  return (
    <section className="w-full py-20 px-4 md:px-8 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 font-heading text-blue-900">
            Our End-to-End Supply Chain Solution
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto mb-6 rounded-full"></div>
          <p className="max-w-3xl mx-auto text-lg text-gray-600 leading-relaxed">
            From warehouse to delivery, our integrated platform streamlines every step of your logistics operations with
            seamless automation and real-time visibility.
          </p>
        </motion.div>

        <div className="relative">
          {/* Desktop Layout */}
          <div className="hidden lg:block">
            <div className="relative flex items-center justify-between max-w-6xl mx-auto">
              {/* Connecting Line */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
                className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-900 via-yellow-400 to-orange-500 transform -translate-y-1/2 origin-left rounded-full"
                style={{ zIndex: 1 }}
              />

              {steps.map((step, index) => {
                const IconComponent = step.icon
                return (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, y: 50, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                      duration: 0.8,
                      delay: index * 0.2 + 0.3,
                      ease: "easeOut",
                      type: "spring",
                      stiffness: 100,
                    }}
                    className="relative flex flex-col items-center text-center group"
                    style={{ zIndex: 10 }}
                  >
                    {/* Icon Circle */}
                    <motion.div
                      whileHover={{ scale: 1.1, y: -5 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="relative mb-6"
                    >
                      <div className="w-24 h-24 rounded-full bg-white shadow-xl flex items-center justify-center border-4 border-white group-hover:shadow-2xl transition-all duration-300">
                        <IconComponent
                          className={`w-12 h-12 ${step.color} transition-transform duration-300 group-hover:scale-110`}
                        />
                      </div>

                      {/* Pulse Animation */}
                      <motion.div
                        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                          delay: index * 0.2 + 1,
                        }}
                        className={`absolute inset-0 rounded-full ${step.bgColor} opacity-20`}
                      />
                    </motion.div>

                    {/* Content */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.6, delay: index * 0.2 + 0.8 }}
                      className="max-w-[180px]"
                    >
                      <h3
                        className={`text-xl font-bold mb-3 ${step.color} group-hover:scale-105 transition-transform duration-300`}
                      >
                        {step.title}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                        {step.description}
                      </p>
                    </motion.div>

                    {/* Step Number */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.2 + 1.2 }}
                      className={`absolute -top-3 -right-3 w-8 h-8 ${step.bgColor} text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg`}
                    >
                      {index + 1}
                    </motion.div>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="lg:hidden space-y-8">
            {steps.map((step, index) => {
              const IconComponent = step.icon
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.2,
                    ease: "easeOut",
                  }}
                  className="flex flex-col items-center text-center relative"
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center mb-4 border-2 border-gray-100 relative"
                  >
                    <IconComponent className={`w-8 h-8 ${step.color}`} />

                    {/* Step Number for mobile */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.2 + 0.5 }}
                      className={`absolute -top-1 -right-1 w-5 h-5 ${step.bgColor} text-white rounded-full flex items-center justify-center text-xs font-bold shadow-lg`}
                    >
                      {index + 1}
                    </motion.div>
                  </motion.div>

                  <h3 className={`text-lg font-bold mb-2 ${step.color}`}>{step.title}</h3>
                  <p className="text-sm text-gray-600 max-w-[280px] leading-relaxed px-4">{step.description}</p>

                  {/* Downward arrow for mobile - only between steps */}
                  {index < steps.length - 1 && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.2 + 0.8 }}
                      className="mt-6 mb-2"
                    >
                      <div className="transform rotate-90">
                        <ArrowRight className="w-6 h-6 text-yellow-400" />
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="text-center mt-16"
        >
          <div className="max-w-4xl mx-auto">
            <p className="text-xl text-gray-700 font-medium leading-relaxed">
              Our integrated platform connects every step of your supply chain for maximum efficiency.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
