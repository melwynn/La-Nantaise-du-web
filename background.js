chrome.runtime.onInstalled.addListener(() => {
  console.log("Schema Sniffer installé");
});

// Écoute les messages venant de content.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "schemas_detected") {
    // On enregistre les schémas en local pour le popup
    chrome.storage.local.set({ detectedSchemas: message.schemas }, () => {
      console.log("Schémas sauvegardés depuis content.js");
    });
  }
});
