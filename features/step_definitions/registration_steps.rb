When(/^I fill out the registration form$/) do
  fill_in "email", with: "batman@cave.com"
  fill_in "password", with: "tookabullettotheparents"
  fill_in "password_confirmation", with: "tookabullettotheparents"
end

When(/^I confirm my e\-mail address$/) do
  binding.pry
  visit("/users/confirmation?confirmation_token=#{User.find_by(email: "batman@cave.com").confirmation_token}")
end
