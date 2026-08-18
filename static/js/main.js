/* Small, dependency-free interactions for the server-rendered NOVA homepage. */
document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const header = document.getElementById("site-header");
  const menuButton = document.querySelector(".menu-toggle");
  const navLinks = document.getElementById("nav-links");
  let activeModal = null;
  let previousFocus = null;

  const updateHeader = () => header.classList.toggle("scrolled", window.scrollY > 12);
  const closeMenu = () => {
    navLinks.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    body.classList.remove("menu-open");
  };
  const openModal = (modal) => {
    previousFocus = document.activeElement;
    activeModal = modal;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    body.classList.add("modal-open");
    modal.querySelector("button, input, a").focus();
  };
  const closeModal = () => {
    if (!activeModal) return;
    activeModal.classList.remove("is-open");
    activeModal.setAttribute("aria-hidden", "true");
    body.classList.remove("modal-open");
    previousFocus?.focus();
    activeModal = null;
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });
  menuButton.addEventListener("click", () => {
    const open = !navLinks.classList.contains("open");
    navLinks.classList.toggle("open", open);
    menuButton.setAttribute("aria-expanded", String(open));
    body.classList.toggle("menu-open", open);
  });
  navLinks.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
  document.addEventListener("click", (event) => {
    if (navLinks.classList.contains("open") && !event.target.closest(".nav")) closeMenu();
  });

  document.querySelectorAll("[data-modal-open]").forEach((button) => button.addEventListener("click", () => {
    closeMenu();
    openModal(document.getElementById(button.dataset.modalOpen));
  }));
  document.querySelectorAll("[data-modal-close]").forEach((button) => button.addEventListener("click", closeModal));
  document.querySelectorAll("[data-modal-workspace]").forEach((link) => link.addEventListener("click", closeModal));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      if (activeModal) closeModal();
      else closeMenu();
    }
    if (event.key === "Tab" && activeModal) {
      const focusable = [...activeModal.querySelectorAll("button, [href], input:not([disabled])")];
      const first = focusable[0];
      const last = focusable.at(-1);
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  });

  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) { entry.target.classList.add("visible"); observer.unobserve(entry.target); }
  }), { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach((item) => observer.observe(item));

  const colors = { purple: "#7668ee", grid: "#e9eaf0", darkGrid: "rgba(255,255,255,.08)" };
  const makeGradient = (canvas, dark = false) => {
    const gradient = canvas.getContext("2d").createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, dark ? "rgba(145,134,255,.45)" : "rgba(118,104,238,.28)");
    gradient.addColorStop(1, dark ? "rgba(145,134,255,0)" : "rgba(118,104,238,0)");
    return gradient;
  };
  const chartConfig = (canvas, labels, values, dark = false) => ({
    type: "line",
    data: { labels, datasets: [{ data: values, borderColor: dark ? "#a49aff" : colors.purple, backgroundColor: makeGradient(canvas, dark), borderWidth: 2, fill: true, tension: .42, pointRadius: 0, pointHoverRadius: 4, pointBackgroundColor: "#fff", pointHoverBorderWidth: 2 }] },
    options: { responsive: true, maintainAspectRatio: false, animation: { duration: 700, easing: "easeOutQuart" }, plugins: { legend: { display: false }, tooltip: { displayColors: false, backgroundColor: dark ? "#fff" : "#202236", titleColor: dark ? "#202236" : "#fff", bodyColor: dark ? "#555" : "#fff", padding: 9, cornerRadius: 7 } }, scales: { x: { grid: { display: false }, border: { display: false }, ticks: { color: dark ? "#9ea0b1" : "#8b8e9c", font: { size: 9, family: "Manrope" } } }, y: { display: false, grid: { color: dark ? colors.darkGrid : colors.grid }, border: { display: false } } }, interaction: { intersect: false, mode: "index" } }
  });

  const heroCanvas = document.getElementById("heroChart");
  new Chart(heroCanvas, chartConfig(heroCanvas, ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"], [142, 159, 151, 188, 205, 240, 284]));

  const data = JSON.parse(document.getElementById("demo-series-data").textContent);
  const demoCanvas = document.getElementById("demoChart");
  const demoChart = new Chart(demoCanvas, chartConfig(demoCanvas, data.revenue.labels, data.revenue.values, true));
  const summary = document.getElementById("demoSummary");
  const change = document.getElementById("demoChange");
  const description = document.getElementById("demoDescription");
  const label = document.getElementById("demoLabel");
  const tabs = [...document.querySelectorAll("[data-series]")];
  const selectSeries = (tab) => {
    const series = data[tab.dataset.series];
    demoChart.data.labels = series.labels;
    demoChart.data.datasets[0].data = series.values;
    demoChart.update();
    summary.textContent = series.summary;
    change.textContent = series.change;
    description.textContent = series.description;
    label.textContent = series.label;
    tabs.forEach((button) => button.setAttribute("aria-selected", String(button === tab)));
  };
  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => selectSeries(tab));
    tab.addEventListener("keydown", (event) => {
      if (!["ArrowLeft", "ArrowRight"].includes(event.key)) return;
      event.preventDefault();
      const next = tabs[(index + (event.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length];
      next.focus();
      selectSeries(next);
    });
  });
});
