"use client"

import { useState, useEffect } from "react"
import { Save, Eye, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import type { CMSContent } from "@/lib/cms"

export default function AdminPanel() {
  const [content, setContent] = useState<CMSContent | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    fetchContent()
  }, [])

  const fetchContent = async () => {
    try {
      const response = await fetch("/api/cms")
      if (!response.ok) throw new Error("Failed to fetch content")
      const data = await response.json()
      setContent(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load content",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const saveContent = async () => {
    if (!content) return

    setSaving(true)
    try {
      const response = await fetch("/api/cms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      })

      if (!response.ok) throw new Error("Failed to save content")

      toast({
        title: "Success",
        description: "Content saved successfully!",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save content",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  const updateContent = (path: string[], value: any) => {
    if (!content) return

    const newContent = { ...content }
    let current: any = newContent

    for (let i = 0; i < path.length - 1; i++) {
      current = current[path[i]]
    }

    current[path[path.length - 1]] = value
    setContent(newContent)
  }

  const addArrayItem = (path: string[], newItem: any) => {
    if (!content) return

    const newContent = { ...content }
    let current: any = newContent

    for (const key of path) {
      current = current[key]
    }

    current.push(newItem)
    setContent(newContent)
  }

  const removeArrayItem = (path: string[], index: number) => {
    if (!content) return

    const newContent = { ...content }
    let current: any = newContent

    for (const key of path) {
      current = current[key]
    }

    current.splice(index, 1)
    setContent(newContent)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#FF6B35]"></div>
          <p className="mt-4 text-gray-600">Loading admin panel...</p>
        </div>
      </div>
    )
  }

  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">Failed to load content</p>
          <Button onClick={fetchContent} className="mt-4">
            Retry
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Content Management System</h1>
              <p className="text-gray-600">Manage your website content</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => window.open("/", "_blank")}>
                <Eye className="w-4 h-4 mr-2" />
                Preview Site
              </Button>
              <Button onClick={saveContent} disabled={saving} className="bg-[#FF6B35] hover:bg-[#FF6B35]/90">
                <Save className="w-4 h-4 mr-2" />
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Deployment Warning */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800">Deployment Notice</h3>
            <div className="mt-2 text-sm text-yellow-700">
              <p>
                Content changes will work during this session but will reset on the next deployment. For persistent
                changes in production, consider using a database or external CMS.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Tabs defaultValue="site" className="space-y-6">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="site">Site Info</TabsTrigger>
            <TabsTrigger value="home">Home</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="why-us">Why Us</TabsTrigger>
            <TabsTrigger value="case-studies">Case Studies</TabsTrigger>
            <TabsTrigger value="blog">Blog</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
          </TabsList>

          {/* Site Information */}
          <TabsContent value="site">
            <SiteInfoEditor content={content.site} updateContent={updateContent} />
          </TabsContent>

          {/* Home Page */}
          <TabsContent value="home">
            <HomeEditor content={content.home} updateContent={updateContent} />
          </TabsContent>

          {/* Services */}
          <TabsContent value="services">
            <ServicesEditor
              content={content.services}
              updateContent={updateContent}
              addArrayItem={addArrayItem}
              removeArrayItem={removeArrayItem}
            />
          </TabsContent>

          {/* Why Us */}
          <TabsContent value="why-us">
            <WhyUsEditor
              content={content.whyUs}
              updateContent={updateContent}
              addArrayItem={addArrayItem}
              removeArrayItem={removeArrayItem}
            />
          </TabsContent>

          {/* Case Studies */}
          <TabsContent value="case-studies">
            <CaseStudiesEditor
              content={content.caseStudies}
              updateContent={updateContent}
              addArrayItem={addArrayItem}
              removeArrayItem={removeArrayItem}
            />
          </TabsContent>

          {/* Blog */}
          <TabsContent value="blog">
            <BlogEditor
              content={content.blog}
              updateContent={updateContent}
              addArrayItem={addArrayItem}
              removeArrayItem={removeArrayItem}
            />
          </TabsContent>

          {/* Contact */}
          <TabsContent value="contact">
            <ContactEditor content={content.contact} updateContent={updateContent} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

// Site Info Editor Component
function SiteInfoEditor({ content, updateContent }: any) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Basic Site Information</CardTitle>
          <CardDescription>Update your site's basic information and branding</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="site-name">Site Name</Label>
              <Input
                id="site-name"
                value={content.name}
                onChange={(e) => updateContent(["site", "name"], e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="site-tagline">Tagline</Label>
              <Input
                id="site-tagline"
                value={content.tagline}
                onChange={(e) => updateContent(["site", "tagline"], e.target.value)}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="site-description">Description</Label>
            <Textarea
              id="site-description"
              value={content.description}
              onChange={(e) => updateContent(["site", "description"], e.target.value)}
              rows={3}
            />
          </div>
          <div>
            <Label htmlFor="site-logo">Logo Path</Label>
            <Input
              id="site-logo"
              value={content.logo}
              onChange={(e) => updateContent(["site", "logo"], e.target.value)}
              placeholder="/images/logo.png"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
          <CardDescription>Update your contact details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="contact-phone">Phone</Label>
              <Input
                id="contact-phone"
                value={content.contact.phone}
                onChange={(e) => updateContent(["site", "contact", "phone"], e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="contact-email">Email</Label>
              <Input
                id="contact-email"
                value={content.contact.email}
                onChange={(e) => updateContent(["site", "contact", "email"], e.target.value)}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="contact-address">Address</Label>
            <Textarea
              id="contact-address"
              value={content.contact.address}
              onChange={(e) => updateContent(["site", "contact", "address"], e.target.value)}
              rows={2}
            />
          </div>
          <div>
            <Label htmlFor="contact-hours">Business Hours</Label>
            <Textarea
              id="contact-hours"
              value={content.contact.businessHours}
              onChange={(e) => updateContent(["site", "contact", "businessHours"], e.target.value)}
              rows={2}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Home Editor Component
function HomeEditor({ content, updateContent }: any) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Hero Section</CardTitle>
          <CardDescription>Edit the main hero section of your homepage</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="hero-title">Title</Label>
            <Input
              id="hero-title"
              value={content.hero.title}
              onChange={(e) => updateContent(["home", "hero", "title"], e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="hero-subtitle">Subtitle</Label>
            <Input
              id="hero-subtitle"
              value={content.hero.subtitle}
              onChange={(e) => updateContent(["home", "hero", "subtitle"], e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="hero-description">Description</Label>
            <Textarea
              id="hero-description"
              value={content.hero.description}
              onChange={(e) => updateContent(["home", "hero", "description"], e.target.value)}
              rows={3}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="hero-primary-btn">Primary Button Text</Label>
              <Input
                id="hero-primary-btn"
                value={content.hero.primaryButton}
                onChange={(e) => updateContent(["home", "hero", "primaryButton"], e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="hero-secondary-btn">Secondary Button Text</Label>
              <Input
                id="hero-secondary-btn"
                value={content.hero.secondaryButton}
                onChange={(e) => updateContent(["home", "hero", "secondaryButton"], e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Statistics</CardTitle>
          <CardDescription>Edit the statistics shown on your homepage</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {content.stats.map((stat: any, index: number) => (
            <div key={index} className="grid grid-cols-2 gap-4 p-4 border rounded-lg">
              <div>
                <Label htmlFor={`stat-number-${index}`}>Number</Label>
                <Input
                  id={`stat-number-${index}`}
                  value={stat.number}
                  onChange={(e) => {
                    const newStats = [...content.stats]
                    newStats[index].number = e.target.value
                    updateContent(["home", "stats"], newStats)
                  }}
                />
              </div>
              <div>
                <Label htmlFor={`stat-label-${index}`}>Label</Label>
                <Input
                  id={`stat-label-${index}`}
                  value={stat.label}
                  onChange={(e) => {
                    const newStats = [...content.stats]
                    newStats[index].label = e.target.value
                    updateContent(["home", "stats"], newStats)
                  }}
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

// Services Editor Component
function ServicesEditor({ content, updateContent, addArrayItem, removeArrayItem }: any) {
  const addService = () => {
    const newService = {
      id: Date.now(),
      title: "New Service",
      subtitle: "Service subtitle",
      description: "Service description",
      features: ["Feature 1", "Feature 2"],
      benefits: ["Benefit 1", "Benefit 2"],
      image: "/images/service.png",
    }
    addArrayItem(["services", "items"], newService)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Services Page Header</CardTitle>
          <CardDescription>Edit the header section of your services page</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="services-title">Title</Label>
            <Input
              id="services-title"
              value={content.hero.title}
              onChange={(e) => updateContent(["services", "hero", "title"], e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="services-description">Description</Label>
            <Textarea
              id="services-description"
              value={content.hero.description}
              onChange={(e) => updateContent(["services", "hero", "description"], e.target.value)}
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Services
            <Button onClick={addService} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Service
            </Button>
          </CardTitle>
          <CardDescription>Manage your services</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {content.items.map((service: any, index: number) => (
            <div key={service.id} className="p-6 border rounded-lg space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Service {index + 1}</h3>
                <Button variant="destructive" size="sm" onClick={() => removeArrayItem(["services", "items"], index)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`service-title-${index}`}>Title</Label>
                  <Input
                    id={`service-title-${index}`}
                    value={service.title}
                    onChange={(e) => {
                      const newServices = [...content.items]
                      newServices[index].title = e.target.value
                      updateContent(["services", "items"], newServices)
                    }}
                  />
                </div>
                <div>
                  <Label htmlFor={`service-subtitle-${index}`}>Subtitle</Label>
                  <Input
                    id={`service-subtitle-${index}`}
                    value={service.subtitle}
                    onChange={(e) => {
                      const newServices = [...content.items]
                      newServices[index].subtitle = e.target.value
                      updateContent(["services", "items"], newServices)
                    }}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor={`service-description-${index}`}>Description</Label>
                <Textarea
                  id={`service-description-${index}`}
                  value={service.description}
                  onChange={(e) => {
                    const newServices = [...content.items]
                    newServices[index].description = e.target.value
                    updateContent(["services", "items"], newServices)
                  }}
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor={`service-image-${index}`}>Image Path</Label>
                <Input
                  id={`service-image-${index}`}
                  value={service.image}
                  onChange={(e) => {
                    const newServices = [...content.items]
                    newServices[index].image = e.target.value
                    updateContent(["services", "items"], newServices)
                  }}
                  placeholder="/images/service.png"
                />
              </div>

              <div>
                <Label htmlFor={`service-features-${index}`}>Features (one per line)</Label>
                <Textarea
                  id={`service-features-${index}`}
                  value={service.features.join("\n")}
                  onChange={(e) => {
                    const newServices = [...content.items]
                    newServices[index].features = e.target.value.split("\n").filter((f) => f.trim())
                    updateContent(["services", "items"], newServices)
                  }}
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor={`service-benefits-${index}`}>Benefits (one per line)</Label>
                <Textarea
                  id={`service-benefits-${index}`}
                  value={service.benefits.join("\n")}
                  onChange={(e) => {
                    const newServices = [...content.items]
                    newServices[index].benefits = e.target.value.split("\n").filter((b) => b.trim())
                    updateContent(["services", "items"], newServices)
                  }}
                  rows={3}
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

// Why Us Editor Component
function WhyUsEditor({ content, updateContent, addArrayItem, removeArrayItem }: any) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Why Us Page Header</CardTitle>
          <CardDescription>Edit the header section of your Why Us page</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="why-us-title">Title</Label>
            <Input
              id="why-us-title"
              value={content.hero.title}
              onChange={(e) => updateContent(["whyUs", "hero", "title"], e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="why-us-description">Description</Label>
            <Textarea
              id="why-us-description"
              value={content.hero.description}
              onChange={(e) => updateContent(["whyUs", "hero", "description"], e.target.value)}
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Statistics</CardTitle>
          <CardDescription>Edit the statistics on your Why Us page</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {content.stats.map((stat: any, index: number) => (
            <div key={index} className="grid grid-cols-3 gap-4 p-4 border rounded-lg">
              <div>
                <Label htmlFor={`why-stat-number-${index}`}>Number</Label>
                <Input
                  id={`why-stat-number-${index}`}
                  value={stat.number}
                  onChange={(e) => {
                    const newStats = [...content.stats]
                    newStats[index].number = e.target.value
                    updateContent(["whyUs", "stats"], newStats)
                  }}
                />
              </div>
              <div>
                <Label htmlFor={`why-stat-label-${index}`}>Label</Label>
                <Input
                  id={`why-stat-label-${index}`}
                  value={stat.label}
                  onChange={(e) => {
                    const newStats = [...content.stats]
                    newStats[index].label = e.target.value
                    updateContent(["whyUs", "stats"], newStats)
                  }}
                />
              </div>
              <div>
                <Label htmlFor={`why-stat-color-${index}`}>Color Class</Label>
                <Input
                  id={`why-stat-color-${index}`}
                  value={stat.color}
                  onChange={(e) => {
                    const newStats = [...content.stats]
                    newStats[index].color = e.target.value
                    updateContent(["whyUs", "stats"], newStats)
                  }}
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

// Case Studies Editor Component
function CaseStudiesEditor({ content, updateContent, addArrayItem, removeArrayItem }: any) {
  const addCaseStudy = () => {
    const newCaseStudy = {
      id: Date.now(),
      title: "New Case Study",
      client: "Client Name",
      industry: "Industry",
      location: "Location",
      date: "2024",
      challenge: "Challenge description",
      solution: "Solution description",
      results: ["Result 1", "Result 2"],
      image: "/images/case-study.jpg",
      tags: ["Tag1", "Tag2"],
    }
    addArrayItem(["caseStudies", "items"], newCaseStudy)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Case Studies
            <Button onClick={addCaseStudy} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Case Study
            </Button>
          </CardTitle>
          <CardDescription>Manage your case studies</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {content.items.map((study: any, index: number) => (
            <div key={study.id} className="p-6 border rounded-lg space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Case Study {index + 1}</h3>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removeArrayItem(["caseStudies", "items"], index)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`case-title-${index}`}>Title</Label>
                  <Input
                    id={`case-title-${index}`}
                    value={study.title}
                    onChange={(e) => {
                      const newStudies = [...content.items]
                      newStudies[index].title = e.target.value
                      updateContent(["caseStudies", "items"], newStudies)
                    }}
                  />
                </div>
                <div>
                  <Label htmlFor={`case-client-${index}`}>Client</Label>
                  <Input
                    id={`case-client-${index}`}
                    value={study.client}
                    onChange={(e) => {
                      const newStudies = [...content.items]
                      newStudies[index].client = e.target.value
                      updateContent(["caseStudies", "items"], newStudies)
                    }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor={`case-industry-${index}`}>Industry</Label>
                  <Input
                    id={`case-industry-${index}`}
                    value={study.industry}
                    onChange={(e) => {
                      const newStudies = [...content.items]
                      newStudies[index].industry = e.target.value
                      updateContent(["caseStudies", "items"], newStudies)
                    }}
                  />
                </div>
                <div>
                  <Label htmlFor={`case-location-${index}`}>Location</Label>
                  <Input
                    id={`case-location-${index}`}
                    value={study.location}
                    onChange={(e) => {
                      const newStudies = [...content.items]
                      newStudies[index].location = e.target.value
                      updateContent(["caseStudies", "items"], newStudies)
                    }}
                  />
                </div>
                <div>
                  <Label htmlFor={`case-date-${index}`}>Date</Label>
                  <Input
                    id={`case-date-${index}`}
                    value={study.date}
                    onChange={(e) => {
                      const newStudies = [...content.items]
                      newStudies[index].date = e.target.value
                      updateContent(["caseStudies", "items"], newStudies)
                    }}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor={`case-challenge-${index}`}>Challenge</Label>
                <Textarea
                  id={`case-challenge-${index}`}
                  value={study.challenge}
                  onChange={(e) => {
                    const newStudies = [...content.items]
                    newStudies[index].challenge = e.target.value
                    updateContent(["caseStudies", "items"], newStudies)
                  }}
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor={`case-solution-${index}`}>Solution</Label>
                <Textarea
                  id={`case-solution-${index}`}
                  value={study.solution}
                  onChange={(e) => {
                    const newStudies = [...content.items]
                    newStudies[index].solution = e.target.value
                    updateContent(["caseStudies", "items"], newStudies)
                  }}
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor={`case-results-${index}`}>Results (one per line)</Label>
                <Textarea
                  id={`case-results-${index}`}
                  value={study.results.join("\n")}
                  onChange={(e) => {
                    const newStudies = [...content.items]
                    newStudies[index].results = e.target.value.split("\n").filter((r) => r.trim())
                    updateContent(["caseStudies", "items"], newStudies)
                  }}
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`case-image-${index}`}>Image Path</Label>
                  <Input
                    id={`case-image-${index}`}
                    value={study.image}
                    onChange={(e) => {
                      const newStudies = [...content.items]
                      newStudies[index].image = e.target.value
                      updateContent(["caseStudies", "items"], newStudies)
                    }}
                  />
                </div>
                <div>
                  <Label htmlFor={`case-tags-${index}`}>Tags (comma separated)</Label>
                  <Input
                    id={`case-tags-${index}`}
                    value={study.tags.join(", ")}
                    onChange={(e) => {
                      const newStudies = [...content.items]
                      newStudies[index].tags = e.target.value
                        .split(",")
                        .map((t) => t.trim())
                        .filter((t) => t)
                      updateContent(["caseStudies", "items"], newStudies)
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

// Blog Editor Component
function BlogEditor({ content, updateContent, addArrayItem, removeArrayItem }: any) {
  const addBlogPost = () => {
    const newPost = {
      id: Date.now(),
      title: "New Blog Post",
      excerpt: "Post excerpt",
      author: "Author Name",
      date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
      readTime: "5 min read",
      category: "General",
      image: "/images/blog-post.jpg",
      featured: false,
    }
    addArrayItem(["blog", "posts"], newPost)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Blog Page Header</CardTitle>
          <CardDescription>Edit the header section of your blog page</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="blog-title">Title</Label>
            <Input
              id="blog-title"
              value={content.hero.title}
              onChange={(e) => updateContent(["blog", "hero", "title"], e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="blog-description">Description</Label>
            <Textarea
              id="blog-description"
              value={content.hero.description}
              onChange={(e) => updateContent(["blog", "hero", "description"], e.target.value)}
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Blog Posts
            <Button onClick={addBlogPost} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Blog Post
            </Button>
          </CardTitle>
          <CardDescription>Manage your blog posts</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {content.posts.map((post: any, index: number) => (
            <div key={post.id} className="p-6 border rounded-lg space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Blog Post {index + 1}</h3>
                <div className="flex gap-2">
                  <Button
                    variant={post.featured ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      const newPosts = [...content.posts]
                      newPosts[index].featured = !newPosts[index].featured
                      updateContent(["blog", "posts"], newPosts)
                    }}
                  >
                    {post.featured ? "Featured" : "Make Featured"}
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => removeArrayItem(["blog", "posts"], index)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div>
                <Label htmlFor={`post-title-${index}`}>Title</Label>
                <Input
                  id={`post-title-${index}`}
                  value={post.title}
                  onChange={(e) => {
                    const newPosts = [...content.posts]
                    newPosts[index].title = e.target.value
                    updateContent(["blog", "posts"], newPosts)
                  }}
                />
              </div>

              <div>
                <Label htmlFor={`post-excerpt-${index}`}>Excerpt</Label>
                <Textarea
                  id={`post-excerpt-${index}`}
                  value={post.excerpt}
                  onChange={(e) => {
                    const newPosts = [...content.posts]
                    newPosts[index].excerpt = e.target.value
                    updateContent(["blog", "posts"], newPosts)
                  }}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor={`post-author-${index}`}>Author</Label>
                  <Input
                    id={`post-author-${index}`}
                    value={post.author}
                    onChange={(e) => {
                      const newPosts = [...content.posts]
                      newPosts[index].author = e.target.value
                      updateContent(["blog", "posts"], newPosts)
                    }}
                  />
                </div>
                <div>
                  <Label htmlFor={`post-date-${index}`}>Date</Label>
                  <Input
                    id={`post-date-${index}`}
                    value={post.date}
                    onChange={(e) => {
                      const newPosts = [...content.posts]
                      newPosts[index].date = e.target.value
                      updateContent(["blog", "posts"], newPosts)
                    }}
                  />
                </div>
                <div>
                  <Label htmlFor={`post-readtime-${index}`}>Read Time</Label>
                  <Input
                    id={`post-readtime-${index}`}
                    value={post.readTime}
                    onChange={(e) => {
                      const newPosts = [...content.posts]
                      newPosts[index].readTime = e.target.value
                      updateContent(["blog", "posts"], newPosts)
                    }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`post-category-${index}`}>Category</Label>
                  <Input
                    id={`post-category-${index}`}
                    value={post.category}
                    onChange={(e) => {
                      const newPosts = [...content.posts]
                      newPosts[index].category = e.target.value
                      updateContent(["blog", "posts"], newPosts)
                    }}
                  />
                </div>
                <div>
                  <Label htmlFor={`post-image-${index}`}>Image Path</Label>
                  <Input
                    id={`post-image-${index}`}
                    value={post.image}
                    onChange={(e) => {
                      const newPosts = [...content.posts]
                      newPosts[index].image = e.target.value
                      updateContent(["blog", "posts"], newPosts)
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

// Contact Editor Component
function ContactEditor({ content, updateContent }: any) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Contact Page Header</CardTitle>
          <CardDescription>Edit the header section of your contact page</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="contact-title">Title</Label>
            <Input
              id="contact-title"
              value={content.hero.title}
              onChange={(e) => updateContent(["contact", "hero", "title"], e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="contact-description">Description</Label>
            <Textarea
              id="contact-description"
              value={content.hero.description}
              onChange={(e) => updateContent(["contact", "hero", "description"], e.target.value)}
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Contact Form</CardTitle>
          <CardDescription>Edit the contact form labels and text</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="form-title">Form Title</Label>
            <Input
              id="form-title"
              value={content.form.title}
              onChange={(e) => updateContent(["contact", "form", "title"], e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="form-submit-btn">Submit Button Text</Label>
              <Input
                id="form-submit-btn"
                value={content.form.submitButton}
                onChange={(e) => updateContent(["contact", "form", "submitButton"], e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="form-submitting-text">Submitting Text</Label>
              <Input
                id="form-submitting-text"
                value={content.form.submittingText}
                onChange={(e) => updateContent(["contact", "form", "submittingText"], e.target.value)}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="form-success-title">Success Title</Label>
            <Input
              id="form-success-title"
              value={content.form.successTitle}
              onChange={(e) => updateContent(["contact", "form", "successTitle"], e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="form-success-message">Success Message</Label>
            <Textarea
              id="form-success-message"
              value={content.form.successMessage}
              onChange={(e) => updateContent(["contact", "form", "successMessage"], e.target.value)}
              rows={2}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
