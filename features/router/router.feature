Feature: Front-end Router
  As a user
  I want to navigate through the application
  So that I can access different pages

  Background:
    Given the application is loaded
    And the router is initialized

  Scenario: Basic navigation
    When I visit the home page
    Then I should see the home page content
    And the page title should be "Home"
    And the URL should be "/"

  Scenario: Navigation to another page
    When I click on the "About" link
    Then I should see the About page content
    And the page title should be "About"
    And the URL should be "/about"
    And the history should be updated

  Scenario: Navigation with dynamic parameters
    When I visit the page "/users/123"
    Then I should see the user profile for 123
    And the page title should be "User Profile"
    And the URL should be "/users/123"

  Scenario: Navigation with query parameters
    When I visit the page "/search?q=test"
    Then I should see search results for "test"
    And the URL should be "/search?q=test"

  Scenario: Page not found
    When I visit a non-existent page
    Then I should see the 404 page
    And the page title should be "Page Not Found"
    And the URL should remain unchanged

  Scenario: Navigation with authentication
    Given I am not logged in
    When I try to access a protected page
    Then I should be redirected to the login page
    And the URL should be "/login"

  Scenario: Navigation with transition
    When I navigate to a new page
    Then a transition animation should be played
    And the content should be updated after the transition

  Scenario: Link handling
    When I click on an internal link
    Then the navigation should be handled by the router
    And the page should not be reloaded

  Scenario: Back button handling
    Given I am on the "/about" page
    When I click the back button
    Then I should go back to the previous page
    And the URL should be updated
    And the content should be updated

  Scenario: External link handling
    When I click on an external link
    Then the navigation should be handled by the browser
    And the page should be reloaded
