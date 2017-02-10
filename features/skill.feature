# Feature: Skills can be tied to hunters and jobs
#   As a signed in hunter, I can register skills to my account
#   As a signed in employer, I can register skills to a job
#
#   Background:
#     Given sample data is loaded
#
#     @poltergeist
#     Scenario: Registering skills to my account as a hunter
#       When I am logged in as "lightning@asgard.gov"
#         And I navigate to "/users/0/dashboard"
#       Then I should see "Your skills"
#       When I click on "Add skill"
#         And I add "JavaScript" and "Ruby on Rails" to skills
#       Then the user with e-mail "lightning@asgard.gov" should have the skills "JavaScript" and "Ruby on Rails"
