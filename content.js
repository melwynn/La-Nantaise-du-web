let lastSentHash = "";

function detectSchemas() {
  const scripts = Array.from(document.querySelectorAll('script[type="application/ld+json"]'));
  const schemas = [];

  scripts.forEach(script => {
    try {
      const json = JSON.parse(script.textContent);
      schemas.push(json);
    } catch (e) {
      // JSON malformé → ignoré
    }
  });

  if (schemas.length > 0) {
    const hash = JSON.stringify(schemas);
    if (hash !== lastSentHash) {
      lastSentHash = hash;
      chrome.runtime.sendMessage({
        type: "schemas_detected",
        schemas: schemas
      });
    }
  }
}

// ✅ Fonction d’attente (anti-spam des changements DOM)
function debounce(fn, delay) {
  let timer = null;
  return function () {
    clearTimeout(timer);
    timer = setTimeout(fn, delay);
  };
}

const detectSchemasDebounced = debounce(detectSchemas, 300);

// 🔁 1. Lancer au chargement de la page
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", detectSchemas);
} else {
  detectSchemas();
}

// 🔁 2. Observer les changements du DOM (JS, Ajax, etc.)
const observer = new MutationObserver(() => {
  detectSchemasDebounced();
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});
