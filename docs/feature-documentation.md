# 📋 Documentation des Features

> Documentation générée automatiquement à partir des fichiers `.feature`

## 📑 Table des matières

1. [Front-end Router](#front-end-router)
<br>   1.1. [Basic navigation](#front-end-router-basic-navigation)
<br>   1.2. [Navigation to another page](#front-end-router-navigation-to-another-page)
<br>   1.3. [Navigation with dynamic parameters](#front-end-router-navigation-with-dynamic-parameters)
<br>   1.4. [Navigation with query parameters](#front-end-router-navigation-with-query-parameters)
<br>   1.5. [Page not found](#front-end-router-page-not-found)
<br>   1.6. [Navigation with authentication](#front-end-router-navigation-with-authentication)
<br>   1.7. [Navigation with transition](#front-end-router-navigation-with-transition)
<br>   1.8. [Link handling](#front-end-router-link-handling)
<br>   1.9. [Back button handling](#front-end-router-back-button-handling)
<br>   1.10. [External link handling](#front-end-router-external-link-handling)
<br>

---

## 1. Front-end Router {#front-end-router}

> As a user

**Fichier:** `features\router\router.feature`

### 🔧 Background

- **GIVEN** the application is loaded
<br>- **AND** the router is initialized
<br>
### 🎯 Scenarios

#### 1.1. Basic navigation {#front-end-router-basic-navigation}

🎯 **WHEN** I visit the home page
<br>✅ **THEN** I should see the home page content
<br>➕ **AND** the page title should be "Home"
<br>➕ **AND** the URL should be "/"
<br>
#### 1.2. Navigation to another page {#front-end-router-navigation-to-another-page}

🎯 **WHEN** I click on the "About" link
<br>✅ **THEN** I should see the About page content
<br>➕ **AND** the page title should be "About"
<br>➕ **AND** the URL should be "/about"
<br>➕ **AND** the history should be updated
<br>
#### 1.3. Navigation with dynamic parameters {#front-end-router-navigation-with-dynamic-parameters}

🎯 **WHEN** I visit the page "/users/123"
<br>✅ **THEN** I should see the user profile for 123
<br>➕ **AND** the page title should be "User Profile"
<br>➕ **AND** the URL should be "/users/123"
<br>
#### 1.4. Navigation with query parameters {#front-end-router-navigation-with-query-parameters}

🎯 **WHEN** I visit the page "/search?q=test"
<br>✅ **THEN** I should see search results for "test"
<br>➕ **AND** the URL should be "/search?q=test"
<br>
#### 1.5. Page not found {#front-end-router-page-not-found}

🎯 **WHEN** I visit a non-existent page
<br>✅ **THEN** I should see the 404 page
<br>➕ **AND** the page title should be "Page Not Found"
<br>➕ **AND** the URL should remain unchanged
<br>
#### 1.6. Navigation with authentication {#front-end-router-navigation-with-authentication}

🔧 **GIVEN** I am not logged in
<br>🎯 **WHEN** I try to access a protected page
<br>✅ **THEN** I should be redirected to the login page
<br>➕ **AND** the URL should be "/login"
<br>
#### 1.7. Navigation with transition {#front-end-router-navigation-with-transition}

🎯 **WHEN** I navigate to a new page
<br>✅ **THEN** a transition animation should be played
<br>➕ **AND** the content should be updated after the transition
<br>
#### 1.8. Link handling {#front-end-router-link-handling}

🎯 **WHEN** I click on an internal link
<br>✅ **THEN** the navigation should be handled by the router
<br>➕ **AND** the page should not be reloaded
<br>
#### 1.9. Back button handling {#front-end-router-back-button-handling}

🔧 **GIVEN** I am on the "/about" page
<br>🎯 **WHEN** I click the back button
<br>✅ **THEN** I should go back to the previous page
<br>➕ **AND** the URL should be updated
<br>➕ **AND** the content should be updated
<br>
#### 1.10. External link handling {#front-end-router-external-link-handling}

🎯 **WHEN** I click on an external link
<br>✅ **THEN** the navigation should be handled by the browser
<br>➕ **AND** the page should be reloaded
<br>


---

## 📊 Statistiques

- **Features:** 1
- **Scenarios:** 10
- **Steps:** 38

---

*Documentation générée le 26/06/2025 à 23:45:04*

