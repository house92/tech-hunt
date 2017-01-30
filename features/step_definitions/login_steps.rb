When(/^I log in as "([^"]*)" with password "([^"]*)"$/) do |email, password|
  fill_in "email", with: email
  fill_in "password", with: password
end

Then(/^I should be redirected to the dashboard for "([^"]*)"$/) do |email|
  binding.pry
  expect(page.body).to match("Dashboard")
  expect(page.body).to match(email)
end
