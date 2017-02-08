class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :lockable, :timeoutable and :validatable
  devise :database_authenticatable, :registerable, :confirmable,
         :recoverable, :rememberable, :trackable, :omniauthable

  has_one :hunter
  has_one :employer
  has_many :social_media

  def get_account
    case self.account_type
    when "hunter"
      return self.hunter
    when "employer"
      return self.employer
    end
  end

  class << self
    def find_social_media(user)
      user.social_media if user
    end

    def find_or_create_with(user_info)
      social_medium = SocialMedium.find_by(sm_id: user_info["id"])
      user = social_medium ? User.find_by(id: social_medium.user_id) : nil
      if user.nil?
        user = User.create(account_type: "hunter")
        first_name = user_info["name"].split(" ").first
        last_name = user_info["name"].split(" ").last unless user_info["name"].split(" ").last == first_name
        account = Hunter.create(first_name: first_name, last_name: last_name, bio: user_info["bio"], location: user_info["location"], user_id: user.id)
        user.update(email: user_info["email"]) if user_info["email"]
        # session[:user_id] = user.id
      end
      user.update(confirmed_at: DateTime.now)
      user
    end
  end

end
