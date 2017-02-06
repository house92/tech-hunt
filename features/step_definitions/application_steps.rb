When(/^I view the first job page$/) do
  job = Job.first
  visit(job_path(job))
end

When(/^I fill out the form to submit an application$/) do
  fill_in "body", with: "I am a god. God trumps wizard, mortal."
end

Then(/^the user with e\-mail "([^"]*)" should have an application$/) do |email|
  account = User.find_by(email: email).get_account
  expect(account.applications.length).to eq(1)
end
