// Get theme from parent window or localStorage
function getThemeFromParent() {
  try {
    // Try to get theme from parent window (if this is opened from main portfolio)
    if (window.parent && window.parent !== window) {
      const parentTheme =
        window.parent.document.body.getAttribute("data-theme");
      if (parentTheme) {
        return parentTheme;
      }
    }
  } catch (e) {
    // Cross-origin access might be blocked, fallback to localStorage
  }

  // Fallback to localStorage or default
  return localStorage.getItem("theme") || "dark";
}

// Set theme on page load
document.addEventListener("DOMContentLoaded", () => {
  const theme = getThemeFromParent();
  document.body.setAttribute("data-theme", theme);

  // Listen for theme changes from parent window
  window.addEventListener("message", function (event) {
    if (event.data.type === "themeChange") {
      document.body.setAttribute("data-theme", event.data.theme);
    }
  });

  // Add smooth animations on load
  const elements = document.querySelectorAll(
    ".stat-card, .btn, .tech-tag, .feature-item"
  );
  elements.forEach((el, index) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "all 0.6s ease";

    setTimeout(() => {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }, index * 100);
  });
});
