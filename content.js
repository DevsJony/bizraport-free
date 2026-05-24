(function() {
  'use strict';

  function removeLoginPopup() {
    document.querySelectorAll('div.fixed.z-50').forEach(popup => {
      if (popup.textContent.includes('Miło Cię widzieć') ||
          popup.textContent.includes('Zaloguj się') ||
          popup.textContent.includes('Kontynuuj przez Google') ||
          popup.textContent.includes('Subskrybuj') ||
          popup.textContent.includes('żeby kontynuować') ||
          popup.textContent.includes('wybieram Premium')) {
        popup.remove();
      }
    });
  }

  function removeBlur() {
    document.querySelectorAll('.blur-sm, .blur, [class*="blur-"]').forEach(el => {
      el.classList.remove('blur-sm', 'blur', 'blur-md', 'blur-lg', 'blur-xl');
      el.style.filter = 'none';
    });
  }

  function cleanup() {
    removeLoginPopup();
    removeBlur();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', cleanup);
  } else {
    cleanup();
  }

  window.addEventListener('load', cleanup);

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.addedNodes.length > 0) {
        cleanup();
        break;
      }
    }
  });

  observer.observe(document.documentElement, { childList: true, subtree: true });

  let runs = 0;
  const interval = setInterval(() => {
    cleanup();
    if (++runs >= 10) clearInterval(interval);
  }, 500);
})();
