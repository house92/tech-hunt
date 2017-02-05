class RemoveIndustry < ActiveRecord::Migration[5.0]
  def change
    remove_column :jobs, :industry_id, :integer
    remove_column :industry_skills, :industry_id, :integer
    drop_table :industries
  end
end
