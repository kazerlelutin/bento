# 📋 Cucumber Features Documentation

> Documentation automatically generated from `.feature` files

## 📑 Table of Contents

1. [Base selection for bento](#base-selection-for-bento)<br/>
   1.1. [Base selection initialization](#base-selection-for-bento-base-selection-initialization)<br/>
   1.2. [Selecting a different base](#base-selection-for-bento-selecting-a-different-base)<br/>
   1.3. [Attempting to select an already selected base](#base-selection-for-bento-attempting-to-select-an-already-selected-base)<br/>
   1.4. [Interface cleanup](#base-selection-for-bento-interface-cleanup)<br/>
   1.5. [Error handling - base not found](#base-selection-for-bento-error-handling-base-not-found)<br/>
   1.6. [Retrieving a base by ID](#base-selection-for-bento-retrieving-a-base-by-id)<br/>
   1.7. [Generating a random base](#base-selection-for-bento-generating-a-random-base)<br/>
2. [Unnamed Feature](#unnamed-feature)<br/>
3. [Recipe composition and ingredient selection](#recipe-composition-and-ingredient-selection)<br/>
   3.1. [Composer initialization](#recipe-composition-and-ingredient-selection-composer-initialization)<br/>
   3.2. [Selecting an optional ingredient](#recipe-composition-and-ingredient-selection-selecting-an-optional-ingredient)<br/>
   3.3. [Deselecting an optional ingredient](#recipe-composition-and-ingredient-selection-deselecting-an-optional-ingredient)<br/>
   3.4. [Changing core ingredient variant](#recipe-composition-and-ingredient-selection-changing-core-ingredient-variant)<br/>
   3.5. [Substituting an ingredient](#recipe-composition-and-ingredient-selection-substituting-an-ingredient)<br/>
   3.6. [Handling ingredient foes](#recipe-composition-and-ingredient-selection-handling-ingredient-foes)<br/>
   3.7. [Recipe name generation](#recipe-composition-and-ingredient-selection-recipe-name-generation)<br/>
   3.8. [Composer cleanup](#recipe-composition-and-ingredient-selection-composer-cleanup)<br/>
   3.9. [Error handling - base not found](#recipe-composition-and-ingredient-selection-error-handling-base-not-found)<br/>
   3.10. [Error handling - variant not found](#recipe-composition-and-ingredient-selection-error-handling-variant-not-found)<br/>
4. [Navigation between crafter steps](#navigation-between-crafter-steps)<br/>
   4.1. [Display step buttons on startup](#navigation-between-crafter-steps-display-step-buttons-on-startup)<br/>
   4.2. [Change step by user click](#navigation-between-crafter-steps-change-step-by-user-click)<br/>
   4.3. [Change step by keyboard navigation](#navigation-between-crafter-steps-change-step-by-keyboard-navigation)<br/>
   4.4. [Keyboard navigation accessibility](#navigation-between-crafter-steps-keyboard-navigation-accessibility)<br/>
   4.5. [UI updates when step changes via the store](#navigation-between-crafter-steps-ui-updates-when-step-changes-via-the-store)<br/>
   4.6. [Cleanup subscriptions on destruction](#navigation-between-crafter-steps-cleanup-subscriptions-on-destruction)<br/>
   4.7. [Accessibility of step buttons](#navigation-between-crafter-steps-accessibility-of-step-buttons)<br/>
5. [Crafter Stepper](#crafter-stepper)<br/>
   5.1. [Stepper initialization](#crafter-stepper-stepper-initialization)<br/>
   5.2. [Step content changes when navigator step changes](#crafter-stepper-step-content-changes-when-navigator-step-changes)<br/>
   5.3. [Step content changes when navigator step changes to composer](#crafter-stepper-step-content-changes-when-navigator-step-changes-to-composer)<br/>
   5.4. [Step content changes when navigator step changes to export](#crafter-stepper-step-content-changes-when-navigator-step-changes-to-export)<br/>
   5.5. [Error handling when step is not found](#crafter-stepper-error-handling-when-step-is-not-found)<br/>
   5.6. [Error handling when stepper container is missing](#crafter-stepper-error-handling-when-stepper-container-is-missing)<br/>
   5.7. [Error handling when step template is missing](#crafter-stepper-error-handling-when-step-template-is-missing)<br/>
   5.8. [Stepper cleanup](#crafter-stepper-stepper-cleanup)<br/>
   5.9. [Step controller execution](#crafter-stepper-step-controller-execution)<br/>
   5.10. [Step controller execution for base step](#crafter-stepper-step-controller-execution-for-base-step)<br/>
   5.11. [Step controller execution for composer step](#crafter-stepper-step-controller-execution-for-composer-step)<br/>
   5.12. [Step controller execution for export step](#crafter-stepper-step-controller-execution-for-export-step)<br/>
   5.13. [Content replacement between steps](#crafter-stepper-content-replacement-between-steps)<br/>
   5.14. [Integration with crafter navigator store](#crafter-stepper-integration-with-crafter-navigator-store)<br/>
6. [Recipe export functionality](#recipe-export-functionality)<br/>
   6.1. [Export interface initialization](#recipe-export-functionality-export-interface-initialization)<br/>
   6.2. [Exporting recipe as Markdown](#recipe-export-functionality-exporting-recipe-as-markdown)<br/>
   6.3. [Exporting recipe as JSON](#recipe-export-functionality-exporting-recipe-as-json)<br/>
   6.4. [Recipe data generation](#recipe-export-functionality-recipe-data-generation)<br/>
   6.5. [Step filtering based on ingredients](#recipe-export-functionality-step-filtering-based-on-ingredients)<br/>
   6.6. [Text transformation with ingredients](#recipe-export-functionality-text-transformation-with-ingredients)<br/>
   6.7. [Export format button states](#recipe-export-functionality-export-format-button-states)<br/>
   6.8. [Export interface cleanup](#recipe-export-functionality-export-interface-cleanup)<br/>
   6.9. [Handling missing template elements](#recipe-export-functionality-handling-missing-template-elements)<br/>
   6.10. [Recipe name generation with customizations](#recipe-export-functionality-recipe-name-generation-with-customizations)<br/>
7. [Icon management and display](#icon-management-and-display)<br/>
   7.1. [Icon style application](#icon-management-and-display-icon-style-application)<br/>
   7.2. [Icon mapping for ingredients](#icon-management-and-display-icon-mapping-for-ingredients)<br/>
   7.3. [Icon mapping for interface elements](#icon-management-and-display-icon-mapping-for-interface-elements)<br/>
   7.4. [Icon mapping for bases](#icon-management-and-display-icon-mapping-for-bases)<br/>
   7.5. [Icon mapping for ingredients by category](#icon-management-and-display-icon-mapping-for-ingredients-by-category)<br/>
   7.6. [Icon size configuration](#icon-management-and-display-icon-size-configuration)<br/>
   7.7. [Handling missing icon mappings](#icon-management-and-display-handling-missing-icon-mappings)<br/>
   7.8. [Icon background position calculation](#icon-management-and-display-icon-background-position-calculation)<br/>
   7.9. [Multiple icon applications](#icon-management-and-display-multiple-icon-applications)<br/>
8. [Unnamed Feature](#unnamed-feature)<br/>
9. [Recipe URL management and sharing](#recipe-url-management-and-sharing)<br/>
   9.1. [URL injection on page load](#recipe-url-management-and-sharing-url-injection-on-page-load)<br/>
   9.2. [URL update on base change](#recipe-url-management-and-sharing-url-update-on-base-change)<br/>
   9.3. [URL update on variant change](#recipe-url-management-and-sharing-url-update-on-variant-change)<br/>
   9.4. [URL update on ingredient selection change](#recipe-url-management-and-sharing-url-update-on-ingredient-selection-change)<br/>
   9.5. [Recipe data encoding in URL](#recipe-url-management-and-sharing-recipe-data-encoding-in-url)<br/>
   9.6. [Recipe data decoding from URL](#recipe-url-management-and-sharing-recipe-data-decoding-from-url)<br/>
   9.7. [Handling invalid URL parameters](#recipe-url-management-and-sharing-handling-invalid-url-parameters)<br/>
   9.8. [URL parameter key management](#recipe-url-management-and-sharing-url-parameter-key-management)<br/>
   9.9. [Browser history management](#recipe-url-management-and-sharing-browser-history-management)<br/>
   9.10. [Recipe URL cleanup](#recipe-url-management-and-sharing-recipe-url-cleanup)<br/>
   9.11. [Fallback to random variant](#recipe-url-management-and-sharing-fallback-to-random-variant)<br/>
10. [Front-end Router](#front-end-router)<br/>
   10.1. [Basic navigation with template rendering](#front-end-router-basic-navigation-with-template-rendering)<br/>
   10.2. [Navigation to page with script](#front-end-router-navigation-to-page-with-script)<br/>
   10.3. [Navigation with dynamic parameters](#front-end-router-navigation-with-dynamic-parameters)<br/>
   10.4. [Navigation with query parameters](#front-end-router-navigation-with-query-parameters)<br/>
   10.5. [Page not found](#front-end-router-page-not-found)<br/>
   10.6. [Navigation with authentication](#front-end-router-navigation-with-authentication)<br/>
   10.7. [Navigation with transition and cleanup](#front-end-router-navigation-with-transition-and-cleanup)<br/>
   10.8. [Link handling with internal navigation](#front-end-router-link-handling-with-internal-navigation)<br/>
   10.9. [Back button handling](#front-end-router-back-button-handling)<br/>
   10.10. [External link handling](#front-end-router-external-link-handling)<br/>
   10.11. [Template rendering with state management](#front-end-router-template-rendering-with-state-management)<br/>
   10.12. [Script cleanup on navigation](#front-end-router-script-cleanup-on-navigation)<br/>
   10.13. [Multiple rapid navigation](#front-end-router-multiple-rapid-navigation)<br/>
   10.14. [Browser refresh handling](#front-end-router-browser-refresh-handling)<br/>
11. [Routes](#routes)<br/>
   11.1. [Basic navigation with template rendering](#routes-basic-navigation-with-template-rendering)<br/>
   11.2. [Navigation to page with script](#routes-navigation-to-page-with-script)<br/>
12. [Unnamed Feature](#unnamed-feature)<br/>
13. [Translation and internationalization](#translation-and-internationalization)<br/>
   13.1. [Language detection from browser](#translation-and-internationalization-language-detection-from-browser)<br/>
   13.2. [Language persistence in localStorage](#translation-and-internationalization-language-persistence-in-localstorage)<br/>
   13.3. [Language switching](#translation-and-internationalization-language-switching)<br/>
   13.4. [Translation retrieval](#translation-and-internationalization-translation-retrieval)<br/>
   13.5. [UI element translation](#translation-and-internationalization-ui-element-translation)<br/>
   13.6. [Supported languages](#translation-and-internationalization-supported-languages)<br/>
   13.7. [Translation key management](#translation-and-internationalization-translation-key-management)<br/>
   13.8. [Fallback translation behavior](#translation-and-internationalization-fallback-translation-behavior)<br/>
   13.9. [Language storage key management](#translation-and-internationalization-language-storage-key-management)<br/>
   13.10. [Dynamic translation updates](#translation-and-internationalization-dynamic-translation-updates)<br/>
   13.11. [Translation data structure](#translation-and-internationalization-translation-data-structure)<br/>
14. [Application version management](#application-version-management)<br/>
   14.1. [Version display initialization](#application-version-management-version-display-initialization)<br/>
   14.2. [Version element update](#application-version-management-version-element-update)<br/>
   14.3. [Version constant management](#application-version-management-version-constant-management)<br/>
   14.4. [Version element not found](#application-version-management-version-element-not-found)<br/>
   14.5. [Version display on page load](#application-version-management-version-display-on-page-load)<br/>
   14.6. [Version consistency](#application-version-management-version-consistency)<br/>
   14.7. [Version format validation](#application-version-management-version-format-validation)<br/>
   14.8. [Version display in footer](#application-version-management-version-display-in-footer)<br/>
   14.9. [Version updates tracking](#application-version-management-version-updates-tracking)<br/>
   14.10. [Version system cleanup](#application-version-management-version-system-cleanup)<br/>


---

## 1. Base selection for bento {#base-selection-for-bento}

> As a bento generator user

**File:** `features\base\base.feature`

### 🔧 Background

- **GIVEN** the application is initialized
- **AND** recipe bases are available


### 🎯 Scenarios

#### 1.1. Base selection initialization {#base-selection-for-bento-base-selection-initialization}

🔧 **GIVEN** I am on the base selection page<br>
🎯 **WHEN** the base selection interface loads<br>
✅ **THEN** I see all available bases (onigiri, empanada, gimbap, cake, savoy_cake)<br>
➕ **AND** each base displays its translated name<br>
➕ **AND** each base displays its corresponding icon<br>
➕ **AND** a random base is preselected by default<br>
➕ **AND** the preselected base is disabled<br>

#### 1.2. Selecting a different base {#base-selection-for-bento-selecting-a-different-base}

🔧 **GIVEN** I am on the base selection page<br>
➕ **AND** a base is currently selected<br>
🎯 **WHEN** I click on another available base<br>
✅ **THEN** the new base becomes the current base<br>
➕ **AND** the previously selected base becomes available again<br>
➕ **AND** the newly selected base becomes disabled<br>
➕ **AND** a random variant is generated for the new base<br>

#### 1.3. Attempting to select an already selected base {#base-selection-for-bento-attempting-to-select-an-already-selected-base}

🔧 **GIVEN** I am on the base selection page<br>
➕ **AND** a base is currently selected and disabled<br>
🎯 **WHEN** I click on this same base<br>
✅ **THEN** nothing happens<br>
➕ **AND** the base remains selected<br>
➕ **AND** the base remains disabled<br>

#### 1.4. Interface cleanup {#base-selection-for-bento-interface-cleanup}

🔧 **GIVEN** the base selection interface is displayed<br>
🎯 **WHEN** I navigate to another page<br>
✅ **THEN** the base selection interface is cleaned up<br>
➕ **AND** click events are removed<br>
➕ **AND** the container is emptied<br>

#### 1.5. Error handling - base not found {#base-selection-for-bento-error-handling-base-not-found}

🔧 **GIVEN** I am on the base selection page<br>
🎯 **WHEN** the system attempts to retrieve a base with an invalid ID<br>
✅ **THEN** an error is thrown indicating that the base was not found<br>

#### 1.6. Retrieving a base by ID {#base-selection-for-bento-retrieving-a-base-by-id}

🔧 **GIVEN** recipe bases are loaded<br>
🎯 **WHEN** I request a base by its valid ID<br>
✅ **THEN** the corresponding base is returned<br>
➕ **AND** the base contains its ingredients and steps<br>

#### 1.7. Generating a random base {#base-selection-for-bento-generating-a-random-base}

🔧 **GIVEN** recipe bases are loaded<br>
🎯 **WHEN** I request a random base<br>
✅ **THEN** a valid base is returned<br>
➕ **AND** this base is part of the available bases<br>



---

## 2. Unnamed Feature {#unnamed-feature}

**File:** `features\bento-viewer\bento-viewer.feature`

### 🎯 Scenarios



---

## 3. Recipe composition and ingredient selection {#recipe-composition-and-ingredient-selection}

> As a bento generator user

**File:** `features\composer\composer.feature`

### 🔧 Background

- **GIVEN** the application is initialized
- **AND** a base is selected
- **AND** recipe variants are available


### 🎯 Scenarios

#### 3.1. Composer initialization {#recipe-composition-and-ingredient-selection-composer-initialization}

🔧 **GIVEN** I am on the composer page<br>
🎯 **WHEN** the composer interface loads<br>
✅ **THEN** I see all ingredients for the current base and variant<br>
➕ **AND** ingredients are sorted by role (core, optional, base)<br>
➕ **AND** each ingredient displays its translated name<br>
➕ **AND** each ingredient displays its corresponding icon<br>
➕ **AND** core ingredients show exchange action if multiple variants exist<br>
➕ **AND** optional ingredients show add/delete action based on selection state<br>
➕ **AND** ingredients with substitutes show exchange action<br>

#### 3.2. Selecting an optional ingredient {#recipe-composition-and-ingredient-selection-selecting-an-optional-ingredient}

🔧 **GIVEN** I am on the composer page<br>
➕ **AND** an optional ingredient is not selected<br>
🎯 **WHEN** I click on the optional ingredient<br>
✅ **THEN** the ingredient becomes selected<br>
➕ **AND** the action icon changes to delete<br>
➕ **AND** the ingredient state is updated in the store<br>

#### 3.3. Deselecting an optional ingredient {#recipe-composition-and-ingredient-selection-deselecting-an-optional-ingredient}

🔧 **GIVEN** I am on the composer page<br>
➕ **AND** an optional ingredient is selected<br>
🎯 **WHEN** I click on the selected optional ingredient<br>
✅ **THEN** the ingredient becomes deselected<br>
➕ **AND** the action icon changes to add<br>
➕ **AND** the ingredient state is updated in the store<br>

#### 3.4. Changing core ingredient variant {#recipe-composition-and-ingredient-selection-changing-core-ingredient-variant}

🔧 **GIVEN** I am on the composer page<br>
➕ **AND** multiple variants exist for the current base<br>
🎯 **WHEN** I click on a core ingredient<br>
✅ **THEN** the variant changes to the next available variant<br>
➕ **AND** all selected ingredients are reset<br>
➕ **AND** the UI is updated to reflect the new variant<br>

#### 3.5. Substituting an ingredient {#recipe-composition-and-ingredient-selection-substituting-an-ingredient}

🔧 **GIVEN** I am on the composer page<br>
➕ **AND** an ingredient has substitutes available<br>
🎯 **WHEN** I click on the ingredient with substitutes<br>
✅ **THEN** the ingredient changes to the next substitute in the list<br>
➕ **AND** the ingredient cycles through all available substitutes<br>
➕ **AND** foe ingredients are automatically deselected if applicable<br>

#### 3.6. Handling ingredient foes {#recipe-composition-and-ingredient-selection-handling-ingredient-foes}

🔧 **GIVEN** I am on the composer page<br>
➕ **AND** an ingredient has foes defined<br>
🎯 **WHEN** I select an ingredient that has foes<br>
✅ **THEN** all foe ingredients are automatically deselected<br>
➕ **AND** the foe relationships are respected<br>

#### 3.7. Recipe name generation {#recipe-composition-and-ingredient-selection-recipe-name-generation}

🔧 **GIVEN** I am on the composer page<br>
➕ **AND** ingredients are selected and customized<br>
🎯 **WHEN** the recipe name is generated<br>
✅ **THEN** the name includes the base name<br>
➕ **AND** the name includes the top 2 ingredients by score<br>
➕ **AND** the name uses the appropriate ingredient components<br>

#### 3.8. Composer cleanup {#recipe-composition-and-ingredient-selection-composer-cleanup}

🔧 **GIVEN** the composer interface is displayed<br>
🎯 **WHEN** I navigate to another page<br>
✅ **THEN** the composer subscriptions are cleaned up<br>
➕ **AND** the UI event listeners are removed<br>

#### 3.9. Error handling - base not found {#recipe-composition-and-ingredient-selection-error-handling-base-not-found}

🔧 **GIVEN** I am on the composer page<br>
🎯 **WHEN** the system attempts to load variants for an invalid base<br>
✅ **THEN** an error is thrown indicating that the base was not found<br>

#### 3.10. Error handling - variant not found {#recipe-composition-and-ingredient-selection-error-handling-variant-not-found}

🔧 **GIVEN** I am on the composer page<br>
🎯 **WHEN** the system attempts to load an invalid variant<br>
✅ **THEN** an error is thrown indicating that the variant was not found<br>



---

## 4. Navigation between crafter steps {#navigation-between-crafter-steps}

**File:** `features\crafter-navigator\crafter-navigator.feature`

### 🎯 Scenarios

#### 4.1. Display step buttons on startup {#navigation-between-crafter-steps-display-step-buttons-on-startup}

🔧 **GIVEN** the DOM contains an element with id "crafter-controls"<br>
🎯 **WHEN** I initialize the Crafter Navigator<br>
✅ **THEN** each crafter step has a button in the container<br>
➕ **AND** the button corresponding to the current step has the aria-current attribute set to "true"<br>
➕ **AND** the container has click and keydown event listeners attached<br>

#### 4.2. Change step by user click {#navigation-between-crafter-steps-change-step-by-user-click}

🔧 **GIVEN** the Crafter Navigator is initialized with multiple steps<br>
➕ **AND** the container contains the step buttons<br>
🎯 **WHEN** I click on the button of a different step<br>
✅ **THEN** the store's setCurrentStep method is called with the name of the clicked step<br>

#### 4.3. Change step by keyboard navigation {#navigation-between-crafter-steps-change-step-by-keyboard-navigation}

🔧 **GIVEN** the Crafter Navigator is initialized with multiple steps<br>
➕ **AND** the container contains the step buttons<br>
🎯 **WHEN** I press Enter or Space on the button of a different step<br>
✅ **THEN** the store's setCurrentStep method is called with the name of the focused step<br>

#### 4.4. Keyboard navigation accessibility {#navigation-between-crafter-steps-keyboard-navigation-accessibility}

🔧 **GIVEN** the Crafter Navigator is initialized<br>
✅ **THEN** each button is focusable with Tab key<br>
➕ **AND** each button can be activated with Enter or Space key<br>
➕ **AND** each button has proper ARIA attributes for screen readers<br>

#### 4.5. UI updates when step changes via the store {#navigation-between-crafter-steps-ui-updates-when-step-changes-via-the-store}

🔧 **GIVEN** the Crafter Navigator is initialized<br>
➕ **AND** the current step is "home"<br>
🎯 **WHEN** the store notifies a step change to "export"<br>
✅ **THEN** the "export" button has the aria-current attribute set to "true"<br>
➕ **AND** the "home" button has the aria-current attribute set to "false"<br>

#### 4.6. Cleanup subscriptions on destruction {#navigation-between-crafter-steps-cleanup-subscriptions-on-destruction}

🔧 **GIVEN** the Crafter Navigator is initialized<br>
🎯 **WHEN** I call the cleanup method<br>
✅ **THEN** the store subscription is removed<br>

#### 4.7. Accessibility of step buttons {#navigation-between-crafter-steps-accessibility-of-step-buttons}

🔧 **GIVEN** the Crafter Navigator is initialized<br>
✅ **THEN** each step button has the role "button"<br>
➕ **AND** each button has an aria-label attribute containing the step name<br>
➕ **AND** each button has a tabIndex attribute set to "0"<br>
➕ **AND** each button has the aria-current attribute set to "false" by default<br>
➕ **AND** each button has the aria-disabled attribute set to "false"<br>
➕ **AND** each button has the aria-pressed attribute set to "false"<br>
➕ **AND** each button has the aria-roledescription attribute set to "étape du crafter"<br>



---

## 5. Crafter Stepper {#crafter-stepper}

**File:** `features\crafter-stepper\crafter-stepper.feature`

### 🎯 Scenarios

#### 5.1. Stepper initialization {#crafter-stepper-stepper-initialization}

🔧 **GIVEN** the DOM contains an element with id "stepper"<br>
➕ **AND** the DOM contains templates for all stepper steps<br>
🎯 **WHEN** I initialize the Crafter Stepper<br>
✅ **THEN** the stepper should subscribe to the crafter navigator store<br>
➕ **AND** the stepper should display the current step content<br>
➕ **AND** the stepper should call the current step controller<br>

#### 5.2. Step content changes when navigator step changes {#crafter-stepper-step-content-changes-when-navigator-step-changes}

🔧 **GIVEN** the Crafter Stepper is initialized<br>
➕ **AND** the current step is "home"<br>
🎯 **WHEN** the crafter navigator changes to step "base"<br>
✅ **THEN** the stepper should update the container content<br>
➕ **AND** the stepper should display the "base" template content<br>
➕ **AND** the stepper should call the "base" step controller<br>
➕ **AND** the stepper should replace the previous step content<br>

#### 5.3. Step content changes when navigator step changes to composer {#crafter-stepper-step-content-changes-when-navigator-step-changes-to-composer}

🔧 **GIVEN** the Crafter Stepper is initialized<br>
➕ **AND** the current step is "base"<br>
🎯 **WHEN** the crafter navigator changes to step "composer"<br>
✅ **THEN** the stepper should update the container content<br>
➕ **AND** the stepper should display the "composer" template content<br>
➕ **AND** the stepper should call the "composer" step controller<br>

#### 5.4. Step content changes when navigator step changes to export {#crafter-stepper-step-content-changes-when-navigator-step-changes-to-export}

🔧 **GIVEN** the Crafter Stepper is initialized<br>
➕ **AND** the current step is "composer"<br>
🎯 **WHEN** the crafter navigator changes to step "export"<br>
✅ **THEN** the stepper should update the container content<br>
➕ **AND** the stepper should display the "export" template content<br>
➕ **AND** the stepper should call the "export" step controller<br>

#### 5.5. Error handling when step is not found {#crafter-stepper-error-handling-when-step-is-not-found}

🔧 **GIVEN** the Crafter Stepper is initialized<br>
🎯 **WHEN** the crafter navigator changes to an invalid step<br>
✅ **THEN** the stepper should throw an error "Stepper step invalid not found"<br>

#### 5.6. Error handling when stepper container is missing {#crafter-stepper-error-handling-when-stepper-container-is-missing}

🔧 **GIVEN** the DOM does not contain an element with id "stepper"<br>
➕ **AND** the Crafter Stepper is initialized<br>
🎯 **WHEN** the crafter navigator changes to step "base"<br>
✅ **THEN** the stepper should throw an error "Stepper container not found"<br>

#### 5.7. Error handling when step template is missing {#crafter-stepper-error-handling-when-step-template-is-missing}

🔧 **GIVEN** the DOM contains an element with id "stepper"<br>
➕ **AND** the DOM does not contain the "stepper-base-template"<br>
➕ **AND** the Crafter Stepper is initialized<br>
🎯 **WHEN** the crafter navigator changes to step "base"<br>
✅ **THEN** the stepper should throw an error "Stepper template stepper-base-template not found"<br>

#### 5.8. Stepper cleanup {#crafter-stepper-stepper-cleanup}

🔧 **GIVEN** the Crafter Stepper is initialized<br>
🎯 **WHEN** I call the stepper cleanup method<br>
✅ **THEN** the stepper should unsubscribe from the crafter navigator store<br>

#### 5.9. Step controller execution {#crafter-stepper-step-controller-execution}

🔧 **GIVEN** the Crafter Stepper is initialized<br>
🎯 **WHEN** the crafter navigator changes to step "home"<br>
✅ **THEN** the stepper should execute the "home" step controller<br>
➕ **AND** the step controller should log "home"<br>

#### 5.10. Step controller execution for base step {#crafter-stepper-step-controller-execution-for-base-step}

🔧 **GIVEN** the Crafter Stepper is initialized<br>
🎯 **WHEN** the crafter navigator changes to step "base"<br>
✅ **THEN** the stepper should execute the "base" step controller<br>
➕ **AND** the step controller should log "base"<br>

#### 5.11. Step controller execution for composer step {#crafter-stepper-step-controller-execution-for-composer-step}

🔧 **GIVEN** the Crafter Stepper is initialized<br>
🎯 **WHEN** the crafter navigator changes to step "composer"<br>
✅ **THEN** the stepper should execute the "composer" step controller<br>
➕ **AND** the step controller should log "composer"<br>

#### 5.12. Step controller execution for export step {#crafter-stepper-step-controller-execution-for-export-step}

🔧 **GIVEN** the Crafter Stepper is initialized<br>
🎯 **WHEN** the crafter navigator changes to step "export"<br>
✅ **THEN** the stepper should execute the "export" step controller<br>
➕ **AND** the step controller should log "export"<br>

#### 5.13. Content replacement between steps {#crafter-stepper-content-replacement-between-steps}

🔧 **GIVEN** the Crafter Stepper is initialized<br>
➕ **AND** the current step is "home"<br>
🎯 **WHEN** the crafter navigator changes to step "base"<br>
✅ **THEN** the stepper should replace the home content with base content<br>
➕ **AND** the stepper container should not contain home content<br>
➕ **AND** the stepper container should contain base content<br>

#### 5.14. Integration with crafter navigator store {#crafter-stepper-integration-with-crafter-navigator-store}

🔧 **GIVEN** the Crafter Stepper is initialized<br>
🎯 **WHEN** the crafter navigator store current step changes<br>
✅ **THEN** the stepper should receive the step change notification<br>
➕ **AND** the stepper should update the UI with the new step<br>



---

## 6. Recipe export functionality {#recipe-export-functionality}

> As a bento generator user

**File:** `features\export\export.feature`

### 🔧 Background

- **GIVEN** the application is initialized
- **AND** a base is selected
- **AND** ingredients are customized in the composer


### 🎯 Scenarios

#### 6.1. Export interface initialization {#recipe-export-functionality-export-interface-initialization}

🔧 **GIVEN** I am on the export page<br>
🎯 **WHEN** the export interface loads<br>
✅ **THEN** I see the recipe name displayed<br>
➕ **AND** I see the list of selected ingredients with quantities<br>
➕ **AND** I see the cooking steps with descriptions<br>
➕ **AND** I see export format buttons (Markdown and JSON)<br>
➕ **AND** the interface is translated according to current language<br>

#### 6.2. Exporting recipe as Markdown {#recipe-export-functionality-exporting-recipe-as-markdown}

🔧 **GIVEN** I am on the export page<br>
➕ **AND** the recipe is ready for export<br>
🎯 **WHEN** I click on the Markdown export button<br>
✅ **THEN** a Markdown file is downloaded<br>
➕ **AND** the file contains the recipe name as header<br>
➕ **AND** the file contains ingredients list with quantities<br>
➕ **AND** the file contains cooking steps with descriptions<br>
➕ **AND** the file contains tips if available<br>

#### 6.3. Exporting recipe as JSON {#recipe-export-functionality-exporting-recipe-as-json}

🔧 **GIVEN** I am on the export page<br>
➕ **AND** the recipe is ready for export<br>
🎯 **WHEN** I click on the JSON export button<br>
✅ **THEN** a JSON file is downloaded<br>
➕ **AND** the file contains structured recipe data<br>
➕ **AND** the file includes recipe name, ingredients, and steps<br>
➕ **AND** the JSON is properly formatted with indentation<br>

#### 6.4. Recipe data generation {#recipe-export-functionality-recipe-data-generation}

🔧 **GIVEN** I am on the export page<br>
➕ **AND** ingredients are selected and customized<br>
🎯 **WHEN** the recipe data is generated<br>
✅ **THEN** the recipe name is generated from base and top ingredients<br>
➕ **AND** only selected ingredients are included<br>
➕ **AND** ingredients show correct quantities and units<br>
➕ **AND** steps are filtered based on available ingredients<br>
➕ **AND** steps are sorted by order<br>
➕ **AND** ingredient substitutions are applied correctly<br>

#### 6.5. Step filtering based on ingredients {#recipe-export-functionality-step-filtering-based-on-ingredients}

🔧 **GIVEN** I am on the export page<br>
➕ **AND** some ingredients are deselected<br>
🎯 **WHEN** the recipe steps are processed<br>
✅ **THEN** steps requiring unavailable ingredients are excluded<br>
✅ **THEN** steps with no ingredient requirements are included<br>
✅ **THEN** steps with available ingredient substitutes are included<br>

#### 6.6. Text transformation with ingredients {#recipe-export-functionality-text-transformation-with-ingredients}

🔧 **GIVEN** I am on the export page<br>
➕ **AND** step descriptions contain ingredient placeholders<br>
🎯 **WHEN** the text is transformed<br>
✅ **THEN** ingredient placeholders are replaced with actual ingredient names<br>
✅ **THEN** ingredient lists are properly formatted<br>
✅ **THEN** ingredient names are displayed in lowercase<br>

#### 6.7. Export format button states {#recipe-export-functionality-export-format-button-states}

🔧 **GIVEN** I am on the export page<br>
🎯 **WHEN** I select a specific export format<br>
✅ **THEN** the selected format button is highlighted<br>
➕ **AND** other format buttons are not highlighted<br>

#### 6.8. Export interface cleanup {#recipe-export-functionality-export-interface-cleanup}

🔧 **GIVEN** the export interface is displayed<br>
🎯 **WHEN** I navigate to another page<br>
✅ **THEN** the export subscriptions are cleaned up<br>
➕ **AND** the export event listeners are removed<br>

#### 6.9. Handling missing template elements {#recipe-export-functionality-handling-missing-template-elements}

🔧 **GIVEN** I am on the export page<br>
🎯 **WHEN** template elements are missing from the DOM<br>
✅ **THEN** the export interface handles the missing elements gracefully<br>
➕ **AND** the export functionality continues to work<br>

#### 6.10. Recipe name generation with customizations {#recipe-export-functionality-recipe-name-generation-with-customizations}

🔧 **GIVEN** I am on the export page<br>
➕ **AND** ingredients have been substituted<br>
🎯 **WHEN** the recipe name is generated<br>
✅ **THEN** the name reflects the substituted ingredients<br>
➕ **AND** the name uses the appropriate component names<br>
➕ **AND** the name is properly formatted<br>



---

## 7. Icon management and display {#icon-management-and-display}

> As a bento generator user

**File:** `features\icon\icon.feature`

### 🔧 Background

- **GIVEN** the application is initialized
- **AND** the icon sprite sheet is loaded


### 🎯 Scenarios

#### 7.1. Icon style application {#icon-management-and-display-icon-style-application}

🔧 **GIVEN** I have an HTML element that needs an icon<br>
🎯 **WHEN** I apply an icon style to the element<br>
✅ **THEN** the element gets the 'icons' CSS class<br>
➕ **AND** the background position is set based on the icon index<br>
➕ **AND** the icon is displayed correctly<br>

#### 7.2. Icon mapping for ingredients {#icon-management-and-display-icon-mapping-for-ingredients}

🔧 **GIVEN** I have ingredient data<br>
🎯 **WHEN** I request an icon for an ingredient<br>
✅ **THEN** the correct icon index is returned from the ICONS map<br>
➕ **AND** the icon corresponds to the ingredient type<br>
➕ **AND** unknown ingredients default to index 0<br>

#### 7.3. Icon mapping for interface elements {#icon-management-and-display-icon-mapping-for-interface-elements}

🔧 **GIVEN** I have interface elements<br>
🎯 **WHEN** I request icons for interface actions<br>
✅ **THEN** home icon is mapped to index 0<br>
➕ **AND** base icon is mapped to index 1<br>
➕ **AND** composer icon is mapped to index 2<br>
➕ **AND** export icon is mapped to index 3<br>
➕ **AND** action icons (add, delete, exchange) are properly mapped<br>

#### 7.4. Icon mapping for bases {#icon-management-and-display-icon-mapping-for-bases}

🔧 **GIVEN** I have base data<br>
🎯 **WHEN** I request icons for different bases<br>
✅ **THEN** cake icon is mapped to index 12<br>
➕ **AND** onigiri icon is mapped to index 1<br>
➕ **AND** empanada icon is mapped to index 4<br>
➕ **AND** gimbap icon is mapped to index 36<br>
➕ **AND** savoy_cake icon is mapped to index 63<br>

#### 7.5. Icon mapping for ingredients by category {#icon-management-and-display-icon-mapping-for-ingredients-by-category}

🔧 **GIVEN** I have ingredient categories<br>
🎯 **WHEN** I request icons for different ingredient types<br>
✅ **THEN** liquid ingredients have appropriate icon mappings<br>
➕ **AND** fruit ingredients have appropriate icon mappings<br>
➕ **AND** spice ingredients have appropriate icon mappings<br>
➕ **AND** vegetable ingredients have appropriate icon mappings<br>
➕ **AND** protein ingredients have appropriate icon mappings<br>

#### 7.6. Icon size configuration {#icon-management-and-display-icon-size-configuration}

🔧 **GIVEN** the icon system is initialized<br>
🎯 **WHEN** I check the icon size configuration<br>
✅ **THEN** the icon size is set to 32 pixels<br>
➕ **AND** the background position calculation uses this size<br>

#### 7.7. Handling missing icon mappings {#icon-management-and-display-handling-missing-icon-mappings}

🔧 **GIVEN** I request an icon for an unknown element<br>
🎯 **WHEN** the icon mapping is not found<br>
✅ **THEN** the system defaults to index 0<br>
➕ **AND** no error is thrown<br>
➕ **AND** the element still gets styled appropriately<br>

#### 7.8. Icon background position calculation {#icon-management-and-display-icon-background-position-calculation}

🔧 **GIVEN** I have an icon index<br>
🎯 **WHEN** the background position is calculated<br>
✅ **THEN** the position is calculated as negative index multiplied by icon size<br>
➕ **AND** the vertical position is set to 0<br>
➕ **AND** the calculation handles large icon indices correctly<br>

#### 7.9. Multiple icon applications {#icon-management-and-display-multiple-icon-applications}

🔧 **GIVEN** I have multiple elements needing icons<br>
🎯 **WHEN** I apply icons to different elements<br>
✅ **THEN** each element gets its own background position<br>
➕ **AND** all elements share the same sprite sheet<br>
➕ **AND** the icons are displayed without conflicts<br>



---

## 8. Unnamed Feature {#unnamed-feature}

**File:** `features\recipe\recipe.feature`

### 🎯 Scenarios



---

## 9. Recipe URL management and sharing {#recipe-url-management-and-sharing}

> As a bento generator user

**File:** `features\recipe-url\recipe-url.feature`

### 🔧 Background

- **GIVEN** the application is initialized
- **AND** the recipe URL system is active


### 🎯 Scenarios

#### 9.1. URL injection on page load {#recipe-url-management-and-sharing-url-injection-on-page-load}

🔧 **GIVEN** I visit a URL with recipe parameters<br>
🎯 **WHEN** the page loads<br>
✅ **THEN** the recipe configuration is extracted from the URL<br>
➕ **AND** the base is set according to the URL parameters<br>
➕ **AND** the variant is set according to the URL parameters<br>
➕ **AND** the selected ingredients are restored from the URL parameters<br>

#### 9.2. URL update on base change {#recipe-url-management-and-sharing-url-update-on-base-change}

🔧 **GIVEN** I am on the bento generator page<br>
➕ **AND** I have a current recipe configuration<br>
🎯 **WHEN** I change the base selection<br>
✅ **THEN** the URL is updated with the new base ID<br>
➕ **AND** the URL contains the current variant ID<br>
➕ **AND** the URL contains the current selected ingredients<br>

#### 9.3. URL update on variant change {#recipe-url-management-and-sharing-url-update-on-variant-change}

🔧 **GIVEN** I am on the bento generator page<br>
➕ **AND** I have a current recipe configuration<br>
🎯 **WHEN** I change the variant selection<br>
✅ **THEN** the URL is updated with the new variant ID<br>
➕ **AND** the URL contains the current base ID<br>
➕ **AND** the URL contains the current selected ingredients<br>

#### 9.4. URL update on ingredient selection change {#recipe-url-management-and-sharing-url-update-on-ingredient-selection-change}

🔧 **GIVEN** I am on the bento generator page<br>
➕ **AND** I have a current recipe configuration<br>
🎯 **WHEN** I modify ingredient selections<br>
✅ **THEN** the URL is updated with the new ingredient selections<br>
➕ **AND** the URL contains the current base ID<br>
➕ **AND** the URL contains the current variant ID<br>

#### 9.5. Recipe data encoding in URL {#recipe-url-management-and-sharing-recipe-data-encoding-in-url}

🔧 **GIVEN** I have a complete recipe configuration<br>
🎯 **WHEN** the URL is updated<br>
✅ **THEN** the recipe data is encoded in base64<br>
➕ **AND** the encoded data contains base ID, variant ID, and selected ingredients<br>
➕ **AND** the encoded data is added as a URL parameter<br>

#### 9.6. Recipe data decoding from URL {#recipe-url-management-and-sharing-recipe-data-decoding-from-url}

🔧 **GIVEN** I have a URL with encoded recipe data<br>
🎯 **WHEN** the URL is processed<br>
✅ **THEN** the base64 data is decoded<br>
➕ **AND** the recipe configuration is parsed from JSON<br>
➕ **AND** the base, variant, and ingredients are restored<br>

#### 9.7. Handling invalid URL parameters {#recipe-url-management-and-sharing-handling-invalid-url-parameters}

🔧 **GIVEN** I visit a URL with invalid recipe parameters<br>
🎯 **WHEN** the page loads<br>
✅ **THEN** the system handles the invalid data gracefully<br>
➕ **AND** the URL is updated with default configuration<br>
➕ **AND** no errors are thrown<br>

#### 9.8. URL parameter key management {#recipe-url-management-and-sharing-url-parameter-key-management}

🔧 **GIVEN** the recipe URL system is active<br>
🎯 **WHEN** I check the URL parameter key<br>
✅ **THEN** the key is set to 'recipe'<br>
➕ **AND** the parameter is properly formatted in the URL<br>

#### 9.9. Browser history management {#recipe-url-management-and-sharing-browser-history-management}

🔧 **GIVEN** I am on the bento generator page<br>
🎯 **WHEN** the URL is updated with new recipe configuration<br>
✅ **THEN** the browser history is updated<br>
➕ **AND** the back button works correctly<br>
➕ **AND** the URL reflects the current state<br>

#### 9.10. Recipe URL cleanup {#recipe-url-management-and-sharing-recipe-url-cleanup}

🔧 **GIVEN** the recipe URL system is active<br>
🎯 **WHEN** I navigate away from the page<br>
✅ **THEN** the URL subscriptions are cleaned up<br>
➕ **AND** no memory leaks occur<br>

#### 9.11. Fallback to random variant {#recipe-url-management-and-sharing-fallback-to-random-variant}

🔧 **GIVEN** I have a URL with a base ID but invalid variant ID<br>
🎯 **WHEN** the URL is processed<br>
✅ **THEN** a random variant is selected for the base<br>
➕ **AND** the URL is updated with the new variant ID<br>
➕ **AND** the recipe configuration is valid<br>



---

## 10. Front-end Router {#front-end-router}

> As a user

**File:** `features\router\router.feature`

### 🔧 Background

- **GIVEN** the application is loaded
- **AND** the router is initialized
- **AND** the templates are available


### 🎯 Scenarios

#### 10.1. Basic navigation with template rendering {#front-end-router-basic-navigation-with-template-rendering}

🎯 **WHEN** I visit the home page<br>
✅ **THEN** I should see the home page content<br>
➕ **AND** the page title should be "Accueil"<br>
➕ **AND** the URL should be "/"<br>
➕ **AND** the home template should be rendered<br>

#### 10.2. Navigation to page with script {#front-end-router-navigation-to-page-with-script}

🎯 **WHEN** I click on the "About" link<br>
✅ **THEN** I should see the About page content<br>
➕ **AND** the page title should be "À propos"<br>
➕ **AND** the URL should be "/about"<br>
➕ **AND** the about template should be rendered<br>
➕ **AND** the about page script should be initialized<br>
➕ **AND** the previous page cleanup should be executed<br>

#### 10.3. Navigation with dynamic parameters {#front-end-router-navigation-with-dynamic-parameters}

🎯 **WHEN** I visit the page "/users/123"<br>
✅ **THEN** I should see the user profile for 123<br>
➕ **AND** the page title should be "User Profile"<br>
➕ **AND** the URL should be "/users/123"<br>
➕ **AND** the user template should be rendered<br>

#### 10.4. Navigation with query parameters {#front-end-router-navigation-with-query-parameters}

🎯 **WHEN** I visit the page "/search?q=test"<br>
✅ **THEN** I should see search results for "test"<br>
➕ **AND** the URL should be "/search?q=test"<br>
➕ **AND** the search template should be rendered<br>

#### 10.5. Page not found {#front-end-router-page-not-found}

🎯 **WHEN** I visit a non-existent page<br>
✅ **THEN** I should see the 404 page<br>
➕ **AND** the page title should be "Page Not Found"<br>
➕ **AND** the URL should remain unchanged<br>
➕ **AND** the 404 template should be rendered<br>

#### 10.6. Navigation with authentication {#front-end-router-navigation-with-authentication}

🔧 **GIVEN** I am not logged in<br>
🎯 **WHEN** I try to access a protected page<br>
✅ **THEN** I should be redirected to the login page<br>
➕ **AND** the URL should be "/login"<br>
➕ **AND** the login template should be rendered<br>

#### 10.7. Navigation with transition and cleanup {#front-end-router-navigation-with-transition-and-cleanup}

🔧 **GIVEN** I am on a page with active scripts<br>
🎯 **WHEN** I navigate to a new page<br>
✅ **THEN** the previous page cleanup should be executed<br>
➕ **AND** the new page script should be initialized<br>
➕ **AND** the content should be updated after the transition<br>

#### 10.8. Link handling with internal navigation {#front-end-router-link-handling-with-internal-navigation}

🎯 **WHEN** I click on an internal link<br>
✅ **THEN** the navigation should be handled by the router<br>
➕ **AND** the page should not be reloaded<br>
➕ **AND** the browser history should be updated<br>

#### 10.9. Back button handling {#front-end-router-back-button-handling}

🔧 **GIVEN** I am on the "/about" page<br>
🎯 **WHEN** I click the back button<br>
✅ **THEN** I should go back to the previous page<br>
➕ **AND** the URL should be updated<br>
➕ **AND** the content should be updated<br>
➕ **AND** the page cleanup should be executed<br>

#### 10.10. External link handling {#front-end-router-external-link-handling}

🎯 **WHEN** I click on an external link<br>
✅ **THEN** the navigation should be handled by the browser<br>
➕ **AND** the page should be reloaded<br>

#### 10.11. Template rendering with state management {#front-end-router-template-rendering-with-state-management}

🎯 **WHEN** I visit a page with reactive state<br>
✅ **THEN** the template should be rendered<br>
➕ **AND** the page script should be initialized<br>
➕ **AND** the reactive state should be set up<br>
➕ **AND** the UI should respond to state changes<br>

#### 10.12. Script cleanup on navigation {#front-end-router-script-cleanup-on-navigation}

🔧 **GIVEN** I am on a page with active event listeners<br>
🎯 **WHEN** I navigate to another page<br>
✅ **THEN** the previous page event listeners should be removed<br>
➕ **AND** the previous page timers should be cleared<br>
➕ **AND** the previous page state should be cleaned up<br>
➕ **AND** the new page should be properly initialized<br>

#### 10.13. Multiple rapid navigation {#front-end-router-multiple-rapid-navigation}

🎯 **WHEN** I navigate quickly between multiple pages<br>
✅ **THEN** each page should render correctly<br>
➕ **AND** each page cleanup should execute properly<br>
➕ **AND** no memory leaks should occur<br>
➕ **AND** the final page should be active<br>

#### 10.14. Browser refresh handling {#front-end-router-browser-refresh-handling}

🔧 **GIVEN** I am on a specific page<br>
🎯 **WHEN** I refresh the browser<br>
✅ **THEN** the current page should be rendered correctly<br>
➕ **AND** the page script should be initialized<br>
➕ **AND** the URL should remain the same<br>



---

## 11. Routes {#routes}

> As a user

**File:** `features\routes\routes.feature`

### 🎯 Scenarios

#### 11.1. Basic navigation with template rendering {#routes-basic-navigation-with-template-rendering}

🎯 **WHEN** I visit the home page<br>
✅ **THEN** I should see the home page content<br>
➕ **AND** the page title should be "Accueil"<br>
➕ **AND** the URL should be "/"<br>
➕ **AND** the home template should be rendered<br>

#### 11.2. Navigation to page with script {#routes-navigation-to-page-with-script}

🎯 **WHEN** I click on the "About" link<br>
✅ **THEN** I should see the About page content<br>
➕ **AND** the page title should be "À propos"<br>



---

## 12. Unnamed Feature {#unnamed-feature}

**File:** `features\sprite-sheet\sprite-sheet.feature`

### 🎯 Scenarios



---

## 13. Translation and internationalization {#translation-and-internationalization}

> As a bento generator user

**File:** `features\translate\translate.feature`

### 🔧 Background

- **GIVEN** the application is initialized
- **AND** translation data is available


### 🎯 Scenarios

#### 13.1. Language detection from browser {#translation-and-internationalization-language-detection-from-browser}

🔧 **GIVEN** I visit the application for the first time<br>
➕ **AND** no language preference is stored<br>
🎯 **WHEN** the application initializes<br>
✅ **THEN** the browser language is detected<br>
➕ **AND** if the browser language is supported, it is set as current language<br>
➕ **AND** if the browser language is not supported, French is set as default<br>

#### 13.2. Language persistence in localStorage {#translation-and-internationalization-language-persistence-in-localstorage}

🔧 **GIVEN** I have previously selected a language<br>
🎯 **WHEN** the application loads<br>
✅ **THEN** the stored language preference is retrieved<br>
➕ **AND** the application uses the stored language<br>
➕ **AND** the language preference persists across sessions<br>

#### 13.3. Language switching {#translation-and-internationalization-language-switching}

🔧 **GIVEN** I am using the application<br>
🎯 **WHEN** I change the language setting<br>
✅ **THEN** the current language is updated<br>
➕ **AND** all UI elements are translated to the new language<br>
➕ **AND** the language preference is saved to localStorage<br>

#### 13.4. Translation retrieval {#translation-and-internationalization-translation-retrieval}

🔧 **GIVEN** I have translation data for multiple languages<br>
🎯 **WHEN** I request a translation<br>
✅ **THEN** the translation for the current language is returned<br>
➕ **AND** if the current language translation is not available, French is used as fallback<br>
➕ **AND** if no translation is found, 'Not found' is returned<br>

#### 13.5. UI element translation {#translation-and-internationalization-ui-element-translation}

🔧 **GIVEN** I have UI elements with translation attributes<br>
🎯 **WHEN** the language changes<br>
✅ **THEN** all elements with 'data-translate' attributes are updated<br>
➕ **AND** the text content reflects the new language<br>
➕ **AND** the translation keys are properly resolved<br>

#### 13.6. Supported languages {#translation-and-internationalization-supported-languages}

🔧 **GIVEN** the translation system is active<br>
🎯 **WHEN** I check available languages<br>
✅ **THEN** French (fr) is supported<br>
➕ **AND** English (en) is supported<br>
➕ **AND** Korean (ko) is supported<br>
➕ **AND** other languages are not supported<br>

#### 13.7. Translation key management {#translation-and-internationalization-translation-key-management}

🔧 **GIVEN** I have UI translation keys<br>
🎯 **WHEN** I check the available translation keys<br>
✅ **THEN** action keys (add, delete, exchange, select) are available<br>
➕ **AND** navigation keys (home, about) are available<br>
➕ **AND** content keys (ingredients, steps, export) are available<br>
➕ **AND** all keys have translations for supported languages<br>

#### 13.8. Fallback translation behavior {#translation-and-internationalization-fallback-translation-behavior}

🔧 **GIVEN** I have a translation object with missing languages<br>
🎯 **WHEN** I request a translation<br>
✅ **THEN** the system falls back to French if the current language is missing<br>
➕ **AND** the system returns 'Not found' if no translations are available<br>
➕ **AND** no errors are thrown for missing translations<br>

#### 13.9. Language storage key management {#translation-and-internationalization-language-storage-key-management}

🔧 **GIVEN** the translation system is active<br>
🎯 **WHEN** I check the localStorage key<br>
✅ **THEN** the key is set to 'bento_language'<br>
➕ **AND** the language preference is stored under this key<br>

#### 13.10. Dynamic translation updates {#translation-and-internationalization-dynamic-translation-updates}

🔧 **GIVEN** I have elements that need translation updates<br>
🎯 **WHEN** the language changes<br>
✅ **THEN** all elements with translation attributes are found<br>
➕ **AND** their text content is updated with new translations<br>
➕ **AND** the UI reflects the language change immediately<br>

#### 13.11. Translation data structure {#translation-and-internationalization-translation-data-structure}

🔧 **GIVEN** I have translation objects<br>
🎯 **WHEN** I examine the translation structure<br>
✅ **THEN** each translation has a French (fr) property<br>
➕ **AND** optional English (en) and Korean (ko) properties<br>
➕ **AND** the structure is consistent across all translations<br>



---

## 14. Application version management {#application-version-management}

> As a bento generator user

**File:** `features\version\version.feature`

### 🔧 Background

- **GIVEN** the application is initialized
- **AND** the version system is active


### 🎯 Scenarios

#### 14.1. Version display initialization {#application-version-management-version-display-initialization}

🔧 **GIVEN** I am on any page of the application<br>
🎯 **WHEN** the version system initializes<br>
✅ **THEN** the version is retrieved from package.json<br>
➕ **AND** the version is displayed in the designated element<br>
➕ **AND** the version element is found by ID 'version'<br>

#### 14.2. Version element update {#application-version-management-version-element-update}

🔧 **GIVEN** I have a version element in the DOM<br>
🎯 **WHEN** the displayVersion function is called<br>
✅ **THEN** the version element's text content is updated<br>
➕ **AND** the version matches the package.json version<br>
➕ **AND** the version is displayed correctly<br>

#### 14.3. Version constant management {#application-version-management-version-constant-management}

🔧 **GIVEN** the version system is active<br>
🎯 **WHEN** I check the version constant<br>
✅ **THEN** the version is imported from package.json<br>
➕ **AND** the version constant is available for use<br>
➕ **AND** the version format follows semantic versioning<br>

#### 14.4. Version element not found {#application-version-management-version-element-not-found}

🔧 **GIVEN** the version element is not present in the DOM<br>
🎯 **WHEN** the displayVersion function is called<br>
✅ **THEN** no error is thrown<br>
➕ **AND** the function handles the missing element gracefully<br>
➕ **AND** the application continues to function normally<br>

#### 14.5. Version display on page load {#application-version-management-version-display-on-page-load}

🔧 **GIVEN** I visit the application<br>
🎯 **WHEN** the page loads<br>
✅ **THEN** the version is automatically displayed<br>
➕ **AND** the version is visible to the user<br>
➕ **AND** the version information is current<br>

#### 14.6. Version consistency {#application-version-management-version-consistency}

🔧 **GIVEN** the application is running<br>
🎯 **WHEN** I check the version in different parts of the application<br>
✅ **THEN** the version is consistent across all components<br>
➕ **AND** the version matches the package.json version<br>
➕ **AND** no version conflicts exist<br>

#### 14.7. Version format validation {#application-version-management-version-format-validation}

🔧 **GIVEN** I have a version from package.json<br>
🎯 **WHEN** I examine the version format<br>
✅ **THEN** the version follows semantic versioning (major.minor.patch)<br>
➕ **AND** the version is a valid string<br>
➕ **AND** the version can be parsed correctly<br>

#### 14.8. Version display in footer {#application-version-management-version-display-in-footer}

🔧 **GIVEN** I am viewing the application<br>
🎯 **WHEN** I look for version information<br>
✅ **THEN** the version is typically displayed in the footer<br>
➕ **AND** the version is easily accessible<br>
➕ **AND** the version is clearly labeled<br>

#### 14.9. Version updates tracking {#application-version-management-version-updates-tracking}

🔧 **GIVEN** I am using the application<br>
🎯 **WHEN** the application is updated<br>
✅ **THEN** the version number changes accordingly<br>
➕ **AND** the new version is displayed<br>
➕ **AND** users can track application updates<br>

#### 14.10. Version system cleanup {#application-version-management-version-system-cleanup}

🔧 **GIVEN** the version system is active<br>
🎯 **WHEN** the application is closed<br>
✅ **THEN** no cleanup is required for the version system<br>
➕ **AND** no memory leaks occur<br>
➕ **AND** the version system is stateless<br>



---

## 📊 Statistics

- **Features:** 14
- **Scenarios:** 105
- **Steps:** 542

---

*Documentation generated on 04/09/2025 at 23:24:36*

