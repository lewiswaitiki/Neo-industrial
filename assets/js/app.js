// Component loader: inject header/footer into pages
async function includeComponents() {
  const containers = document.querySelectorAll("[data-include]");
  await Promise.all([...containers].map(async el => {
    const url = el.getAttribute("data-include");
    try {
      const res = await fetch(url);
      el.innerHTML = await res.text();
    } catch (e) {
      el.innerHTML = "<!-- component failed to load -->";
    }
  }));
}
function initUI() {
  // Dynamic year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav toggle
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", () => links.classList.toggle("open"));
    document.addEventListener("click", (e) => {
      if (!links.contains(e.target) && !toggle.contains(e.target)) links.classList.remove("open");
    });
  }

  // Active nav link by pathname
  const path = location.pathname.replace(/\/$/, "");
  document.querySelectorAll(".nav-links a").forEach(a => {
    const href = a.getAttribute("href").replace(/\/$/, "");
    if (href && path.endsWith(href)) a.classList.add("active");
    if (path === "" || path.endsWith("/index.html")) {
      const home = document.querySelector('.nav-links a[href="/index.html"]');
      if (home) home.classList.add("active");
    }
  });

  // Scroll reveal
  const revealables = document.querySelectorAll(".reveal");
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => entry.isIntersecting && entry.target.classList.add("revealed"));
  }, { threshold: 0.15 });
  revealables.forEach(el => io.observe(el));
}
document.addEventListener("DOMContentLoaded", async () => {
  await includeComponents();
  initUI();
});
