# 📋 Cucumber Features Documentation

> Documentation automatically generated from `.feature` files

## 📑 Table of Contents

1. [Navigation between crafter steps](#navigation-between-crafter-steps)<br/>
   1.1. [Display step buttons on startup](#navigation-between-crafter-steps-display-step-buttons-on-startup)<br/>
   1.2. [Change step by user click](#navigation-between-crafter-steps-change-step-by-user-click)<br/>
   1.3. [Change step by keyboard navigation](#navigation-between-crafter-steps-change-step-by-keyboard-navigation)<br/>
   1.4. [Keyboard navigation accessibility](#navigation-between-crafter-steps-keyboard-navigation-accessibility)<br/>
   1.5. [UI updates when step changes via the store](#navigation-between-crafter-steps-ui-updates-when-step-changes-via-the-store)<br/>
   1.6. [Cleanup subscriptions on destruction](#navigation-between-crafter-steps-cleanup-subscriptions-on-destruction)<br/>
   1.7. [Accessibility of step buttons](#navigation-between-crafter-steps-accessibility-of-step-buttons)<br/>
2. [Front-end Router](#front-end-router)<br/>
   2.1. [Basic navigation with template rendering](#front-end-router-basic-navigation-with-template-rendering)<br/>
   2.2. [Navigation to page with script](#front-end-router-navigation-to-page-with-script)<br/>
   2.3. [Navigation with dynamic parameters](#front-end-router-navigation-with-dynamic-parameters)<br/>
   2.4. [Navigation with query parameters](#front-end-router-navigation-with-query-parameters)<br/>
   2.5. [Page not found](#front-end-router-page-not-found)<br/>
   2.6. [Navigation with authentication](#front-end-router-navigation-with-authentication)<br/>
   2.7. [Navigation with transition and cleanup](#front-end-router-navigation-with-transition-and-cleanup)<br/>
   2.8. [Link handling with internal navigation](#front-end-router-link-handling-with-internal-navigation)<br/>
   2.9. [Back button handling](#front-end-router-back-button-handling)<br/>
   2.10. [External link handling](#front-end-router-external-link-handling)<br/>
   2.11. [Template rendering with state management](#front-end-router-template-rendering-with-state-management)<br/>
   2.12. [Script cleanup on navigation](#front-end-router-script-cleanup-on-navigation)<br/>
   2.13. [Multiple rapid navigation](#front-end-router-multiple-rapid-navigation)<br/>
   2.14. [Browser refresh handling](#front-end-router-browser-refresh-handling)<br/>
3. [Routes](#routes)<br/>
   3.1. [Basic navigation with template rendering](#routes-basic-navigation-with-template-rendering)<br/>
   3.2. [Navigation to page with script](#routes-navigation-to-page-with-script)<br/>


---

## 1. Navigation between crafter steps {#navigation-between-crafter-steps}

**File:** `features\crafter-navigator\crafter-navigator.feature`

### 🎯 Scenarios

#### 1.1. Display step buttons on startup {#navigation-between-crafter-steps-display-step-buttons-on-startup}

🔧 **GIVEN** the DOM contains an element with id "crafter-controls"<br>
🎯 **WHEN** I initialize the Crafter Navigator<br>
✅ **THEN** each crafter step has a button in the container<br>
➕ **AND** the button corresponding to the current step has the aria-current attribute set to "true"<br>
➕ **AND** the container has click and keydown event listeners attached<br>

#### 1.2. Change step by user click {#navigation-between-crafter-steps-change-step-by-user-click}

🔧 **GIVEN** the Crafter Navigator is initialized with multiple steps<br>
➕ **AND** the container contains the step buttons<br>
🎯 **WHEN** I click on the button of a different step<br>
✅ **THEN** the store's setCurrentStep method is called with the name of the clicked step<br>

#### 1.3. Change step by keyboard navigation {#navigation-between-crafter-steps-change-step-by-keyboard-navigation}

🔧 **GIVEN** the Crafter Navigator is initialized with multiple steps<br>
➕ **AND** the container contains the step buttons<br>
🎯 **WHEN** I press Enter or Space on the button of a different step<br>
✅ **THEN** the store's setCurrentStep method is called with the name of the focused step<br>

#### 1.4. Keyboard navigation accessibility {#navigation-between-crafter-steps-keyboard-navigation-accessibility}

🔧 **GIVEN** the Crafter Navigator is initialized<br>
✅ **THEN** each button is focusable with Tab key<br>
➕ **AND** each button can be activated with Enter or Space key<br>
➕ **AND** each button has proper ARIA attributes for screen readers<br>

#### 1.5. UI updates when step changes via the store {#navigation-between-crafter-steps-ui-updates-when-step-changes-via-the-store}

🔧 **GIVEN** the Crafter Navigator is initialized<br>
➕ **AND** the current step is "home"<br>
🎯 **WHEN** the store notifies a step change to "export"<br>
✅ **THEN** the "export" button has the aria-current attribute set to "true"<br>
➕ **AND** the "home" button has the aria-current attribute set to "false"<br>

#### 1.6. Cleanup subscriptions on destruction {#navigation-between-crafter-steps-cleanup-subscriptions-on-destruction}

🔧 **GIVEN** the Crafter Navigator is initialized<br>
🎯 **WHEN** I call the cleanup method<br>
✅ **THEN** the store subscription is removed<br>

#### 1.7. Accessibility of step buttons {#navigation-between-crafter-steps-accessibility-of-step-buttons}

🔧 **GIVEN** the Crafter Navigator is initialized<br>
✅ **THEN** each step button has the role "button"<br>
➕ **AND** each button has an aria-label attribute containing the step name<br>
➕ **AND** each button has a tabIndex attribute set to "0"<br>
➕ **AND** each button has the aria-current attribute set to "false" by default<br>
➕ **AND** each button has the aria-disabled attribute set to "false"<br>
➕ **AND** each button has the aria-pressed attribute set to "false"<br>
➕ **AND** each button has the aria-roledescription attribute set to "étape du crafter"<br>



---

## 2. Front-end Router {#front-end-router}

> As a user

**File:** `features\router\router.feature`

### 🔧 Background

- **GIVEN** the application is loaded
- **AND** the router is initialized
- **AND** the templates are available


### 🎯 Scenarios

#### 2.1. Basic navigation with template rendering {#front-end-router-basic-navigation-with-template-rendering}

🎯 **WHEN** I visit the home page<br>
✅ **THEN** I should see the home page content<br>
➕ **AND** the page title should be "Accueil"<br>
➕ **AND** the URL should be "/"<br>
➕ **AND** the home template should be rendered<br>

#### 2.2. Navigation to page with script {#front-end-router-navigation-to-page-with-script}

🎯 **WHEN** I click on the "About" link<br>
✅ **THEN** I should see the About page content<br>
➕ **AND** the page title should be "À propos"<br>
➕ **AND** the URL should be "/about"<br>
➕ **AND** the about template should be rendered<br>
➕ **AND** the about page script should be initialized<br>
➕ **AND** the previous page cleanup should be executed<br>

#### 2.3. Navigation with dynamic parameters {#front-end-router-navigation-with-dynamic-parameters}

🎯 **WHEN** I visit the page "/users/123"<br>
✅ **THEN** I should see the user profile for 123<br>
➕ **AND** the page title should be "User Profile"<br>
➕ **AND** the URL should be "/users/123"<br>
➕ **AND** the user template should be rendered<br>

#### 2.4. Navigation with query parameters {#front-end-router-navigation-with-query-parameters}

🎯 **WHEN** I visit the page "/search?q=test"<br>
✅ **THEN** I should see search results for "test"<br>
➕ **AND** the URL should be "/search?q=test"<br>
➕ **AND** the search template should be rendered<br>

#### 2.5. Page not found {#front-end-router-page-not-found}

🎯 **WHEN** I visit a non-existent page<br>
✅ **THEN** I should see the 404 page<br>
➕ **AND** the page title should be "Page Not Found"<br>
➕ **AND** the URL should remain unchanged<br>
➕ **AND** the 404 template should be rendered<br>

#### 2.6. Navigation with authentication {#front-end-router-navigation-with-authentication}

🔧 **GIVEN** I am not logged in<br>
🎯 **WHEN** I try to access a protected page<br>
✅ **THEN** I should be redirected to the login page<br>
➕ **AND** the URL should be "/login"<br>
➕ **AND** the login template should be rendered<br>

#### 2.7. Navigation with transition and cleanup {#front-end-router-navigation-with-transition-and-cleanup}

🔧 **GIVEN** I am on a page with active scripts<br>
🎯 **WHEN** I navigate to a new page<br>
✅ **THEN** the previous page cleanup should be executed<br>
➕ **AND** the new page script should be initialized<br>
➕ **AND** the content should be updated after the transition<br>

#### 2.8. Link handling with internal navigation {#front-end-router-link-handling-with-internal-navigation}

🎯 **WHEN** I click on an internal link<br>
✅ **THEN** the navigation should be handled by the router<br>
➕ **AND** the page should not be reloaded<br>
➕ **AND** the browser history should be updated<br>

#### 2.9. Back button handling {#front-end-router-back-button-handling}

🔧 **GIVEN** I am on the "/about" page<br>
🎯 **WHEN** I click the back button<br>
✅ **THEN** I should go back to the previous page<br>
➕ **AND** the URL should be updated<br>
➕ **AND** the content should be updated<br>
➕ **AND** the page cleanup should be executed<br>

#### 2.10. External link handling {#front-end-router-external-link-handling}

🎯 **WHEN** I click on an external link<br>
✅ **THEN** the navigation should be handled by the browser<br>
➕ **AND** the page should be reloaded<br>

#### 2.11. Template rendering with state management {#front-end-router-template-rendering-with-state-management}

🎯 **WHEN** I visit a page with reactive state<br>
✅ **THEN** the template should be rendered<br>
➕ **AND** the page script should be initialized<br>
➕ **AND** the reactive state should be set up<br>
➕ **AND** the UI should respond to state changes<br>

#### 2.12. Script cleanup on navigation {#front-end-router-script-cleanup-on-navigation}

🔧 **GIVEN** I am on a page with active event listeners<br>
🎯 **WHEN** I navigate to another page<br>
✅ **THEN** the previous page event listeners should be removed<br>
➕ **AND** the previous page timers should be cleared<br>
➕ **AND** the previous page state should be cleaned up<br>
➕ **AND** the new page should be properly initialized<br>

#### 2.13. Multiple rapid navigation {#front-end-router-multiple-rapid-navigation}

🎯 **WHEN** I navigate quickly between multiple pages<br>
✅ **THEN** each page should render correctly<br>
➕ **AND** each page cleanup should execute properly<br>
➕ **AND** no memory leaks should occur<br>
➕ **AND** the final page should be active<br>

#### 2.14. Browser refresh handling {#front-end-router-browser-refresh-handling}

🔧 **GIVEN** I am on a specific page<br>
🎯 **WHEN** I refresh the browser<br>
✅ **THEN** the current page should be rendered correctly<br>
➕ **AND** the page script should be initialized<br>
➕ **AND** the URL should remain the same<br>



---

## 3. Routes {#routes}

> As a user

**File:** `features\routes\routes.feature`

### 🎯 Scenarios

#### 3.1. Basic navigation with template rendering {#routes-basic-navigation-with-template-rendering}

🎯 **WHEN** I visit the home page<br>
✅ **THEN** I should see the home page content<br>
➕ **AND** the page title should be "Accueil"<br>
➕ **AND** the URL should be "/"<br>
➕ **AND** the home template should be rendered<br>

#### 3.2. Navigation to page with script {#routes-navigation-to-page-with-script}

🎯 **WHEN** I click on the "About" link<br>
✅ **THEN** I should see the About page content<br>
➕ **AND** the page title should be "À propos"<br>



---

## 📊 Statistics

- **Features:** 3
- **Scenarios:** 23
- **Steps:** 111

---

*Documentation generated on 18/07/2025 at 20:26:03*

