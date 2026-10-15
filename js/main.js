/* ==========================================================================
   M-Tech — script du site
   ========================================================================== */

/* --------------------------------------------------------------------------
   CONFIGURATION — C'EST ICI QU'ON MODIFIE LES COORDONNÉES.
   Chaque valeur est reprise automatiquement partout sur le site
   (en-tête, contact, pied de page, boutons WhatsApp…).
   -------------------------------------------------------------------------- */
const CONFIG = {
  // Numéro WhatsApp au format international : indicatif 237 + numéro,
  // sans « + », sans espaces. Exemple : "237690000000"
  whatsapp: "2376XXXXXXXX",

  // Numéro tel qu'il s'affiche sur le site.
  telephone: "+237 6XX XX XX XX",

  email: "contact@m-tech.cm",
  adresse: "Kounga, Foumban — Région de l'Ouest, Cameroun",
  horaires: "Lundi – Samedi : 7h30 – 19h00 · Dimanche : fermé",
  responsable: "Moustafa",

  // Message pré-rempli quand un client clique sur un bouton WhatsApp.
  messageWhatsapp: "Bonjour M-Tech, je souhaite avoir des informations.",
};

/* ------------------------------------------------------------------------ */

(function () {
  "use strict";

  const root = document.documentElement;
  const telHref = "tel:" + CONFIG.telephone.replace(/[^\d+]/g, "");

  function whatsappUrl(text) {
    return "https://wa.me/" + CONFIG.whatsapp + "?text=" + encodeURIComponent(text);
  }

  /* --- Coordonnées : une seule source de vérité --------------------------- */

  document.querySelectorAll("[data-config]").forEach(function (el) {
    const value = CONFIG[el.dataset.config];
    if (value) el.textContent = value;
  });

  document.querySelectorAll("[data-link]").forEach(function (el) {
    const type = el.dataset.link;

    if (type === "tel") {
      el.href = telHref;
    } else if (type === "mailto") {
      el.href = "mailto:" + CONFIG.email;
    } else if (type === "whatsapp") {
      const service = el.dataset.wa;
      const text = service
        ? "Bonjour M-Tech, je souhaite un renseignement sur : " + service + "."
        : CONFIG.messageWhatsapp;
      el.href = whatsappUrl(text);
      el.target = "_blank";
      el.rel = "noopener";
    }
  });

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  /* --- Données structurées pour Google (recherches locales) --------------- */

  const ld = document.createElement("script");
  ld.type = "application/ld+json";
  ld.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "M-Tech",
    description: "Bureautique, impression, infographie, services en ligne, informatique et formation.",
    telephone: CONFIG.telephone,
    email: CONFIG.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Kounga",
      addressLocality: "Foumban",
      addressRegion: "Ouest",
      addressCountry: "CM",
    },
    geo: { "@type": "GeoCoordinates", latitude: 5.7265, longitude: 10.8998 },
    openingHours: "Mo-Sa 07:30-19:00",
    founder: { "@type": "Person", name: CONFIG.responsable },
  });
  document.head.appendChild(ld);

  /* --- Entête : ombre au défilement --------------------------------------- */

  const header = document.getElementById("header");
  function onScroll() {
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* --- Menu mobile -------------------------------------------------------- */

  const burger = document.getElementById("burger");
  const nav = document.getElementById("nav");

  function setMenu(open) {
    nav.classList.toggle("is-open", open);
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
  }

  burger.addEventListener("click", function () {
    setMenu(!nav.classList.contains("is-open"));
  });

  nav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () { setMenu(false); });
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && nav.classList.contains("is-open")) {
      setMenu(false);
      burger.focus();
    }
  });

  document.addEventListener("click", function (e) {
    if (nav.classList.contains("is-open") && !nav.contains(e.target) && !burger.contains(e.target)) {
      setMenu(false);
    }
  });

  /* --- Thème clair / sombre ----------------------------------------------- */

  const themeToggle = document.getElementById("themeToggle");
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)");

  function currentTheme() {
    return root.getAttribute("data-theme") || (systemDark.matches ? "dark" : "light");
  }

  themeToggle.addEventListener("click", function () {
    const next = currentTheme() === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("mtech-theme", next); } catch (e) { /* navigation privée */ }
  });

  /* --- Lien actif dans le menu selon la section visible ------------------- */

  const navLinks = Array.from(nav.querySelectorAll('a[href^="#"]:not([data-link])'));
  const sections = navLinks
    .map(function (a) { return document.querySelector(a.getAttribute("href")); })
    .filter(Boolean);

  if ("IntersectionObserver" in window) {
    const spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (a) {
          a.classList.toggle("is-active", a.getAttribute("href") === "#" + entry.target.id);
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* --- Apparition des blocs au défilement --------------------------------- */

  const reveals = document.querySelectorAll(".reveal");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduceMotion || !("IntersectionObserver" in window)) {
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  }

  /* --- Formulaire de devis → WhatsApp ------------------------------------- */

  const form = document.getElementById("quoteForm");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = form.elements.name;
    const message = form.elements.message;

    for (const field of [name, message]) {
      if (!field.value.trim()) {
        field.focus();
        field.setAttribute("aria-invalid", "true");
        return;
      }
      field.removeAttribute("aria-invalid");
    }

    const text =
      "Bonjour M-Tech,\n\n" +
      "Je m'appelle " + name.value.trim() + ".\n" +
      "Service souhaité : " + form.elements.service.value + "\n\n" +
      message.value.trim();

    window.open(whatsappUrl(text), "_blank", "noopener");
  });
})();
