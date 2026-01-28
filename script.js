// Theme Toggle
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.querySelector(".theme-icon");
const body = document.body;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem("theme") || "light";
body.setAttribute("data-theme", currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener("click", () => {
  const currentTheme = body.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  body.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  updateThemeIcon(newTheme);

  // Force navbar to update its appearance immediately
  const navbar = document.getElementById("navbar");
  navbar.style.transition = "all 0.5s ease";
});

function updateThemeIcon(theme) {
  if (theme === "dark") {
    themeIcon.classList.remove("ri-moon-fill");
    themeIcon.classList.add("ri-sun-fill");
  } else {
    themeIcon.classList.remove("ri-sun-fill");
    themeIcon.classList.add("ri-moon-fill");
  }
}

// Mobile Navigation - Updated
const hamburger = document.getElementById("hamburger");
const navCenter = document.querySelector(".nav-center");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navCenter.classList.toggle("active");

  const icon = hamburger.querySelector("i");
  if (hamburger.classList.contains("active")) {
    icon.classList.remove("ri-menu-line");
    icon.classList.add("ri-close-line");
  } else {
    icon.classList.remove("ri-close-line");
    icon.classList.add("ri-menu-line");
  }
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navCenter.classList.remove("active");
  });
});

// Typing Animation
const typingText = document.getElementById("typing-text");
const roles = [
  "Full Stack Developer",
  "Data Structures Algorithm",
  "Open Source Contributor",
  "Creative Coder",
  "Artificial Intelligence Enthusiast",
  "Data Science Learner",
  "Machine Learning Explorer",
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeRole() {
  const currentRole = roles[roleIndex];

  if (isDeleting) {
    typingText.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
    typingSpeed = 50;
  } else {
    typingText.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
    typingSpeed = 100;
  }

  if (!isDeleting && charIndex === currentRole.length) {
    isDeleting = true;
    typingSpeed = 2000; // Pause before deleting
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    typingSpeed = 500; // Pause before typing next role
  }

  setTimeout(typeRole, typingSpeed);
}

// Start typing animation
typeRole();

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const offsetTop = target.offsetTop - 80; // Account for fixed navbar
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  });
});

// Portfolio Tabs
const tabButtons = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const targetTab = button.getAttribute("data-tab");

    // Remove active class from all buttons and contents
    tabButtons.forEach((btn) => btn.classList.remove("active"));
    tabContents.forEach((content) => content.classList.remove("active"));

    // Add active class to clicked button and corresponding content
    button.classList.add("active");
    document.getElementById(targetTab).classList.add("active");
  });
});

// Show More/Less Functionality for Portfolio Items
function setupShowMore(tabId, rowLimit = 2) {
  const tab = document.getElementById(tabId);
  const grid = tab.querySelector(
    ".projects-grid, .certificates-grid, .skills-grid"
  );
  const wrapper = tab.querySelector(".grid-wrapper");

  if (!grid || !wrapper) return;

  const items = Array.from(grid.children);
  const showMoreBtn = document.createElement("button");
  showMoreBtn.className = "show-more-btn";
  let isExpanded = false;

  function calculateRowHeight() {
    const itemsPerRow =
      getComputedStyle(grid).gridTemplateColumns.split(" ").length;
    const sampleItem = items[0];
    const itemStyle = getComputedStyle(sampleItem);
    const itemHeight =
      sampleItem.offsetHeight +
      parseInt(itemStyle.marginTop) +
      parseInt(itemStyle.marginBottom);
    return itemHeight * rowLimit;
  }

  function updateVisibility() {
    if (isExpanded) {
      wrapper.style.maxHeight = grid.scrollHeight + "px";
      showMoreBtn.innerHTML = 'Show Less <i class="ri-arrow-up-s-line"></i>';
    } else {
      wrapper.style.maxHeight = calculateRowHeight() + "px";
      showMoreBtn.innerHTML = 'Show More <i class="ri-arrow-down-s-line"></i>';
    }
  }

  showMoreBtn.addEventListener("click", () => {
    isExpanded = !isExpanded;
    updateVisibility();

    if (!isExpanded) {
      wrapper.addEventListener(
        "transitionend",
        () => {
          showMoreBtn.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
          });
        },
        { once: true }
      );
    }
  });

  function init() {
    const itemsPerRow =
      getComputedStyle(grid).gridTemplateColumns.split(" ").length;
    const visibleCount = itemsPerRow * rowLimit;

    if (items.length > visibleCount) {
      if (!tab.contains(showMoreBtn)) {
        tab.appendChild(showMoreBtn);
      }
      isExpanded = false;
      updateVisibility();
    } else {
      wrapper.style.maxHeight = "none";
      showMoreBtn.remove();
    }
  }

  // Watch for responsiveness
  const observer = new ResizeObserver(init);
  observer.observe(grid);
}

// Apply for each tab
["projects", "certificates", "skills"].forEach((tabId) => {
  setupShowMore(tabId, 2); // Limit to 2 rows
});

// Add this instead for professional profile animations
document.addEventListener("DOMContentLoaded", () => {
  // Animate profile cards on scroll
  const profileCards = document.querySelectorAll(".profile-card");

  const profileObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          }, index * 200);
        }
      });
    },
    { threshold: 0.1 }
  );

  profileCards.forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition = "all 0.6s ease";
    profileObserver.observe(card);
  });

  // Contact form submission via Google Apps Script
  const scriptURL =
    "https://script.google.com/macros/s/AKfycbxMk30VM7UeOegkm1Maw8k8Ts0IMFy9xyNdBby5bP4MEAMSdiBLSlOHErUnPQ7V1uNn/exec";
  const form = document.getElementById("contact-form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    fetch(scriptURL, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        alert("Thank You! Message sent successfully!");
        form.reset();
      })
      .catch((error) => {
        console.error("Error!", error.message);
        alert("Something went wrong. Please Check the all fields & try again.");
      });
  });

  // Animate language progress bars
  const languageProgressBars = document.querySelectorAll(".language-progress");

  const progressObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const width = entry.target.style.width;
          entry.target.style.width = "0%";
          setTimeout(() => {
            entry.target.style.width = width;
          }, 500);
        }
      });
    },
    { threshold: 0.5 }
  );

  languageProgressBars.forEach((bar) => {
    bar.style.transition = "width 1s ease-in-out";
    progressObserver.observe(bar);
  });
});

// Intersection Observer for Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

// Observe elements for animation
document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(
    ".about-section, .portfolio-section, .testimonials-section, .contact-section"
  );
  animatedElements.forEach((el) => {
    el.classList.add("fade-in");
    observer.observe(el);
  });
});

// Navbar Background on Scroll - Updated
window.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Active Navigation Link Based on Current Section
function updateActiveNavLink() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100; // Account for navbar height
    const sectionHeight = section.offsetHeight;

    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionTop + sectionHeight
    ) {
      currentSection = section.getAttribute("id");
    }
  });

  // Remove active class from all nav links
  navLinks.forEach((link) => {
    link.classList.remove("active");
  });

  // Add active class to current section's nav link
  if (currentSection) {
    const activeLink = document.querySelector(
      `.nav-link[href="#${currentSection}"]`
    );
    if (activeLink) {
      activeLink.classList.add("active");
    }
  }
}

// Update active nav link on scroll
window.addEventListener(
  "scroll",
  debounce(() => {
    updateActiveNavLink();
  }, 10)
);

// Update active nav link on page load
document.addEventListener("DOMContentLoaded", () => {
  updateActiveNavLink();
});

// Parallax Effect for Hero Section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const heroAnimation = document.querySelector(".hero-animation");
  if (heroAnimation) {
    heroAnimation.style.transform = `translateY(${scrolled * 0.2}px)`;
  }
});

// Add hover effects to project cards
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-10px) scale(1.02)";
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0) scale(1)";
  });
});

// Add click effects to buttons
document
  .querySelectorAll(".gradient-btn, .project-btn, .social-btn, .connect-btn")
  .forEach((btn) => {
    btn.addEventListener("click", function (e) {
      // Create ripple effect
      const ripple = document.createElement("span");
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.width = ripple.style.height = size + "px";
      ripple.style.left = x + "px";
      ripple.style.top = y + "px";
      ripple.classList.add("ripple");

      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

// Add CSS for ripple effect
const style = document.createElement("style");
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .gradient-btn, .project-btn, .social-btn, .connect-btn {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(style);

// Initialize AOS-like animations
function initScrollAnimations() {
  const elements = document.querySelectorAll(
    ".project-card, .certificate-card, .skill-item, .stat-item"
  );

  const animateOnScroll = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          }, index * 100);
        }
      });
    },
    { threshold: 0.1 }
  );

  elements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "all 0.6s ease";
    animateOnScroll.observe(el);
  });
}

// Initialize scroll animations when DOM is loaded
document.addEventListener("DOMContentLoaded", initScrollAnimations);

// Add loading animation
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Apply debounce to scroll events
const debouncedScrollHandler = debounce(() => {
  // Scroll-based animations here
}, 10);

window.addEventListener("scroll", debouncedScrollHandler);
