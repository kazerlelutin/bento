Feature: Recipe URL management and sharing
  As a bento generator user
  I want to share my recipe configuration through URL parameters
  So that others can access the same recipe configuration

  Background:
    Given the application is initialized
    And the recipe URL system is active

  Scenario: URL injection on page load
    Given I visit a URL with recipe parameters
    When the page loads
    Then the recipe configuration is extracted from the URL
    And the base is set according to the URL parameters
    And the variant is set according to the URL parameters
    And the selected ingredients are restored from the URL parameters

  Scenario: URL update on base change
    Given I am on the bento generator page
    And I have a current recipe configuration
    When I change the base selection
    Then the URL is updated with the new base ID
    And the URL contains the current variant ID
    And the URL contains the current selected ingredients

  Scenario: URL update on variant change
    Given I am on the bento generator page
    And I have a current recipe configuration
    When I change the variant selection
    Then the URL is updated with the new variant ID
    And the URL contains the current base ID
    And the URL contains the current selected ingredients

  Scenario: URL update on ingredient selection change
    Given I am on the bento generator page
    And I have a current recipe configuration
    When I modify ingredient selections
    Then the URL is updated with the new ingredient selections
    And the URL contains the current base ID
    And the URL contains the current variant ID

  Scenario: Recipe data encoding in URL
    Given I have a complete recipe configuration
    When the URL is updated
    Then the recipe data is encoded in base64
    And the encoded data contains base ID, variant ID, and selected ingredients
    And the encoded data is added as a URL parameter

  Scenario: Recipe data decoding from URL
    Given I have a URL with encoded recipe data
    When the URL is processed
    Then the base64 data is decoded
    And the recipe configuration is parsed from JSON
    And the base, variant, and ingredients are restored

  Scenario: Handling invalid URL parameters
    Given I visit a URL with invalid recipe parameters
    When the page loads
    Then the system handles the invalid data gracefully
    And the URL is updated with default configuration
    And no errors are thrown

  Scenario: URL parameter key management
    Given the recipe URL system is active
    When I check the URL parameter key
    Then the key is set to 'recipe'
    And the parameter is properly formatted in the URL

  Scenario: Browser history management
    Given I am on the bento generator page
    When the URL is updated with new recipe configuration
    Then the browser history is updated
    And the back button works correctly
    And the URL reflects the current state

  Scenario: Recipe URL cleanup
    Given the recipe URL system is active
    When I navigate away from the page
    Then the URL subscriptions are cleaned up
    And no memory leaks occur

  Scenario: Fallback to random variant
    Given I have a URL with a base ID but invalid variant ID
    When the URL is processed
    Then a random variant is selected for the base
    And the URL is updated with the new variant ID
    And the recipe configuration is valid
