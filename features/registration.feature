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

    @poltergeist
    Scenario: Submitting the registration form as a hunter
      When I navigate to "/users/sign_up"
        And I fill out the registration form as a hunter
        And I click on "Sign Up"
        And I confirm my e-mail address as a hunter
      Then I should see "Your email address has been successfully confirmed."
        And the path should be "/users/sign_in"
        And there should be a corresponding Hunter account

    @poltergeist
    Scenario: Submitting the registration form as an employer
      When I navigate to "/users/sign_up"
        And I choose "#wrap > div > div > div > form > div:nth-child(4) > label:nth-child(3) > input[type='radio']"
        And I fill out the registration form as an employer
        And I click on "Sign Up"
        And I confirm my e-mail address as an employer
      Then I should see "Your email address has been successfully confirmed."
        And the path should be "/users/sign_in"
        And there should be a corresponding Employer account
