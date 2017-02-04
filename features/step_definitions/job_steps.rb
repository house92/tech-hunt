When(/^I fill out the form for a new job$/) do
  pending # Write code here that turns the phrase above into concrete actions
end

Then(/^the user with e\-mail "([^"]*)" should have a job listed$/) do |email|
  user = User.find_by(email: email)
  account = user.get_account
  expect(account.jobs.length).to eq(1)
end
