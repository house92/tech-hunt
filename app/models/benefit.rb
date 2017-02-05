class Benefit < ApplicationRecord
  has_many :job_benefits
  has_many :jobs, through: :job_benefits
end
