Feature: A user can search for jobs
  As a user, I should be able to search for jobs and view them

  Background:
    Given sample data is loaded
      And I navigate to "/"

    @poltergeist
    Scenario: Submitting a basic search
      Then I should see "Search jobs"
      When I fill in "title" with "developer"
        And I fill in "location" with "London"
        And I click on "Go hunting"
      Then the path should be "/jobs/index"
        And I should see "Your search returned"
      When I click on "List"
      Then I should see "Lead Front End Developer"

    @poltergeist
    Scenario: Submitting an advanced search
      When I navigate to "/"
        And I fill in "title" with "javascript"
        And I click on "Advanced search"
        And I check "full_time"
        And I fill in "location" with "London"
        And I click on "Go hunting"
      Then the value of "location" should be "London"
        And the checkbox "full_time" should be checked

      @poltergeist
      Scenario: Adjusting the filters of an existing search
        When I fill in "title" with "javascript"
          And I fill in "location" with "Los Angeles"
          And I click on "Go hunting"
          And I check "full_time"
          And I fill in "location" with "San Diego"
          And I click on "Go hunting"
        Then the value of "location" should be "San Diego"
          And the checkbox "full_time" should be checked

      @poltergeist
      Scenario: Viewing the search results on a map
        When I fill in "title" with "javascript"
          And I fill in "location" with "Manchester"
          And I click on "Go hunting"
        Then I should see a map

      @wip
      Scenario: Adjusting the filters of an existing search with AJAX
        When I fill in "title" with "javascript"
          And I click on "Go hunting"
          And I click on "Part-time"
          And I fill in "location" with "San Francisco"
        Then the value of "location" should be "San Francisco"
          And the checkbox "part_time" should be checked
