Feature: Recipe export functionality
  As a bento generator user
  I want to export my customized recipe in different formats
  So that I can save and share my bento recipe

  Background:
    Given the application is initialized
    And a base is selected
    And ingredients are customized in the composer

  Scenario: Export interface initialization
    Given I am on the export page
    When the export interface loads
    Then I see the recipe name displayed
    And I see the list of selected ingredients with quantities
    And I see the cooking steps with descriptions
    And I see export format buttons (Markdown and JSON)
    And the interface is translated according to current language

  Scenario: Exporting recipe as Markdown
    Given I am on the export page
    And the recipe is ready for export
    When I click on the Markdown export button
    Then a Markdown file is downloaded
    And the file contains the recipe name as header
    And the file contains ingredients list with quantities
    And the file contains cooking steps with descriptions
    And the file contains tips if available

  Scenario: Exporting recipe as JSON
    Given I am on the export page
    And the recipe is ready for export
    When I click on the JSON export button
    Then a JSON file is downloaded
    And the file contains structured recipe data
    And the file includes recipe name, ingredients, and steps
    And the JSON is properly formatted with indentation

  Scenario: Recipe data generation
    Given I am on the export page
    And ingredients are selected and customized
    When the recipe data is generated
    Then the recipe name is generated from base and top ingredients
    And only selected ingredients are included
    And ingredients show correct quantities and units
    And steps are filtered based on available ingredients
    And steps are sorted by order
    And ingredient substitutions are applied correctly

  Scenario: Step filtering based on ingredients
    Given I am on the export page
    And some ingredients are deselected
    When the recipe steps are processed
    Then steps requiring unavailable ingredients are excluded
    Then steps with no ingredient requirements are included
    Then steps with available ingredient substitutes are included

  Scenario: Text transformation with ingredients
    Given I am on the export page
    And step descriptions contain ingredient placeholders
    When the text is transformed
    Then ingredient placeholders are replaced with actual ingredient names
    Then ingredient lists are properly formatted
    Then ingredient names are displayed in lowercase

  Scenario: Export format button states
    Given I am on the export page
    When I select a specific export format
    Then the selected format button is highlighted
    And other format buttons are not highlighted

  Scenario: Export interface cleanup
    Given the export interface is displayed
    When I navigate to another page
    Then the export subscriptions are cleaned up
    And the export event listeners are removed

  Scenario: Handling missing template elements
    Given I am on the export page
    When template elements are missing from the DOM
    Then the export interface handles the missing elements gracefully
    And the export functionality continues to work

  Scenario: Recipe name generation with customizations
    Given I am on the export page
    And ingredients have been substituted
    When the recipe name is generated
    Then the name reflects the substituted ingredients
    And the name uses the appropriate component names
    And the name is properly formatted
