"use client"

import { useState, useEffect } from "react"

interface CMSContent {
  site: {
    name: string
    logo: string
    description: string
    tagline: string
    contact: {
      address: string
      phone: string
      email: string
      businessHours: string
    }
  }
  home: {
    hero: {
      title: string
      subtitle: string
      description: string
      primaryButton: string
      secondaryButton: string
    }
    stats: Array<{
      number: string
      label: string
    }>
  }
  footer: {
    description: string
    copyright: string
    quickLinks: {
      title: string
      items: Array<{
        label: string
        href: string
      }>
    }
    contact: {
      title: string
      items: string[]
    }
    legal: Array<{
      label: string
      href: string
    }>
  }
}

const defaultContent: CMSContent = {
  site: {
    name: "MyWorkApp",
    logo: "/images/logo-transparent.png",
    description: "Innovative digital solutions for modern businesses",
    tagline: "Transform your operations with cutting-edge technology",
    contact: {
      address: "123 Business Street\nSuite 100\nCity, State 12345",
      phone: "+1 (555) 123-4567",
      email: "info@myworkapp.com",
      businessHours: "Monday - Friday: 9:00 AM - 6:00 PM\nSaturday: 10:00 AM - 4:00 PM\nSunday: Closed",
    },
  },
  home: {
    hero: {
      title: "Transform Your Business Operations",
      subtitle: "Streamline, Automate, and Optimize",
      description:
        "We deliver turnkey digital solutions that revolutionize how you manage logistics, warehouses, and supply chains.",
      primaryButton: "Get Started",
      secondaryButton: "Watch Demo",
    },
    stats: [
      { number: "500+", label: "Projects Completed" },
      { number: "99%", label: "Client Satisfaction" },
      { number: "24/7", label: "Support Available" },
    ],
  },
  footer: {
    description: "Leading provider of digital transformation solutions for logistics and supply chain management.",
    copyright: "© {year} MyWorkApp. All rights reserved.",
    quickLinks: {
      title: "Quick Links",
      items: [
        { label: "Home", href: "/" },
        { label: "Services", href: "/services" },
        { label: "About", href: "/why-us" },
        { label: "Contact", href: "/contact" },
      ],
    },
    contact: {
      title: "Contact",
      items: ["123 Business Street", "City, State 12345", "+1 (555) 123-4567", "info@myworkapp.com"],
    },
    legal: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
}

export function useCMS() {
  const [content, setContent] = useState<CMSContent>(defaultContent)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch("/api/cms")
        if (response.ok) {
          const data = await response.json()
          setContent(data)
        }
      } catch (error) {
        console.error("Failed to fetch CMS content:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchContent()
  }, [])

  const updateContent = async (newContent: CMSContent) => {
    try {
      const response = await fetch("/api/cms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newContent),
      })

      if (response.ok) {
        setContent(newContent)
        return true
      }
      return false
    } catch (error) {
      console.error("Failed to update CMS content:", error)
      return false
    }
  }

  return { content, isLoading, updateContent }
}

export function useCMSSection(section: keyof CMSContent) {
  const { content, isLoading } = useCMS()

  return {
    content: content ? content[section] : null,
    isLoading,
  }
}
