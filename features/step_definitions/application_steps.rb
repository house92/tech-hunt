When(/^I view the first job page$/) do
  job = Job.first
  visit(job_path(job))
end

When(/^I fill out the form to submit an application$/) do
  fill_in "body", with: "I am a god. God trumps wizard, mortal."
end

When(/^I navigate to a new application page$/) do
  job = Job.first
  visit(new_job_application_path(job))
end

When (/^I view my first application as "([^"]*)"$/) do |email|
  account = User.find_by(email: email).get_account
  visit(job_application_path(account.applications.first.job, account.applications.first))
end

Then (/^I should see the application details$/) do
  account = User.find_by(email: "lightning@asgard.gov").get_account
  application = account.applications.first
  expect(page).to have_content(application.job.title)
  expect(page).to have_content(application.body)
end

Then(/^the user with e\-mail "([^"]*)" should have an application$/) do |email|
  account = User.find_by(email: email).get_account
  expect(account.applications.length).to eq(1)
end
