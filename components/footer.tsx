"use client"

import Link from "next/link"
import { useCMSSection } from "@/hooks/use-cms"

export default function Footer() {
  const { content: siteContent } = useCMSSection("site")
  const { content: footerContent } = useCMSSection("footer")

  // Provide fallback values with original content
  const siteName = siteContent?.name || "MyWorkApp.io"
  const siteLogo = siteContent?.logo || "/images/logo-transparent.png"
  const siteTagline = siteContent?.tagline || "Modern Solutions For Tomorrow's Challenges"

  const footerDescription =
    footerContent?.description ||
    "Transforming operations with turnkey solutions for logistics, warehouse management, IoT tracking, and custom digital workflows."
  const currentYear = new Date().getFullYear()
  const copyright =
    footerContent?.copyright?.replace("{year}", currentYear.toString()) ||
    `© ${currentYear} MyWorkApp.io. All rights reserved.`

  const quickLinks = footerContent?.quickLinks?.items || [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Why Us", href: "/why-us" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ]

  const contactItems = footerContent?.contact?.items || [
    "123 Business District",
    "Tech City, TC 12345",
    "+1 (555) 123-4567",
    "hello@myworkapp.io",
  ]

  const legalItems = footerContent?.legal || [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ]

  return (
    <footer className="w-full py-12 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <img src={siteLogo || "/placeholder.svg"} alt={`${siteName} Logo`} className="h-10 w-auto mr-3" />
              <span className="text-xl font-bold">{siteName}</span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">{footerDescription}</p>
            <p className="text-gray-400 text-sm">{siteTagline}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4 text-[#FFCF40]">{footerContent?.quickLinks?.title || "Quick Links"}</h3>
            <ul className="space-y-2">
              {quickLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-gray-400 hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4 text-[#FFCF40]">{footerContent?.contact?.title || "Contact"}</h3>
            <ul className="space-y-2 text-gray-400">
              {contactItems.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">{copyright}</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            {legalItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
