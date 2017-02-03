Feature: A hunter can take personality tests
  As a signed in hunter, I should be able to go to my dashboard and take a personality test

  Background:
    Given sample data is loaded
      And I am logged in as "lightning@asgard.gov"
      And I navigate to "/users/0/dashboard"
      And I click on "Take tests"

    @wip
    @poltergeist
    Scenario: Submitting a Big Five test
      When I make my selections for the Big Five
        And I click on "Submit"
      Then the user with e-mail "lightning@asgard.gov" should have a Big Five profile

    @poltergeist
    Scenario: Submitting a Myers-Briggs test
    When I select "Myers-Briggs" from "test_selection"
      And I make my selections for the Myers-Briggs
      And I click on "Submit"
    Then the user with e-mail "lightning@asgard.gov" should have a Myers-Briggs profile
