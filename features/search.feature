Feature: A user can search for jobs
  As a user, I should be able to search for jobs and view them

  Background:
    Given I navigate to "/"

    @poltergeist
    Scenario: Submitting a basic search
      Then I should see "Search jobs"
      When I fill in "title" with "javascript"
        And I click on "Go hunting"
      Then the path should be "/jobs/index"
        And I should see "Your search returned"

    Scenario: Submitting an advanced search
      When I fill in "title" with "javascript"
        And I click on "Advanced search"
        And I click on "Full-time"
        And I fill in "location" with "London"
        And I click on "Go hunting"
      Then the value of "location" should be "London"
        And the checkbox "full_time" should be checked

      Scenario: Adjusting the filters of an existing search
        When I fill in "title" with "javascript"
          And I click on "Go hunting"
          And I click on "Part-time"
          And I fill in "location" with "San Francisco"
          And I click on "Go hunting"
        Then the value of "location" should be "San Francisco"
          And the checkbox "part_time" should be checked

      @wip
      Scenario: Adjusting the filters of an existing search with AJAX
        When I fill in "title" with "javascript"
          And I click on "Go hunting"
          And I click on "Part-time"
          And I fill in "location" with "San Francisco"
        Then the value of "location" should be "San Francisco"
          And the checkbox "part_time" should be checked
