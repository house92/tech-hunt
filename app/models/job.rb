require 'elasticsearch/model'

class Job < ApplicationRecord
  include Elasticsearch::Model
  include Elasticsearch::Model::Callbacks
  belongs_to :employer
  has_many :applications
  # has_many :job_benefits
  # has_many :benefits, through: :job_benefits
  # has_many :job_skills
  # has_many :jobs, through: :job_skills

  settings index: { number_of_shards: 1 } do
    mappings dynamic: 'false' do
      indexes :title, type: 'string', analyzer: 'english'
      indexes :description, type: 'text', analyzer: 'english'
      indexes :salary, type: 'integer'
      indexes :location, type: 'string'
      indexes :lat, type: 'float'
      indexes :lng, type: 'float'
      indexes :grading, type: 'string'
      indexes :full_time, type: 'boolean'
      indexes :contract, type: 'boolean'
      indexes :offers_visa, type: 'boolean'
    end
  end
end

Job.import force: true
