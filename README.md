# 🍱 BENTO - Interactive Recipe Generator

**Join the community:** [#bento on Matrix (matrix.ben-to.fr)](https://matrix.to/#/#bento:matrix.ben-to.fr) · **Support the project:** [Ko-fi](https://ko-fi.com/kazerlelutin)

[![Bun](https://img.shields.io/badge/Runtime-Bun-000000?style=for-the-badge&logo=bun)](https://bun.sh/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tests](https://img.shields.io/badge/Tests-Cucumber-23D96C?style=for-the-badge&logo=cucumber&logoColor=white)](https://cucumber.io/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

[![Coverage](https://img.shields.io/badge/Coverage-93%25-brightgreen?style=for-the-badge)](https://github.com/kazerlelutin/bento)
[![Build Status](https://img.shields.io/badge/Build-Passing-brightgreen?style=for-the-badge)](https://github.com/kazerlelutin/bento)
[![Dependencies](https://img.shields.io/badge/Dependencies-Up%20to%20date-brightgreen?style=for-the-badge)](https://github.com/kazerlelutin/bento)

> An interactive recipe generator with pixel art, allowing you to create recipe variants from modular bases.

## 🎌 Concept

**Bento** is a web application that turns recipe creation into an interactive and fun experience. Users can create recipe variants by combining modular bases with specific ingredients and steps, all with a retro pixel art design.

## 🧭 How it works

### ✨ **No account required**

The app works instantly, no signup or account needed.

### 🎯 **Guided journey**

1. **Choose your recipe base**: cake, onigiri, empanada, etc.
2. **Select a variant**: lemon cake, kimchi onigiri, veggie empanada, etc.
3. **Review ingredients**: automatic combination of base + variant ingredients
4. **Follow steps**: ordered sequence of preparation steps
5. **Export recipe**: generate markdown or JSON format

### 🎨 **Visual experience**

- Each ingredient is represented by a pixel art icon
- Retro and playful design
- Modular recipe system with bases and variants
- Step-by-step recipe generation

## 📤 Goal: Create, not store

The goal is **not to save recipes** but to let users:

- 📝 **Generate recipes** in markdown or JSON format
- 🎮 **Have fun** exploring recipe variants and combinations
- 🌱 **Discover** modular cooking concepts
- 📚 **Learn** about recipe structure and ingredient relationships

## 🧠 Technology & Values

### 🛠️ **Tech stack**

- **Frontend**: Vanilla JS/TS, HTML, CSS
- **Hosting**: Infomaniak
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
- **Educational**: Discover modular cooking concepts

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
├── features/              # Feature-based architecture
│   ├── recipe/            # Recipe system (bases, variants, ingredients)
│   ├── router/            # Navigation management
│   ├── translate/         # Multi-language support
│   ├── export/            # Recipe export functionality
│   └── composer/          # Recipe composition interface
├── docs/                  # Generated documentation
│   └── feature-documentation.md
├── scripts/               # Utility scripts
│   └── generate-feature-docs.ts
└── public/                # Static assets
    └── style.css
```

## 🔧 Main Features

### 1. **Modular Recipe System**

Create recipes from bases and variants:

```typescript
// Base recipe
const cakeBase = {
  ingredients: [
    'sugar_powder',
    'butter_soft',
    'eggs',
    'flour_t55',
    'baking_powder',
  ],
  steps: [
    { id: 'melt_butter', order: 10 },
    { id: 'mix_butter_sugar', order: 20 },
    { id: 'add_flour_baking_powder', order: 40 },
  ],
}

// Variant recipe
const lemonCakeVariant = {
  ingredients: ['lemon', 'lemon_juice'],
  steps: [{ id: 'add_lemon_zest_juice', order: 30 }],
}
```

### 2. **Ordered Step System**

Steps are automatically ordered and merged:

```typescript
// Final recipe combines base + variant steps
const finalSteps = [
  { id: 'melt_butter', order: 10 },
  { id: 'mix_butter_sugar', order: 20 },
  { id: 'add_lemon_zest_juice', order: 30 }, // From variant
  { id: 'add_flour_baking_powder', order: 40 },
].sort((a, b) => a.order - b.order)
```

### 3. **Recipe Export**

Generate recipes in multiple formats:

```typescript
// Export to Markdown
const markdown = recipe.toMd()

// Export to JSON
const json = recipe.toJson()
```

### 4. **Feature-based Architecture**

Code organized by business features:

- **Recipe**: Base and variant management
- **Router**: Navigation management
- **Export**: Recipe export functionality
- **Composer**: Recipe composition interface

## 🧪 BDD Tests

The project uses Cucumber for BDD tests, allowing you to describe behavior in natural language:

```gherkin
Feature: Recipe Generation
  As a user
  I want to create recipe variants
  So that I can explore different cooking options

  Scenario: Creating a lemon cake
    When I select "cake" as base
    And I choose "lemon" variant
    Then I should see the combined recipe
    And the steps should be properly ordered
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

| Script                     | Description                      |
| -------------------------- | -------------------------------- |
| `bun run dev`              | Development server               |
| `bun run test:integration` | Cucumber integration tests       |
| `bun run docs:features`    | Generate feature documentation   |
| `bun run build`            | Production build                 |
| `bun run coverage`         | Generate coverage report         |
| `bun run badge:coverage`   | Update the coverage badge        |
| `bun run validate:recipes` | Validate recipe system integrity |

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
- Recipe system validation to prevent regressions

### ✅ **Scalability**

- Easy to add new ingredients
- Modular structure
- No framework limitations

## 🌱 Supported Recipes

### 🍰 **Cake Base**

- **Base ingredients**: Sugar, butter, eggs, flour, baking powder
- **Variants**: Lemon cake, chocolate cake, vanilla cake
- **Steps**: Melt butter → Mix ingredients → Add flavorings → Bake

### 🍙 **Onigiri Base**

- **Base ingredients**: Rice, water, salt
- **Variants**: Kimchi onigiri, cheese onigiri
- **Steps**: Wash rice → Cook rice → Season → Shape

### 🥟 **Empanada Base**

- **Base ingredients**: Flour, water, salt, oil
- **Variants**: Savory veggie empanada, black bean empanada
- **Steps**: Mix dough → Knead → Rest → Fill and cook

### 🧂 **Ingredient Categories**

- **Liquids**: Water, lemon juice, oils
- **Powders**: Salt, sugar, spices, baking powder
- **Fats**: Butter, margarine
- **Grains**: Rice, flour varieties
- **Vegetables**: Onions, peppers, corn
- **Proteins**: Eggs, beans, tempeh

## 💬 Community

**[Join #bento on Matrix](https://matrix.to/#/#bento:matrix.ben-to.fr)** — same invitation link as in the page header (project home server).

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
