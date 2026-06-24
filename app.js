// Initialize Lucide Icons
lucide.createIcons();

// DOM Elements
const burger1 = document.querySelector('[data-slide="1"]');
const burger2 = document.querySelector('[data-slide="2"]');
const burger3 = document.querySelector('[data-slide="3"]');

const text1 = document.querySelector('.burger-text-group[data-burger="1"]');
const text2 = document.querySelector('.burger-text-group[data-burger="2"]');
const text3 = document.querySelector('.burger-text-group[data-burger="3"]');

const textGroups = [text1, text2, text3];
const burgers = [burger1, burger2, burger3];

// Slider State variables
let currentSlide = 0;
let isAnimating = false;

// Coordinates & Background Colors definitions for all three slides
const slidesData = [
  {
    bg: "#ffb81c", // Slide 1: Golden Yellow
    desktop: [
      { left: "60%", scale: 1, filter: "blur(0px)", opacity: 1, zIndex: 10, rotation: 0 },
      { left: "88%", scale: 0.6, filter: "blur(8px)", opacity: 0.5, zIndex: 5, rotation: 15 },
      { left: "120%", scale: 0.4, filter: "blur(12px)", opacity: 0, zIndex: 1, rotation: 30 }
    ],
    mobile: [
      { left: "50%", scale: 1, filter: "blur(0px)", opacity: 1, zIndex: 10, rotation: 0 },
      { left: "115%", scale: 0.65, filter: "blur(4px)", opacity: 0.4, zIndex: 5, rotation: 15 },
      { left: "160%", scale: 0.5, filter: "blur(8px)", opacity: 0, zIndex: 1, rotation: 30 }
    ]
  },
  {
    bg: "#e06014", // Slide 2: Ember Orange
    desktop: [
      { left: "25%", scale: 0.6, filter: "blur(8px)", opacity: 0.5, zIndex: 5, rotation: -15 },
      { left: "60%", scale: 1, filter: "blur(0px)", opacity: 1, zIndex: 10, rotation: 0 },
      { left: "88%", scale: 0.6, filter: "blur(8px)", opacity: 0.5, zIndex: 5, rotation: 15 }
    ],
    mobile: [
      { left: "-15%", scale: 0.65, filter: "blur(4px)", opacity: 0.4, zIndex: 5, rotation: -15 },
      { left: "50%", scale: 1, filter: "blur(0px)", opacity: 1, zIndex: 10, rotation: 0 },
      { left: "115%", scale: 0.65, filter: "blur(4px)", opacity: 0.4, zIndex: 5, rotation: 15 }
    ]
  },
  {
    bg: "#8b263e", // Slide 3: Crimson Red
    desktop: [
      { left: "-20%", scale: 0.4, filter: "blur(12px)", opacity: 0, zIndex: 1, rotation: -30 },
      { left: "25%", scale: 0.6, filter: "blur(8px)", opacity: 0.5, zIndex: 5, rotation: -15 },
      { left: "60%", scale: 1, filter: "blur(0px)", opacity: 1, zIndex: 10, rotation: 0 }
    ],
    mobile: [
      { left: "-60%", scale: 0.5, filter: "blur(8px)", opacity: 0, zIndex: 1, rotation: -30 },
      { left: "-15%", scale: 0.65, filter: "blur(4px)", opacity: 0.4, zIndex: 5, rotation: -15 },
      { left: "50%", scale: 1, filter: "blur(0px)", opacity: 1, zIndex: 10, rotation: 0 }
    ]
  }
];

// Set initial states
function setInitialStates() {
  const isDesktop = window.innerWidth >= 992;
  const initialData = slidesData[0];
  const burgerStates = isDesktop ? initialData.desktop : initialData.mobile;

  // Set initial background color
  gsap.set(".split-bg-right", { backgroundColor: initialData.bg });

  // Set initial text states
  gsap.set(text1, { opacity: 1, y: 0 });
  gsap.set(text2, { opacity: 0, y: 30 });
  gsap.set(text3, { opacity: 0, y: 30 });

  text1.classList.add('active');
  text2.classList.remove('active');
  text3.classList.remove('active');

  // Set initial burger layouts
  burgers.forEach((burger, i) => {
    const state = burgerStates[i];
    gsap.set(burger, {
      left: state.left,
      scale: state.scale,
      filter: state.filter,
      opacity: state.opacity,
      zIndex: state.zIndex,
      rotation: state.rotation
    });
    burger.classList.toggle('burger-active', i === 0);
  });
}

setInitialStates();

// Helper to animate Hero layouts (Burgers + Text groups)
function updateHeroLayout(index, prevIndex) {
  const isDesktop = window.innerWidth >= 992;
  const slideData = slidesData[index];
  const burgerStates = isDesktop ? slideData.desktop : slideData.mobile;

  // A. Animate background color
  gsap.to(".split-bg-right", {
    backgroundColor: slideData.bg,
    duration: 0.8,
    ease: "power2.inOut"
  });

  // B. Animate burgers
  burgers.forEach((burger, i) => {
    const state = burgerStates[i];

    // Toggle active class (triggers float animations in CSS)
    burger.classList.toggle('burger-active', i === index);

    // Set z-index immediately if rising, or with delay if lowering to prevent clipping
    if (state.zIndex > gsap.getProperty(burger, "zIndex")) {
      gsap.set(burger, { zIndex: state.zIndex });
    }

    gsap.to(burger, {
      left: state.left,
      scale: state.scale,
      filter: state.filter,
      opacity: state.opacity,
      rotation: state.rotation,
      duration: 0.8,
      ease: "power2.inOut",
      onComplete: () => {
        gsap.set(burger, { zIndex: state.zIndex });
      }
    });
  });

  // C. Animate text cross-fade
  textGroups.forEach((group, i) => {
    const isActive = i === index;

    if (isActive) {
      group.classList.add('active');
      gsap.fromTo(group,
        { opacity: 0, y: index > prevIndex ? 30 : -30 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", delay: 0.2 }
      );
    } else if (i === prevIndex || (prevIndex === 3 && group.classList.contains('active'))) {
      gsap.to(group, {
        opacity: 0,
        y: index > prevIndex ? -30 : 30,
        duration: 0.4,
        ease: "power2.in",
        onComplete: () => {
          group.classList.remove('active');
        }
      });
    } else {
      group.classList.remove('active');
      gsap.set(group, { opacity: 0, y: 30 });
    }
  });
}

// Main Slide transition handler
function goToSlide(index) {
  if (index < 0 || index > 5 || isAnimating) return;

  const prevIndex = currentSlide;
  currentSlide = index;
  isAnimating = true;

  // 1. Sync Navigation Links
  const links = {
    menu: document.querySelector('.nav-link[href="#menu"]'),
    about: document.querySelector('.nav-link[href="#about"]'),
    delivery: document.querySelector('.nav-link[href="#delivery"]'),
    contact: document.querySelector('.nav-link[href="#contact"]')
  };

  Object.values(links).forEach(link => link?.classList.remove('active'));

  if (index < 3) {
    links.menu?.classList.add('active');
  } else if (index === 3) {
    links.about?.classList.add('active');
  } else if (index === 4) {
    links.delivery?.classList.add('active');
  } else if (index === 5) {
    links.contact?.classList.add('active');
  }

  // 2. Handle Vertical vs Horizontal Slide Transitions
  if (index >= 3 || prevIndex >= 3) {
    // Vertical Page Transition (Slide up to Section 2/3/4 / Slide down to Hero)
    let targetYPercent = 0;
    if (index === 3) targetYPercent = -25;
    else if (index === 4) targetYPercent = -50;
    else if (index === 5) targetYPercent = -75;

    gsap.to(".page-slider", {
      yPercent: targetYPercent,
      duration: 0.8,
      ease: "power2.inOut",
      onComplete: () => {
        isAnimating = false;
      }
    });

    // If sliding back down from Section 2/3/4 to a specific hero slide, update the hero layout too!
    if (index < 3) {
      updateHeroLayout(index, prevIndex);
    }
  } else {
    // Horizontal transitions between Slide 1, 2, 3 inside Hero Section
    updateHeroLayout(index, prevIndex);

    // Unlock animations after transition completes
    gsap.delayedCall(0.8, () => {
      isAnimating = false;
    });
  }
}

// Bind Navigation clicks to programmatic sliding
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (href === '#menu') {
      e.preventDefault();
      goToSlide(0);
    } else if (href === '#about') {
      e.preventDefault();
      goToSlide(3);
    } else if (href === '#delivery') {
      e.preventDefault();
      goToSlide(4);
    } else if (href === '#contact') {
      e.preventDefault();
      goToSlide(5);
    }
  });
});

// Re-adjust slider layout on resize (so burgers are repositioned appropriately if breakpoint changes)
let currentBreakpoint = window.innerWidth >= 992;
window.addEventListener('resize', () => {
  const isDesktop = window.innerWidth >= 992;
  if (isDesktop !== currentBreakpoint) {
    currentBreakpoint = isDesktop;
    // Instantly reset burger positions according to the current slide and new breakpoint (only if inside hero)
    if (currentSlide < 3) {
      const burgerStates = isDesktop ? slidesData[currentSlide].desktop : slidesData[currentSlide].mobile;
      burgers.forEach((burger, i) => {
        const state = burgerStates[i];
        gsap.set(burger, {
          left: state.left,
          scale: state.scale,
          filter: state.filter,
          opacity: state.opacity,
          zIndex: state.zIndex,
          rotation: state.rotation
        });
      });
    }
  }
});

/* ==========================================================================
   Gesture Event Listeners
   ========================================================================== */

// 1. Mouse Wheel / Trackpad Scrolling
let wheelAccumulator = 0;
window.addEventListener('wheel', (e) => {
  if (isAnimating) return;
  
  wheelAccumulator += e.deltaY;
  
  // Threshold to trigger slide transition
  if (Math.abs(wheelAccumulator) >= 40) {
    if (wheelAccumulator > 0) {
      if (currentSlide < 5) goToSlide(currentSlide + 1);
    } else {
      if (currentSlide > 0) goToSlide(currentSlide - 1);
    }
    wheelAccumulator = 0; // Reset accumulator
  }
}, { passive: true });

// Reset wheel accumulator periodically to prevent accumulated lag
setInterval(() => {
  if (!isAnimating) wheelAccumulator = 0;
}, 300);

// 2. Mobile Swipe Gestures
let touchStartY = 0;
window.addEventListener('touchstart', (e) => {
  touchStartY = e.touches[0].clientY;
}, { passive: true });

window.addEventListener('touchend', (e) => {
  if (isAnimating) return;
  
  const touchEndY = e.changedTouches[0].clientY;
  const diffY = touchStartY - touchEndY;

  // Swipe up (scroll down) -> Next
  if (diffY > 40) {
    if (currentSlide < 5) goToSlide(currentSlide + 1);
  }
  // Swipe down (scroll up) -> Prev
  else if (diffY < -40) {
    if (currentSlide > 0) goToSlide(currentSlide - 1);
  }
}, { passive: true });

// 3. Keyboard Arrow Key Navigation
window.addEventListener('keydown', (e) => {
  if (isAnimating) return;
  
  if (e.key === 'ArrowDown' || e.key === 'PageDown') {
    if (currentSlide < 5) goToSlide(currentSlide + 1);
  } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
    if (currentSlide > 0) goToSlide(currentSlide - 1);
  }
});

/* ==========================================================================
   3D Tilt Effect on Burger Hover (Subtle premium micro-interaction)
   ========================================================================== */
const burgerWrappers = document.querySelectorAll('.burger-float-wrapper');
burgerWrappers.forEach(wrapper => {
  const img = wrapper.querySelector('.burger-image');
  if (!img) return;

  wrapper.addEventListener('mousemove', (e) => {
    // Only apply hover tilt to the active burger
    const parentSlide = wrapper.closest('.burger-slide');
    if (!parentSlide || !parentSlide.classList.contains('burger-active')) return;

    const rect = wrapper.getBoundingClientRect();
    const x = e.clientX - rect.left - (rect.width / 2);
    const y = e.clientY - rect.top - (rect.height / 2);
    
    // Max tilt is 12 degrees
    const tiltX = (y / (rect.height / 2)) * -12;
    const tiltY = (x / (rect.width / 2)) * 12;

    gsap.to(img, {
      transform: `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.05)`,
      duration: 0.1,
      ease: "power1.out"
    });
  });

  wrapper.addEventListener('mouseleave', () => {
    gsap.to(img, {
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
      duration: 0.3,
      ease: "power2.out"
    });
  });
});

/* ==========================================================================
   Testimonial Slider JS Controller
   ========================================================================== */
function initTestimonialSlider() {
  const track = document.querySelector('.testimonials-track');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  const dotsContainer = document.querySelector('.testimonials-dots');
  const cards = document.querySelectorAll('.testimonial-card-wrapper');
  
  if (!track || !prevBtn || !nextBtn || cards.length === 0) return;
  
  let currentTestimonialIndex = 0;
  
  function getSliderMetrics() {
    const isTabletOrMobile = window.innerWidth < 992;
    const visibleCols = isTabletOrMobile ? 2 : (window.innerWidth >= 1200 ? 5 : 4);
    const totalCols = isTabletOrMobile ? Math.ceil(cards.length / 2) : cards.length;
    return { visibleCols, totalCols };
  }
  
  function updateSliderPosition() {
    const { visibleCols, totalCols } = getSliderMetrics();
    const translation = currentTestimonialIndex * (100 / visibleCols);
    
    gsap.to(track, {
      xPercent: -translation,
      duration: 0.6,
      ease: "power2.out"
    });
    
    // Sync dots active state
    const dots = dotsContainer.querySelectorAll('.dot');
    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === currentTestimonialIndex);
    });
    
    // Sync arrows disabled state
    prevBtn.disabled = currentTestimonialIndex === 0;
    nextBtn.disabled = currentTestimonialIndex >= totalCols - visibleCols;
  }
  
  function buildDots() {
    if (!dotsContainer) return;
    dotsContainer.innerHTML = '';
    const { visibleCols, totalCols } = getSliderMetrics();
    const totalDots = totalCols - visibleCols + 1;
    
    for (let i = 0; i < totalDots; i++) {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      if (i === currentTestimonialIndex) dot.classList.add('active');
      dot.addEventListener('click', () => {
        currentTestimonialIndex = i;
        updateSliderPosition();
      });
      dotsContainer.appendChild(dot);
    }
  }
  
  // Set up Arrow clicks
  prevBtn.addEventListener('click', () => {
    if (currentTestimonialIndex > 0) {
      currentTestimonialIndex--;
      updateSliderPosition();
    }
  });
  
  nextBtn.addEventListener('click', () => {
    const { visibleCols, totalCols } = getSliderMetrics();
    if (currentTestimonialIndex < totalCols - visibleCols) {
      currentTestimonialIndex++;
      updateSliderPosition();
    }
  });
  
  // Initialize dots and position
  buildDots();
  updateSliderPosition();
  
  // Handle resize to adjust visibleCards count
  let lastWidth = window.innerWidth;
  window.addEventListener('resize', () => {
    const isTabletOrMobileNow = window.innerWidth < 992;
    const isTabletOrMobileBefore = lastWidth < 992;
    const isDesktopNow = window.innerWidth >= 1200;
    const isDesktopBefore = lastWidth >= 1200;
    
    if (isTabletOrMobileNow !== isTabletOrMobileBefore || isDesktopNow !== isDesktopBefore) {
      lastWidth = window.innerWidth;
      const { visibleCols, totalCols } = getSliderMetrics();
      
      const maxIndex = totalCols - visibleCols;
      if (currentTestimonialIndex > maxIndex) {
        currentTestimonialIndex = maxIndex;
      }
      
      buildDots();
      updateSliderPosition();
    }
  });
}

// Run testimonials slider initialization
document.addEventListener('DOMContentLoaded', () => {
  initTestimonialSlider();
});
if (document.readyState === 'interactive' || document.readyState === 'complete') {
  initTestimonialSlider();
}

// Preloader Controller
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;

  // Enforce a minimum display time of 2 seconds for visual continuity and smooth loading experience
  const minLoadingTime = 2000;
  const timeSpent = performance.now();
  const delay = Math.max(0, minLoadingTime - timeSpent);

  setTimeout(() => {
    gsap.to(preloader, {
      opacity: 0,
      scale: 1.08,
      duration: 0.6,
      ease: "power2.inOut",
      onComplete: () => {
        preloader.style.display = 'none';
      }
    });
  }, delay);
});
