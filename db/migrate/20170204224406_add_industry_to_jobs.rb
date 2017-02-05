class AddIndustryToJobs < ActiveRecord::Migration[5.0]
  def change
    add_reference :jobs, :industry
  end
end
