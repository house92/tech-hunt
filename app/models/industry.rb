class Industry < ApplicationRecord
  has_many :jobs
  has_many :industry_skills
  has_many :skills, through: :industry_skills
end
