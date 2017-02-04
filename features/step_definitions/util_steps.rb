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

When(/^I click on the "([^"]*)" button$/) do |text|
  has_content?("syzygy")
  click_button text
end

When(/^I choose "([^"]*)"$/) do |selector|
  has_content?("syzygy")
  find(:css, selector).set(true)
end

When(/^I fill in "([^"]*)" with "([^"]*)"$/) do |css_selector, text|
  fill_in css_selector, with: text
end

When(/^I select "([^"]*)" from "([^"]*)"$/) do |value, css|
  select(value, from: css)
end

Then(/^I should see "([^"]*)"$/) do |text|
  page.has_css?("xycabc")
  has_content?("syzygy")
  expect(page.body).to match(text)
end

Then(/^I should not see "([^"]*)"$/) do |text|
  page.has_css?("xycabc")
  expect(page.body).to_not match(text)
end

Then(/^the page should have "([^"]*)"$/) do |css|
  expect(page).to have_css(css)
end

Then(/^the path should be "([^"]*)"$/) do |path|
  current_url.match(path)
end

Then(/^the value of "([^"]*)" should be "([^"]*)"$/) do |input_name, value|
  input = find_field(input_name)
  expect(input.value).to eq(value)
end

Then(/^the checkbox "([^"]*)" should be checked$/) do |checkbox_name|
  checkbox = find_field(checkbox_name)
  expect(checkbox.checked).to be_true
end

Then(/^I should be redirected to the dashboard for "([^"]*)"$/) do |email|
  has_content?("syzygy")
  expect(current_url).to match("dashboard")
  expect(page.body).to match("Applications")
end

Then(/^there should be a form on the page$/) do
  form = page.find('form')
  expect(form).to be_truthy
end
