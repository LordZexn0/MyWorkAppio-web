"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCMSSection } from "@/hooks/use-cms"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const { content: siteContent } = useCMSSection("site")
  const { content: navContent } = useCMSSection("navigation")

  const siteName = siteContent?.name || "MyWorkApp.io"
  const siteLogo = siteContent?.logo || "/images/logo-transparent.png"
  const navItems = navContent?.items || [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/why-us", label: "Why Us" },
    { href: "/case-studies", label: "Case Studies" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ]
  const ctaButton = navContent?.ctaButton || "Get Started"

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <img src={siteLogo || "/placeholder.svg"} alt={`${siteName} Logo`} className="h-10 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-[#FF6B35] ${
                  pathname === item.href ? "text-[#FF6B35]" : "text-gray-700"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link href="/contact">
              <Button className="bg-[#FF6B35] hover:bg-[#FF6B35]/90 text-white rounded-none">{ctaButton}</Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)} className="text-gray-700">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block px-3 py-2 text-base font-medium transition-colors hover:text-[#FF6B35] ${
                    pathname === item.href ? "text-[#FF6B35]" : "text-gray-700"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="px-3 py-2">
                <Link href="/contact">
                  <Button className="w-full bg-[#FF6B35] hover:bg-[#FF6B35]/90 text-white rounded-none">
                    {ctaButton}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
