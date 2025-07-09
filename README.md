# 🍱 BENTO - Custom Veggie Bento Generator

[![Bun](https://img.shields.io/badge/Runtime-Bun-000000?style=for-the-badge&logo=bun)](https://bun.sh/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tests](https://img.shields.io/badge/Tests-Cucumber-23D96C?style=for-the-badge&logo=cucumber&logoColor=white)](https://cucumber.io/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

[![Coverage](https://img.shields.io/badge/Coverage-92%25-brightgreen?style=for-the-badge)](https://github.com/kazerlelutin/bento)
[![Build Status](https://img.shields.io/badge/Build-Passing-brightgreen?style=for-the-badge)](https://github.com/kazerlelutin/bento)
[![Dependencies](https://img.shields.io/badge/Dependencies-Up%20to%20date-brightgreen?style=for-the-badge)](https://github.com/kazerlelutin/bento)

> A playful pixel-art web app to compose your own veggie bento, step by step, like a Subway or Tacos menu.

## 🎌 Concept

**Ben-to** is a web application that turns bento creation into an interactive and fun experience. Users can compose their own vegetarian bento by choosing each ingredient step by step, with a retro pixel art design.

## 🧭 How it works

### ✨ **No account required**

The app works instantly, no signup or account needed.

### 🎯 **Guided journey**

1. **Choose your bento type**: onigiri, empanadas, gimbap, etc.
2. **Select ingredients**:
   - Base (rice, quinoa, etc.)
   - Plant-based proteins
   - Vegetables
   - Sauces
   - Toppings
3. **Dessert suggestion**: dango, madeleine, compote, etc.
4. **Automatic adjustment**: difficulty and time based on your choices

### 🎨 **Visual experience**

- Each ingredient is represented by a pixel art icon
- Retro and playful design
- Automatic substitutions based on preferences

## 📤 Goal: Create, not store

The goal is **not to save recipes** but to let users:

- 🖼️ **Generate an image** or visual card of their bento
- 📱 **Share** this content on social media (TikTok, Instagram...)
- 🎮 **Have fun** composing, exploring, learning
- 🌱 **Discover** Japanese vegetarian cuisine

## 🧠 Technology & Values

### 🛠️ **Tech stack**

- **Frontend**: Vanilla JS/TS, HTML, CSS
- **Hosting**: Cloudflare
- **Database**: IndexedDB
- **Runtime**: Bun

### 🎨 **Design**

- **Style**: All pixel art, retro
- **UX**: Intuitive and playful interface
- **Responsive**: Mobile and desktop friendly

### 🌱 **Values**

- **Eco-friendly**: Optimized, local-first
- **Privacy-respecting**: No intrusive ads
- **Minimalist**: Simple and efficient stack
- **Educational**: Discover vegetarian cuisine

## 🚀 Why No Framework?

This app demonstrates you can build a modern experience **without a heavy framework**:

- ⚡ **Maximum performance** - No framework overhead
- 📦 **Minimal bundle** - Only the code you need
- 🎯 **Full control** - No hidden "magic"
- 🚀 **Fast startup** - Bun + vanilla JS
- 🧠 **Learning** - Understand the fundamentals

## 📁 Architecture

```
bento/
├── app.ts                 # Main entry point
├── index.html             # Main HTML page with templates
├── features/              # Cucumber BDD tests
│   ├── router/            # Feature: Navigation
│   └── translate/         # Feature: Translation
├── docs/                  # Generated documentation
│   └── feature-documentation.md
├── scripts/               # Utility scripts
│   └── generate-feature-docs.ts
└── public/                # Static assets
    └── style.css
```

## 🔧 Main Features

### 1. **Native Template System**

Use native HTML templates for modular structure:

```html
<template id="bento-builder-template">
  <div class="bento-builder">
    <h1>Compose your Bento</h1>
    <!-- Selection interface -->
  </div>
</template>
```

### 2. **Vanilla Reactive Proxy**

Reactivity without a framework, just with JavaScript proxies:

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
      updateBentoPreview() // Auto update
      return true
    },
  }
)
```

### 3. **Custom Frontend Router**

Client-side navigation built from scratch:

```typescript
// Step navigation
;<a href="/bento/builder" data-internal>
  Create my Bento
</a>
```

### 4. **Feature-based Architecture**

Code organized by business features:

- **Router**: Navigation management
- **BentoBuilder**: Composition logic
- **Ingredients**: Ingredient management
- **Export**: Image/card generation

## 🧪 BDD Tests

The project uses Cucumber for BDD tests, allowing you to describe behavior in natural language:

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

### Documentation Generation

Feature documentation is generated automatically:

```bash
bun run docs:features
```

📖 **[See the feature documentation](./docs/feature-documentation.md)**

## 🛠️ Installation & Usage

### Prerequisites

- [Bun](https://bun.sh/) installed

### Installation

```bash
# Clone the project
git clone <repository>
cd bento

# Install dependencies
bun install
```

### Development

```bash
# Start the dev server
bun run dev

# Run integration tests
bun run test:integration

# Generate documentation
bun run docs:features
```

### Build

```bash
# Production build
bun run build
```

## 📊 Available Scripts

| Script                     | Description                    |
| -------------------------- | ------------------------------ |
| `bun run dev`              | Development server             |
| `bun run test:integration` | Cucumber integration tests     |
| `bun run docs:features`    | Generate feature documentation |
| `bun run build`            | Production build               |
| `bun run coverage`         | Generate coverage report       |
| `bun run badge:coverage`   | Update the coverage badge      |

## 🏷️ Badges & Quality

### Coverage Badges

The coverage badge is generated automatically from test results:

```bash
# Generate the badge from current coverage
bun run badge:coverage

# Generate the badge with a specific coverage
bun run badge:coverage 85
```

### Badge Colors

- 🟢 **Bright Green**: 90%+ (Excellent)
- 🟢 **Green**: 80-89% (Good)
- 🟡 **Yellow Green**: 70-79% (Acceptable)
- 🟡 **Yellow**: 60-69% (Needs improvement)
- 🟠 **Orange**: 50-59% (Low)
- 🔴 **Red**: <50% (Critical)

## 🎯 Approach Advantages

### ✅ **Performance**

- No framework overhead
- Minimal bundle
- Ultra-fast startup with Bun

### ✅ **Simplicity**

- Vanilla JavaScript/TypeScript code
- No abstract concepts to learn
- Full control over architecture

### ✅ **Maintainability**

- Clear and predictable architecture
- BDD tests for quality
- Auto-generated documentation

### ✅ **Scalability**

- Easy to add new ingredients
- Modular structure
- No framework limitations

## 🌱 Supported Ingredients

### 🍚 **Bases**

- White/basmati/quinoa rice
- Onigiri
- Gimbap
- Empanadas

### 🥜 **Plant-based Proteins**

- Tofu
- Tempeh
- Seitan
- Legumes

### 🥬 **Vegetables**

- Carrots, cucumber
- Spinach, cabbage
- Avocado, tomatoes
- Kimchi (with difficulty level)

### 🍯 **Sauces**

- Soy sauce
- Miso
- Tahini
- Vinaigrette

### 🎨 **Toppings**

- Sesame seeds
- Nori seaweed
- Edible flowers
- Fresh herbs

## 🤝 Contributing

Please read the [Contributing Guide](./CONTRIBUTING.md) for detailed instructions, naming conventions, feature structure, and workflow before opening a pull request.

1. Fork the project
2. Create a feature branch (`git checkout -b feature/NewIngredient`)
3. Commit your changes (`git commit -m 'Add new ingredient'`)
4. Push to the branch (`git push origin feature/NewIngredient`)
5. Open a Pull Request

## 📝 License

This project is MIT licensed. See the `LICENSE` file for details.

## 👨‍💻 Author

**Kazerlelutin**

- 🎨 [Gif creator](https://giphy.com/kazerlelutin)
- ⌨️ JavaScript developer
- 🌐 [Portfolio](https://kazerlelutin.space/)

---

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/V7V46KBQ9)
