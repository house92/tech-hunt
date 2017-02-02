# Be sure to restart your server when you modify this file.

# Version of your assets, change this if you want to expire all your assets.
Rails.application.config.assets.version = '1.0'

# Add additional assets to the asset load path
# Rails.application.config.assets.paths << Emoji.images_path

# Precompile additional assets.
# application.js, application.css, and all non-JS/CSS in app/assets folder are already added.
# Rails.application.config.assets.precompile += %w( search.js )

Dir[Rails.root.join('app/controllers/*_controller.rb')].map do |path|
  path.match(/(\w+)_controller.rb/)
  $1
end.compact.each do |controller|
  puts controller
  Rails.application.config.assets.precompile += ["#{controller}.css"]
end

Rails.application.config.assets.precompile += %w( header.css )
Rails.application.config.assets.precompile += %w( users/sessions.css )
Rails.application.config.assets.precompile += %w( users/registrations.css )
