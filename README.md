# 🔍 Schema Sniffer – Analyse du balisage **Schema.org**
### by *Nantaise du Web* · <https://www.e-reputation.agency/>
 
> **Détectez, visualisez et comprenez instantanément tous les schémas `schema.org` présents dans n’importe quelle page web.**  
> Extension 100 % gratuite, open‑source et respectueuse de la vie privée, développée par l’équipe de <https://www.e-reputation.agency/>.
 
![Banner](docs/banner-schema-sniffer.png)
 
---
 
## 📑 Sommaire
1. [Pourquoi Schema Sniffer ?](#pourquoi-schema-sniffer)
2. [Fonctionnalités clés](#fonctionnalités-clés)
3. [Captures d’écran & démo](#captures-décran--démo)
4. [Installation](#installation)
5. [Guide d’utilisation](#guide-dutilisation)
6. [FAQ](#faq)
7. [Développement & build](#développement--build)
8. [Feuille de route](#feuille-de-route)
9. [Confidentialité & sécurité](#confidentialité--sécurité)
10. [Contribuer](#contribuer)
11. [Historique des versions](#historique-des-versions)
12. [Licence](#licence)
13. [Contact & support](#contact--support)
 
---
 
## Pourquoi Schema Sniffer ?
 
- **Gain de temps** : plus besoin d’ouvrir l’inspecteur pour fouiller les balises JSON‑LD.  
- **Audit SEO** : vérifiez en un clic si vos pages contiennent bien les schémas attendus.  
- **Pédagogie** : chaque `@type` est accompagné d’une explication claire (recette, produit, événement…).  
- **Export JSON** : téléchargez les balises prêtes à être retravaillées ou sauvegardées.  
- **Cross‑browser** : fonctionne sous Chrome / Chromium et Firefox (Manifest V2).  
- **Made with ❤️ par** <https://www.e-reputation.agency/> pour la communauté web.
 
---
 
## Fonctionnalités clés
 
| Fonction                              | Description détaillée |
|--------------------------------------|-----------------------|
| **Détection automatique**            | Détecte tous les `<script type="application/ld+json">` présents dans le DOM, même injectés dynamiquement. |
| **Affichage hiérarchisé**            | Présente chaque bloc dans un accordéon pliable, avec couleur, indentation et explication humaine. |
| **Recherche & filtre (à venir)**     | Filtre rapide par `@type` pour retrouver un schéma précis sur les pages très denses. |
| **Téléchargement JSON**              | Un clic pour exporter le schéma sélectionné au format `.json`. |
| **Explications SEO intégrées**       | Résumé des bénéfices SEO pour chaque type de balisage (`Recipe`, `Product`, `FAQPage`, etc.). |
| **Onglet “Plugins WP”**              | Liste de plugins WordPress populaires gérant les schémas, liens directs inclus. |
| **Observation DOM**                  | Détection continue grâce à `MutationObserver` avec *debounce* anti‑spam. |
| **Mode sombre (roadmap)**            | Interface adaptée aux noctambules & dev dark‑mode lovers. |
| **Aucune collecte**                  | Orienté privacy : zéro tracking, zéro analytics – cf. [Confidentialité](#confidentialité--sécurité). |
 
---
 
## Captures d’écran & démo
 
| Vue popup schémas | Vue onglet plugins |
|-------------------|--------------------|
| ![Popup](docs/screenshot-popup.png) | ![Plugins](docs/screenshot-plugins.png) |
 
> **Demo GIF** : à retrouver dans le dossier `docs/demo.gif`  
> *Pull requests bienvenues pour ajouter de nouveaux médias !*
 
---
 
## Installation
 
### Chrome / Brave / Edge
1. Téléchargez la dernière release ZIP depuis la [page Releases](https://github.com/VOTRE-ORG/schema-sniffer-extension/releases).
2. Décompressez le dossier.  
3. Ouvrez `chrome://extensions/` et activez **Mode développeur**.  
4. Cliquez sur **Charger l’extension non empaquetée** puis sélectionnez le dossier extrait.
 
### Firefox
1. Importez `schema-sniffer.xpi` via `about:addons` → **Installer un module depuis un fichier**.  
2. Confirmez les permissions.
 
### Depuis le code source
```bash
git clone https://github.com/VOTRE-ORG/schema-sniffer-extension.git
cd schema-sniffer-extension
# puis chargez le dossier comme extension non empaquetée
```
 
---
 
## Guide d’utilisation
 
1. Naviguez vers la page à auditer.  
2. Cliquez sur l’icône **Schema Sniffer** (chaîne verte de NDW).  
3. **Onglet “Schémas”** :  
   - Chaque bloc montre : `@type`, explication, JSON beautifié, bouton **Télécharger**.  
4. **Onglet “Plugins WP”** :  
   - Suggestions de plugins WordPress compatibles schema.org pour enrichir vos contenus.  
5. Fermez / rouvrez à volonté, le scan se relance automatiquement.
 
---
 
## FAQ
 
<details>
<summary>Pourquoi l’extension demande-t-elle <code>&lt;all_urls&gt;</code> ?</summary>
 
Pour fonctionner sur tous les domaines, y compris localhost et intranet.  
Aucune donnée n’est transmise hors de votre navigateur.
</details>
 
<details>
<summary>L’extension modifie-t-elle la page ?</summary>
 
Jamais. Elle lit et affiche uniquement les balises JSON‑LD déjà présentes.
</details>
 
<details>
<summary>Puis-je contribuer ?</summary>
 
Oui ! Ouvrez une issue ou une pull request. Voir la section [Contribuer](#contribuer).
</details>
 
---
 
## Développement & build
 
```bash
# Installer les dépendances (si scripts Node ajoutés)
npm install
 
# Lint & format
npm run lint
npm run format
 
# Générez un .zip pour Chrome
npm run build:chrome
 
# Générez un .xpi pour Firefox
npm run build:firefox
```
 
Le projet suit ESLint + Prettier via Husky & lint‑staged.
 
---
 
## Feuille de route
 
- [x] Détection JSON‑LD
- [x] Explications SEO
- [x] Export JSON
- [x] Compatibilité Chrome & Firefox
- [ ] Recherche / filtrage par `@type`
- [ ] Mode sombre
- [ ] Support Microdata
- [ ] Internationalisation (i18n)
- [ ] Analyse automatique des erreurs de syntaxe
 
---
 
## Confidentialité & sécurité
 
Schema Sniffer applique une politique **zéro collecte** :
 
- Pas de cookies, pas de fingerprinting, pas de tracking Google Analytics.  
- Les schémas sont analysés **localement** et stockés uniquement dans `chrome.storage.local`, effacés à la fermeture du popup.  
- Aucun code distant exécuté.  
 
Politique complète : <https://www.e-reputation.agency/>.
 
---
 
## Contribuer
 
1. **Fork** le dépôt puis `git checkout -b feature/mon-amélioration`  
2. **Commit** tes modifications `git commit -m "Ajout nouvelle feature"`  
3. **Push** la branche `git push origin feature/mon-amélioration`  
4. **PR** via GitHub – merci !
 
Un grand merci à tous les contributeurs.  
Supportez le projet sur <https://www.e-reputation.agency/>.
 
---
 
## Historique des versions
 
Voir [`CHANGELOG.md`](CHANGELOG.md).  
Dernière version : **v1.0.0** (10 mai 2025).
 
---
 
## Licence
 
```
MIT License
 
Copyright (c) 2025 Nantaise du Web
...
```
 
---
 
## Contact & support
 
- Site : <https://www.e-reputation.agency/>  
- Email : support@nantaise-du-web.com  
- Twitter : [@LaNantaiseDuWeb](https://twitter.com/LaNantaiseDuWeb)  
 
> **Schema Sniffer** est un projet de **Nantaise du Web** – retrouvez nos services SEO et e‑réputation sur <https://www.e-reputation.agency/>.
 
