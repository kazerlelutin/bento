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
2. [Crafter Stepper](#crafter-stepper)<br/>
   2.1. [Stepper initialization](#crafter-stepper-stepper-initialization)<br/>
   2.2. [Step content changes when navigator step changes](#crafter-stepper-step-content-changes-when-navigator-step-changes)<br/>
   2.3. [Step content changes when navigator step changes to composer](#crafter-stepper-step-content-changes-when-navigator-step-changes-to-composer)<br/>
   2.4. [Step content changes when navigator step changes to export](#crafter-stepper-step-content-changes-when-navigator-step-changes-to-export)<br/>
   2.5. [Error handling when step is not found](#crafter-stepper-error-handling-when-step-is-not-found)<br/>
   2.6. [Error handling when stepper container is missing](#crafter-stepper-error-handling-when-stepper-container-is-missing)<br/>
   2.7. [Error handling when step template is missing](#crafter-stepper-error-handling-when-step-template-is-missing)<br/>
   2.8. [Stepper cleanup](#crafter-stepper-stepper-cleanup)<br/>
   2.9. [Step controller execution](#crafter-stepper-step-controller-execution)<br/>
   2.10. [Step controller execution for base step](#crafter-stepper-step-controller-execution-for-base-step)<br/>
   2.11. [Step controller execution for composer step](#crafter-stepper-step-controller-execution-for-composer-step)<br/>
   2.12. [Step controller execution for export step](#crafter-stepper-step-controller-execution-for-export-step)<br/>
   2.13. [Content replacement between steps](#crafter-stepper-content-replacement-between-steps)<br/>
   2.14. [Integration with crafter navigator store](#crafter-stepper-integration-with-crafter-navigator-store)<br/>
3. [Front-end Router](#front-end-router)<br/>
   3.1. [Basic navigation with template rendering](#front-end-router-basic-navigation-with-template-rendering)<br/>
   3.2. [Navigation to page with script](#front-end-router-navigation-to-page-with-script)<br/>
   3.3. [Navigation with dynamic parameters](#front-end-router-navigation-with-dynamic-parameters)<br/>
   3.4. [Navigation with query parameters](#front-end-router-navigation-with-query-parameters)<br/>
   3.5. [Page not found](#front-end-router-page-not-found)<br/>
   3.6. [Navigation with authentication](#front-end-router-navigation-with-authentication)<br/>
   3.7. [Navigation with transition and cleanup](#front-end-router-navigation-with-transition-and-cleanup)<br/>
   3.8. [Link handling with internal navigation](#front-end-router-link-handling-with-internal-navigation)<br/>
   3.9. [Back button handling](#front-end-router-back-button-handling)<br/>
   3.10. [External link handling](#front-end-router-external-link-handling)<br/>
   3.11. [Template rendering with state management](#front-end-router-template-rendering-with-state-management)<br/>
   3.12. [Script cleanup on navigation](#front-end-router-script-cleanup-on-navigation)<br/>
   3.13. [Multiple rapid navigation](#front-end-router-multiple-rapid-navigation)<br/>
   3.14. [Browser refresh handling](#front-end-router-browser-refresh-handling)<br/>
4. [Routes](#routes)<br/>
   4.1. [Basic navigation with template rendering](#routes-basic-navigation-with-template-rendering)<br/>
   4.2. [Navigation to page with script](#routes-navigation-to-page-with-script)<br/>


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

## 2. Crafter Stepper {#crafter-stepper}

**File:** `features\crafter-stepper\crafter-stepper.feature`

### 🎯 Scenarios

#### 2.1. Stepper initialization {#crafter-stepper-stepper-initialization}

🔧 **GIVEN** the DOM contains an element with id "stepper"<br>
➕ **AND** the DOM contains templates for all stepper steps<br>
🎯 **WHEN** I initialize the Crafter Stepper<br>
✅ **THEN** the stepper should subscribe to the crafter navigator store<br>
➕ **AND** the stepper should display the current step content<br>
➕ **AND** the stepper should call the current step controller<br>

#### 2.2. Step content changes when navigator step changes {#crafter-stepper-step-content-changes-when-navigator-step-changes}

🔧 **GIVEN** the Crafter Stepper is initialized<br>
➕ **AND** the current step is "home"<br>
🎯 **WHEN** the crafter navigator changes to step "base"<br>
✅ **THEN** the stepper should update the container content<br>
➕ **AND** the stepper should display the "base" template content<br>
➕ **AND** the stepper should call the "base" step controller<br>
➕ **AND** the stepper should replace the previous step content<br>

#### 2.3. Step content changes when navigator step changes to composer {#crafter-stepper-step-content-changes-when-navigator-step-changes-to-composer}

🔧 **GIVEN** the Crafter Stepper is initialized<br>
➕ **AND** the current step is "base"<br>
🎯 **WHEN** the crafter navigator changes to step "composer"<br>
✅ **THEN** the stepper should update the container content<br>
➕ **AND** the stepper should display the "composer" template content<br>
➕ **AND** the stepper should call the "composer" step controller<br>

#### 2.4. Step content changes when navigator step changes to export {#crafter-stepper-step-content-changes-when-navigator-step-changes-to-export}

🔧 **GIVEN** the Crafter Stepper is initialized<br>
➕ **AND** the current step is "composer"<br>
🎯 **WHEN** the crafter navigator changes to step "export"<br>
✅ **THEN** the stepper should update the container content<br>
➕ **AND** the stepper should display the "export" template content<br>
➕ **AND** the stepper should call the "export" step controller<br>

#### 2.5. Error handling when step is not found {#crafter-stepper-error-handling-when-step-is-not-found}

🔧 **GIVEN** the Crafter Stepper is initialized<br>
🎯 **WHEN** the crafter navigator changes to an invalid step<br>
✅ **THEN** the stepper should throw an error "Stepper step invalid not found"<br>

#### 2.6. Error handling when stepper container is missing {#crafter-stepper-error-handling-when-stepper-container-is-missing}

🔧 **GIVEN** the DOM does not contain an element with id "stepper"<br>
➕ **AND** the Crafter Stepper is initialized<br>
🎯 **WHEN** the crafter navigator changes to step "base"<br>
✅ **THEN** the stepper should throw an error "Stepper container not found"<br>

#### 2.7. Error handling when step template is missing {#crafter-stepper-error-handling-when-step-template-is-missing}

🔧 **GIVEN** the DOM contains an element with id "stepper"<br>
➕ **AND** the DOM does not contain the "stepper-base-template"<br>
➕ **AND** the Crafter Stepper is initialized<br>
🎯 **WHEN** the crafter navigator changes to step "base"<br>
✅ **THEN** the stepper should throw an error "Stepper template stepper-base-template not found"<br>

#### 2.8. Stepper cleanup {#crafter-stepper-stepper-cleanup}

🔧 **GIVEN** the Crafter Stepper is initialized<br>
🎯 **WHEN** I call the stepper cleanup method<br>
✅ **THEN** the stepper should unsubscribe from the crafter navigator store<br>

#### 2.9. Step controller execution {#crafter-stepper-step-controller-execution}

🔧 **GIVEN** the Crafter Stepper is initialized<br>
🎯 **WHEN** the crafter navigator changes to step "home"<br>
✅ **THEN** the stepper should execute the "home" step controller<br>
➕ **AND** the step controller should log "home"<br>

#### 2.10. Step controller execution for base step {#crafter-stepper-step-controller-execution-for-base-step}

🔧 **GIVEN** the Crafter Stepper is initialized<br>
🎯 **WHEN** the crafter navigator changes to step "base"<br>
✅ **THEN** the stepper should execute the "base" step controller<br>
➕ **AND** the step controller should log "base"<br>

#### 2.11. Step controller execution for composer step {#crafter-stepper-step-controller-execution-for-composer-step}

🔧 **GIVEN** the Crafter Stepper is initialized<br>
🎯 **WHEN** the crafter navigator changes to step "composer"<br>
✅ **THEN** the stepper should execute the "composer" step controller<br>
➕ **AND** the step controller should log "composer"<br>

#### 2.12. Step controller execution for export step {#crafter-stepper-step-controller-execution-for-export-step}

🔧 **GIVEN** the Crafter Stepper is initialized<br>
🎯 **WHEN** the crafter navigator changes to step "export"<br>
✅ **THEN** the stepper should execute the "export" step controller<br>
➕ **AND** the step controller should log "export"<br>

#### 2.13. Content replacement between steps {#crafter-stepper-content-replacement-between-steps}

🔧 **GIVEN** the Crafter Stepper is initialized<br>
➕ **AND** the current step is "home"<br>
🎯 **WHEN** the crafter navigator changes to step "base"<br>
✅ **THEN** the stepper should replace the home content with base content<br>
➕ **AND** the stepper container should not contain home content<br>
➕ **AND** the stepper container should contain base content<br>

#### 2.14. Integration with crafter navigator store {#crafter-stepper-integration-with-crafter-navigator-store}

🔧 **GIVEN** the Crafter Stepper is initialized<br>
🎯 **WHEN** the crafter navigator store current step changes<br>
✅ **THEN** the stepper should receive the step change notification<br>
➕ **AND** the stepper should update the UI with the new step<br>



---

## 3. Front-end Router {#front-end-router}

> As a user

**File:** `features\router\router.feature`

### 🔧 Background

- **GIVEN** the application is loaded
- **AND** the router is initialized
- **AND** the templates are available


### 🎯 Scenarios

#### 3.1. Basic navigation with template rendering {#front-end-router-basic-navigation-with-template-rendering}

🎯 **WHEN** I visit the home page<br>
✅ **THEN** I should see the home page content<br>
➕ **AND** the page title should be "Accueil"<br>
➕ **AND** the URL should be "/"<br>
➕ **AND** the home template should be rendered<br>

#### 3.2. Navigation to page with script {#front-end-router-navigation-to-page-with-script}

🎯 **WHEN** I click on the "About" link<br>
✅ **THEN** I should see the About page content<br>
➕ **AND** the page title should be "À propos"<br>
➕ **AND** the URL should be "/about"<br>
➕ **AND** the about template should be rendered<br>
➕ **AND** the about page script should be initialized<br>
➕ **AND** the previous page cleanup should be executed<br>

#### 3.3. Navigation with dynamic parameters {#front-end-router-navigation-with-dynamic-parameters}

🎯 **WHEN** I visit the page "/users/123"<br>
✅ **THEN** I should see the user profile for 123<br>
➕ **AND** the page title should be "User Profile"<br>
➕ **AND** the URL should be "/users/123"<br>
➕ **AND** the user template should be rendered<br>

#### 3.4. Navigation with query parameters {#front-end-router-navigation-with-query-parameters}

🎯 **WHEN** I visit the page "/search?q=test"<br>
✅ **THEN** I should see search results for "test"<br>
➕ **AND** the URL should be "/search?q=test"<br>
➕ **AND** the search template should be rendered<br>

#### 3.5. Page not found {#front-end-router-page-not-found}

🎯 **WHEN** I visit a non-existent page<br>
✅ **THEN** I should see the 404 page<br>
➕ **AND** the page title should be "Page Not Found"<br>
➕ **AND** the URL should remain unchanged<br>
➕ **AND** the 404 template should be rendered<br>

#### 3.6. Navigation with authentication {#front-end-router-navigation-with-authentication}

🔧 **GIVEN** I am not logged in<br>
🎯 **WHEN** I try to access a protected page<br>
✅ **THEN** I should be redirected to the login page<br>
➕ **AND** the URL should be "/login"<br>
➕ **AND** the login template should be rendered<br>

#### 3.7. Navigation with transition and cleanup {#front-end-router-navigation-with-transition-and-cleanup}

🔧 **GIVEN** I am on a page with active scripts<br>
🎯 **WHEN** I navigate to a new page<br>
✅ **THEN** the previous page cleanup should be executed<br>
➕ **AND** the new page script should be initialized<br>
➕ **AND** the content should be updated after the transition<br>

#### 3.8. Link handling with internal navigation {#front-end-router-link-handling-with-internal-navigation}

🎯 **WHEN** I click on an internal link<br>
✅ **THEN** the navigation should be handled by the router<br>
➕ **AND** the page should not be reloaded<br>
➕ **AND** the browser history should be updated<br>

#### 3.9. Back button handling {#front-end-router-back-button-handling}

🔧 **GIVEN** I am on the "/about" page<br>
🎯 **WHEN** I click the back button<br>
✅ **THEN** I should go back to the previous page<br>
➕ **AND** the URL should be updated<br>
➕ **AND** the content should be updated<br>
➕ **AND** the page cleanup should be executed<br>

#### 3.10. External link handling {#front-end-router-external-link-handling}

🎯 **WHEN** I click on an external link<br>
✅ **THEN** the navigation should be handled by the browser<br>
➕ **AND** the page should be reloaded<br>

#### 3.11. Template rendering with state management {#front-end-router-template-rendering-with-state-management}

🎯 **WHEN** I visit a page with reactive state<br>
✅ **THEN** the template should be rendered<br>
➕ **AND** the page script should be initialized<br>
➕ **AND** the reactive state should be set up<br>
➕ **AND** the UI should respond to state changes<br>

#### 3.12. Script cleanup on navigation {#front-end-router-script-cleanup-on-navigation}

🔧 **GIVEN** I am on a page with active event listeners<br>
🎯 **WHEN** I navigate to another page<br>
✅ **THEN** the previous page event listeners should be removed<br>
➕ **AND** the previous page timers should be cleared<br>
➕ **AND** the previous page state should be cleaned up<br>
➕ **AND** the new page should be properly initialized<br>

#### 3.13. Multiple rapid navigation {#front-end-router-multiple-rapid-navigation}

🎯 **WHEN** I navigate quickly between multiple pages<br>
✅ **THEN** each page should render correctly<br>
➕ **AND** each page cleanup should execute properly<br>
➕ **AND** no memory leaks should occur<br>
➕ **AND** the final page should be active<br>

#### 3.14. Browser refresh handling {#front-end-router-browser-refresh-handling}

🔧 **GIVEN** I am on a specific page<br>
🎯 **WHEN** I refresh the browser<br>
✅ **THEN** the current page should be rendered correctly<br>
➕ **AND** the page script should be initialized<br>
➕ **AND** the URL should remain the same<br>



---

## 4. Routes {#routes}

> As a user

**File:** `features\routes\routes.feature`

### 🎯 Scenarios

#### 4.1. Basic navigation with template rendering {#routes-basic-navigation-with-template-rendering}

🎯 **WHEN** I visit the home page<br>
✅ **THEN** I should see the home page content<br>
➕ **AND** the page title should be "Accueil"<br>
➕ **AND** the URL should be "/"<br>
➕ **AND** the home template should be rendered<br>

#### 4.2. Navigation to page with script {#routes-navigation-to-page-with-script}

🎯 **WHEN** I click on the "About" link<br>
✅ **THEN** I should see the About page content<br>
➕ **AND** the page title should be "À propos"<br>



---

## 📊 Statistics

- **Features:** 4
- **Scenarios:** 37
- **Steps:** 177

---

*Documentation generated on 18/07/2025 at 21:22:08*

