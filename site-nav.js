/* Reset shared hamburger controller: simple, predictable, page-compatible. */
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
    toggle.classList.toggle("active", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    document.body.classList.toggle("menu-open", open);
  }

  function init() {
    var toggle = getToggle();
    var menu = getMenu();
    if (!toggle || !menu) return;

    if (toggle.dataset.hamburgerResetBound !== "true") {
      toggle.dataset.hamburgerResetBound = "true";
      toggle.addEventListener("click", function (event) {
        event.preventDefault();
        setMenu(!menu.classList.contains("active") && !menu.classList.contains("open"));
      });
    }

    if (menu.dataset.hamburgerResetBound !== "true") {
      menu.dataset.hamburgerResetBound = "true";
      menu.addEventListener("click", function (event) {
        if (event.target === menu || (event.target.closest && event.target.closest("a"))) {
          setMenu(false);
        }
      });
    }
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") setMenu(false);
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 900) setMenu(false);
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  // Work page loads navbar.html asynchronously.
  new MutationObserver(init).observe(document.documentElement, { childList: true, subtree: true });
})();