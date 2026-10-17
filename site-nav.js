/* Shared mobile navigation controller — robust on every page. */
(function () {
  "use strict";

  function getMenu() { return document.getElementById("mobileMenu"); }
  function getToggle() { return document.getElementById("menuToggle"); }

  function closeMenu() {
    var menu = getMenu();
    var toggle = getToggle();
    if (menu) {
      menu.classList.remove("active", "open");
      menu.setAttribute("aria-hidden", "true");
      menu.style.removeProperty("display");
      menu.style.removeProperty("visibility");
      menu.style.removeProperty("opacity");
      menu.style.removeProperty("pointer-events");
      menu.style.removeProperty("z-index");
    }
    if (toggle) {
      toggle.classList.remove("active");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open menu");
    }
    if (document.body) document.body.classList.remove("menu-open");
  }

  function openMenu() {
    var menu = getMenu();
    var toggle = getToggle();
    if (!menu) return;
    menu.classList.add("active");
    menu.classList.remove("open");
    menu.setAttribute("aria-hidden", "false");
    /* Force the visible state inline as well, overriding legacy page-specific CSS. */
    menu.style.setProperty("display", "flex", "important");
    menu.style.setProperty("visibility", "visible", "important");
    menu.style.setProperty("opacity", "1", "important");
    menu.style.setProperty("pointer-events", "auto", "important");
    menu.style.setProperty("z-index", "2147483000", "important");
    if (toggle) {
      toggle.classList.add("active");
      toggle.setAttribute("aria-expanded", "true");
      toggle.setAttribute("aria-label", "Close menu");
    }
    if (document.body) document.body.classList.add("menu-open");
  }

  function ensureCloseButton() {
    var menu = getMenu();
    if (!menu || menu.querySelector(".mobile-menu-close")) return;
    var button = document.createElement("button");
    button.type = "button";
    button.className = "mobile-menu-close";
    button.setAttribute("aria-label", "Close navigation menu");
    button.innerHTML = '<span aria-hidden="true">×</span><span>Close menu</span>';
    button.addEventListener("click", function (event) {
      event.preventDefault();
      event.stopPropagation();
      closeMenu();
    });
    menu.appendChild(button);
  }

  function installStyles() {
    if (document.getElementById("shared-mobile-nav-runtime-style")) return;
    var style = document.createElement("style");
    style.id = "shared-mobile-nav-runtime-style";
    style.textContent = `
      @media(max-width:900px){
        .nav{position:fixed!important;top:0!important;left:0!important;width:100%!important;z-index:2147483001!important}
        .menu-toggle{position:relative!important;z-index:2147483002!important;pointer-events:auto!important}
        #mobileMenu.mobile-menu{position:fixed!important;inset:0!important;width:100vw!important;height:100dvh!important;max-height:100dvh!important;overflow-x:hidden!important;overflow-y:auto!important;display:flex!important;flex-direction:column!important;align-items:stretch!important;justify-content:flex-start!important;z-index:2147483000!important;opacity:0!important;visibility:hidden!important;pointer-events:none!important;transform:none!important;background:radial-gradient(circle at 80% 12%,rgba(237,52,59,.16),transparent 34%),rgba(7,7,7,.99)!important;padding:calc(82px + env(safe-area-inset-top,0px)) 0 calc(24px + env(safe-area-inset-bottom,0px))!important}
        #mobileMenu.mobile-menu.active{opacity:1!important;visibility:visible!important;pointer-events:auto!important}
        #menuToggle span{display:block!important;width:19px!important;height:2px!important;min-height:2px!important;background:#fff!important;border-radius:10px!important;opacity:1!important;visibility:visible!important;flex:0 0 2px!important;}
        #menuToggle{gap:5px!important;align-items:center!important;justify-content:center!important;flex-direction:column!important;}
        #mobileMenu .mobile-links, #mobileMenu .mobile-nav-links{display:flex!important;flex-direction:column!important;gap:0!important;width:min(calc(100% - 40px),520px)!important;margin:0 auto!important;}
        #mobileMenu .mobile-links a, #mobileMenu .mobile-nav-links a{display:flex!important;align-items:center!important;justify-content:space-between!important;width:100%!important;min-height:48px!important;padding:12px 2px!important;color:#f5f5f5!important;font-size:clamp(22px,6vw,29px)!important;line-height:1.2!important;font-weight:700!important;text-decoration:none!important;border-bottom:1px solid rgba(255,255,255,.16)!important;background:transparent!important;border-radius:0!important;white-space:normal!important;}
        #mobileMenu .mobile-menu-inner{display:block!important;width:min(calc(100% - 40px),520px)!important;max-width:520px!important;height:auto!important;max-height:none!important;margin:0 auto!important;padding:12px 0 24px!important;overflow:visible!important;flex:none!important}
        #mobileMenu .mobile-menu-label{display:block!important;margin:0 0 14px!important;color:#ed343b!important;font-size:10px!important;letter-spacing:.18em!important}
        #mobileMenu .mobile-links{display:flex!important;flex-direction:column!important;gap:0!important;width:100%!important}
        #mobileMenu .mobile-links a{display:flex!important;align-items:center!important;justify-content:space-between!important;width:100%!important;min-height:48px!important;padding:12px 2px!important;color:#f5f5f5!important;font-size:clamp(22px,6vw,29px)!important;line-height:1.2!important;font-weight:700!important;text-decoration:none!important;border-bottom:1px solid rgba(255,255,255,.16)!important;background:transparent!important;border-radius:0!important;white-space:normal!important}
        #mobileMenu .mobile-links a.mobile-cta{margin-top:14px!important;padding:13px 15px!important;background:#ed343b!important;color:#fff!important;border:1px solid #ed343b!important;border-radius:4px!important;font-size:17px!important}
        #mobileMenu .mobile-links a.is-current-page:not(.mobile-cta){color:#ed343b!important;text-decoration:underline!important;text-decoration-color:#ed343b!important;text-underline-offset:5px!important;border-bottom-color:#ed343b!important}
        #mobileMenu .mobile-menu-close{position:fixed!important;top:calc(14px + env(safe-area-inset-top,0px))!important;right:18px!important;z-index:2147483003!important;display:flex!important;align-items:center!important;gap:7px!important;min-height:42px!important;padding:8px 12px!important;border:1px solid rgba(255,255,255,.35)!important;border-radius:30px!important;background:#ed343b!important;color:#fff!important;font:600 13px/1 Manrope,Arial,sans-serif!important;cursor:pointer!important;pointer-events:auto!important}
        #mobileMenu .mobile-menu-close span:first-child{font-size:24px!important;line-height:14px!important}
        body.menu-open{overflow:hidden!important}
      }
    `;
    document.head.appendChild(style);
  }

  document.addEventListener("click", function (event) {
    var target = event.target;
    var toggle = target && target.closest ? target.closest("#menuToggle") : null;
    if (toggle) return; // The button has its own direct click handler.
    var menu = getMenu();
    var link = target && target.closest ? target.closest("#mobileMenu a") : null;
    if (link) {
      closeMenu();
      return;
    }
    if (menu && target === menu && menu.classList.contains("active")) closeMenu();
  }, true);

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") closeMenu();
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 900) closeMenu();
  });

  function ensureToggleHandler() {
    var toggle = getToggle();
    if (!toggle || toggle.getAttribute("data-shared-nav-bound") === "true") return;
    toggle.setAttribute("data-shared-nav-bound", "true");
    toggle.addEventListener("click", function (event) {
      event.preventDefault();
      event.stopPropagation();
      var menu = getMenu();
      if (!menu) return;
      if (menu.classList.contains("active")) closeMenu();
      else { ensureCloseButton(); openMenu(); }
    });
    toggle.addEventListener("touchend", function (event) {
      // Native click handles taps; prevent duplicate toggles on touch browsers.
    }, { passive: true });
  }

  function init() { installStyles(); ensureCloseButton(); ensureToggleHandler(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();

  // Work page injects navbar.html asynchronously, so watch for its menu.
  new MutationObserver(function () { init(); }).observe(document.documentElement, { childList: true, subtree: true });
})();
