Feature: A user can log in
  As a registered user, when I visit the homepage I should see a link that will take me to the login page, which will redirect me to my profile upon login

  Background:
    Given sample data is loaded

    @poltergeist
    Scenario: Clicking on the <<Log in>> button
      When I navigate to "/"
      Then I should see "Log in"
      When I click on "Log in"
      Then I should see "E-mail:"
        And I should see "Password:"
        And I should see "Log in"

    @wip
    @selenium
    Scenario: Submitting login details
      When I navigate to "/users/sign_in"
        And I log in as "lightning@asgard.gov" with password "mjollnir"
        And I click on "Log in"
      Then I should be redirected to the dashboard for "lightning@asgard.gov"
