"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { MapPin, Phone, Mail, ArrowRight } from "lucide-react"
import { useCMS } from "@/hooks/use-cms"

export default function Footer() {
  const { content } = useCMS()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || !content) {
    return null
  }

  const siteInfo = content.site
  const siteContact = content.site.contact

  return (
    <footer className="bg-[#0F4C81] text-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img src={siteInfo.logo || "/images/logo-transparent.png"} alt={siteInfo.name} className="h-10 w-auto" />
              <span className="text-xl font-bold">{siteInfo.name}</span>
            </div>
            <p className="text-blue-100 leading-relaxed">{siteInfo.description}</p>
            <div className="flex space-x-4">{/* Social links can be added here */}</div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-blue-100 hover:text-white transition-colors flex items-center group">
                  <ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-blue-100 hover:text-white transition-colors flex items-center group"
                >
                  <ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/why-us"
                  className="text-blue-100 hover:text-white transition-colors flex items-center group"
                >
                  <ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Why Us
                </Link>
              </li>
              <li>
                <Link
                  href="/case-studies"
                  className="text-blue-100 hover:text-white transition-colors flex items-center group"
                >
                  <ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Case Studies
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-blue-100 hover:text-white transition-colors flex items-center group">
                  <ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-blue-100 hover:text-white transition-colors flex items-center group"
                >
                  <ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li>
                <span className="text-blue-100">Custom Digital Solutions</span>
              </li>
              <li>
                <span className="text-blue-100">Digital Warehouse Management</span>
              </li>
              <li>
                <span className="text-blue-100">IoT Sensors & Tracking</span>
              </li>
              <li>
                <span className="text-blue-100">Logistics Optimization</span>
              </li>
            </ul>
          </div>

          {/* Contact Info - Using CMS Data */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-[#FFCF40] mt-1 flex-shrink-0" />
                <span className="text-blue-100 text-sm whitespace-pre-line">{siteContact.address}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-[#FFCF40] flex-shrink-0" />
                <a
                  href={`tel:${siteContact.phone}`}
                  className="text-blue-100 hover:text-white transition-colors text-sm"
                >
                  {siteContact.phone}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-[#FFCF40] flex-shrink-0" />
                <a
                  href={`mailto:${siteContact.email}`}
                  className="text-blue-100 hover:text-white transition-colors text-sm"
                >
                  {siteContact.email}
                </a>
              </div>
            </div>
            <div className="mt-4">
              <h4 className="font-medium mb-2">Business Hours</h4>
              <p className="text-blue-100 text-sm whitespace-pre-line">{siteContact.businessHours}</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-blue-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-blue-100 text-sm">
              © {new Date().getFullYear()} {siteInfo.name}. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-blue-100 hover:text-white text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-blue-100 hover:text-white text-sm transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
