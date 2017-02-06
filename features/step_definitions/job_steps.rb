When(/^I fill out the form for a new job$/) do
  has_content?("syzygy")
  fill_in "title", with: "Technopath"
  fill_in "city", with: "Hoddesdon"
  fill_in "country", with: "UK"
  fill_in "postcode", with: "EN11 8BU"
  click_on "Find"
  fill_in "salary", with: "50000"
  select "Mid-level", from: "grading"
  check "offers_visa"
  fill_in "description", with: "You know who you are. So do I."
end

Then(/^the user with e\-mail "([^"]*)" should have a job listed$/) do |email|
  user = User.find_by(email: email)
  account = user.get_account
  expect(account.jobs.length).to eq(2)
end
