class AddLatLngToJobs < ActiveRecord::Migration[5.0]
  def change
    add_column :jobs, :lat, :float
    add_column :jobs, :lng, :float
  end
end
