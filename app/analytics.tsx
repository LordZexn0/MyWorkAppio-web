"use client"

import { Analytics as VercelAnalytics } from "@vercel/analytics/react"
import Script from "next/script"

export default function Analytics() {
  return (
    <>
      {/* Google Analytics Script */}
      <Script strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=G-MEASUREMENT_ID`} />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-MEASUREMENT_ID');
        `}
      </Script>

      {/* Vercel Analytics - explicitly included */}
      <VercelAnalytics />
    </>
  )
}
