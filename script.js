/* ----------------------------------------------------
   VALOIR FASHION BOUTIQUE - INTERACTION & ANIMATIONS
---------------------------------------------------- */

// Register GSAP Plugins
if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

document.addEventListener("DOMContentLoaded", () => {
  // If GSAP is missing (e.g., offline or network error), immediately clear the preloader overlay
  if (typeof gsap === "undefined") {
    console.error("GSAP is not loaded. Animations and preloader disabled.");
    const preloader = document.getElementById("preloader");
    if (preloader) {
      preloader.style.display = "none";
    }
    document.body.style.overflow = "auto";
    return;
  }

  initSmoothScroll();
  initPreloader();
  initHeader();
  initAboutParallax();
  initCollectionsReveal();
  initHorizontalScroll();
  initLookbookParallax();
  initTestimonials();
  initNewsletterReveal();
  initMobileMenu();
  initSearchAndCart();
});

/* --- 1. Smooth Scroll (Lenis) --- */
let lenis;
function initSmoothScroll() {
  if (typeof Lenis === "undefined") {
    console.warn("Lenis smooth scroll library is not loaded. Falling back to native scrolling.");
    return;
  }

  try {
    lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Smooth exponential ease
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    // Connect Lenis to ScrollTrigger
    if (typeof ScrollTrigger !== "undefined") {
      lenis.on("scroll", ScrollTrigger.update);
    }
    
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    
    gsap.ticker.lagSmoothing(0);
  } catch (error) {
    console.error("Failed to initialize Lenis smooth scroll:", error);
  }
}

/* --- 2. Stylish GSAP Preloader --- */
function initPreloader() {
  const loaderTimeline = gsap.timeline({
    onComplete: () => {
      // Allow scroll after preloader ends
      document.body.style.overflow = "auto";
      // Trigger Hero Entrance Animation
      initHeroEntrance();
    }
  });

  // Temporarily disable scrolling during loading
  document.body.style.overflow = "hidden";

  let count = { val: 0 };
  
  // Animate Percentage Countdown
  loaderTimeline.to(count, {
    val: 100,
    duration: 2.8,
    ease: "power2.out",
    onUpdate: () => {
      document.getElementById("loader-percent").innerText = 
        Math.floor(count.val).toString().padStart(2, "0") + "%";
    }
  });

  // Stagger reveal of Logo letters
  loaderTimeline.to("#loader-logo span", {
    y: "0%",
    stagger: 0.1,
    duration: 1.2,
    ease: "power4.out"
  }, "-=2.4");

  // Animate Loader Bar Scale
  loaderTimeline.to(".preloader-bar", {
    scaleX: 1,
    duration: 2.8,
    ease: "power2.inOut"
  }, "-=2.8");

  // Dual Curtain Screen Wipe Animation
  loaderTimeline.to(".preloader-bg-overlay", {
    scaleY: 1,
    duration: 0.5,
    ease: "power3.in"
  }, "-=0.3");

  loaderTimeline.to("#preloader", {
    yPercent: -100,
    duration: 0.8,
    ease: "power4.inOut"
  });

  // Fade out curtain overlay line
  loaderTimeline.to(".preloader-bg-overlay", {
    opacity: 0,
    duration: 0.1
  });
}

/* --- 3. Hero Entrance Timeline --- */
function initHeroEntrance() {
  const heroTl = gsap.timeline();

  // Zoom out background image slightly for a cinematic reveal
  heroTl.to("#hero-bg-img", {
    scale: 1,
    duration: 2.5,
    ease: "power3.out"
  }, 0);

  // Stagger fade and slide down of header elements
  heroTl.from("header", {
    y: -40,
    opacity: 0,
    duration: 1.4,
    ease: "power3.out"
  }, 0.4);

  // Reveal hero campaign tag details
  heroTl.to("#hero-sub", {
    opacity: 1,
    y: 0,
    duration: 1.2,
    ease: "power3.out"
  }, 0.6);

  // Mask reveal main serif title
  heroTl.to("#hero-main-title", {
    y: "0%",
    duration: 1.5,
    ease: "power4.out"
  }, 0.8);

  // Mask reveal editorial tagline
  heroTl.to("#hero-tag", {
    y: "0%",
    duration: 1.3,
    ease: "power3.out"
  }, 1.0);

  // Slide up boutique CTA button
  heroTl.to("#hero-btn-wrap", {
    opacity: 1,
    y: 0,
    duration: 1.2,
    ease: "power3.out"
  }, 1.2);

  // Smooth fade-in scroll down prompt
  heroTl.from("#scroll-prompt", {
    opacity: 0,
    y: 20,
    duration: 1.2,
    ease: "power3.out"
  }, 1.6);
}

/* --- 4. Header Scroll Behaviors --- */
function initHeader() {
  window.addEventListener("scroll", () => {
    const header = document.getElementById("main-header");
    if (window.scrollY > 60) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // Scroll to anchor smooth integration
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        if (lenis) {
          lenis.scrollTo(targetElement, {
            offset: -80, // Offset for sticky navbar
            duration: 1.2
          });
        } else {
          // Native scroll fallback
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - 80;
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
      }
    });
  });

  // Prompt scroll action
  document.getElementById("scroll-prompt").addEventListener("click", () => {
    const targetElement = document.getElementById("about");
    if (targetElement) {
      if (lenis) {
        lenis.scrollTo(targetElement, {
          offset: -80,
          duration: 1.2
        });
      } else {
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - 80;
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    }
  });
}

/* --- 5. Brand Story Scroll Parallax --- */
function initAboutParallax() {
  // Fade and lift textual narrative
  gsap.from(".about-text-column", {
    scrollTrigger: {
      trigger: ".about",
      start: "top 75%",
      toggleActions: "play none none none"
    },
    opacity: 0,
    y: 60,
    duration: 1.4,
    ease: "power3.out"
  });

  // Parallax translation on overlapping image layers
  gsap.to("#about-main-image", {
    yPercent: -15,
    ease: "none",
    scrollTrigger: {
      trigger: "#about-images-container",
      start: "top bottom",
      end: "bottom top",
      scrub: true
    }
  });

  gsap.to("#about-sub-image", {
    yPercent: -28,
    ease: "none",
    scrollTrigger: {
      trigger: "#about-images-container",
      start: "top bottom",
      end: "bottom top",
      scrub: true
    }
  });
}

/* --- 6. Collections Cards Stagger Reveal --- */
function initCollectionsReveal() {
  gsap.from(".product-card", {
    scrollTrigger: {
      trigger: ".products-grid",
      start: "top 80%",
      toggleActions: "play none none none"
    },
    opacity: 0,
    y: 60,
    duration: 1.2,
    stagger: 0.18,
    ease: "power3.out"
  });
}

/* --- 7. Featured Horizontal Showcase (Pin + Scrub) --- */
function initHorizontalScroll() {
  const container = document.getElementById("featured");
  const track = document.getElementById("horizontal-scroll-track");

  if (!container || !track) return;

  // Calculate required horizontal translation distance
  function getScrollAmount() {
    const trackWidth = track.scrollWidth;
    const containerWidth = container.offsetWidth;
    // Slide distance = Total width of scrollable track minus part of viewport
    return trackWidth - (containerWidth * 0.55);
  }

  // Create horizontal pinning ScrollTrigger
  const horizScroll = gsap.to(track, {
    x: () => -getScrollAmount(),
    ease: "none",
    scrollTrigger: {
      trigger: container,
      pin: true,
      scrub: 1.2,
      start: "top top",
      end: () => `+=${getScrollAmount()}`,
      invalidateOnRefresh: true, // Recalculates on screen resize
    }
  });

  // Dynamic image scaling parallax effect inside horizontal track
  const showcaseImgs = gsap.utils.toArray(".showcase-img-container img");
  showcaseImgs.forEach((img) => {
    gsap.fromTo(img, {
      xPercent: -2
    }, {
      xPercent: 2,
      ease: "none",
      scrollTrigger: {
        trigger: img.closest(".showcase-item"),
        containerAnimation: horizScroll, // Sync with parent horizontal scroll trigger
        start: "left right",
        end: "right left",
        scrub: true
      }
    });
  });
}

/* --- 8. Lookbook Grid Parallax & Stagger --- */
function initLookbookParallax() {
  // Stagger lift for each asymmetrical Lookbook Column
  gsap.from(".lookbook-column", {
    scrollTrigger: {
      trigger: ".lookbook-grid",
      start: "top 78%",
      toggleActions: "play none none none"
    },
    opacity: 0,
    y: 80,
    duration: 1.5,
    stagger: 0.25,
    ease: "power3.out"
  });

  // Apply parallax shift to images within lookbook cards
  const items = gsap.utils.toArray(".lookbook-item");
  items.forEach((item) => {
    const img = item.querySelector("img");
    if (!img) return;

    gsap.fromTo(img, {
      yPercent: -8
    }, {
      yPercent: 8,
      ease: "none",
      scrollTrigger: {
        trigger: item,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });
  });
}

/* --- 9. Testimonials Carousel --- */
function initTestimonials() {
  const slides = document.querySelectorAll(".testimonial-slide");
  const nextBtn = document.getElementById("next-testimonial");
  const prevBtn = document.getElementById("prev-testimonial");
  
  if (slides.length === 0) return;

  let activeIndex = 0;
  let isTransitioning = false;

  function showSlide(index) {
    if (isTransitioning || index === activeIndex) return;
    isTransitioning = true;

    const currentSlide = slides[activeIndex];
    const nextSlide = slides[index];

    // Fade out active slide
    gsap.to(currentSlide, {
      opacity: 0,
      y: -15,
      duration: 0.4,
      onComplete: () => {
        currentSlide.classList.remove("active");
        currentSlide.style.visibility = "hidden";
        
        // Setup next slide position and visibility
        nextSlide.style.visibility = "visible";
        nextSlide.classList.add("active");
        
        // Fade in next slide
        gsap.fromTo(nextSlide, 
          { opacity: 0, y: 15 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 0.6, 
            ease: "power2.out",
            onComplete: () => {
              activeIndex = index;
              isTransitioning = false;
            }
          }
        );
      }
    });
  }

  nextBtn.addEventListener("click", () => {
    let nextIndex = (activeIndex + 1) % slides.length;
    showSlide(nextIndex);
  });

  prevBtn.addEventListener("click", () => {
    let prevIndex = (activeIndex - 1 + slides.length) % slides.length;
    showSlide(prevIndex);
  });
}

/* --- 10. Newsletter CTA Box Reveal --- */
function initNewsletterReveal() {
  gsap.from(".newsletter-box", {
    scrollTrigger: {
      trigger: ".newsletter",
      start: "top 78%",
      toggleActions: "play none none none"
    },
    opacity: 0,
    scale: 0.96,
    y: 50,
    duration: 1.4,
    ease: "power3.out"
  });
}

/* --- 11. Mobile Responsive Menu --- */
function initMobileMenu() {
  const hamburger = document.getElementById("hamburger-btn");
  const navMenu = document.getElementById("nav-menu");

  if (!hamburger || !navMenu) return;

  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    hamburger.classList.toggle("active");
    
    // Toggle body scroll locking when mobile navigation is active
    if (navMenu.classList.contains("active")) {
      document.body.style.overflow = "hidden";
      if (lenis) lenis.stop();
    } else {
      document.body.style.overflow = "auto";
      if (lenis) lenis.start();
    }
  });

  // Close hamburger overlay when navigating to sections
  document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
      hamburger.classList.remove("active");
      document.body.style.overflow = "auto";
      if (lenis) lenis.start();
    });
  });
}

/* --- 12. Search Overlay & Cart Drawer Logic --- */
function initSearchAndCart() {
  const searchOverlay = document.getElementById("search-overlay");
  const searchTrigger = document.getElementById("search-trigger");
  const searchClose = document.getElementById("search-close-btn");
  const searchInput = document.getElementById("search-input");

  if (searchTrigger && searchOverlay) {
    searchTrigger.addEventListener("click", (e) => {
      e.preventDefault();
      searchOverlay.classList.add("active");
      if (lenis) lenis.stop();
      if (searchInput) {
        setTimeout(() => searchInput.focus(), 300);
      }
    });
  }

  if (searchClose && searchOverlay) {
    searchClose.addEventListener("click", () => {
      searchOverlay.classList.remove("active");
      if (lenis) lenis.start();
    });
  }

  const cartTrigger = document.getElementById("cart-trigger");
  const cartDrawer = document.getElementById("cart-drawer");
  const cartClose = document.getElementById("cart-close-btn");
  const cartOverlay = document.getElementById("cart-overlay");

  if (cartTrigger && cartDrawer && cartOverlay) {
    cartTrigger.addEventListener("click", (e) => {
      e.preventDefault();
      cartDrawer.classList.add("active");
      cartOverlay.classList.add("active");
      if (lenis) lenis.stop();
    });
  }

  const closeCart = () => {
    if (cartDrawer) cartDrawer.classList.remove("active");
    if (cartOverlay) cartOverlay.classList.remove("active");
    if (lenis) lenis.start();
  };

  if (cartClose) {
    cartClose.addEventListener("click", closeCart);
  }
  if (cartOverlay) {
    cartOverlay.addEventListener("click", closeCart);
  }
}
