Feature: Icon management and display
  As a bento generator user
  I want to see appropriate icons for ingredients and interface elements
  So that I can easily identify and interact with different components

  Background:
    Given the application is initialized
    And the icon sprite sheet is loaded

  Scenario: Icon style application
    Given I have an HTML element that needs an icon
    When I apply an icon style to the element
    Then the element gets the 'icons' CSS class
    And the background position is set based on the icon index
    And the icon is displayed correctly

  Scenario: Icon mapping for ingredients
    Given I have ingredient data
    When I request an icon for an ingredient
    Then the correct icon index is returned from the ICONS map
    And the icon corresponds to the ingredient type
    And unknown ingredients default to index 0

  Scenario: Icon mapping for interface elements
    Given I have interface elements
    When I request icons for interface actions
    Then home icon is mapped to index 0
    And base icon is mapped to index 1
    And composer icon is mapped to index 2
    And export icon is mapped to index 3
    And action icons (add, delete, exchange) are properly mapped

  Scenario: Icon mapping for bases
    Given I have base data
    When I request icons for different bases
    Then cake icon is mapped to index 12
    And onigiri icon is mapped to index 1
    And empanada icon is mapped to index 4
    And gimbap icon is mapped to index 36
    And savoy_cake icon is mapped to index 63

  Scenario: Icon mapping for ingredients by category
    Given I have ingredient categories
    When I request icons for different ingredient types
    Then liquid ingredients have appropriate icon mappings
    And fruit ingredients have appropriate icon mappings
    And spice ingredients have appropriate icon mappings
    And vegetable ingredients have appropriate icon mappings
    And protein ingredients have appropriate icon mappings

  Scenario: Icon size configuration
    Given the icon system is initialized
    When I check the icon size configuration
    Then the icon size is set to 32 pixels
    And the background position calculation uses this size

  Scenario: Handling missing icon mappings
    Given I request an icon for an unknown element
    When the icon mapping is not found
    Then the system defaults to index 0
    And no error is thrown
    And the element still gets styled appropriately

  Scenario: Icon background position calculation
    Given I have an icon index
    When the background position is calculated
    Then the position is calculated as negative index multiplied by icon size
    And the vertical position is set to 0
    And the calculation handles large icon indices correctly

  Scenario: Multiple icon applications
    Given I have multiple elements needing icons
    When I apply icons to different elements
    Then each element gets its own background position
    And all elements share the same sprite sheet
    And the icons are displayed without conflicts
