Feature: A user can view another user's profile
  As a signed in user, I can view another user's profile by navigating to the relevant show page

  Background:
    Given sample data is loaded
      And I am logged in as "charles.xavier@xschool.com"

    @poltergeist
    Scenario: Navigating to a hunter's profile page
      When I navigate to "/hunters/1"
        Then I should see "Thor"
        And I should see "Asgard"

    @poltergeist
    Scenario: Navigating to an employer's profile page
      When I navigate to "/employers/1"
        Then I should see "Professor Xavier's School For Gifted Youngsters"
