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
        { name: "C++" },
        { name: "C#" },
        { name: "Python" },
        { name: "JavaScript" },
        { name: "SQL" },
      ],
      frameworks: [
        { name: "ReactJs" },
        { name: "AngularJs" },
        { name: "Django REST Framework" },
        { name: ".NET Core" },
        { name: "Flutter" },
      ],
      data_science: [
        { name: "RNN" },
        { name: "CNN" },
        { name: "Sentence-BERT" },
        { name: "RAG" },
      ],
      databases: [
        { name: "PostgreSQL" },
        { name: "SQLite" },
        { name: "MySQL" },
        { name: "MongoDB" },
        { name: "Firebase" },
      ],
      tools: [
        { name: "HTML" },
        { name: "CSS" },
        { name: "Linux" },
        { name: "Git" },
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
    const toolsContainer = document.getElementById("toolsSkills")

    programmingContainer.innerHTML = this.renderSkillsGrid(this.skillsData.programming_languages)
    frameworksContainer.innerHTML = this.renderSkillsGrid([
      ...this.skillsData.frameworks,
      ...this.skillsData.data_science,
    ])
    databasesContainer.innerHTML = this.renderSkillsGrid(this.skillsData.databases)
    toolsContainer.innerHTML = this.renderSkillsGrid(this.skillsData.tools)
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

// Portfolio Management
class PortfolioManager {
  constructor() {
    this.projects = [
      {
        title: "SkillSync",
        description: "RAG, DRF, REACTJs, SENTENCE-BERT. Final Year Project focused on Smart career guidance platform with personalized job recommendations and career planning. Features: Personalized career advice, context-aware job recommendations, real-time job market trends.",
        image: "https://via.placeholder.com/500x300/4F46E5/FFFFFF?text=SkillSync",
        isDemo: true,
        date: "May 2025"
      },
      {
        title: "DCACNet-CD",
        description: "CNN, ATTENTION CONDENSER, AUGMENTATION. This project develops a lightweight deep learning model for efficient skin lesion classification using custom CNN. Classifies different types of skin lesions with high efficiency using the DC-AC attention-based architecture.",
        image: "https://via.placeholder.com/500x300/10B981/FFFFFF?text=DCACNet-CD",
        link: "https://github.com/Hasnain-Fatmi/DCACNet-CD",
        date: "Apr 2025"
      },
      {
        title: "JPEGIFY",
        description: "JPEG COMPRESSION, PYTHON, GUI. A full JPEG image compression and decompression system built from scratch in Python. Compresses grayscale and color images using standard JPEG techniques with adjustable quality and a custom .jpgc file format.",
        image: "https://via.placeholder.com/500x300/F59E0B/FFFFFF?text=JPEGIFY",
        link: "https://github.com/Hasnain-Fatmi/JPEGIFY",
        date: "Apr 2025"
      },
      {
        title: "JANWAR",
        description: "ATLAS MONGODB, EXPRESS, REACT, NODEJS. E-commerce platform for pet adoption and sales. Features: Post ads, buy/sell pets, purchase accessories, custom transactions.",
        image: "https://via.placeholder.com/500x300/EF4444/FFFFFF?text=JANWAR",
        link: "https://github.com/Hasnain-Fatmi/janwar.com",
        date: "May 2024"
      },
      {
        title: "HWCS",
        description: "KNN, PYTHON, GSCM. Handwriting-based writer identification system. Features: Image processing, feature extraction, model training, Django-based application.",
        image: "https://via.placeholder.com/500x300/8B5CF6/FFFFFF?text=HWCS",
        link: "https://github.com/Hasnain-Fatmi/HWCS",
        date: "Apr 2024"
      }
    ]
    this.currentSlide = 0
    this.init()
  }

  init() {
    this.loadProjects()
  }

  async loadProjects() {
    const loadingElement = document.getElementById("portfolioLoading")
    const carouselElement = document.getElementById("portfolioCarousel")

    // Simulate loading delay
    await new Promise((resolve) => setTimeout(resolve, 1200))

    this.renderProjects()
    this.bindCarouselEvents()

    loadingElement.style.display = "none"
    carouselElement.style.display = "block"
  }

  renderProjects() {
    const track = document.getElementById("carouselTrack")
    const dots = document.getElementById("carouselDots")

    //<img src="${project.image}" alt="${project.title}" class="project-image">
    // Render slides
    track.innerHTML = this.projects
      .map(
        (project, index) => `
            <div class="carousel-slide ${index === 0 ? "active" : ""}">
                <div class="project-content">
                    <div class="project-header">
                        <h3 class="project-title">${project.title}</h3>
                        <span class="project-date">${project.date}</span>
                    </div>
                    <p class="project-description">${project.description}</p>
                    ${project.isDemo 
                        ? `<button class="btn btn-primary btn-animated" onclick="scrollToSection('#contact')">
                            <i class="fas fa-play"></i> Request Demo
                           </button>`
                        : `<a href="${project.link}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-animated">
                            <i class="fab fa-github"></i> View on GitHub
                           </a>`
                    }
                </div>
            </div>
        `,
      )
      .join("")

    // Render dots
    dots.innerHTML = this.projects
      .map(
        (_, index) => `
            <div class="carousel-dot ${index === 0 ? "active" : ""}" data-slide="${index}"></div>
        `,
      )
      .join("")
  }

  bindCarouselEvents() {
    const prevBtn = document.getElementById("prevBtn")
    const nextBtn = document.getElementById("nextBtn")
    const dots = document.querySelectorAll(".carousel-dot")

    prevBtn.addEventListener("click", () => this.previousSlide())
    nextBtn.addEventListener("click", () => this.nextSlide())

    dots.forEach((dot) => {
      dot.addEventListener("click", () => {
        const slideIndex = Number.parseInt(dot.getAttribute("data-slide"))
        this.goToSlide(slideIndex)
      })
    })

    // Auto-play carousel
    this.autoPlay = setInterval(() => this.nextSlide(), 5000)

    // Pause auto-play on hover
    const carousel = document.getElementById("portfolioCarousel")
    carousel.addEventListener("mouseenter", () => clearInterval(this.autoPlay))
    carousel.addEventListener("mouseleave", () => {
      this.autoPlay = setInterval(() => this.nextSlide(), 5000)
    })
  }

  goToSlide(index) {
    this.currentSlide = index
    const track = document.getElementById("carouselTrack")
    const dots = document.querySelectorAll(".carousel-dot")
    const slides = document.querySelectorAll(".carousel-slide")

    track.style.transform = `translateX(-${index * 100}%)`

    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index)
    })

    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index)
    })
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.projects.length
    this.goToSlide(this.currentSlide)
  }

  previousSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.projects.length) % this.projects.length
    this.goToSlide(this.currentSlide)
  }
}
// Contact Form Management
class ContactManager {
  constructor() {
    this.form = document.getElementById("contactForm")
    
    // Use placeholders that will be replaced by GitHub Actions
    this.serviceId = "EMAILJS_SERVICE_ID_PLACEHOLDER"
    this.templateId = "EMAILJS_TEMPLATE_ID_PLACEHOLDER"
    this.publicKey = "EMAILJS_PUBLIC_KEY_PLACEHOLDER"
    
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

    // Show loading state
    submitBtn.classList.add("loading")
    submitBtn.disabled = true

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
      time: timeString // Add timestamp parameter
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

    // Reset button state
    submitBtn.classList.remove("loading")
    submitBtn.disabled = false
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
    // Hide loader after page load
    window.addEventListener("load", () => {
      setTimeout(() => {
        this.loader.style.opacity = "0"
        this.loader.style.visibility = "hidden"
      }, 1000)
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
  new PortfolioManager()
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
