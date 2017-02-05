class JobBenefit < ApplicationRecord
  belongs_to :job
  belongs_to :benefit
end
