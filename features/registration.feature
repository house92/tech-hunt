Feature: A customer can sign up
  As an unregistered user, when I visit the homepage I should be able to click a link that will take me to a sign up form

  Background:
    # Given I navigate to "/"
    # Then I should see "Sign up"

    @poltergeist
    Scenario: Clicking on the <<Sign up>> button
      When I navigate to "/"
      Then I should see "Sign up"
      When I click on "Sign up"
      Then I should see "E-mail:"
        And I should see "Password:"
        And I should see "Sign up"

    @selenium
    Scenario: Submitting the registration form
      When I navigate to "/users/sign_up"
        And I fill out the registration form
        And I click on "Sign Up"
        And I confirm my e-mail address
      Then I should see "Your email address has been successfully confirmed."
        And the path should be "/users/sign_in"
