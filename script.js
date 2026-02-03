// Theme Management
class ThemeManager {
  constructor() {
    this.theme = localStorage.getItem("theme") || this.getPreferredTheme()
    this.init()
  }

  init() {
    this.setTheme(this.theme)
    this.bindEvents()
  }

  getPreferredTheme() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  }

  setTheme(theme) {
    this.theme = theme
    document.documentElement.setAttribute("data-theme", theme)
    localStorage.setItem("theme", theme)
  }

  toggleTheme() {
    const newTheme = this.theme === "light" ? "dark" : "light"
    this.setTheme(newTheme)
  }

  bindEvents() {
    const themeToggles = document.querySelectorAll(".theme-toggle")
    themeToggles.forEach((toggle) => {
      toggle.addEventListener("click", () => this.toggleTheme())
    })

    // Listen for system theme changes
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
      if (!localStorage.getItem("theme")) {
        this.setTheme(e.matches ? "dark" : "light")
      }
    })
  }
}

// Navigation Management
class NavigationManager {
  constructor() {
    this.navbar = document.getElementById("navbar")
    this.hamburger = document.getElementById("hamburger")
    this.mobileMenu = document.getElementById("mobileMenu")
    this.init()
  }

  init() {
    this.bindEvents()
    this.handleScroll()
  }

  bindEvents() {
    // Hamburger menu toggle
    this.hamburger.addEventListener("click", () => this.toggleMobileMenu())

    // Navigation links
    const navLinks = document.querySelectorAll(".nav-link, .mobile-link, .footer-link")
    navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault()
        const targetId = link.getAttribute("href")
        this.scrollToSection(targetId)
        this.closeMobileMenu()
      })
    })

    // Scroll event
    window.addEventListener("scroll", () => this.handleScroll())
  }

  toggleMobileMenu() {
    this.hamburger.classList.toggle("active")
    this.mobileMenu.classList.toggle("active")
  }

  closeMobileMenu() {
    this.hamburger.classList.remove("active")
    this.mobileMenu.classList.remove("active")
  }

  scrollToSection(targetId) {
    const targetElement = document.querySelector(targetId)
    if (targetElement) {
      const offsetTop = targetElement.offsetTop - 80
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      })
    }
  }

  handleScroll() {
    if (window.scrollY > 10) {
      this.navbar.classList.add("scrolled")
    } else {
      this.navbar.classList.remove("scrolled")
    }
  }
}
// Skills Management
class SkillsManager {
  constructor() {
    this.skillsData = {
      programming_languages: [
        { name: "Python" },
        { name: "C++" },
        { name: "C#" },
        { name: "Node.js" },
      ],
      frameworks: [
        { name: "React" },
        { name: "Angular" },
        { name: "Django" },
        { name: ".NET Core" },
        { name: "React Native" },
      ],
      databases: [
        { name: "PostgreSQL" },
        { name: "MySQL" },
        { name: "SQLite" },
        { name: "MongoDB" },
        { name: "Firebase" },
      ],
      data_analytics: [
        { name: "Snowflake" },
        { name: "Metabase" },
        { name: "Airbyte" },
        { name: "DBT" },
        { name: "Spark" },
        { name: "Power BI" },
      ],
      cloud_devops: [
        { name: "Docker" },
        { name: "GitHub Actions" },
        { name: "GCP" },
      ],
    }
    this.init()
  }

  init() {
    this.loadSkills()
    this.bindAccordionEvents()
  }

  async loadSkills() {
    const loadingElement = document.getElementById("skillsLoading")
    const accordionElement = document.getElementById("skillsAccordion")

    // Simulate loading delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    this.renderSkills()

    loadingElement.style.display = "none"
    accordionElement.style.display = "block"
  }

  renderSkills() {
    const programmingContainer = document.getElementById("programmingSkills")
    const frameworksContainer = document.getElementById("frameworksSkills")
    const databasesContainer = document.getElementById("databasesSkills")
    const dataAnalyticsContainer = document.getElementById("dataAnalyticsSkills")
    const cloudDevOpsContainer = document.getElementById("cloudDevOpsSkills")

    programmingContainer.innerHTML = this.renderSkillsGrid(this.skillsData.programming_languages)
    frameworksContainer.innerHTML = this.renderSkillsGrid(this.skillsData.frameworks)
    databasesContainer.innerHTML = this.renderSkillsGrid(this.skillsData.databases)
    dataAnalyticsContainer.innerHTML = this.renderSkillsGrid(this.skillsData.data_analytics)
    cloudDevOpsContainer.innerHTML = this.renderSkillsGrid(this.skillsData.cloud_devops)
  }

  renderSkillsGrid(skills) {
    return skills
      .map(
        (skill, index) => `
            <div class="skill-item fade-in" style="animation-delay: ${index * 0.1}s">
                <span class="skill-name">${skill.name}</span>
            </div>
        `,
      )
      .join("")
  }

  bindAccordionEvents() {
    const accordionHeaders = document.querySelectorAll(".accordion-header")
    accordionHeaders.forEach((header) => {
      header.addEventListener("click", () => {
        const target = header.getAttribute("data-target")
        const content = document.getElementById(target)

        // Close other accordions
        accordionHeaders.forEach((otherHeader) => {
          if (otherHeader !== header) {
            otherHeader.classList.remove("active")
            const otherTarget = otherHeader.getAttribute("data-target")
            const otherContent = document.getElementById(otherTarget)
            otherContent.classList.remove("active")
          }
        })

        // Toggle current accordion
        header.classList.toggle("active")
        content.classList.toggle("active")
      })
    })
  }
}

// Statistics Counter Animation
class StatisticsManager {
  constructor() {
    this.animated = false
    this.init()
  }

  init() {
    window.addEventListener('scroll', () => this.checkPosition())
    this.checkPosition()
  }

  checkPosition() {
    if (this.animated) return

    const statsSection = document.querySelector('.stats-section')
    if (!statsSection) return

    const rect = statsSection.getBoundingClientRect()
    const isVisible = rect.top < window.innerHeight && rect.bottom >= 0

    if (isVisible) {
      this.animateCounters()
      this.animated = true
    }
  }

  animateCounters() {
    const counters = document.querySelectorAll('.stat-number')
    counters.forEach(counter => {
      const target = parseFloat(counter.getAttribute('data-target'))
      const duration = 2000 // 2 seconds
      const step = target / (duration / 16) // 60fps
      let current = 0

      const updateCounter = () => {
        current += step
        if (current < target) {
          counter.textContent = current.toFixed(1)
          requestAnimationFrame(updateCounter)
        } else {
          counter.textContent = target % 1 === 0 ? target : target.toFixed(1)
        }
      }

      updateCounter()
    })
  }
}

// Portfolio Management
class PortfolioManager {
  constructor() {
    this.projects = [
      {
        title: "SkillSync - FYP",
        impact: "Smart career guidance with NLP-powered personalized job recommendations",
        description: "AI-powered career guidance platform using RAG and BERT for personalized job recommendations and semantic career planning with context-aware skill assessments.",
        techStack: ["RAG", "BERT", "NLP", "Semantic Search", "Django REST", "React"],
        image: "https://via.placeholder.com/500x300/4F46E5/FFFFFF?text=SkillSync",
        isDemo: true,
        date: "May 2025"
      },
      {
        title: "VAMS",
        impact: "Detects fight sequence frame by frame with intensity detection",
        description: "A violence detection system made with help of YOLO, and deployed using streamlit on huggingspace for demo purposes",
        techStack: ["YOLO", "computer vision", "streamlit", "Python"],
        image: "https://via.placeholder.com/500x300/8B5CF6/FFFFFF?text=VAMS",
        link: "https://github.com/Hasnain-Fatmi/VAMS",
        deployedLink: "https://huggingface.co/spaces/bexilix/VAMS",
        date: "Dec 2025"
      },
      {
        title: "DCACNet-CD",
        impact: "91% accurate skin lesion classification using custom CNN architecture",
        description: "Custom CNN architecture for skin lesion classification achieving 91% accuracy through transfer learning and data augmentation with FastAPI deployment.",
        techStack: ["CNN", "Transfer Learning", "Data Augmentation", "FastAPI", "Python"],
        image: "https://via.placeholder.com/500x300/10B981/FFFFFF?text=DCACNet-CD",
        link: "https://github.com/Hasnain-Fatmi/DCACNet-CD",
        deployedLink: "https://dcac-net-cd.vercel.app",
        date: "Apr 2025"
      },
      {
        title: "JPEGIFY",
        impact: "Full JPEG compression engine built from scratch with custom file format",
        description: "Complete JPEG compression system built from scratch supporting grayscale and color images with adjustable quality and custom .jpgc format using DSP algorithms.",
        techStack: ["Python", "JPEG Compression", "DSP", "Algorithms", "GUI"],
        image: "https://via.placeholder.com/500x300/F59E0B/FFFFFF?text=JPEGIFY",
        link: "https://github.com/Hasnain-Fatmi/JPEGIFY",
        deployedLink: "https://jpegify-liard.vercel.app/",
        date: "Apr 2025"
      },
      {
        title: "JANWAR",
        impact: "Full-stack e-commerce platform for pet adoption and accessories marketplace",
        description: "Full-stack MERN e-commerce platform for pet adoption with features for posting ads, buying/selling pets, and purchasing accessories with custom transactions.",
        techStack: ["React", "Node.js", "Express", "MongoDB"],
        image: "https://via.placeholder.com/500x300/EF4444/FFFFFF?text=JANWAR",
        link: "https://github.com/Hasnain-Fatmi/janwar.com",
        date: "May 2024"
      },
      {
        title: "HWCS",
        impact: "96% accurate handwriting-based writer identification with Django integration",
        description: "Writer identification system achieving 96% accuracy using optimized KNN and GLCM feature extraction, deployed as Django web application for seamless recognition.",
        techStack: ["KNN", "Machine Learning", "GLCM", "Django", "Python"],
        image: "https://via.placeholder.com/500x300/8B5CF6/FFFFFF?text=HWCS",
        link: "https://github.com/Hasnain-Fatmi/HWCS",
        deployedLink: "https://huggingface.co/spaces/bexilix/HWCS",
        date: "Apr 2024"
      }
    ]
    this.init()
  }

  init() {
    this.loadProjects()
    this.initDemoModal()
  }

  initDemoModal() {
    const modal = document.getElementById('demoModal')
    const modalClose = document.getElementById('modalClose')
    const closeDemo = document.getElementById('closeDemo')

    // Close modal when clicking the X button
    modalClose.addEventListener('click', () => this.closeDemoModal())
    
    // Close modal when clicking the close button
    closeDemo.addEventListener('click', () => this.closeDemoModal())
    
    // Close modal when clicking outside the modal content
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        this.closeDemoModal()
      }
    })

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        this.closeDemoModal()
      }
    })
  }

  showDemoModal() {
    const modal = document.getElementById('demoModal')
    modal.classList.add('active')
    document.body.style.overflow = 'hidden' // Prevent background scrolling
  }

  closeDemoModal() {
    const modal = document.getElementById('demoModal')
    modal.classList.remove('active')
    document.body.style.overflow = '' // Restore scrolling
  }

  async loadProjects() {
    const loadingElement = document.getElementById("portfolioLoading")
    const gridElement = document.getElementById("projectsGrid")

    // Simulate loading delay
    await new Promise((resolve) => setTimeout(resolve, 1200))

    this.renderProjects()

    loadingElement.style.display = "none"
    gridElement.style.display = "grid"
  }

  renderProjects() {
      const grid = document.getElementById("projectsGrid")

      // Render project cards
      grid.innerHTML = this.projects
        .map(
          (project, index) => `
              <div class="project-card fade-in" style="animation-delay: ${index * 0.1}s">
                  <div class="project-content">
                      <div class="project-header">
                          <h3 class="project-title">${project.title}</h3>
                          <span class="project-date">${project.date}</span>
                      </div>
                      <p class="project-description">${project.description}</p>
                      <div class="project-tech-stack">
                          ${project.techStack.map(tech => `<span class="tech-badge">${tech}</span>`).join('')}
                      </div>
                      ${project.isDemo
                          ? `<button class="btn btn-primary btn-animated" onclick="window.portfolioManager.showDemoModal()">
                              <i class="fas fa-play"></i> Watch Demo
                             </button>`
                          : `<div class="project-links">
                              <a href="${project.link}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-animated">
                                <i class="fab fa-github"></i> GitHub
                              </a>
                              ${project.deployedLink
                                ? `<a href="${project.deployedLink}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-animated">
                                    <i class="fas fa-external-link-alt"></i> Live Demo
                                   </a>`
                                : ''
                              }
                             </div>`
                      }
                  </div>
              </div>
          `,
        )
        .join("")
  }

}
// Contact Form Management
class ContactManager {
  constructor() {
    this.form = document.getElementById("contactForm")

    // EmailJS credentials
    // SECURITY NOTE: These are client-side credentials. To protect against abuse:
    // 1. Go to EmailJS Dashboard > Email Services > Your Service > Settings
    // 2. Enable "Restrict to specific domains" and add: hasnainfatmi.com
    // 3. Enable reCAPTCHA for additional protection
    this.serviceId = "service_7hulbtq"
    this.templateId = "template_eb997fq"
    this.publicKey = "6-cLwi-Qj1WTboC_n"
    this.init()
  }

  init() {
    // Initialize EmailJS
    emailjs.init(this.publicKey)
    this.bindEvents()
  }

  bindEvents() {
    this.form.addEventListener("submit", (e) => this.handleSubmit(e))
  }

  async handleSubmit(e) {
    e.preventDefault()

    const submitBtn = this.form.querySelector('button[type="submit"]')

    // Check honeypot field - if filled, it's a bot
    const honeypot = this.form.querySelector('input[name="website"]')
    if (honeypot && honeypot.value) {
      // Silently reject bot submissions but show fake success
      console.log('Bot detected via honeypot')
      this.showSuccessMessage()
      this.form.reset()
      return
    }

    // Show loading state
    submitBtn.classList.add("loading")
    submitBtn.disabled = true

    try {
      // Get form data
      const formData = new FormData(this.form)
      // Get current timestamp
      const now = new Date()
      const timeString = now.toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short'
      })
      // Prepare template parameters
      const templateParams = {
        from_name: formData.get('name'),
        from_email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message'),
        to_name: 'Hasnain Fatmi',
        reply_to: formData.get('email'),
        time: timeString
      }

      // Send email using EmailJS
      const result = await emailjs.send(
        this.serviceId,
        this.templateId,
        templateParams
      )

      console.log('Email sent successfully:', result)

      // Show success message
      this.showSuccessMessage()

      // Reset form
      this.form.reset()
    } catch (error) {
      console.error('Failed to send email:', error)
      this.showErrorMessage()
    } finally {
      // Reset button state
      submitBtn.classList.remove("loading")
      submitBtn.disabled = false
    }
  }

  showSuccessMessage() {
    this.showMessage(
      '<i class="fas fa-check-circle"></i> Message sent successfully!',
      'var(--primary)',
      'white'
    )
  }

  showErrorMessage() {
    this.showMessage(
      '<i class="fas fa-exclamation-circle"></i> Failed to send message. Please try again.',
      '#ef4444',
      'white'
    )
  }

  showMessage(content, bgColor, textColor) {
    // Create message element
    const message = document.createElement("div")
    message.className = "notification-message"
    message.innerHTML = `
      <div style="
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${bgColor};
        color: ${textColor};
        padding: 1rem 1.5rem;
        border-radius: var(--radius);
        box-shadow: var(--shadow-lg);
        z-index: 9999;
        animation: slideIn 0.3s ease;
        max-width: 300px;
      ">
        ${content}
      </div>
    `

    document.body.appendChild(message)

    // Remove message after 4 seconds
    setTimeout(() => {
      message.style.animation = "slideOut 0.3s ease"
      setTimeout(() => message.remove(), 300)
    }, 4000)
  }
}

// Scroll to Top Management
class ScrollToTopManager {
  constructor() {
    this.button = document.getElementById("scrollToTop")
    this.init()
  }

  init() {
    this.bindEvents()
    this.handleScroll()
  }

  bindEvents() {
    this.button.addEventListener("click", () => this.scrollToTop())
    window.addEventListener("scroll", () => this.handleScroll())
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  handleScroll() {
    if (window.scrollY > 300) {
      this.button.classList.add("visible")
    } else {
      this.button.classList.remove("visible")
    }
  }
}

// Scroll Reveal Animation Manager
class ScrollRevealManager {
  constructor() {
    this.elements = document.querySelectorAll(".scroll-reveal")
    this.init()
  }

  init() {
    this.bindEvents()
    this.checkElements()
  }

  bindEvents() {
    window.addEventListener("scroll", () => this.checkElements())
    window.addEventListener("resize", () => this.checkElements())
  }

  checkElements() {
    this.elements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top
      const elementVisible = 150

      if (elementTop < window.innerHeight - elementVisible) {
        element.classList.add("visible")
      }
    })
  }
}

// Cursor Animation Manager
class CursorManager {
  constructor() {
    this.cursorDot = document.getElementById("cursor-dot")
    this.cursorOutline = document.getElementById("cursor-outline")
    this.init()
  }

  init() {
    if (window.innerWidth > 768) {
      this.bindEvents()
    }
  }

  bindEvents() {
    document.addEventListener("mousemove", (e) => {
      const posX = e.clientX
      const posY = e.clientY

      this.cursorDot.style.left = `${posX}px`
      this.cursorDot.style.top = `${posY}px`

      this.cursorOutline.style.left = `${posX}px`
      this.cursorOutline.style.top = `${posY}px`

      this.cursorDot.style.opacity = "1"
      this.cursorOutline.style.opacity = "1"
    })

    document.addEventListener("mousedown", () => {
      this.cursorDot.style.transform = "translate(-50%, -50%) scale(0.5)"
      this.cursorOutline.style.transform = "translate(-50%, -50%) scale(0.5)"
    })

    document.addEventListener("mouseup", () => {
      this.cursorDot.style.transform = "translate(-50%, -50%) scale(1)"
      this.cursorOutline.style.transform = "translate(-50%, -50%) scale(1)"
    })

    // Hide cursor when leaving window
    document.addEventListener("mouseleave", () => {
      this.cursorDot.style.opacity = "0"
      this.cursorOutline.style.opacity = "0"
    })
  }
}

// Particle Animation Manager
class ParticleManager {
  constructor() {
    this.container = document.getElementById("particles")
    this.particles = []
    this.init()
  }

  init() {
    this.createParticles()
    this.animate()
  }

  createParticles() {
    const particleCount = 50

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div")
      particle.style.cssText = `
        position: absolute;
        width: 2px;
        height: 2px;
        background-color: var(--primary);
        border-radius: 50%;
        opacity: 0.3;
        pointer-events: none;
      `

      particle.x = Math.random() * window.innerWidth
      particle.y = Math.random() * window.innerHeight
      particle.vx = (Math.random() - 0.5) * 0.5
      particle.vy = (Math.random() - 0.5) * 0.5

      this.particles.push(particle)
      this.container.appendChild(particle)
    }
  }

  animate() {
    this.particles.forEach((particle) => {
      particle.x += particle.vx
      particle.y += particle.vy

      if (particle.x < 0 || particle.x > window.innerWidth) particle.vx *= -1
      if (particle.y < 0 || particle.y > window.innerHeight) particle.vy *= -1

      particle.style.left = `${particle.x}px`
      particle.style.top = `${particle.y}px`
    })

    requestAnimationFrame(() => this.animate())
  }
}

// Page Loader Manager
class PageLoaderManager {
  constructor() {
    this.loader = document.getElementById("pageLoader")
    this.init()
  }

  init() {
    // Hide loader immediately when page is fully loaded
    window.addEventListener("load", () => {
      this.loader.style.opacity = "0"
      this.loader.style.visibility = "hidden"
    })
  }
}

// Utility Functions
function scrollToSection(sectionId) {
  const element = document.querySelector(sectionId)
  if (element) {
    const offsetTop = element.offsetTop - 80
    window.scrollTo({
      top: offsetTop,
      behavior: "smooth",
    })
  }
}

// Initialize Application
document.addEventListener("DOMContentLoaded", () => {
  // Set current year in footer
  document.getElementById("currentYear").textContent = new Date().getFullYear()

  // Initialize managers
  new PageLoaderManager()
  new ThemeManager()
  new NavigationManager()
  new SkillsManager()
  window.portfolioManager = new PortfolioManager()
  new ContactManager()
  new ScrollToTopManager()
  new ScrollRevealManager()
  new CursorManager()
  new ParticleManager()

  // Add smooth scrolling for hero buttons
  window.scrollToSection = scrollToSection

  // Add CSS for success message animation
  const style = document.createElement("style")
  style.textContent = `
    @keyframes slideIn {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    
    @keyframes slideOut {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(100%);
        opacity: 0;
      }
    }
  `
  document.head.appendChild(style)
})

// Handle window resize
window.addEventListener("resize", () => {
  // Close mobile menu on resize
  const hamburger = document.getElementById("hamburger")
  const mobileMenu = document.getElementById("mobileMenu")

  if (window.innerWidth > 768) {
    hamburger.classList.remove("active")
    mobileMenu.classList.remove("active")
  }
})

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Apply throttling to scroll events
const throttledScroll = throttle(() => {
  // Scroll-dependent animations can be added here
}, 16) // ~60fps

window.addEventListener("scroll", throttledScroll)

// // Chatbot disabled for now
// // Chatbot Manager
// class ChatbotManager {
//   constructor() {
//     this.container = document.getElementById("chatbotContainer")
//     this.toggle = document.getElementById("chatbotToggle")
//     this.closeBtn = document.getElementById("chatbotClose")
//     this.messages = document.getElementById("chatbotMessages")
//     this.input = document.getElementById("chatbotInput")
//     this.sendBtn = document.getElementById("chatbotSend")
//     this.conversationHistory = []
//     this.isFirstOpen = true

//     // Configuration
//     this.config = {
//       // API endpoint - change this to your deployed Vercel URL
//       // For local development: 'http://localhost:3000/api/chat-stream'
//       // For production: 'https://your-api.vercel.app/api/chat-stream'
//       apiUrl: "https://portfolio-chatbot-ochre.vercel.app/api/chat",

//       // Use streaming for better UX
//       useStreaming: false,

//       // Suggested questions
//       suggestedQuestions: [
//         "What programming languages does Hasnain know?",
//         "Tell me about Hasnain",
//         "Who are you and how were you made?",
//         "Does Hasnain have cloud/GCP experience?"
//       ]
//     }

//     this.init()
//   }

//   init() {
//     this.bindEvents()
//   }

//   bindEvents() {
//     this.toggle.addEventListener("click", () => this.toggleChat())
//     this.closeBtn.addEventListener("click", () => this.closeChat())
//     this.sendBtn.addEventListener("click", () => this.sendMessage())
//     this.input.addEventListener("keypress", (e) => {
//       if (e.key === "Enter" && !e.shiftKey) {
//         e.preventDefault()
//         this.sendMessage()
//       }
//     })
//   }

//   toggleChat() {
//     this.container.classList.toggle("active")
//     if (this.container.classList.contains("active")) {
//       this.input.focus()

//       // Add suggested questions on first open
//       if (this.isFirstOpen) {
//         setTimeout(() => {
//           this.addSuggestedQuestions()
//           this.isFirstOpen = false
//         }, 500)
//       }
//     }
//   }

//   closeChat() {
//     this.container.classList.remove("active")
//   }

//   addSuggestedQuestions() {
//     const suggestionsDiv = document.createElement("div")
//     suggestionsDiv.className = "suggested-questions"
//     suggestionsDiv.style.cssText = `
//       display: flex;
//       flex-wrap: wrap;
//       gap: 0.5rem;
//       padding: 0.5rem;
//       margin-bottom: 0.5rem;
//     `

//     const label = document.createElement("div")
//     label.textContent = "Try asking:"
//     label.style.cssText = `
//       width: 100%;
//       font-size: 0.85rem;
//       color: var(--text-secondary);
//       margin-bottom: 0.25rem;
//       font-weight: 500;
//     `
//     suggestionsDiv.appendChild(label)

//     this.config.suggestedQuestions.forEach(question => {
//       const chip = document.createElement("button")
//       chip.className = "suggestion-chip"
//       chip.textContent = question
//       chip.style.cssText = `
//         background: var(--bg-secondary);
//         border: 1px solid var(--primary);
//         color: var(--primary);
//         padding: 0.4rem 0.8rem;
//         border-radius: 1rem;
//         font-size: 0.85rem;
//         cursor: pointer;
//         transition: all 0.2s;
//       `
//       chip.onmouseover = () => {
//         chip.style.background = "var(--primary)"
//         chip.style.color = "white"
//       }
//       chip.onmouseout = () => {
//         chip.style.background = "var(--bg-secondary)"
//         chip.style.color = "var(--primary)"
//       }
//       chip.onclick = () => {
//         this.input.value = question
//         this.sendMessage()
//         suggestionsDiv.remove()
//       }
//       suggestionsDiv.appendChild(chip)
//     })

//     this.messages.appendChild(suggestionsDiv)
//     this.scrollToBottom()
//   }

//   async sendMessage() {
//     const message = this.input.value.trim()
//     if (!message || this.sendBtn.disabled) return

//     // Add user message to UI
//     this.addMessage(message, "user")
//     this.input.value = ""

//     // Disable input while processing
//     this.sendBtn.disabled = true
//     this.input.disabled = true

//     // Show typing indicator
//     const typingId = this.showTypingIndicator()

//     try {
//       if (this.config.useStreaming) {
//         await this.sendMessageStreaming(message, typingId)
//       } else {
//         await this.sendMessageNonStreaming(message, typingId)
//       }
//     } catch (error) {
//       console.error("Chatbot error:", error)
//       this.removeTypingIndicator(typingId)

//       // Better error handling
//       let errorMessage = "Sorry, I'm having trouble connecting right now. Please try again in a moment or use the contact form below."

//       if (error.message.includes("Failed to fetch") || error.message.includes("NetworkError")) {
//         errorMessage = "Unable to connect to the server. Please check your internet connection and try again."
//       } else if (error.message.includes("429")) {
//         errorMessage = "Too many requests. Please wait a moment and try again."
//       }

//       this.addMessage(errorMessage, "bot")
//     } finally {
//       // Re-enable input
//       this.sendBtn.disabled = false
//       this.input.disabled = false
//       this.input.focus()
//     }
//   }

//   async sendMessageStreaming(message, typingId) {
//     const response = await fetch(this.config.apiUrl, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({
//         message: message,
//         conversationHistory: this.conversationHistory.slice(-5)
//       })
//     })

//     if (!response.ok) {
//       const errorData = await response.json().catch(() => ({}))
//       throw new Error(errorData.error || `Server error: ${response.status}`)
//     }

//     // Remove typing indicator
//     this.removeTypingIndicator(typingId)

//     // Create message element for streaming
//     const messageId = `msg-${Date.now()}`
//     const messageDiv = document.createElement("div")
//     messageDiv.id = messageId
//     messageDiv.className = "chatbot-message bot-message"

//     const avatar = document.createElement("div")
//     avatar.className = "message-avatar"
//     avatar.innerHTML = '<i class="fas fa-robot"></i>'

//     const messageContent = document.createElement("div")
//     messageContent.className = "message-content"

//     messageDiv.appendChild(avatar)
//     messageDiv.appendChild(messageContent)
//     this.messages.appendChild(messageDiv)

//     let fullResponse = ""
//     let detectedAction = null

//     // Read the stream
//     const reader = response.body.getReader()
//     const decoder = new TextDecoder()

//     while (true) {
//       const { done, value } = await reader.read()
//       if (done) break

//       const chunk = decoder.decode(value)
//       const lines = chunk.split("\n")

//       for (const line of lines) {
//         if (line.startsWith("data: ")) {
//           const data = line.slice(6)

//           if (data === "[DONE]") break

//           try {
//             const parsed = JSON.parse(data)

//             if (parsed.type === "chunk") {
//               fullResponse += parsed.content
//               messageContent.textContent = fullResponse
//             } else if (parsed.type === "action") {
//               detectedAction = parsed.action
//             } else if (parsed.type === "error") {
//               throw new Error(parsed.error)
//             }
//           } catch (e) {
//             if (!e.message.includes("Unexpected")) throw e
//           }
//         }
//       }
//     }

//     // Update conversation history
//     this.conversationHistory.push(
//       { role: "user", content: message },
//       { role: "assistant", content: fullResponse }
//     )

//     if (this.conversationHistory.length > 10) {
//       this.conversationHistory = this.conversationHistory.slice(-10)
//     }

//     // Handle actions
//     if (detectedAction) {
//       this.handleAction(detectedAction)
//     }
//   }

//   async sendMessageNonStreaming(message, typingId) {
//     const response = await fetch(this.config.apiUrl.replace("chat-stream", "chat"), {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({
//         message: message,
//         conversationHistory: this.conversationHistory.slice(-5)
//       })
//     })

//     if (!response.ok) {
//       const errorData = await response.json().catch(() => ({}))
//       throw new Error(errorData.error || `Server error: ${response.status}`)
//     }

//     const data = await response.json()

//     // Remove typing indicator
//     this.removeTypingIndicator(typingId)

//     // Add bot response
//     this.addMessage(data.reply, "bot")

//     // Update conversation history
//     this.conversationHistory.push(
//       { role: "user", content: message },
//       { role: "assistant", content: data.reply }
//     )

//     if (this.conversationHistory.length > 10) {
//       this.conversationHistory = this.conversationHistory.slice(-10)
//     }

//     // Handle actions
//     if (data.action) {
//       this.handleAction(data.action)
//     }
//   }

//   addMessage(content, type) {
//     const messageDiv = document.createElement("div")
//     messageDiv.className = `chatbot-message ${type}-message`

//     const avatar = document.createElement("div")
//     avatar.className = "message-avatar"
//     avatar.innerHTML = type === "user" ? '<i class="fas fa-user"></i>' : '<i class="fas fa-robot"></i>'

//     const messageContent = document.createElement("div")
//     messageContent.className = "message-content"

//     // Convert markdown-style formatting to HTML
//     const formattedContent = this.formatMessage(content)
//     messageContent.innerHTML = formattedContent

//     messageDiv.appendChild(avatar)
//     messageDiv.appendChild(messageContent)

//     this.messages.appendChild(messageDiv)

//     // Only auto-scroll for user messages, let user scroll for bot responses
//     if (type === "user") {
//       this.scrollToBottom()
//     }
//   }

//   formatMessage(text) {
//     // Enhanced markdown-like formatting
//     let formatted = text
//       // Bold text
//       .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
//       // Convert double line breaks to paragraphs
//       .split('\n\n')
//       .map(para => para.trim())
//       .filter(para => para.length > 0)
//       .map(para => {
//         // Check if paragraph contains list items
//         if (para.match(/^[\*\-] /m)) {
//           // Convert bullet points to list items
//           const items = para
//             .split('\n')
//             .filter(line => line.trim())
//             .map(line => line.replace(/^[\*\-] (.+)$/, '<li>$1</li>'))
//             .join('')
//           return `<ul>${items}</ul>`
//         }
//         // Check if paragraph contains numbered lists
//         else if (para.match(/^\d+\. /m)) {
//           const items = para
//             .split('\n')
//             .filter(line => line.trim())
//             .map(line => line.replace(/^\d+\. (.+)$/, '<li>$1</li>'))
//             .join('')
//           return `<ol>${items}</ol>`
//         }
//         // Regular paragraph
//         else {
//           return `<p>${para.replace(/\n/g, '<br>')}</p>`
//         }
//       })
//       .join('')

//     return formatted
//   }

//   showTypingIndicator() {
//     const typingDiv = document.createElement("div")
//     typingDiv.className = "chatbot-message bot-message"
//     typingDiv.id = `typing-${Date.now()}`

//     const avatar = document.createElement("div")
//     avatar.className = "message-avatar"
//     avatar.innerHTML = '<i class="fas fa-robot"></i>'

//     const indicator = document.createElement("div")
//     indicator.className = "message-content typing-indicator"
//     indicator.innerHTML = `
//       <div class="typing-dot"></div>
//       <div class="typing-dot"></div>
//       <div class="typing-dot"></div>
//     `

//     typingDiv.appendChild(avatar)
//     typingDiv.appendChild(indicator)

//     this.messages.appendChild(typingDiv)

//     return typingDiv.id
//   }

//   removeTypingIndicator(id) {
//     const element = document.getElementById(id)
//     if (element) {
//       element.remove()
//     }
//   }

//   scrollToBottom() {
//     this.messages.scrollTop = this.messages.scrollHeight
//   }

//   handleAction(action) {
//     // Handle navigation actions from the bot
//     setTimeout(() => {
//       switch (action) {
//         case "scroll_projects":
//           scrollToSection("#portfolio")
//           break
//         case "scroll_contact":
//           scrollToSection("#contact")
//           break
//         case "download_cv":
//           // Trigger CV download
//           const link = document.createElement("a")
//           link.href = "./packages/Resume/Resume - Muhammad Hasnain Fatmi.pdf"
//           link.download = "Resume - Muhammad Hasnain Fatmi.pdf"
//           link.click()
//           break
//       }
//     }, 500)
//   }
// }

// // Initialize Chatbot
// document.addEventListener("DOMContentLoaded", () => {
//   new ChatbotManager()
// })

