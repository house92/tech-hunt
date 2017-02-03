When(/^I log in as "([^"]*)" with password "([^"]*)"$/) do |email, password|
  fill_in "email", with: email
  fill_in "password", with: password
end
