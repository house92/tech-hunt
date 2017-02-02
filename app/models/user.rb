class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable, :confirmable,
         :recoverable, :rememberable, :trackable, :validatable

  has_one :hunter
  has_one :employer

  def get_account
    case self.account_type
    when "hunter"
      return self.hunter
    when "employer"
      return self.employer
    end
  end

end
