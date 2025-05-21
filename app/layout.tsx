import type React from "react"
import type { Metadata } from "next"
import { Montserrat, Raleway } from "next/font/google"
import "./globals.css"

// Define fonts
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
})

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-raleway",
  display: "swap",
})

export const metadata: Metadata = {
  title: "MyWorkApp.io - Modern Solutions For Tomorrow's Challenges",
  description: "End-to-end turnkey solutions for logistics, warehouse management, IoT tracking, and custom workflows.",
  manifest: "/manifest.json",
  themeColor: "#ffffff",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "MyWorkApp.io",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`scroll-smooth ${montserrat.variable} ${raleway.variable}`}>
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="icons/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body className="font-sans">{children}</body>
    </html>
  )
}
