Feature: A customer can sign up
  As an unregistered user, when I visit the homepage I should be able to click a link that will take me to a sign up form

  Background:
    When I navigate to "/"
    Then I should see "Sign up"

    @poltergeist
    Scenario: Clicking on the <<Sign up>> button
      When I click on "Sign up"
      Then I should see "E-mail:"
        And I should see "Password:"
        And I should see "Sign up"

    Scenario: Submitting the <<Sign up>> form
      When I click on "Sign up"
        And I fill out the registration form
        And I click on "Sign up"
      Then I should see "A verification e-mail has been sent to the address you provided. Please follow the link to authenticate your account."
