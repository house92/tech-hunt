class Skill < ApplicationRecord
  has_many :hunter_skills
  has_many :hunters, through: :hunter_skills
  has_many :job_skills
  has_many :jobs, through: :job_skills
end
