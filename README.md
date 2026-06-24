# 🍔 Burger Bing | Premium Gourmet Burgers

[![GitHub Pages Deployment](https://img.shields.io/github/actions/workflow/status/Samyak2501/BurgerWeb/deploy.yml?branch=master&label=Live%20Status&style=for-the-badge)](https://Samyak2501.github.io/BurgerWeb/)
[![Tech Stack](https://img.shields.io/badge/Tech_Stack-HTML5_|_CSS3_|_JavaScript-E34F26?style=for-the-badge&logo=html5&logoColor=white)](#)
[![Animation](https://img.shields.io/badge/Animations-GSAP_3D-green?style=for-the-badge&logo=greensock&logoColor=white)](#)
[![Build Tool](https://img.shields.io/badge/Build_Tool-Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](#)

Welcome to **Burger Bing**, a premium, visually stunning single-page web experience showcasing award-winning gourmet burgers. Designed with high-performance animations, fluid responsive design, and dynamic interactive elements to deliver a premium user experience.

🔗 **Live Website:** [Samyak2501.github.io/BurgerWeb](https://Samyak2501.github.io/BurgerWeb/)

---

## ✨ Features

- **💫 GSAP Pinned Page Slider:** Features an interactive multi-directional page slider. Transition horizontally between hero burger recipes and scroll vertically to traverse full-page sections smoothly.
- **🍔 Interactive 3D Burger Floating:** Subtle premium 3D tilt micro-interactions on the active burger hover driven by GSAP to create depth.
- **✨ Glassmorphism & Modern Styling:** Implements polished glassmorphic header accents, rich HSL gradient colors, and sleek transitions tailored for a premium feel.
- **📋 Value Proposition Cards:** Modern hover zoom effects, subtle dark overlays, and clean typography highlighting our key pillars (patty prep, house sauces, fast delivery, ingredients transparency).
- **⭐ Responsive Testimonials:** A custom carousel that adjusts intelligently to screen sizes:
  - **Desktop:** Displays a sleek multi-card inline scrollable layout.
  - **Tablet & Mobile:** Automatically converts to a beautifully spaced 2x2 grid to prevent slim cards and text cut-off, ensuring total readability.
- **📞 Responsive Contact Hub:** Clear and organized company info grouped with interactive email, table reservation, and phone links.

---

## 🛠️ Tech Stack & Libraries

- **Core:** HTML5, Vanilla CSS3, JavaScript (ES6+)
- **Build Server:** [Vite](https://vitejs.dev/) (v5.x)
- **Animations:** [GSAP](https://greensock.com/gsap/) & [ScrollTrigger](https://greensock.com/scrolltrigger/)
- **Icons:** [Lucide Icons](https://lucide.dev/)
- **Typography:** Google Fonts (*Lilita One* & *Outfit*)

---

## 🚀 Installation & Local Setup

Get the project running locally in just a few steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Samyak2501/BurgerWeb.git
   cd BurgerWeb
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run local development server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173/` in your browser.

4. **Build production bundle:**
   ```bash
   npm run build
   ```

---

## 📂 Code Structure

```
├── .github/workflows/   # Automated CI/CD Pages deployment
│   └── deploy.yml
├── node_modules/        # Development dependencies
├── index.html           # Core HTML structure
├── style.css            # Custom CSS stylesheet & responsive breakpoints
├── app.js               # Slider animation controller & responsive listeners
├── vite.config.js       # Vite build configurations
├── package.json         # Scripts and project dependencies
├── *.png                # High-definition visual assets (burgers, ingredients)
└── README.md            # Interactive repository documentation
```

---

## 🎨 Design System

- **Harmonious Palettes:** Sleek dark panels, vibrant gold (`#ffb81c`), warm orange (`#e06014`), and crimson red (`#8b263e`).
- **Premium Typography:** Clean layouts with `Outfit` for body text and punchy, bold `Lilita One` headings.
- **Subtle Animations:** Micro-feedback animations on chili icons, hover states, button transitions, and card lifts.

---

*Crafted with ❤️ by Samyak Jain.*
