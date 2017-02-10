Feature: A user can view their dashboard and update their profile

  Background:
    Given sample data is loaded
      And I am logged in as "lightning@asgard.gov"

    @poltergeist
    Scenario: Navigating to dashboard
      When I navigate to "/users/1/dashboard"
        Then I should see "Dashboard"
        And I should see "Applications"

    @poltergeist
    Scenario: Updating a hunter's profile
      When I navigate to "/users/1/dashboard"
        And I click on "Edit"
        And I fill in "bio" with "I am a god"
        And I click on "Update"
      Then I should see "I am a god"

    @poltergeist
    Scenario: Updating an employer's profile
      When I am logged in as "charles.xavier@xschool.com"
        And I navigate to "/users/1/dashboard"
        And I click on "Edit"
        And I fill in "bio" with "I am a mutant"
        And I click on "Update"
      Then I should see "I am a mutant"
