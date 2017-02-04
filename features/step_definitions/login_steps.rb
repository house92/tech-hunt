When(/^I log in as "([^"]*)" with password "([^"]*)"$/) do |email, password|
  user = User.find_by(email: email)
  user.update(confirmed_at: DateTime.now)
  fill_in "email", with: email
  fill_in "password", with: password
end
