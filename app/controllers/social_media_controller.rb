class SocialMediaController < ApplicationController

  def github
    acc_token = SocialMedium.find_access_token(params)

    user_info_json = Net::HTTP.get(URI.parse("https://api.github.com/user?access_token=#{acc_token}"))
    user_info = JSON.parse(user_info_json)

    user = User.find_or_create_with(user_info)

    existing_social_medium = SocialMedium.where("sm_acc_token IS NOT NULL").first
    if existing_social_medium.nil?
      SocialMedium.define(acc_token, user, user_info)
    end

    sign_in(user)
    redirect_to(user_dashboard_path(user))
  end

end
