Feature: Recipe composition and ingredient selection
  As a bento generator user
  I want to compose my recipe by selecting and customizing ingredients
  So that I can create a personalized bento recipe

  Background:
    Given the application is initialized
    And a base is selected
    And recipe variants are available

  Scenario: Composer initialization
    Given I am on the composer page
    When the composer interface loads
    Then I see all ingredients for the current base and variant
    And ingredients are sorted by role (core, optional, base)
    And each ingredient displays its translated name
    And each ingredient displays its corresponding icon
    And core ingredients show exchange action if multiple variants exist
    And optional ingredients show add/delete action based on selection state
    And ingredients with substitutes show exchange action

  Scenario: Selecting an optional ingredient
    Given I am on the composer page
    And an optional ingredient is not selected
    When I click on the optional ingredient
    Then the ingredient becomes selected
    And the action icon changes to delete
    And the ingredient state is updated in the store

  Scenario: Deselecting an optional ingredient
    Given I am on the composer page
    And an optional ingredient is selected
    When I click on the selected optional ingredient
    Then the ingredient becomes deselected
    And the action icon changes to add
    And the ingredient state is updated in the store

  Scenario: Changing core ingredient variant
    Given I am on the composer page
    And multiple variants exist for the current base
    When I click on a core ingredient
    Then the variant changes to the next available variant
    And all selected ingredients are reset
    And the UI is updated to reflect the new variant

  Scenario: Substituting an ingredient
    Given I am on the composer page
    And an ingredient has substitutes available
    When I click on the ingredient with substitutes
    Then the ingredient changes to the next substitute in the list
    And the ingredient cycles through all available substitutes
    And foe ingredients are automatically deselected if applicable

  Scenario: Handling ingredient foes
    Given I am on the composer page
    And an ingredient has foes defined
    When I select an ingredient that has foes
    Then all foe ingredients are automatically deselected
    And the foe relationships are respected

  Scenario: Recipe name generation
    Given I am on the composer page
    And ingredients are selected and customized
    When the recipe name is generated
    Then the name includes the base name
    And the name includes the top 2 ingredients by score
    And the name uses the appropriate ingredient components

  Scenario: Composer cleanup
    Given the composer interface is displayed
    When I navigate to another page
    Then the composer subscriptions are cleaned up
    And the UI event listeners are removed

  Scenario: Error handling - base not found
    Given I am on the composer page
    When the system attempts to load variants for an invalid base
    Then an error is thrown indicating that the base was not found

  Scenario: Error handling - variant not found
    Given I am on the composer page
    When the system attempts to load an invalid variant
    Then an error is thrown indicating that the variant was not found
