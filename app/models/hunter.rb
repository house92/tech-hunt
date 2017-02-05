class Hunter < ApplicationRecord
  belongs_to :user
  has_many :applications
  has_many :hunter_skills
  has_many :skills, through: :hunter_skills
  has_one :big_five
  has_one :myers_briggs
end
