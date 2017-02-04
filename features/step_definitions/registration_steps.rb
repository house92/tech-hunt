When(/^I fill out the registration form as a hunter$/) do
  fill_in "email", with: "batman@cave.com"
  fill_in "password", with: "tookabullettotheparents"
  fill_in "password_confirmation", with: "tookabullettotheparents"
  fill_in "first_name", with: "Bruce"
  fill_in "last_name", with: "Wayne"
end

When(/^I fill out the registration form as an employer$/) do
  fill_in "email", with: "tony@stark.com"
  fill_in "password", with: "pepper"
  fill_in "password_confirmation", with: "pepper"
  fill_in "company_name", with: "Stark Industries"
end

When(/^I confirm my e\-mail address as a hunter$/) do
  has_content?("syzygy")
  visit("/users/confirmation?confirmation_token=#{User.find_by(email: "batman@cave.com").confirmation_token}")
end

When(/^I confirm my e\-mail address as an employer$/) do
  has_content?("syzygy")
  visit("/users/confirmation?confirmation_token=#{User.find_by(email: "tony@stark.com").confirmation_token}")
end

Then(/^there should be a corresponding Hunter account$/) do
  user = User.find_by(email: "batman@cave.com")
  expect(user.account_type).to eq("hunter")
  hunter_account = Hunter.find_by(user_id: user.id)
  expect(hunter_account).to be_truthy
end

Then(/^there should be a corresponding Employer account$/) do
  user = User.find_by(email: "tony@stark.com")
  expect(user.account_type).to eq("employer")
  employer_account = Employer.find_by(user_id: user.id)
  expect(employer_account).to be_truthy
end
