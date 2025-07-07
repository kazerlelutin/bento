# Contributing Guide

Welcome to the Bento project! This document explains how to contribute, the project architecture, naming conventions, feature organization, testing strategy, and best practices for maintainability and scalability.

---

## 📁 Project Structure & Feature-First Architecture

- **Everything is organized by feature** (domain-driven):
  - Each feature has its own folder (e.g. `features/pages/`, `features/router/`).
  - Sub-features (e.g. pages) are nested inside their parent feature.
  - Shared utilities, types, and helpers are grouped by feature.

**Example:**

```
features/
  router/
    router.ctrl.ts         # Controller for router logic
    router.state.ts        # State management for router
    router.type.ts         # Types for router
    router.utils.ts        # Utilities for router
    router.feature         # Cucumber feature file
    router.ctrl.test.ts    # Unit test for controller
    router.state.test.ts   # Unit test for state
    router.type.test.ts    # (if needed)
    router.utils.test.ts   # (if needed)
  pages/
    about/
      about.ctrl.ts
      about.ctrl.test.ts
      about.feature
      about.type.ts
      about.utils.ts
    home/
      home.ctrl.ts
      home.ctrl.test.ts
      home.feature
      home.type.ts
      home.utils.ts
```

---

## 🏷️ Naming Conventions

- **File names always start with the feature name** (e.g. `router.`, `about.`, `home.`)
- **Then the scope** (e.g. `ctrl`, `state`, `type`, `utils`, `feature`, `test`)
- **Extensions**: `.ts`, `.test.ts`, `.feature`, etc.
- **Types**: always grouped in `*.type.ts` files, one per feature.
- **Controller**: `*.ctrl.ts` is the controller for a page/component/state.
- **Utils**: `*.utils.ts` for helpers/utilities, always next to the feature.
- **Tests**: every file with logic (except types) must have a corresponding `.test.ts` file next to it.
- **Feature files**: always named `<feature>.feature` and placed in the feature folder.

**Examples:**

- `router.ctrl.ts`, `router.ctrl.test.ts`
- `about.ctrl.ts`, `about.ctrl.test.ts`
- `home.utils.ts`, `home.utils.test.ts`
- `router.type.ts`

---

## 🧪 Testing Strategy

- **Unit tests**: Every controller, utility, or state file must have a `.test.ts` file next to it.
- **Test framework**: Use Bun's Jest-like API (`bun:test`).
- **BDD tests**: Use Cucumber feature files for integration/acceptance tests.
- **Test file naming**: Always `<feature>.<scope>.test.ts` (e.g. `about.ctrl.test.ts`).
- **Test coverage**: Aim for 100% coverage on all logic files.
- **Test tags**: Use tags in `.feature` files to indicate cross-feature dependencies or external impacts.

---

## 🏷️ Tags & Feature Traceability

- **Every scenario or step that interacts with another feature must be tagged** with the relevant feature name (e.g. `@router`, `@pages`, `@about`).
- **Tags** help track dependencies and impacts between features, and make it easier to spot regressions.
- **Comment** in the `.feature` file to explain the tag if it's not obvious.
- **Background**: Only use the `Background` section for shared context/setup, not for cross-feature logic.

---

## 🧩 Feature File Guidelines

- **One feature per file**: Each `.feature` file should only describe scenarios relevant to its feature.
- **No "future" or speculative scenarios**: Only describe what is currently implemented.
- **Background**: Use only for context/setup common to all scenarios in the feature.
- **Keep scenarios atomic**: Each scenario should test a single behavior or flow.
- **Use tags for all external dependencies**.

---

## 🚦 Workflow & Pull Requests

1. **Create a branch for each ticket/feature/fix**
   - Naming: `feature/<feature-name>`, `fix/<bug-description>`, etc.
2. **Write code and tests**
   - Always add/modify tests with your code.
3. **Update documentation if needed**
   - Update README, feature docs, or this CONTRIBUTING file if conventions change.
4. **Open a Pull Request**
   - Reference the ticket/issue.
   - Describe what you changed and why.
   - List any new tags or cross-feature impacts.
5. **Review & Merge**
   - At least one review (if possible).
   - Ensure all tests pass and coverage is maintained.

---

## 🧹 Clean Code Principles

- **Single Responsibility**: Each file/module does one thing.
- **Explicit dependencies**: Always import from the feature folder, not from unrelated features.
- **No dead code**: Remove unused code, comments, and scenarios.
- **Keep features independent**: Minimize coupling between features.
- **Document with comments and tags**: Especially for cross-feature logic.

---

## 💡 Example: Adding a New Page Feature

1. Create a folder: `features/pages/newpage/`
2. Add files:
   - `newpage.ctrl.ts` (controller)
   - `newpage.ctrl.test.ts` (unit test)
   - `newpage.feature` (BDD scenarios)
   - `newpage.type.ts` (types)
   - `newpage.utils.ts` (helpers)
3. Tag any scenario that interacts with other features (e.g. `@router`)
4. Add/modify routes if needed, always in a dedicated feature file.
5. Update documentation if needed.

---

## 🤝 Thank you for contributing!

Your attention to structure, naming, and testing helps keep Bento robust, scalable, and fun to work on. If you have questions, open an issue or ask in your Pull Request!
