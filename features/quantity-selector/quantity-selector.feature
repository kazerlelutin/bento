@quantity-selector @ui @export
Feature: Quantity selector
  Allows adjusting the number of people for the recipe.

  Background:
    Given the application is loaded
    And the quantity selector is visible

  @initial-state
  Scenario: Initial display
    Then the displayed quantity is 1
    And the "-" button is disabled

  @increment
  Scenario: Increment the quantity
    When I click the "+" button
    Then the displayed quantity is 2
    And the "-" button is enabled

  @decrement
  Scenario: Decrement the quantity back to 1
    Given the displayed quantity is 2
    When I click the "-" button
    Then the displayed quantity is 1
    And the "-" button is disabled

  @i18n
  Scenario Outline: Label translation
    Given the current language is <lang>
    Then the selector label contains <text>

    Examples:
      | lang | text |
      | fr   | Pour |
      | en   | For  |
      | ko   | 명   |
