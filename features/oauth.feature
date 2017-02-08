Feature: A hunter can sign in via Github
  As a signed in hunter, I should be able to register and sign in using my Github account

  Background:
    Given I navigate to "/users/sign_in"

    @selenium
    Scenario: Signing in with Github
      When I click on "Log on via Github"
      Then there should be a new Social Medium
        And the path should be "/users/dashboard"
