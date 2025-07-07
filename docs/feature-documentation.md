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

## 📊 Statistics

- **Features:** 2
- **Scenarios:** 16
- **Steps:** 78

---

*Documentation generated on 08/07/2025 at 12:43:14*

