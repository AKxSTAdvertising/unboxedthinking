/* Shared hamburger controller — reset with explicit visibility overrides. */
(function () {
  "use strict";

  function getToggle() { return document.getElementById("menuToggle"); }
  function getMenu() { return document.getElementById("mobileMenu"); }

  function setMenu(open) {
    var toggle = getToggle();
    var menu = getMenu();
    if (!toggle || !menu) return;

    menu.classList.toggle("active", open);
    menu.classList.toggle("open", open);
    menu.setAttribute("aria-hidden", open ? "false" : "true");

    if (open) {
      /* Force the open state over conflicting page-specific !important rules. */
      menu.style.setProperty("display", "flex", "important");
      menu.style.setProperty("visibility", "visible", "important");
      menu.style.setProperty("opacity", "1", "important");
      menu.style.setProperty("pointer-events", "auto", "important");
      menu.style.setProperty("z-index", "2147483000", "important");
      menu.style.setProperty("transform", "none", "important");
    } else {
      ["display", "visibility", "opacity", "pointer-events", "z-index", "transform"]
        .forEach(function (property) { menu.style.removeProperty(property); });
    }

    toggle.classList.toggle("active", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    document.body.classList.toggle("menu-open", open);
  }

  function init() {
    var toggle = getToggle();
    var menu = getMenu();
    if (!toggle || !menu) return;

    if (toggle.dataset.hamburgerResetBound !== "v7") {
      toggle.dataset.hamburgerResetBound = "v7";
      toggle.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();
        var currentMenu = getMenu();
        setMenu(!(currentMenu && (currentMenu.classList.contains("active") || currentMenu.classList.contains("open"))));
      }, true);
    }

    if (menu.dataset.hamburgerResetBound !== "v7") {
      menu.dataset.hamburgerResetBound = "v7";
      menu.addEventListener("click", function (event) {
        if (event.target === menu || (event.target.closest && event.target.closest("a"))) setMenu(false);
      });
    }
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") setMenu(false);
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 900) setMenu(false);
  });

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();

  /* Work page inserts navbar.html after page load. */
  new MutationObserver(init).observe(document.documentElement, { childList: true, subtree: true });
})();