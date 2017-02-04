Feature: An employer can post job ads
  As a signed in employer, I should be able to post new jobs from my dashboard

  Background:
    Given sample data is loaded
      And I am logged in as "charles.xavier@xschool.com"
      And I navigate to "/users/1/dashboard"

    @poltergeist
    Scenario: Navigating to the new job page
      Then I should see "Post a job"
      When I click on "Post a job"
        Then I should see "Enter the details for the job"
        And there should be a form on the page

    @poltergeist
    Scenario: Submitting a new job
      When I click on "Post a job"
        And I fill out the form for a new job
        And I click on "Submit"
      Then the user with e-mail "charles.xavier@xschool.com" should have a job listed
