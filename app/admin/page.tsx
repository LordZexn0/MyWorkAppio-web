"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Save, Eye, Plus, Trash2, Upload, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import type { CMSContent } from "@/lib/cms"

export default function AdminPanel() {
  const [content, setContent] = useState<CMSContent | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploadingImages, setUploadingImages] = useState<Record<string, boolean>>({})
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
        title: "✅ Success",
        description: "Content saved successfully! Changes are now live on your website.",
        duration: 5000,
      })
    } catch (error) {
      toast({
        title: "❌ Error",
        description: "Failed to save content. Please try again.",
        variant: "destructive",
        duration: 5000,
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

  const handleImageUpload = async (file: File, fieldId: string) => {
    setUploadingImages((prev) => ({ ...prev, [fieldId]: true }))

    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) throw new Error("Upload failed")

      const { url } = await response.json()

      toast({
        title: "✅ Upload Success",
        description: "Image uploaded successfully!",
        duration: 3000,
      })

      return url
    } catch (error) {
      toast({
        title: "❌ Upload Error",
        description: "Failed to upload image. Please try again.",
        variant: "destructive",
        duration: 3000,
      })
      return null
    } finally {
      setUploadingImages((prev) => ({ ...prev, [fieldId]: false }))
    }
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
      {/* Toast notifications with proper styling */}
      <Toaster />

      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-50">
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

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Tabs defaultValue="site" className="space-y-6">
          {/* Improved Tab Design */}
          <div className="bg-white rounded-lg shadow-sm border p-1">
            <TabsList className="grid w-full grid-cols-7 bg-gray-50 rounded-md p-1 h-auto">
              <TabsTrigger
                value="site"
                className="data-[state=active]:bg-white data-[state=active]:text-[#FF6B35] data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-[#FF6B35]/20 text-gray-600 hover:text-gray-900 py-3 px-4 rounded-md transition-all duration-200 font-medium"
              >
                🏢 Site Info
              </TabsTrigger>
              <TabsTrigger
                value="home"
                className="data-[state=active]:bg-white data-[state=active]:text-[#FF6B35] data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-[#FF6B35]/20 text-gray-600 hover:text-gray-900 py-3 px-4 rounded-md transition-all duration-200 font-medium"
              >
                🏠 Home
              </TabsTrigger>
              <TabsTrigger
                value="services"
                className="data-[state=active]:bg-white data-[state=active]:text-[#FF6B35] data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-[#FF6B35]/20 text-gray-600 hover:text-gray-900 py-3 px-4 rounded-md transition-all duration-200 font-medium"
              >
                ⚙️ Services
              </TabsTrigger>
              <TabsTrigger
                value="why-us"
                className="data-[state=active]:bg-white data-[state=active]:text-[#FF6B35] data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-[#FF6B35]/20 text-gray-600 hover:text-gray-900 py-3 px-4 rounded-md transition-all duration-200 font-medium"
              >
                ⭐ Why Us
              </TabsTrigger>
              <TabsTrigger
                value="case-studies"
                className="data-[state=active]:bg-white data-[state=active]:text-[#FF6B35] data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-[#FF6B35]/20 text-gray-600 hover:text-gray-900 py-3 px-4 rounded-md transition-all duration-200 font-medium"
              >
                📊 Case Studies
              </TabsTrigger>
              <TabsTrigger
                value="blog"
                className="data-[state=active]:bg-white data-[state=active]:text-[#FF6B35] data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-[#FF6B35]/20 text-gray-600 hover:text-gray-900 py-3 px-4 rounded-md transition-all duration-200 font-medium"
              >
                📝 Blog
              </TabsTrigger>
              <TabsTrigger
                value="contact"
                className="data-[state=active]:bg-white data-[state=active]:text-[#FF6B35] data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-[#FF6B35]/20 text-gray-600 hover:text-gray-900 py-3 px-4 rounded-md transition-all duration-200 font-medium"
              >
                📞 Contact
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Site Information */}
          <TabsContent value="site">
            <SiteInfoEditor
              content={content.site}
              updateContent={updateContent}
              handleImageUpload={handleImageUpload}
              uploadingImages={uploadingImages}
            />
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
              handleImageUpload={handleImageUpload}
              uploadingImages={uploadingImages}
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
              handleImageUpload={handleImageUpload}
              uploadingImages={uploadingImages}
            />
          </TabsContent>

          {/* Blog */}
          <TabsContent value="blog">
            <BlogEditor
              content={content.blog}
              updateContent={updateContent}
              addArrayItem={addArrayItem}
              removeArrayItem={removeArrayItem}
              handleImageUpload={handleImageUpload}
              uploadingImages={uploadingImages}
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

// Image Upload Component
function ImageUpload({
  value,
  onChange,
  fieldId,
  handleImageUpload,
  uploadingImages,
}: {
  value: string
  onChange: (value: string) => void
  fieldId: string
  handleImageUpload: (file: File, fieldId: string) => Promise<string | null>
  uploadingImages: Record<string, boolean>
}) {
  const [dragOver, setDragOver] = useState(false)

  const handleFileSelect = async (file: File) => {
    const url = await handleImageUpload(file, fieldId)
    if (url) {
      onChange(url)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith("image/")) {
      handleFileSelect(file)
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="/images/example.jpg"
          className="flex-1"
        />
        <Button type="button" variant="outline" disabled={uploadingImages[fieldId]} className="relative">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileInput}
            className="absolute inset-0 opacity-0 cursor-pointer"
            disabled={uploadingImages[fieldId]}
          />
          {uploadingImages[fieldId] ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
          ) : (
            <Upload className="w-4 h-4" />
          )}
        </Button>
      </div>

      <div
        className={`border-2 border-dashed rounded-lg p-4 text-center transition-colors ${
          dragOver ? "border-[#FF6B35] bg-[#FF6B35]/5" : "border-gray-300"
        }`}
        onDragOver={(e) => {
          e.preventDefault()
          setDragOver(true)
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
      >
        <p className="text-sm text-gray-600">Drag and drop an image here, or click the upload button above</p>
      </div>

      {value && (
        <div className="relative inline-block">
          <img src={value || "/placeholder.svg"} alt="Preview" className="max-w-32 max-h-32 object-cover rounded" />
          <Button
            type="button"
            variant="destructive"
            size="sm"
            className="absolute -top-2 -right-2 w-6 h-6 p-0"
            onClick={() => onChange("")}
          >
            <X className="w-3 h-3" />
          </Button>
        </div>
      )}
    </div>
  )
}

// Site Info Editor Component
function SiteInfoEditor({ content, updateContent, handleImageUpload, uploadingImages }: any) {
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
            <Label htmlFor="site-logo">Logo</Label>
            <ImageUpload
              value={content.logo}
              onChange={(value) => updateContent(["site", "logo"], value)}
              fieldId="site-logo"
              handleImageUpload={handleImageUpload}
              uploadingImages={uploadingImages}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
          <CardDescription>Update your contact details (syncs to footer and contact page)</CardDescription>
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

// Home Editor Component (unchanged)
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
          <div>
            <Label htmlFor="hero-primary-btn">Primary Button Text</Label>
            <Input
              id="hero-primary-btn"
              value={content.hero.primaryButton}
              onChange={(e) => updateContent(["home", "hero", "primaryButton"], e.target.value)}
            />
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

// Services Editor Component with Image Upload
function ServicesEditor({
  content,
  updateContent,
  addArrayItem,
  removeArrayItem,
  handleImageUpload,
  uploadingImages,
}: any) {
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
                <Label htmlFor={`service-image-${index}`}>Service Image</Label>
                <ImageUpload
                  value={service.image}
                  onChange={(value) => {
                    const newServices = [...content.items]
                    newServices[index].image = value
                    updateContent(["services", "items"], newServices)
                  }}
                  fieldId={`service-image-${index}`}
                  handleImageUpload={handleImageUpload}
                  uploadingImages={uploadingImages}
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

// Why Us Editor Component (unchanged)
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

// Case Studies Editor Component with Image Upload
function CaseStudiesEditor({
  content,
  updateContent,
  addArrayItem,
  removeArrayItem,
  handleImageUpload,
  uploadingImages,
}: any) {
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

              <div>
                <Label htmlFor={`case-image-${index}`}>Case Study Image</Label>
                <ImageUpload
                  value={study.image}
                  onChange={(value) => {
                    const newStudies = [...content.items]
                    newStudies[index].image = value
                    updateContent(["caseStudies", "items"], newStudies)
                  }}
                  fieldId={`case-image-${index}`}
                  handleImageUpload={handleImageUpload}
                  uploadingImages={uploadingImages}
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
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

// Blog Editor Component with Image Upload
function BlogEditor({
  content,
  updateContent,
  addArrayItem,
  removeArrayItem,
  handleImageUpload,
  uploadingImages,
}: any) {
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
                  <Label htmlFor={`post-image-${index}`}>Blog Post Image</Label>
                  <ImageUpload
                    value={post.image}
                    onChange={(value) => {
                      const newPosts = [...content.posts]
                      newPosts[index].image = value
                      updateContent(["blog", "posts"], newPosts)
                    }}
                    fieldId={`post-image-${index}`}
                    handleImageUpload={handleImageUpload}
                    uploadingImages={uploadingImages}
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

// Contact Editor Component (unchanged)
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
