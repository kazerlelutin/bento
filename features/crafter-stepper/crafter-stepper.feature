@stepper
Feature: Crafter Stepper

  Scenario: Stepper initialization
    Given the DOM contains an element with id "stepper"
    And the DOM contains templates for all stepper steps
    When I initialize the Crafter Stepper
    Then the stepper should subscribe to the crafter navigator store
    And the stepper should display the current step content
    And the stepper should call the current step controller

  Scenario: Step content changes when navigator step changes
    Given the Crafter Stepper is initialized
    And the current step is "home"
    When the crafter navigator changes to step "base"
    Then the stepper should update the container content
    And the stepper should display the "base" template content
    And the stepper should call the "base" step controller
    And the stepper should replace the previous step content

  Scenario: Step content changes when navigator step changes to composer
    Given the Crafter Stepper is initialized
    And the current step is "base"
    When the crafter navigator changes to step "composer"
    Then the stepper should update the container content
    And the stepper should display the "composer" template content
    And the stepper should call the "composer" step controller

  Scenario: Step content changes when navigator step changes to export
    Given the Crafter Stepper is initialized
    And the current step is "composer"
    When the crafter navigator changes to step "export"
    Then the stepper should update the container content
    And the stepper should display the "export" template content
    And the stepper should call the "export" step controller

  Scenario: Error handling when step is not found
    Given the Crafter Stepper is initialized
    When the crafter navigator changes to an invalid step
    Then the stepper should throw an error "Stepper step invalid not found"

  Scenario: Error handling when stepper container is missing
    Given the DOM does not contain an element with id "stepper"
    And the Crafter Stepper is initialized
    When the crafter navigator changes to step "base"
    Then the stepper should throw an error "Stepper container not found"

  Scenario: Error handling when step template is missing
    Given the DOM contains an element with id "stepper"
    And the DOM does not contain the "stepper-base-template"
    And the Crafter Stepper is initialized
    When the crafter navigator changes to step "base"
    Then the stepper should throw an error "Stepper template stepper-base-template not found"

  Scenario: Stepper cleanup
    Given the Crafter Stepper is initialized
    When I call the stepper cleanup method
    Then the stepper should unsubscribe from the crafter navigator store

  Scenario: Step controller execution
    Given the Crafter Stepper is initialized
    When the crafter navigator changes to step "home"
    Then the stepper should execute the "home" step controller
    And the step controller should log "home"

  Scenario: Step controller execution for base step
    Given the Crafter Stepper is initialized
    When the crafter navigator changes to step "base"
    Then the stepper should execute the "base" step controller
    And the step controller should log "base"

  Scenario: Step controller execution for composer step
    Given the Crafter Stepper is initialized
    When the crafter navigator changes to step "composer"
    Then the stepper should execute the "composer" step controller
    And the step controller should log "composer"

  Scenario: Step controller execution for export step
    Given the Crafter Stepper is initialized
    When the crafter navigator changes to step "export"
    Then the stepper should execute the "export" step controller
    And the step controller should log "export"

  Scenario: Content replacement between steps
    Given the Crafter Stepper is initialized
    And the current step is "home"
    When the crafter navigator changes to step "base"
    Then the stepper should replace the home content with base content
    And the stepper container should not contain home content
    And the stepper container should contain base content

  Scenario: Integration with crafter navigator store
    Given the Crafter Stepper is initialized
    When the crafter navigator store current step changes
    Then the stepper should receive the step change notification
    And the stepper should update the UI with the new step
