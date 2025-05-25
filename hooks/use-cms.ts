"use client"

import { useState, useEffect } from "react"
import type { CMSContent } from "@/lib/cms"

// Client-side hook to fetch CMS content
export function useCMS() {
  const [content, setContent] = useState<CMSContent | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchContent() {
      try {
        const response = await fetch("/api/cms")
        if (!response.ok) {
          throw new Error("Failed to fetch CMS content")
        }
        const data = await response.json()
        setContent(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error")
      } finally {
        setLoading(false)
      }
    }

    fetchContent()
  }, [])

  return { content, loading, error }
}

// Hook to get specific section content
export function useCMSSection<K extends keyof CMSContent>(section: K) {
  const { content, loading, error } = useCMS()

  return {
    content: content?.[section] || null,
    loading,
    error,
  }
}
