# 🍱 BENTO - Générateur de Bentos Végé Personnalisés

> Une application web ludique et pixel art qui permet de composer son propre bento en choisissant chaque élément pas à pas, à la manière d'un menu Subway ou Tacos.

## 🎌 Concept

**Ben-to** est une application web qui transforme la création de bentos en une expérience interactive et amusante. Les utilisateurs peuvent composer leur propre bento végétarien en choisissant chaque ingrédient étape par étape, avec un design pixel art rétro.

## 🧭 Fonctionnement

### ✨ **Pas de compte requis**

L'app fonctionne immédiatement, sans inscription ni création de compte.

### 🎯 **Parcours guidé**

1. **Choix du type de bento** : onigiri, empanadas, gimbap, etc.
2. **Sélection des ingrédients** :
   - Base (riz, quinoa, etc.)
   - Protéines végétales
   - Légumes
   - Sauces
   - Toppings
3. **Dessert compatible** : dango, madeleine, compote, etc.
4. **Ajustement automatique** : difficulté et temps selon les choix

### 🎨 **Expérience visuelle**

- Chaque ingrédient représenté par une icône pixel art
- Design rétro et ludique
- Substitutions automatiques selon les préférences

## 📤 Objectif : Créer, pas Stocker

L'objectif n'est **pas de conserver des recettes** mais de permettre aux utilisateurs de :

- 🖼️ **Générer une image** ou fiche visuelle de leur bento
- 📱 **Partager** ce contenu sur les réseaux (TikTok, Instagram...)
- 🎮 **S'amuser** à composer, explorer, apprendre
- 🌱 **Découvrir** la cuisine végétarienne japonaise

## 🧠 Technologie et Valeurs

### 🛠️ **Stack Technique**

- **Frontend** : Vanilla JS/TS, HTML, CSS
- **Hébergement** : Cloudflare
- **Base de données** : IndexedDB
- **Runtime** : Bun

### 🎨 **Design**

- **Style** : Tout en pixel art, rétro
- **UX** : Interface intuitive et ludique
- **Responsive** : Adapté mobile et desktop

### 🌱 **Valeurs**

- **Éco-responsable** : Optimisé, local-first
- **Respect de la vie privée** : Aucune pub intrusive
- **Minimaliste** : Stack simple et efficace
- **Éducatif** : Découverte de la cuisine végétarienne

## 🚀 Pourquoi Sans Framework ?

Cette application démontre qu'on peut créer une expérience moderne **sans framework lourd** :

- ⚡ **Performance maximale** - Pas de surcharge de framework
- 📦 **Bundle minimal** - Seulement le code nécessaire
- 🎯 **Contrôle total** - Pas de "magie" cachée
- 🚀 **Démarrage rapide** - Bun + vanilla JS
- 🧠 **Apprentissage** - Comprendre les concepts fondamentaux

## 📁 Architecture

```
bento/
├── app.ts                 # Point d'entrée principal
├── index.html            # Page HTML principale avec templates
├── features/             # Tests BDD Cucumber
│   ├── router/           # Feature: Navigation
│   └── translate/        # Feature: Traduction
├── docs/                 # Documentation générée
│   └── feature-documentation.md
├── scripts/              # Scripts utilitaires
│   └── generate-feature-docs.ts
└── public/               # Assets statiques
    └── style.css
```

## 🔧 Fonctionnalités Développées

### 1. **Système de Templates Natif**

Utilisation des templates HTML natifs pour la structure modulaire :

```html
<template id="bento-builder-template">
  <div class="bento-builder">
    <h1>Composez votre Bento</h1>
    <!-- Interface de sélection -->
  </div>
</template>
```

### 2. **Proxy Réactif Vanilla**

Réactivité sans framework, juste avec les proxies JavaScript :

```typescript
const bentoState = new Proxy(
  {
    base: null,
    proteins: [],
    vegetables: [],
    sauces: [],
    toppings: [],
  },
  {
    set(target, property, value) {
      target[property] = value
      updateBentoPreview() // Mise à jour automatique
      return true
    },
  }
)
```

### 3. **Router Frontend Custom**

Navigation côté client développée from scratch :

```typescript
// Navigation entre les étapes
;<a href="/bento/builder" data-internal>
  Créer mon Bento
</a>
```

### 4. **Architecture Features**

Organisation du code par fonctionnalités métier :

- **Router** : Gestion de la navigation
- **BentoBuilder** : Logique de composition
- **Ingredients** : Gestion des ingrédients
- **Export** : Génération d'images/fiches

## 🧪 Tests BDD

Le projet utilise Cucumber pour les tests BDD, permettant de décrire le comportement en langage naturel :

```gherkin
Feature: Bento Builder
  As a user
  I want to create a custom bento
  So that I can enjoy a personalized meal

  Scenario: Building a basic bento
    When I select "onigiri" as base
    And I add "tofu" as protein
    Then I should see my bento preview
```

### Génération de Documentation

La documentation des features est générée automatiquement :

```bash
bun run docs:features
```

📖 **[Voir la documentation des features](./docs/feature-documentation.md)**

## 🛠️ Installation et Utilisation

### Prérequis

- [Bun](https://bun.sh/) installé

### Installation

```bash
# Cloner le projet
git clone <repository>
cd bento

# Installer les dépendances
bun install
```

### Développement

```bash
# Lancer le serveur de développement
bun run dev

# Lancer les tests d'intégration
bun run test:integration

# Générer la documentation
bun run docs:features
```

### Build

```bash
# Build de production
bun run build
```

## 📊 Scripts Disponibles

| Script                     | Description                          |
| -------------------------- | ------------------------------------ |
| `bun run dev`              | Serveur de développement             |
| `bun run test:integration` | Tests d'intégration Cucumber         |
| `bun run docs:features`    | Génère la documentation des features |
| `bun run build`            | Build de production                  |
| `bun run coverage`         | Génère le rapport de couverture      |

## 🎯 Avantages de Cette Approche

### ✅ **Performance**

- Pas de surcharge de framework
- Bundle minimal
- Démarrage ultra-rapide avec Bun

### ✅ **Simplicité**

- Code vanilla JavaScript/TypeScript
- Pas de concepts abstraits à apprendre
- Contrôle total sur l'architecture

### ✅ **Maintenabilité**

- Architecture claire et prévisible
- Tests BDD pour la qualité
- Documentation générée automatiquement

### ✅ **Évolutivité**

- Facile d'ajouter de nouveaux ingrédients
- Structure modulaire
- Pas de limitations de framework

## 🌱 Ingrédients Supportés

### 🍚 **Bases**

- Riz blanc/basmati/quinoa
- Onigiri
- Gimbap
- Empanadas

### 🥜 **Protéines Végétales**

- Tofu
- Tempeh
- Seitan
- Légumineuses

### 🥬 **Légumes**

- Carottes, concombre
- Épinards, chou
- Avocat, tomates
- Kimchi (avec niveau de difficulté)

### 🍯 **Sauces**

- Sauce soja
- Miso
- Tahini
- Vinaigrette

### 🎨 **Toppings**

- Graines de sésame
- Algues nori
- Fleurs comestibles
- Herbes fraîches

## 🤝 Contribution

1. Fork le projet
2. Créez une branche feature (`git checkout -b feature/NewIngredient`)
3. Committez vos changements (`git commit -m 'Add new ingredient'`)
4. Push vers la branche (`git push origin feature/NewIngredient`)
5. Ouvrez une Pull Request

## 📝 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 👨‍💻 Auteur

**Kazerlelutin**

- 🎨 [Gif creator](https://giphy.com/kazerlelutin)
- ⌨️ JavaScript developer
- 🌐 [Portfolio](https://kazerlelutin.space/)

---

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/V7V46KBQ9)
