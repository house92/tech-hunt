class Employer < ApplicationRecord
  belongs_to :user
  has_many :jobs
  has_many :applications, through: :jobs
end
