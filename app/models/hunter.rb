class Hunter < ApplicationRecord
  belongs_to :user
  has_many :applications
  has_one :big_five
  has_one :myers_briggs
end
