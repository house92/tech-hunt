Feature: A hunter can apply to a job
  As a signed in hunter, I should be able to apply to a job on the job show page

  Background:
    Given sample data is loaded
      And I am logged in as "lightning@asgard.gov"
      And I view the first job page

    @poltergeist
    Scenario: Submitting an application for a job
      When I click on the "Apply" button
      Then there should be a form on the page
      When I fill out the form to submit an application
        And I click on "Apply"
      Then the user with e-mail "lightning@asgard.gov" should have an application
        And "charles.xavier@xschool.com" should receive an email

    @poltergeist
    Scenario: Attempting to access the new application page as an employer
      When I am logged in as "charles.xavier@xschool.com"
        And I navigate to a new application page
      Then I should not see "Write your cover letter out below:"

    @poltergeist
    Scenario: Viewing an application
      When I click on the "Apply" button
        And I fill out the form to submit an application
        And I click on "Apply"
        And I view my first application as "lightning@asgard.gov"
      Then I should see the application details
