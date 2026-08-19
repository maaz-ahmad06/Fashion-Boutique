# Premium Luxury Fashion Boutique

A complete, modern, and visually stunning frontend website for a high-fashion boutique. Modeled with an editorial design aesthetic inspired by luxury brand publications, the project uses **GSAP (GreenSock)**, **ScrollTrigger**, and **Lenis** to create buttery, cinematic scroll-linked storytelling experiences.

---

## ✨ Features & Sections

- ⏳ **Stylised Preloader**: Elegant loading sequence counting percentages with a letter-by-letter logo staggered reveal, ending in a clean curtain screen wipe.
- 🧥 **Hero Campaign**: Fullscreen editorial showcase using a GSAP entrance timeline for staggering typography, fading tags, and background scale adjustments.
- 📖 **Brand Narrative**: Split-screen brand story featuring text mask entries and overlapping portrait frames with scroll-based speed parallax.
- 🛍️ **Curation Grid**: Sleek 4-column product grid complete with hover scale adjustments, detail overlay reveals, and stagger-ins on scroll trigger.
- 🎞️ **Horizontal Editorial Showcase**: A pinned horizontal scroll-reveal track driven by vertical scrub, displaying detailed editorial collection highlights.
- 📐 **Lookbook Masonry**: Asymmetric multi-column masonry style collage highlighting detailed poses, fabrics, and textures.
- 💬 **Testimonial Slider**: Seamless vertical lift transition carousel for user quotes.
- ✉️ **Avant-Garde CTA**: Floating gradient box for collection newsletters with custom input focus transition markers.

---

## 🛠️ Technology Stack

- **Foundational**: HTML5 (Semantic Structure) & CSS3 (Custom Design System, variables & layouts)
- **Programming Logic**: JavaScript ES6+ (Native state management and interactions)
- **Animation Framework**: GSAP 3 (GreenSock Animation Platform)
- **Scroll Tracking**: GSAP ScrollTrigger plugin (Parallax, scrubbing, pinning)
- **Smooth Damping**: Lenis Scroll Engine (Buttery damping control, synced to GSAP ticker)
- **CDNs**: Fast script deliveries via Cloudflare & Unpkg

---

## 📂 File Architecture

```text
├── index.html        # Main HTML file structured with semantic sections
├── style.css         # Minimal luxury design system variables, grids, & overlays
├── script.js        # Core GSAP timelines, horizontal triggers, and fallback controls
└── assets/
    └── images/       # High-fashion generated editorial image assets
        ├── hero_model.jpg
        ├── about_arch.jpg
        ├── featured_1.jpg
        ├── featured_2.jpg
        ├── featured_3.jpg
        └── lookbook_1.jpg
```

---

## 🚀 Getting Started

### Prerequisites
To run the files smoothly locally, we recommend using a simple static web server. This avoids browser permission errors (CORS issues) when fetching files directly from the local disk layout.

### Running Locally
1. Clone the repository:
   ```bash
   git clone https://github.com/maaz-ahmad06/Fashion-Boutique.git
   cd Fashion-Boutique
   ```

2. Run a simple static server (e.g., using Node's `http-server` or Python):
   - **Using Node (NPM)**:
     ```bash
     npx http-server -p 8080
     ```
   - **Using Python**:
     ```bash
     python -m http.server 8080
     ```

3. Open your browser and navigate to:
   ```
   http://localhost:8080
   ```

---

## 🎨 Design Guidelines

- **Typography**: Headings use serif *Cormorant Garamond* / *Cinzel Decorative* for a premium, tall character look. Controls and descriptive tags utilize geometric sans-serif *Jost* / *Montserrat*.
- **Color Scheme**: Backed by a warm alabaster cream background (`#FAF8F5`) offset by rich obsidian charcoal (`#0A0A0A`) text layout,champagne beige cards (`#F2EDE4`), and brushed gold details (`#C5A880`).
- **Defensive Performance**: `script.js` checks if GSAP or Lenis failed to load due to offline setups, automatically falling back to clean CSS default layout overrides and standard browser smooth scroll behaviors.
