When(/^I make my selections for the Big Five$/) do
  has_content?("syzygy")
  (2..51).each do |index|
    find(:xpath, "//*[@id=\"wrap\"]/div/div[2]/form/div[#{index}]/div/div[4]/label/input").set(true)
  end
end

When(/^I make my selections for the Myers\-Briggs$/) do
  has_content?("syzygy")
  (2..65).each do |index|
    find(:xpath, "//*[@id=\"wrap\"]/div/div[2]/form/div[#{index}]/div/div[4]/label/input").set(true)
  end
end

Then(/^the user with e\-mail "([^"]*)" should have a Big Five profile$/) do |email|
  user = User.find_by(email: email)
  account = user.get_account
  expect(account.big_five).to be_truthy
end

Then(/^the user with e\-mail "([^"]*)" should have a Myers-Briggs profile$/) do |email|
  user = User.find_by(email: email)
  account = user.get_account
  expect(account.myers_briggs).to be_truthy
end
