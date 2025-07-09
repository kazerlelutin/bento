@crafter-navigator
Feature: Navigation between crafter steps

  Scenario: Display step buttons on startup
    Given the DOM contains an element with id "crafter-controls"
    When I initialize the Crafter Navigator
    Then each crafter step has a button in the container
    And the button corresponding to the current step has the aria-current attribute set to "true"

  Scenario: Change step by user click
    Given the Crafter Navigator is initialized with multiple steps
    And the container contains the step buttons
    When I click on the button of a different step
    Then the store's setCurrentStep method is called with the name of the clicked step

  Scenario: UI updates when step changes via the store
    Given the Crafter Navigator is initialized
    And the current step is "home"
    When the store notifies a step change to "export"
    Then the "export" button has the aria-current attribute set to "true"
    And the "home" button has the aria-current attribute set to "false"

  Scenario: Cleanup subscriptions on destruction
    Given the Crafter Navigator is initialized
    When I call the cleanup method
    Then the store subscription is removed

  Scenario: Accessibility of step buttons
    Given the Crafter Navigator is initialized
    Then each step button has the role "button"
    And each button has an aria-label attribute containing the step name
