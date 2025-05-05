function explainSchemaType(type) {
  const explanations = {
    "Recipe": "Il s'agit d'une recette (temps de cuisson, portions, ingrédients, etc.)",
    "Product": "Produit commercial. Peut afficher prix, avis et disponibilité.",
    "Event": "Événement. Affiche lieu, date et prix dans la SERP.",
    "Article": "Contenu éditorial. Peut générer un extrait enrichi.",
    "FAQPage": "Foire aux questions. Affiche les réponses directement dans Google."
  };
  return explanations[type] || "Type de schema inconnu ou personnalisé.";
}

function beautifyJSON(json) {
  return JSON.stringify(json, null, 2);
}

function downloadSchema(schema, index) {
  const blob = new Blob([beautifyJSON(schema)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `schema-${index + 1}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

function renderSchemas(schemas) {
  const container = document.getElementById("content");
  container.innerHTML = "";

  if (!schemas || schemas.length === 0) {
    container.innerHTML = "<p>Aucun balisage schema.org détecté.</p>";
    return;
  }

  schemas.forEach((schema, index) => {
    let type = schema["@type"];
    if (!type && Array.isArray(schema["@graph"])) {
      type = schema["@graph"]
        .map(item => item["@type"])
        .filter(Boolean)
        .join(", ");
    }

    if (!type || String(type).includes("rdf:Property") || String(type).includes("rdfs:Class")) return;

    const block = document.createElement("div");
    block.className = "schema-block";

    const explanation = explainSchemaType(type);

    const firstType = Array.isArray(type) ? type[0] : type;
    const docUrl = (firstType && !String(type).includes(',')) ? `https://schema.org/${firstType}` : "https://schema.org";

    const header = document.createElement("div");
    header.className = "schema-header";
    header.innerHTML = `
      <span>
        <strong>@type :</strong> ${type}
        <a href="${docUrl}" target="_blank" title="Voir la documentation Schema.org" style="margin-left:6px; text-decoration:none;">📖</a>
      </span>
      <span class="arrow">▶</span>
    `;

    const body = document.createElement("div");
    body.className = "schema-body";
    body.innerHTML = `
      <div class="explanation">🧠 ${explanation}</div>
      <pre>${beautifyJSON(schema)}</pre>
      <button class="download-json">💾 Télécharger le JSON</button>
    `;

    header.addEventListener("click", () => {
      const arrow = header.querySelector(".arrow");
      const isOpen = body.style.display === "block";
      body.style.display = isOpen ? "none" : "block";
      arrow.classList.toggle("open", !isOpen);
    });

    body.querySelector(".download-json").addEventListener("click", () => {
      downloadSchema(schema, index);
    });

    block.appendChild(header);
    block.appendChild(body);
    container.appendChild(block);
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript(
    {
      target: { tabId: tab.id },
      func: () => {
        const scripts = Array.from(document.querySelectorAll('script[type="application/ld+json"]'));
        const schemas = [];

        scripts.forEach(script => {
          try {
            const json = JSON.parse(script.textContent);
            schemas.push(json);
          } catch (e) {
            // Ignorer les JSON invalides
          }
        });

        return schemas;
      }
    },
    (results) => {
      const schemas = results && results[0]?.result ? results[0].result : [];
      renderSchemas(schemas);
    }
  );
});

document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll('.tab-button');
  const contents = document.querySelectorAll('.tab-content');

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      buttons.forEach(btn => btn.classList.remove('active'));
      contents.forEach(tab => tab.classList.remove('active'));

      button.classList.add('active');
      document.getElementById(button.dataset.target).classList.add('active');
    });
  });
});
