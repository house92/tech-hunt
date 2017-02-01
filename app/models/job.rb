require 'elasticsearch/model'

class Job < ApplicationRecord
  include Elasticsearch::Model
  include Elasticsearch::Model::Callbacks
  belongs_to :employer

  settings index: { number_of_shards: 1 } do
    mappings dynamic: 'false' do
      indexes :jobs, analyzer: 'english', index_options: 'offsets'
    end
  end
end
