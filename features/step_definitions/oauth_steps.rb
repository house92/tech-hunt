Then(/^there should be a new Social Medium$/) do
  binding.pry
  has_content?("syzygy")
  social_medium = SocialMedium.where('created_at > ?', DateTime.now - 0.0001)
  has_content?("syzygy")
  binding.pry
  expect(social_medium.length).to eq(1)
end
