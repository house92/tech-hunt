class SocialMedium < ApplicationRecord
  belongs_to :user

  class << self
    def find_access_token(params)
      uri = URI.parse('https://github.com/login/oauth/access_token')
      http = Net::HTTP.new(uri.host, uri.port)
      http.use_ssl = true
      request = Net::HTTP::Post.new(uri.request_uri)
      request.set_form_data({client_id: ENV["GH_CLIENT_ID"],
        client_secret: ENV["GH_CLIENT_SECRET"],
        code: params[:code]})
      request["Accept"] = "application/json"
      response = http.request(request)
      acc_token = JSON.parse(response.body)["access_token"]
    end

    def define(acc_token, user, user_info)
      existing_social_medium = SocialMedium.create(
        sm_id: user_info["id"],
        sm_acc_token: acc_token,
        public_repos: user_info["public_repos"],
        public_gists: user_info[""],
        followers: user_info["followers"],
        following: user_info["following"],
        user: user
      )
    end
  end

end
