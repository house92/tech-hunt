Then(/^I should see a map$/) do
  map = page.find(:css, "#map")
  expect(map).to be_truthy
end
