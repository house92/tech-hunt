When(/^I fill out the registration form$/) do
  fill_in "input[type=email]", with: "batman@cave.com"
  fill_in "input[type=email]", with: "tookabullettotheparents"
end
