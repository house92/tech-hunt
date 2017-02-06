When(/^I add "([^"]*)" and "([^"]*)" to skills$/) do |skill1, skill2|
  pending # Write code here that turns the phrase above into concrete actions
end

Then(/^the user with e\-mail "([^"]*)" should have the skills "([^"]*)" and "([^"]*)"$/) do |email, skill1, skill2|
  user = User.find_by(email: email)
  expect(user.skills.length).to eq(2)
end
