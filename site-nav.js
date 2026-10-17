/* Shared responsive navigation for every page, including Work's loaded navbar. */
(function(){
  "use strict";
  function closeMenu(){var toggle=document.getElementById("menuToggle"),menu=document.getElementById("mobileMenu");if(toggle){toggle.classList.remove("active");toggle.setAttribute("aria-expanded","false");toggle.setAttribute("aria-label","Open menu");}if(menu)menu.classList.remove("active");document.body.classList.remove("menu-open");}
  document.addEventListener("click",function(event){var toggle=event.target.closest?event.target.closest("#menuToggle"):null,menu=document.getElementById("mobileMenu");if(toggle&&menu){event.preventDefault();if(menu.classList.contains("active")){closeMenu();}else{menu.classList.add("active");toggle.classList.add("active");toggle.setAttribute("aria-expanded","true");toggle.setAttribute("aria-label","Close menu");document.body.classList.add("menu-open");}return;}if(menu&&(event.target===menu||(event.target.closest&&event.target.closest("#mobileMenu a"))))closeMenu();});
  document.addEventListener("keydown",function(event){if(event.key==="Escape")closeMenu();});
  window.addEventListener("resize",function(){if(window.innerWidth>900)closeMenu();});
})();
