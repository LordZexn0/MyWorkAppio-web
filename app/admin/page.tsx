"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { Upload, Save, FileText, Info, ImageIcon, Users } from "lucide-react"

interface CMSData {
  hero: {
    title: string
    subtitle: string
    ctaText: string
  }
  about: {
    title: string
    description: string
    features: string[]
  }
  services: {
    title: string
    items: Array<{
      title: string
      description: string
      image: string
    }>
  }
  site: {
    name: string
    description: string
    contact: {
      email: string
      phone: string
      address: string
    }
  }
  blog: {
    posts: Array<{
      id: string
      title: string
      excerpt: string
      content: string
      image: string
      date: string
    }>
  }
}

export default function AdminPage() {
  const [data, setData] = useState<CMSData | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await fetch("/api/cms")
      const result = await response.json()
      setData(result)
    } catch (error) {
      console.error("Error fetching data:", error)
      toast({
        title: "❌ Error",
        description: "Failed to load CMS data",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    if (!data) return

    setSaving(true)
    try {
      const response = await fetch("/api/cms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        toast({
          title: "✅ Success!",
          description: "Website content has been updated successfully",
          duration: 5000,
        })
      } else {
        throw new Error("Failed to save")
      }
    } catch (error) {
      console.error("Error saving data:", error)
      toast({
        title: "❌ Error",
        description: "Failed to save changes. Please try again.",
        variant: "destructive",
        duration: 5000,
      })
    } finally {
      setSaving(false)
    }
  }

  const handleImageUpload = async (file: File, section: string, index?: number) => {
    setUploadingImage(true)
    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (response.ok) {
        const result = await response.json()
        const imageUrl = result.url

        if (!data) return

        const newData = { ...data }

        if (section === "services" && typeof index === "number") {
          newData.services.items[index].image = imageUrl
        } else if (section === "blog" && typeof index === "number") {
          newData.blog.posts[index].image = imageUrl
        }

        setData(newData)

        toast({
          title: "📸 Image Uploaded!",
          description: "Image has been uploaded successfully",
          duration: 3000,
        })
      } else {
        throw new Error("Upload failed")
      }
    } catch (error) {
      console.error("Error uploading image:", error)
      toast({
        title: "❌ Upload Error",
        description: "Failed to upload image. Please try again.",
        variant: "destructive",
      })
    } finally {
      setUploadingImage(false)
    }
  }

  const updateData = (path: string[], value: any) => {
    if (!data) return

    const newData = { ...data }
    let current: any = newData

    for (let i = 0; i < path.length - 1; i++) {
      current = current[path[i]]
    }

    current[path[path.length - 1]] = value
    setData(newData)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading CMS...</p>
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">Failed to load CMS data</p>
          <Button onClick={fetchData} className="mt-4">
            Retry
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">CMS Dashboard</h1>
          <Button
            onClick={handleSave}
            disabled={saving}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
          >
            <Save className="w-4 h-4 mr-2" />
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="hero" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-white rounded-xl shadow-sm border p-1">
            <TabsTrigger
              value="hero"
              className="flex items-center gap-2 px-4 py-3 rounded-lg transition-all duration-200 data-[state=active]:bg-orange-500 data-[state=active]:text-white data-[state=active]:shadow-md hover:bg-gray-50"
            >
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">🏠 Hero</span>
              <span className="sm:hidden">🏠</span>
            </TabsTrigger>
            <TabsTrigger
              value="about"
              className="flex items-center gap-2 px-4 py-3 rounded-lg transition-all duration-200 data-[state=active]:bg-orange-500 data-[state=active]:text-white data-[state=active]:shadow-md hover:bg-gray-50"
            >
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">📋 About</span>
              <span className="sm:hidden">📋</span>
            </TabsTrigger>
            <TabsTrigger
              value="services"
              className="flex items-center gap-2 px-4 py-3 rounded-lg transition-all duration-200 data-[state=active]:bg-orange-500 data-[state=active]:text-white data-[state=active]:shadow-md hover:bg-gray-50"
            >
              <ImageIcon className="w-4 h-4" />
              <span className="hidden sm:inline">⚙️ Services</span>
              <span className="sm:hidden">⚙️</span>
            </TabsTrigger>
            <TabsTrigger
              value="site"
              className="flex items-center gap-2 px-4 py-3 rounded-lg transition-all duration-200 data-[state=active]:bg-orange-500 data-[state=active]:text-white data-[state=active]:shadow-md hover:bg-gray-50"
            >
              <Info className="w-4 h-4" />
              <span className="hidden sm:inline">🌐 Site Info</span>
              <span className="sm:hidden">🌐</span>
            </TabsTrigger>
            <TabsTrigger
              value="blog"
              className="flex items-center gap-2 px-4 py-3 rounded-lg transition-all duration-200 data-[state=active]:bg-orange-500 data-[state=active]:text-white data-[state=active]:shadow-md hover:bg-gray-50"
            >
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">📝 Blog</span>
              <span className="sm:hidden">📝</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="hero">
            <Card>
              <CardHeader>
                <CardTitle>🏠 Hero Section</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="hero-title">Title</Label>
                  <Input
                    id="hero-title"
                    value={data.hero.title}
                    onChange={(e) => updateData(["hero", "title"], e.target.value)}
                    placeholder="Main hero title"
                  />
                </div>
                <div>
                  <Label htmlFor="hero-subtitle">Subtitle</Label>
                  <Textarea
                    id="hero-subtitle"
                    value={data.hero.subtitle}
                    onChange={(e) => updateData(["hero", "subtitle"], e.target.value)}
                    placeholder="Hero subtitle/description"
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="hero-cta">Call to Action Text</Label>
                  <Input
                    id="hero-cta"
                    value={data.hero.ctaText}
                    onChange={(e) => updateData(["hero", "ctaText"], e.target.value)}
                    placeholder="Button text"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="about">
            <Card>
              <CardHeader>
                <CardTitle>📋 About Section</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="about-title">Title</Label>
                  <Input
                    id="about-title"
                    value={data.about.title}
                    onChange={(e) => updateData(["about", "title"], e.target.value)}
                    placeholder="About section title"
                  />
                </div>
                <div>
                  <Label htmlFor="about-description">Description</Label>
                  <Textarea
                    id="about-description"
                    value={data.about.description}
                    onChange={(e) => updateData(["about", "description"], e.target.value)}
                    placeholder="About description"
                    rows={4}
                  />
                </div>
                <div>
                  <Label>Features (one per line)</Label>
                  <Textarea
                    value={data.about.features.join("\n")}
                    onChange={(e) =>
                      updateData(
                        ["about", "features"],
                        e.target.value.split("\n").filter((f) => f.trim()),
                      )
                    }
                    placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
                    rows={5}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="services">
            <Card>
              <CardHeader>
                <CardTitle>⚙️ Services Section</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="services-title">Section Title</Label>
                  <Input
                    id="services-title"
                    value={data.services.title}
                    onChange={(e) => updateData(["services", "title"], e.target.value)}
                    placeholder="Services section title"
                  />
                </div>

                <div className="space-y-6">
                  {data.services.items.map((service, index) => (
                    <Card key={index} className="border-l-4 border-l-blue-500">
                      <CardHeader>
                        <CardTitle className="text-lg">Service {index + 1}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <Label>Title</Label>
                          <Input
                            value={service.title}
                            onChange={(e) => {
                              const newItems = [...data.services.items]
                              newItems[index].title = e.target.value
                              updateData(["services", "items"], newItems)
                            }}
                            placeholder="Service title"
                          />
                        </div>
                        <div>
                          <Label>Description</Label>
                          <Textarea
                            value={service.description}
                            onChange={(e) => {
                              const newItems = [...data.services.items]
                              newItems[index].description = e.target.value
                              updateData(["services", "items"], newItems)
                            }}
                            placeholder="Service description"
                            rows={3}
                          />
                        </div>
                        <div>
                          <Label>Image</Label>
                          <div className="flex items-center gap-4">
                            <Input
                              value={service.image}
                              onChange={(e) => {
                                const newItems = [...data.services.items]
                                newItems[index].image = e.target.value
                                updateData(["services", "items"], newItems)
                              }}
                              placeholder="Image URL or path"
                            />
                            <div className="relative">
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                  const file = e.target.files?.[0]
                                  if (file) {
                                    handleImageUpload(file, "services", index)
                                  }
                                }}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                disabled={uploadingImage}
                              />
                              <Button
                                type="button"
                                variant="outline"
                                disabled={uploadingImage}
                                className="flex items-center gap-2"
                              >
                                <Upload className="w-4 h-4" />
                                {uploadingImage ? "Uploading..." : "Upload"}
                              </Button>
                            </div>
                          </div>
                          {service.image && (
                            <div className="mt-2">
                              <img
                                src={service.image || "/placeholder.svg"}
                                alt="Preview"
                                className="w-32 h-20 object-cover rounded border"
                              />
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="site">
            <Card>
              <CardHeader>
                <CardTitle>🌐 Site Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="site-name">Site Name</Label>
                  <Input
                    id="site-name"
                    value={data.site.name}
                    onChange={(e) => updateData(["site", "name"], e.target.value)}
                    placeholder="Website name"
                  />
                </div>
                <div>
                  <Label htmlFor="site-description">Site Description</Label>
                  <Textarea
                    id="site-description"
                    value={data.site.description}
                    onChange={(e) => updateData(["site", "description"], e.target.value)}
                    placeholder="Website description"
                    rows={3}
                  />
                </div>

                <div className="space-y-4 pt-4 border-t">
                  <h3 className="text-lg font-semibold">📞 Contact Information</h3>
                  <div>
                    <Label htmlFor="contact-email">Email</Label>
                    <Input
                      id="contact-email"
                      type="email"
                      value={data.site.contact.email}
                      onChange={(e) => updateData(["site", "contact", "email"], e.target.value)}
                      placeholder="contact@example.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="contact-phone">Phone</Label>
                    <Input
                      id="contact-phone"
                      value={data.site.contact.phone}
                      onChange={(e) => updateData(["site", "contact", "phone"], e.target.value)}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div>
                    <Label htmlFor="contact-address">Address</Label>
                    <Textarea
                      id="contact-address"
                      value={data.site.contact.address}
                      onChange={(e) => updateData(["site", "contact", "address"], e.target.value)}
                      placeholder="123 Main St, City, State 12345"
                      rows={2}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="blog">
            <Card>
              <CardHeader>
                <CardTitle>📝 Blog Posts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {data.blog.posts.map((post, index) => (
                  <Card key={post.id} className="border-l-4 border-l-green-500">
                    <CardHeader>
                      <CardTitle className="text-lg">Post {index + 1}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label>Title</Label>
                        <Input
                          value={post.title}
                          onChange={(e) => {
                            const newPosts = [...data.blog.posts]
                            newPosts[index].title = e.target.value
                            updateData(["blog", "posts"], newPosts)
                          }}
                          placeholder="Blog post title"
                        />
                      </div>
                      <div>
                        <Label>Excerpt</Label>
                        <Textarea
                          value={post.excerpt}
                          onChange={(e) => {
                            const newPosts = [...data.blog.posts]
                            newPosts[index].excerpt = e.target.value
                            updateData(["blog", "posts"], newPosts)
                          }}
                          placeholder="Short description"
                          rows={2}
                        />
                      </div>
                      <div>
                        <Label>Content</Label>
                        <Textarea
                          value={post.content}
                          onChange={(e) => {
                            const newPosts = [...data.blog.posts]
                            newPosts[index].content = e.target.value
                            updateData(["blog", "posts"], newPosts)
                          }}
                          placeholder="Full blog post content"
                          rows={6}
                        />
                      </div>
                      <div>
                        <Label>Image</Label>
                        <div className="flex items-center gap-4">
                          <Input
                            value={post.image}
                            onChange={(e) => {
                              const newPosts = [...data.blog.posts]
                              newPosts[index].image = e.target.value
                              updateData(["blog", "posts"], newPosts)
                            }}
                            placeholder="Image URL or path"
                          />
                          <div className="relative">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0]
                                if (file) {
                                  handleImageUpload(file, "blog", index)
                                }
                              }}
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                              disabled={uploadingImage}
                            />
                            <Button
                              type="button"
                              variant="outline"
                              disabled={uploadingImage}
                              className="flex items-center gap-2"
                            >
                              <Upload className="w-4 h-4" />
                              {uploadingImage ? "Uploading..." : "Upload"}
                            </Button>
                          </div>
                        </div>
                        {post.image && (
                          <div className="mt-2">
                            <img
                              src={post.image || "/placeholder.svg"}
                              alt="Preview"
                              className="w-32 h-20 object-cover rounded border"
                            />
                          </div>
                        )}
                      </div>
                      <div>
                        <Label>Date</Label>
                        <Input
                          type="date"
                          value={post.date}
                          onChange={(e) => {
                            const newPosts = [...data.blog.posts]
                            newPosts[index].date = e.target.value
                            updateData(["blog", "posts"], newPosts)
                          }}
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Toaster />
    </div>
  )
}
