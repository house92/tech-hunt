Then(/^there should be a new Social Medium$/) do
  social_medium = SocialMedium.where('created_at > ?', DateTime.now - 0.0001)
  expect(social_medium.length).to eq(1)
end
