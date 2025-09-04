Feature: Base selection for bento
  As a bento generator user
  I want to be able to select a base for my bento
  So that I can customize my recipe according to my preferences

  Background:
    Given the application is initialized
    And recipe bases are available

  Scenario: Base selection initialization
    Given I am on the base selection page
    When the base selection interface loads
    Then I see all available bases (onigiri, empanada, gimbap, cake, savoy_cake)
    And each base displays its translated name
    And each base displays its corresponding icon
    And a random base is preselected by default
    And the preselected base is disabled

  Scenario: Selecting a different base
    Given I am on the base selection page
    And a base is currently selected
    When I click on another available base
    Then the new base becomes the current base
    And the previously selected base becomes available again
    And the newly selected base becomes disabled
    And a random variant is generated for the new base

  Scenario: Attempting to select an already selected base
    Given I am on the base selection page
    And a base is currently selected and disabled
    When I click on this same base
    Then nothing happens
    And the base remains selected
    And the base remains disabled

  Scenario: Interface cleanup
    Given the base selection interface is displayed
    When I navigate to another page
    Then the base selection interface is cleaned up
    And click events are removed
    And the container is emptied

  Scenario: Error handling - base not found
    Given I am on the base selection page
    When the system attempts to retrieve a base with an invalid ID
    Then an error is thrown indicating that the base was not found

  Scenario: Retrieving a base by ID
    Given recipe bases are loaded
    When I request a base by its valid ID
    Then the corresponding base is returned
    And the base contains its ingredients and steps

  Scenario: Generating a random base
    Given recipe bases are loaded
    When I request a random base
    Then a valid base is returned
    And this base is part of the available bases
