# 📋 Cucumber Features Documentation

> Documentation automatically generated from `.feature` files

## 📑 Table of Contents

1. [Front-end Router](#front-end-router)<br/>
   1.1. [Basic navigation with template rendering](#front-end-router-basic-navigation-with-template-rendering)<br/>
   1.2. [Navigation to page with script](#front-end-router-navigation-to-page-with-script)<br/>
   1.3. [Navigation with dynamic parameters](#front-end-router-navigation-with-dynamic-parameters)<br/>
   1.4. [Navigation with query parameters](#front-end-router-navigation-with-query-parameters)<br/>
   1.5. [Page not found](#front-end-router-page-not-found)<br/>
   1.6. [Navigation with authentication](#front-end-router-navigation-with-authentication)<br/>
   1.7. [Navigation with transition and cleanup](#front-end-router-navigation-with-transition-and-cleanup)<br/>
   1.8. [Link handling with internal navigation](#front-end-router-link-handling-with-internal-navigation)<br/>
   1.9. [Back button handling](#front-end-router-back-button-handling)<br/>
   1.10. [External link handling](#front-end-router-external-link-handling)<br/>
   1.11. [Template rendering with state management](#front-end-router-template-rendering-with-state-management)<br/>
   1.12. [Script cleanup on navigation](#front-end-router-script-cleanup-on-navigation)<br/>
   1.13. [Multiple rapid navigation](#front-end-router-multiple-rapid-navigation)<br/>
   1.14. [Browser refresh handling](#front-end-router-browser-refresh-handling)<br/>
2. [Routes](#routes)<br/>
   2.1. [Basic navigation with template rendering](#routes-basic-navigation-with-template-rendering)<br/>
   2.2. [Navigation to page with script](#routes-navigation-to-page-with-script)<br/>
3. [Translation and internationalization](#translation-and-internationalization)<br/>
   3.1. [Language detection from browser](#translation-and-internationalization-language-detection-from-browser)<br/>
   3.2. [Language persistence in localStorage](#translation-and-internationalization-language-persistence-in-localstorage)<br/>
   3.3. [Language switching](#translation-and-internationalization-language-switching)<br/>
   3.4. [Translation retrieval](#translation-and-internationalization-translation-retrieval)<br/>
   3.5. [UI element translation](#translation-and-internationalization-ui-element-translation)<br/>
   3.6. [Supported languages](#translation-and-internationalization-supported-languages)<br/>
   3.7. [Translation key management](#translation-and-internationalization-translation-key-management)<br/>
   3.8. [Fallback translation behavior](#translation-and-internationalization-fallback-translation-behavior)<br/>
   3.9. [Language storage key management](#translation-and-internationalization-language-storage-key-management)<br/>
   3.10. [Dynamic translation updates](#translation-and-internationalization-dynamic-translation-updates)<br/>
   3.11. [Translation data structure](#translation-and-internationalization-translation-data-structure)<br/>
4. [Application version management](#application-version-management)<br/>
   4.1. [Version display initialization](#application-version-management-version-display-initialization)<br/>
   4.2. [Version element update](#application-version-management-version-element-update)<br/>
   4.3. [Version constant management](#application-version-management-version-constant-management)<br/>
   4.4. [Version element not found](#application-version-management-version-element-not-found)<br/>
   4.5. [Version display on page load](#application-version-management-version-display-on-page-load)<br/>
   4.6. [Version consistency](#application-version-management-version-consistency)<br/>
   4.7. [Version format validation](#application-version-management-version-format-validation)<br/>
   4.8. [Version display in footer](#application-version-management-version-display-in-footer)<br/>
   4.9. [Version updates tracking](#application-version-management-version-updates-tracking)<br/>
   4.10. [Version system cleanup](#application-version-management-version-system-cleanup)<br/>


---

## 1. Front-end Router {#front-end-router}

> As a user

**File:** `features\router\router.feature`

### 🔧 Background

- **GIVEN** the application is loaded
- **AND** the router is initialized
- **AND** the templates are available


### 🎯 Scenarios

#### 1.1. Basic navigation with template rendering {#front-end-router-basic-navigation-with-template-rendering}

🎯 **WHEN** I visit the home page<br>
✅ **THEN** I should see the home page content<br>
➕ **AND** the page title should be "Accueil"<br>
➕ **AND** the URL should be "/"<br>
➕ **AND** the home template should be rendered<br>

#### 1.2. Navigation to page with script {#front-end-router-navigation-to-page-with-script}

🎯 **WHEN** I click on the "About" link<br>
✅ **THEN** I should see the About page content<br>
➕ **AND** the page title should be "À propos"<br>
➕ **AND** the URL should be "/about"<br>
➕ **AND** the about template should be rendered<br>
➕ **AND** the about page script should be initialized<br>
➕ **AND** the previous page cleanup should be executed<br>

#### 1.3. Navigation with dynamic parameters {#front-end-router-navigation-with-dynamic-parameters}

🎯 **WHEN** I visit the page "/users/123"<br>
✅ **THEN** I should see the user profile for 123<br>
➕ **AND** the page title should be "User Profile"<br>
➕ **AND** the URL should be "/users/123"<br>
➕ **AND** the user template should be rendered<br>

#### 1.4. Navigation with query parameters {#front-end-router-navigation-with-query-parameters}

🎯 **WHEN** I visit the page "/search?q=test"<br>
✅ **THEN** I should see search results for "test"<br>
➕ **AND** the URL should be "/search?q=test"<br>
➕ **AND** the search template should be rendered<br>

#### 1.5. Page not found {#front-end-router-page-not-found}

🎯 **WHEN** I visit a non-existent page<br>
✅ **THEN** I should see the 404 page<br>
➕ **AND** the page title should be "Page Not Found"<br>
➕ **AND** the URL should remain unchanged<br>
➕ **AND** the 404 template should be rendered<br>

#### 1.6. Navigation with authentication {#front-end-router-navigation-with-authentication}

🔧 **GIVEN** I am not logged in<br>
🎯 **WHEN** I try to access a protected page<br>
✅ **THEN** I should be redirected to the login page<br>
➕ **AND** the URL should be "/login"<br>
➕ **AND** the login template should be rendered<br>

#### 1.7. Navigation with transition and cleanup {#front-end-router-navigation-with-transition-and-cleanup}

🔧 **GIVEN** I am on a page with active scripts<br>
🎯 **WHEN** I navigate to a new page<br>
✅ **THEN** the previous page cleanup should be executed<br>
➕ **AND** the new page script should be initialized<br>
➕ **AND** the content should be updated after the transition<br>

#### 1.8. Link handling with internal navigation {#front-end-router-link-handling-with-internal-navigation}

🎯 **WHEN** I click on an internal link<br>
✅ **THEN** the navigation should be handled by the router<br>
➕ **AND** the page should not be reloaded<br>
➕ **AND** the browser history should be updated<br>

#### 1.9. Back button handling {#front-end-router-back-button-handling}

🔧 **GIVEN** I am on the "/about" page<br>
🎯 **WHEN** I click the back button<br>
✅ **THEN** I should go back to the previous page<br>
➕ **AND** the URL should be updated<br>
➕ **AND** the content should be updated<br>
➕ **AND** the page cleanup should be executed<br>

#### 1.10. External link handling {#front-end-router-external-link-handling}

🎯 **WHEN** I click on an external link<br>
✅ **THEN** the navigation should be handled by the browser<br>
➕ **AND** the page should be reloaded<br>

#### 1.11. Template rendering with state management {#front-end-router-template-rendering-with-state-management}

🎯 **WHEN** I visit a page with reactive state<br>
✅ **THEN** the template should be rendered<br>
➕ **AND** the page script should be initialized<br>
➕ **AND** the reactive state should be set up<br>
➕ **AND** the UI should respond to state changes<br>

#### 1.12. Script cleanup on navigation {#front-end-router-script-cleanup-on-navigation}

🔧 **GIVEN** I am on a page with active event listeners<br>
🎯 **WHEN** I navigate to another page<br>
✅ **THEN** the previous page event listeners should be removed<br>
➕ **AND** the previous page timers should be cleared<br>
➕ **AND** the previous page state should be cleaned up<br>
➕ **AND** the new page should be properly initialized<br>

#### 1.13. Multiple rapid navigation {#front-end-router-multiple-rapid-navigation}

🎯 **WHEN** I navigate quickly between multiple pages<br>
✅ **THEN** each page should render correctly<br>
➕ **AND** each page cleanup should execute properly<br>
➕ **AND** no memory leaks should occur<br>
➕ **AND** the final page should be active<br>

#### 1.14. Browser refresh handling {#front-end-router-browser-refresh-handling}

🔧 **GIVEN** I am on a specific page<br>
🎯 **WHEN** I refresh the browser<br>
✅ **THEN** the current page should be rendered correctly<br>
➕ **AND** the page script should be initialized<br>
➕ **AND** the URL should remain the same<br>



---

## 2. Routes {#routes}

> As a user

**File:** `features\routes\routes.feature`

### 🎯 Scenarios

#### 2.1. Basic navigation with template rendering {#routes-basic-navigation-with-template-rendering}

🎯 **WHEN** I visit the home page<br>
✅ **THEN** I should see the home page content<br>
➕ **AND** the page title should be "Accueil"<br>
➕ **AND** the URL should be "/"<br>
➕ **AND** the home template should be rendered<br>

#### 2.2. Navigation to page with script {#routes-navigation-to-page-with-script}

🎯 **WHEN** I click on the "About" link<br>
✅ **THEN** I should see the About page content<br>
➕ **AND** the page title should be "À propos"<br>



---

## 3. Translation and internationalization {#translation-and-internationalization}

> As a bento generator user

**File:** `features\translate\translate.feature`

### 🔧 Background

- **GIVEN** the application is initialized
- **AND** translation data is available


### 🎯 Scenarios

#### 3.1. Language detection from browser {#translation-and-internationalization-language-detection-from-browser}

🔧 **GIVEN** I visit the application for the first time<br>
➕ **AND** no language preference is stored<br>
🎯 **WHEN** the application initializes<br>
✅ **THEN** the browser language is detected<br>
➕ **AND** if the browser language is supported, it is set as current language<br>
➕ **AND** if the browser language is not supported, French is set as default<br>

#### 3.2. Language persistence in localStorage {#translation-and-internationalization-language-persistence-in-localstorage}

🔧 **GIVEN** I have previously selected a language<br>
🎯 **WHEN** the application loads<br>
✅ **THEN** the stored language preference is retrieved<br>
➕ **AND** the application uses the stored language<br>
➕ **AND** the language preference persists across sessions<br>

#### 3.3. Language switching {#translation-and-internationalization-language-switching}

🔧 **GIVEN** I am using the application<br>
🎯 **WHEN** I change the language setting<br>
✅ **THEN** the current language is updated<br>
➕ **AND** all UI elements are translated to the new language<br>
➕ **AND** the language preference is saved to localStorage<br>

#### 3.4. Translation retrieval {#translation-and-internationalization-translation-retrieval}

🔧 **GIVEN** I have translation data for multiple languages<br>
🎯 **WHEN** I request a translation<br>
✅ **THEN** the translation for the current language is returned<br>
➕ **AND** if the current language translation is not available, French is used as fallback<br>
➕ **AND** if no translation is found, 'Not found' is returned<br>

#### 3.5. UI element translation {#translation-and-internationalization-ui-element-translation}

🔧 **GIVEN** I have UI elements with translation attributes<br>
🎯 **WHEN** the language changes<br>
✅ **THEN** all elements with 'data-translate' attributes are updated<br>
➕ **AND** the text content reflects the new language<br>
➕ **AND** the translation keys are properly resolved<br>

#### 3.6. Supported languages {#translation-and-internationalization-supported-languages}

🔧 **GIVEN** the translation system is active<br>
🎯 **WHEN** I check available languages<br>
✅ **THEN** French (fr) is supported<br>
➕ **AND** English (en) is supported<br>
➕ **AND** Korean (ko) is supported<br>
➕ **AND** other languages are not supported<br>

#### 3.7. Translation key management {#translation-and-internationalization-translation-key-management}

🔧 **GIVEN** I have UI translation keys<br>
🎯 **WHEN** I check the available translation keys<br>
✅ **THEN** action keys (add, delete, exchange, select) are available<br>
➕ **AND** navigation keys (home, about) are available<br>
➕ **AND** content keys (ingredients, steps, export) are available<br>
➕ **AND** all keys have translations for supported languages<br>

#### 3.8. Fallback translation behavior {#translation-and-internationalization-fallback-translation-behavior}

🔧 **GIVEN** I have a translation object with missing languages<br>
🎯 **WHEN** I request a translation<br>
✅ **THEN** the system falls back to French if the current language is missing<br>
➕ **AND** the system returns 'Not found' if no translations are available<br>
➕ **AND** no errors are thrown for missing translations<br>

#### 3.9. Language storage key management {#translation-and-internationalization-language-storage-key-management}

🔧 **GIVEN** the translation system is active<br>
🎯 **WHEN** I check the localStorage key<br>
✅ **THEN** the key is set to 'bento_language'<br>
➕ **AND** the language preference is stored under this key<br>

#### 3.10. Dynamic translation updates {#translation-and-internationalization-dynamic-translation-updates}

🔧 **GIVEN** I have elements that need translation updates<br>
🎯 **WHEN** the language changes<br>
✅ **THEN** all elements with translation attributes are found<br>
➕ **AND** their text content is updated with new translations<br>
➕ **AND** the UI reflects the language change immediately<br>

#### 3.11. Translation data structure {#translation-and-internationalization-translation-data-structure}

🔧 **GIVEN** I have translation objects<br>
🎯 **WHEN** I examine the translation structure<br>
✅ **THEN** each translation has a French (fr) property<br>
➕ **AND** optional English (en) and Korean (ko) properties<br>
➕ **AND** the structure is consistent across all translations<br>



---

## 4. Application version management {#application-version-management}

> As a bento generator user

**File:** `features\version\version.feature`

### 🔧 Background

- **GIVEN** the application is initialized
- **AND** the version system is active


### 🎯 Scenarios

#### 4.1. Version display initialization {#application-version-management-version-display-initialization}

🔧 **GIVEN** I am on any page of the application<br>
🎯 **WHEN** the version system initializes<br>
✅ **THEN** the version is retrieved from package.json<br>
➕ **AND** the version is displayed in the designated element<br>
➕ **AND** the version element is found by ID 'version'<br>

#### 4.2. Version element update {#application-version-management-version-element-update}

🔧 **GIVEN** I have a version element in the DOM<br>
🎯 **WHEN** the displayVersion function is called<br>
✅ **THEN** the version element's text content is updated<br>
➕ **AND** the version matches the package.json version<br>
➕ **AND** the version is displayed correctly<br>

#### 4.3. Version constant management {#application-version-management-version-constant-management}

🔧 **GIVEN** the version system is active<br>
🎯 **WHEN** I check the version constant<br>
✅ **THEN** the version is imported from package.json<br>
➕ **AND** the version constant is available for use<br>
➕ **AND** the version format follows semantic versioning<br>

#### 4.4. Version element not found {#application-version-management-version-element-not-found}

🔧 **GIVEN** the version element is not present in the DOM<br>
🎯 **WHEN** the displayVersion function is called<br>
✅ **THEN** no error is thrown<br>
➕ **AND** the function handles the missing element gracefully<br>
➕ **AND** the application continues to function normally<br>

#### 4.5. Version display on page load {#application-version-management-version-display-on-page-load}

🔧 **GIVEN** I visit the application<br>
🎯 **WHEN** the page loads<br>
✅ **THEN** the version is automatically displayed<br>
➕ **AND** the version is visible to the user<br>
➕ **AND** the version information is current<br>

#### 4.6. Version consistency {#application-version-management-version-consistency}

🔧 **GIVEN** the application is running<br>
🎯 **WHEN** I check the version in different parts of the application<br>
✅ **THEN** the version is consistent across all components<br>
➕ **AND** the version matches the package.json version<br>
➕ **AND** no version conflicts exist<br>

#### 4.7. Version format validation {#application-version-management-version-format-validation}

🔧 **GIVEN** I have a version from package.json<br>
🎯 **WHEN** I examine the version format<br>
✅ **THEN** the version follows semantic versioning (major.minor.patch)<br>
➕ **AND** the version is a valid string<br>
➕ **AND** the version can be parsed correctly<br>

#### 4.8. Version display in footer {#application-version-management-version-display-in-footer}

🔧 **GIVEN** I am viewing the application<br>
🎯 **WHEN** I look for version information<br>
✅ **THEN** the version is typically displayed in the footer<br>
➕ **AND** the version is easily accessible<br>
➕ **AND** the version is clearly labeled<br>

#### 4.9. Version updates tracking {#application-version-management-version-updates-tracking}

🔧 **GIVEN** I am using the application<br>
🎯 **WHEN** the application is updated<br>
✅ **THEN** the version number changes accordingly<br>
➕ **AND** the new version is displayed<br>
➕ **AND** users can track application updates<br>

#### 4.10. Version system cleanup {#application-version-management-version-system-cleanup}

🔧 **GIVEN** the version system is active<br>
🎯 **WHEN** the application is closed<br>
✅ **THEN** no cleanup is required for the version system<br>
➕ **AND** no memory leaks occur<br>
➕ **AND** the version system is stateless<br>



---

## 📊 Statistics

- **Features:** 4
- **Scenarios:** 37
- **Steps:** 185

---

*Documentation generated on 07/03/2026 at 21:03:00*

