require 'elasticsearch/model'

class Job < ApplicationRecord
  include Elasticsearch::Model
  include Elasticsearch::Model::Callbacks
  belongs_to :employer
  has_many :applications

  settings index: { number_of_shards: 1 } do
    mappings dynamic: 'false' do
      indexes :title, type: 'string', analyzer: 'english'
      indexes :description, type: 'text', analyzer: 'english'
      indexes :salary, type: 'integer'
      indexes :location, type: 'string'
      indexes :grading, type: 'string'
      indexes :full_time, type: 'boolean'
      indexes :contract, type: 'boolean'
      indexes :offers_visa, type: 'boolean'
    end
  end
end

Job.import force: true
