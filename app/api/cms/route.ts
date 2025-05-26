import { NextResponse } from "next/server"

// Default CMS content - this will be used if the file doesn't exist
const defaultContent = {
  site: {
    name: "MyWorkApp.io",
    tagline: "Modern Solutions For Tomorrow's Challenges",
    description:
      "End-to-end turnkey solutions for logistics, warehouse management, IoT tracking, and custom workflows.",
    logo: "/images/logo-transparent.png",
    contact: {
      phone: "+1 (555) 123-4567",
      email: "hello@myworkapp.io",
      address: "123 Business District\nTech City, TC 12345",
      businessHours: "Mon - Fri: 9:00 AM - 6:00 PM\nSat - Sun: Closed",
    },
  },
  navigation: {
    items: [
      { href: "/", label: "Home" },
      { href: "/services", label: "Services" },
      { href: "/why-us", label: "Why Us" },
      { href: "/case-studies", label: "Case Studies" },
      { href: "/blog", label: "Blog" },
      { href: "/contact", label: "Contact" },
    ],
    ctaButton: "Get Started",
  },
  home: {
    hero: {
      title: "MyWorkApp.io",
      subtitle: "Modern Solutions For Tomorrow's Challenges",
      description:
        "Transform your operations with our turnkey solutions for logistics, warehouse management, IoT tracking, and custom digital workflows.",
      primaryButton: "Explore Our Services",
      secondaryButton: "View Case Studies",
    },
    stats: [
      { number: "500+", label: "Projects Completed" },
      { number: "99%", label: "Client Satisfaction" },
      { number: "24/7", label: "Support Available" },
    ],
    overview: {
      title: "Turnkey Solutions That Work",
      description: "We deliver complete, ready-to-use systems that transform your operations from day one.",
      services: [
        "Logistics & Supply Chain",
        "Digital Warehouse Management",
        "IoT Sensors & Tracking",
        "Custom Digital Workflows",
      ],
      buttonText: "Learn More About Our Services",
    },
    cta: {
      title: "Ready to Transform Your Operations?",
      description:
        "Get started with a free consultation and see how our turnkey solutions can streamline your business.",
      primaryButton: "Get Free Consultation",
      secondaryButton: "Why Choose Us",
    },
  },
  services: {
    hero: {
      title: "Our Services",
      description: "Comprehensive turnkey solutions designed to transform your operations from day one.",
    },
    items: [
      {
        id: 1,
        title: "Logistics and Supply Chain Management",
        subtitle: "End-to-End Visibility with a Turnkey Logistics Platform",
        description:
          "Our logistics management system is a turnkey solution designed to help businesses streamline supply chain operations without the need for complex setup or custom development. From generating and approving orders to tracking asset movement in real time, everything is built in and ready to go.",
        features: [
          "Ready-to-use tools for inbound and outbound order management",
          "Automated approval workflows",
          "Real-time tracking of inventory across the supply chain",
          "Auditable logs for compliance and transparency",
          "Immediate time and cost savings with minimal onboarding",
        ],
        benefits: ["Reduce operational costs by 30%", "Improve delivery times by 50%", "99.9% inventory accuracy"],
        image: "/images/logistics.png",
      },
      {
        id: 2,
        title: "Digital Warehouse Management",
        subtitle: "Turnkey Warehouse Management, Built for Speed and Simplicity",
        description:
          "Our warehouse solution offers a comprehensive turnkey system for managing day-to-day operations—shipping, receiving, inspections, and inventory monitoring—through one unified interface. No separate modules, no integration delays—just a fast, reliable system that works from day one.",
        features: [
          "Mobile-enabled shipping and receiving",
          "Real-time inventory location and condition updates",
          "Built-in inspection workflows for asset quality",
          "Automated reporting with zero configuration",
          "Simplified asset decommissioning",
        ],
        benefits: ["Increase warehouse efficiency by 40%", "Reduce picking errors by 95%", "Real-time visibility"],
        image: "/images/digitalwarehouse.png",
      },
      {
        id: 3,
        title: "IoT Sensors and Tracking",
        subtitle: "Seamless IoT Integration Through a Turnkey Tracking Platform",
        description:
          "We deliver a turnkey tracking system that incorporates RFID, barcodes, and IoT sensors for real-time asset monitoring. There's no need to piece together hardware and software—our platform comes ready to integrate with your equipment and start tracking immediately.",
        features: [
          "Plug-and-play RFID and barcode support",
          "Environmental monitoring via connected sensors",
          "Chain-of-custody tracking with full audit trails",
          "Real-time condition and location updates",
          "Scalable architecture for growing asset networks",
        ],
        benefits: ["Track 10,000+ assets simultaneously", "Prevent loss and theft", "Automated compliance reporting"],
        image: "/images/iotsensors.png",
      },
      {
        id: 4,
        title: "Custom Digital Workflow Development",
        subtitle: "Custom Workflows, Delivered as Turnkey Solutions",
        description:
          "We develop and deliver turnkey digital workflows tailored to your business processes. Whether you need a specialized inspection flow, multi-level approvals, or third-party system integration, we handle the entire build—so you can go live faster with a solution that's fully functional from day one.",
        features: [
          "Custom-configured workflows for your specific needs",
          "Fully integrated modules with no extra development required",
          "Mobile-ready forms and approval chains",
          "Smooth integration with financial and logistics platforms",
          "Easy deployment and internal adoption",
        ],
        benefits: ["Reduce manual processes by 80%", "Faster approvals and decisions", "Seamless integrations"],
        image: "/images/customdigital.png",
      },
    ],
    cta: {
      title: "Ready to Get Started?",
      description: "Contact us today to discuss which solution is right for your business.",
      primaryButton: "Contact Us Today",
      secondaryButton: "View Case Studies",
    },
  },
  whyUs: {
    hero: {
      title: "Why Choose MyWorkApp.io?",
      description:
        "We don't just build software – we deliver complete solutions that transform your business operations from day one.",
    },
    stats: [
      { number: "500+", label: "Successful Projects", color: "text-[#FF6B35]" },
      { number: "99%", label: "Client Satisfaction", color: "text-[#FFCF40]" },
      { number: "50%", label: "Average Efficiency Gain", color: "text-[#0F4C81]" },
      { number: "24/7", label: "Support Available", color: "text-[#FF6B35]" },
    ],
    reasons: {
      title: "What Sets Us Apart",
      description:
        "We combine deep industry expertise with cutting-edge technology to deliver solutions that actually work.",
      items: [
        {
          icon: "Zap",
          title: "Turnkey Solutions",
          description:
            "Complete, ready-to-use systems that work from day one. No complex setup or lengthy development cycles.",
        },
        {
          icon: "Clock",
          title: "Rapid Deployment",
          description:
            "Get up and running in weeks, not months. Our solutions are designed for quick implementation and immediate results.",
        },
        {
          icon: "Shield",
          title: "Proven Reliability",
          description: "Battle-tested systems with 99.9% uptime. Your operations stay running smoothly, 24/7.",
        },
        {
          icon: "Users",
          title: "Expert Support",
          description:
            "Dedicated support team with deep industry knowledge. We're here to help you succeed every step of the way.",
        },
        {
          icon: "Award",
          title: "Industry Leading",
          description:
            "Cutting-edge technology and best practices from years of experience across multiple industries.",
        },
        {
          icon: "CheckCircle",
          title: "Guaranteed Results",
          description: "We stand behind our solutions with measurable outcomes and performance guarantees.",
        },
      ],
    },
    process: {
      title: "Our Proven Process",
      description: "From consultation to deployment, we ensure your success every step of the way.",
      steps: [
        {
          step: "01",
          title: "Consultation",
          description: "We analyze your needs and design the perfect solution",
        },
        {
          step: "02",
          title: "Configuration",
          description: "We customize our turnkey platform to your requirements",
        },
        {
          step: "03",
          title: "Deployment",
          description: "Quick implementation with minimal disruption to operations",
        },
        {
          step: "04",
          title: "Support",
          description: "Ongoing support and optimization to ensure continued success",
        },
      ],
    },
    cta: {
      title: "Ready to Experience the Difference?",
      description: "Join hundreds of companies that have transformed their operations with our turnkey solutions.",
      primaryButton: "Get Free Consultation",
      secondaryButton: "View Success Stories",
    },
  },
  caseStudies: {
    hero: {
      title: "Success Stories",
      description: "See how our turnkey solutions have transformed operations for companies across industries.",
    },
    items: [
      {
        id: 1,
        title: "Global Manufacturing Company Reduces Costs by 40%",
        client: "Fortune 500 Manufacturing Corp",
        industry: "Manufacturing",
        location: "United States",
        date: "2024",
        challenge:
          "Complex supply chain with multiple vendors, lack of real-time visibility, and high operational costs due to manual processes.",
        solution:
          "Implemented our comprehensive logistics and warehouse management platform with IoT tracking across 15 facilities.",
        results: [
          "40% reduction in operational costs",
          "60% improvement in delivery times",
          "99.8% inventory accuracy",
          "Real-time visibility across entire supply chain",
        ],
        image: "/images/case-study-1.jpg",
        tags: ["Logistics", "IoT", "Warehouse Management"],
      },
      {
        id: 2,
        title: "E-commerce Giant Scales Operations 300%",
        client: "Leading E-commerce Platform",
        industry: "E-commerce",
        location: "Europe",
        date: "2023",
        challenge:
          "Rapid growth overwhelming existing warehouse systems, frequent stockouts, and customer complaints about delivery delays.",
        solution:
          "Deployed our digital warehouse management system with automated workflows and real-time inventory tracking.",
        results: [
          "300% increase in order processing capacity",
          "95% reduction in picking errors",
          "50% faster order fulfillment",
          "Customer satisfaction increased to 98%",
        ],
        image: "/images/case-study-2.jpg",
        tags: ["Warehouse Management", "Automation", "Scalability"],
      },
      {
        id: 3,
        title: "Healthcare Network Achieves 100% Asset Tracking",
        client: "Regional Healthcare Network",
        industry: "Healthcare",
        location: "Canada",
        date: "2024",
        challenge:
          "Critical medical equipment frequently misplaced, compliance issues, and high replacement costs due to lost assets.",
        solution:
          "Implemented IoT-based asset tracking system with RFID tags and environmental monitoring across 12 hospitals.",
        results: [
          "100% asset visibility and tracking",
          "80% reduction in equipment replacement costs",
          "Full regulatory compliance achieved",
          "30% improvement in equipment utilization",
        ],
        image: "/images/case-study-3.jpg",
        tags: ["IoT", "Healthcare", "Asset Tracking"],
      },
      {
        id: 4,
        title: "Logistics Company Automates 90% of Workflows",
        client: "International Logistics Provider",
        industry: "Logistics",
        location: "Asia Pacific",
        date: "2023",
        challenge:
          "Manual approval processes causing delays, lack of integration between systems, and difficulty scaling operations.",
        solution:
          "Developed custom digital workflows with automated approvals and seamless integration with existing ERP systems.",
        results: [
          "90% of workflows fully automated",
          "70% reduction in processing time",
          "Seamless integration with 5 different systems",
          "Ability to scale operations without adding staff",
        ],
        image: "/images/case-study-4.jpg",
        tags: ["Custom Workflows", "Automation", "Integration"],
      },
    ],
    stats: {
      title: "Proven Results Across Industries",
      items: [
        { number: "500+", label: "Projects Completed", color: "text-[#FF6B35]" },
        { number: "40%", label: "Average Cost Reduction", color: "text-[#FFCF40]" },
        { number: "99%", label: "Client Satisfaction", color: "text-[#0F4C81]" },
        { number: "50%", label: "Efficiency Improvement", color: "text-[#FF6B35]" },
      ],
    },
    cta: {
      title: "Ready to Write Your Success Story?",
      description: "Join these industry leaders and transform your operations with our proven turnkey solutions.",
      primaryButton: "Start Your Transformation",
      secondaryButton: "Explore Our Solutions",
    },
  },
  blog: {
    hero: {
      title: "Industry Insights",
      description:
        "Stay ahead with the latest trends, best practices, and insights in logistics, warehouse management, and digital transformation.",
    },
    categories: [
      "All",
      "Supply Chain",
      "IoT Technology",
      "Digital Transformation",
      "Automation",
      "Implementation",
      "ROI Analysis",
    ],
    posts: [
      {
        id: 1,
        title: "The Future of Supply Chain Management: 5 Trends to Watch in 2024",
        excerpt:
          "Discover the emerging technologies and strategies that are reshaping supply chain operations and how your business can stay ahead of the curve.",
        author: "Sarah Johnson",
        date: "March 15, 2024",
        readTime: "8 min read",
        category: "Supply Chain",
        image: "/images/blog-1.jpg",
        featured: true,
      },
      {
        id: 2,
        title: "How IoT Sensors Are Revolutionizing Warehouse Operations",
        excerpt:
          "Learn how Internet of Things technology is providing unprecedented visibility and control over warehouse processes.",
        author: "Michael Chen",
        date: "March 10, 2024",
        readTime: "6 min read",
        category: "IoT Technology",
        image: "/images/blog-2.jpg",
        featured: false,
      },
      {
        id: 3,
        title: "Digital Transformation in Logistics: A Complete Guide",
        excerpt:
          "A comprehensive look at how digital technologies are transforming logistics operations and what it means for your business.",
        author: "Emily Rodriguez",
        date: "March 5, 2024",
        readTime: "12 min read",
        category: "Digital Transformation",
        image: "/images/blog-3.jpg",
        featured: false,
      },
      {
        id: 4,
        title: "Reducing Operational Costs Through Automation",
        excerpt:
          "Practical strategies for implementing automation in your operations to reduce costs and improve efficiency.",
        author: "David Kim",
        date: "February 28, 2024",
        readTime: "7 min read",
        category: "Automation",
        image: "/images/blog-4.jpg",
        featured: false,
      },
      {
        id: 5,
        title: "Best Practices for Implementing Turnkey Solutions",
        excerpt: "Essential tips and strategies for successfully implementing turnkey solutions in your organization.",
        author: "Lisa Thompson",
        date: "February 22, 2024",
        readTime: "9 min read",
        category: "Implementation",
        image: "/images/blog-5.jpg",
        featured: false,
      },
      {
        id: 6,
        title: "The ROI of Digital Warehouse Management Systems",
        excerpt:
          "Understanding the financial benefits and return on investment of modern warehouse management solutions.",
        author: "Robert Wilson",
        date: "February 15, 2024",
        readTime: "10 min read",
        category: "ROI Analysis",
        image: "/images/blog-6.jpg",
        featured: false,
      },
    ],
    newsletter: {
      title: "Stay Updated with Industry Insights",
      description: "Get the latest articles, trends, and best practices delivered to your inbox.",
      placeholder: "Enter your email",
      buttonText: "Subscribe",
    },
  },
  contact: {
    hero: {
      title: "Get In Touch",
      description:
        "Ready to transform your operations? Let's discuss how our turnkey solutions can help your business.",
    },
    info: [
      {
        icon: "MapPin",
        title: "Office Location",
        info: "123 Business District\nTech City, TC 12345",
      },
      {
        icon: "Phone",
        title: "Phone",
        info: "+1 (555) 123-4567",
      },
      {
        icon: "Mail",
        title: "Email",
        info: "hello@myworkapp.io",
      },
      {
        icon: "Clock",
        title: "Business Hours",
        info: "Mon - Fri: 9:00 AM - 6:00 PM\nSat - Sun: Closed",
      },
    ],
    form: {
      title: "Send Us a Message",
      fields: {
        name: {
          label: "Name *",
          placeholder: "Your full name",
        },
        email: {
          label: "Email *",
          placeholder: "Your email address",
        },
        company: {
          label: "Company (Optional)",
          placeholder: "Your company name",
        },
        phone: {
          label: "Phone Number *",
          placeholder: "Your phone number",
        },
        message: {
          label: "Message *",
          placeholder: "Tell us about your project or requirements",
        },
      },
      services: {
        label: "Services of Interest (Optional)",
        options: [
          "Logistics and Supply Chain Management",
          "Digital Warehouse Management",
          "IoT Sensors and Tracking",
          "Custom Digital Workflow Development",
        ],
      },
      submitButton: "Send Message",
      submittingText: "Sending...",
      successTitle: "Message Sent!",
      successMessage: "Thank you for reaching out. We'll get back to you as soon as possible.",
      successButton: "Send Another Message",
    },
  },
  footer: {
    description:
      "Transforming operations with turnkey solutions for logistics, warehouse management, IoT tracking, and custom digital workflows.",
    quickLinks: {
      title: "Quick Links",
      items: [
        { href: "/", label: "Home" },
        { href: "/services", label: "Services" },
        { href: "/why-us", label: "Why Us" },
        { href: "/case-studies", label: "Case Studies" },
        { href: "/blog", label: "Blog" },
        { href: "/contact", label: "Contact" },
      ],
    },
    contact: {
      title: "Contact",
      items: ["123 Business District", "Tech City, TC 12345", "+1 (555) 123-4567", "hello@myworkapp.io"],
    },
    legal: [
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms of Service" },
    ],
    copyright: "© {year} MyWorkApp.io. All rights reserved.",
  },
  supplyChain: {
    title: "Our End-to-End Supply Chain Solution",
    description:
      "From warehouse to delivery, our integrated platform streamlines every step of your logistics operations.",
    steps: [
      {
        icon: "Warehouse",
        title: "Warehouse",
        description: "Inventory tracking and management",
        color: "text-[#0F4C81]",
      },
      {
        icon: "Package",
        title: "Packaging",
        description: "Automated order processing",
        color: "text-[#FFCF40]",
      },
      {
        icon: "Truck",
        title: "Shipping",
        description: "Real-time tracking and routing",
        color: "text-[#FF6B35]",
      },
      {
        icon: "BarChart3",
        title: "Analytics",
        description: "Performance insights and reporting",
        color: "text-[#0F4C81]",
      },
    ],
    conclusion: "Our integrated platform connects every step of your supply chain for maximum efficiency.",
  },
}

// In-memory storage for content changes (this will reset on each deployment)
let currentContent = defaultContent

export async function GET() {
  try {
    return NextResponse.json(currentContent)
  } catch (error) {
    console.error("Error fetching CMS content:", error)
    return NextResponse.json({ error: "Failed to fetch CMS content" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const newContent = await request.json()

    // Update the in-memory content
    currentContent = newContent

    // Note: In a production environment, you would want to save this to a database
    // For now, changes will persist until the next deployment

    return NextResponse.json({
      success: true,
      message: "Content updated successfully. Note: Changes will reset on next deployment.",
    })
  } catch (error) {
    console.error("Error updating CMS content:", error)
    return NextResponse.json({ error: "Failed to update CMS content" }, { status: 500 })
  }
}
