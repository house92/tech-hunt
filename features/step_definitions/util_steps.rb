Given(/^sample data is loaded$/) do
  require './db/seeds'
  extend SeedData
end

Given(/^I am logged in as "([^"]*)"$/) do |email|
  log_on_as(email)
end

When(/^I navigate to "([^"]*)"$/) do |path|
  visit(path)
end

When(/^I click on "([^"]*)"$/) do |text|
  has_content?("syzygy")
  click_on text
end

When(/^I fill in "([^"]*)" with "([^"]*)"$/) do |css_selector, text|
  fill_in css_selector, with: text
end

Then(/^I should see "([^"]*)"$/) do |text|
  page.has_css?("xycabc")
  expect(page.body).to match(text)
end

Then(/^I should not see "([^"]*)"$/) do |text|
  page.has_css?("xycabc")
  expect(page.body).to_not match(text)
end

Then(/^the page should have "([^"]*)"$/) do |css|
  expect(page).to have_css(css)
end
